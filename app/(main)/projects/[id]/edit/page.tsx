import { getProjectById } from "../../actions";
import { notFound } from "next/navigation";
import { FlashcardEditorClient } from "../../components/FlashcardEditorClient";

export default async function ProjectEditPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { params } = props;
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) return notFound();

  return (
    <main className="flex-1 p-8 overflow-auto">
      <FlashcardEditorClient
        project={{ ...project, flashcards: project.flashcards ?? [] }}
      />
    </main>
  );
}

// If you want to keep it sync, you must fetch data in a parent or via props.
