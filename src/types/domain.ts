/**
 * PUJAPATH - Domain Models and Type Contracts
 * Phase 0: Architecture, Domain Model & Engineering Contracts
 */

// ==========================================
// 1. Core Enums and Primitive Unions
// ==========================================

export type PujaZone = 
  | 'NORTH_KOLKATA'
  | 'CENTRAL_KOLKATA'
  | 'SOUTH_KOLKATA'
  | 'EAST_KOLKATA'
  | 'HOWRAH';

export type PujaCategory =
  | 'HERITAGE_BONEDI'     // Traditional centuries-old family/aristocratic pujas (e.g., Sovabazar Rajbari)
  | 'CROWD_PULLER_MEGA'   // Giant spectacle installations (e.g., Sreebhumi, Suruchi Sangha)
  | 'ART_THEMATIC'        // Creative artisanal and conceptual themes (e.g., Kumartuli Park, Tridhara)
  | 'COMMUNITY_ICONIC'    // Traditional neighborhood community stalwarts (e.g., Bagbazar, Ekdalia)
  | 'ILLUMINATION_LIGHT'; // Famed lighting artistry (e.g., Santosh Mitra Square, Mohammad Ali Park)

export type TransportMode =
  | 'WALK'
  | 'METRO_BLUE'          // North-South Line (Dakshineswar - Kavi Subhash)
  | 'METRO_GREEN'         // East-West Line (Sector V - Sealdah - Howrah)
  | 'METRO_ORANGE'        // Kavi Subhash - Hemanta Mukherjee
  | 'AUTO_RICKSHAW'       // Fixed-route shared auto-rickshaws
  | 'BUS_CSTC'            // Government / Private public transit buses
  | 'TAXI_YELLOW'         // Traditional meter/flat festival taxis
  | 'RIDE_HAIL';          // App-based cabs (Uber/Ola/Yatri Sathi)

export type CrowdLevel =
  | 'VERY_LOW'    // < 15 min wait, free movement
  | 'MODERATE'    // 15 - 30 min wait, structured movement
  | 'HIGH'        // 30 - 60 min wait, barricaded queues
  | 'EXTREME';    // > 60 min wait, stampede-control barricades, police traffic holds

export type WeatherConditionType =
  | 'CLEAR'
  | 'PARTLY_CLOUDY'
  | 'LIGHT_RAIN'
  | 'HEAVY_MONSOON_SHOWER'
  | 'THUNDERSTORM';

export type CuisineType =
  | 'BENGALI_TRADITIONAL'
  | 'KOLKATA_STREET_FOOD'
  | 'BENGALI_SWEETS_MISHTI'
  | 'MUGHLAI_BIRYANI'
  | 'FAST_CASUAL';

export type FoodBudgetTier =
  | 'BUDGET_STREET'   // ₹50 - ₹150 per person (Rolls, Puchka, Telebhaja)
  | 'MID_RANGE'       // ₹150 - ₹400 per person (Cabin restaurants, traditional thali)
  | 'PREMIUM';        // ₹400+ per person (Heritage fine dining)

export type AccessibilityFeature =
  | 'WHEELCHAIR_RAMP'
  | 'PRIORITY_QUEUE_SENIOR'
  | 'LEVEL_GROUND_APPROACH'
  | 'POLICE_MOBILITY_ESCORT'
  | 'TACTILE_PAVING';

export type FacilityType =
  | 'POLICE_ASSISTANCE_BOOTH'
  | 'MEDICAL_FIRST_AID'
  | 'PUBLIC_TOILET'
  | 'DRINKING_WATER_KIOSK'
  | 'LOST_AND_FOUND'
  | 'VOLUNTEER_DESK'
  | 'CHILD_TAGGING_POINT';

export type WalkingTolerance =
  | 'MINIMAL'     // Max 400m per segment (prefer transit/rickshaw/drop-off directly)
  | 'MODERATE'    // Max 1.2km per segment
  | 'HIGH';       // Willing to walk up to 2.5km per segment

export type CrowdTolerance =
  | 'LOW_CROWDS_ONLY'   // Filter out EXTREME or high wait times
  | 'BALANCED'          // Accept moderate waits for top attractions
  | 'ANY_CROWD';        // Willing to brave mega crowds for iconic pujas

// ==========================================
// 2. Spatial and Geographic Primitives
// ==========================================

export interface GeoCoordinates {
  readonly latitude: number;
  readonly longitude: number;
}

// ==========================================
// 3. Domain Entities
// ==========================================

/**
 * Represents a Durga Puja Pandal / Committee.
 */
export interface Puja {
  readonly id: string;
  readonly name: string;
  readonly bengaliName?: string;
  readonly zone: PujaZone;
  readonly location: GeoCoordinates;
  readonly address: string;
  readonly landmark: string;
  readonly category: PujaCategory;
  /** Estimated average time spent inside/around pandal in minutes */
  readonly typicalDwellMinutes: number;
  /** VIP or Senior Citizen priority gate available */
  readonly hasVipPassAccess: boolean;
  readonly accessibilityFeatures: readonly AccessibilityFeature[];
  readonly nearestTransitNodeIds: readonly string[];
  readonly tags: readonly string[];
  /** Expected crowd sensitivity multiplier [0.5 - 2.0] */
  readonly crowdMultiplier: number;
  readonly currentThemeDescription?: string;
}

/**
 * Represents a transit junction, metro station, bus stop, or auto stand.
 */
export interface TransitNode {
  readonly id: string;
  readonly name: string;
  readonly location: GeoCoordinates;
  readonly supportedModes: readonly TransportMode[];
  readonly isTerminal: boolean; // e.g., Sealdah, Howrah, Esplanade
  readonly wheelchairAccessible: boolean;
}

/**
 * Deterministic connection between two transit nodes or a transit node and a Puja.
 */
export interface TransitConnection {
  readonly fromNodeId: string;
  readonly toNodeId: string;
  readonly mode: TransportMode;
  readonly distanceMeters: number;
  readonly typicalDurationMinutes: number;
  /** Typical fare in INR */
  readonly estimatedCostInr: number;
  /** Operational hours in 24h format (e.g. 05:00 - 23:30 for Metro) */
  readonly serviceHours?: {
    readonly start: string; // HH:mm
    readonly end: string;   // HH:mm
  };
  readonly frequencyMinutes?: number;
  /** Whether road traffic during festive evening impacts this mode */
  readonly festivalTrafficSensitive: boolean;
}

/**
 * Designated food stop (restaurants, heritage cabins, renowned street stalls).
 */
export interface FoodPlace {
  readonly id: string;
  readonly name: string;
  readonly location: GeoCoordinates;
  readonly cuisine: CuisineType;
  readonly budgetTier: FoodBudgetTier;
  readonly averageCostPerPersonInr: number;
  readonly averageDiningMinutes: number;
  readonly popularDishes: readonly string[];
  readonly nearestTransitNodeId: string;
  readonly isVegetarianFriendly: boolean;
}

/**
 * Essential emergency, hygiene, and civic facilities.
 */
export interface Facility {
  readonly id: string;
  readonly type: FacilityType;
  readonly name: string;
  readonly location: GeoCoordinates;
  readonly associatedPujaId?: string;
  readonly contactPhone?: string;
  readonly is24x7: boolean;
}

/**
 * Real-time or simulated crowd status for a Puja or Transit hub.
 */
export interface CrowdStatus {
  readonly entityId: string;
  readonly entityType: 'PUJA' | 'TRANSIT_NODE';
  readonly level: CrowdLevel;
  readonly estimatedQueueMinutes: number;
  readonly timestampIso: string;
  readonly trend: 'RISING' | 'STABLE' | 'FALLING';
  /** Is this synthetic mock data or verified telemetry? */
  readonly isSimulated: boolean;
}

/**
 * Localized weather status and precipitation risk.
 */
export interface WeatherCondition {
  readonly zone: PujaZone;
  readonly condition: WeatherConditionType;
  readonly precipitationProbabilityPercent: number;
  readonly temperatureCelsius: number;
  readonly timestampIso: string;
  readonly isSimulated: boolean;
  readonly warningNotice?: string;
}

// ==========================================
// 4. Trip Request & User Preferences
// ==========================================

export interface UserPreferences {
  readonly preferredCategories?: readonly PujaCategory[];
  readonly transportPreferences: readonly TransportMode[];
  readonly walkingTolerance: WalkingTolerance;
  readonly crowdTolerance: CrowdTolerance;
  readonly requiresFoodStop: boolean;
  readonly preferredCuisine?: CuisineType;
  readonly maxFoodBudgetInr?: number;
  readonly accessibilityRequirements?: readonly AccessibilityFeature[];
  readonly weatherSensitive: boolean;
}

/**
 * Canonical validated trip request passed to the deterministic itinerary engine.
 */
export interface TripRequest {
  readonly requestId: string;
  /** Start location name or landmark (resolved to nearest node or coordinates) */
  readonly startLocationName: string;
  readonly startCoordinates: GeoCoordinates;
  /** End location (can be same as start e.g. "return to Sealdah") */
  readonly endLocationName: string;
  readonly endCoordinates: GeoCoordinates;
  /** Desired start time formatted ISO or HH:mm string */
  readonly startTime: string; // ISO 8601 string e.g. "2026-10-02T17:00:00"
  /** Hard return deadline ISO 8601 string e.g. "2026-10-02T23:00:00" */
  readonly deadlineTime: string;
  /** Total budget available for the group/individual in INR */
  readonly budgetInr: number;
  /** Target count of pandals to visit */
  readonly desiredPujaCount: number;
  /** Specific puja IDs the user explicitly demanded to include */
  readonly mustIncludePujaIds?: readonly string[];
  /** Fine-grained user preferences */
  readonly preferences: UserPreferences;
}

// ==========================================
// 5. Itinerary Output Contracts
// ==========================================

export type StopType = 
  | 'START_POINT'
  | 'PUJA_VISIT'
  | 'FOOD_STOP'
  | 'TRANSIT_TRANSFER'
  | 'END_POINT';

export interface RouteSegment {
  readonly fromStopName: string;
  readonly toStopName: string;
  readonly mode: TransportMode;
  readonly distanceMeters: number;
  readonly durationMinutes: number;
  readonly costInr: number;
  readonly transitInstructions: string;
  readonly routePoints?: readonly GeoCoordinates[];
}

export interface ItineraryStop {
  readonly stopSequence: number;
  readonly type: StopType;
  readonly name: string;
  readonly entityId?: string; // Puja ID or FoodPlace ID
  readonly location: GeoCoordinates;
  readonly arrivalTime: string; // HH:mm
  readonly departureTime: string; // HH:mm
  readonly dwellTimeMinutes: number;
  readonly expectedQueueMinutes: number;
  readonly estimatedStopCostInr: number;
  readonly transitSegmentToNext?: RouteSegment;
  readonly crowdSnapshot?: CrowdStatus;
  readonly nearbyFacilities: readonly Facility[];
  readonly advisoryNotes?: readonly string[];
}

export interface ItineraryScoreBreakdown {
  readonly preferenceMatchScore: number;  // 0 - 100
  readonly pujaCountScore: number;        // 0 - 100
  readonly timeEfficiencyScore: number;   // 0 - 100
  readonly walkingComfortScore: number;   // 0 - 100
  readonly budgetEfficiencyScore: number; // 0 - 100
  readonly crowdSafetyScore: number;      // 0 - 100
  readonly overallCompositeScore: number; // Weighted sum [0 - 100]
}

export interface EngineConstraintViolation {
  readonly constraintName: string;
  readonly details: string;
  readonly isFatal: boolean;
}

export interface OptimizationWarning {
  readonly code: 
    | 'HIGH_CROWD_DELAY'
    | 'RAIN_RISK'
    | 'BUDGET_TIGHT'
    | 'TIGHT_DEADLINE'
    | 'REDUCED_PUJA_COUNT'
    | 'SUBOPTIMAL_WALK';
  readonly message: string;
  readonly mitigationSuggestion?: string;
}

export interface Itinerary {
  readonly itineraryId: string;
  readonly requestId: string;
  readonly totalDurationMinutes: number;
  readonly totalTravelMinutes: number;
  readonly totalQueueMinutes: number;
  readonly totalDwellMinutes: number;
  readonly totalWalkingDistanceMeters: number;
  readonly totalCostInr: number;
  readonly stops: readonly ItineraryStop[];
  readonly visitedPujaIds: readonly string[];
  readonly scoreBreakdown: ItineraryScoreBreakdown;
  readonly warnings: readonly OptimizationWarning[];
}

export interface ItineraryResult {
  readonly status: 'SUCCESS' | 'PARTIAL_SUCCESS' | 'INFEASIBLE';
  readonly primaryItinerary?: Itinerary;
  /** Alternative trade-off itineraries (e.g., fewer crowds vs more pujas) */
  readonly alternativeItineraries: readonly Itinerary[];
  readonly violations?: readonly EngineConstraintViolation[];
  /** Actionable suggestions when request is tight or infeasible */
  readonly suggestedAdjustments?: readonly string[];
  readonly engineMetrics: {
    readonly candidatesEvaluated: number;
    readonly prunedPathsCount: number;
    readonly executionDurationMs: number;
  };
  readonly generatedAtIso: string;
}

// ==========================================
// 6. AI Boundary Types
// ==========================================

/**
 * Raw unstructured interpretation produced by the AI request parser before validation.
 */
export interface AITripRequest {
  readonly rawInputText: string;
  readonly extractedStartLocation?: string;
  readonly extractedEndLocation?: string;
  readonly extractedStartTime?: string;     // e.g. "17:00"
  readonly extractedEndTime?: string;       // e.g. "23:00"
  readonly extractedBudgetInr?: number;     // e.g. 700
  readonly extractedPujaCount?: number;     // e.g. 5
  readonly preferredCategories?: readonly PujaCategory[];
  readonly preferredTransportModes?: readonly TransportMode[];
  readonly walkingTolerance?: WalkingTolerance;
  readonly foodRequirement?: boolean;
  readonly preferredCuisine?: CuisineType;
  readonly confidenceScore: number;         // 0.0 - 1.0
  readonly ambiguityNotes?: readonly string[];
}

/**
 * Natural language explanation structured schema.
 */
export interface AIItineraryExplanation {
  readonly headline: string;
  readonly executiveSummary: string;
  readonly whyThisSequence: readonly string[];
  readonly crowdAndTransitTips: readonly string[];
  readonly foodHighlight?: string;
  readonly safetyAndWeatherNotice?: string;
}
