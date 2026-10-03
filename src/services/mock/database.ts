/**
 * PUJAPATH - In-Memory Mock Database & Data Access Utilities
 * Phase 1: High-Performance Indexed Storage with Built-In Validation
 */

import {
  Puja,
  TransitNode,
  TransitConnection,
  FoodPlace,
  Facility,
  CrowdStatus,
  WeatherCondition,
  GeoCoordinates,
  PujaZone
} from '../../types/domain';
import {
  MOCK_PUJAS,
  MOCK_TRANSIT_NODES,
  MOCK_TRANSIT_CONNECTIONS,
  MOCK_FOOD_PLACES,
  MOCK_FACILITIES,
  MOCK_CROWD_STATUSES,
  MOCK_WEATHER_CONDITIONS
} from './data';
import {
  DatasetContainer,
  assertValidDataset,
  validateDataset,
  DatasetValidationResult
} from '../../validation/dataValidator';

/**
 * Calculates Great-Circle distance in meters using Haversine formula.
 */
export function calculateHaversineDistanceMeters(
  coord1: GeoCoordinates,
  coord2: GeoCoordinates
): number {
  const R = 6371e3; // Earth radius in meters
  const phi1 = (coord1.latitude * Math.PI) / 180;
  const phi2 = (coord2.latitude * Math.PI) / 180;
  const deltaPhi = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
  const deltaLambda = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

export class MockDatabase {
  private readonly pujasById: Map<string, Puja> = new Map();
  private readonly pujasByZone: Map<PujaZone, Puja[]> = new Map();

  private readonly transitNodesById: Map<string, TransitNode> = new Map();
  private readonly outboundConnections: Map<string, TransitConnection[]> = new Map();
  private readonly inboundConnections: Map<string, TransitConnection[]> = new Map();

  private readonly foodPlacesById: Map<string, FoodPlace> = new Map();
  private readonly foodPlacesByNode: Map<string, FoodPlace[]> = new Map();

  private readonly facilitiesById: Map<string, Facility> = new Map();
  private readonly facilitiesByPuja: Map<string, Facility[]> = new Map();

  private readonly crowdStatuses: Map<string, CrowdStatus> = new Map();
  private readonly weatherByZone: Map<PujaZone, WeatherCondition> = new Map();

  private readonly validationReport: DatasetValidationResult;

  constructor(customData?: Partial<DatasetContainer>, skipValidation: boolean = false) {
    const rawPujas = customData?.pujas ?? MOCK_PUJAS;
    const rawNodes = customData?.transitNodes ?? MOCK_TRANSIT_NODES;
    const rawConns = customData?.transitConnections ?? MOCK_TRANSIT_CONNECTIONS;
    const rawFood = customData?.foodPlaces ?? MOCK_FOOD_PLACES;
    const rawFacs = customData?.facilities ?? MOCK_FACILITIES;
    const rawCrowd = customData?.crowdStatuses ?? MOCK_CROWD_STATUSES;
    const rawWeather = customData?.weatherConditions ?? MOCK_WEATHER_CONDITIONS;

    const dataset: DatasetContainer = {
      pujas: rawPujas,
      transitNodes: rawNodes,
      transitConnections: rawConns,
      foodPlaces: rawFood,
      facilities: rawFacs,
      crowdStatuses: rawCrowd,
      weatherConditions: rawWeather
    };

    this.validationReport = validateDataset(dataset);

    if (!skipValidation) {
      assertValidDataset(dataset);
    }

    this.indexData(dataset);
  }

  private indexData(dataset: DatasetContainer): void {
    // Index Nodes
    for (const node of dataset.transitNodes) {
      this.transitNodesById.set(node.id, node);
      this.outboundConnections.set(node.id, []);
      this.inboundConnections.set(node.id, []);
      this.foodPlacesByNode.set(node.id, []);
    }

    // Index Connections
    for (const conn of dataset.transitConnections) {
      const outList = this.outboundConnections.get(conn.fromNodeId) ?? [];
      outList.push(conn);
      this.outboundConnections.set(conn.fromNodeId, outList);

      const inList = this.inboundConnections.get(conn.toNodeId) ?? [];
      inList.push(conn);
      this.inboundConnections.set(conn.toNodeId, inList);
    }

    // Index Pujas
    for (const puja of dataset.pujas) {
      this.pujasById.set(puja.id, puja);
      const zoneList = this.pujasByZone.get(puja.zone) ?? [];
      zoneList.push(puja);
      this.pujasByZone.set(puja.zone, zoneList);
      this.facilitiesByPuja.set(puja.id, []);
    }

    // Index Food
    for (const food of dataset.foodPlaces) {
      this.foodPlacesById.set(food.id, food);
      const nodeFood = this.foodPlacesByNode.get(food.nearestTransitNodeId) ?? [];
      nodeFood.push(food);
      this.foodPlacesByNode.set(food.nearestTransitNodeId, nodeFood);
    }

    // Index Facilities
    for (const fac of dataset.facilities) {
      this.facilitiesById.set(fac.id, fac);
      if (fac.associatedPujaId) {
        const pujaFacs = this.facilitiesByPuja.get(fac.associatedPujaId) ?? [];
        pujaFacs.push(fac);
        this.facilitiesByPuja.set(fac.associatedPujaId, pujaFacs);
      }
    }

    // Index Crowd
    const crowdEntries = Array.isArray(dataset.crowdStatuses)
      ? dataset.crowdStatuses
      : Object.values(dataset.crowdStatuses);
    for (const crowd of crowdEntries) {
      this.crowdStatuses.set(crowd.entityId, crowd);
    }

    // Index Weather
    const weatherEntries = Array.isArray(dataset.weatherConditions)
      ? dataset.weatherConditions
      : Object.values(dataset.weatherConditions);
    for (const weather of weatherEntries) {
      this.weatherByZone.set(weather.zone, weather);
    }
  }

  // --- Pujas Accessors ---
  getAllPujas(): readonly Puja[] {
    return Array.from(this.pujasById.values());
  }

  getPujaById(id: string): Puja | undefined {
    return this.pujasById.get(id);
  }

  getPujasByZone(zone: PujaZone): readonly Puja[] {
    return this.pujasByZone.get(zone) ?? [];
  }

  findPujasWithinRadiusMeters(coords: GeoCoordinates, radiusMeters: number): readonly Puja[] {
    return this.getAllPujas().filter(p => calculateHaversineDistanceMeters(coords, p.location) <= radiusMeters);
  }

  // --- Transit Accessors ---
  getAllTransitNodes(): readonly TransitNode[] {
    return Array.from(this.transitNodesById.values());
  }

  getTransitNodeById(id: string): TransitNode | undefined {
    return this.transitNodesById.get(id);
  }

  getOutboundConnections(nodeId: string): readonly TransitConnection[] {
    return this.outboundConnections.get(nodeId) ?? [];
  }

  getInboundConnections(nodeId: string): readonly TransitConnection[] {
    return this.inboundConnections.get(nodeId) ?? [];
  }

  getAdjacencyGraph(): ReadonlyMap<string, readonly TransitConnection[]> {
    return this.outboundConnections;
  }

  findNearestTransitNode(coords: GeoCoordinates): TransitNode {
    let nearest: TransitNode | undefined;
    let minDistance = Number.MAX_VALUE;

    for (const node of this.transitNodesById.values()) {
      const dist = calculateHaversineDistanceMeters(coords, node.location);
      if (dist < minDistance) {
        minDistance = dist;
        nearest = node;
      }
    }

    if (!nearest) {
      throw new Error('No transit nodes indexed in MockDatabase.');
    }
    return nearest;
  }

  // --- Food Places Accessors ---
  getAllFoodPlaces(): readonly FoodPlace[] {
    return Array.from(this.foodPlacesById.values());
  }

  getFoodPlaceById(id: string): FoodPlace | undefined {
    return this.foodPlacesById.get(id);
  }

  getFoodPlacesNearNode(nodeId: string): readonly FoodPlace[] {
    return this.foodPlacesByNode.get(nodeId) ?? [];
  }

  // --- Facilities Accessors ---
  getAllFacilities(): readonly Facility[] {
    return Array.from(this.facilitiesById.values());
  }

  getFacilitiesForPuja(pujaId: string): readonly Facility[] {
    return this.facilitiesByPuja.get(pujaId) ?? [];
  }

  getEmergencyBooths(): readonly Facility[] {
    return this.getAllFacilities().filter(
      f => f.type === 'POLICE_ASSISTANCE_BOOTH' || f.type === 'MEDICAL_FIRST_AID'
    );
  }

  // --- Dynamic Telemetry Accessors ---
  getCrowdStatus(entityId: string): CrowdStatus {
    const existing = this.crowdStatuses.get(entityId);
    if (existing) return existing;

    // Deterministic fallback if not explicitly registered
    return {
      entityId,
      entityType: this.pujasById.has(entityId) ? 'PUJA' : 'TRANSIT_NODE',
      level: 'MODERATE',
      estimatedQueueMinutes: 20,
      timestampIso: new Date().toISOString(),
      trend: 'STABLE',
      isSimulated: true
    };
  }

  getWeatherForZone(zone: PujaZone): WeatherCondition {
    const existing = this.weatherByZone.get(zone);
    if (existing) return existing;

    return {
      zone,
      condition: 'CLEAR',
      precipitationProbabilityPercent: 10,
      temperatureCelsius: 29,
      timestampIso: new Date().toISOString(),
      isSimulated: true
    };
  }

  // --- Diagnostic & Validation Accessors ---
  getValidationReport(): DatasetValidationResult {
    return this.validationReport;
  }
}

// Global default singleton instance
export const defaultMockDatabase = new MockDatabase();
