import { useState, useCallback, useRef } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../actions";
import {
  normalizeProject,
  Project,
  RawProject,
} from "../utils/normalizeProject";
import { formatDate } from "..//utils/formatDate";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const undoRef = useRef<null | (() => void)>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data: RawProject[] = await getProjects();
      const normalized = data.map((p) => ({
        ...normalizeProject(p),
        formattedCreatedAt: formatDate(p.created_at),
      }));
      setProjects(normalized);
    } catch {
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  }, []);

  const addProject = useCallback(
    async (
      project: Omit<Project, "id" | "created_at" | "formattedCreatedAt">
    ) => {
      setLoading(true);
      try {
        const tempId = "temp-" + Date.now();
        const optimistic: Project = {
          id: tempId,
          ...project,
          created_at: new Date().toISOString(),
          formattedCreatedAt: formatDate(new Date()),
        };
        setProjects((prev) => [optimistic, ...prev]);
        await createProject(project);
        await fetchProjects();
      } catch {
        setError("Failed to create project");
      } finally {
        setLoading(false);
      }
    },
    [fetchProjects]
  );

  const updateProjectById = useCallback(
    async (id: string, updates: Partial<Project>) => {
      setLoading(true);
      try {
        setProjects((prev) =>
          prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
        );
        // Find the current project to fill missing required fields
        const current = projects.find((p) => p.id === id);
        if (!current) throw new Error("Project not found");
        await updateProject({
          id,
          name: updates.name ?? current.name,
          description: updates.description ?? current.description,
          flashcards: updates.flashcards ?? current.flashcards,
        });
        await fetchProjects();
      } catch {
        setError("Failed to update project");
      } finally {
        setLoading(false);
      }
    },
    [fetchProjects]
  );

  const deleteProjectById = useCallback(
    (id: string) => {
      const deleted = projects.find((p) => p.id === id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      let undo = false;
      undoRef.current = () => {
        undo = true;
        setProjects((prev) => [deleted!, ...prev]);
      };
      setTimeout(async () => {
        if (!undo) {
          setLoading(true);
          try {
            await deleteProject(id);
            await fetchProjects();
          } catch {
            setError("Failed to delete project");
          } finally {
            setLoading(false);
          }
        }
      }, 5000);
    },
    [projects, fetchProjects]
  );

  const undoDelete = useCallback(() => {
    if (undoRef.current) {
      undoRef.current();
      undoRef.current = null;
    }
  }, []);

  return {
    projects,
    loading,
    error,
    fetchProjects,
    addProject,
    updateProjectById,
    deleteProjectById,
    undoDelete,
    setError,
  };
}
