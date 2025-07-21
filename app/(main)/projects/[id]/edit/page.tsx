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
    <main className="flex-1 min-h-screen bg-gradient-to-br from-base-100 to-base-200 dark:from-[#18181b] dark:to-[#23232a] px-6 md:px-12 py-8 overflow-auto">
      <div className="max-w-4xl mx-auto bg-base-100 rounded-2xl shadow-lg p-8">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight">
            <span className="text-primary">📝 Edit Project:</span>{" "}
            {project.name}
          </h1>
        </header>
        <FlashcardEditorClient
          project={{ ...project, flashcards: project.flashcards ?? [] }}
        />
      </div>
    </main>
  );
}
