"use client";

import { useState } from "react";
import { useToast } from "@/components/toast-provider";
import { signInWithGithub, login, signup } from "./actions";
import { LoginForm } from "./components/LoginForm";

export default function LoginPage() {
  console.log("LoginPage: render");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const { showToast } = useToast();

  async function handleLogin(formData: FormData) {
    console.log("LoginPage: handleLogin called", formData);
    const result = await login(formData);
    if (result?.error) {
      showToast(result.error, "error");
    } else {
      showToast("Login successful!", "success");
    }
  }

  async function handleSignup(formData: FormData) {
    console.log("LoginPage: handleSignup called", formData);
    const result = await signup(formData);
    if (result?.error) {
      showToast(result.error, "error");
    } else if (result?.success) {
      setSignupSuccess(true);
      showToast("Account created! Please check your email.", "success");
    }
  }

  async function handleGithubLogin(e: React.MouseEvent) {
    console.log("LoginPage: handleGithubLogin called");
    e.preventDefault();
    await signInWithGithub();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-base-content mb-3">
              Welcome to <span className="text-primary">Cognify</span>
            </h1>
            <p className="text-base-content/70 text-lg">
              AI-powered flashcards for your notes. Sign in or create an account
              to get started.
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
