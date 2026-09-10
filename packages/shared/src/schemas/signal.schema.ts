import { z } from 'zod';

export const parseSignalSchema = z.object({
  messageText: z.string().min(1, 'Message text is required'),
  providerId: z.string().uuid().optional(),
});

export const classifyMessageSchema = z.object({
  messageText: z.string().min(1, 'Message text is required'),
});

export const testProviderDnaSchema = z.object({
  providerId: z.string().uuid('Invalid provider ID'),
  testMessage: z.string().min(1, 'Test message is required'),
});

export const createSignalSourceSchema = z.object({
  name: z.string().min(2, 'Source name is required'),
  sourceType: z.enum(['TELEGRAM', 'DISCORD', 'WHATSAPP', 'TRADINGVIEW', 'REST_API', 'EMAIL']),
  config: z.record(z.string(), z.unknown()).optional(),
});

export const updateSignalSourceSchema = z.object({
  name: z.string().min(2).optional(),
  isActive: z.boolean().optional(),
  config: z.record(z.string(), z.unknown()).optional(),
});

export const telegramConnectSchema = z.object({
  phoneNumber: z.string().min(10, 'Valid phone number is required'),
  countryCode: z.string().min(2, 'Country code is required'),
});

export const telegramVerifySchema = z.object({
  phoneNumber: z.string().min(10, 'Valid phone number is required'),
  phoneCodeHash: z.string().min(1, 'Phone code hash is required'),
  code: z.string().min(4, 'Valid OTP code is required'),
  password: z.string().optional(),
});

export const selectChannelSchema = z.object({
  channelId: z.string().uuid('Invalid channel ID'),
  isMonitored: z.boolean(),
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

export type ParseSignalInput = z.infer<typeof parseSignalSchema>;
export type ClassifyMessageInput = z.infer<typeof classifyMessageSchema>;
export type TestProviderDnaInput = z.infer<typeof testProviderDnaSchema>;
export type CreateSignalSourceInput = z.infer<typeof createSignalSourceSchema>;
export type UpdateSignalSourceInput = z.infer<typeof updateSignalSourceSchema>;
export type TelegramConnectInput = z.infer<typeof telegramConnectSchema>;
export type TelegramVerifyInput = z.infer<typeof telegramVerifySchema>;
export type SelectChannelInput = z.infer<typeof selectChannelSchema>;
export type SignalFilterInput = z.infer<typeof signalFilterSchema>;