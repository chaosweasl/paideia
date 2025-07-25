import {
  BookOpen,
  Edit2,
  Trash2,
  Play,
  Calendar,
  ChevronRight,
} from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";

type Flashcard = {
  question: string;
  answer: string;
};

type Project = {
  id: string;
  name: string;
  description: string;
  flashcards: Flashcard[];
  formattedCreatedAt: string;
};

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onDelete,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(project.id);
    } catch {
      setIsDeleting(false);
    }
  };

  const flashcardCount = Array.isArray(project.flashcards)
    ? project.flashcards.length
    : 0;
  const hasFlashcards = flashcardCount > 0;

  return (
    <div
      className="relative h-52 sm:h-48 md:h-52 bg-gradient-to-br from-base-100 to-base-200 rounded-2xl shadow-lg border border-base-300 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] group overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main card content */}
      <div className="p-4 sm:p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-2 sm:mb-3">
          <h2
            className="text-base sm:text-lg font-bold text-base-content leading-tight line-clamp-2 flex-1 mr-2 sm:mr-3 group-hover:text-primary transition-colors duration-200"
            title={project.name}
          >
            {project.name}
          </h2>
          <div className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20 shrink-0">
            <BookOpen className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            <span>{flashcardCount}</span>
          </div>
        </div>

        {/* Description */}
        <p
          className="text-base-content/80 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-auto"
          title={project.description}
        >
          {project.description || "No description provided"}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-base-content/60 pt-2 sm:pt-3 border-t border-base-300/50">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            <span className="text-xs">{project.formattedCreatedAt}</span>
          </div>
          {hasFlashcards && (
            <div className="flex items-center gap-1 text-success">
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-success rounded-full animate-pulse"></div>
              {/* TASK: not rn but for the ready to study make it 
              when the user is finally supposed to restudy them */}
              <span className="hidden sm:inline">Ready to study</span>
              <span className="sm:hidden">Ready</span>
            </div>
          )}
        </div>

        {/* Quick study button - visible on hover for cards with flashcards */}
        {hasFlashcards && (
          <div
            className={`absolute top-4 right-16 transition-all duration-300 ${
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2"
            }`}
          >
            <Link href={`/projects/${project.id}`}>
              <button className="btn btn-sm btn-success gap-1.5 shadow-lg hover:shadow-xl">
                <Play className="w-3.5 h-3.5" />
                Study
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Hover overlay with actions */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-base-100/95 to-base-200/95 backdrop-blur-sm flex items-center justify-center transition-all duration-300 rounded-2xl ${
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-3 items-center justify-center">
          {/* Primary action - Study (if has flashcards) or Edit */}
          {hasFlashcards ? (
            <Link
              href={`/projects/${project.id}`}
              className="w-full flex justify-center items-center "
            >
              <button className="btn btn-primary p-2 gap-4 shadow-lg hover:shadow-xl w-50">
                <Play className="w-4 h-4" />
                Start Studying
                <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          ) : (
            <Link
              href={`/projects/${project.id}/edit`}
              className="w-full flex justify-center items-center"
            >
              <button className="btn btn-primary p-2 gap-4 shadow-lg hover:shadow-xl w-50">
                <Edit2 className="w-4 h-4" />
                Add Flashcards
                <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          )}

          {/* Secondary actions */}
          <div className="flex gap-2">
            <Link href={`/projects/${project.id}/edit`}>
              <button className="btn btn-sm btn-ghost hover:btn-neutral gap-1.5 shadow-md">
                <Edit2 className="w-3.5 h-3.5" />
                Edit
              </button>
            </Link>
            <button
              className={`btn btn-sm btn-ghost hover:btn-error gap-1.5 shadow-md ${
                isDeleting ? "loading" : ""
              }`}
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {!isDeleting && <Trash2 className="w-3.5 h-3.5" />}
              Delete
            </button>
          </div>

          {/* Status message for empty projects */}
          {!hasFlashcards && (
            <div className="text-xs text-base-content/60 text-center mt-2 px-4">
              <div className="flex items-center gap-1 justify-center">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <span>No flashcards yet - add some to start studying!</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Progress indicator for projects with flashcards */}
      {/* a good idea would be to do this in order to remind the user to restudy them */}
      {/* {hasFlashcards && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-base-300">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
            style={{ width: `${Math.min((flashcardCount / 20) * 100, 100)}%` }}
          />
        </div>
      )} */}

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-2xl sm:rounded-bl-3xl rounded-tr-2xl"></div>
    </div>
  );
};
