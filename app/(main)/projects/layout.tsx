"use client";
import { SidebarNav } from "./components/SidebarNav";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-base-100">
      {/* Desktop sidebar */}
      <div className="hidden md:flex w-64 flex-shrink-0 h-screen sticky top-0 z-30 flex-col">
        <SidebarNav activeTab="all" onTab={() => {}} />
      </div>
      {/* Mobile sidebar */}
      <aside className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-base-200 flex justify-around py-2 shadow-lg bg-base-100">
        <SidebarNav activeTab="all" onTab={() => {}} mobile />
      </aside>
      <div className="flex-1 flex flex-col min-h-screen">{children}</div>
    </div>
  );
}
