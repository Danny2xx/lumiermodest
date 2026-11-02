import "server-only";
import Stripe from "stripe";
import {
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_COUNTRIES,
  SHIPPING_RATES,
} from "./shipping";

let client: Stripe | null = null;

/**
 * Pasting a secret into a dashboard easily drags in a trailing line break.
 * For the API key, Node then refuses to put it in the Authorization header,
 * which surfaces only as a misleading "connection to Stripe" error. For the
 * webhook secret it's worse: every signature check fails silently, so payments
 * succeed but orders never get marked paid. So trim, and if the value still
 * isn't shaped like a key, say so plainly. The value itself is never logged.
 */
function readSecret(name: string, shape: RegExp): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is not set`);
  }
  if (!shape.test(value)) {
    throw new Error(
      `${name} is malformed: it contains unexpected characters. It was ` +
        "probably pasted with something extra, or a masked preview was " +
        "copied instead of the real value. Re-add it in Vercel and redeploy."
    );
  }
  return value;
}

/**
 * Built lazily so the app still builds and deploys before the live keys are
 * added in Vercel — only the checkout paths fail, not the whole site.
 */
export function getStripe(): Stripe {
  if (!client) {
    client = new Stripe(
      readSecret("STRIPE_SECRET_KEY", /^(sk|rk)_(test|live)_[A-Za-z0-9]+$/)
    );
  }
  return client;
}

export function getWebhookSecret(): string {
  return readSecret("STRIPE_WEBHOOK_SECRET", /^whsec_[A-Za-z0-9+/=_-]+$/);
}

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY?.trim());
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
