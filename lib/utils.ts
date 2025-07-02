import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get the appropriate redirect URL for email authentication based on environment
 * @returns The redirect URL for email confirmation
 */
export function getAuthRedirectUrl(): string {
  // In production, use the Vercel deployment URL
  if (process.env.NODE_ENV === "production") {
    return "https://paideia-chaosweasl.vercel.app/auth/confirm";
  }
  
  // In development, use localhost
  return "http://localhost:3000/auth/confirm";
}
