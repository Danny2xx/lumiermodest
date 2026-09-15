import { prisma } from "./db";
import type { Product as DbProduct } from "@prisma/client";

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  description: string;
  fabric: string;
  care: string;
  sizes: string[];
  swatch: [string, string];
  inStock: boolean;
  images?: string[];
};

function toProduct(p: DbProduct): Product {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: Number(p.price),
    originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
    category: p.category,
    description: p.description,
    fabric: p.fabric,
    care: p.care,
    sizes: p.sizes,
    swatch: [p.swatchStart, p.swatchEnd],
    inStock: p.inStock,
    images: p.images.length > 0 ? p.images : undefined,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({ orderBy: { createdAt: "asc" } });
  return rows.map(toProduct);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { category },
    orderBy: { createdAt: "asc" },
  });
  return rows.map(toProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const row = await prisma.product.findUnique({ where: { slug } });
  return row ? toProduct(row) : null;
}

export async function getSaleProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { originalPrice: { not: null } },
    orderBy: { createdAt: "asc" },
  });
  return rows.map(toProduct);
}

export async function getRelatedProducts(product: Product, count = 3): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { category: product.category, id: { not: product.id } },
    orderBy: { createdAt: "asc" },
    take: count,
  });
  return rows.map(toProduct);
}
