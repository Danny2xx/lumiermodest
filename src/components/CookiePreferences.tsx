"use client";

import { useState } from "react";

export default function CookiePreferences() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="hover:text-taupe">
        Cookie preferences
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-espresso/50 px-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-sm bg-cream p-8 text-left shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-script text-3xl text-taupe-dark">
              Cookie preferences
            </p>
            <p className="mt-4 font-sans text-sm leading-relaxed text-espresso/80">
              This site currently only uses essential cookies needed for the
              shopping bag to work — nothing for analytics or marketing yet.
              When that changes, this is where you&apos;ll be able to manage
              your preferences.
            </p>
            <button
              onClick={() => setOpen(false)}
              className="mt-6 bg-taupe-dark px-6 py-3 font-sans text-xs uppercase tracking-[0.18em] text-cream transition-colors hover:bg-espresso"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
