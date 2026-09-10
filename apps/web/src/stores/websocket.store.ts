import { create } from 'zustand';

interface WebSocketState {
  isConnected: boolean;
  lastEvent: { type: string; data: any } | null;
  reconnectAttempts: number;
  setConnected: (connected: boolean) => void;
  setLastEvent: (event: { type: string; data: any }) => void;
  incrementReconnect: () => void;
  reset: () => void;
}

export const useWebSocketStore = create<WebSocketState>((set) => ({
  isConnected: false,
  lastEvent: null,
  reconnectAttempts: 0,

  setConnected: (isConnected) => set({ isConnected, reconnectAttempts: 0 }),
  setLastEvent: (lastEvent) => set({ lastEvent }),
  incrementReconnect: () => set((state) => ({ reconnectAttempts: state.reconnectAttempts + 1 })),
  reset: () => set({ isConnected: false, lastEvent: null, reconnectAttempts: 0 }),
}));