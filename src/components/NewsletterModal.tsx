"use client";

import { useEffect, useState, useActionState } from "react";
import { usePathname } from "next/navigation";
import { subscribeToNewsletter } from "@/lib/newsletter";

const STORAGE_KEY = "lumiermodest-newsletter-seen";

export default function NewsletterModal() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(
    subscribeToNewsletter.bind(null, "modal"),
    null
  );
  const submitted = state && "success" in state;

  useEffect(() => {
    let seen = true;
    try {
      seen = localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      // ignore
    }
    if (seen) return;
    // Never interrupt someone who is buying, signing in, or running the shop.
    if (/^\/(checkout|admin|auth)/.test(pathname)) return;
    // 20 seconds, not 4: long enough to have actually seen something first.
    const timer = setTimeout(() => setOpen(true), 20000);
    return () => clearTimeout(timer);
  }, [pathname]);

  const dismiss = () => {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-espresso/50 px-4"
      onClick={dismiss}
    >
      <div
        className="relative w-full max-w-sm bg-cream p-8 text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-4 top-4 text-lg text-espresso/80"
        >
          ×
        </button>

        {submitted ? (
          <>
            <p className="font-serif italic text-3xl text-taupe-dark">
              Thank you
            </p>
            <p className="mt-3 font-sans text-sm text-espresso/80">
              You&apos;re on the list. We&apos;ll write before the next pieces
              go up.
            </p>
          </>
        ) : (
          <>
            <p className="font-serif italic tracking-tight text-4xl text-taupe-dark">
              See it first
            </p>
            <p className="mt-3 font-sans text-sm text-espresso/80">
              New pieces and restocks often go in small numbers. Leave your
              email and we&apos;ll tell you before they reach the shop.
            </p>
            <form
              action={(formData) => {
                formAction(formData);
                try {
                  localStorage.setItem(STORAGE_KEY, "true");
                } catch {
                  // ignore
                }
              }}
              className="mt-6 flex flex-col gap-3"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="Email address"
                className="border border-taupe/30 bg-transparent px-4 py-3 font-sans text-sm text-center focus:outline-none focus:border-taupe"
              />
              {state?.error && (
                <p className="font-sans text-xs text-red-700">{state.error}</p>
              )}
              <button
                type="submit"
                disabled={isPending}
                className="bg-taupe-dark py-3 font-sans text-xs uppercase tracking-[0.18em] text-cream transition-all duration-200 hover:scale-[1.02] hover:bg-espresso disabled:opacity-60"
              >
                {isPending ? "Adding you…" : "Keep me posted"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
