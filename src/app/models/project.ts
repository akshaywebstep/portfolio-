// src/app/models/project.ts
// Project Database Model (Shipowl-style)

import { prisma } from "@/lib/prisma";

export async function getAllProjectsModel() {
  return await prisma.project.findMany({
    orderBy: { order: "asc" },
  });
}

export async function getProjectByIdModel(id: number) {
  return await prisma.project.findUnique({
    where: { id },
  });
}

export async function createProjectModel(data: {
  title: string;
  tagline: string;
  category: string;
  techStack: string;
  metrics?: string | null;
  highlights: string;
  architectureNotes?: string | null;
  order?: number;
}) {
  const count = await prisma.project.count();
  return await prisma.project.create({
    data: {
      title: data.title,
      tagline: data.tagline,
      category: data.category,
      techStack: data.techStack,
      metrics: data.metrics || null,
      highlights: data.highlights,
      architectureNotes: data.architectureNotes || null,
      order: data.order ?? count,
    },
  });
}

export async function updateProjectModel(
  id: number,
  data: Partial<{
    title: string;
    tagline: string;
    category: string;
    techStack: string;
    metrics: string | null;
    highlights: string;
    architectureNotes: string | null;
    order: number;
  }>
) {
  return await prisma.project.update({
    where: { id },
    data,
  });
}

export async function deleteProjectModel(id: number) {
  return await prisma.project.delete({
    where: { id },
  });
}
