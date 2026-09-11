import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const CATEGORIES = ["abayas", "hijabs"] as const;

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  const matchedCategory = CATEGORIES.find((c) => c.includes(q.toLowerCase()));

  const rows = await prisma.product.findMany({
    where: matchedCategory
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { category: matchedCategory },
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
