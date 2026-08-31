import { products } from "@/lib/products";
import ProductCard from "./ProductCard";
import Flourish from "./Flourish";

export default function FeaturedGrid() {
  const featured = products.slice(0, 3);

  return (
    <section className="bg-blush py-16">
      <Flourish className="mb-6" />
      <p className="mb-10 text-center font-serif italic text-3xl text-taupe-dark sm:text-4xl">
        For the days worth dressing up for
      </p>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 sm:grid-cols-3">
        {featured.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
