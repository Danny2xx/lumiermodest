import "server-only";
import { prisma } from "./db";
import type { OrderStatus } from "@prisma/client";

export type CustomerOrderItem = {
  id: string;
  name: string;
  slug: string;
  size: string;
  qty: number;
  price: number;
};

export type CustomerOrder = {
  id: string;
  placedAt: Date;
  status: OrderStatus;
  subtotal: number;
  items: CustomerOrderItem[];
};

/**
 * Orders belonging to one signed-in customer.
 *
 * Deliberately keyed on userId rather than email: sign-up doesn't verify email
 * addresses, so matching on email would let anyone register with a customer's
 * address and read her order history.
 *
 * Cancelled orders are left out — those are abandoned checkouts, not purchases.
 */
export async function getOrdersForUser(userId: string): Promise<CustomerOrder[]> {
  const rows = await prisma.order.findMany({
    where: { userId, status: { not: "cancelled" } },
    orderBy: { createdAt: "desc" },
    include: { items: true },
    take: 25,
  });

  return rows.map((o) => ({
    id: o.id,
    placedAt: o.createdAt,
    status: o.status,
    subtotal: Number(o.subtotal),
    items: o.items.map((i) => ({
      id: i.id,
      name: i.productName,
      slug: i.productSlug,
      size: i.size,
      qty: i.qty,
      price: Number(i.price),
    })),
  }));
}
