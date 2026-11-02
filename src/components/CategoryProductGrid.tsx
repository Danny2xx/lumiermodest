"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Product } from "@/lib/products";
import ProductCard from "./ProductCard";
import ProductImage from "./ProductImage";
import { EASE } from "./motion/config";

type SortKey = "featured" | "price-asc" | "price-desc" | "name";
type Availability = "all" | "in-stock" | "sold-out";

function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="8" height="8" />
      <rect x="13" y="3" width="8" height="8" />
      <rect x="3" y="13" width="8" height="8" />
      <rect x="13" y="13" width="8" height="8" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}

export default function CategoryProductGrid({
  products,
  dark = false,
}: {
  products: Product[];
  dark?: boolean;
}) {
  const [size, setSize] = useState("All");
  const [availability, setAvailability] = useState<Availability>("all");
  const [sort, setSort] = useState<SortKey>("featured");
  const [view, setView] = useState<"grid" | "list">("grid");

  const sizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.sizes.forEach((s) => set.add(s)));
    return ["All", ...Array.from(set)];
  }, [products]);

  const visible = useMemo(() => {
    let list = products;
    if (size !== "All") {
      list = list.filter((p) => p.sizes.includes(size));
    }
    if (availability === "in-stock") list = list.filter((p) => p.inStock);
    if (availability === "sold-out") list = list.filter((p) => !p.inStock);
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [products, size, availability, sort]);

  const controlClass = `border bg-transparent px-2 py-1 normal-case tracking-normal transition-colors ${
    dark
      ? "border-cream/30 text-cream hover:border-cream/60"
      : "border-taupe/30 text-espresso hover:border-taupe"
  }`;
  const labelClass = `font-sans text-xs uppercase tracking-[0.1em] ${
    dark ? "text-cream/70" : "text-espresso/70"
  }`;

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <label className={`flex items-center gap-2 ${labelClass}`}>
            Availability
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value as Availability)}
              className={controlClass}
            >
              <option value="all">All</option>
              <option value="in-stock">In Stock</option>
              <option value="sold-out">Sold Out</option>
            </select>
          </label>

          <label className={`flex items-center gap-2 ${labelClass}`}>
            Size
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className={controlClass}
            >
              {sizes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label className={`flex items-center gap-2 ${labelClass}`}>
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className={controlClass}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name: A-Z</option>
            </select>
          </label>
        </div>

        <div className="flex items-center gap-4">
          <span className={labelClass} aria-live="polite">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={visible.length}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="inline-block"
              >
                {visible.length} item{visible.length === 1 ? "" : "s"}
              </motion.span>
            </AnimatePresence>
          </span>
          <div className={`flex gap-2 ${dark ? "text-cream" : "text-espresso"}`}>
            <button
              onClick={() => setView("grid")}
              aria-label="Grid view"
              aria-pressed={view === "grid"}
              className={`transition-opacity ${
                view === "grid"
                  ? dark
                    ? "text-gold"
                    : "text-taupe-dark"
                  : "opacity-40 hover:opacity-70"
              }`}
            >
              <GridIcon />
            </button>
            <button
              onClick={() => setView("list")}
              aria-label="List view"
              aria-pressed={view === "list"}
              className={`transition-opacity ${
                view === "list"
                  ? dark
                    ? "text-gold"
                    : "text-taupe-dark"
                  : "opacity-40 hover:opacity-70"
              }`}
            >
              <ListIcon />
            </button>
          </div>
        </div>
      </div>

      {visible.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`py-16 text-center font-sans text-sm ${dark ? "text-cream/60" : "text-espresso/60"}`}
        >
          No items match this filter.
        </motion.p>
      ) : view === "grid" ? (
        <motion.div layout className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{
                  opacity: { duration: 0.6, ease: EASE, delay: Math.min(i, 8) * 0.05 },
                  y: { duration: 0.6, ease: EASE, delay: Math.min(i, 8) * 0.05 },
                  scale: { duration: 0.25 },
                  layout: { duration: 0.5, ease: EASE },
                }}
              >
                <ProductCard product={p} dark={dark} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.ul layout className={`divide-y ${dark ? "divide-cream/15" : "divide-taupe/15"}`}>
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.li
                key={p.id}
                layout
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{
                  duration: 0.4,
                  ease: EASE,
                  delay: Math.min(i, 8) * 0.04,
                  layout: { duration: 0.4, ease: EASE },
                }}
              >
                <Link
                  href={`/products/${p.slug}`}
                  className={`group flex items-center gap-6 py-5 transition-colors ${
                    dark ? "hover:bg-cream/5" : "hover:bg-blush/40"
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <ProductImage
                      src={p.images?.[0]}
                      swatch={p.swatch}
                      alt={p.name}
                      sizes="80px"
                      zoom
                      className="h-24 w-20"
                    />
                    {!p.inStock && (
                      <span className="absolute left-1 top-1 bg-espresso px-1.5 py-0.5 font-sans text-[8px] uppercase tracking-wide text-cream">
                        Sold Out
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 items-center justify-between">
                    <div>
                      <p className={`font-serif text-lg ${dark ? "text-cream" : "text-espresso"}`}>
                        {p.name}
                      </p>
                      <p className={`font-sans text-xs ${dark ? "text-cream/60" : "text-espresso/60"}`}>
                        {p.sizes.join(" · ")}
                      </p>
                    </div>
                    <p className={`font-sans text-sm ${dark ? "text-cream/70" : "text-espresso/70"}`}>
                      {p.originalPrice && (
                        <span className={`mr-2 line-through ${dark ? "text-cream/40" : "text-espresso/40"}`}>
                          £{p.originalPrice.toFixed(2)}
                        </span>
                      )}
                      £{p.price.toFixed(2)} GBP
                    </p>
                  </div>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}
