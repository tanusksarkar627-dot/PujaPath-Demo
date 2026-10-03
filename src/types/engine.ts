/**
 * PUJAPATH - Itinerary Engine Architecture and Pipeline Contracts
 * Phase 0: Deterministic Multi-Stop Optimization Engine
 */

import {
  TripRequest,
  Itinerary,
  ItineraryResult,
  ItineraryScoreBreakdown,
  EngineConstraintViolation,
  Puja,
  TransitConnection,
  FoodPlace,
  CrowdStatus,
  WeatherCondition,
  OptimizationWarning,
  ItineraryStop
} from './domain';

// ==========================================
// 1. Engine Configuration & Weights
// ==========================================

export interface ScoringWeights {
  /** Weight for matching user category/tag preferences (Default: 0.25) */
  readonly preferenceWeight: number;
  /** Weight for hitting target puja count without rushing (Default: 0.25) */
  readonly pujaCountWeight: number;
  /** Weight for maximizing time spent at pandals vs sitting in traffic (Default: 0.15) */
  readonly timeEfficiencyWeight: number;
  /** Weight for avoiding excessive walking or bad connections (Default: 0.15) */
  readonly walkingComfortWeight: number;
  /** Weight for staying well within user budget (Default: 0.10) */
  readonly budgetEfficiencyWeight: number;
  /** Weight for avoiding high crowd choke points (Default: 0.10) */
  readonly crowdSafetyWeight: number;
}

export const DEFAULT_SCORING_WEIGHTS: ScoringWeights = {
  preferenceWeight: 0.25,
  pujaCountWeight: 0.25,
  timeEfficiencyWeight: 0.15,
  walkingComfortWeight: 0.15,
  budgetEfficiencyWeight: 0.10,
  crowdSafetyWeight: 0.10,
};

export interface EngineLimits {
  /** Maximum candidate clusters to expand */
  readonly maxCandidateBranches: number;
  /** Search timeout budget in milliseconds to prevent UI freezing */
  readonly maxExecutionTimeMs: number;
  /** Default buffer time added for festival unpredictable transit (minutes) */
  readonly contingencyBufferMinutes: number;
}

export const DEFAULT_ENGINE_LIMITS: EngineLimits = {
  maxCandidateBranches: 50,
  maxExecutionTimeMs: 1200,
  contingencyBufferMinutes: 25,
};

// ==========================================
// 2. Candidate Generation Stage
// ==========================================

export interface CandidateStopCluster {
  readonly zone: string;
  readonly candidatePujas: readonly Puja[];
  readonly candidateFoodPlaces: readonly FoodPlace[];
  readonly gatewayTransitNodeIds: readonly string[];
}

export interface CandidatePath {
  readonly pathId: string;
  readonly orderedPujaIds: readonly string[];
  readonly foodPlaceId?: string;
  readonly estimatedDwellMinutes: number;
}

export interface ICandidateGenerator {
  /**
   * Generates geographically and transit-viable subsets of Pujas and Food places
   * within reach of the start/end locations.
   */
  generateCandidates(
    request: TripRequest,
    availablePujas: readonly Puja[],
    availableFood: readonly FoodPlace[]
  ): Promise<readonly CandidatePath[]>;
}

// ==========================================
// 3. Feasibility Filtering Stage
// ==========================================

export interface FeasibilityAssessment {
  readonly isFeasible: boolean;
  readonly fatalViolations: readonly EngineConstraintViolation[];
  readonly warnings: readonly OptimizationWarning[];
  readonly estimatedTotalCostInr: number;
  readonly estimatedTotalMinutes: number;
}

export interface IFeasibilityFilter {
  /**
   * Evaluates candidate paths against hard physical constraints:
   * 1. Total duration <= (deadline - startTime)
   * 2. Total cost <= budget
   * 3. Start node and End node reachability
   * 4. Maximum walking limit compliance
   */
  filterFeasible(
    candidate: CandidatePath,
    request: TripRequest,
    transitGraph: ReadonlyMap<string, readonly TransitConnection[]>,
    crowdMap: ReadonlyMap<string, CrowdStatus>,
    weather?: WeatherCondition
  ): FeasibilityAssessment;
}

// ==========================================
// 4. Scoring & Ranking Stage
// ==========================================

export interface IScoringEngine {
  /**
   * Deterministically scores a feasible candidate path based on soft criteria.
   * Produces an exact, reproducible numerical score between 0 and 100.
   */
  scoreItinerary(
    candidate: CandidatePath,
    request: TripRequest,
    feasibility: FeasibilityAssessment,
    crowdMap: ReadonlyMap<string, CrowdStatus>,
    weights?: ScoringWeights
  ): ItineraryScoreBreakdown;
}

// ==========================================
// 5. Itinerary Construction Stage
// ==========================================

export interface IRouteBuilder {
  /**
   * Assembles the detailed turn-by-turn and stop-by-stop Itinerary from the top-scoring candidate.
   * Calculates timestamps, transit directions, and facility associations.
   */
  buildDetailedItinerary(
    topCandidate: CandidatePath,
    request: TripRequest,
    score: ItineraryScoreBreakdown,
    warnings: readonly OptimizationWarning[],
    transitGraph: ReadonlyMap<string, readonly TransitConnection[]>,
    crowdMap: ReadonlyMap<string, CrowdStatus>
  ): Itinerary;
}

// ==========================================
// 6. Complete Itinerary Optimization Engine Interface
// ==========================================

export interface IItineraryOptimizationEngine {
  /**
   * End-to-end execution of the deterministic itinerary pipeline.
   * 1. Validate request
   * 2. Fetch context data (Pujas, Transit, Food, Crowd, Weather)
   * 3. Candidate Generation
   * 4. Feasibility Pruning
   * 5. Scoring & Ranking
   * 6. Route Building
   * 7. Result Packaging (Primary + Top Alternatives)
   */
  generateItinerary(request: TripRequest): Promise<ItineraryResult>;
}
