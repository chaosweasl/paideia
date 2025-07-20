import { ProjectCard } from "./ProjectCard";

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
  handleDelete,
}: Omit<ProjectListProps, "openEditPanel">) {
  return (
    <>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onDelete={handleDelete}
        />
      ))}
    </>
  );
}
