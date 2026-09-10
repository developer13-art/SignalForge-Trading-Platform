import { create } from 'zustand';
import { marketplaceService, Provider, Trader } from '../services/marketplace.service';

interface MarketplaceState {
  providers: Provider[];
  traders: Trader[];
  myProviders: Provider[];
  myFollowedTraders: Trader[];
  isLoading: boolean;
  error: string | null;
  fetchProviders: () => Promise<void>;
  fetchTraders: () => Promise<void>;
  fetchMyProviders: () => Promise<void>;
  fetchMyFollowedTraders: () => Promise<void>;
  subscribe: (providerId: string, planId: string) => Promise<void>;
  followTrader: (traderId: string) => Promise<void>;
}

export const useMarketplaceStore = create<MarketplaceState>((set, get) => ({
  providers: [],
  traders: [],
  myProviders: [],
  myFollowedTraders: [],
  isLoading: false,
  error: null,

  fetchProviders: async () => {
    set({ isLoading: true, error: null });
    try {
      const providers = await marketplaceService.getProviders();
      set({ providers, isLoading: false });
    } catch (error: any) {
      set({ error: error?.message || 'Failed to load providers', isLoading: false });
    }
  },

  fetchTraders: async () => {
    set({ isLoading: true, error: null });
    try {
      const traders = await marketplaceService.getTraders();
      set({ traders, isLoading: false });
    } catch (error: any) {
      set({ error: error?.message || 'Failed to load traders', isLoading: false });
    }
  },

  fetchMyProviders: async () => {
    try {
      const myProviders = await marketplaceService.getMyProviders();
      set({ myProviders });
    } catch (error: any) {
      set({ error: error?.message || 'Failed to load subscriptions' });
    }
  },

  fetchMyFollowedTraders: async () => {
    try {
      const myFollowedTraders = await marketplaceService.getMyFollowedTraders();
      set({ myFollowedTraders });
    } catch (error: any) {
      set({ error: error?.message || 'Failed to load followed traders' });
    }
  },

  subscribe: async (providerId, planId) => {
    await marketplaceService.subscribe(providerId, planId);
    await get().fetchMyProviders();
  },

  followTrader: async (traderId) => {
    await marketplaceService.followTrader(traderId);
    await get().fetchMyFollowedTraders();
  },
}));