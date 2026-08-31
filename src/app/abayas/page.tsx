import { getProductsByCategory } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export const metadata = { title: "Abayas — LumierModest" };

export default function AbayasPage() {
  const abayas = getProductsByCategory("abayas");

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-10 text-center font-serif text-4xl text-taupe-dark">
        Abayas
      </h1>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {abayas.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
