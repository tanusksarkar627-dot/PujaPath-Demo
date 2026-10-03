/**
 * PUJAPATH - AI Integration Boundary & Structured Contracts
 * Phase 0: LLM Strict Schemas, Boundaries & Fallback Policies
 * 
 * Boundaries:
 * - AI parses natural language intent -> structured schema (AITripRequest)
 * - AI explains deterministic engine result -> reassuring narrative (AIItineraryExplanation)
 * - AI NEVER calculates distances, costs, route viability, or crowd values.
 */

import { AITripRequest, AIItineraryExplanation, TripRequest, Itinerary } from '../types/domain';

// ==========================================
// 1. Structured JSON Schema for Gemini Natural Language Parser
// ==========================================

export const AI_TRIP_PARSER_JSON_SCHEMA = {
  type: 'object',
  properties: {
    extractedStartLocation: {
      type: 'string',
      description: 'The starting location, station, or landmark mentioned by the user (e.g. Sealdah, Howrah, Airport, Gariahat).'
    },
    extractedEndLocation: {
      type: 'string',
      description: 'The ending return location or station mentioned by the user. If they said "return to start", this matches extractedStartLocation.'
    },
    extractedStartTime: {
      type: 'string',
      description: 'Start time in 24-hour HH:mm format (e.g. "17:00" for 5 PM).'
    },
    extractedEndTime: {
      type: 'string',
      description: 'Return or end deadline time in 24-hour HH:mm format (e.g. "23:00" for 11 PM).'
    },
    extractedBudgetInr: {
      type: 'number',
      description: 'Total user or group budget in Indian Rupees (INR). Defaults to 500 if unmentioned.'
    },
    extractedPujaCount: {
      type: 'integer',
      description: 'Target number of pandals/pujas requested. Defaults to 4 if unspecified.'
    },
    preferredCategories: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['HERITAGE_BONEDI', 'CROWD_PULLER_MEGA', 'ART_THEMATIC', 'COMMUNITY_ICONIC', 'ILLUMINATION_LIGHT']
      },
      description: 'Categories of Pujas requested.'
    },
    preferredTransportModes: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['WALK', 'METRO_BLUE', 'METRO_GREEN', 'AUTO_RICKSHAW', 'BUS_CSTC', 'TAXI_YELLOW', 'RIDE_HAIL']
      },
      description: 'Transport modes user explicitly prefers or mentioned (e.g. public transport -> METRO_BLUE, METRO_GREEN, BUS_CSTC).'
    },
    walkingTolerance: {
      type: 'string',
      enum: ['MINIMAL', 'MODERATE', 'HIGH'],
      description: 'User tolerance for walking ("avoid too much walking" -> MINIMAL).'
    },
    foodRequirement: {
      type: 'boolean',
      description: 'Whether user wants a food stop included (e.g. "eat Bengali food once" -> true).'
    },
    preferredCuisine: {
      type: 'string',
      enum: ['BENGALI_TRADITIONAL', 'KOLKATA_STREET_FOOD', 'BENGALI_SWEETS_MISHTI', 'MUGHLAI_BIRYANI', 'FAST_CASUAL'],
      description: 'Cuisine requested if foodRequirement is true.'
    },
    confidenceScore: {
      type: 'number',
      description: 'Confidence in extracting all parameters between 0.0 and 1.0.'
    },
    ambiguityNotes: {
      type: 'array',
      items: { type: 'string' },
      description: 'Any ambiguous or conflicting details that require user clarification.'
    }
  },
  required: [
    'extractedStartLocation',
    'extractedStartTime',
    'extractedEndTime',
    'extractedBudgetInr',
    'extractedPujaCount',
    'confidenceScore'
  ]
} as const;

// ==========================================
// 2. Structured JSON Schema for Result Explainer
// ==========================================

export const AI_EXPLAINER_JSON_SCHEMA = {
  type: 'object',
  properties: {
    headline: {
      type: 'string',
      description: 'Punchy, evocative title for the curated itinerary (e.g. "The Central-North Heritage & Illumination Corridor").'
    },
    executiveSummary: {
      type: 'string',
      description: '2-3 sentence overview explaining how this plan respects their time, budget, and walking constraints.'
    },
    whyThisSequence: {
      type: 'array',
      items: { type: 'string' },
      description: 'Bullet points explaining the route logic (e.g. why College Square was placed after Santosh Mitra Square to ride the Green/Blue Metro line).'
    },
    crowdAndTransitTips: {
      type: 'array',
      items: { type: 'string' },
      description: 'Actionable local Kolkata tips (e.g. "Buy return metro smart-tokens early", "Use the barricaded volunteer lane").'
    },
    foodHighlight: {
      type: 'string',
      description: 'Highlight of the designated food stop and what authentic dishes to try.'
    },
    safetyAndWeatherNotice: {
      type: 'string',
      description: 'Safety guidelines, police kiosk locations, or rain preparedness.'
    }
  },
  required: [
    'headline',
    'executiveSummary',
    'whyThisSequence',
    'crowdAndTransitTips'
  ]
} as const;

// ==========================================
// 3. System Prompts & Guardrails
// ==========================================

export const AI_PARSER_SYSTEM_PROMPT = `
You are the natural language interpretation agent for PUJAPATH, an AI-powered Durga Puja planner for Kolkata.
Your job is to read unstructured user requests and translate them into a structured AITripRequest JSON.

STRICT CONSTRAINTS:
1. NEVER calculate travel times, distances, route sequences, or costs yourself.
2. NEVER invent non-existent Durga Puja locations or fake metro stations.
3. If the user says "avoid too much walking", map walkingTolerance to "MINIMAL".
4. If the user mentions "public transport", map preferredTransportModes to ["METRO_BLUE", "METRO_GREEN", "BUS_CSTC"].
5. If the user mentions "Bengali food", set foodRequirement to true and preferredCuisine to "BENGALI_TRADITIONAL".
6. If the user does not specify an end location but says "return to Sealdah", set extractedEndLocation to "Sealdah".
7. Return strictly valid JSON adhering to the provided schema.
`.trim();

export const AI_EXPLAINER_SYSTEM_PROMPT = `
You are the Kolkata cultural guide and itinerary explainer for PUJAPATH.
You are given a DETERMINISTIC ITINERARY RESULT calculated by the optimization engine.

STRICT CONSTRAINTS:
1. DO NOT change or invent stops, timings, distances, costs, or sequence orders.
2. Explain the engine's deterministic choices with warmth, authentic Kolkata festival flair, and practical safety advice.
3. Emphasize why the sequence minimizes walking or avoids peak queue hours where applicable.
4. Highlight local authentic flavors, heritage aspects, and police assistance booths along the route.
5. Return strictly valid JSON adhering to the schema.
`.trim();
