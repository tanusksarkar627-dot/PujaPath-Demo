/**
 * PUJAPATH - AI Natural Language Parser Service
 * Phase 0: Gemini API Integration with Deterministic Regex Fallback
 */

import { GoogleGenAI, Type } from '@google/genai';
import { AITripRequest, CuisineType, PujaCategory, TransportMode, WalkingTolerance } from '../types/domain';
import { IAIParserService } from '../types/services';
import { AI_PARSER_SYSTEM_PROMPT } from './contracts';

export class GeminiAIParserService implements IAIParserService {
  private readonly aiClient: GoogleGenAI | null = null;

  constructor(apiKey?: string) {
    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      this.aiClient = new GoogleGenAI({ apiKey });
    }
  }

  async parseTripRequest(prompt: string): Promise<AITripRequest> {
    if (this.aiClient) {
      try {
        const response = await this.aiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            systemInstruction: AI_PARSER_SYSTEM_PROMPT,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                extractedStartLocation: { type: Type.STRING },
                extractedEndLocation: { type: Type.STRING },
                extractedStartTime: { type: Type.STRING },
                extractedEndTime: { type: Type.STRING },
                extractedBudgetInr: { type: Type.NUMBER },
                extractedPujaCount: { type: Type.INTEGER },
                preferredCategories: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                preferredTransportModes: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                walkingTolerance: { type: Type.STRING },
                foodRequirement: { type: Type.BOOLEAN },
                preferredCuisine: { type: Type.STRING },
                confidenceScore: { type: Type.NUMBER },
                ambiguityNotes: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
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
            }
          }
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          return {
            rawInputText: prompt,
            extractedStartLocation: parsed.extractedStartLocation || 'Sealdah',
            extractedEndLocation: parsed.extractedEndLocation || parsed.extractedStartLocation || 'Sealdah',
            extractedStartTime: parsed.extractedStartTime || '17:00',
            extractedEndTime: parsed.extractedEndTime || '23:00',
            extractedBudgetInr: Number(parsed.extractedBudgetInr) || 700,
            extractedPujaCount: Number(parsed.extractedPujaCount) || 5,
            preferredCategories: parsed.preferredCategories as PujaCategory[],
            preferredTransportModes: (parsed.preferredTransportModes as TransportMode[]) || ['METRO_BLUE', 'METRO_GREEN', 'WALK'],
            walkingTolerance: (parsed.walkingTolerance as WalkingTolerance) || 'MINIMAL',
            foodRequirement: Boolean(parsed.foodRequirement),
            preferredCuisine: (parsed.preferredCuisine as CuisineType) || 'BENGALI_TRADITIONAL',
            confidenceScore: Number(parsed.confidenceScore) || 0.95,
            ambiguityNotes: parsed.ambiguityNotes || []
          };
        }
      } catch (err) {
        console.warn('Gemini parser API call failed or timed out. Falling back to deterministic parser.', err);
      }
    }

    // Deterministic Rule-Based Fallback Parser (Guarantees zero-failure operation)
    return this.fallbackDeterministicParser(prompt);
  }

  private fallbackDeterministicParser(prompt: string): AITripRequest {
    const text = prompt.toLowerCase();

    // 1. Start & End location
    let startLoc = 'Sealdah';
    let endLoc = 'Sealdah';
    if (text.includes('howrah')) startLoc = 'Howrah';
    if (text.includes('esplanade')) startLoc = 'Esplanade';
    if (text.includes('gariahat')) startLoc = 'Gariahat';
    if (text.includes('shyambazar')) startLoc = 'Shyambazar';

    if (text.includes('return to')) {
      const match = text.match(/return to\s+([a-z\s]+?)(?:by|\.|\,|$)/i);
      if (match && match[1]) {
        endLoc = match[1].trim();
      }
    } else {
      endLoc = startLoc;
    }

    // 2. Times (e.g., 5 PM, 17:00, 11 PM)
    let startTime = '17:00';
    let endTime = '23:00';

    const startMatch = text.match(/(?:starting\s+(?:from\s+[a-z\s]+)?at\s+)(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i) ||
                       text.match(/at\s+(\d{1,2})\s*(am|pm)/i);
    if (startMatch) {
      let hour = parseInt(startMatch[1], 10);
      const isPm = startMatch[3]?.toLowerCase() === 'pm';
      if (isPm && hour < 12) hour += 12;
      startTime = `${hour.toString().padStart(2, '0')}:00`;
    }

    const endMatch = text.match(/(?:by|until|return by|before)\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
    if (endMatch) {
      let hour = parseInt(endMatch[1], 10);
      const isPm = endMatch[3]?.toLowerCase() === 'pm';
      if (isPm && hour < 12) hour += 12;
      endTime = `${hour.toString().padStart(2, '0')}:00`;
    }

    // 3. Budget (e.g. ₹700, 700 rs, rs. 700, 700 rupees)
    let budgetInr = 700;
    const budgetMatch = text.match(/(?:₹|rs\.?|inr)\s*(\d+)/i) || text.match(/(\d+)\s*(?:rs|rupees|inr|₹)/i);
    if (budgetMatch) {
      budgetInr = parseInt(budgetMatch[1], 10);
    }

    // 4. Desired Puja Count (e.g. 5 famous durga puja)
    let pujaCount = 5;
    const countMatch = text.match(/(\d+)\s*(?:famous|top|durga|puja|pandals)/i);
    if (countMatch) {
      pujaCount = Math.max(1, parseInt(countMatch[1], 10));
    }

    // 5. Walking & Transport
    const avoidWalking = text.includes('avoid too much walking') || text.includes('less walking') || text.includes('minimal walking');
    const walkingTolerance: WalkingTolerance = avoidWalking ? 'MINIMAL' : 'MODERATE';

    const transportModes: TransportMode[] = ['METRO_BLUE', 'METRO_GREEN', 'WALK'];
    if (text.includes('auto')) transportModes.push('AUTO_RICKSHAW');
    if (text.includes('bus')) transportModes.push('BUS_CSTC');

    // 6. Food
    const foodRequirement = text.includes('eat') || text.includes('food') || text.includes('lunch') || text.includes('dinner');
    let preferredCuisine: CuisineType | undefined;
    if (text.includes('bengali food') || text.includes('traditional')) {
      preferredCuisine = 'BENGALI_TRADITIONAL';
    } else if (text.includes('street food') || text.includes('roll')) {
      preferredCuisine = 'KOLKATA_STREET_FOOD';
    }

    return {
      rawInputText: prompt,
      extractedStartLocation: startLoc,
      extractedEndLocation: endLoc,
      extractedStartTime: startTime,
      extractedEndTime: endTime,
      extractedBudgetInr: budgetInr,
      extractedPujaCount: pujaCount,
      preferredCategories: ['HERITAGE_BONEDI', 'CROWD_PULLER_MEGA', 'COMMUNITY_ICONIC', 'ILLUMINATION_LIGHT'],
      preferredTransportModes: transportModes,
      walkingTolerance,
      foodRequirement,
      preferredCuisine,
      confidenceScore: 0.92,
      ambiguityNotes: []
    };
  }
}
