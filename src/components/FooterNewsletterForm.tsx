"use client";

import { useActionState } from "react";
import { subscribeToNewsletter } from "@/lib/newsletter";

export default function FooterNewsletterForm() {
  const [state, formAction, isPending] = useActionState(
    subscribeToNewsletter.bind(null, "footer"),
    null
  );
  const submitted = state && "success" in state;

  if (submitted) {
    return (
      <p className="font-sans text-sm text-espresso/70">
        You&apos;re on the list — thank you.
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-1">
      <div className="flex border-b border-taupe/40 pb-2">
        <input
          type="email"
          name="email"
          required
          placeholder="Email address"
          className="flex-1 bg-transparent font-sans text-sm text-espresso placeholder:text-espresso/50 focus:outline-none"
        />
        <button
          type="submit"
          disabled={isPending}
          className="font-sans text-sm text-taupe-dark transition-transform duration-200 hover:translate-x-1 hover:text-gold disabled:opacity-50"
          aria-label="Subscribe"
        >
          →
        </button>
      </div>
      {state?.error && (
        <p className="font-sans text-xs text-red-700">{state.error}</p>
      )}
    </form>
  );
}
