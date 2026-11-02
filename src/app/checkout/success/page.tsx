import Link from "next/link";
import { prisma } from "@/lib/db";
import Flourish from "@/components/Flourish";
import ClearCartOnSuccess from "@/components/ClearCartOnSuccess";

export const metadata = { title: "Order Confirmed — LumierModest" };
export const dynamic = "force-dynamic";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  const order = sessionId
    ? await prisma.order.findUnique({
        where: { stripeSessionId: sessionId },
        include: { items: true },
      })
    : null;

  if (!order) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h1 className="font-serif italic tracking-tight text-5xl text-taupe-dark">
          We couldn&apos;t find that order
        </h1>
        <Flourish className="mt-4" />
        <p className="mt-8 font-sans text-sm text-espresso/70">
          If you were charged, your confirmation email will still arrive. Get in
          touch via our{" "}
          <Link href="/contact" className="underline hover:text-gold">
            contact page
          </Link>{" "}
          and we&apos;ll look it up for you.
        </p>
      </div>
    );
  }

  const total = Number(order.subtotal);

  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <ClearCartOnSuccess />

      <h1 className="text-center font-serif italic tracking-tight text-5xl text-taupe-dark">
        Thank you
      </h1>
      <Flourish className="mt-4" />

      <p className="mt-8 text-center font-sans text-sm text-espresso/80">
        Your order is confirmed. We&apos;ve sent a receipt to{" "}
        <span className="font-semibold text-espresso">{order.email}</span>.
      </p>

      <div className="mt-10 border border-taupe/30 bg-sand p-6">
        <p className="font-sans text-xs uppercase tracking-[0.18em] text-espresso/60">
          Order reference
        </p>
        <p className="mt-1 font-serif text-xl text-taupe-dark">{order.id}</p>

        <ul className="mt-6 divide-y divide-taupe/15">
          {order.items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between py-3 font-sans text-sm text-espresso/80"
            >
              <span>
                {item.productName} ({item.size}) × {item.qty}
              </span>
              <span>£{(Number(item.price) * item.qty).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex justify-between font-serif text-xl text-espresso">
          <span>Subtotal</span>
          <span>£{total.toFixed(2)}</span>
        </div>
        <p className="mt-2 font-sans text-xs text-espresso/60">
          Delivery is shown separately on your Stripe receipt.
        </p>

        {order.status === "pending" && (
          <p className="mt-4 font-sans text-xs text-espresso/60">
            Payment is still being confirmed — this usually takes a few seconds.
            Refresh in a moment, or check your email.
          </p>
        )}
      </div>

      <p className="mt-8 text-center font-sans text-sm text-espresso/70">
        Orders are processed within 1–2 business days — see our{" "}
        <Link href="/shipping" className="underline hover:text-gold">
          shipping policy
        </Link>
        .
      </p>

      <div className="mt-8 flex justify-center">
        <Link
          href="/"
          className="border border-gold px-8 py-3 font-sans text-xs uppercase tracking-[0.18em] text-gold transition-all duration-200 hover:scale-[1.02] hover:bg-gold hover:text-cream"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
