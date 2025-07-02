"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

/* TODO: add more robust validation as needed */

function getRedirectUrl(): string {
  // In development, use localhost:3000
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000/auth/confirm';
  }
  
  // In production, use the Vercel URL or fallback to the known production URL
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}`
    : 'https://paideia-chaosweasl.vercel.app';
    
  return `${baseUrl}/auth/confirm`;
}

function validateEmail(email: string) {
  // Simple email regex for demonstration
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password: string) {
  // Example: at least 6 characters
  return typeof password === "string" && password.length >= 6;
}

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validation
  if (!validateEmail(email)) {
    return { error: "Please enter a valid email address." };
  }
  if (!validatePassword(password)) {
    return { error: "Password must be at least 6 characters." };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // Return error message for client to display
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validation
  if (!validateEmail(email)) {
    return { error: "Please enter a valid email address." };
  }
  if (!validatePassword(password)) {
    return { error: "Password must be at least 6 characters." };
  }

  const { error } = await supabase.auth.signUp({ 
    email, 
    password,
    options: {
      emailRedirectTo: getRedirectUrl()
    }
  });

  if (error) {
    // Return error message for client to display
    return { error: error.message };
  }

  revalidatePath("/", "layout");

  return { success: true };
}
