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
      <div className="mx-auto bg-base-100 rounded-2xl shadow-lg p-6 md:p-8">
        <header className="mb-8 md:mb-10">
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            <span className="text-primary">📝 Edit Project:</span>{" "}
            {project.name}
          </h1>
        </header>
        <FlashcardEditor
          project={{ ...project, flashcards: project.flashcards ?? [] }}
        />
      </div>
    </main>
  );
}
