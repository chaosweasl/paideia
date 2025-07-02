/**
 * Get the appropriate authentication redirect URL based on the environment
 * @returns The redirect URL for email confirmations
 */
export function getAuthRedirectUrl(): string {
  // Check if we're in production (on Vercel)
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL_URL) {
    return 'https://paideia-chaosweasl.vercel.app/auth/confirm';
  }
  
  // Default to development environment
  return 'http://localhost:3000/auth/confirm';
}