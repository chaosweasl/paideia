/**
 * Get the site URL for the current environment
 * Defaults to localhost:3000 for development if NEXT_PUBLIC_SITE_URL is not set
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  
  // Default to localhost for development
  return "http://localhost:3000";
}

/**
 * Get the full auth confirmation URL for email redirects
 */
export function getAuthConfirmUrl(): string {
  const baseUrl = getSiteUrl();
  return `${baseUrl}/auth/confirm`;
}