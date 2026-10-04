// src/app/models/skill.ts
// Skill Database Model (Shipowl-style)

import { prisma } from "@/lib/prisma";

export async function getAllSkillCategoriesModel() {
  return await prisma.skillCategory.findMany({
    orderBy: { order: "asc" },
  });
}

export async function createSkillCategoryModel(data: {
  name: string;
  icon?: string;
  skills: string;
  order?: number;
}) {
  const count = await prisma.skillCategory.count();
  return await prisma.skillCategory.create({
    data: {
      name: data.name,
      icon: data.icon || "Code2",
      skills: data.skills,
      order: data.order ?? count,
    },
  });
}

export async function updateSkillCategoryModel(
  id: number,
  data: Partial<{
    name: string;
    icon: string;
    skills: string;
    order: number;
  }>
) {
  return await prisma.skillCategory.update({
    where: { id },
    data,
  });
}

export async function deleteSkillCategoryModel(id: number) {
  return await prisma.skillCategory.delete({
    where: { id },
  });
}
