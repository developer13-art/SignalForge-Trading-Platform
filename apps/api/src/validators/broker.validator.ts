import { z } from 'zod';

export const connectBrokerSchema = z.object({
  brokerId: z.string().uuid(),
  platform: z.enum(['MT4', 'MT5']),
  server: z.string().min(1),
  loginNumber: z.string().min(1),
  password: z.string().min(1),
  accountType: z.enum(['DEMO', 'LIVE']),
  nickname: z.string().min(2),
});