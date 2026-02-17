import { env } from "@/env";
import { PrismaClient } from "../../generated/prisma";

const createPrismaClient = (datasourceUrl: string) =>
  new PrismaClient({
    datasourceUrl,
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db: PrismaClient | null = env.DATABASE_URL
  ? globalForPrisma.prisma ?? createPrismaClient(env.DATABASE_URL)
  : null;

if (env.NODE_ENV !== "production" && db) globalForPrisma.prisma = db;
