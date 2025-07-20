import { BookOpen } from "lucide-react";
import React from "react";

interface EmptyStateProps {
  onNewProject: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onNewProject }) => (
  <div className="flex flex-col items-center justify-center flex-1 h-full text-center text-base-content/80 py-24">
    <BookOpen
      size={90}
      className="mx-auto mb-8 text-primary/20 dark:text-primary/30 drop-shadow-xl"
    />
    <div className="text-3xl font-extrabold mb-2 tracking-tight text-base-content">
      No projects yet
    </div>
    <div className="mb-8 text-lg text-base-content/60 max-w-md">
      Start by creating your first flashcard project. Organize your learning and
      track your progress with beautiful, interactive cards.
    </div>
    <button
      className="btn btn-primary btn-md px-10 font-semibold shadow-lg hover:scale-105 transition-transform"
      onClick={onNewProject}
    >
      <span className="mr-2 text-2xl">+</span> New Project
    </button>
  </div>
);
