import { env } from '../../config/env';

export class ReferralCalculationService {
  calculateReward(eligibleNetProfit: number): number {
    const profit = Math.max(0, eligibleNetProfit);
    return profit * env.REFERRAL_REWARD_RATE;
  }
}

export const referralCalculationService = new ReferralCalculationService();