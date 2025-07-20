"use client";

import { useEffect, useState } from "react";
import { useProjectForm, Flashcard } from "./utils/useProjectForm";
import { Project } from "./utils/normalizeProject";
import { useProjects } from "./hooks/useProjects";
import { useProjectManager } from "./hooks/useProjectManager";
import { useUnsavedChangesWarning } from "./hooks/useUnsavedChangesWarning";
import { deepEqual } from "./utils/deepEqual";
import { Tabs } from "./utils/tabs";
import { formatDate } from "./utils/formatDate";
import { Loader2 } from "lucide-react";
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from "./actions";
import { ProjectList } from "./components/ProjectList";
import toast, { Toaster } from "react-hot-toast";
import { ProjectDrawer } from "./components/ProjectDrawer";
import { SidebarNav } from "./components/SidebarNav";
import { EmptyState } from "./components/EmptyState";

// --- Types ---
// Project type now imported from normalizeProject
// Tabs constant for tab names

export default function ProjectsPage() {
  const {
    projects,
    loading,
    error,
    addProject,
    updateProjectById,
    deleteProjectById,
    fetchProjects,
    setError,
    undoDelete,
  } = useProjects();
  const projectManager = useProjectManager();
  // Fetch projects on mount
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);
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

  // Tab logic
  const handleTab = (tab: typeof Tabs.ALL | typeof Tabs.CREATE) => {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm(
        "You have unsaved changes. Are you sure you want to leave? Unsaved changes will be lost."
      );
      if (!confirmLeave) return;
    }
    if (tab === Tabs.CREATE) {
      setForm({ name: "", description: "", flashcards: [] });
      setOriginalForm({ name: "", description: "", flashcards: [] });
      projectManager.openCreate();
    } else {
      setForm({ name: "", description: "", flashcards: [] });
      setOriginalForm(null);
      projectManager.close();
    }
  };

  // Edit logic
  const openEditPanel = (project: Project) => {
    setForm({
      name: project.name,
      description: project.description,
      flashcards: project.flashcards,
    });
    setOriginalForm({
      name: project.name,
      description: project.description,
      flashcards: project.flashcards,
    });
    projectManager.openEdit(project.id);
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

  // Form submit logic
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (projectManager.editing && projectManager.projectId) {
      await updateProjectById(projectManager.projectId, form);
    } else {
      await addProject(form);
    }
    setOriginalForm(null);
    closePanel({ force: true });
    await fetchProjects();
  };

  // Delete logic with undo toast
  const handleDelete = (id: string) => {
    deleteProjectById(id);
    toast(
      (t) => (
        <span>
          Project deleted.
          <button
            className="ml-2 underline text-primary"
            onClick={() => {
              undoDelete();
              toast.dismiss(t.id);
            }}
          >
            Undo
          </button>
        </span>
      ),
      { duration: 5000 }
    );
  };

  return (
    <div className="min-h-screen flex bg-base-100">
      {/* Sidebar */}
      <SidebarNav
        activeTab={
          projectManager.editing
            ? Tabs.ALL
            : projectManager.open
            ? Tabs.CREATE
            : Tabs.ALL
        }
        onTab={handleTab}
      />
      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Your Projects</h1>
        </div>
        {loading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="animate-spin w-5 h-5" /> Loading...
          </div>
        ) : projects.length === 0 ? (
          <EmptyState onNewProject={() => handleTab("create")} />
        ) : (
          <ProjectList
            projects={projects}
            openEditPanel={openEditPanel}
            handleDelete={handleDelete}
          />
        )}
        {error && <p className="text-error mt-4">{error}</p>}
        <Toaster position="top-center" />

        {/* In-page drawer/panel for create/edit */}
        <ProjectDrawer
          open={projectManager.open}
          editing={projectManager.editing}
          form={form}
          loading={loading}
          error={error}
          onClose={closePanel}
          onFormChange={(e) =>
            setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
          }
          onFlashcardChange={(idx, field, value) => {
            setForm((f) => {
              const flashcards = [...f.flashcards];
              flashcards[idx] = { ...flashcards[idx], [field]: value };
              return { ...f, flashcards };
            });
          }}
          onAddFlashcard={() =>
            setForm((f) => ({
              ...f,
              flashcards: [...f.flashcards, { question: "", answer: "" }],
            }))
          }
          onRemoveFlashcard={(idx) =>
            setForm((f) => ({
              ...f,
              flashcards: f.flashcards.filter((_, i) => i !== idx),
            }))
          }
          onSubmit={handleFormSubmit}
        />
      </main>
    </div>
  );
}
