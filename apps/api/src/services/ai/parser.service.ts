import { aiClient } from '../../integrations/ai/client';
import { PARSING_SYSTEM_PROMPT, TRADE_MANAGEMENT_SYSTEM_PROMPT } from '../../integrations/ai/prompts';
import { ParsedSignal, AiParseRequest } from '../../types/ai.types';
import { logger } from '@signalforge/logger';

const SYMBOL_ALIASES: Record<string, string> = {
  'gold': 'XAUUSD',
  'silver': 'XAGUSD',
  'euro': 'EURUSD',
  'cable': 'GBPUSD',
  'fiber': 'EURUSD',
  'aussie': 'AUDUSD',
  'kiwi': 'NZDUSD',
  'loonie': 'USDCAD',
  'swissy': 'USDCHF',
  'EU': 'EURUSD',
  'GU': 'GBPUSD',
  'UJ': 'USDJPY',
  'EURO': 'EURUSD',
  'POUND': 'GBPUSD',
};

export class ParserService {
  async parseSignal(request: AiParseRequest): Promise<ParsedSignal> {
    const { messageText, providerId, context } = request;

    // Fast Path: try regex + Provider DNA first
    if (providerId && context?.dnaRules && context.dnaRules.length > 0) {
      const fastResult = await this.tryFastPath(messageText, context.dnaRules);
      if (fastResult && fastResult.confidence >= 0.85) {
        return fastResult;
      }
    }

    // Learning Path: use AI
    return this.parseWithAi(messageText, context);
  }

  private async tryFastPath(
    messageText: string,
    dnaRules: Array<{ pattern: string; action: string }>
  ): Promise<ParsedSignal | null> {
    for (const rule of dnaRules) {
      const regex = new RegExp(rule.pattern, 'i');
      if (regex.test(messageText)) {
        // Extract basic signal info
        const basic = this.extractBasicSignal(messageText);
        if (basic) {
          return {
            ...basic,
            confidence: 0.9,
            metadata: { path: 'FAST_PATH', matchedRule: rule.pattern },
          };
        }
      }
    }
    return null;
  }

  private extractBasicSignal(text: string): Partial<ParsedSignal> | null {
    const upper = text.toUpperCase();

    // Detect direction
    let action: 'BUY' | 'SELL' | null = null;
    if (/\b(BUY|LONG|BULLISH)\b/i.test(text)) action = 'BUY';
    else if (/\b(SELL|SHORT|BEARISH)\b/i.test(text)) action = 'SELL';

    if (!action) return null;

    // Detect symbol
    let symbol = this.detectSymbol(text);

    // Detect prices
    const prices = text.match(/\b\d+\.?\d*\b/g)?.map(Number) || [];

    return {
      action,
      symbol,
      entryType: 'MARKET',
      entryPrice: prices[0] || null,
      stopLoss: null,
      takeProfits: [],
      timeframe: null,
      confidence: 0.7,
      classification: 'NEW_TRADE',
      language: 'en',
      rawText: text,
    };
  }

  private detectSymbol(text: string): string | null {
    const upper = text.toUpperCase();

    // Check for standard forex pairs
    const forexMatch = upper.match(/\b([A-Z]{3}\/?[A-Z]{3})\b/);
    if (forexMatch) {
      return forexMatch[1].replace('/', '');
    }

    // Check for metals/commodities
    const metalMatch = upper.match(/\b(XAUUSD|XAGUSD|GOLD|SILVER)\b/);
    if (metalMatch) {
      return metalMatch[1] === 'GOLD' ? 'XAUUSD' : metalMatch[1] === 'SILVER' ? 'XAGUSD' : metalMatch[1];
    }

    // Check for aliases
    for (const [alias, symbol] of Object.entries(SYMBOL_ALIASES)) {
      if (new RegExp(`\\b${alias}\\b`, 'i').test(text)) {
        return symbol;
      }
    }

    return null;
  }

  private async parseWithAi(
    messageText: string,
    context?: AiParseRequest['context']
  ): Promise<ParsedSignal> {
    let enhancedPrompt = messageText;
    if (context?.dnaRules && context.dnaRules.length > 0) {
      enhancedPrompt += '\n\nProvider-specific abbreviations:\n';
      enhancedPrompt += context.dnaRules.map(r => `"${r.pattern}" means "${r.action}"`).join('\n');
    }

    const response = await aiClient.generateCompletion(
      PARSING_SYSTEM_PROMPT,
      enhancedPrompt,
      { maxTokens: 1024, temperature: 0.1 }
    );

    try {
      const parsed = JSON.parse(this.extractJson(response.content));

      return {
        action: parsed.action,
        symbol: this.normalizeSymbol(parsed.symbol),
        entryType: parsed.entryType || 'MARKET',
        entryPrice: parsed.entryPrice,
        stopLoss: parsed.stopLoss,
        takeProfits: parsed.takeProfits || [],
        timeframe: parsed.timeframe,
        confidence: parsed.confidence || 0.5,
        classification: 'NEW_TRADE',
        language: parsed.language || 'en',
        rawText: messageText,
        metadata: { path: 'LEARNING_PATH', model: response.model, latencyMs: response.latencyMs },
      };
    } catch (error) {
      logger.error('Failed to parse AI response:', error);
      return {
        action: null,
        symbol: null,
        entryType: null,
        entryPrice: null,
        stopLoss: null,
        takeProfits: [],
        timeframe: null,
        confidence: 0,
        classification: 'UNKNOWN',
        language: 'en',
        rawText: messageText,
      };
    }
  }

  async parseTradeManagement(messageText: string) {
    const response = await aiClient.generateCompletion(
      TRADE_MANAGEMENT_SYSTEM_PROMPT,
      messageText,
      { maxTokens: 512, temperature: 0.1 }
    );

    try {
      return JSON.parse(this.extractJson(response.content));
    } catch (error) {
      logger.error('Failed to parse trade management:', error);
      return { action: 'UNKNOWN', confidence: 0 };
    }
  }

  private normalizeSymbol(symbol: string | null): string | null {
    if (!symbol) return null;
    const upper = symbol.toUpperCase().replace('/', '');
    return SYMBOL_ALIASES[upper.toLowerCase()] || upper;
  }

  private extractJson(content: string): string {
    const match = content.match(/\{[\s\S]*\}/);
    return match ? match[0] : content;
  }
}

export const parserService = new ParserService();