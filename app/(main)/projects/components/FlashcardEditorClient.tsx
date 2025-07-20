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
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-2">
        <input
          className="input input-bordered font-bold text-2xl md:text-3xl flex-1 bg-base-100 focus:ring-2 focus:ring-primary/30 px-4 md:px-8"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project Name"
        />
      </div>
      <textarea
        className="textarea textarea-bordered w-full text-base min-h-[60px] bg-base-100 border-base-300 shadow-sm rounded-xl px-4 py-3"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Project Description"
      />
      <div className="mt-2">
        <FlashcardEditor
          project={{ ...project, name, description }}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
