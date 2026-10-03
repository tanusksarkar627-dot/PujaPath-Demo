/**
 * PUJAPATH - Deterministic Feasibility Filter
 * Phase 2: Hard Constraint Pruning & Actionable Violation Reporting
 */

import {
  TripRequest,
  EngineConstraintViolation,
  OptimizationWarning,
  CrowdStatus,
  WeatherCondition,
  Puja,
  FoodPlace,
  WalkingTolerance
} from '../types/domain';
import { CandidatePath, FeasibilityAssessment, IFeasibilityFilter } from '../types/engine';
import { TransitGraphRouter } from './router';

export class DeterministicFeasibilityFilter implements IFeasibilityFilter {
  constructor(
    private readonly allPujas: ReadonlyMap<string, Puja>,
    private readonly allFood: ReadonlyMap<string, FoodPlace>
  ) {}

  filterFeasible(
    candidate: CandidatePath,
    request: TripRequest,
    transitGraph: ReadonlyMap<string, readonly any[]>,
    crowdMap: ReadonlyMap<string, CrowdStatus>,
    weather?: WeatherCondition
  ): FeasibilityAssessment {
    const fatalViolations: EngineConstraintViolation[] = [];
    const warnings: OptimizationWarning[] = [];

    const router = new TransitGraphRouter(transitGraph as any);
    const maxWalk = getWalkingToleranceLimitMeters(request.preferences.walkingTolerance);

    // 1. Calculate Available Time Window
    const startMs = Date.parse(request.startTime);
    const deadlineMs = Date.parse(request.deadlineTime);
    const availableMinutes = (deadlineMs - startMs) / (1000 * 60);

    // 2. Dwell & Queue Calculations
    let totalDwellMinutes = candidate.estimatedDwellMinutes;
    let totalQueueMinutes = 0;

    for (const pujaId of candidate.orderedPujaIds) {
      const puja = this.allPujas.get(pujaId);
      const crowd = crowdMap.get(pujaId);
      const rawQueue = crowd?.estimatedQueueMinutes ?? 20;
      // Pandal VIP pass access & senior citizen lanes reduce queue wait times
      const qMins = puja?.hasVipPassAccess ? Math.round(rawQueue * 0.6) : rawQueue;
      totalQueueMinutes += qMins;

      if (crowd?.level === 'EXTREME' || rawQueue >= 45) {
        warnings.push({
          code: 'HIGH_CROWD_DELAY',
          message: `Heavy crowd queues anticipated at ${puja?.name || pujaId} (~${rawQueue} mins wait).`
        });
      }
    }

    // Food place cost & dining time
    let foodCost = 0;
    let diningMinutes = 0;
    if (candidate.foodPlaceId) {
      const food = this.allFood.get(candidate.foodPlaceId);
      if (food) {
        foodCost = food.averageCostPerPersonInr;
        diningMinutes = food.averageDiningMinutes;
        totalDwellMinutes += diningMinutes;
      }
    }

    // 3. Transit Route Feasibility & Reachability
    let totalTransitMinutes = 0;
    let totalTransitCost = 0;
    let totalWalkingMeters = 0;
    let currentStationNodeId = resolveNearestStation(request.startCoordinates, candidate.orderedPujaIds[0], this.allPujas);

    // Transit legs:
    // Leg 1: Start Location -> First Puja
    const firstPuja = this.allPujas.get(candidate.orderedPujaIds[0]);
    if (!firstPuja) {
      fatalViolations.push({
        constraintName: 'UNRESOLVED_PUJA',
        details: `Puja "${candidate.orderedPujaIds[0]}" not found in database.`,
        isFatal: true
      });
    }

    // Inter-puja legs
    for (let i = 0; i < candidate.orderedPujaIds.length - 1; i++) {
      const fromP = this.allPujas.get(candidate.orderedPujaIds[i]);
      const toP = this.allPujas.get(candidate.orderedPujaIds[i + 1]);
      if (!fromP || !toP) continue;

      const directWalk = router.calculateWalkingBetweenCoords(fromP.location, toP.location, fromP.name, toP.name);

      // If direct walk is within walking tolerance, walk directly
      if (directWalk.totalDistanceMeters <= maxWalk) {
        totalTransitMinutes += directWalk.totalDurationMinutes;
        totalWalkingMeters += directWalk.totalDistanceMeters;
      } else {
        // Otherwise, use transit graph
        const fromNode = fromP.nearestTransitNodeIds[0];
        const toNode = toP.nearestTransitNodeIds[0];

        const route = router.findRoute(fromNode, toNode, {
          allowedModes: request.preferences.transportPreferences,
          maxWalkDistanceMeters: maxWalk
        });

        if (!route || !route.isReachable) {
          // Check if walk without mode constraint is possible
          const fallbackWalk = router.calculateWalkingBetweenCoords(fromP.location, toP.location, fromP.name, toP.name);
          if (fallbackWalk.totalDistanceMeters > maxWalk && request.preferences.walkingTolerance === 'MINIMAL') {
            fatalViolations.push({
              constraintName: 'NO_VALID_TRANSPORT_CONNECTION',
              details: `No viable transit or low-walking connection between ${fromP.name} and ${toP.name}. Required walk ${fallbackWalk.totalDistanceMeters}m exceeds minimal tolerance ${maxWalk}m.`,
              isFatal: true
            });
          } else {
            totalTransitMinutes += fallbackWalk.totalDurationMinutes;
            totalWalkingMeters += fallbackWalk.totalDistanceMeters;
          }
        } else {
          totalTransitMinutes += route.totalDurationMinutes;
          totalTransitCost += route.totalCostInr;
          totalWalkingMeters += route.totalWalkDistanceMeters;
        }
      }
    }

    // Return to End Location
    const lastPuja = this.allPujas.get(candidate.orderedPujaIds[candidate.orderedPujaIds.length - 1]);
    if (lastPuja) {
      const returnRoute = router.findRoute(
        lastPuja.nearestTransitNodeIds[0],
        resolveNearestStation(request.endCoordinates, null, this.allPujas),
        { allowedModes: request.preferences.transportPreferences }
      );
      if (returnRoute && returnRoute.isReachable) {
        totalTransitMinutes += returnRoute.totalDurationMinutes;
        totalTransitCost += returnRoute.totalCostInr;
        totalWalkingMeters += returnRoute.totalWalkDistanceMeters;
      } else {
        const directReturnWalk = router.calculateWalkingBetweenCoords(
          lastPuja.location,
          request.endCoordinates,
          lastPuja.name,
          request.endLocationName
        );
        totalTransitMinutes += directReturnWalk.totalDurationMinutes;
        totalWalkingMeters += directReturnWalk.totalDistanceMeters;
      }
    }

    // Add baseline buffer for boarding / festival crowds
    totalTransitMinutes += 15;

    const overallMinutes = totalTransitMinutes + totalQueueMinutes + totalDwellMinutes;
    const overallCost = totalTransitCost + foodCost;

    // --- Hard Constraint 1: Time Limit ---
    if (overallMinutes > availableMinutes) {
      fatalViolations.push({
        constraintName: 'EXCEEDS_DEADLINE',
        details: `Itinerary requires ${Math.round(overallMinutes)} minutes (${totalDwellMinutes}m dwell + ${totalQueueMinutes}m queue + ${totalTransitMinutes}m transit), exceeding available window of ${Math.round(availableMinutes)} minutes.`,
        isFatal: true
      });
    }

    // --- Hard Constraint 2: Budget Limit ---
    if (overallCost > request.budgetInr) {
      fatalViolations.push({
        constraintName: 'EXCEEDS_BUDGET',
        details: `Estimated cost of ₹${overallCost} (₹${totalTransitCost} transit + ₹${foodCost} food) exceeds budget of ₹${request.budgetInr}.`,
        isFatal: true
      });
    }

    // --- Hard Constraint 3: Strict Walking Limit Check ---
    if (request.preferences.walkingTolerance === 'MINIMAL' && totalWalkingMeters > 3000) {
      fatalViolations.push({
        constraintName: 'EXCESSIVE_WALKING',
        details: `Total walking across itinerary (${Math.round(totalWalkingMeters)}m) exceeds strict minimal walking limit (3000m total).`,
        isFatal: true
      });
    }

    // Warnings
    if (candidate.orderedPujaIds.length < request.desiredPujaCount) {
      warnings.push({
        code: 'REDUCED_PUJA_COUNT',
        message: `Plan includes ${candidate.orderedPujaIds.length} Pujas instead of requested ${request.desiredPujaCount} to fit within time and budget limits.`,
        mitigationSuggestion: 'Extend your return deadline or increase budget to accommodate additional pandals.'
      });
    }

    if (request.budgetInr - overallCost < 80) {
      warnings.push({
        code: 'BUDGET_TIGHT',
        message: `Remaining budget buffer is only ₹${request.budgetInr - overallCost}. Maintain spare cash for festive auto surge.`
      });
    }

    if (availableMinutes - overallMinutes < 30) {
      warnings.push({
        code: 'TIGHT_DEADLINE',
        message: `Only ${Math.round(availableMinutes - overallMinutes)} minutes buffer remains before your ${request.deadlineTime} deadline.`
      });
    }

    return {
      isFeasible: fatalViolations.length === 0,
      fatalViolations,
      warnings,
      estimatedTotalCostInr: overallCost,
      estimatedTotalMinutes: Math.round(overallMinutes)
    };
  }
}

function getWalkingToleranceLimitMeters(tolerance: WalkingTolerance): number {
  switch (tolerance) {
    case 'MINIMAL':
      return 450;
    case 'MODERATE':
      return 1300;
    case 'HIGH':
      return 2600;
    default:
      return 1300;
  }
}

function resolveNearestStation(
  coords: { latitude: number; longitude: number },
  pujaId: string | null,
  pujas: ReadonlyMap<string, Puja>
): string {
  if (pujaId) {
    const puja = pujas.get(pujaId);
    if (puja && puja.nearestTransitNodeIds.length > 0) {
      return puja.nearestTransitNodeIds[0];
    }
  }
  return 'node_sealdah';
}
