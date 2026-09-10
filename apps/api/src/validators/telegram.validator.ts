import { z } from 'zod';

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