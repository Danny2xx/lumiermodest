import Link from "next/link";
import { Product } from "@/lib/products";
import PlaceholderImage from "./PlaceholderImage";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <PlaceholderImage
        swatch={product.swatch}
        className="aspect-[3/4] w-full transition-opacity group-hover:opacity-90"
      />
      <div className="mt-3 text-center">
        <p className="font-serif text-lg text-espresso">{product.name}</p>
        <p className="font-sans text-sm text-espresso/70">
          {product.originalPrice && (
            <span className="mr-2 line-through text-espresso/40">
              £{product.originalPrice.toFixed(2)}
            </span>
          )}
          £{product.price.toFixed(2)} GBP
        </p>
      </div>
    </Link>
  );
}
