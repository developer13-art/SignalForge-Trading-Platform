import { z } from 'zod';

export const createPlanSchema = z.object({
  name: z.string().min(2, 'Plan name is required'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be positive'),
  period: z.enum(['MONTHLY', 'YEARLY', 'LIFETIME', 'ENTERPRISE']),
  features: z.record(z.string(), z.unknown()).optional(),
  isActive: z.boolean().optional(),
});

export const updatePlanSchema = createPlanSchema.partial();

export const subscribeSchema = z.object({
  planId: z.string().uuid('Invalid plan ID'),
  paymentProvider: z.enum(['PAYSTACK', 'STRIPE']).optional(),
});

export const cancelSubscriptionSchema = z.object({
  reason: z.string().optional(),
});

export const verifyPaymentSchema = z.object({
  reference: z.string().min(1, 'Reference is required'),
});

export const paymentFilterSchema = z.object({
  status: z.string().optional(),
  provider: z.enum(['PAYSTACK', 'STRIPE']).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export type CreatePlanInput = z.infer<typeof createPlanSchema>;
export type UpdatePlanInput = z.infer<typeof updatePlanSchema>;
export type SubscribeInput = z.infer<typeof subscribeSchema>;
export type CancelSubscriptionInput = z.infer<typeof cancelSubscriptionSchema>;
export type VerifyPaymentInput = z.infer<typeof verifyPaymentSchema>;
export type PaymentFilterInput = z.infer<typeof paymentFilterSchema>;