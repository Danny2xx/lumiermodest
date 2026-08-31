"use client";

import Link from "next/link";
import { useCart } from "@/components/CartContext";

export default function CheckoutPage() {
  const { lines, subtotal } = useCart();

  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="font-serif text-4xl text-taupe-dark">Checkout</h1>

      {lines.length === 0 ? (
        <p className="mt-6 font-sans text-sm text-espresso/70">
          Your bag is empty.{" "}
          <Link href="/abayas" className="underline">
            Continue shopping
          </Link>
          .
        </p>
      ) : (
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

          <div className="mt-10 border border-taupe/30 bg-sand p-6 font-sans text-sm text-espresso/80">
            <p className="font-semibold">Payment is not yet connected.</p>
            <p className="mt-2">
              This is where Stripe Checkout will take over once a live
              Stripe account and API keys are added — it will securely
              collect card details and confirm the order. Nothing has been
              charged.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
