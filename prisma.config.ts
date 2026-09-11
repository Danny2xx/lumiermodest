import { defineConfig, env } from "@prisma/config";

process.loadEnvFile(".env.local");

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DIRECT_URL"),
  },
  migrations: {
    seed: "npx tsx prisma/seed.ts",
  },
});
