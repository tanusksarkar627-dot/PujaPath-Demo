/**
 * PUJAPATH - Candidate Sequence Generator
 * Phase 2: Corridor & Cluster-Aware Multi-Stop Permutation Generator
 */

import {
  Puja,
  FoodPlace,
  TripRequest,
  PujaCategory
} from '../types/domain';
import { CandidatePath, ICandidateGenerator } from '../types/engine';
import { calculateHaversineDistanceMeters } from '../services/mock/database';

export class CorridorCandidateGenerator implements ICandidateGenerator {
  async generateCandidates(
    request: TripRequest,
    availablePujas: readonly Puja[],
    availableFood: readonly FoodPlace[]
  ): Promise<readonly CandidatePath[]> {
    const candidates: CandidatePath[] = [];

    // 1. Score and Rank Pujas by Preference & Proximity
    const rankedPujas = this.rankPujasByPreference(request, availablePujas);

    // 2. Identify Candidate Food Place (if required, aligned with corridor)
    let selectedFoodPlace: FoodPlace | undefined;
    if (request.preferences.requiresFoodStop) {
      selectedFoodPlace = this.selectBestFoodPlace(request, availableFood, rankedPujas);
    }

    // 3. Cluster Candidates by Spatial Corridor
    const targetCount = request.desiredPujaCount;

    // A. Primary Preference-Optimized Sequence (Target Count)
    const primaryPujaIds = this.buildCoherentCorridor(request, rankedPujas, targetCount);
    if (primaryPujaIds.length > 0) {
      const dwellMins = primaryPujaIds.reduce((sum, id) => {
        const p = availablePujas.find(puja => puja.id === id);
        const nominal = p?.typicalDwellMinutes ?? 35;
        return sum + (primaryPujaIds.length >= 5 ? Math.min(28, nominal) : nominal);
      }, 0);

      candidates.push({
        pathId: `cand_primary_${targetCount}pujas_${Date.now()}`,
        orderedPujaIds: primaryPujaIds,
        foodPlaceId: selectedFoodPlace?.id,
        estimatedDwellMinutes: dwellMins
      });
    }

    // B. Alternative Scenic / Heritage Cluster Sequence
    const heritagePujas = rankedPujas.filter(
      p => p.category === 'HERITAGE_BONEDI' || p.category === 'COMMUNITY_ICONIC' || p.category === 'ART_THEMATIC'
    );
    const heritagePujaIds = this.buildCoherentCorridor(request, heritagePujas, targetCount);
    if (heritagePujaIds.length > 0 && !areArraysEqual(heritagePujaIds, primaryPujaIds)) {
      const dwellMins = heritagePujaIds.reduce((sum, id) => {
        const p = availablePujas.find(puja => puja.id === id);
        const nominal = p?.typicalDwellMinutes ?? 35;
        return sum + (heritagePujaIds.length >= 5 ? Math.min(28, nominal) : nominal);
      }, 0);

      candidates.push({
        pathId: `cand_heritage_${targetCount}pujas_${Date.now()}`,
        orderedPujaIds: heritagePujaIds,
        foodPlaceId: selectedFoodPlace?.id,
        estimatedDwellMinutes: dwellMins
      });
    }

    // C. Partial / Reduced Count Sequences (for fallback & trade-offs)
    if (targetCount > 2) {
      const reducedCount = targetCount - 1;
      const reducedPujaIds = primaryPujaIds.slice(0, reducedCount);
      const dwellMins = reducedPujaIds.reduce((sum, id) => {
        const p = availablePujas.find(puja => puja.id === id);
        const nominal = p?.typicalDwellMinutes ?? 35;
        return sum + (reducedPujaIds.length >= 5 ? Math.min(28, nominal) : nominal);
      }, 0);

      candidates.push({
        pathId: `cand_reduced_${reducedCount}pujas_${Date.now()}`,
        orderedPujaIds: reducedPujaIds,
        foodPlaceId: selectedFoodPlace?.id,
        estimatedDwellMinutes: dwellMins
      });
    }

    // D. Minimal High-Efficiency Sequence (e.g. 3 Pujas for tight budgets or short deadlines)
    if (targetCount > 3) {
      const tightPujaIds = primaryPujaIds.slice(0, 3);
      const dwellMins = tightPujaIds.reduce((sum, id) => {
        const p = availablePujas.find(puja => puja.id === id);
        return sum + (p?.typicalDwellMinutes ?? 28);
      }, 0);

      candidates.push({
        pathId: `cand_tight_3pujas_${Date.now()}`,
        orderedPujaIds: tightPujaIds,
        foodPlaceId: selectedFoodPlace?.id,
        estimatedDwellMinutes: dwellMins
      });
    }

    return candidates;
  }

  private rankPujasByPreference(
    request: TripRequest,
    availablePujas: readonly Puja[]
  ): Puja[] {
    const preferredCats = new Set<PujaCategory>(request.preferences.preferredCategories ?? []);
    const mustInclude = new Set<string>(request.mustIncludePujaIds ?? []);

    return [...availablePujas].sort((a, b) => {
      // 1. Must include first
      const aMust = mustInclude.has(a.id) ? 1 : 0;
      const bMust = mustInclude.has(b.id) ? 1 : 0;
      if (aMust !== bMust) return bMust - aMust;

      // 2. Preferred category match
      const aPref = preferredCats.has(a.category) ? 1 : 0;
      const bPref = preferredCats.has(b.category) ? 1 : 0;
      if (aPref !== bPref) return bPref - aPref;

      // 3. Proximity to start location
      const aDist = calculateHaversineDistanceMeters(request.startCoordinates, a.location);
      const bDist = calculateHaversineDistanceMeters(request.startCoordinates, b.location);
      return aDist - bDist;
    });
  }

  private selectBestFoodPlace(
    request: TripRequest,
    availableFood: readonly FoodPlace[],
    corridorPujas: readonly Puja[] = []
  ): FoodPlace | undefined {
    if (availableFood.length === 0) return undefined;

    const preferredCuisine = request.preferences.preferredCuisine;
    const maxBudget = request.preferences.maxFoodBudgetInr ?? (request.budgetInr * 0.45);

    // Filter within budget
    const affordable = availableFood.filter(f => f.averageCostPerPersonInr <= maxBudget);
    const pool = affordable.length > 0 ? affordable : availableFood;

    // Filter by cuisine if preferred
    const cuisineMatches = preferredCuisine
      ? pool.filter(f => f.cuisine === preferredCuisine)
      : pool;
    const candidates = cuisineMatches.length > 0 ? cuisineMatches : pool;

    // Corridor proximity: Pick the food place closest to the midpoint of the corridor
    if (corridorPujas.length > 0) {
      const midPuja = corridorPujas[Math.min(2, Math.floor(corridorPujas.length / 2))];
      return [...candidates].sort((a, b) => {
        const distA = calculateHaversineDistanceMeters(midPuja.location, a.location);
        const distB = calculateHaversineDistanceMeters(midPuja.location, b.location);
        return distA - distB;
      })[0];
    }

    return [...candidates].sort((a, b) => a.averageCostPerPersonInr - b.averageCostPerPersonInr)[0];
  }

  /**
   * Constructs a spatially coherent sequence that minimizes zig-zag backtracking.
   */
  private buildCoherentCorridor(
    request: TripRequest,
    pool: readonly Puja[],
    count: number
  ): string[] {
    if (pool.length === 0) return [];
    const needed = Math.min(count, pool.length);

    const remaining = [...pool];
    const ordered: Puja[] = [];

    // Pick first puja closest to start location
    let currentCoords = request.startCoordinates;

    while (ordered.length < needed && remaining.length > 0) {
      let nearestIdx = 0;
      let minDistance = Number.MAX_VALUE;

      for (let i = 0; i < remaining.length; i++) {
        const candidate = remaining[i];
        const dist = calculateHaversineDistanceMeters(currentCoords, candidate.location);
        if (dist < minDistance) {
          minDistance = dist;
          nearestIdx = i;
        }
      }

      const selected = remaining.splice(nearestIdx, 1)[0];
      ordered.push(selected);
      currentCoords = selected.location;
    }

    return ordered.map(p => p.id);
  }
}

function areArraysEqual(a: readonly string[], b: readonly string[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((val, idx) => val === b[idx]);
}
