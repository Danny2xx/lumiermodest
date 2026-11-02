"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { startCheckout } from "@/app/checkout/actions";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/shipping";

const inputClass =
  "border border-taupe/30 bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-taupe";

export default function CheckoutForm({
  defaultEmail,
  isSignedIn,
  stripeReady,
}: {
  defaultEmail: string;
  isSignedIn: boolean;
  stripeReady: boolean;
}) {
  const { lines, subtotal } = useCart();
  const [email, setEmail] = useState(defaultEmail);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await startCheckout(
        lines.map((l) => ({
          slug: l.product.slug,
          size: l.size,
          qty: l.qty,
        })),
        email
      );

      if ("error" in result) {
        setError(result.error);
        return;
      }
      // Hand off to Stripe's hosted checkout page.
      window.location.href = result.url;
    });
  };

  if (lines.length === 0) {
    return (
      <p className="mt-6 font-sans text-sm text-espresso/70">
        Your bag is empty.{" "}
        <Link href="/abayas" className="underline hover:text-gold">
          Continue shopping
        </Link>
        .
      </p>
    );
  }

  const qualifiesForFreeShipping = subtotal > FREE_SHIPPING_THRESHOLD;

  return (
    <>
      <ul className="mt-8 divide-y divide-taupe/15">
        {lines.map((l) => (
          <li
            key={`${l.product.slug}-${l.size}`}
            className="flex justify-between py-3 font-sans text-sm"
          >
            <span>
              {l.product.name} ({l.size}) × {l.qty}
            </span>
            <span>£{(l.product.price * l.qty).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-between font-serif text-xl text-espresso">
        <span>Subtotal</span>
        <span>£{subtotal.toFixed(2)}</span>
      </div>
      <p className="mt-2 font-sans text-xs text-espresso/60">
        {qualifiesForFreeShipping
          ? "Your order qualifies for free standard delivery."
          : `Delivery is calculated at the next step — free standard delivery over £${FREE_SHIPPING_THRESHOLD}.`}
      </p>

      <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4">
        <label
          htmlFor="checkout-email"
          className="font-sans text-xs uppercase tracking-[0.18em] text-espresso/70"
        >
          Email for your receipt
        </label>
        <input
          id="checkout-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          readOnly={isSignedIn}
          className={`${inputClass} ${isSignedIn ? "text-espresso/60" : ""}`}
        />

        {!stripeReady && (
          <p className="font-sans text-xs text-espresso/70">
            Card payment is being set up. In the meantime we&apos;d still love
            your order — message us on{" "}
            <Link href="/contact" className="underline hover:text-gold">
              WhatsApp or email
            </Link>{" "}
            and we&apos;ll arrange it personally.
          </p>
        )}
        {error && <p className="font-sans text-xs text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={isPending || !stripeReady}
          className="bg-taupe-dark py-3 font-sans text-xs uppercase tracking-[0.18em] text-cream transition-all duration-200 hover:scale-[1.02] hover:bg-espresso disabled:opacity-60 disabled:hover:scale-100"
        >
          {isPending ? "Taking you to payment…" : "Pay Securely"}
        </button>

        <p className="text-center font-sans text-xs text-espresso/50">
          Card details are collected by Stripe — they never touch our servers.
        </p>
      </form>
    </>
  );
}
