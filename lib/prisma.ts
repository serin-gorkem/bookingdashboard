import { PrismaClient } from "./generated/prisma/client"; // output path

declare global {
  // Hot reload sırasında multiple instance önleme
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: ["query", "info", "warn", "error"], // Log güncellemesi
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
