import { z } from 'zod';

export const createSourceSchema = z.object({
  name: z.string().min(2, 'Source name is required'),
  sourceType: z.enum(['TELEGRAM', 'DISCORD', 'WHATSAPP', 'TRADINGVIEW', 'REST_API', 'EMAIL']),
  config: z.record(z.string(), z.unknown()).optional(),
});

export const updateSourceSchema = z.object({
  name: z.string().min(2).optional(),
  isActive: z.boolean().optional(),
  config: z.record(z.string(), z.unknown()).optional(),
});