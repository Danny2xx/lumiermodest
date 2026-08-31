"use client";

import Link from "next/link";
import { useCart } from "./CartContext";
import PlaceholderImage from "./PlaceholderImage";

export default function CartDrawer() {
  const { isOpen, close, lines, removeItem, updateQty, subtotal } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-espresso/40 transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={close}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream shadow-xl transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-taupe/15 px-6 py-5">
          <h2 className="font-serif text-2xl text-taupe-dark">Your Bag</h2>
          <button onClick={close} aria-label="Close cart" className="text-xl">
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <p className="mt-10 text-center font-sans text-sm text-espresso/60">
              Your bag is empty.
            </p>
          ) : (
            <ul className="flex flex-col gap-5">
              {lines.map((line) => (
                <li
                  key={`${line.product.slug}-${line.size}`}
                  className="flex gap-4"
                >
                  <PlaceholderImage
                    swatch={line.product.swatch}
                    className="h-24 w-20 flex-shrink-0 rounded"
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
                            updateQty(
                              line.product.slug,
                              line.size,
                              line.qty - 1
                            )
                          }
                          className="h-6 w-6 border border-taupe/30"
                        >
                          −
                        </button>
                        <span>{line.qty}</span>
                        <button
                          onClick={() =>
                            updateQty(
                              line.product.slug,
                              line.size,
                              line.qty + 1
                            )
                          }
                          className="h-6 w-6 border border-taupe/30"
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
                      className="mt-1 self-start font-sans text-xs uppercase tracking-wide text-espresso/50 hover:text-taupe"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-taupe/15 px-6 py-5">
            <div className="mb-4 flex justify-between font-serif text-lg text-espresso">
              <span>Subtotal</span>
              <span>£{subtotal.toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={close}
              className="block w-full bg-taupe-dark py-3 text-center font-sans text-xs uppercase tracking-[0.18em] text-cream transition-colors hover:bg-espresso"
            >
              Checkout
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
