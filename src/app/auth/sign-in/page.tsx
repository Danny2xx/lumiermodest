"use client";

import { useActionState } from "react";
import Link from "next/link";
import Flourish from "@/components/Flourish";
import { signInWithEmail } from "./actions";

const inputClass =
  "border border-taupe/30 bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-taupe";

export default function SignInPage() {
  const [state, formAction, isPending] = useActionState(signInWithEmail, null);

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <h1 className="text-center font-serif italic tracking-tight text-5xl text-taupe-dark">
        Sign in
      </h1>
      <Flourish className="mt-4" />
      <p className="mt-6 text-center font-sans text-sm text-espresso/70">
        Welcome back. Sign in to view your orders and saved details.
      </p>

      <form action={formAction} className="mt-10 flex flex-col gap-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className={inputClass}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className={inputClass}
        />
        {state?.error && (
          <p className="font-sans text-xs text-red-700">{state.error}</p>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="bg-taupe-dark py-3 font-sans text-xs uppercase tracking-[0.18em] text-cream transition-all duration-200 hover:scale-[1.02] hover:bg-espresso disabled:opacity-60 disabled:hover:scale-100"
        >
          {isPending ? "Signing in…" : "Sign In"}
        </button>
      </form>

      <p className="mt-6 text-center font-sans text-xs text-espresso/60">
        Don&apos;t have an account?{" "}
        <Link href="/auth/sign-up" className="underline hover:text-gold">
          Create one
        </Link>
      </p>
    </div>
  );
}
