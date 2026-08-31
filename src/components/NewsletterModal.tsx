"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "lumiermodest-newsletter-seen";

export default function NewsletterModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let seen = true;
    try {
      seen = localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      // ignore
    }
    if (seen) return;
    const timer = setTimeout(() => setOpen(true), 4000);
    return () => clearTimeout(timer);
  }, []);

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
          className="absolute right-4 top-4 text-lg text-espresso/60"
        >
          ×
        </button>

        {submitted ? (
          <>
            <p className="font-script text-3xl text-taupe-dark">Thank you</p>
            <p className="mt-3 font-sans text-sm text-espresso/70">
              Your 10% off code is on its way to your inbox.
            </p>
          </>
        ) : (
          <>
            <p className="font-script text-4xl text-taupe-dark">
              10% off, for you
            </p>
            <p className="mt-3 font-sans text-sm text-espresso/70">
              Sign up for early access to new collections, restocks, and
              exclusive offers.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
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
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-taupe/30 bg-transparent px-4 py-3 font-sans text-sm text-center focus:outline-none focus:border-taupe"
              />
              <button
                type="submit"
                className="bg-taupe-dark py-3 font-sans text-xs uppercase tracking-[0.18em] text-cream transition-colors hover:bg-espresso"
              >
                Subscribe
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
