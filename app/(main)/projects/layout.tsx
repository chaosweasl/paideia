"use client";
"use client";
import { SidebarNav } from "./components/SidebarNav";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { createProject } from "./components/../actions";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      {/* Desktop sidebar */}
      <div className="hidden md:flex w-64 flex-shrink-0 h-screen sticky top-0 z-30 flex-col">
        <SidebarNav activeTab="all" onTab={handleTab} />
      </div>
      {/* Mobile sidebar */}
      <aside className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex justify-around py-2 shadow-lg">
        <SidebarNav activeTab="all" onTab={handleTab} mobile />
      </aside>
      <div className="flex-1 flex flex-col min-h-screen">{children}</div>
    </div>
  );
}
