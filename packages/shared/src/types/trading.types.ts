export interface Trade {
  id: string;
  userId: string;
  brokerAccountId: string;
  signalId?: string;
  providerId?: string;
  symbol: string;
  direction: 'BUY' | 'SELL';
  volume: number;
  entryPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  exitPrice?: number;
  commission: number;
  swap: number;
  realizedProfit: number;
  status: string;
  magicNumber?: number;
  ticketNumber?: string;
  openedAt?: string;
  closedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TradeEvent {
  id: string;
  tradeId: string;
  eventType: string;
  actor: 'SYSTEM' | 'USER' | 'PROVIDER' | 'AUTO_RULE' | 'BROKER';
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface TradeShadow {
  id: string;
  tradeId: string;
  providerTradeId?: string;
  missedProfit?: number;
  betterExit: boolean;
  behaviorFeedback?: string;
  createdAt: string;
}

export interface TradeExecutionRequest {
  signalId: string;
  userId: string;
  brokerAccountId: string;
  symbol: string;
  direction: 'BUY' | 'SELL';
  volume: number;
  entryPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  comment?: string;
  magicNumber?: number;
}

export interface TradeExecutionResult {
  success: boolean;
  tradeId?: string;
  ticketNumber?: string;
  executedPrice?: number;
  error?: string;
  brokerResponse?: Record<string, unknown>;
}

export interface RiskCheck {
  name: string;
  passed: boolean;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
  value?: number;
  limit?: number;
}

export interface RiskDecision {
  approved: boolean;
  checks: RiskCheck[];
  overallScore: number;
  reasons: string[];
}