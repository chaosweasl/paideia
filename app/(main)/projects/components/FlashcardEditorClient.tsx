"use client";
import { useState } from "react";
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

  async function handleSave(flashcards: Flashcard[]) {
    setSaving(true);
    await updateProject({ id: project.id, name, description, flashcards });
    setSaving(false);
  }

  return (
    <section className="space-y-8">
      {/* Project Info */}
      <div className="space-y-4">
        <label className="block text-lg font-medium">Project Name</label>
        <input
          className="w-full bg-base-100 rounded-2xl shadow-sm border border-base-300 px-6 py-3 font-bold text-2xl focus:ring-2 focus:ring-primary/40"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project Name"
        />

        <label className="block text-lg font-medium mt-6">Description</label>
        <textarea
          className="w-full bg-base-100 rounded-2xl shadow-sm border border-base-300 px-6 py-4 min-h-[100px] placeholder:text-base-content/50"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Project Description"
        />
      </div>

      {/* Flashcards */}
      <FlashcardEditor
        project={{ ...project, name, description }}
        onSave={handleSave}
      />
    </section>
  );
}
