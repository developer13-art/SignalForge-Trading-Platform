import { z } from 'zod';

export const applyReferralSchema = z.object({
  referralCode: z.string().min(4),
});

export const settleRewardsSchema = z.object({
  periodStart: z.string(),
  periodEnd: z.string(),
});