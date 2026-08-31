import { getSaleProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export const metadata = { title: "Last Chance — LumierModest" };

export default function LastChancePage() {
  const saleProducts = getSaleProducts();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-2 text-center font-serif text-4xl text-taupe-dark">
        Last Chance
      </h1>
      <p className="mb-10 text-center font-sans text-sm text-espresso/60">
        Final stock, final sale — while it lasts.
      </p>
      {saleProducts.length === 0 ? (
        <p className="text-center font-sans text-sm text-espresso/60">
          Nothing on sale right now — check back soon.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {saleProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
