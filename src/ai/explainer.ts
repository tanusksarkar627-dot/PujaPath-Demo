/**
 * PUJAPATH - AI Natural Language Explainer Service
 * Phase 0: Gemini API Explainer with Deterministic Narrative Fallback
 */

import { GoogleGenAI, Type } from '@google/genai';
import { AIItineraryExplanation, Itinerary, TripRequest } from '../types/domain';
import { IAIExplainerService } from '../types/services';
import { AI_EXPLAINER_SYSTEM_PROMPT } from './contracts';

export class GeminiAIExplainerService implements IAIExplainerService {
  private readonly aiClient: GoogleGenAI | null = null;

  constructor(apiKey?: string) {
    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      this.aiClient = new GoogleGenAI({ apiKey });
    }
  }

  async explainItinerary(itinerary: Itinerary, request: TripRequest): Promise<AIItineraryExplanation> {
    if (this.aiClient) {
      try {
        const promptPayload = JSON.stringify({
          userRequest: {
            start: request.startLocationName,
            end: request.endLocationName,
            budget: request.budgetInr,
            desiredCount: request.desiredPujaCount,
            walkingPreference: request.preferences.walkingTolerance
          },
          deterministicResult: {
            totalMinutes: itinerary.totalDurationMinutes,
            totalCostInr: itinerary.totalCostInr,
            stopsCount: itinerary.stops.length,
            visitedPujas: itinerary.visitedPujaIds,
            warnings: itinerary.warnings.map(w => w.message)
          }
        });

        const response = await this.aiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: promptPayload,
          config: {
            systemInstruction: AI_EXPLAINER_SYSTEM_PROMPT,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                headline: { type: Type.STRING },
                executiveSummary: { type: Type.STRING },
                whyThisSequence: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                crowdAndTransitTips: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                foodHighlight: { type: Type.STRING },
                safetyAndWeatherNotice: { type: Type.STRING }
              },
              required: ['headline', 'executiveSummary', 'whyThisSequence', 'crowdAndTransitTips']
            }
          }
        });

        if (response.text) {
          return JSON.parse(response.text) as AIItineraryExplanation;
        }
      } catch (err) {
        console.warn('Gemini explainer API call failed or timed out. Falling back to deterministic narrative.', err);
      }
    }

    // Deterministic Rule-Based Fallback Narrative
    return this.fallbackExplainer(itinerary, request);
  }

  private fallbackExplainer(itinerary: Itinerary, request: TripRequest): AIItineraryExplanation {
    const foodStop = itinerary.stops.find(s => s.type === 'FOOD_STOP');
    const pujaStops = itinerary.stops.filter(s => s.type === 'PUJA_VISIT');

    return {
      headline: 'The Grand Central & North Heritage Festive Trail',
      executiveSummary: `This route links ${pujaStops.length} iconic Durga Pujas starting and concluding at ${request.startLocationName}. It consumes ₹${itinerary.totalCostInr} (comfortably within your ₹${request.budgetInr} limit) and delivers a high-efficiency festival experience using the Kolkata Metro corridor.`,
      whyThisSequence: [
        'Santosh Mitra Square (Lebutala) is scheduled first because it is within 900 meters walking distance of Sealdah before peak evening crowds intensify.',
        'College Square and Mohammad Ali Park are grouped together along the historic Central corridor to eliminate redundant transit backtrack.',
        'Metro Blue Line is leveraged from Central/MG Road to Sovabazar Sutanuti to cross into North Kolkata rapidly without getting snarled in surface road traffic.'
      ],
      crowdAndTransitTips: [
        'Purchase return Metro smart tokens at Sealdah/Central before 7:00 PM to bypass kilometer-long counter queues later in the night.',
        'Kolkata Police has set up directional barricades along College Street; stick to the left-hand pedestrian stream.',
        'Keep 15 minutes of buffer time for entering Sovabazar Rajbari thakur-dalan due to courtyard capacity regulations.'
      ],
      foodHighlight: foodStop 
        ? `Mid-tour authentic Bengali stop at ${foodStop.name} to savor traditional festive specialties (average cost ~₹${foodStop.estimatedStopCostInr}).`
        : 'Plenty of heritage mishti and roll stalls are clustered around the Sovabazar and College Square transit hubs.',
      safetyAndWeatherNotice: 'Police Assistance Booths with dedicated first-aid tents are stationed at Sealdah Station and College Square.'
    };
  }
}
