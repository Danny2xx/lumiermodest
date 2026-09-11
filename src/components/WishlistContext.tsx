"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Product } from "@/lib/products";

type WishlistContextValue = {
  products: Product[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: (product: Product) => void;
  isSaved: (slug: string) => boolean;
  remove: (slug: string) => void;
  count: number;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = "lumiermodest-wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProducts(JSON.parse(raw));
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products, hydrated]);

  const toggle = (product: Product) => {
    setProducts((prev) =>
      prev.some((p) => p.slug === product.slug)
        ? prev.filter((p) => p.slug !== product.slug)
        : [...prev, product]
    );
  };

  const remove = (slug: string) => {
    setProducts((prev) => prev.filter((p) => p.slug !== slug));
  };

  const isSaved = (slug: string) => products.some((p) => p.slug === slug);

  return (
    <WishlistContext.Provider
      value={{
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
