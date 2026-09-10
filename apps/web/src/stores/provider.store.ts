import { create } from 'zustand';
import { providerService, Provider } from '../services/provider.service';

interface ProviderState {
  providers: Provider[];
  currentProvider: Provider | null;
  myProvider: Provider | null;
  isLoading: boolean;
  error: string | null;
  fetchProviders: () => Promise<void>;
  fetchProvider: (id: string) => Promise<void>;
  fetchMyProvider: () => Promise<void>;
  updateProfile: (data: Partial<Provider>) => Promise<void>;
}

export const useProviderStore = create<ProviderState>((set, get) => ({
  providers: [],
  currentProvider: null,
  myProvider: null,
  isLoading: false,
  error: null,

  fetchProviders: async () => {
    set({ isLoading: true, error: null });
    try {
      const providers = await providerService.getProviders();
      set({ providers, isLoading: false });
    } catch (error: any) {
      set({ error: error?.message || 'Failed to load providers', isLoading: false });
    }
  },

  fetchProvider: async (id) => {
    set({ isLoading: true });
    try {
      const provider = await providerService.getProvider(id);
      set({ currentProvider: provider, isLoading: false });
    } catch (error: any) {
      set({ error: error?.message || 'Failed to load provider', isLoading: false });
    }
  },

  fetchMyProvider: async () => {
    set({ isLoading: true });
    try {
      const provider = await providerService.getMyProvider();
      set({ myProvider: provider, isLoading: false });
    } catch (error: any) {
      set({ error: error?.message || 'Failed to load provider', isLoading: false });
    }
  },

  updateProfile: async (data) => {
    const updated = await providerService.updateProfile(data);
    set({ myProvider: updated });
  },
}));