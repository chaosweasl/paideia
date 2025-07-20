"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Project, Flashcard } from "../utils/normalizeProject";

interface FlashcardEditorProps {
  project: Project;
  onSave: (flashcards: Flashcard[]) => Promise<void>;
}

export function FlashcardEditor({ project, onSave }: FlashcardEditorProps) {
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
    await onSave(flashcards);
    setSaving(false);
    router.push("/projects");
  }

  function handleCancel() {
    router.push("/projects");
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Meta panel (readonly) */}
      <div className="md:w-1/3 sticky top-6 self-start">
        <div className="mb-4">
          <div className="font-bold text-lg mb-1">{project.name}</div>
          <div className="text-base-content/70 text-sm mb-2">
            {project.description}
          </div>
        </div>
      </div>
      {/* Flashcard editor */}
      <div className="flex-1 flex flex-col gap-4 md:w-2/3 relative">
        <ul className="space-y-2">
          {flashcards.map((fc, idx) => (
            <li key={idx} className="flex gap-2 items-center">
              <input
                className="input input-bordered flex-1"
                value={fc.question}
                placeholder="Question"
                onChange={(e) => handleChange(idx, "question", e.target.value)}
              />
              <input
                className="input input-bordered flex-1"
                value={fc.answer}
                placeholder="Answer"
                onChange={(e) => handleChange(idx, "answer", e.target.value)}
              />
              <button
                className="btn btn-xs btn-error"
                onClick={() => handleRemove(idx)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="sticky bottom-0 bg-base-100 py-2 z-10 flex justify-end">
          <button className="btn btn-primary" onClick={handleAdd}>
            + Add Flashcard
          </button>
        </div>
        <div className="flex justify-end gap-4 mt-8">
          <button
            className="btn btn-ghost"
            onClick={handleCancel}
            disabled={saving}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
