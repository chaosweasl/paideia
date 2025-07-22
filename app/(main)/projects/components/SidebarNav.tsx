"use client";
import React from "react";
import { useProjects } from "../hooks/useProjects";
import { Layers, Plus } from "lucide-react";

interface SidebarNavProps {
  activeTab: "all" | "create";
  onTab: (tab: "all" | "create") => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ activeTab, onTab }) => {
  const { projects, loading, error } = useProjects();
  // Helper to truncate project name
  const truncateTitle = (title: string, max: number = 18) =>
    title.length > max ? title.slice(0, max) + "..." : title;

  // Use flexbox only for responsive sidebar
  return (
    <nav className="flex flex-col p-6 gap-2 h-full border-r border-base-300 bg-base-100 shadow-sm">
      {/* Top: All Projects button */}
      <button
        className={`btn btn-ghost flex items-center gap-2 text-base font-medium transition ${
          activeTab === "all" ? "bg-primary/10 text-primary" : ""
        } justify-start`}
        onClick={() => onTab("all")}
        type="button"
      >
        <Layers className="w-5 h-5 mr-1" /> <span>All Projects</span>
      </button>
      {/* Divider under All Projects */}
      <div className="border-b border-base-300 my-2" />
      {/* Scrollable project list */}
      <div className="flex-1 overflow-y-auto">
        {loading && (
          <div className="text-sm text-base-content/50">Loading...</div>
        )}
        {error && <div className="text-sm text-error">{error}</div>}
        {!loading && !error && projects.length === 0 && (
          <div className="text-sm text-base-content/50">No projects found.</div>
        )}
        <ul className="flex flex-col gap-1">
          {projects.map((project) => (
            <li key={project.id}>
              <button
                className="btn btn-sm btn-ghost w-full justify-start text-left"
                title={project.name}
                // You may want to add navigation logic here
              >
                <span className="font-medium">
                  {truncateTitle(project.name)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Divider above Create New and sticky bottom area */}
      <div className="sticky bottom-0 bg-base-100 border-t border-base-300 pt-2 pb-2">
        <button
          className={`btn btn-ghost flex items-center gap-2 text-base font-medium transition ${
            activeTab === "create" ? "bg-primary/10 text-primary" : ""
          } justify-start w-full`}
          onClick={() => onTab("create")}
          type="button"
        >
          <Plus className="w-5 h-5 mr-1" /> <span>Create New</span>
        </button>
      </div>
    </nav>
  );
};
