export interface StandardizedSignal {
  id: string;
  symbol: string;
  direction: 'BUY' | 'SELL';
  entryType: 'MARKET' | 'LIMIT' | 'STOP';
  entryPrice?: number;
  stopLoss?: number;
  takeProfits: number[];
  confidence: number;
  rawText: string;
}

export interface RiskCheckResult {
  passed: boolean;
  checks: Array<{
    name: string;
    passed: boolean;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    message: string;
  }>;
}