export interface ReferralCode {
  id: string;
  userId: string;
  code: string;
  isActive: boolean;
  createdAt: string;
}

export interface ReferralRelationship {
  id: string;
  referrerId: string;
  referredUserId: string;
  createdAt: string;
}

export interface ReferralReward {
  id: string;
  referrerId: string;
  referredUserId: string;
  performancePeriodId: string;
  eligibleNetProfit: number;
  rewardRate: number;
  rewardAmount: number;
  status: string;
  approvedAt?: string;
  settledAt?: string;
  createdAt: string;
}

export interface ReferralWallet {
  id: string;
  userId: string;
  pendingBalance: number;
  availableBalance: number;
  lifetimeEarned: number;
  lifetimeWithdrawn: number;
  updatedAt: string;
}

export interface ReferralLedger {
  id: string;
  walletId: string;
  entryType: 'CREDIT' | 'DEBIT';
  amount: number;
  reference: string;
  description?: string;
  createdAt: string;
}

export interface ReferralSettlement {
  id: string;
  periodStart: string;
  periodEnd: string;
  totalRewards: number;
  totalReferrers: number;
  status: string;
  settledAt?: string;
  createdAt: string;
}

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
  recentRewards: ReferralReward[];
  referredUsers: Array<{
    id: string;
    name: string;
    email: string;
    joinedAt: string;
    kycStatus: string;
  }>;
}

export interface PerformancePeriod {
  id: string;
  userId: string;
  periodStart: string;
  periodEnd: string;
  openingBalance: number;
  closingBalance?: number;
  grossProfit: number;
  grossLoss: number;
  tradingCosts: number;
  eligibleNetProfit: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}