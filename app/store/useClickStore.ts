import { create } from "zustand";

interface ClickState {
  count: number;
  increment: () => void;
  reset: () => void;
}

export const useClickStore = create<ClickState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}));
