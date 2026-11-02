/**
 * Plain data, no Stripe import — the checkout UI is a Client Component and
 * needs to read the threshold.
 *
 * These mirror the published rates on /shipping. Both are still the
 * placeholder figures on that page — update the two together once real
 * carrier pricing is confirmed.
 */
export const FREE_SHIPPING_THRESHOLD = 75;

export const SHIPPING_RATES = [
  { label: "Standard delivery", amount: 3.95, minDays: 3, maxDays: 5 },
  { label: "Express delivery", amount: 6.95, minDays: 1, maxDays: 2 },
] as const;

/** We ship to the UK only — see /shipping. */
export const SHIPPING_COUNTRIES = ["GB"] as const;
