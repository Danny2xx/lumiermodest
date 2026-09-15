import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/lib/categories";
import { getProductsByCategory } from "@/lib/products";
import CollectionHeader from "@/components/CollectionHeader";
import CategoryProductGrid from "@/components/CategoryProductGrid";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  return { title: `${category.name} — LumierModest` };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const products = await getProductsByCategory(category.slug);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <CollectionHeader
        eyebrow="The Collection"
        title={category.name.toLowerCase()}
        subtitle={category.subtitle ?? ""}
      />
      {products.length === 0 ? (
        <p className="py-16 text-center font-sans text-sm text-espresso/60">
          Nothing here yet — check back soon.
        </p>
      ) : (
        <CategoryProductGrid products={products} />
      )}
    </div>
  );
}
