// src/app/models/education.ts
// Education Database Model (Shipowl-style)

import { prisma } from "@/lib/prisma";

export async function getAllEducationModel() {
  return await prisma.education.findMany({
    orderBy: { order: "asc" },
  });
}

export async function createEducationModel(data: {
  degree: string;
  institution: string;
  year: string;
  score: string;
  order?: number;
}) {
  const count = await prisma.education.count();
  return await prisma.education.create({
    data: {
      degree: data.degree,
      institution: data.institution,
      year: data.year,
      score: data.score,
      order: data.order ?? count,
    },
  });
}

export async function updateEducationModel(
  id: number,
  data: Partial<{
    degree: string;
    institution: string;
    year: string;
    score: string;
    order: number;
  }>
) {
  return await prisma.education.update({
    where: { id },
    data,
  });
}

export async function deleteEducationModel(id: number) {
  return await prisma.education.delete({
    where: { id },
  });
}
