import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

const BASE_URL = "https://lumiermodest.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await prisma.product.findMany({
    select: { slug: true, updatedAt: true },
  });

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/abayas`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/hijabs`, changeFrequency: "daily", priority: 0.9 },
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

  return [...staticPages, ...productPages];
}
