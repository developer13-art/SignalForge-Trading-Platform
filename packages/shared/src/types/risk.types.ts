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
  createdAt: string;
  updatedAt: string;
}

export interface TradingSession {
  day: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
  enabled: boolean;
  startTime: string;
  endTime: string;
}

export interface AutomationRule {
  id: string;
  userId: string;
  name: string;
  condition: RuleCondition;
  action: RuleAction;
  priority: number;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RuleCondition {
  type: 'PROFIT' | 'LOSS' | 'CONFIDENCE' | 'PROVIDER' | 'SYMBOL' | 'TIME' | 'PRICE';
  operator: 'GT' | 'LT' | 'EQ' | 'GTE' | 'LTE' | 'IN' | 'NOT_IN';
  value: number | string | string[];
}

export interface RuleAction {
  type: 'MOVE_SL_TO_BREAK_EVEN' | 'TRAILING_STOP' | 'PARTIAL_CLOSE' | 'CLOSE_TRADE' | 'SKIP_EXECUTION' | 'INCREASE_LOT' | 'DECREASE_LOT';
  value?: number;
}

export interface RiskProfileData {
  riskPercent: number;
  maxDailyLoss: number;
  maxDrawdown: number;
  maxOpenTrades: number;
  tradingSessions: TradingSession[];
  trailingStop: boolean;
  breakEven: boolean;
  profitLock: boolean;
  partialClose: boolean;
  correlationProtection: boolean;
  newsFilter: boolean;
  emergencyStop: boolean;
}