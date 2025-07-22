# Copilot Instructions for Cognify

## Project Overview

## Architecture & Key Patterns

- **App Directory Structure:**

  - `app/` uses Next.js App Router. Each feature (e.g., `projects/`, `dashboard/`, `settings/`) is a folder with its own `components/`, `hooks/`, and `utils/`.
  - Shared React components live in `components/`. Feature-specific components are nested under their route (e.g., `app/projects/components/`).
  - Utility functions are in `utils/`, including Supabase client setup (`utils/supabase/client.ts`), theme helpers (`utils/theme.ts`), and project utilities (`app/projects/utils/`).
  - Static assets are in `public/`.

- **Authentication:**

  - Supabase handles user authentication and profiles. See `utils/supabase/client.ts` for client setup and `app/auth/` for auth routes.
  - Both OAuth and email/password are supported. Redirect URLs must match your local/dev settings (see Supabase dashboard and `.env.local`).
  - Auth logic is also present in `app/login/components/LoginForm.tsx` and related files.

- **Flashcard Generation:**

  - AI API integration is user-configurable via environment variables. No hardcoded keys—users set their own in `.env.local`.
  - Flashcard logic is in `app/projects/components/FlashcardEditor.tsx`, `FlashcardInput.tsx`, and related files.
  - Data normalization and comparison utilities are in `app/projects/utils/`.

- **API Routes:**

  - Next.js API routes are under `app/api/`. Example: `app/api/projects/route.ts` for project-related endpoints.
  - API routes interact with Supabase using the client from `utils/supabase/client.ts`.

- **State & Data Flow:**

  - State is managed via React hooks and context only (no Redux/MobX). See `app/projects/hooks/` for project-specific hooks like `useProjectManager.ts` and `useUnsavedChangesWarning.ts`.

- **Styling:**

  - DaisyUI (Tailwind CSS plugin) is used for UI components. Use DaisyUI classes for new UI elements. See `app/globals.css` for global styles.
  - Custom theming is handled in `utils/theme.ts`.

- **Environment Variables:**

  - Required: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`, and your AI API key. Set these in `.env.local`.
  - Never commit API keys or secrets.

- **Styling:**

## Developer Workflows

- **Install dependencies:**
  - Use `pnpm install` (preferred), or `npm install`/`yarn install`.
- **Run locally:**
  - Use `pnpm dev` (or `npm run dev`/`yarn dev`).
- **Environment setup:**
  - Create `.env.local` with Supabase keys, site URL, and your AI API key. See `README.md` for details.
- **Linting:**
  - Run `pnpm lint` (uses ESLint config in `eslint.config.mjs`). Fix issues as reported; most can be auto-fixed with `pnpm lint --fix`.
- **Formatting:**
  - Prettier is recommended (no config file; use defaults). Format on save in your editor.
- **Troubleshooting:**

  - If authentication fails, check Supabase redirect URLs and `.env.local` values.
  - For AI API errors, verify your key and endpoint in `.env.local`.
  - For DaisyUI issues, ensure Tailwind and DaisyUI are installed and configured in `postcss.config.mjs` and `app/globals.css`.

  - Run `pnpm lint` (uses ESLint config in `eslint.config.mjs`).

## Project-Specific Conventions

- **Feature Folders:**
  - Each major feature (projects, dashboard, settings) is a folder under `app/` with its own `components/`, `hooks/`, and `utils/`.
- **Hooks & Utils:**
  - Place feature-specific hooks in `app/[feature]/hooks/` and utilities in `app/[feature]/utils/`. Example: `useProjectManager.ts` manages project state and actions.
- **No global state management library:**
  - State is managed via React hooks and context only.
- **Bring Your Own AI Key:**
  - Never commit API keys. Users set their own in `.env.local`.
- **Supabase Integration:**
  - All DB/auth logic goes through Supabase client in `utils/supabase/client.ts`. Use this client in API routes and React components for DB access.
- **UI Library:**

  - Use DaisyUI classes for new UI components. Example: `<button className="btn btn-primary">` for a styled button.

  - All DB/auth logic goes through Supabase client in `utils/supabase/client.ts`.

## Integration Points

- **Supabase:**
  - Used for authentication, storage, and user profiles. All DB/auth logic goes through `utils/supabase/client.ts`.
- **AI API:**

  - User-provided key for flashcard generation. No backend proxying; all requests are client-side using the user's key.

- **Next.js API Routes:**

  - Extend API by adding files under `app/api/`. Use Supabase client for DB operations.

  - Used for authentication, storage, and user profiles.

## Examples

- To add a new feature, create a folder under `app/` (e.g., `app/notes/`). Add local `components/`, `hooks/`, and `utils/` as needed.
- For authentication changes, update Supabase settings in the dashboard and adjust logic in `utils/supabase/client.ts` and `app/auth/`.
- To add a new API route, create a file under `app/api/` and use the Supabase client for DB access.
- For new UI, use DaisyUI classes (see their docs for patterns). Example: `<input className="input input-bordered" />` for a styled input.
- For troubleshooting, check `.env.local`, Supabase dashboard, and console errors for hints.

- To add a new feature, create a folder under `app/` (e.g., `app/notes/`) and organize components, hooks, and utils locally.
- For authentication changes, update Supabase settings and `utils/supabase/client.ts`.

---

For more details, see `README.md` and `CONTRIBUTING.md`. If conventions are unclear, ask for feedback or check recent PRs for examples.
