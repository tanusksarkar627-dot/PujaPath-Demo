/**
 * PUJAPATH - Deterministic Itinerary Optimizer Engine
 * Phase 2: Full Pipeline Orchestrator with Failure Handling & Trade-Off Suggestions
 */

import {
  TripRequest,
  Itinerary,
  ItineraryResult,
  OptimizationWarning,
  EngineConstraintViolation
} from '../types/domain';
import {
  CandidatePath,
  FeasibilityAssessment,
  IItineraryOptimizationEngine,
  ScoringWeights,
  DEFAULT_SCORING_WEIGHTS
} from '../types/engine';
import {
  IPujaRepository,
  ITransitRepository,
  IFoodRepository,
  IFacilityRepository,
  ICrowdService,
  IWeatherService
} from '../types/services';
import { validateTripRequest } from './validator';
import { CorridorCandidateGenerator } from './candidateGenerator';
import { DeterministicFeasibilityFilter } from './feasibilityFilter';
import { DeterministicScoringEngine } from './scoring';
import { DeterministicRouteBuilder } from './routeBuilder';

export class DeterministicItineraryEngine implements IItineraryOptimizationEngine {
  constructor(
    private readonly pujaRepo: IPujaRepository,
    private readonly transitRepo: ITransitRepository,
    private readonly foodRepo: IFoodRepository,
    private readonly facilityRepo: IFacilityRepository,
    private readonly crowdService: ICrowdService,
    private readonly weatherService: IWeatherService,
    private readonly scoringWeights: ScoringWeights = DEFAULT_SCORING_WEIGHTS
  ) {}

  async generateItinerary(request: TripRequest): Promise<ItineraryResult> {
    const startTimePerf = performance.now();

    // Stage 1: Deterministic Request Validation
    const validation = validateTripRequest(request);
    if (!validation.isValid) {
      return {
        status: 'INFEASIBLE',
        alternativeItineraries: [],
        violations: validation.errors,
        suggestedAdjustments: validation.errors.map(e => `Correct input: ${e.details}`),
        engineMetrics: {
          candidatesEvaluated: 0,
          prunedPathsCount: 0,
          executionDurationMs: Math.round(performance.now() - startTimePerf)
        },
        generatedAtIso: new Date().toISOString()
      };
    }

    // Stage 2: Context Data Retrieval
    const [allPujas, allFood, transitGraph, allFacilities] = await Promise.all([
      this.pujaRepo.getAllPujas(),
      this.foodRepo.getAllFoodPlaces(),
      this.transitRepo.getTransitGraph(),
      this.facilityRepo.getEmergencyBooths()
    ]);

    const pujaMap = new Map(allPujas.map(p => [p.id, p]));
    const foodMap = new Map(allFood.map(f => [f.id, f]));

    // Stage 3: Candidate Generation (Corridor & Cluster Aware)
    const generator = new CorridorCandidateGenerator();
    const candidatePaths = await generator.generateCandidates(request, allPujas, allFood);

    // Fetch dynamic crowd data for all candidate entities
    const allCandidatePujaIds = Array.from(new Set(candidatePaths.flatMap(c => c.orderedPujaIds)));
    const crowdMap = await this.crowdService.getCrowdStatuses(allCandidatePujaIds);

    // Stage 4 & 5: Feasibility Pruning & Scoring
    const filter = new DeterministicFeasibilityFilter(pujaMap, foodMap);
    const scorer = new DeterministicScoringEngine(allPujas);
    const builder = new DeterministicRouteBuilder(pujaMap, foodMap, allFacilities);

    let evaluatedCount = 0;
    let prunedCount = 0;
    const allViolations: EngineConstraintViolation[] = [];

    const fullFeasibleItineraries: Itinerary[] = [];
    const partialFeasibleItineraries: Itinerary[] = [];

    for (const cand of candidatePaths) {
      evaluatedCount++;
      const assessment: FeasibilityAssessment = filter.filterFeasible(cand, request, transitGraph, crowdMap);

      if (!assessment.isFeasible) {
        prunedCount++;
        allViolations.push(...assessment.fatalViolations);
        continue;
      }

      // Score the candidate
      const score = scorer.scoreItinerary(cand, request, assessment, crowdMap, this.scoringWeights);

      // Build detailed turn-by-turn route
      const itinerary = builder.buildDetailedItinerary(
        cand,
        request,
        score,
        assessment.warnings,
        transitGraph,
        crowdMap
      );

      if (cand.orderedPujaIds.length >= request.desiredPujaCount) {
        fullFeasibleItineraries.push(itinerary);
      } else {
        partialFeasibleItineraries.push(itinerary);
      }
    }

    // Sort descending by composite score
    fullFeasibleItineraries.sort(
      (a, b) => b.scoreBreakdown.overallCompositeScore - a.scoreBreakdown.overallCompositeScore
    );
    partialFeasibleItineraries.sort(
      (a, b) => b.scoreBreakdown.overallCompositeScore - a.scoreBreakdown.overallCompositeScore
    );

    const executionDurationMs = Math.round(performance.now() - startTimePerf);

    // Case 1: Full Success (Requested Puja count fully met within constraints)
    if (fullFeasibleItineraries.length > 0) {
      const primary = fullFeasibleItineraries[0];
      const alternatives = [
        ...fullFeasibleItineraries.slice(1),
        ...partialFeasibleItineraries.slice(0, 2)
      ];

      return {
        status: 'SUCCESS',
        primaryItinerary: primary,
        alternativeItineraries: alternatives,
        engineMetrics: {
          candidatesEvaluated: evaluatedCount,
          prunedPathsCount: prunedCount,
          executionDurationMs
        },
        generatedAtIso: new Date().toISOString()
      };
    }

    // Case 2: Partial Success (Achievable with reduced Pujas)
    if (partialFeasibleItineraries.length > 0) {
      const primary = partialFeasibleItineraries[0];
      const alternatives = partialFeasibleItineraries.slice(1);

      return {
        status: 'PARTIAL_SUCCESS',
        primaryItinerary: primary,
        alternativeItineraries: alternatives,
        violations: deduplicateViolations(allViolations),
        suggestedAdjustments: [
          `Plan adjusted to ${primary.visitedPujaIds.length} Pujas instead of requested ${request.desiredPujaCount} to fit within time and budget limits.`,
          'To visit all desired Pujas, extend your return deadline by at least 60-90 minutes or increase budget.'
        ],
        engineMetrics: {
          candidatesEvaluated: evaluatedCount,
          prunedPathsCount: prunedCount,
          executionDurationMs
        },
        generatedAtIso: new Date().toISOString()
      };
    }

    // Case 3: Infeasible (Hard limits make all routes impossible)
    const suggestions = generateActionableSuggestions(allViolations, request);

    return {
      status: 'INFEASIBLE',
      alternativeItineraries: [],
      violations: deduplicateViolations(allViolations),
      suggestedAdjustments: suggestions,
      engineMetrics: {
        candidatesEvaluated: evaluatedCount,
        prunedPathsCount: prunedCount,
        executionDurationMs
      },
      generatedAtIso: new Date().toISOString()
    };
  }
}

function deduplicateViolations(violations: readonly EngineConstraintViolation[]): EngineConstraintViolation[] {
  const seen = new Set<string>();
  const unique: EngineConstraintViolation[] = [];
  for (const v of violations) {
    const key = `${v.constraintName}:${v.details}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(v);
    }
  }
  return unique;
}

function generateActionableSuggestions(
  violations: readonly EngineConstraintViolation[],
  request: TripRequest
): string[] {
  const suggestions: string[] = [];

  const hasDeadlineViolation = violations.some(v => v.constraintName === 'EXCEEDS_DEADLINE');
  const hasBudgetViolation = violations.some(v => v.constraintName === 'EXCEEDS_BUDGET');
  const hasWalkingViolation = violations.some(v => v.constraintName === 'EXCESSIVE_WALKING' || v.constraintName === 'NO_VALID_TRANSPORT_CONNECTION');

  if (hasDeadlineViolation) {
    suggestions.push(`Extend your return deadline by 60 to 120 minutes or reduce desired Puja count (currently ${request.desiredPujaCount}).`);
  }
  if (hasBudgetViolation) {
    suggestions.push(`Increase your budget by ₹150 - ₹300 (currently ₹${request.budgetInr}) or choose street-food dining instead of dine-in.`);
  }
  if (hasWalkingViolation) {
    suggestions.push('Switch walking preference from "MINIMAL" to "MODERATE", or allow shared auto-rickshaws for festive arterial links.');
  }

  if (suggestions.length === 0) {
    suggestions.push('Reduce the number of requested pandals or select a start location closer to the central festival corridor.');
  }

  return suggestions;
}
