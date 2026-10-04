"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import LoadingScreen from "@/components/common/LoadingScreen";
import { portfolioApi } from "@/lib/api";
import { 
  Calendar, 
  CheckCircle2, 
  GraduationCap, 
  User, 
  Download, 
  Server,
  Database,
  CreditCard,
  ShieldCheck,
  Terminal,
  Code2
} from "lucide-react";

export default function AboutView() {
  const [profile, setProfile] = useState<any>(null);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const iconMap: Record<string, any> = {
    Server,
    Database,
    CreditCard,
    ShieldCheck,
    Terminal,
    Code2,
  };

  useEffect(() => {
    async function loadData() {
      try {
        const [profData, expData, eduData, skillData] = await Promise.all([
          portfolioApi.getProfile(),
          portfolioApi.getExperience(),
          portfolioApi.getEducation(),
          portfolioApi.getSkills(),
        ]);
        setProfile(profData);
        setExperiences(expData);
        setEducation(eduData);
        setSkills(skillData);
      } catch (err: any) {
        console.error("Error loading about view data:", err);
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <LoadingScreen message="Loading bio and credentials from database..." />;
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-[#fefafa] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-serif font-bold text-red-600 mb-2">Error Loading Profile</h2>
        <p className="text-slate-600 max-w-md mb-6">{error || "Could not retrieve profile."}</p>
        <Link href="/" className="btn-primary">Return Home</Link>
      </div>
    );
  }

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
              <span className="text-[#ec5b53]">About Me</span>
            </div>
            <span className="text-[#ec5b53] font-bold text-xs uppercase tracking-widest block mb-2">
              Professional Biography
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#002d5b] tracking-tight leading-tight">
              Designing With Passion While Building Scalable Systems
            </h1>
          </div>
        </section>

        {/* Detailed Bio & Profile Section */}
        <section className="py-24">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: Bio Narrative */}
              <div className="lg:col-span-7 space-y-6">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#002d5b]">
                  {profile.role}
                </h2>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
                  {profile.summary}
                </p>
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 text-sm text-slate-700 leading-relaxed shadow-xs">
                  <span className="text-xs uppercase font-bold text-slate-400 block mb-1">Key Specializations:</span>
                  <strong>{profile.subtitles}</strong>
                </div>

                <div className="pt-4 flex flex-wrap gap-4">
                  <a
                    href="/api/resume"
                    target="_blank"
                    rel="noopener noreferrer"
                    download="Akshay_Kumar_Resume.pdf"
                    className="btn-primary"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Full Resume</span>
                  </a>
                  <Link href="/contact" className="btn-outline">
                    <span>Contact Directly</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Personal Information Card */}
              <div className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
                <h3 className="font-serif text-2xl font-bold text-[#002d5b] pb-4 border-b border-slate-100 flex items-center gap-2.5">
                  <User className="w-5 h-5 text-[#ec5b53]" />
                  <span>Personal Details</span>
                </h3>

                <div className="space-y-4 text-sm text-slate-600">
                  <div>
                    <span className="text-xs uppercase font-bold text-slate-400 block">Full Name</span>
                    <span className="text-[#002d5b] font-bold text-base mt-0.5 block">{profile.name}</span>
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold text-slate-400 block">Joining Availability</span>
                    <span className="text-emerald-700 font-bold block mt-0.5">{profile.availability || "Immediate (Zero Notice Period)"}</span>
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold text-slate-400 block">Languages Known</span>
                    <span className="text-slate-800 font-medium block mt-0.5">{profile.languages}</span>
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold text-slate-400 block">Current Region</span>
                    <span className="text-slate-800 font-medium block mt-0.5">{profile.location}</span>
                  </div>
                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-xs uppercase font-bold text-slate-400 block">Permanent Address</span>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {profile.address}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Technical Skills & Expertise Section */}
        <section className="py-24 bg-white border-y border-slate-200/80">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16">
            <div className="mb-14">
              <span className="text-[#ec5b53] font-bold text-xs uppercase tracking-widest block mb-2">
                Technical Stack
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#002d5b]">
                Core Competencies &amp; Technologies
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((sc) => {
                const IconComponent = iconMap[sc.icon] || Server;
                return (
                  <div
                    key={sc.id}
                    className="p-8 rounded-3xl bg-[#fefafa] border border-slate-200/80 shadow-2xs card-shadow space-y-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-white text-[#002d5b] border border-slate-200/80 flex items-center justify-center shadow-xs mb-4">
                        <IconComponent className="w-6 h-6 text-[#ec5b53]" />
                      </div>
                      <h3 className="font-serif text-xl font-bold text-[#002d5b]">
                        {sc.name}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {sc.skillsList?.map((skill: string, sIdx: number) => (
                        <span
                          key={sIdx}
                          className="px-3 py-1 rounded-full bg-white border border-slate-200/70 text-slate-700 text-xs font-semibold shadow-3xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Professional Experience Section */}
        <section className="py-24 bg-[#fefafa]">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16 space-y-12">
            
            <div>
              <span className="text-[#ec5b53] font-bold text-xs uppercase tracking-widest block mb-2">
                Work Experience
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#002d5b]">
                Professional Career &amp; Impact
              </h2>
            </div>

            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-8"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#002d5b] text-white flex items-center justify-center font-bold text-xl shadow-md">
                      {exp.company?.substring(0, 2).toUpperCase() || "WS"}
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-[#002d5b]">
                        {exp.role}
                      </h3>
                      <p className="text-sm font-semibold text-slate-600 mt-0.5">
                        {exp.company} • {exp.location}
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fefafa] border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs">
                    <Calendar className="w-4 h-4 text-[#ec5b53]" />
                    <span>{exp.period} ({exp.type})</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {exp.subsectionsList?.map((sub: any, idx: number) => (
                    <div key={idx} className="p-6 rounded-2xl bg-[#fefafa] border border-slate-200/80 shadow-2xs space-y-4">
                      <h4 className="font-serif text-lg font-bold text-[#002d5b] flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ec5b53]"></span>
                        <span>{sub.title}</span>
                      </h4>
                      <ul className="space-y-3">
                        {sub.points?.map((pt: string, pIdx: number) => (
                          <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}

          </div>
        </section>

        {/* Education & Academic Credentials */}
        <section className="py-24 bg-white border-t border-slate-200/80">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16">
            
            <div className="mb-14">
              <span className="text-[#ec5b53] font-bold text-xs uppercase tracking-widest block mb-2">
                Education
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#002d5b]">
                Academic Qualifications
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="p-8 rounded-3xl bg-[#fefafa] border border-slate-200/80 shadow-sm card-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#002d5b]/10 text-[#002d5b] flex items-center justify-center mb-5">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#002d5b] mb-1 leading-snug">
                      {edu.degree}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mb-4 font-sans">
                      {edu.institution}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-500 font-mono">{edu.year}</span>
                    <span className="px-3 py-1 rounded-full bg-[#ec5b53]/10 text-[#ec5b53] font-bold">
                      {edu.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

      </main>

      <Footer name={profile.name} role={profile.role} />
    </div>
  );
}
