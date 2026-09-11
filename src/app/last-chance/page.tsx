import { getSaleProducts } from "@/lib/products";
import CollectionHeader from "@/components/CollectionHeader";
import CategoryProductGrid from "@/components/CategoryProductGrid";

export const metadata = { title: "Last Chance — LumierModest" };
export const revalidate = 60;

export default async function LastChancePage() {
  const saleProducts = await getSaleProducts();

  return (
    <div className="bg-espresso">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <CollectionHeader
          eyebrow="Final Stock"
          title="last chance"
          subtitle="A final opportunity to claim the pieces you loved — before they leave the collection for good."
          dark
        />
        {saleProducts.length === 0 ? (
          <p className="py-16 text-center font-sans text-sm text-cream/60">
            Nothing on sale right now — check back soon.
          </p>
        ) : (
          <CategoryProductGrid products={saleProducts} dark />
        )}
      </div>
    </div>
  );
}
