export interface PerformanceMetrics {
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  totalProfit: number;
  totalLoss: number;
  netPnL: number;
  averageWin: number;
  averageLoss: number;
  profitFactor: number;
  maxDrawdown: number;
  maxDrawdownPercent: number;
  sharpeRatio: number;
  sortinoRatio: number;
  averageRR: number;
}

export interface EquityCurvePoint {
  timestamp: string;
  balance: number;
  equity: number;
}

export interface SymbolPerformance {
  symbol: string;
  trades: number;
  winRate: number;
  netPnL: number;
  profit: number;
  loss: number;
}

export interface ProviderPerformance {
  providerId: string;
  providerName: string;
  totalSignals: number;
  executedSignals: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  netPnL: number;
}