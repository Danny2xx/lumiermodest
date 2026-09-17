import { auth } from "@/lib/auth/server";
import { isStripeConfigured } from "@/lib/stripe";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata = { title: "Checkout — LumierModest" };
export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const { data: session } = await auth.getSession();
  const email = session?.user?.email ?? "";

  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="font-serif text-4xl text-taupe-dark">Checkout</h1>
      <CheckoutForm
        defaultEmail={email}
        isSignedIn={Boolean(email)}
        stripeReady={isStripeConfigured()}
      />
    </div>
  );
}
