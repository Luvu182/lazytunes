import { create } from "zustand";

interface UiStore {
  queueOpen: boolean;
  searchQuery: string;
  toggleQueue: () => void;
  setSearchQuery: (q: string) => void;
}

export const useUiStore = create<UiStore>((set) => ({
  queueOpen: false,
  searchQuery: "",
  toggleQueue: () => set((s) => ({ queueOpen: !s.queueOpen })),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
