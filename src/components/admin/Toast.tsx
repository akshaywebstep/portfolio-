"use client";

import { CheckCircle2, AlertCircle } from "lucide-react";

interface ToastProps {
  toast: { message: string; type: "success" | "error" } | null;
}

export default function Toast({ toast }: ToastProps) {
  if (!toast) return null;

  return (
    <div
      className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl transition-all duration-300 ${
        toast.type === "success"
          ? "bg-[#002d5b] text-white border-l-4 border-[#ec5b53]"
          : "bg-red-600 text-white"
      }`}
    >
      {toast.type === "success" ? (
        <CheckCircle2 className="w-5 h-5 text-[#ec5b53]" />
      ) : (
        <AlertCircle className="w-5 h-5" />
      )}
      <span className="text-sm font-semibold">{toast.message}</span>
    </div>
  );
}
