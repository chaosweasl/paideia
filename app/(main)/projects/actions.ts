"use server";

import { createClient } from "@/utils/supabase/server";

// Fetch a single project by id for the current user
export async function getProjectById(id: string): Promise<Project | null> {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) return null;

  const { data, error } = await supabase
    .from("projects")
    .select("id, name, description, created_at, flashcards")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();
  if (error || !data) return null;
  return {
    ...data,
    flashcards: Array.isArray(data.flashcards) ? data.flashcards : [],
  };
}

// Update only the flashcards array for a project
export async function updateFlashcards(id: string, flashcards: Flashcard[]) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("projects")
    .update({ flashcards })
    .eq("id", id)
    .eq("user_id", user.id);
  if (error) throw error;
}

// --- Types ---
export type Flashcard = {
  question: string;
  answer: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  flashcards?: Flashcard[];
  formattedCreatedAt?: string;
};

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) return [];

  const { data, error } = await supabase
    .from("projects")
    .select("id, name, description, created_at, flashcards")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data.map((project) => ({
    ...project,
    flashcards: Array.isArray(project.flashcards) ? project.flashcards : [],
  }));
}

export async function createProject({
  name,
  description,
  flashcards = [],
}: {
  name: string;
  description: string;
  flashcards?: Flashcard[];
}) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("projects")
    .insert([
      {
        user_id: user.id,
        name,
        description,
        flashcards,
      },
    ])
    .select("id");
  if (error) throw error;
  return data && data[0]?.id;
}

export async function updateProject({
  id,
  name,
  description,
  flashcards = [],
}: {
  id: string;
  name: string;
  description: string;
  flashcards?: Flashcard[];
}) {
  console.log("projectsActions: updateProject called", {
    id,
    name,
    description,
    flashcards,
  });
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("projects")
    .update({ name, description, flashcards })
    .eq("id", id)
    .eq("user_id", user.id);
  if (error) throw error;
}

export async function deleteProject(id: string) {
  console.log("projectsActions: deleteProject called", { id });
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);
  if (error) throw error;
}
