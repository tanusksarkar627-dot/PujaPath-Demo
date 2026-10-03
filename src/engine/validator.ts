/**
 * PUJAPATH - Trip Request Validation
 * Phase 0: Deterministic Input Contract Validation
 */

import { TripRequest, EngineConstraintViolation } from '../types/domain';

export interface ValidationResult {
  readonly isValid: boolean;
  readonly errors: readonly EngineConstraintViolation[];
  readonly sanitizedRequest?: TripRequest;
}

/**
 * Validates a TripRequest before dispatching to the optimization pipeline.
 * Ensures all hard physical prerequisites are logically consistent.
 */
export function validateTripRequest(request: TripRequest): ValidationResult {
  const errors: EngineConstraintViolation[] = [];

  // 1. Time validity
  const startMs = Date.parse(request.startTime);
  const deadlineMs = Date.parse(request.deadlineTime);

  if (isNaN(startMs)) {
    errors.push({
      constraintName: 'INVALID_START_TIME',
      details: `Start time "${request.startTime}" is not a valid ISO 8601 date string.`,
      isFatal: true
    });
  }

  if (isNaN(deadlineMs)) {
    errors.push({
      constraintName: 'INVALID_DEADLINE_TIME',
      details: `Deadline time "${request.deadlineTime}" is not a valid ISO 8601 date string.`,
      isFatal: true
    });
  }

  if (!isNaN(startMs) && !isNaN(deadlineMs)) {
    const totalMinutes = (deadlineMs - startMs) / (1000 * 60);
    if (totalMinutes <= 30) {
      errors.push({
        constraintName: 'INSUFFICIENT_TIME_WINDOW',
        details: `Available window is only ${Math.round(totalMinutes)} minutes. Minimum viable window is 45 minutes.`,
        isFatal: true
      });
    }
    if (totalMinutes > 24 * 60) {
      errors.push({
        constraintName: 'EXCESSIVE_TIME_WINDOW',
        details: `Itinerary planning is currently scoped to single-day festival sessions (max 24 hours).`,
        isFatal: true
      });
    }
  }

  // 2. Budget validity
  if (request.budgetInr < 0) {
    errors.push({
      constraintName: 'NEGATIVE_BUDGET',
      details: `Budget cannot be negative (provided: ₹${request.budgetInr}).`,
      isFatal: true
    });
  }

  // 3. Desired Puja count
  if (request.desiredPujaCount < 1) {
    errors.push({
      constraintName: 'MINIMUM_PUJA_COUNT',
      details: `Desired Puja count must be at least 1 (provided: ${request.desiredPujaCount}).`,
      isFatal: true
    });
  }

  if (request.desiredPujaCount > 15) {
    errors.push({
      constraintName: 'EXCESSIVE_PUJA_COUNT',
      details: `Desired Puja count of ${request.desiredPujaCount} exceeds the maximum single-session limit (15) due to festival crowd safety limits.`,
      isFatal: true
    });
  }

  // 4. Coordinates
  if (
    request.startCoordinates.latitude < 22.0 || 
    request.startCoordinates.latitude > 23.0 ||
    request.startCoordinates.longitude < 88.0 || 
    request.startCoordinates.longitude > 89.0
  ) {
    errors.push({
      constraintName: 'OUT_OF_BOUNDS_LOCATION',
      details: `Start coordinates [${request.startCoordinates.latitude}, ${request.startCoordinates.longitude}] fall outside the greater Kolkata metropolitan area.`,
      isFatal: false // Non-fatal advisory, can map to nearest gateway
    });
  }

  return {
    isValid: errors.filter(e => e.isFatal).length === 0,
    errors,
    sanitizedRequest: errors.some(e => e.isFatal) ? undefined : request
  };
}
