"use client";
import { create } from "zustand";
import { ReactNode } from "react";

type ToastType = "success" | "error" | "info" | "warning";
type Toast = { message: string; type: ToastType };

interface ToastState {
  toast: Toast | null;
  showToast: (message: string, type?: ToastType) => void;
  clearToast: () => void;
}

// Global timeout ref to prevent multiple active timers
let toastTimeout: NodeJS.Timeout | null = null;

export const useToastStore = create<ToastState>((set) => ({
  toast: null,
  showToast: (message, type = "info") => {
    // Immediately replace current toast
    set({ toast: { message, type } });

    // Clear any previous toast timeout
    if (toastTimeout) {
      clearTimeout(toastTimeout);
      toastTimeout = null;
    }

    // Set a new timeout
    toastTimeout = setTimeout(() => {
      set({ toast: null });
      toastTimeout = null;
    }, 3000);
  },
  clearToast: () => {
    if (toastTimeout) {
      clearTimeout(toastTimeout);
      toastTimeout = null;
    }
    set({ toast: null });
  },
}));

export function useToast() {
  const { showToast } = useToastStore();
  return { showToast };
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const toast = useToastStore((state) => state.toast);

  return (
    <>
      {children}
      {toast && (
        <div className="toast toast-top toast-center z-[999]">
          <div
            className={`alert alert-${toast.type} shadow-lg animate-fade-in animate-fade-out`}
          >
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </>
  );
}
