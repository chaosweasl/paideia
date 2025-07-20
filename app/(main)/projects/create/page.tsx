"use client";

import { SidebarNav } from "../components/SidebarNav";
import { ProjectDrawer } from "../components/ProjectDrawer";
import { useRouter } from "next/navigation";
import { createProject } from "../actions";
import { useTransition } from "react";

export default function CreateProjectPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleTab = async (tab: "all" | "create") => {
    if (tab === "all") {
      router.push("/projects");
    } else if (tab === "create") {
      startTransition(async () => {
        const id = await createProject({
          name: "Untitled Project",
          description: "",
          flashcards: [],
        });
        if (id) router.push(`/projects/${id}/edit`);
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-base-100">
      <aside className="w-64 flex-shrink-0 border-r border-base-200 bg-base-100 h-screen sticky top-0 z-20">
        <SidebarNav activeTab="create" onTab={handleTab} />
      </aside>
      <div className="flex-1 flex flex-col min-h-screen">
        <main className="flex-1 p-8 overflow-auto">
          <ProjectDrawer
            open={true}
            editing={false}
            form={{ name: "", description: "", flashcards: [] }}
            loading={false}
            error={null}
            onClose={() => {}}
            onFormChange={() => {}}
            onFlashcardChange={() => {}}
            onAddFlashcard={() => {}}
            onRemoveFlashcard={() => {}}
            onSubmit={() => {}}
          />
        </main>
      </div>
    </div>
  );
}
