"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/admin";

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type FormState = { error: string } | null;

function readCategoryForm(formData: FormData) {
  return {
    name: (formData.get("name") as string)?.trim(),
    subtitle: (formData.get("subtitle") as string)?.trim() || null,
    sortOrder: Number(formData.get("sortOrder")) || 0,
  };
}

export async function createCategory(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAdmin();
  const data = readCategoryForm(formData);

  if (!data.name) {
    return { error: "Please enter a category name." };
  }

  const slug = slugify(data.name);
  const existing = await prisma.category.findUnique({ where: { slug } });
  if (existing) {
    return { error: "A category with this name already exists." };
  }

  await prisma.category.create({
    data: { slug, name: data.name, subtitle: data.subtitle, sortOrder: data.sortOrder },
  });

  revalidatePath("/");
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function updateCategory(
  id: string,
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAdmin();
  const data = readCategoryForm(formData);

  if (!data.name) {
    return { error: "Please enter a category name." };
  }

  const category = await prisma.category.update({
    where: { id },
    data: { name: data.name, subtitle: data.subtitle, sortOrder: data.sortOrder },
  });

  revalidatePath("/");
  revalidatePath(`/${category.slug}`);
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function deleteCategory(
  id: string
): Promise<{ error: string } | { success: true }> {
  await requireAdmin();

  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) return { error: "Category not found." };

  const productCount = await prisma.product.count({
    where: { category: category.slug },
  });
  if (productCount > 0) {
    return {
      error: `Can't delete "${category.name}" — it still has ${productCount} product${productCount === 1 ? "" : "s"} in it. Move or delete those first.`,
    };
  }

  await prisma.category.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/admin/categories");
  return { success: true };
}
