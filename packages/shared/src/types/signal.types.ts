export interface Signal {
  id: string;
  sourceMessageId: string;
  providerId?: string;
  symbol?: string;
  direction?: 'BUY' | 'SELL';
  entryType?: 'MARKET' | 'LIMIT' | 'STOP';
  entryPrice?: number;
  stopLoss?: number;
  takeProfit1?: number;
  takeProfit2?: number;
  takeProfit3?: number;
  timeframe?: string;
  classification?: string;
  status: string;
  confidence?: number;
  rawText: string;
  idempotencyKey: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SignalParse {
  id: string;
  signalId: string;
  parserType: 'FAST_PATH' | 'LEARNING_PATH';
  parserVersion: string;
  confidence?: number;
  aiModel?: string;
  latencyMs?: number;
  result?: Record<string, unknown>;
  createdAt: string;
}

export interface SignalValidation {
  id: string;
  signalId: string;
  checkName: string;
  passed: boolean;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message?: string;
  executedAt: string;
}

export interface SignalConsensus {
  id: string;
  symbol: string;
  direction: string;
  confidence: number;
  agreement: number;
  totalVotes: number;
  createdAt: string;
}

export interface SignalConsensusMember {
  id: string;
  consensusId: string;
  signalId: string;
  providerId: string;
  direction: string;
  confidence: number;
}

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