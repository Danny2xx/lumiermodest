import Link from "next/link";
import { prisma } from "@/lib/db";
import { getAllCategories } from "@/lib/categories";
import DeleteCategoryButton from "./DeleteCategoryButton";

export const metadata = { title: "Categories — Admin" };

export default async function CategoriesPage() {
  const categories = await getAllCategories();
  const counts = await prisma.product.groupBy({
    by: ["category"],
    _count: true,
  });
  const countBySlug = new Map(counts.map((c) => [c.category, c._count]));

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl text-taupe-dark">Categories</h1>
        <Link
          href="/admin/categories/new"
          className="bg-taupe-dark px-6 py-2.5 font-sans text-xs uppercase tracking-[0.18em] text-cream transition-all duration-200 hover:scale-[1.02] hover:bg-espresso"
        >
          + Add Category
        </Link>
      </div>

      <div className="mt-8 divide-y divide-taupe/15 border-y border-taupe/15">
        {categories.length === 0 && (
          <p className="py-10 text-center font-sans text-sm text-espresso/60">
            No categories yet.
          </p>
        )}
        {categories.map((c) => (
          <div key={c.id} className="flex items-center gap-4 py-4">
            <div className="flex-1">
              <p className="font-serif text-lg text-espresso">{c.name}</p>
              <p className="font-sans text-xs uppercase tracking-wide text-espresso/50">
                /{c.slug} · {countBySlug.get(c.slug) ?? 0} product
                {(countBySlug.get(c.slug) ?? 0) === 1 ? "" : "s"}
              </p>
            </div>
            <Link
              href={`/admin/categories/${c.id}/edit`}
              className="font-sans text-xs uppercase tracking-wide text-espresso/70 underline hover:text-gold"
            >
              Edit
            </Link>
            <DeleteCategoryButton id={c.id} name={c.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
