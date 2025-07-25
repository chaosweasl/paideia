import { Github, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import React from "react";

import { useState } from "react";
import { create } from "zustand";
import { signInWithGithub, login, signup } from "../actions";

interface LoginState {
  signupSuccess: boolean;
  error: string | null;
  setSignupSuccess: (success: boolean) => void;
  setError: (error: string | null) => void;
}

export const useLoginStore = create<LoginState>((set) => ({
  signupSuccess: false,
  error: null,
  setSignupSuccess: (success: boolean) => set({ signupSuccess: success }),
  setError: (error: string | null) => set({ error }),
}));

export const LoginForm: React.FC = () => {
  const { signupSuccess, error, setSignupSuccess, setError } = useLoginStore();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (formData: FormData) => {
    setLoading(true);
    const result = await login(formData);
    if (result?.error) setError(result.error);
    setLoading(false);
  };

  const handleSignup = async (formData: FormData) => {
    setLoading(true);
    const result = await signup(formData);
    if (result?.error) setError(result.error);
    if (result?.success) setSignupSuccess(true);
    setLoading(false);
  };

  const handleGithubLogin = async () => {
    setLoading(true);
    await signInWithGithub();
    setLoading(false);
  };

  return (
    <>
      {!signupSuccess ? (
        <div>
          <form className="space-y-6">
            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text font-medium text-base">Email</span>
              </label>
              <input
                name="email"
                type="email"
                required
                className="input input-bordered input-lg w-full"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text font-medium text-base">
                  Password
                </span>
              </label>
              <input
                name="password"
                type="password"
                required
                className="input input-bordered input-lg w-full"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
            {error && <div className="text-error text-sm mb-2">{error}</div>}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                formAction={handleLogin}
                className="btn btn-primary btn-lg flex-1"
                disabled={loading}
              >
                Log in
              </button>
              <button
                type="submit"
                formAction={handleSignup}
                className="btn btn-outline btn-secondary btn-lg flex-1"
                disabled={loading}
              >
                Sign up
              </button>
            </div>
          </form>
          <div className="divider text-base-content/50">OR</div>
          <button
            type="button"
            onClick={handleGithubLogin}
            className="btn btn-outline btn-accent btn-lg w-full gap-2"
            disabled={loading}
          >
            <Github className="w-5 h-5" />
            Continue with GitHub
          </button>
        </div>
      ) : (
        <div className="text-center py-6">
          <div className="mb-8">
            <CheckCircle2 className="w-24 h-24 text-success mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-success mb-4">
              Account Created!
            </h3>
            <p className="text-base-content/80 text-lg leading-relaxed">
              Please check your email inbox to confirm your sign-up and activate
              your account.
            </p>
          </div>
          <Link
            href="https://mail.google.com/"
            rel="noopener noreferrer"
            className="btn btn-success btn-lg btn-wide mb-6"
          >
            Open Gmail
          </Link>
          <p className="text-sm text-base-content/60 leading-relaxed">
            Didn&apos;t get the email? Check your spam folder or{" "}
            <Link
              target="_blank"
              href="https://github.com/chaosweasl/cognify/issues"
              className="link link-primary hover:link-hover"
            >
              contact support
            </Link>
            .
          </p>
        </div>
      )}
    </>
  );
};
