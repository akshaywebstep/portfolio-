// src/lib/api.ts
// Unified Frontend API Service (Shipowl-style)
// All views and admin components interact with the database via these methods.
// Automatically attaches JWT token and credentials to all requests.

import { getApiEndpoint } from "./utils";
import type { Profile, Project, Experience, SkillCategory, Education } from "@/../types";

const TOKEN_KEY = "portfolio_admin_jwt";

export function getAdminToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
}

export function setAdminToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

export function clearAdminToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
  }
}

function getAuthHeaders(): HeadersInit {
  const token = getAdminToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

export const portfolioApi = {
  // Auth API
  async login(email: string, password: string): Promise<{ token: string; user: any }> {
    const res = await fetch(getApiEndpoint("/api/auth/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || "Login failed");
    if (data.token) {
      setAdminToken(data.token);
    }
    return { token: data.token, user: data.user };
  },

  async verifySession(): Promise<any> {
    const res = await fetch(getApiEndpoint("/api/auth/verify"), {
      headers: getAuthHeaders(),
      credentials: "include",
      cache: "no-store",
    });
    const data = await res.json();
    if (!data.success) {
      clearAdminToken();
      throw new Error(data.error || "Session invalid");
    }
    return data.user;
  },

  async logout(): Promise<void> {
    try {
      await fetch(getApiEndpoint("/api/auth/logout"), {
        method: "POST",
        headers: getAuthHeaders(),
        credentials: "include",
      });
    } finally {
      clearAdminToken();
    }
  },

  // Profile API
  async getProfile(): Promise<Profile> {
    const res = await fetch(getApiEndpoint("/api/profile"), {
      cache: "no-store",
      headers: getAuthHeaders(),
      credentials: "include",
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || "Failed to load profile");
    return data.data;
  },

  async updateProfile(profileData: Partial<Profile>): Promise<Profile> {
    const res = await fetch(getApiEndpoint("/api/profile"), {
      method: "PUT",
      headers: getAuthHeaders(),
      credentials: "include",
      body: JSON.stringify(profileData),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || "Failed to update profile");
    return data.data;
  },

  // Projects API
  async getProjects(): Promise<Project[]> {
    const res = await fetch(getApiEndpoint("/api/projects"), {
      cache: "no-store",
      headers: getAuthHeaders(),
      credentials: "include",
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || "Failed to load projects");
    return data.data.map((p: any) => ({
      ...p,
      techStackList: p.techStack ? p.techStack.split(",").map((s: string) => s.trim()).filter(Boolean) : [],
      highlightsList: (() => {
        try {
          return typeof p.highlights === "string" ? JSON.parse(p.highlights) : p.highlights;
        } catch {
          return p.highlights ? [p.highlights] : [];
        }
      })(),
    }));
  },

  async saveProject(projectData: Partial<Project>): Promise<Project> {
    const isNew = !projectData.id;
    const res = await fetch(getApiEndpoint("/api/projects"), {
      method: isNew ? "POST" : "PUT",
      headers: getAuthHeaders(),
      credentials: "include",
      body: JSON.stringify(projectData),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || "Failed to save project");
    return data.data;
  },

  async deleteProject(id: number | string): Promise<any> {
    const res = await fetch(getApiEndpoint(`/api/projects?id=${id}`), {
      method: "DELETE",
      headers: getAuthHeaders(),
      credentials: "include",
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || "Failed to delete project");
    return data;
  },

  // Experience API
  async getExperience(): Promise<Experience[]> {
    const res = await fetch(getApiEndpoint("/api/experience"), {
      cache: "no-store",
      headers: getAuthHeaders(),
      credentials: "include",
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || "Failed to load experience");
    return data.data.map((exp: any) => ({
      ...exp,
      subsectionsList: (() => {
        try {
          return typeof exp.subsections === "string" ? JSON.parse(exp.subsections) : exp.subsections;
        } catch {
          return [];
        }
      })(),
    }));
  },

  async saveExperience(expData: Partial<Experience>): Promise<Experience> {
    const isNew = !expData.id;
    const res = await fetch(getApiEndpoint("/api/experience"), {
      method: isNew ? "POST" : "PUT",
      headers: getAuthHeaders(),
      credentials: "include",
      body: JSON.stringify(expData),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || "Failed to save experience");
    return data.data;
  },

  async deleteExperience(id: number | string): Promise<any> {
    const res = await fetch(getApiEndpoint(`/api/experience?id=${id}`), {
      method: "DELETE",
      headers: getAuthHeaders(),
      credentials: "include",
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || "Failed to delete experience");
    return data;
  },

  // Skills API
  async getSkills(): Promise<SkillCategory[]> {
    const res = await fetch(getApiEndpoint("/api/skills"), {
      cache: "no-store",
      headers: getAuthHeaders(),
      credentials: "include",
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || "Failed to load skills");
    return data.data.map((sc: any) => ({
      ...sc,
      skillsList: sc.skills ? sc.skills.split(",").map((s: string) => s.trim()).filter(Boolean) : [],
    }));
  },

  async saveSkill(skillData: Partial<SkillCategory>): Promise<SkillCategory> {
    const isNew = !skillData.id;
    const res = await fetch(getApiEndpoint("/api/skills"), {
      method: isNew ? "POST" : "PUT",
      headers: getAuthHeaders(),
      credentials: "include",
      body: JSON.stringify(skillData),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || "Failed to save skill category");
    return data.data;
  },

  async deleteSkill(id: number | string): Promise<any> {
    const res = await fetch(getApiEndpoint(`/api/skills?id=${id}`), {
      method: "DELETE",
      headers: getAuthHeaders(),
      credentials: "include",
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || "Failed to delete skill category");
    return data;
  },

  // Education API
  async getEducation(): Promise<Education[]> {
    const res = await fetch(getApiEndpoint("/api/education"), {
      cache: "no-store",
      headers: getAuthHeaders(),
      credentials: "include",
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || "Failed to load education");
    return data.data;
  },

  async saveEducation(eduData: Partial<Education>): Promise<Education> {
    const isNew = !eduData.id;
    const res = await fetch(getApiEndpoint("/api/education"), {
      method: isNew ? "POST" : "PUT",
      headers: getAuthHeaders(),
      credentials: "include",
      body: JSON.stringify(eduData),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || "Failed to save education");
    return data.data;
  },

  async deleteEducation(id: number | string): Promise<any> {
    const res = await fetch(getApiEndpoint(`/api/education?id=${id}`), {
      method: "DELETE",
      headers: getAuthHeaders(),
      credentials: "include",
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || "Failed to delete education");
    return data;
  },
};
