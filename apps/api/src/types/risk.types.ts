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

export interface TradingSession {
  day: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
  enabled: boolean;
  startTime: string;
  endTime: string;
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

export interface AutomationRuleData {
  name: string;
  condition: RuleCondition;
  action: RuleAction;
  priority: number;
  enabled: boolean;
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