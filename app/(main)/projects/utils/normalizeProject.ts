import { Flashcard } from "../utils/useProjectForm";

export type RawProject = {
  id: string;
  name: string;
  description: string;
  flashcards?: string | Flashcard[];
  created_at: string;
  formattedCreatedAt?: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  flashcards: Flashcard[];
  created_at: string;
  formattedCreatedAt?: string;
};

export function parseFlashcards(
  flashcards?: string | Flashcard[]
): Flashcard[] {
  if (!flashcards) return [];
  if (typeof flashcards === "string") {
    try {
      return JSON.parse(flashcards);
    } catch {
      return [];
    }
  }
  if (Array.isArray(flashcards)) return flashcards;
  return [];
}

export function normalizeProject(raw: RawProject): Project {
  return {
    ...raw,
    flashcards: parseFlashcards(raw.flashcards),
  };
}
