export interface ReferralDashboard {
  referralCode: string;
  referralLink: string;
  totalReferrals: number;
  activeReferrals: number;
  wallet: {
    pendingBalance: number;
    availableBalance: number;
    lifetimeEarned: number;
  };
  recentRewards: any[];
  referredUsers: any[];
}

export interface ReferralReward {
  id: string;
  referrerId: string;
  referredUserId: string;
  eligibleNetProfit: number;
  rewardRate: number;
  rewardAmount: number;
  status: string;
  approvedAt?: string;
  settledAt?: string;
  createdAt: string;
}