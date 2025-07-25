import { ProjectCard } from "./ProjectCard";

import { useProjectsStore } from "../hooks/useProjects";

export function ProjectList() {
  const { projects, deleteProjectById } = useProjectsStore();
  return (
    <>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={{
            ...project,
            formattedCreatedAt: project.formattedCreatedAt ?? "",
          }}
          onDelete={deleteProjectById}
        />
      ))}
    </>
  );
}
