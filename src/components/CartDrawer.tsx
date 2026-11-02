"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useCart, type BagChange } from "./CartContext";
import ProductImage from "./ProductImage";
import { MAX_QTY_PER_LINE } from "@/lib/cart";
import { amountToFreeDelivery, SHIPPING_RATES } from "@/lib/shipping";
import { EASE, SPRING } from "./motion/config";

const money = (n: number) => `£${n.toFixed(2)}`;

function changeMessage(change: BagChange): string {
  switch (change.kind) {
    case "gone":
      return `${change.name} is no longer in the collection, so we've taken it out of your bag.`;
    case "size-gone":
      return `${change.name} no longer comes in size ${change.size}, so we've taken it out of your bag.`;
    case "sold-out":
      return `${change.name} has sold out. Remove it to carry on.`;
    case "price-down":
      return `${change.name} is now ${money(change.to)} — down from ${money(change.from)}.`;
    case "price-up":
      return `${change.name} is now ${money(change.to)}, not ${money(change.from)}.`;
  }
}

export default function CartDrawer() {
  const {
    isOpen,
    close,
    lines,
    removeItem,
    updateQty,
    subtotal,
    changes,
    dismissChanges,
    hasSoldOut,
  } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);

  // Escape closes, and focus lands somewhere useful when it opens.
  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  const toFree = amountToFreeDelivery(subtotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="cart-backdrop"
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
          key="cart-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Your bag"
          className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream shadow-xl"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={SPRING.drawer}
        >
          <div className="flex items-center justify-between border-b border-taupe/15 px-6 py-5">
            <h2 className="font-serif text-2xl text-taupe-dark">Your bag</h2>
            <button
              ref={closeRef}
              onClick={close}
              aria-label="Close bag"
              className="text-xl text-espresso transition-transform duration-300 hover:rotate-90 hover:text-taupe"
            >
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            <AnimatePresence initial={false}>
              {changes.length > 0 && (
                <motion.div
                  key="bag-changes"
                  role="status"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="mb-5 border border-taupe/30 bg-sand px-4 py-3"
                >
                  <p className="font-sans text-xs uppercase tracking-[0.14em] text-espresso">
                    A few things changed
                  </p>
                  <ul className="mt-2 space-y-1 font-sans text-sm text-espresso">
                    {changes.map((c, i) => (
                      <li key={i}>{changeMessage(c)}</li>
                    ))}
                  </ul>
                  <button
                    onClick={dismissChanges}
                    className="mt-2 font-sans text-xs uppercase tracking-wide text-taupe-dark underline hover:text-espresso"
                  >
                    Got it
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {lines.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5, ease: EASE }}
                className="mt-16 flex flex-col items-center text-center"
              >
                <p className="font-serif italic tracking-tight text-4xl text-taupe-dark">
                  Nothing in your bag yet
                </p>
                <p className="mt-3 font-sans text-sm text-espresso">
                  Anything you add will wait for you here.
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
                  {lines.map((line) => {
                    const soldOut = !line.product.inStock;
                    return (
                      <motion.li
                        key={`${line.product.slug}-${line.size}`}
                        layout
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 24 }}
                        transition={{
                          duration: 0.35,
                          ease: EASE,
                          layout: { duration: 0.35, ease: EASE },
                        }}
                        className="flex gap-4"
                      >
                        <ProductImage
                          src={line.product.images?.[0]}
                          swatch={line.product.swatch}
                          alt={line.product.name}
                          sizes="80px"
                          className={`h-24 w-20 flex-shrink-0 ${
                            soldOut ? "opacity-50" : ""
                          }`}
                        />
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <Link
                              href={`/products/${line.product.slug}`}
                              onClick={close}
                              className="font-serif text-lg leading-tight text-espresso hover:text-taupe"
                            >
                              {line.product.name}
                            </Link>
                            <p className="font-sans text-xs text-espresso/80">
                              Size: {line.size}
                            </p>
                            {soldOut && (
                              <p className="mt-1 font-sans text-xs uppercase tracking-wide text-red-700">
                                Sold out
                              </p>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 font-sans text-sm">
                              <button
                                onClick={() =>
                                  updateQty(
                                    line.product.slug,
                                    line.size,
                                    line.qty - 1
                                  )
                                }
                                aria-label={`Reduce quantity of ${line.product.name}`}
                                className="h-6 w-6 border border-taupe/40 text-espresso transition-colors hover:border-taupe-dark hover:bg-taupe-dark hover:text-cream"
                              >
                                −
                              </button>
                              <motion.span
                                key={line.qty}
                                aria-live="polite"
                                initial={{ scale: 1.4, color: "#b08d57" }}
                                animate={{ scale: 1, color: "#3c2c20" }}
                                transition={{ duration: 0.4, ease: EASE }}
                                className="inline-block w-4 text-center"
                              >
                                {line.qty}
                              </motion.span>
                              <button
                                onClick={() =>
                                  updateQty(
                                    line.product.slug,
                                    line.size,
                                    line.qty + 1
                                  )
                                }
                                disabled={line.qty >= MAX_QTY_PER_LINE}
                                aria-label={`Increase quantity of ${line.product.name}`}
                                className="h-6 w-6 border border-taupe/40 text-espresso transition-colors hover:border-taupe-dark hover:bg-taupe-dark hover:text-cream disabled:pointer-events-none disabled:opacity-40"
                              >
                                +
                              </button>
                            </div>
                            <p className="font-sans text-sm text-espresso">
                              {money(line.product.price * line.qty)}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(line.product.slug, line.size)}
                            className="mt-1 self-start font-sans text-xs uppercase tracking-wide text-espresso/80 transition-colors hover:text-taupe"
                          >
                            Remove
                          </button>
                        </div>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>
            )}
          </div>

          {lines.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4, ease: EASE }}
              className="border-t border-taupe/15 px-6 py-5"
            >
              <div className="mb-1 flex justify-between font-serif text-lg text-espresso">
                <span>Subtotal</span>
                <span>{money(subtotal)}</span>
              </div>
              <p className="mb-4 font-sans text-xs text-espresso/80">
                {toFree === 0
                  ? "Free UK delivery included."
                  : `${money(toFree)} more for free UK delivery — or ${money(
                      SHIPPING_RATES[0].amount
                    )} standard, chosen at payment.`}
              </p>
              {hasSoldOut ? (
                <p className="border border-taupe/30 bg-sand px-4 py-3 font-sans text-sm text-espresso">
                  Remove the sold-out piece above and you can check out.
                </p>
              ) : (
                <Link
                  href="/checkout"
                  onClick={close}
                  className="block w-full bg-taupe-dark py-3 text-center font-sans text-xs uppercase tracking-[0.18em] text-cream transition-all duration-200 hover:scale-[1.02] hover:bg-espresso active:scale-[0.98]"
                >
                  Checkout
                </Link>
              )}
            </motion.div>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
