import { z } from 'zod';

export const closePositionSchema = z.object({
  volume: z.number().positive().optional(),
});

export const modifyPositionSchema = z.object({
  stopLoss: z.number().optional(),
  takeProfit: z.number().optional(),
});

export const openPositionSchema = z.object({
  brokerAccountId: z.string().uuid(),
  symbol: z.string().min(1),
  direction: z.enum(['BUY', 'SELL']),
  volume: z.number().positive(),
  stopLoss: z.number().optional(),
  takeProfit: z.number().optional(),
});