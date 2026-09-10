import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  modalOpen: boolean;
  modalContent: React.ReactNode | null;
  toggleSidebar: () => void;
  toggleSidebarCollapsed: () => void;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  sidebarCollapsed: false,
  modalOpen: false,
  modalContent: null,
  
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
  toggleSidebarCollapsed: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  
  openModal: (content) => set({ modalOpen: true, modalContent: content }),
  
  closeModal: () => set({ modalOpen: false, modalContent: null }),
}));