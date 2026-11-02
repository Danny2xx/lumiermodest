"use client";

import { useEffect } from "react";
import { useCart } from "@/components/CartContext";

/** Empties the bag once an order has actually been placed. */
export default function ClearCartOnSuccess() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
    // Runs once per confirmed order.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
