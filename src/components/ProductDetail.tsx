"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Product } from "@/lib/products";
import { useCart } from "./CartContext";
import ProductImage from "./ProductImage";
import Accordion from "./Accordion";
import WishlistButton from "./WishlistButton";
import { startCheckout } from "@/app/checkout/actions";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_RATES } from "@/lib/shipping";

const PLACEHOLDER_ANGLES = [150, 100, 200];
const money = (n: number) => `£${n.toFixed(2)}`;

export default function ProductDetail({ product }: { product: Product }) {
  // Only pre-chosen when there's genuinely nothing to choose, so nobody
  // buys an XS they never picked.
  const onlySize = product.sizes.length === 1 ? product.sizes[0] : null;
  const [size, setSize] = useState<string | null>(onlySize);
  const [needsSize, setNeedsSize] = useState(false);
  const [added, setAdded] = useState(false);
  const [buyError, setBuyError] = useState<string | null>(null);
  const [view, setView] = useState(0);
  const [isBuying, startBuying] = useTransition();
  const { addItem } = useCart();

  const views =
    product.images && product.images.length > 0
      ? product.images.map((src) => ({ src, angle: undefined as number | undefined }))
      : PLACEHOLDER_ANGLES.map((angle) => ({ src: undefined, angle }));

  const saving = product.originalPrice
    ? product.originalPrice - product.price
    : 0;

  const handleAdd = () => {
    if (!size) {
      setNeedsSize(true);
      return;
    }
    addItem(product, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    if (!size) {
      setNeedsSize(true);
      return;
    }
    setBuyError(null);
    startBuying(async () => {
      const result = await startCheckout([
        { slug: product.slug, size, qty: 1 },
      ]);
      if ("error" in result) {
        setBuyError(result.error);
        return;
      }
      window.location.href = result.url;
    });
  };

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
              Sold out
            </span>
          )}
        </div>
        {views.length > 1 && (
          <div className="mt-3 flex gap-3">
            {views.map((v, i) => (
              <button
                key={i}
                onClick={() => setView(i)}
                aria-label={`Show photo ${i + 1} of ${views.length}`}
                aria-pressed={view === i}
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
        )}
      </div>

      <div>
        <h1 className="font-serif text-4xl text-taupe-dark">{product.name}</h1>
        <p className="mt-2 font-sans text-lg text-espresso">
          {product.originalPrice && (
            <span className="mr-2 line-through text-espresso/80">
              {money(product.originalPrice)}
            </span>
          )}
          {money(product.price)}
          {saving > 0 && (
            <span className="ml-2 font-sans text-sm text-taupe-dark">
              Save {money(saving)}
            </span>
          )}
        </p>

        <div className="mt-8">
          <p
            id="size-label"
            className="mb-2 font-sans text-xs uppercase tracking-[0.18em] text-espresso"
          >
            {onlySize ? "Size" : "Choose your size"}
          </p>
          <div
            role="group"
            aria-labelledby="size-label"
            aria-describedby={needsSize ? "size-error" : undefined}
            className="flex flex-wrap gap-2"
          >
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setSize(s);
                  setNeedsSize(false);
                }}
                aria-pressed={size === s}
                className={`border px-4 py-2 font-sans text-sm transition-colors ${
                  size === s
                    ? "border-taupe-dark bg-taupe-dark text-cream"
                    : "border-taupe/40 text-espresso hover:border-taupe"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {needsSize && (
            <p
              id="size-error"
              role="alert"
              className="mt-2 font-sans text-sm text-red-700"
            >
              Pick a size first and we&apos;ll get this on its way.
            </p>
          )}
        </div>

        {product.inStock ? (
          <div className="mt-8">
            <div className="flex items-center gap-3">
              <button
                onClick={handleAdd}
                className="flex-1 bg-taupe-dark py-4 font-sans text-xs uppercase tracking-[0.18em] text-cream transition-all duration-200 hover:scale-[1.02] hover:bg-espresso"
              >
                {added ? "Added to bag" : "Add to bag"}
              </button>
              <WishlistButton
                product={product}
                variant="bare"
                className="h-[52px] w-[52px] flex-shrink-0 border border-taupe/40"
              />
            </div>
            <button
              onClick={handleBuyNow}
              disabled={isBuying}
              className="mt-3 w-full border border-taupe-dark py-4 font-sans text-xs uppercase tracking-[0.18em] text-taupe-dark transition-all duration-200 hover:bg-taupe-dark hover:text-cream disabled:opacity-60"
            >
              {isBuying ? "Taking you to payment…" : "Buy it now"}
            </button>
            {buyError && (
              <p role="alert" className="mt-2 font-sans text-sm text-red-700">
                {buyError}
              </p>
            )}
          </div>
        ) : (
          <div className="mt-8 flex items-center gap-3">
            <button
              disabled
              className="flex-1 cursor-not-allowed border border-taupe/40 py-4 font-sans text-xs uppercase tracking-[0.18em] text-espresso/80"
            >
              Sold out
            </button>
            <WishlistButton
              product={product}
              variant="bare"
              className="h-[52px] w-[52px] flex-shrink-0 border border-taupe/40"
            />
          </div>
        )}

        <div className="mt-6 space-y-1 font-sans text-xs text-espresso/80">
          <p>
            UK delivery {money(SHIPPING_RATES[0].amount)}, free over £
            {FREE_SHIPPING_THRESHOLD} — 3–5 working days.{" "}
            <Link href="/shipping" className="underline hover:text-gold-ink">
              Delivery details
            </Link>
          </p>
          <p>
            14 days to change your mind.{" "}
            <Link href="/returns" className="underline hover:text-gold-ink">
              Returns
            </Link>{" "}
            ·{" "}
            <Link href="/sizing" className="underline hover:text-gold-ink">
              Sizing guide
            </Link>
          </p>
        </div>

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
