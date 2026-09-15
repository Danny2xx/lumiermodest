"use client";

import { useActionState } from "react";
import Link from "next/link";
import Flourish from "@/components/Flourish";
import { requestPasswordReset } from "./actions";

const inputClass =
  "border border-taupe/30 bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-taupe";

export default function ForgotPasswordPage() {
  const [state, formAction, isPending] = useActionState(requestPasswordReset, null);
  const sent = state && "sent" in state;

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <h1 className="text-center font-serif italic tracking-tight text-5xl text-taupe-dark">
        Reset password
      </h1>
      <Flourish className="mt-4" />

      {sent ? (
        <p className="mt-8 text-center font-sans text-sm text-espresso/80">
          If an account exists for that email, we&apos;ve sent a link to reset
          your password. It expires in 15 minutes.
        </p>
      ) : (
        <>
          <p className="mt-6 text-center font-sans text-sm text-espresso/70">
            Enter your email and we&apos;ll send you a link to reset your
            password.
          </p>

          <form action={formAction} className="mt-10 flex flex-col gap-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
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
              {isPending ? "Sending…" : "Send Reset Link"}
            </button>
          </form>
        </>
      )}

      <p className="mt-6 text-center font-sans text-xs text-espresso/60">
        <Link href="/auth/sign-in" className="underline hover:text-gold">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
