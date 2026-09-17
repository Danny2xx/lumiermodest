"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth/server";
import {
  ALLOWED_SHIPPING_COUNTRIES,
  buildShippingOptions,
  CURRENCY,
  getStripe,
  isStripeConfigured,
  toPence,
} from "@/lib/stripe";

/** What the browser is allowed to tell us: what and how many, never the price. */
export type CheckoutItem = {
  slug: string;
  size: string;
  qty: number;
};

export type CheckoutResult = { url: string } | { error: string };

const MAX_QTY_PER_LINE = 10;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Stripe fetches these images itself, so it needs absolute, publicly reachable
 * URLs. Seeded products store site-relative paths while admin uploads store
 * absolute Blob URLs, and in local dev the site isn't reachable at all — in
 * that case we just send no image rather than a link Stripe can't load.
 */
function toPublicImageUrl(images: string[], siteUrl: string): string[] {
  const [first] = images;
  if (!first) return [];
  if (first.startsWith("https://")) return [first];
  if (siteUrl.startsWith("https://")) return [new URL(first, siteUrl).toString()];
  return [];
}

/**
 * Where Stripe sends the customer back to. Prefers the configured URL, and
 * otherwise uses the domain this request arrived on — so a missing
 * NEXT_PUBLIC_SITE_URL can never strand a paying customer on localhost.
 * Same approach as the password-reset action.
 */
async function siteOrigin(): Promise<string | null> {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/+$/, "");

  const headerList = await headers();
  const host = headerList.get("host");
  if (!host) return null;
  const protocol =
    headerList.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  return `${protocol}://${host}`;
}

export async function startCheckout(
  items: CheckoutItem[],
  emailFromForm: string
): Promise<CheckoutResult> {
  if (!isStripeConfigured()) {
    return { error: "Payments aren't switched on yet. Please try again later." };
  }
  if (!Array.isArray(items) || items.length === 0) {
    return { error: "Your bag is empty." };
  }

  // A signed-in user's own email wins over anything typed into the form.
  const { data: session } = await auth.getSession();
  const email = (session?.user?.email ?? emailFromForm ?? "").trim().toLowerCase();

  if (!EMAIL_PATTERN.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  // Re-price everything from the database. The cart lives in localStorage, so
  // prices coming back from the browser can't be trusted.
  const products = await prisma.product.findMany({
    where: { slug: { in: items.map((i) => i.slug) } },
  });
  const bySlug = new Map(products.map((p) => [p.slug, p]));

  const lines = [];
  for (const item of items) {
    const product = bySlug.get(item.slug);
    if (!product) {
      return { error: "An item in your bag is no longer available." };
    }
    if (!product.inStock) {
      return { error: `${product.name} is out of stock.` };
    }
    if (!product.sizes.includes(item.size)) {
      return { error: `${product.name} isn't available in size ${item.size}.` };
    }

    const qty = Math.floor(Number(item.qty));
    if (!Number.isFinite(qty) || qty < 1 || qty > MAX_QTY_PER_LINE) {
      return { error: `Please choose between 1 and ${MAX_QTY_PER_LINE} of each item.` };
    }

    lines.push({ product, size: item.size, qty, price: Number(product.price) });
  }

  const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0);

  // Resolved before the order is written, so a failure here can't leave a
  // pending order behind with no checkout session attached.
  const siteUrl = await siteOrigin();
  if (!siteUrl) {
    return { error: "We couldn't start checkout. Please try again." };
  }

  // Record the order as pending first, so a successful payment always has a
  // row to attach itself to when the webhook arrives.
  const order = await prisma.order.create({
    data: {
      email,
      subtotal,
      items: {
        create: lines.map((l) => ({
          productId: l.product.id,
          productSlug: l.product.slug,
          productName: l.product.name,
          size: l.size,
          qty: l.qty,
          price: l.price,
        })),
      },
    },
  });

  try {
    const checkout = await getStripe().checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      client_reference_id: order.id,
      metadata: { orderId: order.id },
      payment_intent_data: { metadata: { orderId: order.id } },
      line_items: lines.map((l) => ({
        quantity: l.qty,
        price_data: {
          currency: CURRENCY,
          unit_amount: toPence(l.price),
          product_data: {
            name: `${l.product.name} — ${l.size}`,
            images: toPublicImageUrl(l.product.images, siteUrl),
          },
        },
      })),
      shipping_address_collection: { allowed_countries: ALLOWED_SHIPPING_COUNTRIES },
      shipping_options: buildShippingOptions(subtotal),
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout`,
    });

    if (!checkout.url) {
      throw new Error("Stripe returned a session with no URL");
    }

    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: checkout.id },
    });

    return { url: checkout.url };
  } catch (err) {
    console.error("Failed to create Stripe Checkout session", err);
    await prisma.order.update({
      where: { id: order.id },
      data: { status: "cancelled" },
    });
    return { error: "We couldn't start checkout. Please try again." };
  }
}
