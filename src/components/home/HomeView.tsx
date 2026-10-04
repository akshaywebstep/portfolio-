"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import LoadingScreen from "@/components/common/LoadingScreen";
import { portfolioApi } from "@/lib/api";
import { 
  ArrowRight, 
  Download, 
  Server, 
  Layers, 
  CreditCard, 
  Calendar,
  CheckCircle2,
  Sparkles,
  ExternalLink
} from "lucide-react";

export default function HomeView() {
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [profData, projData, expData] = await Promise.all([
          portfolioApi.getProfile(),
          portfolioApi.getProjects(),
          portfolioApi.getExperience(),
        ]);
        setProfile(profData);
        setProjects(projData);
        setExperiences(expData);
      } catch (err: any) {
        console.error("Error loading home view data:", err);
        setError(err.message || "Failed to load data from server");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <LoadingScreen message="Loading portfolio from database..." />;
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-[#fefafa] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-serif font-bold text-red-600 mb-2">Database Connection Notice</h2>
        <p className="text-slate-600 max-w-md mb-6">{error || "No profile found in database"}</p>
        <button onClick={() => window.location.reload()} className="btn-primary">
          Retry Connection
        </button>
      </div>
    );
  }

  const mainExp = experiences[0] || null;

  return (
    <div className="min-h-screen bg-[#fefafa] text-[#2d3748] flex flex-col justify-between selection:bg-[#ec5b53]/20 selection:text-[#cf332b]">
      <Navbar name={profile.name} role={profile.role} />

      <main className="flex-grow">
        
        {/* HERO SECTION - Astra Personal Portfolio 02 Spec */}
        <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
          {/* Subtle Ambient Background Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#ec5b53]/5 via-[#002d5b]/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Headline & Intro */}
              <div className="lg:col-span-7 space-y-6 animate-fade-in-up">
                
                {/* Red Subtitle Tag */}
                <div className="text-[#ec5b53] font-bold text-sm sm:text-base tracking-widest uppercase flex items-center gap-3">
                  <span className="w-10 h-[2px] bg-[#ec5b53] inline-block"></span>
                  <span>I&apos;m {profile.role}</span>
                </div>

                {/* Big Serif Heading */}
                <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-[#002d5b] tracking-tight leading-[1.08]">
                  {profile.name}
                </h1>

                {/* Bio paragraph from DB */}
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans max-w-2xl font-normal">
                  {profile.summary}
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link href="/about" className="btn-primary">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link href="/projects" className="btn-outline">
                    <span>My Portfolio</span>
                  </Link>
                </div>

                {/* Contact Bar from DB */}
                <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-200/80 text-sm text-slate-600 font-medium">
                  <a href={`mailto:${profile.email}`} className="hover:text-[#ec5b53] transition-colors">
                    {profile.email}
                  </a>
                  <span className="text-slate-300">•</span>
                  <a href={`tel:${profile.phone}`} className="hover:text-[#ec5b53] transition-colors">
                    {profile.phone}
                  </a>
                  <span className="text-slate-300">•</span>
                  <span>{profile.location}</span>
                </div>

              </div>

              {/* Right Column: Hero Visual Frame (Astra Hero Card Layout) */}
              <div className="lg:col-span-5 animate-fade-in-up animate-float">
                <div className="relative rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-10 shadow-xl shadow-slate-200/50">
                  
                  {/* Decorative badge */}
                  <div className="inline-block px-3.5 py-1 rounded-full bg-[#ec5b53]/10 text-[#ec5b53] text-xs font-bold uppercase tracking-wider mb-6">
                    Backend Specialist
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#002d5b] mb-4">
                    Architecting Enterprise Systems
                  </h3>

                  <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                    <p>
                      {mainExp ? (
                        <>Currently developing scalable backends at <strong>{mainExp.company}</strong> ({mainExp.role}).</>
                      ) : (
                        <>Specialized in building high-concurrency Node.js and Laravel applications with relational database optimization.</>
                      )}
                    </p>

                    <div className="p-4 rounded-2xl bg-[#fefafa] border border-slate-200/80 space-y-2.5">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                        <span>Node.js / Express.js REST APIs</span>
                        <span className="text-[#ec5b53]">Enterprise Grade</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                        <span>Laravel MVC Architecture</span>
                        <span className="text-[#002d5b]">Multi-Role RBAC</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                        <span>Payment Gateways</span>
                        <span className="text-emerald-700">Stripe • GoCardless • PaySuite</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="font-serif text-3xl font-extrabold text-[#002d5b]">1.3+</div>
                      <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Years Experience</div>
                    </div>
                    <div className="text-right">
                      <div className="font-serif text-3xl font-extrabold text-[#ec5b53]">75%</div>
                      <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">B.Tech Score</div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ABOUT ME SECTION - Matching Astra Template */}
        <section className="py-24 bg-white border-y border-slate-200/70">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[#ec5b53] font-bold text-xs uppercase tracking-widest block">
                  About Me
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002d5b] leading-tight">
                  Developing With a Passion While Engineering Scalable Solutions.
                </h2>
              </div>

              <div className="lg:col-span-7 space-y-6 text-slate-600 text-base sm:text-lg leading-relaxed">
                <p>
                  {profile.summary}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-slate-100 font-sans">
                  <div>
                    <div className="font-serif text-3xl sm:text-4xl font-bold text-[#002d5b]">1.3+</div>
                    <div className="text-xs uppercase text-slate-500 font-bold mt-1 tracking-wider">Years Working</div>
                  </div>
                  <div>
                    <div className="font-serif text-3xl sm:text-4xl font-bold text-[#ec5b53]">3+</div>
                    <div className="text-xs uppercase text-slate-500 font-bold mt-1 tracking-wider">Payment Gateways</div>
                  </div>
                  <div>
                    <div className="font-serif text-3xl sm:text-4xl font-bold text-[#002d5b]">100%</div>
                    <div className="text-xs uppercase text-slate-500 font-bold mt-1 tracking-wider">Commitment</div>
                  </div>
                  <div>
                    <div className="font-serif text-3xl sm:text-4xl font-bold text-emerald-600">{profile.availability || "Immediate"}</div>
                    <div className="text-xs uppercase text-slate-500 font-bold mt-1 tracking-wider">Joiner</div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/about" className="inline-flex items-center gap-2 text-[#ec5b53] font-bold text-sm hover:text-[#cf332b] group">
                    <span>Read Full Professional Bio</span>
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* WHAT SERVICES / SPECIALIZATIONS I'M PROVIDING */}
        <section className="py-24 bg-[#fefafa]">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16">
            
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-[#ec5b53] font-bold text-xs uppercase tracking-widest block">
                What Services I&apos;m Providing
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#002d5b]">
                Backend Engineering Capabilities
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Service 1 */}
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-sm card-shadow flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#ec5b53]/10 text-[#ec5b53] flex items-center justify-center mb-6">
                    <Server className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#002d5b] mb-3">
                    RESTful API Architecture
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-sans">
                    Designing and maintaining high-concurrency RESTful APIs in Node.js and Express.js, featuring centralized error handling, middleware pipelines, and robust request validation.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100 font-mono text-xs text-slate-600">
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 font-medium">Node.js</span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 font-medium">Express</span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 font-medium">JWT &amp; RBAC</span>
                </div>
              </div>

              {/* Service 2 */}
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-sm card-shadow flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#002d5b]/10 text-[#002d5b] flex items-center justify-center mb-6">
                    <Layers className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#002d5b] mb-3">
                    Enterprise HRMS &amp; CRM
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-sans">
                    Developing modular enterprise applications using Laravel MVC architecture, role-based access control for multiple user tiers, and AJAX-powered zero-reload timesheets.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100 font-mono text-xs text-slate-600">
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 font-medium">Laravel</span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 font-medium">PHP MVC</span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 font-medium">AJAX</span>
                </div>
              </div>

              {/* Service 3 */}
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-sm card-shadow flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-6">
                    <CreditCard className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#002d5b] mb-3">
                    Payment Gateway Pipelines
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-sans">
                    End-to-end integration with Stripe, GoCardless, and Access PaySuite for automated direct debits, recurring subscriptions, retries, refunds, and webhook event reconciliation.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100 font-mono text-xs text-slate-600">
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 font-medium">Stripe</span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 font-medium">GoCardless</span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 font-medium">Webhooks</span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* WORK EXPERIENCE HIGHLIGHT (From Database) */}
        {mainExp && (
          <section className="py-24 bg-white border-y border-slate-200/70">
            <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                <div>
                  <span className="text-[#ec5b53] font-bold text-xs uppercase tracking-widest block mb-2">
                    Work Experience
                  </span>
                  <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#002d5b]">
                    Professional Career Timeline
                  </h2>
                </div>
                <Link href="/about" className="text-sm font-bold text-[#ec5b53] hover:text-[#cf332b] mt-4 md:mt-0 flex items-center gap-1.5">
                  <span>View Full Experience History</span> &rarr;
                </Link>
              </div>

              <div className="bg-[#fefafa] rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-xs">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#002d5b] text-white flex items-center justify-center font-bold text-xl shadow-md">
                      {mainExp.company?.substring(0, 2).toUpperCase() || "WS"}
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-[#002d5b]">
                        {mainExp.role}
                      </h3>
                      <p className="text-sm font-semibold text-slate-600 mt-0.5">
                        {mainExp.company} <span className="text-slate-400 font-normal">• {mainExp.location}</span>
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs">
                    <Calendar className="w-4 h-4 text-[#ec5b53]" />
                    <span>{mainExp.period}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                  {mainExp.subsectionsList?.slice(0, 3).map((sub: any, idx: number) => (
                    <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                      <h4 className="font-serif text-lg font-bold text-[#002d5b] mb-2">{sub.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                        {sub.points?.[0] || ""}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>
        )}

        {/* MY PORTFOLIO / FEATURED PROJECTS SECTION (From Database) */}
        <section className="py-24 bg-[#fefafa]">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-[#ec5b53] font-bold text-xs uppercase tracking-widest block mb-2">
                  My Portfolio
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#002d5b]">
                  Featured Systems &amp; APIs
                </h2>
              </div>
              <Link href="/projects" className="btn-primary mt-4 md:mt-0">
                <span>View All Projects ({projects.length})</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.slice(0, 3).map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-sm card-shadow flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#ec5b53] block mb-2">
                      {project.category}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#002d5b] mb-3 leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-sans">
                      {project.tagline}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.techStackList?.slice(0, 4).map((tech: string) => (
                        <span key={tech} className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <Link
                      href="/projects"
                      className="text-xs font-bold text-[#002d5b] hover:text-[#ec5b53] flex items-center gap-1.5 pt-4 border-t border-slate-100 group"
                    >
                      <span>Explore Case Study</span>
                      <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* STAY IN TOUCH / CONTACT BANNER */}
        <section className="py-24 bg-white border-t border-slate-200/70">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16 text-center">
            <span className="text-[#ec5b53] font-bold text-xs uppercase tracking-widest block mb-2">
              Stay In Touch
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#002d5b] mb-4">
              Have Any Project or Opportunity in Mind?
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mb-8 font-sans">
              I am actively looking for Backend Developer opportunities. Let&apos;s discuss how I can contribute to your team.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link href="/contact" className="btn-primary">
                <span>Contact {profile.name.split(" ")[0]}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="/api/resume"
                target="_blank"
                rel="noopener noreferrer"
                download="Akshay_Kumar_Resume.pdf"
                className="btn-outline"
              >
                <Download className="w-4 h-4 text-[#ec5b53]" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer name={profile.name} role={profile.role} />
    </div>
  );
}
