/**
 * PUJAPATH - Data Integrity & Validation Engine
 * Phase 1: Exhaustive Validation for Domain Datasets
 */

import {
  Puja,
  TransitNode,
  TransitConnection,
  FoodPlace,
  Facility,
  CrowdStatus,
  WeatherCondition,
  GeoCoordinates
} from '../types/domain';

export type ValidationSeverity = 'FATAL' | 'WARNING';

export type EntityType = 
  | 'PUJA'
  | 'TRANSIT_NODE'
  | 'TRANSIT_CONNECTION'
  | 'FOOD_PLACE'
  | 'FACILITY'
  | 'CROWD_STATUS'
  | 'WEATHER_CONDITION';

export type ValidationCode =
  | 'DUPLICATE_ID'
  | 'DANGLING_REFERENCE'
  | 'NEGATIVE_COST'
  | 'INVALID_COORDINATES'
  | 'IMPOSSIBLE_DURATION'
  | 'MALFORMED_SERVICE_HOURS'
  | 'INVALID_PERCENTAGE'
  | 'UNREALISTIC_TEMPERATURE'
  | 'MISSING_REQUIRED_FIELD'
  | 'MISSING_SIMULATION_FLAG'
  | 'INVALID_TIMESTAMP';

export interface ValidationIssue {
  readonly severity: ValidationSeverity;
  readonly entityType: EntityType;
  readonly entityId: string;
  readonly field?: string;
  readonly code: ValidationCode;
  readonly message: string;
}

export interface DatasetContainer {
  readonly pujas: readonly Puja[];
  readonly transitNodes: readonly TransitNode[];
  readonly transitConnections: readonly TransitConnection[];
  readonly foodPlaces: readonly FoodPlace[];
  readonly facilities: readonly Facility[];
  readonly crowdStatuses: Record<string, CrowdStatus> | readonly CrowdStatus[];
  readonly weatherConditions: Record<string, WeatherCondition> | readonly WeatherCondition[];
}

export interface DatasetValidationResult {
  readonly isValid: boolean;
  readonly fatalCount: number;
  readonly warningCount: number;
  readonly issues: readonly ValidationIssue[];
  readonly summary: string;
}

// Bounding box for Greater Kolkata Metropolitan Area
const KOLKATA_BOUNDS = {
  minLat: 22.30,
  maxLat: 22.80,
  minLon: 88.15,
  maxLon: 88.60
};

/**
 * Validates whether a geographic coordinate is mathematically and regionally valid.
 */
export function validateCoordinates(
  coords: GeoCoordinates | undefined | null,
  entityType: EntityType,
  entityId: string,
  field: string = 'location'
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (!coords) {
    issues.push({
      severity: 'FATAL',
      entityType,
      entityId,
      field,
      code: 'MISSING_REQUIRED_FIELD',
      message: `${entityType} "${entityId}" is missing coordinates.`
    });
    return issues;
  }

  const { latitude, longitude } = coords;

  if (typeof latitude !== 'number' || isNaN(latitude) || !isFinite(latitude) ||
      typeof longitude !== 'number' || isNaN(longitude) || !isFinite(longitude)) {
    issues.push({
      severity: 'FATAL',
      entityType,
      entityId,
      field,
      code: 'INVALID_COORDINATES',
      message: `${entityType} "${entityId}" coordinates [${latitude}, ${longitude}] contain non-finite numbers.`
    });
    return issues;
  }

  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    issues.push({
      severity: 'FATAL',
      entityType,
      entityId,
      field,
      code: 'INVALID_COORDINATES',
      message: `${entityType} "${entityId}" coordinates [${latitude}, ${longitude}] are outside valid global range.`
    });
  } else if (
    latitude < KOLKATA_BOUNDS.minLat || latitude > KOLKATA_BOUNDS.maxLat ||
    longitude < KOLKATA_BOUNDS.minLon || longitude > KOLKATA_BOUNDS.maxLon
  ) {
    issues.push({
      severity: 'WARNING',
      entityType,
      entityId,
      field,
      code: 'INVALID_COORDINATES',
      message: `${entityType} "${entityId}" location [${latitude}, ${longitude}] falls outside Greater Kolkata bounds.`
    });
  }

  return issues;
}

/**
 * Validates service hours string format (HH:mm) and logical continuity.
 */
export function validateServiceHours(
  serviceHours: { start: string; end: string } | undefined,
  entityId: string
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  if (!serviceHours) return issues;

  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

  if (!timeRegex.test(serviceHours.start)) {
    issues.push({
      severity: 'FATAL',
      entityType: 'TRANSIT_CONNECTION',
      entityId,
      field: 'serviceHours.start',
      code: 'MALFORMED_SERVICE_HOURS',
      message: `TransitConnection "${entityId}" start time "${serviceHours.start}" is not in valid 24h format (HH:mm).`
    });
  }

  if (!timeRegex.test(serviceHours.end)) {
    issues.push({
      severity: 'FATAL',
      entityType: 'TRANSIT_CONNECTION',
      entityId,
      field: 'serviceHours.end',
      code: 'MALFORMED_SERVICE_HOURS',
      message: `TransitConnection "${entityId}" end time "${serviceHours.end}" is not in valid 24h format (HH:mm).`
    });
  }

  return issues;
}

/**
 * Performs end-to-end relational and domain constraint checks across the entire dataset.
 */
export function validateDataset(dataset: DatasetContainer): DatasetValidationResult {
  const issues: ValidationIssue[] = [];

  // 1. Build Index Sets for Referential Integrity Checks
  const transitNodeIds = new Set<string>();
  const duplicateTransitNodeIds = new Set<string>();
  for (const node of dataset.transitNodes) {
    if (transitNodeIds.has(node.id)) {
      duplicateTransitNodeIds.add(node.id);
    } else {
      transitNodeIds.add(node.id);
    }
  }

  const pujaIds = new Set<string>();
  const duplicatePujaIds = new Set<string>();
  for (const puja of dataset.pujas) {
    if (pujaIds.has(puja.id)) {
      duplicatePujaIds.add(puja.id);
    } else {
      pujaIds.add(puja.id);
    }
  }

  const foodIds = new Set<string>();
  const duplicateFoodIds = new Set<string>();
  for (const food of dataset.foodPlaces) {
    if (foodIds.has(food.id)) {
      duplicateFoodIds.add(food.id);
    } else {
      foodIds.add(food.id);
    }
  }

  const facilityIds = new Set<string>();
  const duplicateFacilityIds = new Set<string>();
  for (const fac of dataset.facilities) {
    if (facilityIds.has(fac.id)) {
      duplicateFacilityIds.add(fac.id);
    } else {
      facilityIds.add(fac.id);
    }
  }

  // --- Validate Duplicate IDs ---
  for (const id of duplicateTransitNodeIds) {
    issues.push({
      severity: 'FATAL',
      entityType: 'TRANSIT_NODE',
      entityId: id,
      code: 'DUPLICATE_ID',
      message: `Duplicate TransitNode ID detected: "${id}".`
    });
  }

  for (const id of duplicatePujaIds) {
    issues.push({
      severity: 'FATAL',
      entityType: 'PUJA',
      entityId: id,
      code: 'DUPLICATE_ID',
      message: `Duplicate Puja ID detected: "${id}".`
    });
  }

  for (const id of duplicateFoodIds) {
    issues.push({
      severity: 'FATAL',
      entityType: 'FOOD_PLACE',
      entityId: id,
      code: 'DUPLICATE_ID',
      message: `Duplicate FoodPlace ID detected: "${id}".`
    });
  }

  for (const id of duplicateFacilityIds) {
    issues.push({
      severity: 'FATAL',
      entityType: 'FACILITY',
      entityId: id,
      code: 'DUPLICATE_ID',
      message: `Duplicate Facility ID detected: "${id}".`
    });
  }

  // --- Validate Transit Nodes ---
  for (const node of dataset.transitNodes) {
    issues.push(...validateCoordinates(node.location, 'TRANSIT_NODE', node.id));

    if (!node.name || node.name.trim().length === 0) {
      issues.push({
        severity: 'FATAL',
        entityType: 'TRANSIT_NODE',
        entityId: node.id,
        field: 'name',
        code: 'MISSING_REQUIRED_FIELD',
        message: `TransitNode "${node.id}" has an empty or blank name.`
      });
    }

    if (!node.supportedModes || node.supportedModes.length === 0) {
      issues.push({
        severity: 'FATAL',
        entityType: 'TRANSIT_NODE',
        entityId: node.id,
        field: 'supportedModes',
        code: 'MISSING_REQUIRED_FIELD',
        message: `TransitNode "${node.id}" must support at least one TransportMode.`
      });
    }
  }

  // --- Validate Pujas ---
  for (const puja of dataset.pujas) {
    issues.push(...validateCoordinates(puja.location, 'PUJA', puja.id));

    if (!puja.name || puja.name.trim().length === 0) {
      issues.push({
        severity: 'FATAL',
        entityType: 'PUJA',
        entityId: puja.id,
        field: 'name',
        code: 'MISSING_REQUIRED_FIELD',
        message: `Puja "${puja.id}" has an empty name.`
      });
    }

    if (puja.typicalDwellMinutes <= 0) {
      issues.push({
        severity: 'FATAL',
        entityType: 'PUJA',
        entityId: puja.id,
        field: 'typicalDwellMinutes',
        code: 'IMPOSSIBLE_DURATION',
        message: `Puja "${puja.id}" typical dwell time (${puja.typicalDwellMinutes}m) must be greater than 0.`
      });
    } else if (puja.typicalDwellMinutes > 300) {
      issues.push({
        severity: 'WARNING',
        entityType: 'PUJA',
        entityId: puja.id,
        field: 'typicalDwellMinutes',
        code: 'IMPOSSIBLE_DURATION',
        message: `Puja "${puja.id}" typical dwell time (${puja.typicalDwellMinutes}m) exceeds 5 hours.`
      });
    }

    if (puja.crowdMultiplier <= 0) {
      issues.push({
        severity: 'FATAL',
        entityType: 'PUJA',
        entityId: puja.id,
        field: 'crowdMultiplier',
        code: 'IMPOSSIBLE_DURATION',
        message: `Puja "${puja.id}" crowd multiplier must be positive.`
      });
    }

    // Referential Integrity: nearestTransitNodeIds
    if (!puja.nearestTransitNodeIds || puja.nearestTransitNodeIds.length === 0) {
      issues.push({
        severity: 'WARNING',
        entityType: 'PUJA',
        entityId: puja.id,
        field: 'nearestTransitNodeIds',
        code: 'MISSING_REQUIRED_FIELD',
        message: `Puja "${puja.id}" has no nearest transit nodes configured.`
      });
    } else {
      for (const nodeId of puja.nearestTransitNodeIds) {
        if (!transitNodeIds.has(nodeId)) {
          issues.push({
            severity: 'FATAL',
            entityType: 'PUJA',
            entityId: puja.id,
            field: 'nearestTransitNodeIds',
            code: 'DANGLING_REFERENCE',
            message: `Puja "${puja.id}" references non-existent TransitNode "${nodeId}".`
          });
        }
      }
    }
  }

  // --- Validate Transit Connections ---
  for (let idx = 0; idx < dataset.transitConnections.length; idx++) {
    const conn = dataset.transitConnections[idx];
    const connLabel = `${conn.fromNodeId} -> ${conn.toNodeId} [${conn.mode}] (index ${idx})`;

    // Check endpoints exist
    if (!transitNodeIds.has(conn.fromNodeId)) {
      issues.push({
        severity: 'FATAL',
        entityType: 'TRANSIT_CONNECTION',
        entityId: connLabel,
        field: 'fromNodeId',
        code: 'DANGLING_REFERENCE',
        message: `Transit connection references non-existent origin node "${conn.fromNodeId}".`
      });
    }

    if (!transitNodeIds.has(conn.toNodeId)) {
      issues.push({
        severity: 'FATAL',
        entityType: 'TRANSIT_CONNECTION',
        entityId: connLabel,
        field: 'toNodeId',
        code: 'DANGLING_REFERENCE',
        message: `Transit connection references non-existent destination node "${conn.toNodeId}".`
      });
    }

    if (conn.fromNodeId === conn.toNodeId) {
      issues.push({
        severity: 'FATAL',
        entityType: 'TRANSIT_CONNECTION',
        entityId: connLabel,
        field: 'toNodeId',
        code: 'DANGLING_REFERENCE',
        message: `Transit connection has identical origin and destination "${conn.fromNodeId}".`
      });
    }

    // Distance
    if (conn.distanceMeters <= 0) {
      issues.push({
        severity: 'FATAL',
        entityType: 'TRANSIT_CONNECTION',
        entityId: connLabel,
        field: 'distanceMeters',
        code: 'IMPOSSIBLE_DURATION',
        message: `Transit connection distance (${conn.distanceMeters}m) must be strictly greater than 0.`
      });
    }

    // Duration
    if (conn.typicalDurationMinutes <= 0) {
      issues.push({
        severity: 'FATAL',
        entityType: 'TRANSIT_CONNECTION',
        entityId: connLabel,
        field: 'typicalDurationMinutes',
        code: 'IMPOSSIBLE_DURATION',
        message: `Transit connection duration (${conn.typicalDurationMinutes}m) must be strictly greater than 0.`
      });
    }

    // Cost
    if (conn.estimatedCostInr < 0) {
      issues.push({
        severity: 'FATAL',
        entityType: 'TRANSIT_CONNECTION',
        entityId: connLabel,
        field: 'estimatedCostInr',
        code: 'NEGATIVE_COST',
        message: `Transit connection cost (₹${conn.estimatedCostInr}) cannot be negative.`
      });
    }

    // Service hours
    issues.push(...validateServiceHours(conn.serviceHours, connLabel));

    // Frequency
    if (conn.frequencyMinutes !== undefined && conn.frequencyMinutes <= 0) {
      issues.push({
        severity: 'FATAL',
        entityType: 'TRANSIT_CONNECTION',
        entityId: connLabel,
        field: 'frequencyMinutes',
        code: 'IMPOSSIBLE_DURATION',
        message: `Transit connection frequency (${conn.frequencyMinutes}m) must be greater than 0.`
      });
    }
  }

  // --- Validate Food Places ---
  for (const food of dataset.foodPlaces) {
    issues.push(...validateCoordinates(food.location, 'FOOD_PLACE', food.id));

    if (food.averageCostPerPersonInr < 0) {
      issues.push({
        severity: 'FATAL',
        entityType: 'FOOD_PLACE',
        entityId: food.id,
        field: 'averageCostPerPersonInr',
        code: 'NEGATIVE_COST',
        message: `FoodPlace "${food.id}" cost (₹${food.averageCostPerPersonInr}) cannot be negative.`
      });
    }

    if (food.averageDiningMinutes <= 0) {
      issues.push({
        severity: 'FATAL',
        entityType: 'FOOD_PLACE',
        entityId: food.id,
        field: 'averageDiningMinutes',
        code: 'IMPOSSIBLE_DURATION',
        message: `FoodPlace "${food.id}" dining time (${food.averageDiningMinutes}m) must be greater than 0.`
      });
    }

    if (!transitNodeIds.has(food.nearestTransitNodeId)) {
      issues.push({
        severity: 'FATAL',
        entityType: 'FOOD_PLACE',
        entityId: food.id,
        field: 'nearestTransitNodeId',
        code: 'DANGLING_REFERENCE',
        message: `FoodPlace "${food.id}" references non-existent TransitNode "${food.nearestTransitNodeId}".`
      });
    }
  }

  // --- Validate Facilities ---
  for (const fac of dataset.facilities) {
    issues.push(...validateCoordinates(fac.location, 'FACILITY', fac.id));

    if (fac.associatedPujaId && !pujaIds.has(fac.associatedPujaId)) {
      issues.push({
        severity: 'FATAL',
        entityType: 'FACILITY',
        entityId: fac.id,
        field: 'associatedPujaId',
        code: 'DANGLING_REFERENCE',
        message: `Facility "${fac.id}" references non-existent Puja "${fac.associatedPujaId}".`
      });
    }
  }

  // --- Validate Crowd Statuses ---
  const crowdList = Array.isArray(dataset.crowdStatuses)
    ? dataset.crowdStatuses
    : Object.values(dataset.crowdStatuses);

  const seenCrowdEntityIds = new Set<string>();

  for (const crowd of crowdList) {
    if (seenCrowdEntityIds.has(crowd.entityId)) {
      issues.push({
        severity: 'FATAL',
        entityType: 'CROWD_STATUS',
        entityId: crowd.entityId,
        code: 'DUPLICATE_ID',
        message: `Duplicate crowd status for entity "${crowd.entityId}".`
      });
    }
    seenCrowdEntityIds.add(crowd.entityId);

    // Referential integrity check
    if (crowd.entityType === 'PUJA') {
      if (!pujaIds.has(crowd.entityId)) {
        issues.push({
          severity: 'FATAL',
          entityType: 'CROWD_STATUS',
          entityId: crowd.entityId,
          code: 'DANGLING_REFERENCE',
          message: `CrowdStatus references non-existent Puja entity "${crowd.entityId}".`
        });
      }
    } else if (crowd.entityType === 'TRANSIT_NODE') {
      if (!transitNodeIds.has(crowd.entityId)) {
        issues.push({
          severity: 'FATAL',
          entityType: 'CROWD_STATUS',
          entityId: crowd.entityId,
          code: 'DANGLING_REFERENCE',
          message: `CrowdStatus references non-existent TransitNode entity "${crowd.entityId}".`
        });
      }
    }

    if (crowd.estimatedQueueMinutes < 0) {
      issues.push({
        severity: 'FATAL',
        entityType: 'CROWD_STATUS',
        entityId: crowd.entityId,
        field: 'estimatedQueueMinutes',
        code: 'IMPOSSIBLE_DURATION',
        message: `Crowd queue minutes (${crowd.estimatedQueueMinutes}) cannot be negative.`
      });
    }

    if (typeof crowd.isSimulated !== 'boolean') {
      issues.push({
        severity: 'FATAL',
        entityType: 'CROWD_STATUS',
        entityId: crowd.entityId,
        field: 'isSimulated',
        code: 'MISSING_SIMULATION_FLAG',
        message: `Crowd telemetry "${crowd.entityId}" must explicitly define boolean "isSimulated" flag.`
      });
    }

    if (isNaN(Date.parse(crowd.timestampIso))) {
      issues.push({
        severity: 'FATAL',
        entityType: 'CROWD_STATUS',
        entityId: crowd.entityId,
        field: 'timestampIso',
        code: 'INVALID_TIMESTAMP',
        message: `Crowd status timestamp "${crowd.timestampIso}" is not a valid ISO 8601 string.`
      });
    }
  }

  // --- Validate Weather Conditions ---
  const weatherList = Array.isArray(dataset.weatherConditions)
    ? dataset.weatherConditions
    : Object.values(dataset.weatherConditions);

  for (const weather of weatherList) {
    if (weather.precipitationProbabilityPercent < 0 || weather.precipitationProbabilityPercent > 100) {
      issues.push({
        severity: 'FATAL',
        entityType: 'WEATHER_CONDITION',
        entityId: weather.zone,
        field: 'precipitationProbabilityPercent',
        code: 'INVALID_PERCENTAGE',
        message: `Weather condition precipitation (${weather.precipitationProbabilityPercent}%) must be between 0 and 100.`
      });
    }

    if (weather.temperatureCelsius < 5 || weather.temperatureCelsius > 50) {
      issues.push({
        severity: 'WARNING',
        entityType: 'WEATHER_CONDITION',
        entityId: weather.zone,
        field: 'temperatureCelsius',
        code: 'UNREALISTIC_TEMPERATURE',
        message: `Weather condition temperature (${weather.temperatureCelsius}°C) is outside typical Kolkata range.`
      });
    }

    if (typeof weather.isSimulated !== 'boolean') {
      issues.push({
        severity: 'FATAL',
        entityType: 'WEATHER_CONDITION',
        entityId: weather.zone,
        field: 'isSimulated',
        code: 'MISSING_SIMULATION_FLAG',
        message: `Weather telemetry "${weather.zone}" must explicitly define boolean "isSimulated" flag.`
      });
    }

    if (isNaN(Date.parse(weather.timestampIso))) {
      issues.push({
        severity: 'FATAL',
        entityType: 'WEATHER_CONDITION',
        entityId: weather.zone,
        field: 'timestampIso',
        code: 'INVALID_TIMESTAMP',
        message: `Weather timestamp "${weather.timestampIso}" is not a valid ISO 8601 string.`
      });
    }
  }

  const fatalCount = issues.filter(i => i.severity === 'FATAL').length;
  const warningCount = issues.filter(i => i.severity === 'WARNING').length;

  return {
    isValid: fatalCount === 0,
    fatalCount,
    warningCount,
    issues,
    summary: fatalCount === 0
      ? `Dataset valid. ${dataset.pujas.length} Pujas, ${dataset.transitNodes.length} Nodes, ${dataset.transitConnections.length} Connections validated (${warningCount} warnings).`
      : `Dataset validation failed with ${fatalCount} fatal error(s) and ${warningCount} warning(s).`
  };
}

export class DatasetValidationError extends Error {
  constructor(public readonly result: DatasetValidationResult) {
    super(
      `DatasetValidationError: ${result.summary}\n` +
      result.issues.map(i => `  [${i.severity}] [${i.code}] ${i.entityType} ${i.entityId}${i.field ? `.${i.field}` : ''}: ${i.message}`).join('\n')
    );
    this.name = 'DatasetValidationError';
  }
}

/**
 * Asserts that the dataset has zero fatal issues, throwing DatasetValidationError otherwise.
 */
export function assertValidDataset(dataset: DatasetContainer): void {
  const result = validateDataset(dataset);
  if (!result.isValid) {
    throw new DatasetValidationError(result);
  }
}
