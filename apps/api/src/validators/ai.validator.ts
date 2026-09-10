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