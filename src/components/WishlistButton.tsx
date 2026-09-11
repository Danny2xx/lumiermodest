"use client";

import { Product } from "@/lib/products";
import { useWishlist } from "./WishlistContext";

export default function WishlistButton({
  product,
  className = "",
  variant = "pill",
}: {
  product: Product;
  className?: string;
  variant?: "pill" | "bare";
}) {
  const { isSaved, toggle } = useWishlist();
  const saved = isSaved(product.slug);

  const base =
    variant === "pill"
      ? "flex h-8 w-8 items-center justify-center rounded-full bg-cream/80 text-espresso backdrop-blur-sm"
      : "flex items-center justify-center text-espresso";

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(product);
      }}
      aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
      aria-pressed={saved}
      className={`${base} transition-transform hover:scale-110 ${className}`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 20.5s-7.5-4.6-10-9.3C.6 8.1 2 4.5 5.4 3.7 8 3.1 10.3 4.4 12 7c1.7-2.6 4-3.9 6.6-3.3 3.4.8 4.8 4.4 3.4 7.5-2.5 4.7-10 9.3-10 9.3Z" />
      </svg>
    </button>
  );
}
