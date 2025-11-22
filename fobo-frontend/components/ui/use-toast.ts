"use client"

import { useCallback, useState } from "react"
type ToastInput = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

export function useToast() {
  const [toasts, setToasts] = useState<any[]>([])

const toast = useCallback(
  ({ title, description, variant = "default" }: ToastInput) => {
    const id = Date.now();

    setToasts((prev) => [
      ...prev,
      { id, title, description, variant },
    ]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2000);
  },
  []
);


  return {
    toast,
    toasts,
  }
}
