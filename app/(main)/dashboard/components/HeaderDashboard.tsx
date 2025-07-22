"use client";

import { Menu, LogOut, Plus, Sun, Moon } from "lucide-react";
import { User, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { useUserProfileStore } from "@/hooks/useUserProfile";
import { useState, useEffect } from "react";
import { signOut } from "../actions";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { userProfile } = useUserProfileStore();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-base-200 bg-base-100 shadow-sm">
      <nav className="flex items-center justify-between gap-2 px-2 py-1 md:px-6 md:py-2 max-w-screen-2xl mx-auto">
        {/* Mobile: Hamburger & Drawer */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            className="btn btn-ghost btn-circle"
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          {/* Drawer overlay */}
          {drawerOpen && (
            <div
              className="fixed inset-0 z-[100] bg-black/40"
              onClick={() => setDrawerOpen(false)}
            />
          )}
          {/* Drawer panel */}
          <aside
            className={`fixed top-0 left-0 z-[101] h-full w-80 max-w-full bg-base-100 shadow-lg transition-transform duration-300 ${
              drawerOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            style={{ transitionProperty: "transform" }}
            tabIndex={-1}
            aria-label="Mobile navigation drawer"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-base-200">
              <Link
                href="/projects"
                className="btn btn-ghost flex items-center gap-2 text-xl font-bold"
                onClick={() => setDrawerOpen(false)}
              >
                <Image
                  src="/favicon.svg"
                  alt="Cognify Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />{" "}
                Cognify
              </Link>
              <button
                className="btn btn-ghost btn-circle"
                aria-label="Close menu"
                onClick={() => setDrawerOpen(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <ul className="menu p-4 gap-1 w-full">
              <li className="menu-title text-xs uppercase tracking-widest text-base-content/60">
                Navigation
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="font-medium"
                  onClick={() => setDrawerOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="font-medium"
                  onClick={() => setDrawerOpen(false)}
                >
                  Docs
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className="font-medium"
                  onClick={() => setDrawerOpen(false)}
                >
                  Settings
                </Link>
              </li>
              <li className="divider my-1" />
              <li className="menu-title text-xs uppercase tracking-widest text-base-content/60">
                Actions
              </li>
              <li>
                <button
                  className="btn btn-primary w-full flex items-center gap-2 font-semibold text-base shadow-md"
                  onClick={() => setDrawerOpen(false)}
                >
                  <Plus className="w-4 h-4" /> New Project
                </button>
              </li>
              <li>
                <button
                  className="btn btn-ghost w-full flex items-center gap-2 justify-start hover:bg-error hover:text-error-content"
                  onClick={() => setDrawerOpen(false)}
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </li>
              <li className="divider my-1" />
              <li>
                <button
                  className="btn btn-ghost w-full flex items-center gap-2 justify-start"
                  onClick={toggleTheme}
                >
                  {mounted ? (
                    theme === "dim" ? (
                      <Sun className="w-4 h-4" />
                    ) : (
                      <Moon className="w-4 h-4" />
                    )
                  ) : null}
                  Theme
                </button>
              </li>
            </ul>
          </aside>
        </div>
        {/* Logo (always visible) */}
        <Link
          href="/projects"
          className="btn btn-ghost flex items-center gap-2 text-xl font-bold px-2 md:px-0"
        >
          <Image
            src="/favicon.svg"
            alt="Cognify Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />{" "}
          Cognify
        </Link>
        {/* Desktop nav */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <ul className="menu menu-horizontal gap-1 px-1">
            <li>
              <Link
                href="/dashboard"
                className="font-medium px-3 py-2 rounded-md hover:bg-base-200 transition-colors"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/docs"
                className="font-medium px-3 py-2 rounded-md hover:bg-base-200 transition-colors"
              >
                Docs
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="font-medium px-3 py-2 rounded-md hover:bg-base-200 transition-colors"
              >
                Settings
              </Link>
            </li>
          </ul>
        </div>
        {/* Right side: actions & user */}
        <div className="flex items-center gap-2">
          {/* New Project always primary */}
          <button className="btn btn-primary hidden md:inline-flex shadow-md font-semibold text-base px-4 py-2 hover:scale-105 transition-transform">
            <Plus className="w-4 h-4 mr-2" /> New Project
          </button>
          {/* Theme Toggle */}
          <button
            className="btn btn-ghost btn-circle hover:bg-base-200 transition-colors"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {mounted ? (
              theme === "dim" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
          {/* User Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar border-2 border-primary hover:scale-105 transition-transform"
            >
              <div className="w-10 rounded-full overflow-hidden bg-base-200">
                <Image
                  src={userProfile?.avatar_url || "/assets/nopfp.png"}
                  alt="User avatar"
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                  priority
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/assets/nopfp.png";
                  }}
                />
              </div>
            </div>
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-lg bg-base-100 rounded-box w-64 border border-base-200">
              <li className="font-bold text-base-content/80 px-2 py-1 mb-1 border-b border-base-200 text-lg">
                {userProfile?.display_name || "User"}
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-primary hover:text-primary-content transition-colors"
                >
                  <User className="w-4 h-4" /> Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-primary hover:text-primary-content transition-colors"
                >
                  <Settings className="w-4 h-4" /> Settings
                </Link>
              </li>
              <li>
                <form
                  action={signOut}
                  className="w-full m-0 p-0 flex items-center gap-2 px-2 py-2 rounded-md transition-colors hover:bg-error hover:text-error-content cursor-pointer"
                >
                  <button
                    type="submit"
                    className="w-full h-full flex items-center gap-2 bg-transparent border-0 shadow-none p-0 m-0 text-left justify-start cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </form>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
