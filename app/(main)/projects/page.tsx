"use client";

import { useEffect, useState } from "react";
import { Flashcard } from "./utils/useProjectForm";
import { useProjects } from "./hooks/useProjects";
import { useProjectManager } from "./hooks/useProjectManager";
import { useUnsavedChangesWarning } from "./hooks/useUnsavedChangesWarning";
import { deepEqual } from "./utils/deepEqual";
import { Tabs } from "./utils/tabs";
import { Loader2 } from "lucide-react";
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
    undoDelete,
  } = useProjects();
  const projectManager = useProjectManager();
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

  // --- Layout ---
  return (
    <div className="min-h-screen flex bg-base-100">
      {/* SidebarNav: fixed width, persistent */}
      <aside className="w-64 flex-shrink-0 border-r border-base-200 bg-base-100 h-screen sticky top-0 z-20">
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
      </aside>
      {/* Main column: header + main content, flex-1 */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header: persistent, always at top */}
        <header className="h-20 flex items-center px-8 border-b border-base-200 bg-base-100 sticky top-0 z-10">
          <h1 className="text-3xl font-bold">Your Projects</h1>
        </header>
        {/* Main content: scrollable, fills rest of page */}
        <main className="flex-1 overflow-y-auto p-8">
          {loading ? (
            <div className="flex items-center gap-2 h-40 justify-center">
              <Loader2 className="animate-spin w-5 h-5" /> Loading...
            </div>
          ) : projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[60vh]">
              <EmptyState onNewProject={() => handleTab("create")} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <ProjectList projects={projects} handleDelete={handleDelete} />
            </div>
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
    </div>
  );
}
