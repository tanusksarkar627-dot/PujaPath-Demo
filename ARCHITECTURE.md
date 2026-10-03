# PUJAPATH: Technical Architecture & Domain Engineering Contracts

> **Phase 0 Specification: Architecture, Domain Model & Engineering Contracts**  
> *Target System: AI-Powered Durga Puja Planning and Kolkata Exploration Platform*

---

## 1. Executive Summary & Design Tenets

PUJAPATH is designed to solve one of the most complex urban crowd coordination challenges in the world: navigating Kolkata during Durga Puja, when over 10 million people traverse thousands of neighborhood installations across intense pedestrian surges, vehicular traffic barricades, and complex transit corridors.

### Core Architectural Decisions & Rationales

1. **Deterministic Core with AI at the Periphery**:
   - *Decision*: Large Language Models (LLMs) are restricted strictly to input translation (Natural Language -> structured `TripRequest`) and result narration (`ItineraryResult` -> structured `AIItineraryExplanation`).
   - *Rationale*: LLMs are non-deterministic, prone to spatial hallucinations, incapable of reliable real-time constraint validation, and cannot guarantee budget/time safety in dense urban networks. The engine itself must be mathematical, testable, and deterministic.

2. **Decoupled Repository & Provider Abstractions**:
   - *Decision*: All domain entities (Pujas, Transit Graph, Food Spots, Facilities, Telemetry) are accessed through strict interfaces (`IPujaRepository`, `ITransitRepository`, `ICrowdService`).
   - *Rationale*: Enables zero-friction migration from Phase 0 mock fixtures to real APIs (e.g. Google Maps Platform, Kolkata Metro GTFS/fares, OpenStreetMap, KMC crowd cameras) without changing a single line of engine business logic.

3. **Explicit Hard vs. Soft Constraint Separation**:
   - *Decision*: Optimization is partitioned into **Candidate Generation**, **Hard Feasibility Pruning** (Time, Budget, Reachability), and **Multi-Criteria Soft Scoring** (Preferences, Walking, Crowds).
   - *Rationale*: Eliminates combinatorial explosion and guarantees that any itinerary returned to the user is physically achievable within their explicit deadline and budget.

4. **Truth in Telemetry (`isSimulated` flag)**:
   - *Decision*: All crowd, queue, and weather telemetry models carry explicit `isSimulated: boolean` flags.
   - *Rationale*: Festival safety requires strict transparency; users and field workers must never mistake synthetic demo data for live police surveillance or sensor feeds.

---

## 2. System Architecture & Information Flow

```
                      +---------------------------------------+
                      |          USER INTERFACE (UI)          |
                      |   Natural Language Input / Sliders    |
                      +-------------------+-------------------+
                                          |
                                          | Natural Language Text
                                          v
                      +---------------------------------------+
                      |           AI REQUEST PARSER           |
                      |  (Gemini API / Regex Rule Fallback)   |
                      +-------------------+-------------------+
                                          |
                                          | AITripRequest
                                          v
                      +---------------------------------------+
                      |        LANDMARK / GEO RESOLVER        |
                      | (Resolves Sealdah -> Lat/Lng & Node)  |
                      +-------------------+-------------------+
                                          |
                                          | Validated TripRequest
                                          v
+-----------------------------------------------------------------------------------+
|                           ITINERARY OPTIMIZATION ENGINE                           |
|                                                                                   |
|  1. Candidate Generation     2. Feasibility Pruning     3. Deterministic Scoring  |
|  (Zone & Corridor Clusters)  (Time & Budget Limits)     (Weighted Multi-Objective)|
|                                                                                   |
|                   4. Detailed Route Assembly (Stops & Segments)                   |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          | ItineraryResult
                                          v
                      +---------------------------------------+
                      |        AI EXPLAINER / NARRATOR        |
                      |   (Reassuring Context & Safety Tips)  |
                      +-------------------+-------------------+
                                          |
                                          | UI ViewModel
                                          v
                      +---------------------------------------+
                      |          UI PRESENTATION VIEW         |
                      |  Interactive Map, Timeline, Warnings  |
                      +---------------------------------------+
```

---

## 3. Directory Structure

```
/
├── .env.example                     # Environment contract (GEMINI_API_KEY, APP_URL)
├── index.html                       # Entry point synced with metadata.json
├── metadata.json                    # AI Studio metadata & capabilities
├── package.json                     # Dependencies & build scripts
├── tsconfig.json                    # Strict TypeScript configuration
├── vite.config.ts                   # Vite + Tailwind build configuration
├── ARCHITECTURE.md                  # This authoritative document
├── src/
│   ├── main.tsx                     # React root mount
│   ├── App.tsx                      # Architectural Dashboard & Verification Suite
│   ├── index.css                    # Tailwind CSS imports
│   ├── types/
│   │   ├── domain.ts                # Canonical domain models, enums & entity types
│   │   ├── engine.ts                # Optimizer contracts, scoring models & pipeline
│   │   └── services.ts              # Service & repository abstractions
│   ├── services/
│   │   └── mock/
│   │       ├── data.ts              # Curated Kolkata Puja, Transit, Food & Facility fixtures
│   │       └── repositories.ts      # Concrete mock repository adapters
│   ├── engine/
│   │   ├── validator.ts             # Deterministic input contract validation
│   │   ├── scoring.ts               # Multi-objective scoring formulation
│   │   └── optimizer.ts             # Reference multi-stop optimization engine
│   ├── ai/
│   │   ├── contracts.ts             # JSON schemas and system prompts for Gemini
│   │   ├── parser.ts                # AI input parser with fallback
│   │   └── explainer.ts             # AI itinerary narrator with fallback
│   └── tests/                       # Test specifications & reference vectors
```

---

## 4. Domain Data Model & Entity Relationships

### Entity Relationship Diagram

```
       +-----------------------+              +-----------------------+
       |         Puja          |              |      TransitNode      |
       +-----------------------+              +-----------------------+
       | id: string            |              | id: string            |
       | name: string          |              | name: string          |
       | zone: PujaZone        |              | location: GeoCoords   |
       | category: PujaCategory|              | supportedModes: Mode[]|
       | dwellMinutes: number  |              | isTerminal: boolean   |
       | nearestNodeIds: id[]  +----(links)-->| wheelchair: boolean   |
       +-----------+-----------+              +-----------+-----------+
                   |                                      |
                   | (associated with)                    | (serves)
                   v                                      v
       +-----------------------+              +-----------------------+
       |       Facility        |              |   TransitConnection   |
       +-----------------------+              +-----------------------+
       | id: string            |              | fromNodeId: string    |
       | type: FacilityType    |              | toNodeId: string      |
       | name: string          |              | mode: TransportMode   |
       | is24x7: boolean       |              | durationMinutes: num  |
       +-----------------------+              | estimatedCostInr: num |
                                              +-----------------------+
                   ^                                      ^
                   | (associated)                         | (serves)
       +-----------+-----------+                          |
       |       FoodPlace       |                          |
       +-----------------------+                          |
       | id: string            |                          |
       | cuisine: CuisineType  |                          |
       | budgetTier: Tier      |                          |
       | nearestNodeId: string +--------------------------+
       +-----------------------+
```

### Key Domain Enums

- **`PujaZone`**: `NORTH_KOLKATA`, `CENTRAL_KOLKATA`, `SOUTH_KOLKATA`, `EAST_KOLKATA`, `HOWRAH`
- **`PujaCategory`**: `HERITAGE_BONEDI`, `CROWD_PULLER_MEGA`, `ART_THEMATIC`, `COMMUNITY_ICONIC`, `ILLUMINATION_LIGHT`
- **`TransportMode`**: `WALK`, `METRO_BLUE`, `METRO_GREEN`, `METRO_ORANGE`, `AUTO_RICKSHAW`, `BUS_CSTC`, `TAXI_YELLOW`, `RIDE_HAIL`
- **`CrowdLevel`**: `VERY_LOW`, `MODERATE`, `HIGH`, `EXTREME`
- **`WalkingTolerance`**: `MINIMAL` (<=400m/seg), `MODERATE` (<=1.2km/seg), `HIGH` (<=2.5km/seg)
- **`FoodBudgetTier`**: `BUDGET_STREET` (₹50-₹150), `MID_RANGE` (₹150-₹400), `PREMIUM` (₹400+)

---

## 5. Itinerary Optimization Engine Specification

### Problem Formulation: Constrained Multi-Stop Tour with Dynamic Dwell & Queue Times

Unlike classic symmetric TSP (Traveling Salesperson Problem), Kolkata Durga Puja route planning is an **Asymmetric, Time-Windowed, Multi-Modal Orienteering Problem with Dynamic Queueing**.

### Pipeline Stages

1. **Validation & Normalization**:
   - Checks: Start/End resolved, $\text{deadline} - \text{start} \ge 45\text{ min}$, budget $\ge 0$, requested count $\in [1, 15]$.

2. **Candidate Generation**:
   - Filters candidate pujas by spatial corridor (e.g. North-South Metro Line 1 corridor, East-West Metro Line 2 corridor).
   - Generates viable permutation sub-graphs prioritizing adjacent cluster traversals.

3. **Hard Feasibility Pruning**:
   - Any candidate sequence $C$ is discarded if:
     $$\sum_{i} (\text{TransitTime}_i + \text{QueueTime}_i + \text{DwellTime}_i) > T_{\text{available}}$$
     $$\sum_{i} (\text{TransitCost}_i + \text{FoodCost}_i) > B_{\text{budget}}$$
     $$\max_{i}(\text{WalkDistance}_i) > W_{\text{max\_tolerance}}$$

4. **Multi-Objective Scoring Function**:
   $$S = w_p \cdot S_{\text{pref}} + w_c \cdot S_{\text{count}} + w_t \cdot S_{\text{time}} + w_w \cdot S_{\text{walk}} + w_b \cdot S_{\text{budget}} + w_s \cdot S_{\text{crowd}}$$
   - Default Weights: $w_p=0.25, w_c=0.25, w_t=0.15, w_w=0.15, w_b=0.10, w_s=0.10$.

5. **Route Construction**:
   - Synthesizes sequence into timestamped `ItineraryStop` entities with detailed `RouteSegment` transit directions, nearby civic facilities, and advisory notes.

---

## 6. AI Boundary & Integration Contracts

| Responsibility | Handled By | Failure Strategy |
| :--- | :--- | :--- |
| Natural language intent extraction | Gemini 2.5 Flash / Interactions API | Deterministic Regex Parser |
| Pandal locations & coordinates | Deterministic Repository | Validated Geo Database |
| Distance & duration calculations | Deterministic Transit Graph | Metric Graph Weights |
| Cost & Fare calculation | Deterministic Engine | Fare Matrices |
| Constraint satisfaction (Time/Budget) | Deterministic Feasibility Filter | Engine Pruning & Warning Emission |
| Explanatory storytelling & cultural nuance | Gemini 2.5 Flash | Deterministic Narrative Builder |

---

## 7. Error Handling & Infeasibility Strategy

When a user request cannot be fulfilled as stated (e.g. "Visit 10 pujas in 2 hours for ₹50"):

1. **Never Fail Silently**: The engine marks `status = 'INFEASIBLE'` and populates structured `violations`.
2. **Graceful Trade-off Suggestions**:
   - The engine generates the best attainable **Partial Success** itinerary (e.g., 3 pujas within 2 hours) and attaches an `OptimizationWarning` (`REDUCED_PUJA_COUNT`).
3. **Structured Advisory Warnings**:
   - `BUDGET_TIGHT`: User has < ₹100 buffer.
   - `TIGHT_DEADLINE`: User has < 30 min buffer before return deadline.
   - `HIGH_CROWD_DELAY`: Expected queue at selected mega pandal exceeds 45 mins.

---

## 8. Test Strategy & Primary Test Vector

### Test Vector 1 (The Canonical Hackathon Challenge)

- **Input Prompt**:  
  *"I'm starting from Sealdah at 5 PM. I have ₹700. I want to visit 5 famous Durga Puja pandals, avoid too much walking, use public transport, eat Bengali food once and return to Sealdah by 11 PM."*

- **Expected Parsed Parameters**:
  - `startLocationName`: "Sealdah"
  - `endLocationName`: "Sealdah"
  - `startTime`: "17:00"
  - `deadlineTime`: "23:00" (Available: 360 mins)
  - `budgetInr`: ₹700
  - `desiredPujaCount`: 5
  - `walkingTolerance`: "MINIMAL"
  - `transportPreferences`: `['METRO_BLUE', 'METRO_GREEN', 'BUS_CSTC']`
  - `foodRequirement`: true (`BENGALI_TRADITIONAL`)

- **Expected Engine Output**:
  - Sequence: Sealdah -> Santosh Mitra Square -> College Square -> Mohammad Ali Park -> Bhojohori Manna (Dinner) -> Sovabazar Rajbari -> Kumartuli Park -> Metro back to Sealdah.
  - Total Duration: ~340 - 355 minutes (Fits under 360 min deadline).
  - Total Cost: ~₹315 - ₹350 (Well within ₹700 budget).
  - Warnings: `BUDGET_TIGHT` (if food selected was expensive), `TIGHT_DEADLINE`.

---

## 9. Implementation Roadmap for Subsequent Phases

```
+--------------------------------------------------------------------------+
| PHASE 0 (Completed): Architecture, Domain Model & Engineering Contracts  |
+--------------------------------------------------------------------------+
                                    |
                                    v
+--------------------------------------------------------------------------+
| PHASE 1: Complete Graph Routing & Core Optimization Engine               |
| - Implement Dijkstra / A* multi-modal pathfinding across transit graph    |
| - Implement branch-and-bound candidate generation for arbitrary stops    |
| - Comprehensive Vitest/Jest automated test suite for engine test vectors |
+--------------------------------------------------------------------------+
                                    |
                                    v
+--------------------------------------------------------------------------+
| PHASE 2: Live Sensor Adapters & Real-Time Telemetry                      |
| - Google Maps Platform integration for live routing and walking paths    |
| - OpenStreetMap / GTFS transit schedule ingestion                        |
| - Kolkata Police live traffic advisory feed ingestion                    |
+--------------------------------------------------------------------------+
                                    |
                                    v
+--------------------------------------------------------------------------+
| PHASE 3: Production UI, Interactive Map & Offline PWA                    |
| - High-performance interactive Mapbox/Leaflet canvas                     |
| - Turn-by-turn mobile navigation cards with bilingual English/Bengali    |
| - Offline service worker caching for festival connectivity dead zones    |
+--------------------------------------------------------------------------+
```
