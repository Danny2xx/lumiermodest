"use client";

import Link from "next/link";
import { useWishlist } from "./WishlistContext";
import { useCart } from "./CartContext";
import ProductImage from "./ProductImage";

export default function WishlistDrawer() {
  const { isOpen, close, products, remove } = useWishlist();
  const { addItem } = useCart();

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
          <h2 className="font-serif text-2xl text-taupe-dark">Saved Items</h2>
          <button onClick={close} aria-label="Close wishlist" className="text-xl">
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {products.length === 0 ? (
            <div className="mt-16 flex flex-col items-center text-center">
              <p className="font-serif italic tracking-tight text-4xl text-taupe-dark">
                Nothing saved yet
              </p>
              <p className="mt-3 font-sans text-sm text-espresso/60">
                Tap the heart on any product to save it here for later.
              </p>
              <Link
                href="/abayas"
                onClick={close}
                className="mt-8 bg-taupe-dark px-8 py-3 font-sans text-xs uppercase tracking-[0.18em] text-cream transition-colors duration-200 hover:scale-[1.02] hover:bg-espresso"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-5">
              {products.map((product) => (
                <li key={product.slug} className="flex gap-4">
                  <ProductImage
                    src={product.images?.[0]}
                    swatch={product.swatch}
                    alt={product.name}
                    sizes="80px"
                    className="h-24 w-20 flex-shrink-0"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="font-serif text-lg leading-tight text-espresso">
                        {product.name}
                      </p>
                      <p className="font-sans text-xs text-espresso/60">
                        £{product.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      {product.inStock ? (
                        <button
                          onClick={() => {
                            addItem(product, product.sizes[0]);
                            remove(product.slug);
                          }}
                          className="font-sans text-xs uppercase tracking-wide text-taupe-dark underline hover:text-espresso"
                        >
                          Move to Bag
                        </button>
                      ) : (
                        <span className="font-sans text-xs uppercase tracking-wide text-espresso/40">
                          Sold Out
                        </span>
                      )}
                      <button
                        onClick={() => remove(product.slug)}
                        className="font-sans text-xs uppercase tracking-wide text-espresso/50 hover:text-taupe"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
}
