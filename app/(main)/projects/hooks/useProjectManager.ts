import { create } from "zustand";

export type ProjectManagerState = {
  open: boolean;
  editing: boolean;
  projectId?: string;
  openCreate: () => void;
  openEdit: (projectId: string) => void;
  close: () => void;
};

export const useProjectManagerStore = create<ProjectManagerState>((set) => ({
  open: false,
  editing: false,
  projectId: undefined,
  openCreate: () => set({ open: true, editing: false, projectId: undefined }),
  openEdit: (projectId: string) =>
    set({ open: true, editing: true, projectId }),
  close: () => set({ open: false, editing: false, projectId: undefined }),
}));
