export interface ParsedSignal {
  action: 'BUY' | 'SELL' | null;
  symbol: string | null;
  entryType: 'MARKET' | 'LIMIT' | 'STOP' | null;
  entryPrice: number | null;
  stopLoss: number | null;
  takeProfits: number[];
  timeframe: string | null;
  confidence: number;
  classification: string;
  language: string;
  rawText: string;
  metadata?: Record<string, unknown>;
}

export interface SignalClassificationResult {
  classification: 'NEW_TRADE' | 'TRADE_MANAGEMENT' | 'MARKET_ANALYSIS' | 'NEWS' | 'EDUCATION' | 'ADVERTISEMENT' | 'CONVERSATION' | 'UNKNOWN';
  confidence: number;
  reasoning?: string;
}

export interface ProviderDnaProfile {
  providerId: string;
  language: string;
  symbols: string[];
  abbreviations: Record<string, string>;
  patterns: Array<{
    pattern: string;
    meaning: string;
    action: string;
  }>;
  riskStyle: Record<string, unknown>;
  confidence: number;
  version: number;
}

export interface AiParseRequest {
  messageText: string;
  providerId?: string;
  context?: {
    previousMessages?: string[];
    knownSymbols?: string[];
    dnaRules?: Array<{ pattern: string; action: string }>;
  };
}

export interface AiProviderResponse {
  content: string;
  usage?: {
    inputTokens: number;
    outputTokens: number;
  };
  model: string;
  latencyMs: number;
}