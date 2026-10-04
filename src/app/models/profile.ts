// src/app/models/profile.ts
// Profile Database Model (Shipowl-style)

import { prisma } from "@/lib/prisma";

export async function getProfileModel() {
  let profile = await prisma.profile.findFirst({
    where: { id: 1 },
  });

  if (!profile) {
    profile = await prisma.profile.findFirst();
  }

  return profile;
}

export async function updateProfileModel(data: {
  name?: string;
  role?: string;
  subtitles?: string;
  email?: string;
  phone?: string;
  location?: string;
  address?: string;
  availability?: string;
  dob?: string;
  languages?: string;
  summary?: string;
}) {
  const existing = await prisma.profile.findFirst({ where: { id: 1 } });

  if (existing) {
    return await prisma.profile.update({
      where: { id: 1 },
      data,
    });
  } else {
    return await prisma.profile.create({
      data: {
        id: 1,
        name: data.name || "Akshay Kumar",
        role: data.role || "Backend Developer",
        subtitles: data.subtitles || "Node.js & Express.js, Laravel (PHP)",
        email: data.email || "kapilakshu848@gmail.com",
        phone: data.phone || "+91 7876060984",
        location: data.location || "Himachal Pradesh, India",
        address: data.address || "",
        availability: data.availability || "Immediate",
        dob: data.dob || "23 August 2002",
        languages: data.languages || "Hindi, English",
        summary: data.summary || "",
      },
    });
  }
}
