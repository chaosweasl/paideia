import React from "react";
import { Plus, Loader2, Check } from "lucide-react";
import { FlashcardInput } from "./FlashcardInput";

type Flashcard = {
  question: string;
  answer: string;
};

interface ProjectDrawerProps {
  open: boolean;
  editing: boolean;
  form: {
    name: string;
    description: string;
    flashcards: Flashcard[];
  };
  loading: boolean;
  error: string | null;
  onClose: () => void;
  onFormChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onFlashcardChange: (
    idx: number,
    field: keyof Flashcard,
    value: string
  ) => void;
  onAddFlashcard: () => void;
  onRemoveFlashcard: (idx: number) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const ProjectDrawer: React.FC<ProjectDrawerProps> = ({
  open,
  editing,
  form,
  loading,
  error,
  onClose,
  onFormChange,
  onFlashcardChange,
  onAddFlashcard,
  onRemoveFlashcard,
  onSubmit,
}) => {
  if (!open) return null;
  return (
    <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-base-100 border-l border-base-300 shadow-lg z-50 animate-slide-in flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-base-300">
        <h2 className="text-xl font-bold">
          {editing ? "Edit Project" : "New Project"}
        </h2>
        <button
          className="btn btn-sm btn-ghost"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
      </div>
      <form
        onSubmit={onSubmit}
        className="flex flex-col md:flex-row gap-8 p-4 flex-1 overflow-y-auto"
      >
        {/* Meta panel */}
        <div className="flex flex-col gap-4 md:w-1/3 sticky top-6 self-start">
          <input
            type="text"
            name="name"
            placeholder="Project Name"
            value={form.name}
            onChange={onFormChange}
            required
            className="input input-bordered"
            disabled={loading}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={onFormChange}
            className="textarea textarea-bordered"
            disabled={loading}
          />
        </div>
        {/* Flashcard editor */}
        <div className="flex-1 flex flex-col gap-4 md:w-2/3 relative">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold">Flashcards</span>
          </div>
          {form.flashcards.length === 0 && (
            <p className="text-xs text-base-content/50">No flashcards yet.</p>
          )}
          <ul className="space-y-2">
            {form.flashcards.map((fc, idx) => (
              <FlashcardInput
                key={idx}
                idx={idx}
                question={fc.question}
                answer={fc.answer}
                loading={loading}
                onChange={onFlashcardChange}
                onRemove={onRemoveFlashcard}
              />
            ))}
          </ul>
          {/* Sticky Add Flashcard button */}
          <div className="sticky bottom-0 bg-base-100 py-2 z-10 flex justify-end">
            <button
              type="button"
              className="btn btn-primary"
              onClick={onAddFlashcard}
              disabled={loading}
            >
              <Plus className="w-4 h-4 mr-1" /> Add Flashcard
            </button>
          </div>
          {/* Action buttons bottom right */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin w-4 h-4 inline-block mr-1" />
              ) : editing ? (
                <Check className="w-4 h-4 inline-block mr-1" />
              ) : (
                <Plus className="w-4 h-4 inline-block mr-1" />
              )}
              {editing ? "Save Changes" : "Create Project"}
            </button>
          </div>
          {error && <p className="text-error mt-2">{error}</p>}
        </div>
      </form>
    </div>
  );
};
