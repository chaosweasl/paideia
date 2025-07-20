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
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-4 w-full">
        <h2 className="font-semibold text-xl mb-2 px-2">Flashcards</h2>
        <ul className="space-y-4 w-full">
          {flashcards.map((fc, idx) => (
            <li
              key={idx}
              className="flex flex-col md:flex-row gap-2 items-center bg-base-200 rounded-xl p-4 shadow-sm w-full"
            >
              <input
                className="input input-bordered flex-1 text-base bg-base-100/80"
                value={fc.question}
                placeholder="Question"
                onChange={(e) => handleChange(idx, "question", e.target.value)}
              />
              <input
                className="input input-bordered flex-1 text-base bg-base-100/80"
                value={fc.answer}
                placeholder="Answer"
                onChange={(e) => handleChange(idx, "answer", e.target.value)}
              />
              <button
                className="btn btn-xs btn-error"
                onClick={() => handleRemove(idx)}
                title="Remove flashcard"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
        <div className="flex justify-end w-full">
          <button className="btn btn-primary btn-outline" onClick={handleAdd}>
            + Add Flashcard
          </button>
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-8 w-full">
        <button
          className="btn btn-ghost"
          onClick={handleCancel}
          disabled={saving}
        >
          Cancel
        </button>
        <button
          className="btn btn-success btn-lg shadow-md"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Project"}
        </button>
      </div>
    </div>
  );
}
