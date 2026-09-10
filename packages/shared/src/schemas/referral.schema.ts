import { z } from 'zod';

export const applyReferralSchema = z.object({
  referralCode: z.string().min(4, 'Referral code must be at least 4 characters'),
});

export const settleRewardsSchema = z.object({
  periodStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  periodEnd: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
});

export const approveRewardSchema = z.object({
  rewardId: z.string().uuid(),
  approve: z.boolean(),
  reason: z.string().optional(),
});

export const withdrawalRequestSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  method: z.enum(['BANK', 'PAYSTACK']),
  paymentDetails: z.record(z.string(), z.unknown()).optional(),
});

export const referralFilterSchema = z.object({
  status: z.string().optional(),
  periodStart: z.string().optional(),
  periodEnd: z.string().optional(),
});

export type ApplyReferralInput = z.infer<typeof applyReferralSchema>;
export type SettleRewardsInput = z.infer<typeof settleRewardsSchema>;
export type ApproveRewardInput = z.infer<typeof approveRewardSchema>;
export type WithdrawalRequestInput = z.infer<typeof withdrawalRequestSchema>;
export type ReferralFilterInput = z.infer<typeof referralFilterSchema>;