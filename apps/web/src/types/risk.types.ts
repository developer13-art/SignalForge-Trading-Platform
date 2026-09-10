export interface RiskProfile {
  id: string;
  userId: string;
  riskPercent: number;
  maxDailyLoss: number;
  maxDrawdown: number;
  maxOpenTrades: number;
  tradingSessions?: TradingSession[];
  trailingStop: boolean;
  breakEven: boolean;
  profitLock: boolean;
  partialClose: boolean;
  correlationProtection: boolean;
  newsFilter: boolean;
  emergencyStop: boolean;
}

export interface TradingSession {
  day: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
}

export interface AutomationRule {
  id: string;
  userId: string;
  name: string;
  condition: Record<string, unknown>;
  action: Record<string, unknown>;
  priority: number;
  enabled: boolean;
}