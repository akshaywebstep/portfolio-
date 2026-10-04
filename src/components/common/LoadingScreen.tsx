"use client";

import { RefreshCw } from "lucide-react";

export default function LoadingScreen({ message = "Loading portfolio from database..." }: { message?: string }) {
  return (
    <div className="min-h-screen bg-[#fefafa] flex flex-col items-center justify-center text-slate-500 gap-4">
      <div className="w-12 h-12 rounded-2xl bg-[#002d5b] text-white flex items-center justify-center shadow-lg animate-pulse">
        <RefreshCw className="w-6 h-6 animate-spin text-[#ec5b53]" />
      </div>
      <p className="text-sm font-semibold tracking-wide font-sans text-slate-600">{message}</p>
    </div>
  );
}
