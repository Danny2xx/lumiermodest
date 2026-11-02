"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "./CartContext";
import ProductImage from "./ProductImage";
import { EASE, SPRING } from "./motion/config";

export default function CartDrawer() {
  const { isOpen, close, lines, removeItem, updateQty, subtotal } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="cart-backdrop"
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
            <h2 className="font-serif text-2xl text-taupe-dark">Your Bag</h2>
            <button
              onClick={close}
              aria-label="Close cart"
              className="text-xl transition-transform duration-300 hover:rotate-90"
            >
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {lines.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5, ease: EASE }}
                className="mt-16 flex flex-col items-center text-center"
              >
                <p className="font-serif italic tracking-tight text-4xl text-taupe-dark">
                  Your bag is empty
                </p>
                <p className="mt-3 font-sans text-sm text-espresso/60">
                  Have an account?{" "}
                  <Link href="/account" onClick={close} className="underline">
                    Log in
                  </Link>{" "}
                  to check out faster.
                </p>
                <Link
                  href="/abayas"
                  onClick={close}
                  className="mt-8 bg-taupe-dark px-8 py-3 font-sans text-xs uppercase tracking-[0.18em] text-cream transition-all duration-200 hover:scale-[1.02] hover:bg-espresso active:scale-[0.98]"
                >
                  Continue Shopping
                </Link>
              </motion.div>
            ) : (
              <ul className="flex flex-col gap-5">
                <AnimatePresence initial={false} mode="popLayout">
                  {lines.map((line) => (
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
                        className="h-24 w-20 flex-shrink-0"
                      />
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <p className="font-serif text-lg leading-tight text-espresso">
                            {line.product.name}
                          </p>
                          <p className="font-sans text-xs text-espresso/60">
                            Size: {line.size}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 font-sans text-sm">
                            <button
                              onClick={() =>
                                updateQty(line.product.slug, line.size, line.qty - 1)
                              }
                              aria-label="Decrease quantity"
                              className="h-6 w-6 border border-taupe/30 transition-colors hover:border-taupe-dark hover:bg-taupe-dark hover:text-cream"
                            >
                              −
                            </button>
                            <motion.span
                              key={line.qty}
                              initial={{ scale: 1.4, color: "#b08d57" }}
                              animate={{ scale: 1, color: "#3c2c20" }}
                              transition={{ duration: 0.4, ease: EASE }}
                              className="inline-block w-4 text-center"
                            >
                              {line.qty}
                            </motion.span>
                            <button
                              onClick={() =>
                                updateQty(line.product.slug, line.size, line.qty + 1)
                              }
                              aria-label="Increase quantity"
                              className="h-6 w-6 border border-taupe/30 transition-colors hover:border-taupe-dark hover:bg-taupe-dark hover:text-cream"
                            >
                              +
                            </button>
                          </div>
                          <p className="font-sans text-sm text-espresso">
                            £{(line.product.price * line.qty).toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(line.product.slug, line.size)}
                          className="mt-1 self-start font-sans text-xs uppercase tracking-wide text-espresso/50 transition-colors hover:text-taupe"
                        >
                          Remove
                        </button>
                      </div>
                    </motion.li>
                  ))}
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
              <div className="mb-4 flex justify-between font-serif text-lg text-espresso">
                <span>Subtotal</span>
                <span>£{subtotal.toFixed(2)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={close}
                className="block w-full bg-taupe-dark py-3 text-center font-sans text-xs uppercase tracking-[0.18em] text-cream transition-all duration-200 hover:scale-[1.02] hover:bg-espresso active:scale-[0.98]"
              >
                Checkout
              </Link>
            </motion.div>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
