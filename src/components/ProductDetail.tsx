"use client";

import { useState } from "react";
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

const PLACEHOLDER_ANGLES = [150, 100, 200];

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

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
      </Reveal>

      <Stagger mode="mount" delay={0.15} stagger={0.07}>
        <StaggerItem>
          <h1 className="font-serif text-4xl text-taupe-dark">{product.name}</h1>
        </StaggerItem>
        <StaggerItem>
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
        </StaggerItem>

        <StaggerItem className="mt-8">
          <p className="mb-2 font-sans text-xs uppercase tracking-[0.18em] text-espresso/60">
            Size
          </p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                aria-pressed={size === s}
                className={`relative border px-4 py-2 font-sans text-sm transition-colors duration-300 ${
                  size === s
                    ? "border-taupe-dark text-cream"
                    : "border-taupe/30 text-espresso hover:border-taupe"
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
        </StaggerItem>

        <StaggerItem className="mt-8 flex items-center gap-3">
          {product.inStock ? (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                addItem(product, size);
                setAdded(true);
                setTimeout(() => setAdded(false), 1800);
              }}
              className="relative flex-1 overflow-hidden bg-taupe-dark py-4 font-sans text-xs uppercase tracking-[0.18em] text-cream transition-colors duration-200 hover:bg-espresso sm:flex-none sm:px-12"
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
                  {added ? "Added to Bag" : "Add to Bag"}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          ) : (
            <button
              disabled
              className="flex-1 cursor-not-allowed border border-taupe/30 py-4 font-sans text-xs uppercase tracking-[0.18em] text-espresso/40 sm:flex-none sm:px-12"
            >
              Sold Out
            </button>
          )}
          <WishlistButton
            product={product}
            variant="bare"
            className="h-[52px] w-[52px] flex-shrink-0 border border-taupe/30 transition-colors hover:border-taupe-dark"
          />
        </StaggerItem>

        <StaggerItem>
          <p className="mt-6 font-sans text-xs text-espresso/50">
            Free UK shipping on orders over £75. See our{" "}
            <Link href="/shipping" className="underline">
              shipping policy
            </Link>{" "}
            and{" "}
            <Link href="/sizing" className="underline">
              sizing guide
            </Link>
            .
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
