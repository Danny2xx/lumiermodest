"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import Spinner from "./motion/Spinner";
import { EASE } from "./motion/config";

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
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", onKey);
      return () => {
        clearTimeout(t);
        window.removeEventListener("keydown", onKey);
      };
    }
    setQuery("");
    setResults([]);
  }, [open, onClose]);

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
    <AnimatePresence>
      {open && (
        <motion.div
          key="search-overlay"
          className="fixed inset-0 z-50 bg-espresso/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            className="mx-auto mt-24 w-full max-w-xl bg-cream p-6 shadow-xl"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE }}
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
                className="text-espresso/60 transition-all duration-300 hover:rotate-90 hover:text-gold"
              >
                ×
              </button>
            </div>

            {query.trim() && (
              <ul className="mt-4 max-h-80 overflow-y-auto">
                {loading ? (
                  <li className="flex items-center gap-3 py-4 font-sans text-sm text-espresso/60">
                    <Spinner className="h-3 w-3" label="Searching" />
                    Searching…
                  </li>
                ) : results.length === 0 ? (
                  <motion.li
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-4 font-sans text-sm text-espresso/60"
                  >
                    No results for &quot;{query}&quot;.
                  </motion.li>
                ) : (
                  results.map((p, i) => (
                    <motion.li
                      key={p.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.35, ease: EASE }}
                    >
                      <Link
                        href={`/products/${p.slug}`}
                        onClick={onClose}
                        className="group flex items-center justify-between py-3 font-sans text-sm text-espresso transition-colors hover:text-gold"
                      >
                        <span className="transition-transform duration-300 ease-luxe group-hover:translate-x-1">
                          {p.name}
                        </span>
                        <span className="text-espresso/60">£{p.price.toFixed(2)}</span>
                      </Link>
                    </motion.li>
                  ))
                )}
              </ul>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
