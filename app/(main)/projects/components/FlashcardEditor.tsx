// components/FlashcardEditor.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProject } from "../actions";
import { Project, Flashcard } from "../utils/normalizeProject";

interface FlashcardEditorProps {
  project: Project;
}

export function FlashcardEditor({ project }: FlashcardEditorProps) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [flashcards, setFlashcards] = useState<Flashcard[]>(
    project.flashcards || []
  );
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  function handleChange(idx: number, field: keyof Flashcard, value: string) {
    setFlashcards((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
  }

  function handleAdd() {
    setFlashcards((prev) => [...prev, { question: "", answer: "" }]);
  }

  function handleRemove(idx: number) {
    setFlashcards((prev) => prev.filter((_, i) => i !== idx));
  }

  async function handleSave() {
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

  function handleCancel() {
    router.push("/projects");
  }

  return (
    <div className="space-y-8">
      {/* Project Info */}
      <section className="space-y-4">
        <label className="block text-lg font-medium">Project Name</label>
        <input
          className="w-full bg-base-100 rounded-2xl shadow-sm border border-base-300 px-5 py-3 font-bold text-xl md:text-3xl focus:ring-2 focus:ring-primary/40"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project Name"
        />

        <label className="block text-lg font-medium">Description</label>
        <textarea
          className="w-full bg-base-100 rounded-2xl shadow-sm border border-base-300 px-5 py-4 min-h-[80px] text-sm md:text-base placeholder:text-base-content/50"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Project Description"
        />
      </section>

      {/* Flashcards Section */}
      <section className="space-y-6 md:space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-semibold">Flashcards</h2>
          <button
            className="btn btn-primary rounded-full px-4 py-1 md:px-5 md:py-2 shadow-sm text-sm md:text-base"
            onClick={handleAdd}
          >
            + Add Flashcard
          </button>
        </div>

        <ul className="space-y-4 md:grid md:grid-cols-2 md:gap-4">
          {flashcards.map((fc, idx) => (
            <li
              key={idx}
              className="relative bg-base-100 rounded-xl shadow-sm border border-base-300 p-4 md:p-3 w-full"
            >
              <span className="inline-block text-xs font-medium text-base-content/70 mb-2">
                #{idx + 1}
              </span>

              <div className="flex flex-col md:flex-row md:space-x-3 space-y-2 md:space-y-0">
                <input
                  className="flex-1 bg-base-200/80 rounded-lg px-3 py-2 text-sm placeholder:text-base-content/50 focus:ring-1 focus:ring-primary/30"
                  value={fc.question}
                  placeholder="Question"
                  onChange={(e) =>
                    handleChange(idx, "question", e.target.value)
                  }
                />
                <input
                  className="flex-1 bg-base-300/80 rounded-lg px-3 py-2 text-sm placeholder:text-base-content/50 focus:ring-1 focus:ring-primary/30"
                  value={fc.answer}
                  placeholder="Answer"
                  onChange={(e) => handleChange(idx, "answer", e.target.value)}
                />
              </div>
            </li>
          ))}
        </ul>

        <div className="border-t border-base-300 pt-6 flex justify-end gap-4">
          <button
            className="btn btn-ghost btn-sm text-base-content/70"
            onClick={handleCancel}
            disabled={saving}
          >
            Cancel
          </button>
          <button
            className="btn btn-success btn-md shadow-lg rounded-full px-6 py-2 text-base"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Project"}
          </button>
        </div>
      </section>
    </div>
  );
}
