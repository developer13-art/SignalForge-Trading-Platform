import { z } from 'zod';

export const createSignalSchema = z.object({
  symbol: z.string().min(1),
  direction: z.enum(['BUY', 'SELL']),
  entryType: z.enum(['MARKET', 'LIMIT', 'STOP']).optional(),
  entryPrice: z.number().optional(),
  stopLoss: z.number().optional(),
  takeProfit: z.number().optional(),
});

export const signalFilterSchema = z.object({
  status: z.string().optional(),
  symbol: z.string().optional(),
  providerId: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
});