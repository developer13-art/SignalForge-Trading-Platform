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
  brokerResponse?: any;
}

export interface MetaApiPosition {
  id: string;
  symbol: string;
  type: 'POSITION_TYPE_BUY' | 'POSITION_TYPE_SELL';
  volume: number;
  openPrice: number;
  currentPrice: number;
  stopLoss?: number;
  takeProfit?: number;
  profit: number;
  swap: number;
  commission: number;
  time: string;
  comment?: string;
  magic?: number;
}