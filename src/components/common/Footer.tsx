"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";

interface FooterProps {
  name?: string;
  role?: string;
}

export default function Footer({ name = "Akshay Kumar", role = "Backend Developer" }: FooterProps) {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const firstName = name.split(" ")[0] || "Akshay";

  return (
    <footer className="bg-white border-t border-slate-200/80 py-12 text-xs text-slate-500 font-sans">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#002d5b]">
              {firstName}<span className="text-[#ec5b53]">.</span>
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-[12px] text-slate-600 font-medium">{role}</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-sm text-[#35373a] font-medium">
            <Link href="/" className="hover:text-[#ec5b53] transition-colors">Home</Link>
            <Link href="/about" className="hover:text-[#ec5b53] transition-colors">About</Link>
            <Link href="/projects" className="hover:text-[#ec5b53] transition-colors">Portfolio</Link>
            <Link href="/contact" className="hover:text-[#ec5b53] transition-colors">Contact</Link>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#fefafa] hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors font-medium text-xs cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#ec5b53]" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} {name}. All rights reserved.
          </div>
          <div>
            Backend Developer Portfolio • Designed &amp; Engineered by {firstName}
          </div>
        </div>
      </div>
    </footer>
  );
}
