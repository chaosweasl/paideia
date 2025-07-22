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

export const useToastStore = create<ToastState>((set) => ({
  toast: null,
  showToast: (message, type = "info") => {
    set({ toast: { message, type } });
    setTimeout(() => set({ toast: null }), 3000);
  },
  clearToast: () => set({ toast: null }),
}));

export function useToast() {
  const { showToast } = useToastStore();
  return { showToast };
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const { toast } = useToastStore();
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
