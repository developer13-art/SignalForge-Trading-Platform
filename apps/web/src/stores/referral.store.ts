import { create } from 'zustand';
import { referralService, ReferralDashboard } from '../services/referral.service';

interface ReferralState {
  dashboard: ReferralDashboard | null;
  rewards: any[];
  leaderboard: any[];
  isLoading: boolean;
  error: string | null;
  fetchDashboard: () => Promise<void>;
  fetchRewards: () => Promise<void>;
  fetchLeaderboard: () => Promise<void>;
}

export const useReferralStore = create<ReferralState>((set) => ({
  dashboard: null,
  rewards: [],
  leaderboard: [],
  isLoading: false,
  error: null,

  fetchDashboard: async () => {
    set({ isLoading: true, error: null });
    try {
      const dashboard = await referralService.getDashboard();
      set({ dashboard, isLoading: false });
    } catch (error: any) {
      set({ error: error?.message || 'Failed to load dashboard', isLoading: false });
    }
  },

  fetchRewards: async () => {
    try {
      const rewards = await referralService.getRewards();
      set({ rewards });
    } catch (error: any) {
      set({ error: error?.message || 'Failed to load rewards' });
    }
  },

  fetchLeaderboard: async () => {
    try {
      const leaderboard = await referralService.getLeaderboard(20);
      set({ leaderboard });
    } catch (error: any) {
      set({ error: error?.message || 'Failed to load leaderboard' });
    }
  },
}));