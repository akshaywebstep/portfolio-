"use client";

import React, { useState } from "react";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { portfolioApi } from "@/lib/api";

interface LoginProps {
  onSuccess: (user: any) => void;
}

export default function Login({ onSuccess }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { user } = await portfolioApi.login(email, password);
      onSuccess(user);
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFillDefaults = () => {
    setEmail("admin@portfolio.com");
    setPassword("adminpassword123");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col justify-center items-center p-4 sm:p-6 antialiased selection:bg-[#ec5b53]/20 selection:text-[#cf332b]">
      {/* Background Accent Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#ec5b53]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#002d5b]/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-10 relative z-10 animate-fade-in">
        
        {/* Header Icon & Title */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#002d5b] text-white flex items-center justify-center mb-4 shadow-md">
            <Lock className="w-8 h-8 text-[#ec5b53]" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#002d5b]">
            Admin CMS Login
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Secure JWT authentication for portfolio management
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-medium animate-fade-in flex items-start gap-2.5">
            <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@portfolio.com"
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#ec5b53] focus:ring-2 focus:ring-[#ec5b53]/20 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full pl-11 pr-11 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#ec5b53] focus:ring-2 focus:ring-[#ec5b53]/20 outline-none transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#002d5b] hover:bg-[#002244] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#ec5b53]" />
                <span>Verifying credentials...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4 text-[#ec5b53]" />
              </>
            )}
          </button>
        </form>

        {/* Quick Fill Default Credentials Hint */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col items-center gap-2 text-center">
          <p className="text-xs text-slate-400">
            Configured in <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">.env</code>
          </p>
          <button
            type="button"
            onClick={handleFillDefaults}
            className="text-xs font-semibold text-[#ec5b53] hover:underline cursor-pointer"
          >
            Fill Default Credentials (admin@portfolio.com)
          </button>
        </div>

        {/* Security badge */}
        <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Protected with HTTP-only JWT &amp; bcrypt hashing</span>
        </div>
      </div>
    </div>
  );
}
