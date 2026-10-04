"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  name?: string;
  role?: string;
}

export default function Navbar({ name = "Akshay", role = "Backend Developer" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const firstName = name.split(" ")[0] || "Akshay";

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#fefafa]/90 backdrop-blur-lg border-b border-slate-200/60 transition-all">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* Brand Name / Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-[#002d5b]">
              {firstName}<span className="text-[#ec5b53]">.</span>
            </span>
            <span className="hidden sm:inline-block text-[11px] font-sans uppercase tracking-widest text-slate-500 font-semibold pl-3 border-l border-slate-300">
              {role}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold tracking-wide transition-colors relative py-1 ${
                    isActive
                      ? "text-[#ec5b53] font-bold"
                      : "text-[#35373a] hover:text-[#ec5b53]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ec5b53] rounded-full animate-fade-in" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="/contact"
              className="btn-primary"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl border border-slate-200 text-[#002d5b] hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 shadow-xl px-6 py-6 animate-fade-in">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-semibold py-2 px-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-[#ec5b53]/10 text-[#ec5b53] font-bold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col gap-3">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary text-center justify-center w-full"
              >
                <span>Get In Touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
