// src/app/models/experience.ts
// Experience Database Model (Shipowl-style)

import { prisma } from "@/lib/prisma";

export async function getAllExperiencesModel() {
  return await prisma.experience.findMany({
    orderBy: { order: "asc" },
  });
}

export async function getExperienceByIdModel(id: number) {
  return await prisma.experience.findUnique({
    where: { id },
  });
}

export async function createExperienceModel(data: {
  company: string;
  location: string;
  role: string;
  period: string;
  type: string;
  subsections: string;
  order?: number;
}) {
  const count = await prisma.experience.count();
  return await prisma.experience.create({
    data: {
      company: data.company,
      location: data.location,
      role: data.role,
      period: data.period,
      type: data.type,
      subsections: data.subsections,
      order: data.order ?? count,
    },
  });
}

export async function updateExperienceModel(
  id: number,
  data: Partial<{
    company: string;
    location: string;
    role: string;
    period: string;
    type: string;
    subsections: string;
    order: number;
  }>
) {
  return await prisma.experience.update({
    where: { id },
    data,
  });
}

export async function deleteExperienceModel(id: number) {
  return await prisma.experience.delete({
    where: { id },
  });
}
