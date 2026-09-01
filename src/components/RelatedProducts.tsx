import { Product } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function RelatedProducts({
  products,
}: {
  products: Product[];
}) {
  if (products.length === 0) return null;

  return (
    <div className="mx-auto max-w-6xl px-6 pb-16">
      <h2 className="mb-8 font-serif italic text-2xl text-taupe-dark">
        You might also like
      </h2>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
