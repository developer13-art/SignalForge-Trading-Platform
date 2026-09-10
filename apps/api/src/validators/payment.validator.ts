import { z } from 'zod';

export const createPlanSchema = z.object({
  name: z.string().min(2, 'Plan name is required'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be positive'),
  period: z.enum(['MONTHLY', 'YEARLY', 'LIFETIME', 'ENTERPRISE']),
  features: z.record(z.string(), z.unknown()).optional(),
  isActive: z.boolean().optional(),
});

export const subscribeSchema = z.object({
  planId: z.string().uuid('Invalid plan ID'),
  paymentProvider: z.enum(['PAYSTACK', 'STRIPE']).optional(),
});

export const cancelSubscriptionSchema = z.object({
  reason: z.string().optional(),
});