import { ProjectCard } from "./ProjectCard";
import { motion, AnimatePresence } from "framer-motion";

type Flashcard = {
  question: string;
  answer: string;
};

import type { Project } from "../utils/normalizeProject";

interface ProjectListProps {
  projects: Project[];
  openEditPanel: (project: Project) => void;
  handleDelete: (id: string) => void;
}

export function ProjectList({
  projects,
  openEditPanel,
  handleDelete,
}: ProjectListProps) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <li key={project.id} className="relative">
          <ProjectCard
            project={project}
            onEdit={openEditPanel}
            onDelete={handleDelete}
          />
        </li>
      ))}
    </ul>
  );
}
