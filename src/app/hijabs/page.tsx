import { getProductsByCategory } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export const metadata = { title: "Hijabs — LumierModest" };

export default function HijabsPage() {
  const hijabs = getProductsByCategory("hijabs");

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-10 text-center font-serif text-4xl text-taupe-dark">
        Hijabs
      </h1>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {hijabs.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
