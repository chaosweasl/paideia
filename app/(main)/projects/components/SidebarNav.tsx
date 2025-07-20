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
      className={`btn btn-ghost flex items-center gap-2 text-base font-medium transition ${
        activeTab === "all" ? "bg-primary/10 text-primary" : ""
      } ${mobile ? "flex-1 justify-center" : "justify-start"}`}
      onClick={() => onTab("all")}
      type="button"
    >
      <Layers className="w-5 h-5 mr-1" /> <span>All Projects</span>
    </button>
    <button
      className={`btn btn-ghost flex items-center gap-2 text-base font-medium transition ${
        activeTab === "create" ? "bg-primary/10 text-primary" : ""
      } ${mobile ? "flex-1 justify-center" : "justify-start"}`}
      onClick={() => onTab("create")}
      type="button"
    >
      <Plus className="w-5 h-5 mr-1" /> <span>Create New</span>
    </button>
  </nav>
);
