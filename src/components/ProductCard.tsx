import Link from "next/link";
import { Product } from "@/lib/products";
import ProductImage from "./ProductImage";
import WishlistButton from "./WishlistButton";

const SIZES = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

export default function ProductCard({
  product,
  dark = false,
}: {
  product: Product;
  dark?: boolean;
}) {
  const [primary, secondary] = product.images ?? [];

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <div className={`absolute inset-0 ${!product.inStock ? "opacity-60" : ""}`}>
          <ProductImage
            src={primary}
            swatch={product.swatch}
            alt={product.name}
            sizes={SIZES}
            zoom
            className="h-full w-full"
          />
          {secondary && (
            <div
              aria-hidden
              className="absolute inset-0 opacity-0 transition-opacity duration-700 ease-luxe group-hover:opacity-100"
            >
              <ProductImage
                src={secondary}
                swatch={product.swatch}
                alt=""
                sizes={SIZES}
                zoom
                className="h-full w-full"
              />
            </div>
          )}
        </div>

        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-full justify-center opacity-0 transition-all duration-500 ease-luxe group-hover:translate-y-0 group-hover:opacity-100"
        >
          <span className="mb-4 bg-cream/90 px-5 py-2 font-sans text-[10px] uppercase tracking-[0.2em] text-espresso backdrop-blur-sm">
            View Piece
          </span>
        </span>

        {!product.inStock && (
          <span className="absolute left-3 top-3 bg-espresso px-2 py-1 font-sans text-[10px] uppercase tracking-[0.14em] text-cream">
            Sold out
          </span>
        )}
        <WishlistButton product={product} className="absolute right-3 top-3" />
      </div>
      <div className="mt-3 text-center">
        <p
          className={`font-serif text-lg transition-colors duration-300 ${
            dark
              ? "text-cream group-hover:text-gold"
              : "text-espresso group-hover:text-taupe-dark"
          }`}
        >
          {product.name}
        </p>
        <p className={`font-sans text-sm ${dark ? "text-cream/70" : "text-espresso/80"}`}>
          {product.originalPrice && (
            <span
              className={`mr-2 line-through ${dark ? "text-cream/70" : "text-espresso/80"}`}
            >
              £{product.originalPrice.toFixed(2)}
            </span>
          )}
          £{product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
