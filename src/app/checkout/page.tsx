import { auth } from "@/lib/auth/server";
import { isStripeConfigured } from "@/lib/stripe";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata = { title: "Your order — LumierModest" };
export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const { data: session } = await auth.getSession();
  const email = session?.user?.email ?? "";

  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="font-serif text-4xl text-taupe-dark">Your order</h1>
      <p className="mt-2 font-sans text-sm text-espresso/80">
        Have a last look, then we&apos;ll take you to payment.
      </p>
      <CheckoutForm customerEmail={email} stripeReady={isStripeConfigured()} />
    </div>
  );
}
