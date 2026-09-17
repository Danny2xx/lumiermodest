"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  ReactNode,
} from "react";
import { Product } from "@/lib/products";
import { refreshBagProducts } from "@/lib/bag";
import { MAX_QTY_PER_LINE } from "@/lib/cart";

export type CartLine = {
  product: Product;
  size: string;
  qty: number;
};

/** Something that changed in the shop while the bag sat in the browser. */
export type BagChange =
  | { kind: "gone"; name: string }
  | { kind: "size-gone"; name: string; size: string }
  | { kind: "sold-out"; name: string }
  | { kind: "price-up"; name: string; from: number; to: number }
  | { kind: "price-down"; name: string; from: number; to: number };

type CartContextValue = {
  lines: CartLine[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  addItem: (product: Product, size: string) => void;
  removeItem: (slug: string, size: string) => void;
  updateQty: (slug: string, size: string, qty: number) => void;
  clear: () => void;
  subtotal: number;
  count: number;
  /** What changed since these items were added, to tell the customer once. */
  changes: BagChange[];
  dismissChanges: () => void;
  /** True while something in the bag can no longer be bought. */
  hasSoldOut: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "lumiermodest-cart";

const clampQty = (qty: number) =>
  Math.max(1, Math.min(Math.floor(qty), MAX_QTY_PER_LINE));

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [changes, setChanges] = useState<BagChange[]>([]);

  const didInitialSync = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  /**
   * The bag keeps a copy of each product from the moment it was added, so a
   * price change, a sell-out or a deletion would otherwise only surface as a
   * failure at the payment step. Re-read the real products and correct it.
   */
  const sync = useCallback(async (current: CartLine[]) => {
    if (current.length === 0) return;

    let fresh: Product[];
    try {
      fresh = await refreshBagProducts(current.map((l) => l.product.slug));
    } catch {
      return; // offline or a blip: keep showing what we have
    }
    const bySlug = new Map(fresh.map((p) => [p.slug, p]));

    const notes: BagChange[] = [];
    for (const line of current) {
      const p = bySlug.get(line.product.slug);
      if (!p) {
        notes.push({ kind: "gone", name: line.product.name });
        continue;
      }
      if (!p.sizes.includes(line.size)) {
        notes.push({ kind: "size-gone", name: p.name, size: line.size });
        continue;
      }
      if (!p.inStock && line.product.inStock) {
        notes.push({ kind: "sold-out", name: p.name });
      }
      if (p.price > line.product.price) {
        notes.push({
          kind: "price-up",
          name: p.name,
          from: line.product.price,
          to: p.price,
        });
      } else if (p.price < line.product.price) {
        notes.push({
          kind: "price-down",
          name: p.name,
          from: line.product.price,
          to: p.price,
        });
      }
    }

    // Functional update, so anything added while this was in flight survives.
    setLines((prev) =>
      prev.flatMap((line) => {
        const p = bySlug.get(line.product.slug);
        if (!p) return [];
        if (!p.sizes.includes(line.size)) return [];
        return [{ ...line, product: p, qty: clampQty(line.qty) }];
      })
    );
    if (notes.length > 0) setChanges(notes);
  }, []);

  // Once after loading, and again whenever the bag is opened.
  useEffect(() => {
    if (!hydrated || didInitialSync.current) return;
    didInitialSync.current = true;
    void sync(lines);
  }, [hydrated, lines, sync]);

  const open = () => {
    setIsOpen(true);
    void sync(lines);
  };

  const addItem = (product: Product, size: string) => {
    setChanges([]);
    setLines((prev) => {
      const existing = prev.find(
        (l) => l.product.slug === product.slug && l.size === size
      );
      if (existing) {
        return prev.map((l) =>
          l === existing ? { ...l, qty: clampQty(l.qty + 1) } : l
        );
      }
      return [...prev, { product, size, qty: 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (slug: string, size: string) => {
    setLines((prev) =>
      prev.filter((l) => !(l.product.slug === slug && l.size === size))
    );
  };

  const updateQty = (slug: string, size: string, qty: number) => {
    if (qty < 1) {
      removeItem(slug, size);
      return;
    }
    setLines((prev) =>
      prev.map((l) =>
        l.product.slug === slug && l.size === size
          ? { ...l, qty: clampQty(qty) }
          : l
      )
    );
  };

  const clear = () => {
    setLines([]);
    setChanges([]);
    // Also drop the stored copy, so this works whether it runs before or
    // after the hydration effect above.
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore unavailable storage
    }
  };

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.product.price * l.qty, 0),
    [lines]
  );
  const count = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines]);
  const hasSoldOut = useMemo(
    () => lines.some((l) => !l.product.inStock),
    [lines]
  );

  return (
    <CartContext.Provider
      value={{
        lines,
        isOpen,
        open,
        close: () => setIsOpen(false),
        addItem,
        removeItem,
        updateQty,
        clear,
        subtotal,
        count,
        changes,
        dismissChanges: () => setChanges([]),
        hasSoldOut,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
