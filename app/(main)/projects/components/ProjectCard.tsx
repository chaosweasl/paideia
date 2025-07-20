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
}) => {
  return (
    <div className="card relative h-40 min-h-[10rem] bg-base-200 rounded-xl shadow p-5 flex flex-col gap-3 border border-base-300 transition-transform duration-150 hover:scale-[1.025] group overflow-hidden">
      {/* Card content */}
      <div className="flex items-center justify-between">
        <h2
          className="text-xl font-bold flex-1 truncate max-w-[60%]"
          title={project.name}
        >
          {project.name.length > 40
            ? project.name.slice(0, 37) + "..."
            : project.name}
        </h2>
        <span className="badge badge-info badge-sm ml-2 flex items-center gap-1">
          <BookOpen className="w-3 h-3" />
          {Array.isArray(project.flashcards)
            ? project.flashcards.length
            : 0}{" "}
          Flashcards
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
      <div className="overlay absolute inset-0 bg-base-200/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
        <div className="flex gap-2">
          <Link href={`/projects/${project.id}/edit`}>
            <button className="btn btn-xs btn-outline flex items-center gap-1">
              <Edit2 className="w-3 h-3" /> Edit
            </button>
          </Link>
          <button
            className="btn btn-xs btn-error flex items-center gap-1"
            onClick={() => onDelete(project.id)}
          >
            <Trash2 className="w-3 h-3" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};
