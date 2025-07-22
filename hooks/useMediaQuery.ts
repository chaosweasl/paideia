"use client";

import { create } from "zustand";

interface MediaQueryState {
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
}

export const useMediaQueryStore = create<MediaQueryState>((set) => {
  let initialIsMobile = false;
  if (typeof window !== "undefined") {
    initialIsMobile = window.matchMedia("(max-width: 767px)").matches;
    window.addEventListener("resize", () => {
      set({ isMobile: window.matchMedia("(max-width: 767px)").matches });
    });
  }
  return {
    isMobile: initialIsMobile,
    setIsMobile: (isMobile) => set({ isMobile }),
  };
});
