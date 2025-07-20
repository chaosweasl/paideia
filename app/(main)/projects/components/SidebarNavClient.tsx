"use client";
import { SidebarNav } from "./SidebarNav";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { createProject, type Flashcard } from "../actions";

export function SidebarNavClient() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleTab = async (tab: "all" | "create") => {
    if (tab === "create") {
      startTransition(async () => {
        const name = "Untitled Project";
        const description = "";
        const flashcards: Flashcard[] = [];
        const id = await createProject({ name, description, flashcards });
        if (id) router.push(`/projects/${id}/edit`);
      });
    } else {
      router.push("/projects");
    }
  };
  return (
    <aside className="w-64 flex-shrink-0 border-r border-base-200 bg-base-100 h-screen sticky top-0 z-20">
      <SidebarNav activeTab="all" onTab={handleTab} />
    </aside>
  );
}
