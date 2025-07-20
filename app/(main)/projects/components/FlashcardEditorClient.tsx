"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProject } from "../actions";
import { Project, Flashcard } from "../utils/normalizeProject";
import { FlashcardEditor } from "./FlashcardEditor";

interface FlashcardEditorClientProps {
  project: Project;
}

export function FlashcardEditorClient({ project }: FlashcardEditorClientProps) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function handleSave(flashcards: Flashcard[]) {
    setSaving(true);
    await updateProject({
      id: project.id,
      name,
      description,
      flashcards,
    });
    setSaving(false);
    router.push("/projects");
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-br from-base-100 to-base-200 p-0 m-0">
      <div className="w-full px-0 py-8 flex flex-col md:flex-row md:items-center gap-6 border-b border-base-300 bg-base-100/80 sticky top-0 z-10">
        <input
          className="input input-lg input-bordered font-bold text-3xl flex-1 bg-transparent border-none shadow-none focus:ring-0 focus:outline-none px-8"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project Name"
        />
        <button
          className="btn btn-accent btn-outline mr-8"
          onClick={() => router.push(`/projects/${project.id}`)}
        >
          View Project
        </button>
      </div>
      <div className="w-full flex flex-col flex-1 px-0 md:px-24 py-8 gap-8">
        <textarea
          className="textarea textarea-bordered w-full text-lg min-h-[80px] bg-base-100/80 border-base-300 shadow-sm rounded-xl px-6 py-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Project Description"
        />
        <FlashcardEditor
          project={{ ...project, name, description }}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
