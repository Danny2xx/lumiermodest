"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { Product, getProductBySlug } from "@/lib/products";

type WishlistContextValue = {
  slugs: string[];
  products: Product[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: (slug: string) => void;
  isSaved: (slug: string) => boolean;
  remove: (slug: string) => void;
  count: number;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = "lumiermodest-wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSlugs(JSON.parse(raw));
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  }, [slugs, hydrated]);

  const toggle = (slug: string) => {
    setSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const remove = (slug: string) => {
    setSlugs((prev) => prev.filter((s) => s !== slug));
  };

  const isSaved = (slug: string) => slugs.includes(slug);

  const products = useMemo(
    () => slugs.map((s) => getProductBySlug(s)).filter((p): p is Product => Boolean(p)),
    [slugs]
  );

  return (
    <WishlistContext.Provider
      value={{
        slugs,
        products,
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        toggle,
        isSaved,
        remove,
        count: products.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
