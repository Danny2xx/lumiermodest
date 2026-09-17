"use server";

import { getProductsBySlugs } from "./products";
import type { Product } from "./products";

/**
 * The bag lives in the browser's storage, so it holds a copy of each product
 * from the moment it was added — a price that may since have changed, or an
 * item that has since sold out or been deleted. This hands back today's
 * version so the bag can correct itself before the customer reaches payment,
 * rather than failing at the till.
 */
export async function refreshBagProducts(slugs: string[]): Promise<Product[]> {
  const unique = [...new Set(slugs)].slice(0, 50);
  return getProductsBySlugs(unique);
}
