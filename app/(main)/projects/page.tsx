"use client";

import { useEffect } from "react";
import { useProjectsStore } from "./hooks/useProjects";
import { ProjectList } from "./components/ProjectList";
import { EmptyState } from "./components/EmptyState";
import { Loader2 } from "lucide-react";

export default function ProjectsPage() {
  const { projects, loading, error, fetchProjects } = useProjectsStore();
  useEffect(() => {
    if (!loading && projects.length === 0) {
      fetchProjects();
    }
  }, [loading, projects.length, fetchProjects]);

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
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
            <ProjectList />
          </div>
        )}
        {error && (
          <p className="text-error mt-4 text-center text-lg font-semibold">
            {error}
          </p>
        )}
      </main>
    </>
  );
}
