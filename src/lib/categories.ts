import { prisma } from "./db";

export type Category = {
  id: string;
  slug: string;
  name: string;
  subtitle: string | null;
  sortOrder: number;
};

export async function getAllCategories(): Promise<Category[]> {
  return prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return prisma.category.findUnique({ where: { slug } });
}
