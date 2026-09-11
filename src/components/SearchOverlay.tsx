"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

type SearchResult = { id: string; slug: string; name: string; price: number };

export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 200);
      return () => clearTimeout(t);
    }
    setQuery("");
    setResults([]);
  }, [open]);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const controller = new AbortController();
    const t = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(q)}`, { signal: controller.signal })
        .then((res) => res.json())
        .then((data) => setResults(data.results ?? []))
        .catch((err) => {
          if (err.name !== "AbortError") setResults([]);
        })
        .finally(() => setLoading(false));
    }, 250);
    return () => {
      clearTimeout(t);
      controller.abort();
    };
  }, [query]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-espresso/40 transition-opacity duration-300 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`mx-auto mt-24 w-full max-w-xl bg-cream p-6 shadow-xl transition-all duration-300 ${
          open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-taupe/30 pb-3">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search abayas, hijabs..."
            className="flex-1 bg-transparent font-sans text-sm text-espresso placeholder:text-espresso/50 focus:outline-none"
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            className="text-espresso/60 transition-colors hover:text-gold"
          >
            ×
          </button>
        </div>

        {query.trim() && (
          <ul className="mt-4 max-h-80 overflow-y-auto">
            {loading ? (
              <p className="py-4 font-sans text-sm text-espresso/60">
                Searching…
              </p>
            ) : results.length === 0 ? (
              <p className="py-4 font-sans text-sm text-espresso/60">
                No results for &quot;{query}&quot;.
              </p>
            ) : (
              results.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/products/${p.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between py-3 font-sans text-sm text-espresso hover:text-gold"
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
