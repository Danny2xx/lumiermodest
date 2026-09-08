"use client";

import { useState } from "react";
import { Product } from "@/lib/products";
import { useCart } from "./CartContext";
import ProductImage from "./ProductImage";
import Accordion from "./Accordion";
import WishlistButton from "./WishlistButton";

const PLACEHOLDER_ANGLES = [150, 100, 200];

export default function ProductDetail({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);
  const [view, setView] = useState(0);
  const { addItem } = useCart();

  const views =
    product.images && product.images.length > 0
      ? product.images.map((src) => ({ src, angle: undefined as number | undefined }))
      : PLACEHOLDER_ANGLES.map((angle) => ({ src: undefined, angle }));

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-2">
      <div>
        <div className="relative">
          <ProductImage
            src={views[view].src}
            swatch={product.swatch}
            angle={views[view].angle}
            alt={product.name}
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className={`aspect-[3/4] w-full ${!product.inStock ? "opacity-60" : ""}`}
          />
          {!product.inStock && (
            <span className="absolute left-4 top-4 bg-espresso px-3 py-1 font-sans text-xs uppercase tracking-[0.14em] text-cream">
              Sold Out
            </span>
          )}
        </div>
        <div className="mt-3 flex gap-3">
          {views.map((v, i) => (
            <button
              key={i}
              onClick={() => setView(i)}
              aria-label={`View ${i + 1}`}
              className={`h-20 w-16 flex-shrink-0 border transition-colors ${
                view === i ? "border-taupe-dark" : "border-transparent"
              }`}
            >
              <ProductImage
                src={v.src}
                swatch={product.swatch}
                angle={v.angle}
                alt=""
                sizes="64px"
                className="h-full w-full"
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <h1 className="font-serif text-4xl text-taupe-dark">
          {product.name}
        </h1>
        <p className="mt-2 font-sans text-lg text-espresso/80">
          {product.originalPrice && (
            <span className="mr-2 line-through text-espresso/40">
              £{product.originalPrice.toFixed(2)}
            </span>
          )}
          £{product.price.toFixed(2)} GBP
        </p>

        {product.category === "abayas" && (
          <p className="mt-1 font-sans text-xs text-espresso/50">
            Model is 5&apos;6&quot; (168cm) and wears size M.
          </p>
        )}

        <div className="mt-8">
          <p className="mb-2 font-sans text-xs uppercase tracking-[0.18em] text-espresso/60">
            Size
          </p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`border px-4 py-2 font-sans text-sm transition-colors ${
                  size === s
                    ? "border-taupe-dark bg-taupe-dark text-cream"
                    : "border-taupe/30 text-espresso hover:border-taupe"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3">
          {product.inStock ? (
            <button
              onClick={() => {
                addItem(product, size);
                setAdded(true);
                setTimeout(() => setAdded(false), 1500);
              }}
              className="flex-1 bg-taupe-dark py-4 font-sans text-xs uppercase tracking-[0.18em] text-cream transition-all duration-200 hover:scale-[1.02] hover:bg-espresso sm:flex-none sm:px-12"
            >
              {added ? "Added to Bag" : "Add to Bag"}
            </button>
          ) : (
            <button
              disabled
              className="flex-1 cursor-not-allowed border border-taupe/30 py-4 font-sans text-xs uppercase tracking-[0.18em] text-espresso/40 sm:flex-none sm:px-12"
            >
              Sold Out
            </button>
          )}
          <WishlistButton
            slug={product.slug}
            variant="bare"
            className="h-[52px] w-[52px] flex-shrink-0 border border-taupe/30"
          />
        </div>

        <p className="mt-6 font-sans text-xs text-espresso/50">
          Free UK shipping on orders over £75. See our{" "}
          <a href="/shipping" className="underline">
            shipping policy
          </a>{" "}
          and{" "}
          <a href="/sizing" className="underline">
            sizing guide
          </a>
          .
        </p>

        <div className="mt-8">
          <Accordion title="Description" defaultOpen>
            <p>{product.description}</p>
          </Accordion>
          <Accordion title="Fabric">
            <p>{product.fabric}</p>
          </Accordion>
          <Accordion title="Care">
            <p>{product.care}</p>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
