// src/lib/prisma.ts
// Global PrismaClient Singleton (Shipowl-style)

import { PrismaClient } from "@prisma/client";
import { getActiveDatabaseUrl } from "@/utils/dbConfig";

const connectionUrl = getActiveDatabaseUrl();

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: connectionUrl,
      },
    },
    log:
      process.env.NODE_ENV === "development"
        ? ["warn", "error"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
