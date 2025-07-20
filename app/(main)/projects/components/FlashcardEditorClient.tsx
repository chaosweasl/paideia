"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateFlashcards } from "../actions";
import { Project, Flashcard } from "../utils/normalizeProject";
import { FlashcardEditor } from "./FlashcardEditor";

interface FlashcardEditorClientProps {
  project: Project;
}

export function FlashcardEditorClient({ project }: FlashcardEditorClientProps) {
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function handleSave(flashcards: Flashcard[]) {
    setSaving(true);
    await updateFlashcards(project.id, flashcards);
    setSaving(false);
    router.push("/projects");
  }

  return <FlashcardEditor project={project} onSave={handleSave} />;
}
