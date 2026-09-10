import { z } from 'zod';

export const openPositionSchema = z.object({
  brokerAccountId: z.string().uuid(),
  symbol: z.string().min(1),
  direction: z.enum(['BUY', 'SELL']),
  volume: z.number().positive(),
  stopLoss: z.number().optional(),
  takeProfit: z.number().optional(),
});

export const closePositionSchema = z.object({
  volume: z.number().positive().optional(),
});

export const modifyPositionSchema = z.object({
  stopLoss: z.number().optional(),
  takeProfit: z.number().optional(),
});

export const tradeFilterSchema = z.object({
  status: z.string().optional(),
  symbol: z.string().optional(),
  brokerAccountId: z.string().uuid().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
});

export const createAutomationRuleSchema = z.object({
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

export const updateAutomationRuleSchema = createAutomationRuleSchema.partial();

export type OpenPositionInput = z.infer<typeof openPositionSchema>;
export type ClosePositionInput = z.infer<typeof closePositionSchema>;
export type ModifyPositionInput = z.infer<typeof modifyPositionSchema>;
export type TradeFilterInput = z.infer<typeof tradeFilterSchema>;
export type CreateAutomationRuleInput = z.infer<typeof createAutomationRuleSchema>;
export type UpdateAutomationRuleInput = z.infer<typeof updateAutomationRuleSchema>;