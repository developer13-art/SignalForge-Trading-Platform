export interface Trade {
  id: string;
  symbol: string;
  direction: 'BUY' | 'SELL';
  volume: number;
  entryPrice?: number;
  exitPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  realizedProfit: number;
  status: string;
  openedAt?: string;
  closedAt?: string;
  createdAt: string;
}

export interface TradeEvent {
  id: string;
  tradeId: string;
  eventType: string;
  actor: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}