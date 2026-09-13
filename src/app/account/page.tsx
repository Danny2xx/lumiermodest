import { auth } from "@/lib/auth/server";
import Flourish from "@/components/Flourish";
import { signOut } from "./actions";

export const metadata = { title: "Account — LumierModest" };
export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const { data: session } = await auth.getSession();
  const user = session?.user;

  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="text-center font-serif italic tracking-tight text-5xl text-taupe-dark">
        Account
      </h1>
      <Flourish className="mt-4" />

      {user ? (
        <>
          <p className="mt-8 text-center font-sans text-sm text-espresso/80">
            Signed in as{" "}
            <span className="font-semibold text-espresso">{user.name}</span> (
            {user.email})
          </p>

          <div className="mt-10 border border-taupe/30 bg-sand p-6">
            <p className="font-serif text-xl text-taupe-dark">Order history</p>
            <p className="mt-2 font-sans text-sm text-espresso/70">
              You haven&apos;t placed any orders yet. Once checkout is
              connected, your past orders will appear here.
            </p>
          </div>

          <form action={signOut} className="mt-8 flex justify-center">
            <button
              type="submit"
              className="border border-taupe-dark px-8 py-3 font-sans text-xs uppercase tracking-[0.18em] text-taupe-dark transition-all duration-200 hover:scale-[1.02] hover:bg-taupe-dark hover:text-cream"
            >
              Sign Out
            </button>
          </form>
        </>
      ) : (
        <p className="mt-8 text-center font-sans text-sm text-espresso/70">
          You need to sign in to view your account.
        </p>
      )}
    </div>
  );
}
