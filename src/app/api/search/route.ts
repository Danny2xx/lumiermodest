import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAllCategories } from "@/lib/categories";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  const categories = await getAllCategories();
  const qLower = q.toLowerCase();
  const matchedCategory = categories.find(
    (c) =>
      c.name.toLowerCase().includes(qLower) || c.slug.includes(qLower)
  );

  const rows = await prisma.product.findMany({
    where: matchedCategory
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { category: matchedCategory.slug },
          ],
        }
      : { name: { contains: q, mode: "insensitive" } },
    take: 10,
    orderBy: { createdAt: "asc" },
  });

  const results = rows.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: Number(p.price),
  }));

  return NextResponse.json({ results });
}
