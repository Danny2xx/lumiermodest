import Link from "next/link";
import { Product } from "@/lib/products";
import PlaceholderImage from "./PlaceholderImage";

export default function ProductCard({
  product,
  dark = false,
}: {
  product: Product;
  dark?: boolean;
}) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative">
        <PlaceholderImage
          swatch={product.swatch}
          className={`aspect-[3/4] w-full transition-opacity group-hover:opacity-90 ${
            !product.inStock ? "opacity-60" : ""
          }`}
        />
        {!product.inStock && (
          <span className="absolute left-3 top-3 bg-espresso px-2 py-1 font-sans text-[10px] uppercase tracking-[0.14em] text-cream">
            Sold Out
          </span>
        )}
      </div>
      <div className="mt-3 text-center">
        <p className={`font-serif text-lg ${dark ? "text-cream" : "text-espresso"}`}>
          {product.name}
        </p>
        <p className={`font-sans text-sm ${dark ? "text-cream/70" : "text-espresso/70"}`}>
          {product.originalPrice && (
            <span
              className={`mr-2 line-through ${dark ? "text-cream/40" : "text-espresso/40"}`}
            >
              £{product.originalPrice.toFixed(2)}
            </span>
          )}
          £{product.price.toFixed(2)} GBP
        </p>
      </div>
    </Link>
  );
}
