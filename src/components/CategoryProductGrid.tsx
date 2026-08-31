"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/products";
import ProductCard from "./ProductCard";
import PlaceholderImage from "./PlaceholderImage";

type SortKey = "featured" | "price-asc" | "price-desc" | "name";

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
}: {
  products: Product[];
}) {
  const [size, setSize] = useState("All");
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
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [products, size, sort]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 font-sans text-xs uppercase tracking-[0.1em] text-espresso/70">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            Size
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="border border-taupe/30 bg-transparent px-2 py-1 normal-case tracking-normal"
            >
              {sizes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-2">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="border border-taupe/30 bg-transparent px-2 py-1 normal-case tracking-normal"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name: A-Z</option>
            </select>
          </label>
        </div>

        <div className="flex items-center gap-4">
          <span>
            {visible.length} item{visible.length === 1 ? "" : "s"}
          </span>
          <div className="flex gap-2 text-espresso">
            <button
              onClick={() => setView("grid")}
              aria-label="Grid view"
              className={view === "grid" ? "text-taupe-dark" : "text-espresso/40"}
            >
              <GridIcon />
            </button>
            <button
              onClick={() => setView("list")}
              aria-label="List view"
              className={view === "list" ? "text-taupe-dark" : "text-espresso/40"}
            >
              <ListIcon />
            </button>
          </div>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="py-16 text-center font-sans text-sm text-espresso/60">
          No items in this size right now.
        </p>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <ul className="divide-y divide-taupe/15">
          {visible.map((p) => (
            <li key={p.id}>
              <Link
                href={`/products/${p.slug}`}
                className="flex items-center gap-6 py-5 hover:bg-blush/40"
              >
                <PlaceholderImage
                  swatch={p.swatch}
                  className="h-24 w-20 flex-shrink-0"
                />
                <div className="flex flex-1 items-center justify-between">
                  <div>
                    <p className="font-serif text-lg text-espresso">
                      {p.name}
                    </p>
                    <p className="font-sans text-xs text-espresso/60">
                      {p.sizes.join(" · ")}
                    </p>
                  </div>
                  <p className="font-sans text-sm text-espresso/70">
                    {p.originalPrice && (
                      <span className="mr-2 line-through text-espresso/40">
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
