import { create } from "zustand";
import { Project, RawProject } from "../utils/normalizeProject";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../actions";

interface ProjectsState {
  projects: Project[];
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  addProject: (
    project: Omit<Project, "id" | "created_at" | "formattedCreatedAt">
  ) => Promise<void>;
  updateProjectById: (id: string, updates: Partial<Project>) => Promise<void>;
  deleteProjectById: (id: string) => Promise<void>;
}

export const useProjectsStore = create<ProjectsState>((set, get) => ({
  projects: [],
  loading: false,
  error: null,
  fetchProjects: async (): Promise<void> => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data: RawProject[] = await res.json();
      set({
        projects: data.map((p) => ({
          id: p.id,
          name: p.name ?? "",
          description: p.description ?? "",
          flashcards: Array.isArray(p.flashcards) ? p.flashcards : [],
          created_at: p.created_at,
          formattedCreatedAt: p.formattedCreatedAt,
        })),
        loading: false,
      });
    } catch {
      set({ error: "Failed to load projects", loading: false });
    }
  },
  addProject: async (
    project: Omit<Project, "id" | "created_at" | "formattedCreatedAt">
  ): Promise<void> => {
    set({ loading: true });
    try {
      await createProject(project);
      await get().fetchProjects();
    } catch {
      set({ error: "Failed to create project" });
    } finally {
      set({ loading: false });
    }
  },
  updateProjectById: async (
    id: string,
    updates: Partial<Project>
  ): Promise<void> => {
    set({ loading: true });
    try {
      // Ensure required fields for update
      const current = get().projects.find((p) => p.id === id);
      if (!current) throw new Error("Project not found");
      await updateProject({
        id,
        name: updates.name ?? current.name,
        description: updates.description ?? current.description,
        flashcards: updates.flashcards ?? current.flashcards,
      });
      await get().fetchProjects();
    } catch {
      set({ error: "Failed to update project" });
    } finally {
      set({ loading: false });
    }
  },
  deleteProjectById: async (id: string): Promise<void> => {
    set({ loading: true });
    try {
      await deleteProject(id);
      await get().fetchProjects();
    } catch {
      set({ error: "Failed to delete project" });
    } finally {
      set({ loading: false });
    }
  },
}));
