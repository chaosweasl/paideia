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
  }

  function handleCancel() {
    router.push("/projects");
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Flashcards</h2>
        <button
          className="btn btn-primary rounded-full px-4 py-2 shadow-sm"
          onClick={handleAdd}
        >
          + Add Flashcard
        </button>
      </div>

      <ul className="space-y-6">
        {flashcards.map((fc, idx) => (
          <li
            key={idx}
            className="relative bg-base-100 rounded-2xl shadow-md border border-base-300 p-6 space-y-4"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-lg">Flashcard #{idx + 1}</span>
              <button
                className="btn btn-xs btn-error"
                onClick={() => handleRemove(idx)}
                title="Remove flashcard"
              >
                ✕
              </button>
            </div>
            <input
              className="w-full bg-base-200/80 rounded-xl px-4 py-3 border border-base-300 focus:ring-1 focus:ring-primary/30"
              value={fc.question}
              placeholder="Question"
              onChange={(e) => handleChange(idx, "question", e.target.value)}
            />
            <input
              className="w-full bg-base-200/80 rounded-xl px-4 py-3 border border-base-300 focus:ring-1 focus:ring-primary/30"
              value={fc.answer}
              placeholder="Answer"
              onChange={(e) => handleChange(idx, "answer", e.target.value)}
            />
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
          className="btn btn-success btn-md shadow-lg rounded-full px-6 py-2"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Project"}
        </button>
      </div>
    </div>
  );
}
