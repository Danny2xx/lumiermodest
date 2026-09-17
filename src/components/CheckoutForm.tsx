"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import ProductImage from "@/components/ProductImage";
import { startCheckout } from "@/app/checkout/actions";
import { amountToFreeDelivery, SHIPPING_RATES } from "@/lib/shipping";

const money = (n: number) => `£${n.toFixed(2)}`;

export default function CheckoutForm({
  customerEmail,
  stripeReady,
}: {
  customerEmail: string;
  stripeReady: boolean;
}) {
  const { lines, subtotal, hasSoldOut, open } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handlePay = () => {
    setError(null);
    startTransition(async () => {
      const result = await startCheckout(
        lines.map((l) => ({
          slug: l.product.slug,
          size: l.size,
          qty: l.qty,
        }))
      );

      if ("error" in result) {
        setError(result.error);
        return;
      }
      // Hand off to Stripe's hosted payment page.
      window.location.href = result.url;
    });
  };

  if (lines.length === 0) {
    return (
      <p className="mt-6 font-sans text-sm text-espresso">
        There&apos;s nothing in your bag yet.{" "}
        <Link href="/" className="underline hover:text-gold">
          Start browsing
        </Link>
        .
      </p>
    );
  }

  const toFree = amountToFreeDelivery(subtotal);

  return (
    <>
      <ul className="mt-8 divide-y divide-taupe/15 border-y border-taupe/15">
        {lines.map((l) => (
          <li
            key={`${l.product.slug}-${l.size}`}
            className="flex items-center gap-4 py-4"
          >
            <ProductImage
              src={l.product.images?.[0]}
              swatch={l.product.swatch}
              alt={l.product.name}
              sizes="64px"
              className="h-20 w-16 flex-shrink-0"
            />
            <div className="flex-1">
              <p className="font-serif text-lg text-espresso">
                {l.product.name}
              </p>
              <p className="font-sans text-xs text-espresso/80">
                Size {l.size}
                {l.qty > 1 ? ` · ${l.qty} of them` : ""}
              </p>
            </div>
            <p className="font-sans text-sm text-espresso">
              {money(l.product.price * l.qty)}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex justify-between font-serif text-xl text-espresso">
        <span>Subtotal</span>
        <span>{money(subtotal)}</span>
      </div>
      <p className="mt-2 font-sans text-xs text-espresso/80">
        {toFree === 0
          ? "Free UK standard delivery included — you'll pick your delivery speed next."
          : `Delivery from ${money(
              SHIPPING_RATES[0].amount
            )}, chosen on the next step. Spend ${money(
              toFree
            )} more for free standard delivery.`}
      </p>

      <div className="mt-10">
        {hasSoldOut ? (
          <div className="border border-taupe/30 bg-sand px-4 py-4">
            <p className="font-sans text-sm text-espresso">
              Something in your bag has sold out since you added it.
            </p>
            <button
              onClick={open}
              className="mt-2 font-sans text-xs uppercase tracking-wide text-taupe-dark underline hover:text-espresso"
            >
              Open my bag
            </button>
          </div>
        ) : (
          <>
            {!stripeReady && (
              <p className="mb-3 font-sans text-sm text-espresso">
                Card payment is being set up. We&apos;d still love your order —
                message us on{" "}
                <Link href="/contact" className="underline hover:text-gold">
                  WhatsApp or email
                </Link>{" "}
                and we&apos;ll arrange it personally.
              </p>
            )}
            {error && (
              <p role="alert" className="mb-3 font-sans text-sm text-red-700">
                {error}
              </p>
            )}
            <button
              onClick={handlePay}
              disabled={isPending || !stripeReady}
              className="w-full bg-taupe-dark py-4 font-sans text-xs uppercase tracking-[0.18em] text-cream transition-all duration-200 hover:scale-[1.01] hover:bg-espresso disabled:opacity-60 disabled:hover:scale-100"
            >
              {isPending ? "Taking you to payment…" : "Continue to payment"}
            </button>
            <p className="mt-3 text-center font-sans text-xs text-espresso/80">
              {customerEmail
                ? `Your receipt goes to ${customerEmail}.`
                : "You'll add your email and delivery address on the next step."}{" "}
              Card details are handled by Stripe and never reach us.
            </p>
          </>
        )}
      </div>
    </>
  );
}
