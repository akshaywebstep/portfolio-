"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import LoadingScreen from "@/components/common/LoadingScreen";
import { portfolioApi } from "@/lib/api";
import { Mail, Phone, MapPin, Download, Copy, Check, MessageSquare, CheckCircle2 } from "lucide-react";

export default function ContactView() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const profData = await portfolioApi.getProfile();
        setProfile(profData);
      } catch (err: any) {
        console.error("Error loading contact view data:", err);
        setError(err.message || "Failed to load contact info");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const copyEmail = () => {
    if (profile?.email && typeof window !== "undefined" && navigator?.clipboard) {
      navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const copyPhone = () => {
    if (profile?.phone && typeof window !== "undefined" && navigator?.clipboard) {
      navigator.clipboard.writeText(profile.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  if (loading) {
    return <LoadingScreen message="Loading contact channels from database..." />;
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-[#fefafa] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-serif font-bold text-red-600 mb-2">Error Loading Contact</h2>
        <p className="text-slate-600 max-w-md mb-6">{error || "Could not retrieve contact details."}</p>
        <Link href="/" className="btn-primary">Return Home</Link>
      </div>
    );
  }

  const cleanPhoneDigits = profile.phone?.replace(/[^0-9]/g, "") || "917876060984";

  return (
    <div className="min-h-screen bg-[#fefafa] text-[#2d3748] flex flex-col justify-between selection:bg-[#ec5b53]/20 selection:text-[#cf332b]">
      <Navbar name={profile.name} role={profile.role} />

      <main className="flex-grow">
        
        {/* Banner Section */}
        <section className="pt-20 pb-16 bg-white border-b border-slate-200/80">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-4 uppercase tracking-wider">
              <Link href="/" className="hover:text-[#ec5b53] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#ec5b53]">Contact</span>
            </div>
            <span className="text-[#ec5b53] font-bold text-xs uppercase tracking-widest block mb-2">
              Stay In Touch
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#002d5b] tracking-tight leading-tight">
              Let&apos;s Discuss Opportunities
            </h1>
          </div>
        </section>

        {/* Contact Channels from Database */}
        <section className="py-24">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              
              {/* Email */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-sm card-shadow flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#ec5b53]/10 text-[#ec5b53] flex items-center justify-center mb-6">
                    <Mail className="w-7 h-7" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-[#002d5b] mb-2">
                    Email Address
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mb-6 font-sans">
                    Direct communication for interviews and software engineering roles.
                  </p>
                  <div className="text-sm sm:text-base font-bold text-[#002d5b] break-all bg-[#fefafa] p-4 rounded-2xl border border-slate-200/80 mb-6 font-mono">
                    {profile.email}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex-1 text-center py-3 rounded-full bg-[#ec5b53] hover:bg-[#cf332b] text-white font-semibold text-xs sm:text-sm transition-all shadow-sm"
                  >
                    Send Email
                  </a>
                  <button
                    onClick={copyEmail}
                    className="py-3 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedEmail ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-sm card-shadow flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#002d5b]/10 text-[#002d5b] flex items-center justify-center mb-6">
                    <Phone className="w-7 h-7" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-[#002d5b] mb-2">
                    Phone &amp; WhatsApp
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mb-6 font-sans">
                    Direct cellular phone call or immediate WhatsApp chat.
                  </p>
                  <div className="text-sm sm:text-base font-bold text-[#002d5b] bg-[#fefafa] p-4 rounded-2xl border border-slate-200/80 mb-6 font-mono">
                    {profile.phone}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <a
                    href={`tel:${profile.phone}`}
                    className="flex-1 text-center py-3 rounded-full bg-[#002d5b] hover:bg-[#001b38] text-white font-semibold text-xs sm:text-sm transition-all shadow-sm"
                  >
                    Direct Call
                  </a>
                  <a
                    href={`https://wa.me/${cleanPhoneDigits}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 border border-emerald-200 shadow-2xs"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Location & Availability */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-sm card-shadow flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-[#002d5b] mb-2">
                    Location &amp; Status
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mb-6 font-sans">
                    Based in {profile.location}. Ready for immediate relocation or remote work.
                  </p>
                  <div className="text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 p-4 rounded-2xl mb-6 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>{profile.availability || "Immediate Joiner"} • Ready to Relocate</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <a
                    href="/api/resume"
                    target="_blank"
                    rel="noopener noreferrer"
                    download="Akshay_Kumar_Resume.pdf"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#002d5b] hover:bg-[#001b38] text-white font-semibold text-xs sm:text-sm transition-all shadow-sm"
                  >
                    <Download className="w-4 h-4 text-[#ec5b53]" />
                    <span>Download Physical Resume</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Resume Callout Banner */}
            <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#ec5b53] block mb-1">
                  Verified Candidate Record
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#002d5b]">
                  Download {profile.name}&apos;s Official Resume (PDF)
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl font-sans">
                  Includes complete verified marks (B.Tech CSE 75%), exact responsibilities at Webstep Solutions, and permanent address records.
                </p>
              </div>
              <a
                href="/api/resume"
                target="_blank"
                rel="noopener noreferrer"
                download="Akshay_Kumar_Resume.pdf"
                className="btn-primary shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume PDF</span>
              </a>
            </div>

          </div>
        </section>

      </main>

      <Footer name={profile.name} role={profile.role} />
    </div>
  );
}
