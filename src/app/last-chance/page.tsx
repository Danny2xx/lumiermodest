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
          title="Last chance"
          subtitle="The last of a piece, at a lower price. When these are gone we don't usually make them again."
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
