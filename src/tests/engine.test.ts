/**
 * PUJAPATH - Deterministic Itinerary Engine Test Suite
 * Phase 2: Comprehensive Constraint & Optimization Unit Tests
 */

import { DeterministicItineraryEngine } from '../engine/optimizer';
import {
  MockPujaRepository,
  MockTransitRepository,
  MockFoodRepository,
  MockFacilityRepository,
  MockCrowdService,
  MockWeatherService
} from '../services/mock/repositories';
import { TripRequest, ItineraryResult } from '../types/domain';

export interface EngineTestCaseResult {
  readonly id: string;
  readonly name: string;
  readonly passed: boolean;
  readonly details: string;
  readonly rawResult?: unknown;
}

export async function runEngineTestSuite(): Promise<EngineTestCaseResult[]> {
  const results: EngineTestCaseResult[] = [];

  const pujaRepo = new MockPujaRepository();
  const transitRepo = new MockTransitRepository();
  const foodRepo = new MockFoodRepository();
  const facilityRepo = new MockFacilityRepository();
  const crowdService = new MockCrowdService();
  const weatherService = new MockWeatherService();

  const engine = new DeterministicItineraryEngine(
    pujaRepo,
    transitRepo,
    foodRepo,
    facilityRepo,
    crowdService,
    weatherService
  );

  // --- Test 1: Normal 5-Puja Canonical Itinerary (Sealdah 17:00 - 23:00, ₹700, Bengali Food) ---
  {
    const req: TripRequest = {
      requestId: 'test_canonical_5puja',
      startLocationName: 'Sealdah Railway Station',
      startCoordinates: { latitude: 22.5675, longitude: 88.3712 },
      endLocationName: 'Sealdah Railway Station',
      endCoordinates: { latitude: 22.5675, longitude: 88.3712 },
      startTime: '2026-10-02T17:00:00Z',
      deadlineTime: '2026-10-02T23:00:00Z', // 360 mins
      budgetInr: 700,
      desiredPujaCount: 5,
      preferences: {
        preferredCategories: ['HERITAGE_BONEDI', 'COMMUNITY_ICONIC', 'ILLUMINATION_LIGHT'],
        transportPreferences: ['METRO_BLUE', 'METRO_GREEN', 'AUTO_RICKSHAW', 'WALK'],
        walkingTolerance: 'MINIMAL',
        crowdTolerance: 'BALANCED',
        requiresFoodStop: true,
        preferredCuisine: 'BENGALI_TRADITIONAL',
        weatherSensitive: true
      }
    };

    const res = await engine.generateItinerary(req);
    const primary = res.primaryItinerary;
    const isSuccess = res.status === 'SUCCESS';
    const withinTime = primary ? primary.totalDurationMinutes <= 360 : false;
    const withinBudget = primary ? primary.totalCostInr <= 700 : false;
    const hasFood = primary ? primary.stops.some(s => s.type === 'FOOD_STOP') : false;
    const countAchieved = primary ? primary.visitedPujaIds.length === 5 : false;

    const passed = isSuccess && withinTime && withinBudget && hasFood && countAchieved;
    results.push({
      id: 'ENG-001',
      name: 'Normal 5-Puja Canonical Itinerary',
      passed,
      details: primary
        ? `Status: ${res.status}, Visited: ${primary.visitedPujaIds.length} pujas, Time: ${primary.totalDurationMinutes}m / 360m, Cost: ₹${primary.totalCostInr} / ₹700, Food stop: ${hasFood}`
        : `Failed to generate primary itinerary. Status: ${res.status}`,
      rawResult: primary
    });
  }

  // --- Test 2: Insufficient Time Window ---
  {
    const req: TripRequest = {
      requestId: 'test_insufficient_time',
      startLocationName: 'Sealdah Railway Station',
      startCoordinates: { latitude: 22.5675, longitude: 88.3712 },
      endLocationName: 'Sealdah Railway Station',
      endCoordinates: { latitude: 22.5675, longitude: 88.3712 },
      startTime: '2026-10-02T17:00:00Z',
      deadlineTime: '2026-10-02T18:00:00Z', // Only 60 mins for 5 pujas!
      budgetInr: 700,
      desiredPujaCount: 5,
      preferences: {
        transportPreferences: ['METRO_BLUE', 'WALK'],
        walkingTolerance: 'MODERATE',
        crowdTolerance: 'BALANCED',
        requiresFoodStop: false,
        weatherSensitive: true
      }
    };

    const res = await engine.generateItinerary(req);
    // Must be either INFEASIBLE or PARTIAL_SUCCESS (cannot be full SUCCESS for 5 pujas)
    const passed = res.status !== 'SUCCESS' && (res.violations?.length ?? 0) > 0;
    results.push({
      id: 'ENG-002',
      name: 'Insufficient Time Window Rejection',
      passed,
      details: `Status: ${res.status}, Fatal violations detected: ${res.violations?.map(v => v.constraintName).join(', ')}`
    });
  }

  // --- Test 3: Insufficient Budget ---
  {
    const req: TripRequest = {
      requestId: 'test_insufficient_budget',
      startLocationName: 'Sealdah Railway Station',
      startCoordinates: { latitude: 22.5675, longitude: 88.3712 },
      endLocationName: 'Sealdah Railway Station',
      endCoordinates: { latitude: 22.5675, longitude: 88.3712 },
      startTime: '2026-10-02T17:00:00Z',
      deadlineTime: '2026-10-02T23:00:00Z',
      budgetInr: 30, // ₹30 is insufficient for 5 pujas + dine-in Bengali food
      desiredPujaCount: 5,
      preferences: {
        transportPreferences: ['METRO_BLUE', 'WALK'],
        walkingTolerance: 'MODERATE',
        crowdTolerance: 'BALANCED',
        requiresFoodStop: true,
        preferredCuisine: 'BENGALI_TRADITIONAL',
        weatherSensitive: true
      }
    };

    const res = await engine.generateItinerary(req);
    const passed = res.status !== 'SUCCESS' && res.violations?.some(v => v.constraintName === 'EXCEEDS_BUDGET');
    results.push({
      id: 'ENG-003',
      name: 'Insufficient Budget Rejection',
      passed: Boolean(passed),
      details: `Status: ${res.status}, Detected EXCEEDS_BUDGET: ${passed}`
    });
  }

  // --- Test 4: Excessive Walking Rejection ---
  {
    const req: TripRequest = {
      requestId: 'test_excessive_walking',
      startLocationName: 'Sealdah Railway Station',
      startCoordinates: { latitude: 22.5675, longitude: 88.3712 },
      endLocationName: 'Suruchi Sangha', // Far South New Alipore
      endCoordinates: { latitude: 22.5085, longitude: 88.3275 },
      startTime: '2026-10-02T17:00:00Z',
      deadlineTime: '2026-10-02T23:00:00Z',
      budgetInr: 700,
      desiredPujaCount: 5,
      preferences: {
        transportPreferences: ['WALK'], // Only walk allowed over ~9km!
        walkingTolerance: 'MINIMAL',    // Strict minimal walk
        crowdTolerance: 'BALANCED',
        requiresFoodStop: false,
        weatherSensitive: true
      }
    };

    const res = await engine.generateItinerary(req);
    const passed = res.status !== 'SUCCESS' && res.violations?.some(v => v.constraintName === 'EXCESSIVE_WALKING' || v.constraintName === 'NO_VALID_TRANSPORT_CONNECTION');
    results.push({
      id: 'ENG-004',
      name: 'Excessive Walking Constraint Enforcement',
      passed: Boolean(passed),
      details: `Status: ${res.status}, Violations: ${res.violations?.map(v => v.constraintName).join(', ')}`
    });
  }

  // --- Test 5: Transport Mode Restrictions ---
  {
    const req: TripRequest = {
      requestId: 'test_mode_restriction',
      startLocationName: 'Sealdah Railway Station',
      startCoordinates: { latitude: 22.5675, longitude: 88.3712 },
      endLocationName: 'Sealdah Railway Station',
      endCoordinates: { latitude: 22.5675, longitude: 88.3712 },
      startTime: '2026-10-02T17:00:00Z',
      deadlineTime: '2026-10-02T23:00:00Z',
      budgetInr: 700,
      desiredPujaCount: 4,
      preferences: {
        transportPreferences: ['METRO_BLUE', 'METRO_GREEN', 'WALK'],
        walkingTolerance: 'MODERATE',
        crowdTolerance: 'BALANCED',
        requiresFoodStop: false,
        weatherSensitive: false
      }
    };

    const res = await engine.generateItinerary(req);
    const primary = res.primaryItinerary;
    const usedModes = primary ? primary.stops.flatMap(s => s.transitSegmentToNext?.mode ? [s.transitSegmentToNext.mode] : []) : [];
    const onlyAllowedModesUsed = usedModes.every(m => m === 'METRO_BLUE' || m === 'METRO_GREEN' || m === 'WALK');

    results.push({
      id: 'ENG-005',
      name: 'Transport Mode Preferences Strict Compliance',
      passed: Boolean(primary && onlyAllowedModesUsed),
      details: `Used modes: [${Array.from(new Set(usedModes)).join(', ')}]. Compliant with allowed modes: ${onlyAllowedModesUsed}`
    });
  }

  // --- Test 6: Food Requirement Satisfaction ---
  {
    const req: TripRequest = {
      requestId: 'test_food_requirement',
      startLocationName: 'Sealdah Railway Station',
      startCoordinates: { latitude: 22.5675, longitude: 88.3712 },
      endLocationName: 'Sealdah Railway Station',
      endCoordinates: { latitude: 22.5675, longitude: 88.3712 },
      startTime: '2026-10-02T17:00:00Z',
      deadlineTime: '2026-10-02T23:00:00Z',
      budgetInr: 800,
      desiredPujaCount: 4,
      preferences: {
        transportPreferences: ['METRO_BLUE', 'METRO_GREEN', 'WALK'],
        walkingTolerance: 'MODERATE',
        crowdTolerance: 'BALANCED',
        requiresFoodStop: true,
        preferredCuisine: 'BENGALI_TRADITIONAL',
        weatherSensitive: false
      }
    };

    const res = await engine.generateItinerary(req);
    const primary = res.primaryItinerary;
    const foodStop = primary?.stops.find(s => s.type === 'FOOD_STOP');
    const passed = Boolean(foodStop && foodStop.estimatedStopCostInr > 0 && foodStop.dwellTimeMinutes > 0);

    results.push({
      id: 'ENG-006',
      name: 'Food Stop Insertion & Budget Accounting',
      passed,
      details: foodStop
        ? `Found FoodStop: "${foodStop.name}" at sequence ${foodStop.stopSequence}, Cost: ₹${foodStop.estimatedStopCostInr}, Dining: ${foodStop.dwellTimeMinutes}m`
        : 'No food stop found in primary itinerary.'
    });
  }

  // --- Test 7: Return-to-Start Circuit Requirement ---
  {
    const req: TripRequest = {
      requestId: 'test_return_circuit',
      startLocationName: 'Sealdah Railway Station',
      startCoordinates: { latitude: 22.5675, longitude: 88.3712 },
      endLocationName: 'Sealdah Railway Station',
      endCoordinates: { latitude: 22.5675, longitude: 88.3712 },
      startTime: '2026-10-02T17:00:00Z',
      deadlineTime: '2026-10-02T23:00:00Z',
      budgetInr: 700,
      desiredPujaCount: 4,
      preferences: {
        transportPreferences: ['METRO_BLUE', 'METRO_GREEN', 'WALK'],
        walkingTolerance: 'MODERATE',
        crowdTolerance: 'BALANCED',
        requiresFoodStop: false,
        weatherSensitive: false
      }
    };

    const res = await engine.generateItinerary(req);
    const primary = res.primaryItinerary;
    const firstStop = primary?.stops[0];
    const lastStop = primary?.stops[primary.stops.length - 1];

    const circuitClosed = firstStop?.type === 'START_POINT' &&
                          lastStop?.type === 'END_POINT' &&
                          firstStop.name === req.startLocationName &&
                          lastStop.name === req.endLocationName;

    results.push({
      id: 'ENG-007',
      name: 'Return-to-Start Closed Circuit Verification',
      passed: Boolean(circuitClosed),
      details: `Start: "${firstStop?.name}" (${firstStop?.arrivalTime}) -> End: "${lastStop?.name}" (${lastStop?.departureTime})`
    });
  }

  // --- Test 8: Crowd Safety Scoring Penalty ---
  {
    const req: TripRequest = {
      requestId: 'test_crowd_penalty',
      startLocationName: 'Sealdah Railway Station',
      startCoordinates: { latitude: 22.5675, longitude: 88.3712 },
      endLocationName: 'Sealdah Railway Station',
      endCoordinates: { latitude: 22.5675, longitude: 88.3712 },
      startTime: '2026-10-02T17:00:00Z',
      deadlineTime: '2026-10-02T23:00:00Z',
      budgetInr: 700,
      desiredPujaCount: 4,
      preferences: {
        transportPreferences: ['METRO_BLUE', 'METRO_GREEN', 'WALK'],
        walkingTolerance: 'MODERATE',
        crowdTolerance: 'LOW_CROWDS_ONLY',
        requiresFoodStop: false,
        weatherSensitive: true
      }
    };

    const res = await engine.generateItinerary(req);
    const score = res.primaryItinerary?.scoreBreakdown;
    const passed = Boolean(score && score.crowdSafetyScore > 0 && score.overallCompositeScore > 0);

    results.push({
      id: 'ENG-008',
      name: 'Crowded Puja Penalty & Safety Score',
      passed,
      details: `Crowd safety score: ${score?.crowdSafetyScore}/100, Composite: ${score?.overallCompositeScore}/100`
    });
  }

  // --- Test 9: Category Preference-Based Selection ---
  {
    const req: TripRequest = {
      requestId: 'test_category_pref',
      startLocationName: 'Sovabazar Metro',
      startCoordinates: { latitude: 22.5985, longitude: 88.3668 },
      endLocationName: 'Sovabazar Metro',
      endCoordinates: { latitude: 22.5985, longitude: 88.3668 },
      startTime: '2026-10-02T17:00:00Z',
      deadlineTime: '2026-10-02T22:00:00Z',
      budgetInr: 500,
      desiredPujaCount: 3,
      preferences: {
        preferredCategories: ['HERITAGE_BONEDI'],
        transportPreferences: ['METRO_BLUE', 'WALK'],
        walkingTolerance: 'MODERATE',
        crowdTolerance: 'BALANCED',
        requiresFoodStop: false,
        weatherSensitive: false
      }
    };

    const res = await engine.generateItinerary(req);
    const primary = res.primaryItinerary;
    // Should prioritize Sovabazar Rajbari (HERITAGE_BONEDI)
    const containsHeritage = primary ? primary.visitedPujaIds.includes('puja_sovabazar_rajbari') : false;

    results.push({
      id: 'ENG-009',
      name: 'Preference-Based Puja Category Selection',
      passed: containsHeritage,
      details: `Target HERITAGE_BONEDI. Visited pujas: [${primary?.visitedPujaIds.join(', ')}]. Includes Sovabazar Rajbari: ${containsHeritage}`
    });
  }

  // --- Test 10: Infeasible Request with Actionable Trade-Off Suggestions ---
  {
    const req: TripRequest = {
      requestId: 'test_impossible_request',
      startLocationName: 'Sealdah Railway Station',
      startCoordinates: { latitude: 22.5675, longitude: 88.3712 },
      endLocationName: 'Sealdah Railway Station',
      endCoordinates: { latitude: 22.5675, longitude: 88.3712 },
      startTime: '2026-10-02T17:00:00Z',
      deadlineTime: '2026-10-02T17:45:00Z', // 45 minutes for 10 pujas with ₹10!
      budgetInr: 10,
      desiredPujaCount: 10,
      preferences: {
        transportPreferences: ['WALK'],
        walkingTolerance: 'MINIMAL',
        crowdTolerance: 'BALANCED',
        requiresFoodStop: true,
        weatherSensitive: true
      }
    };

    const res = await engine.generateItinerary(req);
    const isInfeasible = res.status === 'INFEASIBLE';
    const hasViolations = (res.violations?.length ?? 0) > 0;
    const hasSuggestions = (res.suggestedAdjustments?.length ?? 0) > 0;

    const passed = isInfeasible && hasViolations && hasSuggestions;
    results.push({
      id: 'ENG-010',
      name: 'Infeasible Request Handling & Actionable Suggestions',
      passed,
      details: `Status: ${res.status}, Violations: ${res.violations?.length}, Actionable suggestions: [${res.suggestedAdjustments?.join(' | ')}]`
    });
  }

  return results;
}
