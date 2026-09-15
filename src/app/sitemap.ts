import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { getAllCategories } from "@/lib/categories";

const BASE_URL = "https://lumiermodest.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({ select: { slug: true, updatedAt: true } }),
    getAllCategories(),
  ]);

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${BASE_URL}/${c.slug}`,
    changeFrequency: "daily",
    priority: 0.9,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/last-chance`, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE_URL}/sizing`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE_URL}/shipping`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/returns`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/products/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}
