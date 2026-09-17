import "server-only";
import Stripe from "stripe";
import {
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_COUNTRIES,
  SHIPPING_RATES,
} from "./shipping";

let client: Stripe | null = null;

/**
 * Built lazily so the app still builds and deploys before the live keys are
 * added in Vercel — only the checkout paths fail, not the whole site.
 */
export function getStripe(): Stripe {
  if (!client) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    client = new Stripe(key);
  }
  return client;
}

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export const CURRENCY = "gbp";

/** Stripe works in the smallest currency unit — pence, not pounds. */
export function toPence(amount: number): number {
  return Math.round(amount * 100);
}

type ShippingOption = Stripe.Checkout.SessionCreateParams.ShippingOption;

export const ALLOWED_SHIPPING_COUNTRIES: Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[] =
  [...SHIPPING_COUNTRIES];

function toShippingOption(
  rate: (typeof SHIPPING_RATES)[number],
  amount: number
): ShippingOption {
  return {
    shipping_rate_data: {
      type: "fixed_amount",
      fixed_amount: { amount: toPence(amount), currency: CURRENCY },
      display_name: rate.label,
      delivery_estimate: {
        minimum: { unit: "business_day", value: rate.minDays },
        maximum: { unit: "business_day", value: rate.maxDays },
      },
    },
  };
}

/** Standard delivery becomes free over the threshold; express always costs. */
export function buildShippingOptions(subtotal: number): ShippingOption[] {
  const [standard, express] = SHIPPING_RATES;
  const standardAmount =
    subtotal > FREE_SHIPPING_THRESHOLD ? 0 : standard.amount;

  return [
    toShippingOption(standard, standardAmount),
    toShippingOption(express, express.amount),
  ];
}
