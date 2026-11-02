"use client";

import { useEffect, useState, useActionState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { subscribeToNewsletter } from "@/lib/newsletter";
import Spinner from "./motion/Spinner";
import { EASE } from "./motion/config";

const STORAGE_KEY = "lumiermodest-newsletter-seen";

export default function NewsletterModal() {
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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="newsletter"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-espresso/50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={dismiss}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Newsletter sign up"
            className="relative w-full max-w-sm bg-cream p-8 text-center shadow-xl"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.5, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={dismiss}
              aria-label="Close"
              className="absolute right-4 top-4 text-lg text-espresso/60 transition-all duration-300 hover:rotate-90 hover:text-espresso"
            >
              ×
            </button>

            <AnimatePresence mode="wait" initial={false}>
              {submitted ? (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <p className="font-serif italic text-3xl text-taupe-dark">
                    Thank you
                  </p>
                  <p className="mt-3 font-sans text-sm text-espresso/70">
                    You&apos;re on the list — early access and offers will land in
                    your inbox.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <p className="font-serif italic tracking-tight text-4xl text-taupe-dark">
                    10% off, for you
                  </p>
                  <p className="mt-3 font-sans text-sm text-espresso/70">
                    Sign up for early access to new collections, restocks, and
                    exclusive offers.
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
                      className="border border-taupe/30 bg-transparent px-4 py-3 text-center font-sans text-sm transition-colors focus:border-taupe focus:outline-none"
                    />
                    {state?.error && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-sans text-xs text-red-700"
                      >
                        {state.error}
                      </motion.p>
                    )}
                    <button
                      type="submit"
                      disabled={isPending}
                      className="flex items-center justify-center gap-2 bg-taupe-dark py-3 font-sans text-xs uppercase tracking-[0.18em] text-cream transition-all duration-200 hover:scale-[1.02] hover:bg-espresso active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100"
                    >
                      {isPending ? (
                        <>
                          <Spinner className="h-3 w-3" label="Submitting" />
                          Submitting…
                        </>
                      ) : (
                        "Subscribe"
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
