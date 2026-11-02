import { getAllProducts } from "@/lib/products";
import ProductCard from "./ProductCard";
import Flourish from "./Flourish";
import Reveal from "./motion/Reveal";
import SplitText from "./motion/SplitText";
import { Stagger, StaggerItem } from "./motion/Stagger";

export default async function FeaturedGrid() {
  const products = await getAllProducts();
  const featured = products.slice(0, 3);

  return (
    <section className="bg-blush py-16">
      <Reveal variant="fade">
        <Flourish className="mb-6" draw />
      </Reveal>
      <SplitText
        text="For the days worth dressing up for"
        as="p"
        stagger={0.05}
        className="mb-10 px-6 text-center font-serif italic text-3xl text-taupe-dark sm:text-4xl"
      />
      <Stagger className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 sm:grid-cols-3">
        {featured.map((p) => (
          <StaggerItem key={p.id}>
            <ProductCard product={p} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
