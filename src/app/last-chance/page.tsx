import { getSaleProducts } from "@/lib/products";
import CollectionHeader from "@/components/CollectionHeader";
import CategoryProductGrid from "@/components/CategoryProductGrid";

export const metadata = { title: "Last Chance — LumierModest" };

export default function LastChancePage() {
  const saleProducts = getSaleProducts();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <CollectionHeader
        eyebrow="Final Stock"
        title="last chance"
        subtitle="Final stock, final sale — while it lasts."
      />
      {saleProducts.length === 0 ? (
        <p className="py-16 text-center font-sans text-sm text-espresso/60">
          Nothing on sale right now — check back soon.
        </p>
      ) : (
        <CategoryProductGrid products={saleProducts} />
      )}
    </div>
  );
}
