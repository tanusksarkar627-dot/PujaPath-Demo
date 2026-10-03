/**
 * PUJAPATH - Route Construction & Stop Sequencing Engine
 * Phase 2: Detailed Stop Timings, Directions & Civic Marker Binding
 */

import {
  TripRequest,
  Itinerary,
  ItineraryStop,
  RouteSegment,
  OptimizationWarning,
  ItineraryScoreBreakdown,
  CrowdStatus,
  Puja,
  FoodPlace,
  Facility
} from '../types/domain';
import { CandidatePath, IRouteBuilder } from '../types/engine';
import { TransitGraphRouter } from './router';

export class DeterministicRouteBuilder implements IRouteBuilder {
  constructor(
    private readonly allPujas: ReadonlyMap<string, Puja>,
    private readonly allFood: ReadonlyMap<string, FoodPlace>,
    private readonly allFacilities: readonly Facility[]
  ) {}

  buildDetailedItinerary(
    topCandidate: CandidatePath,
    request: TripRequest,
    score: ItineraryScoreBreakdown,
    warnings: readonly OptimizationWarning[],
    transitGraph: ReadonlyMap<string, readonly any[]>,
    crowdMap: ReadonlyMap<string, CrowdStatus>
  ): Itinerary {
    const router = new TransitGraphRouter(transitGraph as any);
    const stops: ItineraryStop[] = [];

    const startTimestampMs = Date.parse(request.startTime);
    let currentTimestampMs = startTimestampMs;

    let totalTransitMinutes = 0;
    let totalQueueMinutes = 0;
    let totalDwellMinutes = 0;
    let totalWalkingMeters = 0;
    let totalCostInr = 0;

    let sequenceIndex = 1;

    // --- Stop 1: START_POINT ---
    const firstPuja = this.allPujas.get(topCandidate.orderedPujaIds[0])!;
    const directWalkToFirst = router.calculateWalkingBetweenCoords(request.startCoordinates, firstPuja.location, request.startLocationName, firstPuja.name);
    const firstLeg = (directWalkToFirst.totalDistanceMeters <= 950)
      ? directWalkToFirst
      : (router.findRoute(
          resolveNearestNode(request.startCoordinates, null, this.allPujas),
          firstPuja.nearestTransitNodeIds[0],
          { allowedModes: request.preferences.transportPreferences }
        ) ?? directWalkToFirst);

    stops.push({
      stopSequence: sequenceIndex++,
      type: 'START_POINT',
      name: request.startLocationName,
      location: request.startCoordinates,
      arrivalTime: formatTime(currentTimestampMs),
      departureTime: formatTime(currentTimestampMs),
      dwellTimeMinutes: 0,
      expectedQueueMinutes: 0,
      estimatedStopCostInr: 0,
      transitSegmentToNext: {
        fromStopName: request.startLocationName,
        toStopName: firstPuja.name,
        mode: firstLeg.usedModes[0] || 'WALK',
        distanceMeters: firstLeg.totalDistanceMeters,
        durationMinutes: firstLeg.totalDurationMinutes,
        costInr: firstLeg.totalCostInr,
        transitInstructions: firstLeg.stepDescriptions.join('; ')
      },
      nearbyFacilities: this.getFacilitiesNear(request.startCoordinates, 400),
      advisoryNotes: ['Commence tour. Keep transit smart tokens ready.']
    });

    totalTransitMinutes += firstLeg.totalDurationMinutes;
    totalWalkingMeters += firstLeg.totalWalkDistanceMeters;
    totalCostInr += firstLeg.totalCostInr;
    currentTimestampMs += firstLeg.totalDurationMinutes * 60 * 1000;

    // --- Stops 2..N: Pujas and Food Stop ---
    const foodPlace = topCandidate.foodPlaceId ? this.allFood.get(topCandidate.foodPlaceId) : undefined;
    const foodInsertionIndex = Math.min(2, Math.floor(topCandidate.orderedPujaIds.length / 2));

    for (let i = 0; i < topCandidate.orderedPujaIds.length; i++) {
      const pujaId = topCandidate.orderedPujaIds[i];
      const puja = this.allPujas.get(pujaId)!;
      const crowd = crowdMap.get(pujaId);
      const rawQueue = crowd?.estimatedQueueMinutes ?? 20;
      const queueMins = puja.hasVipPassAccess ? Math.round(rawQueue * 0.6) : rawQueue;
      const dwellMins = topCandidate.orderedPujaIds.length >= 5
        ? Math.min(28, puja.typicalDwellMinutes)
        : puja.typicalDwellMinutes;

      const arrivalTime = formatTime(currentTimestampMs);
      totalQueueMinutes += queueMins;
      totalDwellMinutes += dwellMins;
      currentTimestampMs += (queueMins + dwellMins) * 60 * 1000;
      const departureTime = formatTime(currentTimestampMs);

      // Determine next destination (either food stop or next puja or end location)
      let nextTargetName = '';
      let legToNext: RouteSegment | undefined;

      const isFoodNext = Boolean(foodPlace && i === foodInsertionIndex);
      const isLastPuja = i === topCandidate.orderedPujaIds.length - 1;

      if (isFoodNext && foodPlace) {
        nextTargetName = foodPlace.name;
        const directWalkToFood = router.calculateWalkingBetweenCoords(puja.location, foodPlace.location, puja.name, foodPlace.name);
        const toFoodRoute = (directWalkToFood.totalDistanceMeters <= 850)
          ? directWalkToFood
          : (router.findRoute(
              puja.nearestTransitNodeIds[0],
              foodPlace.nearestTransitNodeId,
              { allowedModes: request.preferences.transportPreferences }
            ) ?? directWalkToFood);

        legToNext = {
          fromStopName: puja.name,
          toStopName: foodPlace.name,
          mode: toFoodRoute.usedModes[0] || 'WALK',
          distanceMeters: toFoodRoute.totalDistanceMeters,
          durationMinutes: toFoodRoute.totalDurationMinutes,
          costInr: toFoodRoute.totalCostInr,
          transitInstructions: toFoodRoute.stepDescriptions.join('; ')
        };

        totalTransitMinutes += toFoodRoute.totalDurationMinutes;
        totalWalkingMeters += toFoodRoute.totalWalkDistanceMeters;
        totalCostInr += toFoodRoute.totalCostInr;
      } else if (!isLastPuja) {
        const nextPuja = this.allPujas.get(topCandidate.orderedPujaIds[i + 1])!;
        nextTargetName = nextPuja.name;

        // Try direct walk first
        const directWalk = router.calculateWalkingBetweenCoords(puja.location, nextPuja.location, puja.name, nextPuja.name);
        const route = (directWalk.totalDistanceMeters <= 850)
          ? directWalk
          : (router.findRoute(
              puja.nearestTransitNodeIds[0],
              nextPuja.nearestTransitNodeIds[0],
              { allowedModes: request.preferences.transportPreferences }
            ) ?? directWalk);

        legToNext = {
          fromStopName: puja.name,
          toStopName: nextPuja.name,
          mode: route.usedModes[0] || 'WALK',
          distanceMeters: route.totalDistanceMeters,
          durationMinutes: route.totalDurationMinutes,
          costInr: route.totalCostInr,
          transitInstructions: route.stepDescriptions.join('; ')
        };

        totalTransitMinutes += route.totalDurationMinutes;
        totalWalkingMeters += route.totalWalkDistanceMeters;
        totalCostInr += route.totalCostInr;
      }

      stops.push({
        stopSequence: sequenceIndex++,
        type: 'PUJA_VISIT',
        name: puja.name,
        entityId: puja.id,
        location: puja.location,
        arrivalTime,
        departureTime,
        dwellTimeMinutes: dwellMins,
        expectedQueueMinutes: queueMins,
        estimatedStopCostInr: 0,
        transitSegmentToNext: legToNext,
        crowdSnapshot: crowd,
        nearbyFacilities: this.getFacilitiesForPuja(puja.id),
        advisoryNotes: [
          puja.currentThemeDescription ?? 'Traditional celebration',
          `Queue status: ${crowd?.level || 'MODERATE'} (${queueMins}m wait)`
        ]
      });

      if (legToNext) {
        currentTimestampMs += legToNext.durationMinutes * 60 * 1000;
      }

      // Insert Food Stop
      if (isFoodNext && foodPlace) {
        const foodArrival = formatTime(currentTimestampMs);
        const foodDining = foodPlace.averageDiningMinutes;
        const foodCost = foodPlace.averageCostPerPersonInr;

        totalDwellMinutes += foodDining;
        totalCostInr += foodCost;
        currentTimestampMs += foodDining * 60 * 1000;
        const foodDeparture = formatTime(currentTimestampMs);

        // Next leg from Food Place to next Puja
        let legFromFood: RouteSegment | undefined;
        if (!isLastPuja) {
          const nextPuja = this.allPujas.get(topCandidate.orderedPujaIds[i + 1])!;
          const directWalkFromFood = router.calculateWalkingBetweenCoords(foodPlace.location, nextPuja.location, foodPlace.name, nextPuja.name);
          const fromFoodRoute = (directWalkFromFood.totalDistanceMeters <= 850)
            ? directWalkFromFood
            : (router.findRoute(
                foodPlace.nearestTransitNodeId,
                nextPuja.nearestTransitNodeIds[0],
                { allowedModes: request.preferences.transportPreferences }
              ) ?? directWalkFromFood);

          legFromFood = {
            fromStopName: foodPlace.name,
            toStopName: nextPuja.name,
            mode: fromFoodRoute.usedModes[0] || 'WALK',
            distanceMeters: fromFoodRoute.totalDistanceMeters,
            durationMinutes: fromFoodRoute.totalDurationMinutes,
            costInr: fromFoodRoute.totalCostInr,
            transitInstructions: fromFoodRoute.stepDescriptions.join('; ')
          };

          totalTransitMinutes += fromFoodRoute.totalDurationMinutes;
          totalWalkingMeters += fromFoodRoute.totalWalkDistanceMeters;
          totalCostInr += fromFoodRoute.totalCostInr;
        }

        stops.push({
          stopSequence: sequenceIndex++,
          type: 'FOOD_STOP',
          name: foodPlace.name,
          entityId: foodPlace.id,
          location: foodPlace.location,
          arrivalTime: foodArrival,
          departureTime: foodDeparture,
          dwellTimeMinutes: foodDining,
          expectedQueueMinutes: 10,
          estimatedStopCostInr: foodCost,
          transitSegmentToNext: legFromFood,
          nearbyFacilities: [],
          advisoryNotes: [
            `Cuisine: ${foodPlace.cuisine}`,
            `Recommended: ${foodPlace.popularDishes.slice(0, 2).join(', ')}`
          ]
        });

        if (legFromFood) {
          currentTimestampMs += legFromFood.durationMinutes * 60 * 1000;
        }
      }
    }

    // --- Final Stop: END_POINT (Return to End Location) ---
    const lastPuja = this.allPujas.get(topCandidate.orderedPujaIds[topCandidate.orderedPujaIds.length - 1])!;
    const directWalkReturn = router.calculateWalkingBetweenCoords(lastPuja.location, request.endCoordinates, lastPuja.name, request.endLocationName);
    const returnLeg = (directWalkReturn.totalDistanceMeters <= 950)
      ? directWalkReturn
      : (router.findRoute(
          lastPuja.nearestTransitNodeIds[0],
          resolveNearestNode(request.endCoordinates, null, this.allPujas),
          { allowedModes: request.preferences.transportPreferences }
        ) ?? directWalkReturn);

    totalTransitMinutes += returnLeg.totalDurationMinutes;
    totalWalkingMeters += returnLeg.totalWalkDistanceMeters;
    totalCostInr += returnLeg.totalCostInr;
    currentTimestampMs += returnLeg.totalDurationMinutes * 60 * 1000;

    stops.push({
      stopSequence: sequenceIndex++,
      type: 'END_POINT',
      name: request.endLocationName,
      location: request.endCoordinates,
      arrivalTime: formatTime(currentTimestampMs),
      departureTime: formatTime(currentTimestampMs),
      dwellTimeMinutes: 0,
      expectedQueueMinutes: 0,
      estimatedStopCostInr: 0,
      nearbyFacilities: this.getFacilitiesNear(request.endCoordinates, 400),
      advisoryNotes: ['Tour concluded. Safe onward journey!']
    });

    const totalDurationMinutes = Math.round((currentTimestampMs - startTimestampMs) / (60 * 1000));

    return {
      itineraryId: `itin_${topCandidate.pathId}_${Date.now()}`,
      requestId: request.requestId,
      totalDurationMinutes,
      totalTravelMinutes: totalTransitMinutes,
      totalQueueMinutes,
      totalDwellMinutes,
      totalWalkingDistanceMeters: Math.round(totalWalkingMeters),
      totalCostInr,
      stops,
      visitedPujaIds: topCandidate.orderedPujaIds,
      scoreBreakdown: score,
      warnings
    };
  }

  private getFacilitiesForPuja(pujaId: string): readonly Facility[] {
    return this.allFacilities.filter(f => f.associatedPujaId === pujaId);
  }

  private getFacilitiesNear(coords: { latitude: number; longitude: number }, radiusMeters: number): readonly Facility[] {
    return this.allFacilities.filter(f => {
      const dLat = (f.location.latitude - coords.latitude) * 111000;
      const dLon = (f.location.longitude - coords.longitude) * 102000;
      return Math.hypot(dLat, dLon) <= radiusMeters;
    });
  }
}

function formatTime(timestampMs: number): string {
  const d = new Date(timestampMs);
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

function resolveNearestNode(
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
