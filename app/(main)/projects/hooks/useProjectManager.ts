import { useState } from "react";

export type ProjectManagerState = {
  open: boolean;
  editing: boolean;
  projectId?: string;
};

export function useProjectManager() {
  const [state, setState] = useState<ProjectManagerState>({
    open: false,
    editing: false,
    projectId: undefined,
  });

  const openCreate = () =>
    setState({ open: true, editing: false, projectId: undefined });
  const openEdit = (projectId: string) =>
    setState({ open: true, editing: true, projectId });
  const close = () =>
    setState({ open: false, editing: false, projectId: undefined });

  return {
    ...state,
    openCreate,
    openEdit,
    close,
  };
}
