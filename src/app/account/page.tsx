import Link from "next/link";
import { auth } from "@/lib/auth/server";
import { getOrdersForUser } from "@/lib/orders";
import Flourish from "@/components/Flourish";
import AccountSettings from "./AccountSettings";
import { signOut } from "./actions";

export const metadata = { title: "Your account — LumierModest" };
export const dynamic = "force-dynamic";

const money = (n: number) => `£${n.toFixed(2)}`;

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/** Plain language, from the customer's point of view. */
const STATUS_LABEL: Record<string, string> = {
  pending: "Payment being confirmed",
  paid: "Paid — we're preparing it",
  fulfilled: "On its way",
  cancelled: "Cancelled",
};

export default async function AccountPage() {
  const { data: session } = await auth.getSession();
  const user = session?.user;

  if (!user) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h1 className="font-serif italic tracking-tight text-5xl text-taupe-dark">
          Your account
        </h1>
        <Flourish className="mt-4" />
        <p className="mt-8 font-sans text-sm text-espresso">
          Sign in to see your orders and manage your details.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/auth/sign-in"
            className="bg-taupe-dark px-8 py-3 font-sans text-xs uppercase tracking-[0.18em] text-cream transition-all duration-200 hover:scale-[1.02] hover:bg-espresso"
          >
            Sign in
          </Link>
          <Link
            href="/auth/sign-up"
            className="border border-taupe-dark px-8 py-3 font-sans text-xs uppercase tracking-[0.18em] text-taupe-dark transition-all duration-200 hover:bg-taupe-dark hover:text-cream"
          >
            Create an account
          </Link>
        </div>
      </div>
    );
  }

  const orders = await getOrdersForUser(user.id);
  const firstName = user.name?.split(" ")[0] ?? "";

  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="text-center font-serif italic tracking-tight text-5xl text-taupe-dark">
        {firstName ? `Hello, ${firstName}` : "Your account"}
      </h1>
      <Flourish className="mt-4" />

      <h2 className="mt-14 font-serif text-2xl text-taupe-dark">Your orders</h2>

      {orders.length === 0 ? (
        <div className="mt-6 border border-taupe/30 bg-sand px-6 py-8 text-center">
          <p className="font-sans text-sm text-espresso">
            Nothing here yet — your orders will appear as soon as you place one.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block bg-taupe-dark px-8 py-3 font-sans text-xs uppercase tracking-[0.18em] text-cream transition-all duration-200 hover:scale-[1.02] hover:bg-espresso"
          >
            Start browsing
          </Link>
        </div>
      ) : (
        <ul className="mt-6 divide-y divide-taupe/15 border-y border-taupe/15">
          {orders.map((order) => (
            <li key={order.id} className="py-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-serif text-lg text-espresso">
                  {dateFormat.format(order.placedAt)}
                </p>
                <p className="font-sans text-xs uppercase tracking-[0.14em] text-taupe-dark">
                  {STATUS_LABEL[order.status] ?? order.status}
                </p>
              </div>

              <ul className="mt-3 space-y-1">
                {order.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between font-sans text-sm text-espresso"
                  >
                    <span>
                      <Link
                        href={`/products/${item.slug}`}
                        className="hover:text-taupe hover:underline"
                      >
                        {item.name}
                      </Link>
                      <span className="text-espresso/80">
                        {" "}
                        · size {item.size}
                        {item.qty > 1 ? ` · ${item.qty} of them` : ""}
                      </span>
                    </span>
                    <span>{money(item.price * item.qty)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex justify-between font-sans text-sm text-espresso">
                <span>Items total</span>
                <span>{money(order.subtotal)}</span>
              </div>
              <p className="mt-2 font-sans text-xs text-espresso/80">
                Delivery is shown on your emailed receipt. Reference{" "}
                <span className="font-semibold text-espresso">{order.id}</span> —
                quote it if you{" "}
                <Link href="/contact" className="underline hover:text-gold-ink">
                  get in touch
                </Link>
                .
              </p>
            </li>
          ))}
        </ul>
      )}

      <AccountSettings name={user.name ?? ""} email={user.email} />

      {user.role === "admin" && (
        <div className="mt-12 flex justify-center">
          <Link
            href="/admin"
            className="border border-gold px-8 py-3 font-sans text-xs uppercase tracking-[0.18em] text-gold transition-all duration-200 hover:scale-[1.02] hover:bg-gold hover:text-cream"
          >
            Manage store
          </Link>
        </div>
      )}

      <form action={signOut} className="mt-8 flex justify-center">
        <button
          type="submit"
          className="border border-taupe-dark px-8 py-3 font-sans text-xs uppercase tracking-[0.18em] text-taupe-dark transition-all duration-200 hover:scale-[1.02] hover:bg-taupe-dark hover:text-cream"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}
