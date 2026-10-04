"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Server, 
  Briefcase, 
  GraduationCap, 
  User, 
  ExternalLink, 
  RefreshCw, 
  FolderGit2,
  LogOut,
  ShieldCheck,
  Download,
} from "lucide-react";
import { portfolioApi } from "@/lib/api";
import { APP_URL } from "@/lib/utils";
import Toast from "./Toast";
import Login from "./Login";
import ProfileTab from "./ProfileTab";
import ProjectsTab from "./ProjectsTab";
import ExperienceTab from "./ExperienceTab";
import SkillsTab from "./SkillsTab";
import EducationTab from "./EducationTab";

export default function AdminDashboard() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authChecking, setAuthChecking] = useState(true);

  const [activeTab, setActiveTab] = useState<"profile" | "projects" | "experience" | "skills" | "education">("profile");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Database Data States
  const [profile, setProfile] = useState<any>({});
  const [projects, setProjects] = useState<any[]>([]);
  const [experience, setExperience] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [profData, projData, expData, skillData, eduData] = await Promise.all([
        portfolioApi.getProfile(),
        portfolioApi.getProjects(),
        portfolioApi.getExperience(),
        portfolioApi.getSkills(),
        portfolioApi.getEducation(),
      ]);

      setProfile(profData || {});
      setProjects(projData || []);
      setExperience(expData || []);
      setSkills(skillData || []);
      setEducation(eduData || []);
    } catch (err: any) {
      console.error("Failed to load CMS data:", err);
      showToast(err.message || "Failed to load database records", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function checkAuth() {
      try {
        const user = await portfolioApi.verifySession();
        setCurrentUser(user);
        await fetchAllData();
      } catch {
        setCurrentUser(null);
      } finally {
        setAuthChecking(false);
      }
    }
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await portfolioApi.logout();
    } finally {
      setCurrentUser(null);
    }
  };

  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center text-slate-500 gap-3 font-sans">
        <div className="w-12 h-12 rounded-2xl bg-[#002d5b] text-white flex items-center justify-center shadow-lg animate-pulse">
          <RefreshCw className="w-6 h-6 animate-spin text-[#ec5b53]" />
        </div>
        <p className="text-sm font-semibold tracking-wide text-slate-600">Verifying Admin Session...</p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <Login
        onSuccess={(user) => {
          setCurrentUser(user);
          fetchAllData();
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#35373a] font-sans antialiased">
      <Toast toast={toast} />

      {/* ADMIN HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-12 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#002d5b] text-white flex items-center justify-center font-bold font-serif text-lg shadow-sm">
              AK
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#002d5b]">
                  Portfolio Admin CMS
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>MySQL (akshay_portfolio) Active</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-[11px] font-mono font-medium hidden md:inline-block">
                  App URL: {APP_URL}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium flex items-center gap-2">
                <span>Connected to MySQL (MariaDB) • Port 3306</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-700 font-bold">Logged in as {currentUser?.email}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchAllData}
              disabled={loading}
              className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 shadow-2xs cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>

            <a
              href="/api/resume"
              target="_blank"
              download="Akshay_Kumar_Resume.pdf"
              className="px-3.5 py-2 rounded-xl border border-emerald-200 bg-emerald-50 text-xs font-bold text-emerald-800 hover:bg-emerald-100 flex items-center gap-1.5 transition-all shadow-2xs"
              title="Download latest resume PDF generated from current database"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Download Live Resume</span>
            </a>

            <Link
              href={APP_URL || "/"}
              target="_blank"
              className="px-4 py-2 rounded-xl bg-[#002d5b] text-white text-xs font-bold hover:bg-[#002244] flex items-center gap-2 transition-all shadow-sm"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#ec5b53]" />
            </Link>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl border border-red-200 bg-red-50 text-xs font-bold text-red-700 hover:bg-red-100 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
              title="Sign out of Admin CMS"
            >
              <LogOut className="w-3.5 h-3.5 text-red-600" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="max-w-[1600px] mx-auto px-6 sm:px-12 flex gap-1 sm:gap-2 overflow-x-auto border-t border-slate-100 scrollbar-none">
          <button
            onClick={() => setActiveTab("profile")}
            className={`py-3 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "profile"
                ? "border-[#ec5b53] text-[#ec5b53]"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile &amp; Bio</span>
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`py-3 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "projects"
                ? "border-[#ec5b53] text-[#ec5b53]"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Portfolio Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("experience")}
            className={`py-3 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "experience"
                ? "border-[#ec5b53] text-[#ec5b53]"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Work Experience ({experience.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("skills")}
            className={`py-3 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "skills"
                ? "border-[#ec5b53] text-[#ec5b53]"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <Server className="w-4 h-4" />
            <span>Skills &amp; Tech ({skills.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("education")}
            className={`py-3 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "education"
                ? "border-[#ec5b53] text-[#ec5b53]"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Education ({education.length})</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-[1600px] mx-auto px-6 sm:px-12 py-8">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
            <RefreshCw className="w-8 h-8 animate-spin text-[#ec5b53]" />
            <p className="text-sm font-semibold">Connecting to Database...</p>
          </div>
        ) : (
          <>
            {activeTab === "profile" && (
              <ProfileTab
                initialProfile={profile}
                onSuccess={(msg) => showToast(msg, "success")}
                onError={(msg) => showToast(msg, "error")}
              />
            )}

            {activeTab === "projects" && (
              <ProjectsTab
                projects={projects}
                onRefresh={fetchAllData}
                onSuccess={(msg) => showToast(msg, "success")}
                onError={(msg) => showToast(msg, "error")}
              />
            )}

            {activeTab === "experience" && (
              <ExperienceTab
                experience={experience}
                onRefresh={fetchAllData}
                onSuccess={(msg) => showToast(msg, "success")}
                onError={(msg) => showToast(msg, "error")}
              />
            )}

            {activeTab === "skills" && (
              <SkillsTab
                skills={skills}
                onRefresh={fetchAllData}
                onSuccess={(msg) => showToast(msg, "success")}
                onError={(msg) => showToast(msg, "error")}
              />
            )}

            {activeTab === "education" && (
              <EducationTab
                education={education}
                onRefresh={fetchAllData}
                onSuccess={(msg) => showToast(msg, "success")}
                onError={(msg) => showToast(msg, "error")}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
