import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import ProductImage from "./ProductImage";

/**
 * This used to be a grid of colour swatches dressed up as an Instagram feed:
 * tapping one opened a fake post, complete with the brand's avatar and a
 * caption admitting it was "a placeholder for real customer photos". Now it
 * shows real pieces that link to their product pages, and the invitation to
 * follow is just an invitation.
 */
export default async function CommunityBand() {
  const products = (await getAllProducts()).slice(0, 6);
  if (products.length === 0) return null;

  return (
    <section>
      <div className="flex flex-col items-center gap-3 bg-sand px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <a
          href="https://instagram.com/lumiermodest"
          target="_blank"
          rel="noopener noreferrer"
          className="font-serif italic text-3xl text-taupe-dark transition-colors hover:text-gold-ink"
        >
          @lumiermodest
        </a>
        <p className="max-w-md font-sans text-sm text-espresso/80">
          New pieces, styling and the bits in between. Wearing yours? Tag us
          and we&apos;ll share it.
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="group relative block"
            aria-label={product.name}
          >
            <ProductImage
              src={product.images?.[0]}
              swatch={product.swatch}
              alt={product.name}
              sizes="(min-width: 640px) 17vw, 33vw"
              className="aspect-square w-full"
            />
            <span className="pointer-events-none absolute inset-0 bg-espresso/0 transition-colors group-hover:bg-espresso/20" />
          </Link>
        ))}
      </div>
    </section>
  );
}
