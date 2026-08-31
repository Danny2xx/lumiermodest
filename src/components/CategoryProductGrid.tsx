"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/products";
import ProductCard from "./ProductCard";
import PlaceholderImage from "./PlaceholderImage";

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

  const controlClass = `border bg-transparent px-2 py-1 normal-case tracking-normal ${
    dark ? "border-cream/30 text-cream" : "border-taupe/30 text-espresso"
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
          <span className={labelClass}>
            {visible.length} item{visible.length === 1 ? "" : "s"}
          </span>
          <div className={`flex gap-2 ${dark ? "text-cream" : "text-espresso"}`}>
            <button
              onClick={() => setView("grid")}
              aria-label="Grid view"
              className={view === "grid" ? (dark ? "text-gold" : "text-taupe-dark") : "opacity-40"}
            >
              <GridIcon />
            </button>
            <button
              onClick={() => setView("list")}
              aria-label="List view"
              className={view === "list" ? (dark ? "text-gold" : "text-taupe-dark") : "opacity-40"}
            >
              <ListIcon />
            </button>
          </div>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className={`py-16 text-center font-sans text-sm ${dark ? "text-cream/60" : "text-espresso/60"}`}>
          No items match this filter.
        </p>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} dark={dark} />
          ))}
        </div>
      ) : (
        <ul className={`divide-y ${dark ? "divide-cream/15" : "divide-taupe/15"}`}>
          {visible.map((p) => (
            <li key={p.id}>
              <Link
                href={`/products/${p.slug}`}
                className={`flex items-center gap-6 py-5 ${
                  dark ? "hover:bg-cream/5" : "hover:bg-blush/40"
                }`}
              >
                <div className="relative flex-shrink-0">
                  <PlaceholderImage swatch={p.swatch} className="h-24 w-20" />
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
