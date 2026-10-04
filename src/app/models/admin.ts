// src/app/models/admin.ts
// Admin Database Model (Shipowl-style)

import { prisma } from "@/lib/prisma";
import { hashPassword, comparePassword } from "@/utils/auth/authUtils";
import { logMessage } from "@/utils/commonUtils";

/**
 * Ensures at least one admin exists in the database.
 * If no admin exists, creates default admin using ADMIN_EMAIL and ADMIN_PASSWORD from .env
 */
export async function ensureDefaultAdmin() {
  try {
    const adminCount = await prisma.admin.count();
    if (adminCount === 0) {
      const defaultEmail = process.env.ADMIN_EMAIL || "admin@portfolio.com";
      const defaultPassword = process.env.ADMIN_PASSWORD || "adminpassword123";
      const hashedPassword = await hashPassword(defaultPassword);

      const newAdmin = await prisma.admin.create({
        data: {
          email: defaultEmail,
          password: hashedPassword,
          name: "Akshay Kumar",
          role: "admin",
        },
      });

      logMessage("info", `Default admin created in database: ${newAdmin.email}`);
      return newAdmin;
    }
  } catch (error) {
    logMessage("error", "Error verifying/creating default admin:", error);
  }
}

export async function findAdminByEmail(email: string) {
  await ensureDefaultAdmin();
  return await prisma.admin.findUnique({
    where: { email: email.trim().toLowerCase() },
  });
}

export async function validateAdminCredentials(email: string, plainPassword: string) {
  await ensureDefaultAdmin();

  const admin = await prisma.admin.findUnique({
    where: { email: email.trim().toLowerCase() },
  });

  if (!admin) {
    // Fallback: check against .env variables if DB record hasn't synced yet
    const envEmail = (process.env.ADMIN_EMAIL || "admin@portfolio.com").toLowerCase();
    const envPassword = process.env.ADMIN_PASSWORD || "adminpassword123";
    if (email.trim().toLowerCase() === envEmail && plainPassword === envPassword) {
      return {
        id: 1,
        email: envEmail,
        name: "Akshay Kumar",
        role: "admin",
      };
    }
    return null;
  }

  const isMatch = await comparePassword(plainPassword, admin.password);
  if (!isMatch) {
    return null;
  }

  return {
    id: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
  };
}
