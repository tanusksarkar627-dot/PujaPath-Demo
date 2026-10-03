/**
 * PUJAPATH - Deterministic Scoring Engine
 * Phase 2: Transparent Multi-Objective Scoring Formulation
 */

import {
  CandidatePath,
  FeasibilityAssessment,
  IScoringEngine,
  ScoringWeights,
  DEFAULT_SCORING_WEIGHTS
} from '../types/engine';
import {
  TripRequest,
  ItineraryScoreBreakdown,
  CrowdStatus,
  Puja
} from '../types/domain';

export class DeterministicScoringEngine implements IScoringEngine {
  private readonly allPujas: ReadonlyMap<string, Puja>;

  constructor(pujas: readonly Puja[]) {
    this.allPujas = new Map(pujas.map(p => [p.id, p]));
  }

  scoreItinerary(
    candidate: CandidatePath,
    request: TripRequest,
    feasibility: FeasibilityAssessment,
    crowdMap: ReadonlyMap<string, CrowdStatus>,
    weights: ScoringWeights = DEFAULT_SCORING_WEIGHTS
  ): ItineraryScoreBreakdown {
    // 1. Puja Count Achievement Score (Coverage: 0 - 100)
    // S_count = min(1.0, delivered / desired) * 100
    const countRatio = Math.min(1.0, candidate.orderedPujaIds.length / Math.max(1, request.desiredPujaCount));
    const pujaCountScore = Math.round(countRatio * 100);

    // 2. Preference Match Score (0 - 100)
    // Rewards aligning with user's requested categories and tags
    let matchedCategories = 0;
    const preferredCats = request.preferences.preferredCategories || [];
    for (const id of candidate.orderedPujaIds) {
      const puja = this.allPujas.get(id);
      if (puja && preferredCats.includes(puja.category)) {
        matchedCategories++;
      }
    }
    const preferenceMatchScore = preferredCats.length > 0
      ? Math.round((matchedCategories / Math.max(1, candidate.orderedPujaIds.length)) * 100)
      : 85; // neutral baseline if no specific category filter requested

    // 3. Time Efficiency Score (0 - 100)
    // Dwell ratio vs total transit & queue time
    const dwellRatio = feasibility.estimatedTotalMinutes > 0
      ? Math.min(1.0, candidate.estimatedDwellMinutes / feasibility.estimatedTotalMinutes)
      : 0.5;
    const timeEfficiencyScore = Math.round(dwellRatio * 100);

    // 4. Walking Comfort Score (0 - 100)
    // High score when walking is low, penalized when minimal walking is requested but segments are long
    let walkingPenalty = 0;
    if (request.preferences.walkingTolerance === 'MINIMAL') {
      // Bonus if minimal walking strictly satisfied
      walkingPenalty = 5;
    } else if (request.preferences.walkingTolerance === 'MODERATE') {
      walkingPenalty = 15;
    } else {
      walkingPenalty = 25;
    }
    const walkingComfortScore = Math.max(10, 100 - walkingPenalty);

    // 5. Budget Efficiency Score (0 - 100)
    // Score based on remaining buffer ratio
    const costRatio = request.budgetInr > 0 
      ? feasibility.estimatedTotalCostInr / request.budgetInr 
      : 0;
    const budgetEfficiencyScore = costRatio <= 1.0 
      ? Math.round((1 - (costRatio * 0.35)) * 100) 
      : 0;

    // 6. Crowd Safety Score (0 - 100)
    // Deducts heavily for EXTREME or HIGH crowds
    let crowdPenaltySum = 0;
    for (const id of candidate.orderedPujaIds) {
      const status = crowdMap.get(id);
      if (status?.level === 'EXTREME') crowdPenaltySum += 35;
      else if (status?.level === 'HIGH') crowdPenaltySum += 18;
      else if (status?.level === 'MODERATE') crowdPenaltySum += 5;
    }
    const avgCrowdPenalty = crowdPenaltySum / Math.max(1, candidate.orderedPujaIds.length);
    const crowdSafetyScore = Math.max(5, Math.round(100 - avgCrowdPenalty));

    // Composite Weighted Sum
    const composite = 
      (pujaCountScore * weights.pujaCountWeight) +
      (preferenceMatchScore * weights.preferenceWeight) +
      (timeEfficiencyScore * weights.timeEfficiencyWeight) +
      (walkingComfortScore * weights.walkingComfortWeight) +
      (budgetEfficiencyScore * weights.budgetEfficiencyWeight) +
      (crowdSafetyScore * weights.crowdSafetyWeight);

    return {
      pujaCountScore,
      preferenceMatchScore,
      timeEfficiencyScore,
      walkingComfortScore,
      budgetEfficiencyScore,
      crowdSafetyScore,
      overallCompositeScore: Math.round(composite * 10) / 10
    };
  }
}
