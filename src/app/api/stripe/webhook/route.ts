import type Stripe from "stripe";
import { headers } from "next/headers";
import { prisma } from "@/lib/db";
import { getStripe, getWebhookSecret } from "@/lib/stripe";

export async function POST(request: Request) {
  let stripe: Stripe;
  let webhookSecret: string;
  try {
    stripe = getStripe();
    webhookSecret = getWebhookSecret();
  } catch (err) {
    // 5xx, not 4xx: this is our misconfiguration rather than a bad request,
    // and Stripe retrying means the events still arrive once it's fixed.
    console.error("Stripe webhook called but Stripe isn't configured correctly", err);
    return new Response("Stripe is not configured", { status: 500 });
  }

  const signature = (await headers()).get("stripe-signature");
  if (!signature) {
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  // The signature is computed over the exact bytes Stripe sent, so this has to
  // be the raw body — parsing it as JSON first would break verification.
  const payload = await request.text();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      payload,
      signature,
      webhookSecret
    );
  } catch (err) {
    console.error("Stripe webhook signature verification failed", err);
    return new Response("Invalid signature", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
        await markPaid(event.data.object);
        break;

      case "checkout.session.expired":
      case "checkout.session.async_payment_failed":
        await markCancelled(event.data.object);
        break;
    }
  } catch (err) {
    // Returning 5xx makes Stripe retry, which is what we want for a transient
    // database failure.
    console.error(`Failed to handle Stripe event ${event.type}`, err);
    return new Response("Handler failed", { status: 500 });
  }

  return new Response(null, { status: 200 });
}

function orderIdFrom(session: Stripe.Checkout.Session): string | null {
  return session.metadata?.orderId ?? session.client_reference_id ?? null;
}

async function markPaid(session: Stripe.Checkout.Session) {
  const orderId = orderIdFrom(session);
  if (!orderId) {
    console.error(`Stripe session ${session.id} has no order reference`);
    return;
  }
  // Delayed payment methods complete the session before the money clears.
  if (session.payment_status !== "paid") {
    return;
  }

  // Scoping the update to pending rows makes redelivered events a no-op.
  const { count } = await prisma.order.updateMany({
    where: { id: orderId, status: "pending" },
    data: {
      status: "paid",
      stripeSessionId: session.id,
      email:
        session.customer_details?.email?.toLowerCase() ??
        session.customer_email?.toLowerCase() ??
        undefined,
    },
  });

  if (count === 0) {
    console.log(`Order ${orderId} was already settled — ignoring ${session.id}`);
  }
}

async function markCancelled(session: Stripe.Checkout.Session) {
  const orderId = orderIdFrom(session);
  if (!orderId) return;

  await prisma.order.updateMany({
    where: { id: orderId, status: "pending" },
    data: { status: "cancelled" },
  });
}
