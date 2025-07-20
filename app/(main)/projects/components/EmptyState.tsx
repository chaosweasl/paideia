import { BookOpen } from "lucide-react";
import React from "react";

interface EmptyStateProps {
  onNewProject: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onNewProject }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-center text-base-content/70">
    <BookOpen
      size={80}
      className="mx-auto mb-4 text-base-300 dark:text-base-400"
    />
    <div className="text-xl font-semibold mb-2">No projects yet</div>
    <div className="mb-4">Start by creating your first flashcard project!</div>
    <button className="btn btn-primary" onClick={onNewProject}>
      <span className="mr-2">+</span> New Project
    </button>
  </div>
);
