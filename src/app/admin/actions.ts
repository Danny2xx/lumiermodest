"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { put, del } from "@vercel/blob";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/admin";

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function revalidateStorefront(slug?: string) {
  revalidatePath("/");
  revalidatePath("/abayas");
  revalidatePath("/hijabs");
  revalidatePath("/last-chance");
  if (slug) revalidatePath(`/products/${slug}`);
}

export async function uploadProductImage(formData: FormData) {
  await requireAdmin();

  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) {
    return { error: "No file provided." };
  }
  if (!file.type.startsWith("image/")) {
    return { error: "Only image files are allowed." };
  }

  try {
    const blob = await put(`products/${Date.now()}-${file.name}`, file, {
      access: "public",
    });
    return { url: blob.url };
  } catch {
    return { error: "Upload failed. Please try again." };
  }
}

export async function deleteProductImage(url: string) {
  await requireAdmin();
  try {
    await del(url);
  } catch {
    // ignore — image may already be gone
  }
}

type ProductFormState = { error: string } | null;

function readProductForm(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const category = formData.get("category") as string;
  const price = Number(formData.get("price"));
  const originalPriceRaw = formData.get("originalPrice") as string;
  const originalPrice = originalPriceRaw ? Number(originalPriceRaw) : null;
  const description = (formData.get("description") as string)?.trim();
  const fabric = (formData.get("fabric") as string)?.trim();
  const care = (formData.get("care") as string)?.trim();
  const sizes = (formData.get("sizes") as string)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const inStock = formData.get("inStock") === "on";
  const images = formData.getAll("images") as string[];

  return {
    name,
    category,
    price,
    originalPrice,
    description,
    fabric,
    care,
    sizes,
    inStock,
    images: images.filter(Boolean),
  };
}

export async function createProduct(
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  await requireAdmin();
  const data = readProductForm(formData);

  if (!data.name || !data.category || !data.price || !data.description) {
    return { error: "Please fill in every required field." };
  }
  if (data.images.length === 0) {
    return { error: "Add at least one photo." };
  }

  const slug = slugify(data.name);
  const existing = await prisma.product.findUnique({ where: { slug } });
  if (existing) {
    return { error: "A product with this name already exists." };
  }

  await prisma.product.create({
    data: {
      slug,
      name: data.name,
      price: data.price,
      originalPrice: data.originalPrice,
      category: data.category as "abayas" | "hijabs",
      description: data.description,
      fabric: data.fabric,
      care: data.care,
      sizes: data.sizes,
      swatchStart: "#c9ad84",
      swatchEnd: "#5c4530",
      inStock: data.inStock,
      images: data.images,
    },
  });

  revalidateStorefront(slug);
  redirect("/admin");
}

export async function updateProduct(
  id: string,
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  await requireAdmin();
  const data = readProductForm(formData);

  if (!data.name || !data.category || !data.price || !data.description) {
    return { error: "Please fill in every required field." };
  }
  if (data.images.length === 0) {
    return { error: "Add at least one photo." };
  }

  const product = await prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      price: data.price,
      originalPrice: data.originalPrice,
      category: data.category as "abayas" | "hijabs",
      description: data.description,
      fabric: data.fabric,
      care: data.care,
      sizes: data.sizes,
      inStock: data.inStock,
      images: data.images,
    },
  });

  revalidateStorefront(product.slug);
  redirect("/admin");
}

export async function deleteProduct(id: string) {
  await requireAdmin();

  const product = await prisma.product.delete({ where: { id } });

  await Promise.allSettled(product.images.map((url) => del(url)));

  revalidateStorefront(product.slug);
}
