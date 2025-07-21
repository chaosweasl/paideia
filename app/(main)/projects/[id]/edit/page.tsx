import { getProjectById } from "../../actions";
import { notFound } from "next/navigation";
import { FlashcardEditor } from "../../components/FlashcardEditor";

export default async function ProjectEditPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { params } = props;
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) return notFound();

  return (
    <main className="flex-1 min-h-screen bg-base-200 px-4 md:px-12 py-6 md:py-8 overflow-auto">
      <FlashcardEditor
        project={{ ...project, flashcards: project.flashcards ?? [] }}
      />
    </main>
  );
}
