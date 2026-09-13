import { existsSync } from "node:fs";
import { defineConfig, env } from "@prisma/config";

// Vercel (and other hosts) inject env vars directly — there's no .env.local
// file to read there, so only load it when it actually exists (local dev).
if (existsSync(".env.local")) {
  process.loadEnvFile(".env.local");
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DIRECT_URL"),
  },
  migrations: {
    seed: "npx tsx prisma/seed.ts",
  },
});
