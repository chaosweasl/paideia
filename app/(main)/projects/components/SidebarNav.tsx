"use client";
import React from "react";
import { Layers, Plus } from "lucide-react";

interface SidebarNavProps {
  activeTab: "all" | "create";
  onTab: (tab: "all" | "create") => void;
}

export const SidebarNav: React.FC<SidebarNavProps & { mobile?: boolean }> = ({
  activeTab,
  onTab,
  mobile,
}) => (
  <nav
    className={
      mobile
        ? "flex flex-row w-full justify-around"
        : "flex flex-col p-6 gap-2 h-full"
    }
  >
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition bg-transparent hover:bg-primary/10 text-base-content/80 hover:text-primary ${
        activeTab === "all" ? "bg-primary/10 text-primary" : ""
      } ${mobile ? "flex-1 justify-center" : "justify-start"}`}
      onClick={() => onTab("all")}
    >
      <Layers className="w-5 h-5 mr-1" /> <span>All Projects</span>
    </button>
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition bg-transparent hover:bg-primary/10 text-base-content/80 hover:text-primary ${
        activeTab === "create" ? "bg-primary/10 text-primary" : ""
      } ${mobile ? "flex-1 justify-center" : "justify-start"}`}
      onClick={() => onTab("create")}
    >
      <Plus className="w-5 h-5 mr-1" /> <span>Create New</span>
    </button>
  </nav>
);
