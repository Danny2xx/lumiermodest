"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useWishlist } from "./WishlistContext";
import { useCart } from "./CartContext";
import ProductImage from "./ProductImage";
import { EASE, SPRING } from "./motion/config";

const money = (n: number) => `£${n.toFixed(2)}`;

export default function WishlistDrawer() {
  const { isOpen, close, products, remove } = useWishlist();
  const { addItem } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="wishlist-backdrop"
          aria-hidden="true"
          className="fixed inset-0 z-50 bg-espresso/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={close}
        />
      )}
      {isOpen && (
        <motion.aside
          key="wishlist-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Saved items"
          className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream shadow-xl"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={SPRING.drawer}
        >
          <div className="flex items-center justify-between border-b border-taupe/15 px-6 py-5">
            <h2 className="font-serif text-2xl text-taupe-dark">Saved items</h2>
            <button
              ref={closeRef}
              onClick={close}
              aria-label="Close saved items"
              className="text-xl text-espresso transition-transform duration-300 hover:rotate-90 hover:text-taupe"
            >
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {products.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5, ease: EASE }}
                className="mt-16 flex flex-col items-center text-center"
              >
                <p className="font-serif italic tracking-tight text-4xl text-taupe-dark">
                  Nothing saved yet
                </p>
                <p className="mt-3 font-sans text-sm text-espresso">
                  Tap the heart on any piece and it&apos;ll wait for you here.
                </p>
                <Link
                  href="/"
                  onClick={close}
                  className="mt-8 bg-taupe-dark px-8 py-3 font-sans text-xs uppercase tracking-[0.18em] text-cream transition-all duration-200 hover:scale-[1.02] hover:bg-espresso active:scale-[0.98]"
                >
                  Start browsing
                </Link>
              </motion.div>
            ) : (
              <ul className="flex flex-col gap-5">
                <AnimatePresence initial={false} mode="popLayout">
                  {products.map((product) => {
                    const oneSize =
                      product.sizes.length === 1 ? product.sizes[0] : null;
                    return (
                      <motion.li
                        key={product.slug}
                        layout
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 24 }}
                        transition={{ duration: 0.35, ease: EASE, layout: { duration: 0.35, ease: EASE } }}
                        className="flex gap-4"
                      >
                        <ProductImage
                          src={product.images?.[0]}
                          swatch={product.swatch}
                          alt={product.name}
                          sizes="80px"
                          className="h-24 w-20 flex-shrink-0"
                        />
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <Link
                              href={`/products/${product.slug}`}
                              onClick={close}
                              className="font-serif text-lg leading-tight text-espresso hover:text-taupe"
                            >
                              {product.name}
                            </Link>
                            <p className="font-sans text-xs text-espresso/80">
                              {product.originalPrice && (
                                <span className="mr-2 line-through text-espresso/80">
                                  {money(product.originalPrice)}
                                </span>
                              )}
                              {money(product.price)}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            {!product.inStock ? (
                              <span className="font-sans text-xs uppercase tracking-wide text-espresso/80">
                                Sold out
                              </span>
                            ) : oneSize ? (
                              <button
                                onClick={() => {
                                  addItem(product, oneSize);
                                  remove(product.slug);
                                }}
                                className="font-sans text-xs uppercase tracking-wide text-taupe-dark underline transition-colors hover:text-espresso"
                              >
                                Move to bag
                              </button>
                            ) : (
                              // More than one size, so let her choose rather than
                              // guessing one on her behalf.
                              <Link
                                href={`/products/${product.slug}`}
                                onClick={close}
                                className="font-sans text-xs uppercase tracking-wide text-taupe-dark underline transition-colors hover:text-espresso"
                              >
                                Choose a size
                              </Link>
                            )}
                            <button
                              onClick={() => remove(product.slug)}
                              className="font-sans text-xs uppercase tracking-wide text-espresso/80 transition-colors hover:text-taupe"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
