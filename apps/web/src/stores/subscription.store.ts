import { create } from 'zustand';
import { subscriptionService, SubscriptionPlan, SubscriptionInfo } from '../services/subscription.service';

interface SubscriptionState {
  plans: SubscriptionPlan[];
  currentSubscription: SubscriptionInfo | null;
  isLoading: boolean;
  error: string | null;
  fetchPlans: () => Promise<void>;
  fetchCurrentSubscription: () => Promise<void>;
  subscribe: (planId: string) => Promise<string | null>;
  cancelSubscription: (reason?: string) => Promise<void>;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  plans: [],
  currentSubscription: null,
  isLoading: false,
  error: null,

  fetchPlans: async () => {
    set({ isLoading: true, error: null });
    try {
      const plans = await subscriptionService.getPlans();
      set({ plans, isLoading: false });
    } catch (error: any) {
      set({ error: error?.message || 'Failed to fetch plans', isLoading: false });
    }
  },

  fetchCurrentSubscription: async () => {
    set({ isLoading: true, error: null });
    try {
      const currentSubscription = await subscriptionService.getCurrentSubscription();
      set({ currentSubscription, isLoading: false });
    } catch (error: any) {
      set({ error: error?.message || 'Failed to fetch subscription', isLoading: false });
    }
  },

  subscribe: async (planId: string) => {
    set({ isLoading: true, error: null });
    try {
      const result = await subscriptionService.subscribe(planId);
      set({ isLoading: false });
      return result.authorizationUrl;
    } catch (error: any) {
      set({ error: error?.message || 'Failed to initialize payment', isLoading: false });
      return null;
    }
  },

  cancelSubscription: async (reason?: string) => {
    set({ isLoading: true, error: null });
    try {
      await subscriptionService.cancelSubscription(reason);
      await subscriptionService.getCurrentSubscription();
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error?.message || 'Failed to cancel subscription', isLoading: false });
    }
  },
}));