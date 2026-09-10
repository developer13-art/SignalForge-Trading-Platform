export interface ReferralRewardData {
  referrerId: string;
  referredUserId: string;
  performancePeriodId: string;
  eligibleNetProfit: number;
  rewardRate: number;
  rewardAmount: number;
}

export interface PerformancePeriodData {
  userId: string;
  periodStart: Date;
  periodEnd: Date;
  openingBalance: number;
  closingBalance: number;
  grossProfit: number;
  grossLoss: number;
  tradingCosts: number;
  eligibleNetProfit: number;
}