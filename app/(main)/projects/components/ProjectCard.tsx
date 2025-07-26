import { BookOpen, Edit2, Trash2, Play, Calendar } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";

type Flashcard = { question: string; answer: string };

type Project = {
  id: string;
  name: string;
  description: string;
  flashcards: Flashcard[];
  formattedCreatedAt: string;
};

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => Promise<void>;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onDelete,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const flashcardCount = Array.isArray(project.flashcards)
    ? project.flashcards.length
    : 0;
  const hasFlashcards = flashcardCount > 0;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(project.id);
    } catch {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-base-100 border border-base-300 rounded-2xl shadow-md hover:shadow-lg transition duration-200 overflow-hidden flex flex-col justify-between group focus-within:ring-2 focus-within:ring-primary">
      {/* Project Info */}
      <div className="p-6 space-y-3 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between">
          <h2
            className="text-xl md:text-2xl font-semibold text-base-content line-clamp-2"
            title={project.name}
          >
            {project.name}
          </h2>
          <div className="flex items-center gap-1 px-2 py-0.5 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary font-medium">
            <BookOpen className="w-4 h-4" />
            <span>{flashcardCount}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-base text-base-content/80 line-clamp-3">
          {project.description || "No description provided"}
        </p>

        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-base-content/60 pt-2 border-t border-base-300/50 mt-2">
          <Calendar className="w-4 h-4" />
          <span>{project.formattedCreatedAt}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-base-200 px-6 py-4 flex flex-col gap-3 border-t border-base-300">
        <div className="flex flex-row justify-center items-center gap-4 w-full">
          {hasFlashcards ? (
            <Link href={`/projects/${project.id}`} className="">
              <button className="btn btn-md btn-success gap-2 group-hover:scale-105 transition-transform">
                <Play className="w-4 h-4" />
                Study
              </button>
            </Link>
          ) : (
            <div className="text-warning text-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-warning rounded-full" />
              No flashcards
            </div>
          )}
          <Link href={`/projects/${project.id}/edit`} className="">
            <button className="btn btn-md btn-ghost hover:btn-neutral gap-2 group-hover:scale-105 transition-transform">
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          </Link>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`btn btn-md btn-ghost hover:btn-error gap-2 ${
              isDeleting ? "loading" : ""
            } group-hover:scale-105 transition-transform`}
          >
            {!isDeleting && <Trash2 className="w-4 h-4" />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
