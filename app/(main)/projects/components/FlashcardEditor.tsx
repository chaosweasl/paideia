"use client";

import { useState, useEffect } from "react";
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
  const [current, setCurrent] = useState(0);
  const [saving, setSaving] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const valid =
      flashcards.length > 0 &&
      flashcards.every((fc) => fc.question.trim() && fc.answer.trim());
    setIsValid(valid && !!name.trim());
  }, [flashcards, name]);

  function handleChange(field: keyof Flashcard, value: string) {
    setFlashcards((prev) => {
      const up = [...prev];
      up[current] = { ...up[current], [field]: value };
      return up;
    });
  }

  function handleAdd() {
    setFlashcards((prev) => [...prev, { question: "", answer: "" }]);
    setCurrent(flashcards.length);
  }

  function handleDelete() {
    if (flashcards.length <= 1) return;
    setFlashcards((prev) => {
      const updated = [...prev.slice(0, current), ...prev.slice(current + 1)];
      return updated;
    });
    setCurrent((prev) => Math.max(0, prev - 1));
  }

  function navigate(dir: number) {
    setCurrent((p) => Math.max(0, Math.min(p + dir, flashcards.length - 1)));
  }

  async function handleSave() {
    setSaving(true);
    await updateProject({ id: project.id, name, description, flashcards });
    setSaving(false);
    router.push("/projects");
  }

  function handleCancel() {
    router.push("/projects");
  }

  const card = flashcards[current] || { question: "", answer: "" };

  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
      {/* Project Info */}
      <section className="mb-10 last:mb-0">
        <label className="block font-semibold mb-1 text-base">
          Project Name
        </label>
        <input
          className="input input-accent w-full mb-6 rounded-lg text-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project Name"
        />

        <label className="block font-semibold mb-1 text-base">
          Description
        </label>
        <textarea
          className="textarea textarea-accent w-full mb-6 rounded-lg text-sm h-20"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Project Description"
        />
      </section>

      {/* Card-like Editor */}
      <section className="card bg-base-100 shadow-xl rounded-lg p-6 mb-10 last:mb-0">
        <div className="flex flex-col space-y-6">
          <div>
            <label className="block font-medium mb-1 text-sm">Question</label>
            <input
              className="input input-bordered input-accent w-full rounded"
              value={card.question}
              onChange={(e) => handleChange("question", e.target.value)}
              placeholder="Enter question"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-sm">Answer</label>
            <input
              className="input input-bordered input-accent w-full rounded"
              value={card.answer}
              onChange={(e) => handleChange("answer", e.target.value)}
              placeholder="Enter answer"
            />
          </div>

          {/* Navigation and actions */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="join">
              <button
                className="btn btn-outline join-item btn-sm"
                onClick={() => navigate(-1)}
                disabled={current === 0}
              >
                Prev
              </button>
              <button
                className="btn btn-outline join-item btn-sm"
                onClick={() => navigate(1)}
                disabled={current === flashcards.length - 1}
              >
                Next
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button
                className="btn btn-error btn-sm"
                onClick={handleDelete}
                disabled={flashcards.length <= 1}
              >
                Delete
              </button>
              <span className="text-sm text-base-content/70">
                {current + 1} / {flashcards.length}
              </span>
            </div>

            <button
              className="btn btn-accent btn-sm whitespace-nowrap"
              onClick={handleAdd}
            >
              + New Card
            </button>
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 justify-end">
        <button
          className="btn btn-ghost btn-sm"
          onClick={handleCancel}
          disabled={saving}
        >
          Cancel
        </button>
        <button
          className="btn btn-success btn-md"
          onClick={handleSave}
          disabled={!isValid || saving}
        >
          {saving ? "Saving..." : "Save Project"}
        </button>
      </div>
    </div>
  );
}
