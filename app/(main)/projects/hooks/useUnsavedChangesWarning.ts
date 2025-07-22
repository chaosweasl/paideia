import { create } from "zustand";

interface UnsavedChangesState {
  hasUnsavedChanges: boolean;
  setUnsavedChanges: (has: boolean) => void;
}

export const useUnsavedChangesStore = create<UnsavedChangesState>((set) => ({
  hasUnsavedChanges: false,
  setUnsavedChanges: (has) => set({ hasUnsavedChanges: has }),
}));
