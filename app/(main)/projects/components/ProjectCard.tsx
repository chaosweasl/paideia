import { BookOpen, Edit2, Trash2 } from "lucide-react";
import React from "react";
import Link from "next/link";

type Flashcard = {
  question: string;
  answer: string;
};

import type { Project } from "../utils/normalizeProject";

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onDelete,
}) => (
  <div className="relative h-44 min-h-[11rem] bg-white/90 dark:bg-[#23232a] rounded-2xl shadow-lg p-6 flex flex-col gap-3 border border-base-300 transition-transform duration-150 hover:scale-[1.03] group overflow-hidden hover:shadow-2xl cursor-pointer">
    {/* Card content */}
    <div className="flex items-center justify-between">
      <h2
        className="text-lg font-bold flex-1 truncate max-w-[60%] text-base-content"
        title={project.name}
      >
        {project.name.length > 40
          ? project.name.slice(0, 37) + "..."
          : project.name}
      </h2>
      <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
        <BookOpen className="w-4 h-4" />
        {Array.isArray(project.flashcards) ? project.flashcards.length : 0}
      </span>
    </div>
    <p
      className="text-base-content/80 mb-1 text-sm truncate"
      style={{ maxWidth: "100%" }}
      title={project.description}
    >
      {project.description.length > 70
        ? project.description.slice(0, 67) + "..."
        : project.description}
    </p>
    <p className="text-xs text-base-content/50 mb-2 truncate">
      Created: {project.formattedCreatedAt}
    </p>
    {/* Overlay for actions, appears on hover */}
    <div className="absolute inset-0 bg-white/95 dark:bg-[#23232a]/95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 rounded-2xl border border-primary/30">
      <div className="flex gap-3">
        <Link href={`/projects/${project.id}/edit`}>
          <button className="btn btn-sm btn-primary flex items-center gap-1 shadow-md">
            <Edit2 className="w-4 h-4" /> Edit
          </button>
        </Link>
        <button
          className="btn btn-sm btn-outline btn-error flex items-center gap-1 shadow-md"
          onClick={() => onDelete(project.id)}
        >
          <Trash2 className="w-4 h-4" /> Delete
        </button>
      </div>
    </div>
  </div>
);
