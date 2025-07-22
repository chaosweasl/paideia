import { BookOpen } from "lucide-react";
import React from "react";

export const EmptyState: React.FC = () => (
  <div className="flex flex-col items-center justify-center flex-1 h-full text-center text-base-content/80 py-24">
    <BookOpen
      size={90}
      className="mx-auto mb-8 text-primary/90 dark:text-primary drop-shadow-xl"
    />
    <div className="text-3xl font-extrabold mb-2 tracking-tight text-base-content">
      No projects yet
    </div>
    <div className="mb-8 text-lg text-base-content/80 max-w-md">
      Start by creating your first flashcard project. Organize your learning and
      track your progress with beautiful, interactive cards.
    </div>
  </div>
);
