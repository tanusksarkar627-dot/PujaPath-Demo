/**
 * PUJAPATH - Data Integrity Test Suite
 * Phase 1: Automated Unit & Validation Tests for Domain Layer
 */

import {
  validateDataset,
  assertValidDataset,
  DatasetValidationError,
  DatasetContainer
} from '../validation/dataValidator';
import {
  MOCK_PUJAS,
  MOCK_TRANSIT_NODES,
  MOCK_TRANSIT_CONNECTIONS,
  MOCK_FOOD_PLACES,
  MOCK_FACILITIES,
  MOCK_CROWD_STATUSES,
  MOCK_WEATHER_CONDITIONS
} from '../services/mock/data';
import { MockDatabase } from '../services/mock/database';
import { Puja, TransitConnection, TransitNode, FoodPlace, Facility, CrowdStatus } from '../types/domain';

export interface DataIntegrityTestResult {
  readonly id: string;
  readonly description: string;
  readonly passed: boolean;
  readonly details: string;
}

export function runDataIntegrityTestSuite(): DataIntegrityTestResult[] {
  const results: DataIntegrityTestResult[] = [];

  const validBaseDataset: DatasetContainer = {
    pujas: MOCK_PUJAS,
    transitNodes: MOCK_TRANSIT_NODES,
    transitConnections: MOCK_TRANSIT_CONNECTIONS,
    foodPlaces: MOCK_FOOD_PLACES,
    facilities: MOCK_FACILITIES,
    crowdStatuses: MOCK_CROWD_STATUSES,
    weatherConditions: MOCK_WEATHER_CONDITIONS
  };

  // Test 1: Production Mock Dataset Integrity
  {
    const report = validateDataset(validBaseDataset);
    results.push({
      id: 'DATA-001',
      description: 'Production mock dataset passes complete validation with 0 fatal errors',
      passed: report.isValid && report.fatalCount === 0,
      details: report.summary
    });
  }

  // Test 2: Detect Duplicate IDs in Transit Nodes
  {
    const duplicateNode: TransitNode = {
      ...MOCK_TRANSIT_NODES[0]
    };
    const corruptedDataset: DatasetContainer = {
      ...validBaseDataset,
      transitNodes: [...MOCK_TRANSIT_NODES, duplicateNode]
    };
    const report = validateDataset(corruptedDataset);
    const hasDuplicateIssue = report.issues.some(
      i => i.code === 'DUPLICATE_ID' && i.entityType === 'TRANSIT_NODE' && i.entityId === duplicateNode.id
    );
    results.push({
      id: 'DATA-002',
      description: 'Validation engine detects duplicate TransitNode IDs',
      passed: !report.isValid && hasDuplicateIssue,
      details: `Detected ${report.fatalCount} fatal error(s). Found DUPLICATE_ID: ${hasDuplicateIssue}`
    });
  }

  // Test 3: Detect Duplicate IDs in Pujas
  {
    const duplicatePuja: Puja = {
      ...MOCK_PUJAS[0]
    };
    const corruptedDataset: DatasetContainer = {
      ...validBaseDataset,
      pujas: [...MOCK_PUJAS, duplicatePuja]
    };
    const report = validateDataset(corruptedDataset);
    const hasDuplicateIssue = report.issues.some(
      i => i.code === 'DUPLICATE_ID' && i.entityType === 'PUJA' && i.entityId === duplicatePuja.id
    );
    results.push({
      id: 'DATA-003',
      description: 'Validation engine detects duplicate Puja IDs',
      passed: !report.isValid && hasDuplicateIssue,
      details: `Detected ${report.fatalCount} fatal error(s). Found DUPLICATE_ID: ${hasDuplicateIssue}`
    });
  }

  // Test 4: Detect Dangling References in Puja (referencing non-existent transit node)
  {
    const ghostNodePuja: Puja = {
      ...MOCK_PUJAS[0],
      id: 'puja_ghost_tester',
      nearestTransitNodeIds: ['node_non_existent_ghost_station']
    };
    const corruptedDataset: DatasetContainer = {
      ...validBaseDataset,
      pujas: [...MOCK_PUJAS, ghostNodePuja]
    };
    const report = validateDataset(corruptedDataset);
    const hasDanglingNodeIssue = report.issues.some(
      i => i.code === 'DANGLING_REFERENCE' && i.entityType === 'PUJA' && i.entityId === 'puja_ghost_tester'
    );
    results.push({
      id: 'DATA-004',
      description: 'Validation engine catches Puja referencing non-existent TransitNode',
      passed: !report.isValid && hasDanglingNodeIssue,
      details: `Detected DANGLING_REFERENCE: ${hasDanglingNodeIssue}`
    });
  }

  // Test 5: Detect Transit Connection referencing non-existent nodes
  {
    const invalidConnection: TransitConnection = {
      fromNodeId: 'node_sealdah',
      toNodeId: 'node_phantom_destination',
      mode: 'METRO_BLUE',
      distanceMeters: 1000,
      typicalDurationMinutes: 5,
      estimatedCostInr: 10,
      festivalTrafficSensitive: false
    };
    const corruptedDataset: DatasetContainer = {
      ...validBaseDataset,
      transitConnections: [...MOCK_TRANSIT_CONNECTIONS, invalidConnection]
    };
    const report = validateDataset(corruptedDataset);
    const hasDanglingDest = report.issues.some(
      i => i.code === 'DANGLING_REFERENCE' && i.entityType === 'TRANSIT_CONNECTION' && i.field === 'toNodeId'
    );
    results.push({
      id: 'DATA-005',
      description: 'Validation engine catches TransitConnection to non-existent node',
      passed: !report.isValid && hasDanglingDest,
      details: `Detected non-existent destination node reference: ${hasDanglingDest}`
    });
  }

  // Test 6: Detect Negative Costs
  {
    const negativeCostConn: TransitConnection = {
      fromNodeId: 'node_sealdah',
      toNodeId: 'node_central',
      mode: 'WALK',
      distanceMeters: 900,
      typicalDurationMinutes: 12,
      estimatedCostInr: -50, // Negative!
      festivalTrafficSensitive: false
    };
    const corruptedDataset: DatasetContainer = {
      ...validBaseDataset,
      transitConnections: [...MOCK_TRANSIT_CONNECTIONS, negativeCostConn]
    };
    const report = validateDataset(corruptedDataset);
    const hasNegativeCost = report.issues.some(
      i => i.code === 'NEGATIVE_COST' && i.entityType === 'TRANSIT_CONNECTION'
    );
    results.push({
      id: 'DATA-006',
      description: 'Validation engine rejects negative transit fares and food costs',
      passed: !report.isValid && hasNegativeCost,
      details: `Detected NEGATIVE_COST issue: ${hasNegativeCost}`
    });
  }

  // Test 7: Detect Invalid Coordinates (Out of range or non-finite)
  {
    const invalidCoordNode: TransitNode = {
      id: 'node_invalid_coord',
      name: 'Invalid Coordinates Station',
      location: { latitude: 95.5, longitude: 88.36 }, // Latitude > 90!
      supportedModes: ['WALK'],
      isTerminal: false,
      wheelchairAccessible: false
    };
    const corruptedDataset: DatasetContainer = {
      ...validBaseDataset,
      transitNodes: [...MOCK_TRANSIT_NODES, invalidCoordNode]
    };
    const report = validateDataset(corruptedDataset);
    const hasInvalidCoord = report.issues.some(
      i => i.code === 'INVALID_COORDINATES' && i.entityId === 'node_invalid_coord'
    );
    results.push({
      id: 'DATA-007',
      description: 'Validation engine rejects invalid geographic coordinates (>90 deg lat)',
      passed: !report.isValid && hasInvalidCoord,
      details: `Detected INVALID_COORDINATES issue: ${hasInvalidCoord}`
    });
  }

  // Test 8: Detect Impossible Durations (<= 0 minutes)
  {
    const zeroDurationPuja: Puja = {
      ...MOCK_PUJAS[0],
      id: 'puja_zero_dwell',
      typicalDwellMinutes: 0 // Impossible duration!
    };
    const corruptedDataset: DatasetContainer = {
      ...validBaseDataset,
      pujas: [...MOCK_PUJAS, zeroDurationPuja]
    };
    const report = validateDataset(corruptedDataset);
    const hasZeroDuration = report.issues.some(
      i => i.code === 'IMPOSSIBLE_DURATION' && i.entityId === 'puja_zero_dwell'
    );
    results.push({
      id: 'DATA-008',
      description: 'Validation engine rejects impossible dwell/travel durations (<= 0 mins)',
      passed: !report.isValid && hasZeroDuration,
      details: `Detected IMPOSSIBLE_DURATION issue: ${hasZeroDuration}`
    });
  }

  // Test 9: Detect Malformed Service Hours
  {
    const malformedHoursConn: TransitConnection = {
      fromNodeId: 'node_sealdah',
      toNodeId: 'node_central',
      mode: 'WALK',
      distanceMeters: 900,
      typicalDurationMinutes: 12,
      estimatedCostInr: 0,
      serviceHours: {
        start: '26:99', // Malformed time!
        end: '23:00'
      },
      festivalTrafficSensitive: false
    };
    const corruptedDataset: DatasetContainer = {
      ...validBaseDataset,
      transitConnections: [...MOCK_TRANSIT_CONNECTIONS, malformedHoursConn]
    };
    const report = validateDataset(corruptedDataset);
    const hasMalformedHours = report.issues.some(
      i => i.code === 'MALFORMED_SERVICE_HOURS'
    );
    results.push({
      id: 'DATA-009',
      description: 'Validation engine rejects malformed service hours (e.g. 26:99)',
      passed: !report.isValid && hasMalformedHours,
      details: `Detected MALFORMED_SERVICE_HOURS issue: ${hasMalformedHours}`
    });
  }

  // Test 10: assertValidDataset throws DatasetValidationError
  {
    let caughtError: unknown;
    try {
      assertValidDataset({
        ...validBaseDataset,
        transitConnections: [
          {
            fromNodeId: 'node_broken',
            toNodeId: 'node_ghost',
            mode: 'WALK',
            distanceMeters: -10,
            typicalDurationMinutes: 0,
            estimatedCostInr: -5,
            festivalTrafficSensitive: false
          }
        ]
      });
    } catch (err) {
      caughtError = err;
    }
    let isDatasetValidationError = false;
    let errorDetails = 'Failed to throw DatasetValidationError';
    if (caughtError instanceof DatasetValidationError) {
      isDatasetValidationError = true;
      errorDetails = `Caught expected ${caughtError.name}: ${caughtError.result.fatalCount} fatal error(s)`;
    }
    results.push({
      id: 'DATA-010',
      description: 'assertValidDataset throws structured DatasetValidationError on fatal issues',
      passed: isDatasetValidationError,
      details: errorDetails
    });
  }

  // Test 11: MockDatabase Indexes & Queries
  {
    const db = new MockDatabase();
    const northPujas = db.getPujasByZone('NORTH_KOLKATA');
    const centralPujas = db.getPujasByZone('CENTRAL_KOLKATA');
    const southPujas = db.getPujasByZone('SOUTH_KOLKATA');

    const sealdahOutbound = db.getOutboundConnections('node_sealdah');
    const nearestToCollegeSq = db.findNearestTransitNode({ latitude: 22.5746, longitude: 88.3638 });

    const hasMultiZones = northPujas.length > 0 && centralPujas.length > 0 && southPujas.length > 0;
    const hasOutbound = sealdahOutbound.length > 0;
    const nearestFound = nearestToCollegeSq !== undefined;

    results.push({
      id: 'DATA-011',
      description: 'MockDatabase indexes multi-zone Pujas, transit graph, and spatial queries',
      passed: hasMultiZones && hasOutbound && nearestFound,
      details: `North: ${northPujas.length}, Central: ${centralPujas.length}, South: ${southPujas.length}, Sealdah Outbound: ${sealdahOutbound.length}, Nearest to College Sq: ${nearestToCollegeSq?.name}`
    });
  }

  // Test 12: Telemetry Simulation Transparency
  {
    const allCrowdsSimulated = Object.values(MOCK_CROWD_STATUSES).every(c => c.isSimulated === true);
    const allWeatherSimulated = Object.values(MOCK_WEATHER_CONDITIONS).every(w => w.isSimulated === true);
    results.push({
      id: 'DATA-012',
      description: 'All mock crowd and weather telemetry strictly declare isSimulated === true',
      passed: allCrowdsSimulated && allWeatherSimulated,
      details: `Crowd items simulated: ${allCrowdsSimulated}, Weather items simulated: ${allWeatherSimulated}`
    });
  }

  return results;
}
