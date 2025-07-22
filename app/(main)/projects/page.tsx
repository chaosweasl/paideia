"use client";

import { useEffect } from "react";
import { useProjectsStore } from "./hooks/useProjects";
import { ProjectList } from "./components/ProjectList";
import toast, { Toaster } from "react-hot-toast";
import { EmptyState } from "./components/EmptyState";
import { Loader2 } from "lucide-react";

export default function ProjectsPage() {
  const { projects, loading, error, deleteProjectById, fetchProjects } =
    useProjectsStore();
  useEffect(() => {
    fetchProjects();
  }, []);
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
            <EmptyState />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            <ProjectList />
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
