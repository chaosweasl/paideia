"use client";

import { useEffect, useState, useTransition } from "react";
import { Flashcard } from "./utils/useProjectForm";
import { useProjectsStore } from "./store/projectsStore";
import { useProjectManager } from "./hooks/useProjectManager";
import { useUnsavedChangesWarning } from "./hooks/useUnsavedChangesWarning";
import { deepEqual } from "./utils/deepEqual";
import { Tabs } from "./utils/tabs";
import { Loader2 } from "lucide-react";
import { ProjectList } from "./components/ProjectList";
import toast, { Toaster } from "react-hot-toast";
import { EmptyState } from "./components/EmptyState";
import { useRouter } from "next/navigation";
import { createProject } from "./actions";

// --- Types ---
// Project type now imported from normalizeProject
// Tabs constant for tab names

export default function ProjectsPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    projects,
    loading,
    error,
    addProject,
    updateProjectById,
    deleteProjectById,
    fetchProjects,
  } = useProjectsStore();
  const projectManager = useProjectManager();
  useEffect(() => {
    fetchProjects();
  }, []);
  const [originalForm, setOriginalForm] = useState<{
    name: string;
    description: string;
    flashcards: Flashcard[];
  } | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    flashcards: [] as Flashcard[],
  });
  const hasUnsavedChanges =
    projectManager.open && originalForm && !deepEqual(form, originalForm);
  useUnsavedChangesWarning(Boolean(hasUnsavedChanges));

  // Create and redirect to new project
  const handleNewProject = () => {
    startTransition(async () => {
      const id = await createProject({
        name: "Untitled Project",
        description: "",
        flashcards: [],
      });
      if (id) router.push(`/projects/${id}/edit`);
    });
  };

  // Close panel logic
  const closePanel = ({ force = false } = {}) => {
    if (!force && hasUnsavedChanges) {
      const confirmClose = window.confirm(
        "You have unsaved changes. Are you sure you want to close? Unsaved changes will be lost."
      );
      if (!confirmClose) return;
    }
    setForm({ name: "", description: "", flashcards: [] });
    setOriginalForm(null);
    projectManager.close();
  };

  // Delete logic with undo toast
  const handleDelete = (id: string) => {
    deleteProjectById(id);
    toast("Project deleted.", { duration: 5000 });
  };

  // --- Layout ---
  return (
    <>
      {/* Main content: scrollable, fills rest of page */}
      <main className="flex-1 overflow-y-auto px-2 py-6 md:px-10 md:py-10 transition-all">
        {loading ? (
          <div className="flex items-center gap-2 h-40 justify-center">
            <Loader2 className="animate-spin w-5 h-5 text-primary" /> Loading...
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[60vh]">
            <EmptyState onNewProject={handleNewProject} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            <ProjectList projects={projects} handleDelete={handleDelete} />
          </div>
        )}
        {error && (
          <p className="text-error mt-4 text-center text-lg font-semibold">
            {error}
          </p>
        )}
        <Toaster position="top-center" />
      </main>
    </>
  );
}
