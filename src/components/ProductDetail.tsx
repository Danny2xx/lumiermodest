"use client";

import { useState } from "react";
import { Product } from "@/lib/products";
import { useCart } from "./CartContext";
import PlaceholderImage from "./PlaceholderImage";

export default function ProductDetail({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-2">
      <div className="relative">
        <PlaceholderImage
          swatch={product.swatch}
          className={`aspect-[3/4] w-full ${!product.inStock ? "opacity-60" : ""}`}
        />
        {!product.inStock && (
          <span className="absolute left-4 top-4 bg-espresso px-3 py-1 font-sans text-xs uppercase tracking-[0.14em] text-cream">
            Sold Out
          </span>
        )}
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
        <p className="mt-6 font-sans text-sm leading-relaxed text-espresso/80">
          {product.description}
        </p>

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

        {product.inStock ? (
          <button
            onClick={() => {
              addItem(product, size);
              setAdded(true);
              setTimeout(() => setAdded(false), 1500);
            }}
            className="mt-8 w-full bg-taupe-dark py-4 font-sans text-xs uppercase tracking-[0.18em] text-cream transition-colors hover:bg-espresso sm:w-auto sm:px-12"
          >
            {added ? "Added to Bag" : "Add to Bag"}
          </button>
        ) : (
          <button
            disabled
            className="mt-8 w-full cursor-not-allowed border border-taupe/30 py-4 font-sans text-xs uppercase tracking-[0.18em] text-espresso/40 sm:w-auto sm:px-12"
          >
            Sold Out
          </button>
        )}

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
      </div>
    </div>
  );
}
