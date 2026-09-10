import { z } from 'zod';

export const connectBrokerSchema = z.object({
  brokerId: z.string().uuid(),
  platform: z.enum(['MT4', 'MT5']),
  server: z.string().min(1, 'Server is required'),
  loginNumber: z.string().min(1, 'Login number is required'),
  password: z.string().min(1, 'Password is required'),
  accountType: z.enum(['DEMO', 'LIVE']),
  nickname: z.string().min(2, 'Nickname is required'),
});

export const syncAccountSchema = z.object({
  accountId: z.string().uuid(),
});

export const disconnectBrokerSchema = z.object({
  accountId: z.string().uuid(),
  reason: z.string().optional(),
});

export const brokerFilterSchema = z.object({
  isActive: z.boolean().optional(),
  platform: z.enum(['MT4', 'MT5']).optional(),
  accountType: z.enum(['DEMO', 'LIVE']).optional(),
});

export type ConnectBrokerInput = z.infer<typeof connectBrokerSchema>;
export type SyncAccountInput = z.infer<typeof syncAccountSchema>;
export type DisconnectBrokerInput = z.infer<typeof disconnectBrokerSchema>;
export type BrokerFilterInput = z.infer<typeof brokerFilterSchema>;