import { apiClient } from '../api/client';
import { ENDPOINTS } from '../api/endpoints';

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

export const referralService = {
  async getDashboard(): Promise<ReferralDashboard> {
    const response = await apiClient.get<{ success: boolean; data: ReferralDashboard }>(
      ENDPOINTS.REFERRALS.DASHBOARD
    );
    return response.data;
  },

  async getWallet() {
    const response = await apiClient.get<{ success: boolean; data: any }>(
      ENDPOINTS.REFERRALS.WALLET
    );
    return response.data;
  },

  async getRewards() {
    const response = await apiClient.get<{ success: boolean; data: any[] }>(
      ENDPOINTS.REFERRALS.REWARDS
    );
    return response.data;
  },

  async getLeaderboard(limit: number = 10) {
    const response = await apiClient.get<{ success: boolean; data: any[] }>(
      ENDPOINTS.REFERRALS.LEADERBOARD,
      { params: { limit } }
    );
    return response.data;
  },
};