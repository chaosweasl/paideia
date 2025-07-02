# Paideia

**Paideia** is an open-source platform that helps you turn your notes into flashcards using AI, and reminds you to restudy them using spaced repetition. You control your data and your AI: bring your own API key, and Paideia will never lock you in or charge you for usage.

## Features

- ✨ **AI-Powered Flashcard Generation**: Automatically extract key concepts from your notes and generate targeted flashcards.
- 📄 **Multiple Input Formats**: Upload text, paste content, or upload PDF files.
- 🗄️ **Personal Study Database**: All flashcards are stored securely for your account.
- 🔑 **Your Own API**: Use your own AI API key (OpenAI, etc.) for privacy and control.
- ⏰ **Spaced Repetition Reminders**: Get reminders to review your flashcards for optimal learning.
- 🔒 **Open Source & Self-Hostable**: 100% open-source, no vendor lock-in, no hidden fees.
- 🛡️ **User Authentication**: Secure sign-up, login, and user management.
- 🖼️ **User Profiles**: Upload profile pictures, change usernames, and manage your account.
- 🌐 **OAuth Support**: Sign in with Google, GitHub, and more.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Supabase](https://supabase.com/) account (for authentication and database)
- An AI API key (e.g., OpenAI). You can also test with a local model using LMStudio or any other local AI (not recommended for actually creating flashcards)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/paideia.git
   cd paideia
   ```

2. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   # Add your AI API key as needed
   ```

   **Note:** Email confirmation redirects are automatically configured:
   - Development: `http://localhost:3000/auth/confirm`
   - Production: `https://paideia-chaosweasl.vercel.app/auth/confirm`

4. **Run the development server:**

   ```sh
   npm run dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Project Structure

```
app/                # Next.js app directory (routes, pages, layouts)
components/         # React components
utils/              # Utility functions (Supabase client, helpers)
public/             # Static assets
docs/               # Documentation and TODOs
```

## Roadmap

- [x] Email/password authentication
- [ ] OAuth login (Google, GitHub, etc.)
- [ ] User profile management (avatars, usernames)
- [ ] Flashcard creation and storage
- [ ] AI-powered flashcard generation (bring your own API key)
- [ ] PDF parsing and import
- [ ] Spaced repetition reminders
- [ ] Mobile-friendly UI
- [ ] Community/shared decks

See [`docs/todo.md`](docs/todo.md) for more details.

## Contributing

We welcome contributions! Please read the following guidelines:

### How to Contribute

1. **Fork the repository** and create your branch from `main`.
2. **Create a new branch** for your feature or fix (do not commit directly to `main`).
3. **Install dependencies** if you haven't already.
4. **Make your changes** (add features, fix bugs, improve docs).
5. **Test your changes** locally.
6. **Commit your changes** with clear messages.
7. **Push to your fork** and submit a Pull Request.

### Code Style

- Use [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) for formatting and linting.
- Use [DaisyUI](https://daisyui.com/) or [Radix UI](https://www.radix-ui.com/) for UI components.
- Write clear, concise commit messages.
- Keep PRs focused and small when possible.

### Issues & Discussions

- Use [GitHub Issues](https://github.com/chaosweasl/paideia/issues) for bugs and feature requests.
- For questions or ideas, open a [Discussion](https://github.com/chaosweasl/paideia/discussions).

### Security

If you discover a security vulnerability, please report it privately.

## License

[MIT](LICENSE)

---

**Paideia** is built to empower learners everywhere. You own your data, your AI, and your learning journey.

You can watch live development at [https://paideia-chaosweasl.vercel.app/](https://paideia-chaosweasl.vercel.app/)
