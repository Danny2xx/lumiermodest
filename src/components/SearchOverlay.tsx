"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { products } from "@/lib/products";

export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-espresso/40" onClick={onClose}>
      <div
        className="mx-auto mt-24 w-full max-w-xl bg-cream p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-taupe/30 pb-3">
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search abayas, hijabs..."
            className="flex-1 bg-transparent font-sans text-sm text-espresso placeholder:text-espresso/50 focus:outline-none"
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            className="text-espresso/60"
          >
            ×
          </button>
        </div>

        {query.trim() && (
          <ul className="mt-4 max-h-80 overflow-y-auto">
            {results.length === 0 ? (
              <p className="py-4 font-sans text-sm text-espresso/60">
                No results for &quot;{query}&quot;.
              </p>
            ) : (
              results.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/products/${p.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between py-3 font-sans text-sm text-espresso hover:text-taupe"
                  >
                    <span>{p.name}</span>
                    <span className="text-espresso/60">
                      £{p.price.toFixed(2)}
                    </span>
                  </Link>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
