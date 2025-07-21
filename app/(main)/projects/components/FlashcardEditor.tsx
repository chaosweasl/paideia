"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Save,
  X,
  Loader2,
} from "lucide-react";
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
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6 flex flex-col">
          <h1 className="text-2xl md:text-3xl font-bold mb-1">
            Edit Flashcard Set
          </h1>
          <p className="text-base-content/70 text-sm md:text-base">
            Create and manage your flashcards
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Project Info - Left sidebar on XL, full width on smaller */}
          <div className="xl:col-span-1">
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body p-4 md:p-6">
                <h2 className="card-title text-lg mb-4">Project Details</h2>

                <div className="space-y-4">
                  <div>
                    <label className="label py-1">
                      <span className="label-text font-medium">
                        Project Name
                      </span>
                    </label>
                    <input
                      className="input input-bordered w-full"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter project name"
                      disabled={saving}
                    />
                  </div>

                  <div>
                    <label className="label py-1">
                      <span className="label-text font-medium">
                        Description
                      </span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered w-full h-24 resize-none"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter project description"
                      disabled={saving}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card Editor - Right main area */}
          <div className="xl:col-span-2">
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body p-4 md:p-6">
                {/* Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                  <div className="flex items-center gap-3">
                    <h2 className="card-title text-lg">Flashcard Editor</h2>
                    <div className="badge badge-primary">
                      {current + 1} of {flashcards.length}
                    </div>
                  </div>

                  <button
                    className="btn btn-primary btn-sm"
                    onClick={handleAdd}
                    disabled={saving}
                  >
                    <Plus className="w-4 h-4" />
                    Add Card
                  </button>
                </div>

                {/* Card Content */}
                <div className="space-y-4">
                  <div>
                    <label className="label py-1">
                      <span className="label-text font-medium">Question</span>
                    </label>
                    <div className="card bg-base-200 border border-base-300">
                      <div className="card-body p-4">
                        <textarea
                          className="textarea textarea-ghost w-full h-20 resize-none p-0 text-base leading-relaxed focus:outline-none"
                          value={card.question}
                          onChange={(e) =>
                            handleChange("question", e.target.value)
                          }
                          placeholder="Enter your question here..."
                          disabled={saving}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="label py-1">
                      <span className="label-text font-medium">Answer</span>
                    </label>
                    <div className="card bg-success/10 border border-success/30">
                      <div className="card-body p-4">
                        <textarea
                          className="textarea textarea-ghost w-full h-20 resize-none p-0 text-base leading-relaxed focus:outline-none"
                          value={card.answer}
                          onChange={(e) =>
                            handleChange("answer", e.target.value)
                          }
                          placeholder="Enter your answer here..."
                          disabled={saving}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Navigation */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-6 pt-4 border-t border-base-300">
                  <div className="flex gap-2">
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => navigate(-1)}
                      disabled={current === 0 || saving}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span className="hidden sm:inline">Previous</span>
                    </button>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => navigate(1)}
                      disabled={current === flashcards.length - 1 || saving}
                    >
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    className="btn btn-error btn-outline btn-sm"
                    onClick={handleDelete}
                    disabled={flashcards.length <= 1 || saving}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Card
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mt-6">
          <button
            className="btn btn-ghost"
            onClick={handleCancel}
            disabled={saving}
          >
            <X className="w-4 h-4" />
            Cancel
          </button>

          <button
            className="btn btn-success"
            onClick={handleSave}
            disabled={!isValid || saving}
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Project
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
