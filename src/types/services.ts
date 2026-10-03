/**
 * PUJAPATH - Service Abstraction & Repository Interfaces
 * Phase 0: Decoupling deterministic logic from data sources & AI providers
 */

import {
  Puja,
  TransitNode,
  TransitConnection,
  FoodPlace,
  Facility,
  CrowdStatus,
  WeatherCondition,
  TripRequest,
  AITripRequest,
  Itinerary,
  AIItineraryExplanation,
  GeoCoordinates,
  PujaZone
} from './domain';

// ==========================================
// 1. Data Source Repositories
// ==========================================

export interface IPujaRepository {
  getAllPujas(): Promise<readonly Puja[]>;
  getPujaById(id: string): Promise<Puja | undefined>;
  getPujasByZone(zone: PujaZone): Promise<readonly Puja[]>;
  searchPujas(query: string): Promise<readonly Puja[]>;
}

export interface ITransitRepository {
  getAllNodes(): Promise<readonly TransitNode[]>;
  getNodeById(id: string): Promise<TransitNode | undefined>;
  getConnectionsFrom(nodeId: string): Promise<readonly TransitConnection[]>;
  /** Complete adjacency list representation of the Kolkata transit graph */
  getTransitGraph(): Promise<ReadonlyMap<string, readonly TransitConnection[]>>;
  findNearestNode(coordinates: GeoCoordinates): Promise<TransitNode>;
}

export interface IFoodRepository {
  getAllFoodPlaces(): Promise<readonly FoodPlace[]>;
  getFoodPlaceById(id: string): Promise<FoodPlace | undefined>;
  getFoodPlacesNearNode(transitNodeId: string): Promise<readonly FoodPlace[]>;
}

export interface IFacilityRepository {
  getFacilitiesNearPuja(pujaId: string): Promise<readonly Facility[]>;
  getEmergencyBooths(): Promise<readonly Facility[]>;
}

// ==========================================
// 2. Real-time / Condition Providers
// (Allows switching from Mock Data to Live Telemetry/Sensors seamlessly)
// ==========================================

export interface ICrowdService {
  /**
   * Retrieves crowd status for a list of entities.
   * Implementation can be synthetic historical model or real crowd camera telemetry.
   */
  getCrowdStatuses(entityIds: readonly string[]): Promise<ReadonlyMap<string, CrowdStatus>>;
  getLiveStatus(entityId: string): Promise<CrowdStatus>;
}

export interface IWeatherService {
  /**
   * Retrieves weather forecast and rain probability for specified Kolkata zones.
   */
  getZoneWeather(zone: PujaZone): Promise<WeatherCondition>;
  getAllZoneConditions(): Promise<readonly WeatherCondition[]>;
}

// ==========================================
// 3. Landmark & Geocoding Resolver
// ==========================================

export interface ResolvedLocation {
  readonly query: string;
  readonly canonicalName: string;
  readonly coordinates: GeoCoordinates;
  readonly nearestTransitNodeId: string;
}

export interface ILandmarkResolver {
  resolveLocation(locationNameOrQuery: string): Promise<ResolvedLocation>;
}

// ==========================================
// 4. AI Integration Contracts
// ==========================================

export interface IAIParserService {
  /**
   * Converts unstructured user conversational request into a structured intermediate AITripRequest.
   * Must never make assumptions about travel duration or route feasibility.
   */
  parseTripRequest(naturalLanguagePrompt: string): Promise<AITripRequest>;
}

export interface IAIExplainerService {
  /**
   * Generates a context-aware, reassuring natural language explanation of the generated itinerary,
   * explaining why specific metro lines or timings were chosen, and warning about crowd surges.
   */
  explainItinerary(itinerary: Itinerary, request: TripRequest): Promise<AIItineraryExplanation>;
}
