import { getProjectById } from "../../actions";
import { normalizeProject } from "../../utils/normalizeProject";
import { notFound } from "next/navigation";
import { FlashcardEditor } from "../../components/FlashcardEditor";

export default async function ProjectEditPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const project = await getProjectById(id);
  if (!project) return notFound();
  const normalized = normalizeProject(project);
  return (
    <main className="flex-1 min-h-screen overflow-auto">
      <FlashcardEditor project={normalized} />
    </main>
  );
}
