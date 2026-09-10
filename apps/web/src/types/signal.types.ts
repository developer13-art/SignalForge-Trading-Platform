export interface Signal {
  id: string;
  providerId?: string;
  symbol: string | null;
  direction: string | null;
  entryType: string | null;
  entryPrice: number | null;
  stopLoss: number | null;
  takeProfit1: number | null;
  takeProfit2: number | null;
  takeProfit3: number | null;
  timeframe: string | null;
  classification: string | null;
  confidence: number | null;
  status: string;
  rawText: string;
  createdAt: string;
  expiresAt?: string;
}