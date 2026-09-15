"use client";

import { useActionState } from "react";
import Link from "next/link";
import { resetPassword } from "./actions";

const inputClass =
  "border border-taupe/30 bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-taupe";

export default function ResetPasswordForm({ token }: { token: string }) {
  const [state, formAction, isPending] = useActionState(resetPassword, null);

  if (!token) {
    return (
      <p className="mt-8 text-center font-sans text-sm text-espresso/80">
        This reset link is invalid or has expired.{" "}
        <Link href="/auth/forgot-password" className="underline hover:text-gold">
          Request a new one
        </Link>
        .
      </p>
    );
  }

  return (
    <form action={formAction} className="mt-10 flex flex-col gap-4">
      <input type="hidden" name="token" value={token} />
      <input
        name="newPassword"
        type="password"
        placeholder="New password"
        required
        minLength={8}
        className={inputClass}
      />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm new password"
        required
        minLength={8}
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
        {isPending ? "Saving…" : "Reset Password"}
      </button>
    </form>
  );
}
