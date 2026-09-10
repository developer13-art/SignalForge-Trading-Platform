import { aiClient } from '../../integrations/ai/client';
import { CLASSIFICATION_SYSTEM_PROMPT } from '../../integrations/ai/prompts';
import { SignalClassificationResult } from '../../types/ai.types';
import { logger } from '@signalforge/logger';

export class InterpretationService {
  async classifyMessage(messageText: string): Promise<SignalClassificationResult> {
    // Quick heuristic first
    const heuristic = this.heuristicClassify(messageText);
    if (heuristic.confidence >= 0.9) {
      return heuristic;
    }

    // AI classification
    try {
      const response = await aiClient.generateCompletion(
        CLASSIFICATION_SYSTEM_PROMPT,
        messageText,
        { maxTokens: 256, temperature: 0.1 }
      );

      const parsed = JSON.parse(this.extractJson(response.content));
      return {
        classification: parsed.classification,
        confidence: parsed.confidence,
        reasoning: parsed.reasoning,
      };
    } catch (error) {
      logger.error('AI classification failed:', error);
      return heuristic;
    }
  }

  private heuristicClassify(messageText: string): SignalClassificationResult {
    const text = messageText.toLowerCase();

    // Greeting/conversation
    if (/^(hi|hello|hey|good morning|good evening|thanks|thank you)\b/i.test(text) && text.length < 50) {
      return { classification: 'CONVERSATION', confidence: 0.9 };
    }

    // Strong signal indicators
    const signalKeywords = /\b(buy|sell|long|short|entry|sl|stop\s*loss|tp|take\s*profit|target)\b/i;
    const symbolPattern = /\b(EURUSD|GBPUSD|USDJPY|XAUUSD|GOLD|SILVER|AUDUSD|USDCAD|NZDUSD|USDCHF|[A-Z]{3}\/?[A-Z]{3})\b/;

    if (signalKeywords.test(text) && symbolPattern.test(messageText)) {
      return { classification: 'NEW_TRADE', confidence: 0.85 };
    }

    // Trade management keywords
    if (/\b(close|move\s+sl|breakeven|be|trail|partial|secure)\b/i.test(text) && text.length < 200) {
      return { classification: 'TRADE_MANAGEMENT', confidence: 0.8 };
    }

    // Market analysis
    if (/\b(analysis|outlook|forecast|expect|watching|monitoring)\b/i.test(text)) {
      return { classification: 'MARKET_ANALYSIS', confidence: 0.75 };
    }

    // Advertisement
    if (/\b(join|subscribe|vip|premium|channel|dm|whatsapp)\b/i.test(text) && text.length < 300) {
      return { classification: 'ADVERTISEMENT', confidence: 0.7 };
    }

    return { classification: 'UNKNOWN', confidence: 0.4 };
  }

  private extractJson(content: string): string {
    const match = content.match(/\{[\s\S]*\}/);
    return match ? match[0] : content;
  }
}

export const interpretationService = new InterpretationService();