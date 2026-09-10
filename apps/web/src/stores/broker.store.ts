import { create } from 'zustand';
import { brokerService, BrokerAccount } from '../services/broker.service';

interface BrokerState {
  accounts: BrokerAccount[];
  currentAccount: BrokerAccount | null;
  isLoading: boolean;
  error: string | null;
  fetchAccounts: () => Promise<void>;
  fetchAccount: (id: string) => Promise<void>;
  connect: (data: any) => Promise<void>;
  disconnect: (id: string) => Promise<void>;
  sync: (id: string) => Promise<void>;
}

export const useBrokerStore = create<BrokerState>((set, get) => ({
  accounts: [],
  currentAccount: null,
  isLoading: false,
  error: null,

  fetchAccounts: async () => {
    set({ isLoading: true, error: null });
    try {
      const accounts = await brokerService.getAccounts();
      set({ accounts, isLoading: false });
    } catch (error: any) {
      set({ error: error?.message || 'Failed to load accounts', isLoading: false });
    }
  },

  fetchAccount: async (id) => {
    set({ isLoading: true });
    try {
      const account = await brokerService.getAccount(id);
      set({ currentAccount: account, isLoading: false });
    } catch (error: any) {
      set({ error: error?.message || 'Failed to load account', isLoading: false });
    }
  },

  connect: async (data) => {
    await brokerService.connect(data);
    await get().fetchAccounts();
  },

  disconnect: async (id) => {
    await brokerService.disconnect(id);
    await get().fetchAccounts();
  },

  sync: async (id) => {
    await brokerService.sync(id);
    await get().fetchAccount(id);
  },
}));