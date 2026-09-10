import { create } from 'zustand';
import { kycService, KycStatus } from '../services/kyc.service';

interface KycState {
  status: KycStatus | null;
  isLoading: boolean;
  error: string | null;
  fetchStatus: () => Promise<void>;
  startApplication: () => Promise<void>;
  submitPersonalInfo: (data: any) => Promise<void>;
  submitForReview: (applicationId: string) => Promise<void>;
  reset: () => void;
}

export const useKycStore = create<KycState>((set) => ({
  status: null,
  isLoading: false,
  error: null,

  fetchStatus: async () => {
    set({ isLoading: true, error: null });
    try {
      const status = await kycService.getStatus();
      set({ status, isLoading: false });
    } catch (error: any) {
      set({ error: error?.message || 'Failed to fetch KYC status', isLoading: false });
    }
  },

  startApplication: async () => {
    set({ isLoading: true, error: null });
    try {
      await kycService.startApplication();
      await kycService.getStatus();
      const status = await kycService.getStatus();
      set({ status, isLoading: false });
    } catch (error: any) {
      set({ error: error?.message || 'Failed to start KYC application', isLoading: false });
    }
  },

  submitPersonalInfo: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await kycService.submitPersonalInfo(data);
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error?.message || 'Failed to submit personal information', isLoading: false });
    }
  },

  submitForReview: async (applicationId) => {
    set({ isLoading: true, error: null });
    try {
      const result = await kycService.submitForReview(applicationId);
      set({ isLoading: false });
      if (result.status) {
        const status = await kycService.getStatus();
        set({ status });
      }
    } catch (error: any) {
      set({ error: error?.message || 'Failed to submit for review', isLoading: false });
    }
  },

  reset: () => set({ status: null, error: null }),
}));