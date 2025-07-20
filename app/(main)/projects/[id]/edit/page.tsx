import { getProjectById } from "../../actions";
import { SidebarNavClient } from "../../components/SidebarNavClient";
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
    <div className="flex min-h-screen bg-base-100">
      <SidebarNavClient />
      <div className="flex-1 flex flex-col min-h-screen">
        <main className="flex-1 p-8 overflow-auto">
          <FlashcardEditorClient
            project={{ ...project, flashcards: project.flashcards ?? [] }}
          />
        </main>
      </div>
    </div>
  );
}
// If you want to keep it sync, you must fetch data in a parent or via props.
