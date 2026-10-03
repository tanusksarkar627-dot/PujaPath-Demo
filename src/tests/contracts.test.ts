/**
 * PUJAPATH - Verification Test Vectors
 * Phase 0: Contract and Deterministic Verification Suite
 */

import { validateTripRequest } from '../engine/validator';
import { DeterministicScoringEngine } from '../engine/scoring';
import { DeterministicItineraryEngine } from '../engine/optimizer';
import { GeminiAIParserService } from '../ai/parser';
import { GeminiAIExplainerService } from '../ai/explainer';
import {
  MockPujaRepository,
  MockTransitRepository,
  MockFoodRepository,
  MockFacilityRepository,
  MockCrowdService,
  MockWeatherService
} from '../services/mock/repositories';
import { TripRequest } from '../types/domain';

export interface TestResult {
  readonly testName: string;
  readonly passed: boolean;
  readonly output: unknown;
  readonly error?: string;
}

export async function runAllVerificationTests(): Promise<TestResult[]> {
  const results: TestResult[] = [];

  const pujaRepo = new MockPujaRepository();
  const transitRepo = new MockTransitRepository();
  const foodRepo = new MockFoodRepository();
  const facilityRepo = new MockFacilityRepository();
  const crowdService = new MockCrowdService();
  const weatherService = new MockWeatherService();

  // Test 1: Canonical Sealdah 5 PM ₹700 Prompt Parsing
  try {
    const parser = new GeminiAIParserService();
    const prompt = "I'm starting from Sealdah at 5 PM. I have ₹700. I want to visit 5 famous Durga Puja pandals, avoid too much walking, use public transport, eat Bengali food once and return to Sealdah by 11 PM.";
    const parsed = await parser.parseTripRequest(prompt);

    const matchesStart = parsed.extractedStartLocation?.toLowerCase().includes('sealdah');
    const matchesBudget = parsed.extractedBudgetInr === 700;
    const matchesPujaCount = parsed.extractedPujaCount === 5;
    const matchesFood = parsed.foodRequirement === true;
    const matchesWalk = parsed.walkingTolerance === 'MINIMAL';

    results.push({
      testName: 'AI Request Parser (Sealdah 5 PM ₹700 Prompt)',
      passed: Boolean(matchesStart && matchesBudget && matchesPujaCount && matchesFood && matchesWalk),
      output: parsed
    });
  } catch (err: unknown) {
    results.push({
      testName: 'AI Request Parser (Sealdah 5 PM ₹700 Prompt)',
      passed: false,
      output: null,
      error: err instanceof Error ? err.message : String(err)
    });
  }

  // Test 2: Input Validator rejects negative budget or inverted times
  try {
    const invalidRequest: TripRequest = {
      requestId: 'req_invalid_1',
      startLocationName: 'Sealdah',
      startCoordinates: { latitude: 22.5675, longitude: 88.3712 },
      endLocationName: 'Sealdah',
      endCoordinates: { latitude: 22.5675, longitude: 88.3712 },
      startTime: '2026-10-02T23:00:00Z',
      deadlineTime: '2026-10-02T17:00:00Z', // Deadline before start!
      budgetInr: -50,                      // Negative budget!
      desiredPujaCount: 0,                 // Zero pujas!
      preferences: {
        transportPreferences: ['WALK'],
        walkingTolerance: 'MINIMAL',
        crowdTolerance: 'BALANCED',
        requiresFoodStop: false,
        weatherSensitive: true
      }
    };

    const validation = validateTripRequest(invalidRequest);
    results.push({
      testName: 'Deterministic Validator (Rejection of Invalid Contracts)',
      passed: !validation.isValid && validation.errors.length >= 2,
      output: validation.errors
    });
  } catch (err: unknown) {
    results.push({
      testName: 'Deterministic Validator (Rejection of Invalid Contracts)',
      passed: false,
      output: null,
      error: err instanceof Error ? err.message : String(err)
    });
  }

  // Test 3: End-to-End Itinerary Generation for the Canonical Sealdah Prompt
  try {
    const engine = new DeterministicItineraryEngine(
      pujaRepo,
      transitRepo,
      foodRepo,
      facilityRepo,
      crowdService,
      weatherService
    );

    const validCanonicalRequest: TripRequest = {
      requestId: 'req_canonical_sealdah',
      startLocationName: 'Sealdah Railway Station',
      startCoordinates: { latitude: 22.5675, longitude: 88.3712 },
      endLocationName: 'Sealdah Railway Station',
      endCoordinates: { latitude: 22.5675, longitude: 88.3712 },
      startTime: '2026-10-02T17:00:00Z',
      deadlineTime: '2026-10-02T23:00:00Z', // 6 hours = 360 min
      budgetInr: 700,
      desiredPujaCount: 5,
      preferences: {
        preferredCategories: ['HERITAGE_BONEDI', 'CROWD_PULLER_MEGA', 'ILLUMINATION_LIGHT'],
        transportPreferences: ['METRO_BLUE', 'METRO_GREEN', 'WALK'],
        walkingTolerance: 'MINIMAL',
        crowdTolerance: 'BALANCED',
        requiresFoodStop: true,
        preferredCuisine: 'BENGALI_TRADITIONAL',
        weatherSensitive: true
      }
    };

    const result = await engine.generateItinerary(validCanonicalRequest);
    const primary = result.primaryItinerary;

    const satisfiesTime = primary ? primary.totalDurationMinutes <= 360 : false;
    const satisfiesBudget = primary ? primary.totalCostInr <= 700 : false;
    const hasFoodStop = primary ? primary.stops.some(s => s.type === 'FOOD_STOP') : false;
    const visitedCount = primary ? primary.visitedPujaIds.length : 0;

    results.push({
      testName: 'Itinerary Engine (Canonical Sealdah Multi-Stop Tour)',
      passed: result.status === 'SUCCESS' && satisfiesTime && satisfiesBudget && hasFoodStop && visitedCount >= 4,
      output: {
        status: result.status,
        totalMinutes: primary?.totalDurationMinutes,
        totalCostInr: primary?.totalCostInr,
        stopsCount: primary?.stops.length,
        visitedPujas: primary?.visitedPujaIds,
        score: primary?.scoreBreakdown
      }
    });

    // Test 4: AI Explainer Generation Contract
    const explainer = new GeminiAIExplainerService();
    if (primary) {
      const explanation = await explainer.explainItinerary(primary, validCanonicalRequest);
      results.push({
        testName: 'AI Explainer (Narrative & Safety Guidance Contract)',
        passed: Boolean(explanation.headline && explanation.whyThisSequence.length > 0),
        output: explanation
      });
    }

    // Phase 1 Test 5: Complete Domain Dataset Referential & Schema Validation
    const { validateDataset } = await import('../validation/dataValidator');
    const {
      MOCK_PUJAS: pujas,
      MOCK_TRANSIT_NODES: nodes,
      MOCK_TRANSIT_CONNECTIONS: conns,
      MOCK_FOOD_PLACES: foods,
      MOCK_FACILITIES: facs,
      MOCK_CROWD_STATUSES: crowds,
      MOCK_WEATHER_CONDITIONS: weathers
    } = await import('../services/mock/data');

    const validationReport = validateDataset({
      pujas,
      transitNodes: nodes,
      transitConnections: conns,
      foodPlaces: foods,
      facilities: facs,
      crowdStatuses: crowds,
      weatherConditions: weathers
    });

    results.push({
      testName: 'Phase 1: Dataset Referential Integrity & Domain Consistency',
      passed: validationReport.isValid && validationReport.fatalCount === 0,
      output: {
        summary: validationReport.summary,
        fatalCount: validationReport.fatalCount,
        warningCount: validationReport.warningCount,
        pujasValidated: pujas.length,
        transitNodesValidated: nodes.length,
        connectionsValidated: conns.length,
        foodPlacesValidated: foods.length,
        facilitiesValidated: facs.length
      }
    });
  } catch (err: unknown) {
    results.push({
      testName: 'Itinerary Engine Execution',
      passed: false,
      output: null,
      error: err instanceof Error ? err.message : String(err)
    });
  }

  return results;
}
