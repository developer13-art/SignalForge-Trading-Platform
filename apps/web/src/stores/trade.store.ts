import { create } from 'zustand';
import { tradeService, Trade } from '../services/trade.service';

interface TradeState {
  trades: Trade[];
  openPositions: Trade[];
  currentTrade: Trade | null;
  isLoading: boolean;
  error: string | null;
  fetchTrades: () => Promise<void>;
  fetchOpenPositions: () => Promise<void>;
  fetchById: (id: string) => Promise<void>;
  closeTrade: (id: string, volume?: number) => Promise<void>;
  updateTrade: (trade: Trade) => void;
}

export const useTradeStore = create<TradeState>((set, get) => ({
  trades: [],
  openPositions: [],
  currentTrade: null,
  isLoading: false,
  error: null,

  fetchTrades: async () => {
    set({ isLoading: true, error: null });
    try {
      const trades = await tradeService.getHistory();
      set({ trades, isLoading: false });
    } catch (error: any) {
      set({ error: error?.message || 'Failed to load trades', isLoading: false });
    }
  },

  fetchOpenPositions: async () => {
    set({ isLoading: true, error: null });
    try {
      const positions = await tradeService.getOpenPositions();
      set({ openPositions: positions, isLoading: false });
    } catch (error: any) {
      set({ error: error?.message || 'Failed to load positions', isLoading: false });
    }
  },

  fetchById: async (id) => {
    set({ isLoading: true });
    try {
      const trade = await tradeService.getById(id);
      set({ currentTrade: trade, isLoading: false });
    } catch (error: any) {
      set({ error: error?.message || 'Failed to load trade', isLoading: false });
    }
  },

  closeTrade: async (id, volume) => {
    await tradeService.close(id, volume);
    await get().fetchTrades();
    await get().fetchOpenPositions();
  },

  updateTrade: (trade) =>
    set((state) => ({
      trades: state.trades.map((t) => (t.id === trade.id ? trade : t)),
      openPositions: state.openPositions.map((t) => (t.id === trade.id ? trade : t)),
    })),
}));