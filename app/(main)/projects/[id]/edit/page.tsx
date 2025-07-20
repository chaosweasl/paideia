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
    <main className="flex-1 min-h-screen bg-gradient-to-br from-base-100 to-base-200 dark:from-[#18181b] dark:to-[#23232a] px-0 md:px-8 py-0 md:py-8 overflow-auto">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-base-content mb-4 md:mb-8 mt-6 md:mt-0">
          Edit Project: <span className="text-primary">{project.name}</span>
        </h1>
        <FlashcardEditorClient
          project={{ ...project, flashcards: project.flashcards ?? [] }}
        />
      </div>
    </main>
  );
}

// If you want to keep it sync, you must fetch data in a parent or via props.
