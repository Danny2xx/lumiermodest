"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Product } from "@/lib/products";
import { useCart } from "./CartContext";
import ProductImage from "./ProductImage";
import Accordion from "./Accordion";
import WishlistButton from "./WishlistButton";
import Reveal from "./motion/Reveal";
import { Stagger, StaggerItem } from "./motion/Stagger";
import { EASE, SPRING } from "./motion/config";
import { startCheckout } from "@/app/checkout/actions";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_RATES } from "@/lib/shipping";

const PLACEHOLDER_ANGLES = [150, 100, 200];
const money = (n: number) => `£${n.toFixed(2)}`;

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

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
    setTimeout(() => setAdded(false), 1800);
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
      <Reveal mode="mount" variant="fade" duration={0.8}>
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-sand/60">
          <AnimatePresence initial={false}>
            <motion.div
              key={view}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <ProductImage
                src={views[view].src}
                swatch={product.swatch}
                angle={views[view].angle}
                alt={product.name}
                priority={view === 0}
                sizes="(min-width: 768px) 50vw, 100vw"
                className={`h-full w-full ${!product.inStock ? "opacity-60" : ""}`}
              />
            </motion.div>
          </AnimatePresence>
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
                className="group relative h-20 w-16 flex-shrink-0"
              >
                <ProductImage
                  src={v.src}
                  swatch={product.swatch}
                  angle={v.angle}
                  alt=""
                  sizes="64px"
                  className={`h-full w-full transition-opacity duration-300 ${
                    view === i ? "opacity-100" : "opacity-70 group-hover:opacity-100"
                  }`}
                />
                {view === i && (
                  <motion.span
                    layoutId="thumb-ring"
                    className="pointer-events-none absolute inset-0 border border-taupe-dark"
                    transition={SPRING.soft}
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </Reveal>

      <Stagger mode="mount" delay={0.15} stagger={0.07}>
        <StaggerItem>
          <h1 className="font-serif text-4xl text-taupe-dark">{product.name}</h1>
        </StaggerItem>
        <StaggerItem>
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
        </StaggerItem>

        <StaggerItem className="mt-8">
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
                className={`relative border px-4 py-2 font-sans text-sm transition-colors duration-300 ${
                  size === s
                    ? "border-taupe-dark text-cream"
                    : "border-taupe/40 text-espresso hover:border-taupe"
                }`}
              >
                {size === s && (
                  <motion.span
                    layoutId="size-active"
                    className="absolute inset-0 bg-taupe-dark"
                    transition={SPRING.soft}
                  />
                )}
                <span className="relative z-10">{s}</span>
              </button>
            ))}
          </div>
          <AnimatePresence>
            {needsSize && (
              <motion.p
                id="size-error"
                role="alert"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="mt-2 font-sans text-sm text-red-700"
              >
                Pick a size first and we&apos;ll get this on its way.
              </motion.p>
            )}
          </AnimatePresence>
        </StaggerItem>

        {product.inStock ? (
          <StaggerItem className="mt-8">
            <div className="flex items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAdd}
                className="relative flex-1 overflow-hidden bg-taupe-dark py-4 font-sans text-xs uppercase tracking-[0.18em] text-cream transition-colors duration-200 hover:bg-espresso"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={added ? "added" : "add"}
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -14, opacity: 0 }}
                    transition={{ duration: 0.22, ease: EASE }}
                    className="flex items-center justify-center gap-2"
                  >
                    {added && <CheckIcon />}
                    {added ? "Added to bag" : "Add to bag"}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
              <WishlistButton
                product={product}
                variant="bare"
                className="h-[52px] w-[52px] flex-shrink-0 border border-taupe/40 transition-colors hover:border-taupe-dark"
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleBuyNow}
              disabled={isBuying}
              className="mt-3 w-full border border-taupe-dark py-4 font-sans text-xs uppercase tracking-[0.18em] text-taupe-dark transition-all duration-200 hover:bg-taupe-dark hover:text-cream disabled:opacity-60"
            >
              {isBuying ? "Taking you to payment…" : "Buy it now"}
            </motion.button>
            {buyError && (
              <p role="alert" className="mt-2 font-sans text-sm text-red-700">
                {buyError}
              </p>
            )}
          </StaggerItem>
        ) : (
          <StaggerItem className="mt-8 flex items-center gap-3">
            <button
              disabled
              className="flex-1 cursor-not-allowed border border-taupe/40 py-4 font-sans text-xs uppercase tracking-[0.18em] text-espresso/80"
            >
              Sold out
            </button>
            <WishlistButton
              product={product}
              variant="bare"
              className="h-[52px] w-[52px] flex-shrink-0 border border-taupe/40 transition-colors hover:border-taupe-dark"
            />
          </StaggerItem>
        )}

        <StaggerItem className="mt-6 space-y-1 font-sans text-xs text-espresso/80">
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
        </StaggerItem>

        <StaggerItem className="mt-8">
          <Accordion title="Description" defaultOpen>
            <p>{product.description}</p>
          </Accordion>
          <Accordion title="Fabric">
            <p>{product.fabric}</p>
          </Accordion>
          <Accordion title="Care">
            <p>{product.care}</p>
          </Accordion>
        </StaggerItem>
      </Stagger>
    </div>
  );
}
