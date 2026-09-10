import { z } from 'zod';

export const riskProfileSchema = z.object({
  riskPercent: z.number().min(0.1).max(100).optional(),
  maxDailyLoss: z.number().min(0.1).max(100).optional(),
  maxDrawdown: z.number().min(0.1).max(100).optional(),
  maxOpenTrades: z.number().int().min(1).max(100).optional(),
  tradingSessions: z.array(z.object({
    day: z.enum(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']),
    enabled: z.boolean(),
    startTime: z.string(),
    endTime: z.string(),
  })).optional(),
  trailingStop: z.boolean().optional(),
  breakEven: z.boolean().optional(),
  profitLock: z.boolean().optional(),
  partialClose: z.boolean().optional(),
  correlationProtection: z.boolean().optional(),
  newsFilter: z.boolean().optional(),
  emergencyStop: z.boolean().optional(),
});

export const automationRuleSchema = z.object({
  name: z.string().min(2, 'Rule name is required'),
  condition: z.object({
    type: z.enum(['PROFIT', 'LOSS', 'CONFIDENCE', 'PROVIDER', 'SYMBOL', 'TIME', 'PRICE']),
    operator: z.enum(['GT', 'LT', 'EQ', 'GTE', 'LTE', 'IN', 'NOT_IN']),
    value: z.union([z.number(), z.string(), z.array(z.string())]),
  }),
  action: z.object({
    type: z.enum(['MOVE_SL_TO_BREAK_EVEN', 'TRAILING_STOP', 'PARTIAL_CLOSE', 'CLOSE_TRADE', 'SKIP_EXECUTION', 'INCREASE_LOT', 'DECREASE_LOT']),
    value: z.number().optional(),
  }),
  priority: z.number().int().min(0).optional(),
  enabled: z.boolean().optional(),
});