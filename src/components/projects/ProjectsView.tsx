"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import LoadingScreen from "@/components/common/LoadingScreen";
import { portfolioApi } from "@/lib/api";
import { CreditCard, Users, ShoppingBag, CheckCircle2, Layers, ArrowRight } from "lucide-react";

export default function ProjectsView() {
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const projectIcons = [CreditCard, Users, ShoppingBag];

  useEffect(() => {
    async function loadData() {
      try {
        const [profData, projData] = await Promise.all([
          portfolioApi.getProfile(),
          portfolioApi.getProjects(),
        ]);
        setProfile(profData);
        setProjects(projData);
      } catch (err: any) {
        console.error("Error loading projects view data:", err);
        setError(err.message || "Failed to load projects");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <LoadingScreen message="Loading portfolio projects from database..." />;
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-[#fefafa] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-serif font-bold text-red-600 mb-2">Error Loading Projects</h2>
        <p className="text-slate-600 max-w-md mb-6">{error || "Could not retrieve project records."}</p>
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
              <span className="text-[#ec5b53]">Portfolio</span>
            </div>
            <span className="text-[#ec5b53] font-bold text-xs uppercase tracking-widest block mb-2">
              Engineering Case Studies
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#002d5b] tracking-tight leading-tight">
              Featured Systems &amp; Architectures
            </h1>
          </div>
        </section>

        {/* Projects List from Database */}
        <section className="py-24">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16 space-y-12">
            
            {projects.map((project, idx) => {
              const Icon = projectIcons[idx % projectIcons.length] || Layers;
              return (
                <div
                  key={project.id}
                  className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm card-shadow"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
                    
                    {/* Left Column */}
                    <div className="lg:col-span-5 space-y-5">
                      <div className="flex items-center gap-3.5">
                        <div className="w-14 h-14 rounded-2xl bg-[#ec5b53]/10 text-[#ec5b53] flex items-center justify-center shadow-2xs">
                          <Icon className="w-7 h-7" />
                        </div>
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-[#ec5b53] block">
                            {project.category}
                          </span>
                          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#002d5b] leading-tight">
                            {project.title}
                          </h2>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
                        {project.tagline}
                      </p>

                      {project.metrics && (
                        <div className="p-4 rounded-2xl bg-[#fefafa] border border-slate-200/90 text-xs font-medium text-slate-800">
                          <span className="text-slate-400 block text-[11px] uppercase font-bold tracking-wider mb-1">Architecture &amp; Scale:</span>
                          <span className="font-semibold text-[#002d5b]">{project.metrics}</span>
                        </div>
                      )}

                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Technologies Used:</div>
                        <div className="flex flex-wrap gap-2">
                          {project.techStackList?.map((tech: string) => (
                            <span
                              key={tech}
                              className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {project.architectureNotes && (
                        <div className="text-xs text-slate-600 bg-blue-50/50 p-4 rounded-2xl border border-blue-100/80 leading-relaxed">
                          <span className="text-[#002d5b] font-bold block mb-1">Design Pattern &amp; Structure:</span>
                          {project.architectureNotes}
                        </div>
                      )}
                    </div>

                    {/* Right Column: Highlights */}
                    <div className="lg:col-span-7 bg-[#fefafa] rounded-3xl p-6 sm:p-10 border border-slate-200/80">
                      <h3 className="font-serif text-xl font-bold text-[#002d5b] mb-6 flex items-center gap-2.5">
                        <span className="w-3 h-3 rounded-full bg-[#ec5b53]"></span>
                        <span>Key Deliverables &amp; Architectural Highlights</span>
                      </h3>

                      <ul className="space-y-4">
                        {project.highlightsList?.map((highlight: string, hIdx: number) => (
                          <li key={hIdx} className="flex items-start gap-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>
              );
            })}

          </div>
        </section>

        {/* Call to action */}
        <section className="py-20 bg-white border-t border-slate-200/80 text-center">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16 space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#002d5b]">
              Interested in Reviewing the Complete Codebase or Architecture?
            </h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto font-sans">
              Feel free to get in touch directly to discuss technical specifications and code samples.
            </p>
            <div className="pt-4 flex justify-center gap-4">
              <Link href="/contact" className="btn-primary">
                <span>Contact Akshay</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer name={profile.name} role={profile.role} />
    </div>
  );
}
