"use client";

import { SidebarNav } from "../components/SidebarNav";
import { HeaderDashboard } from "../components/HeaderDashboard";
import { ProjectDrawer } from "../components/ProjectDrawer";

export default function CreateProjectPage() {
  // Dummy props for ProjectDrawer, replace with real logic as needed
  return (
    <div className="flex min-h-screen bg-base-100">
      <aside className="w-64 flex-shrink-0 border-r border-base-200 bg-base-100 h-screen sticky top-0 z-20">
        <SidebarNav activeTab="create" onTab={() => {}} />
      </aside>
      <div className="flex-1 flex flex-col min-h-screen">
        <HeaderDashboard title="Create Project" />
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
