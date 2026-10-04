// Shared TypeScript Definitions (Shipowl-style)

export interface Profile {
  id: number;
  name: string;
  role: string;
  subtitles: string;
  email: string;
  phone: string;
  location: string;
  address: string;
  availability: string;
  dob: string;
  languages: string;
  summary: string;
  updatedAt?: Date;
}

export interface Project {
  id: number;
  title: string;
  tagline: string;
  category: string;
  techStack: string;
  metrics?: string | null;
  highlights: string;
  architectureNotes?: string | null;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
  techStackList?: string[];
  highlightsList?: string[];
}

export interface ExperienceSubsection {
  title: string;
  points: string[];
}

export interface Experience {
  id: number;
  company: string;
  location: string;
  role: string;
  period: string;
  type: string;
  subsections: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
  subsectionsList?: ExperienceSubsection[];
}

export interface SkillCategory {
  id: number;
  name: string;
  icon: string;
  skills: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
  skillsList?: string[];
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  year: string;
  score: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
