"use client";

import { useState } from "react";
import Image from "next/image";
import PlaceholderImage from "./PlaceholderImage";

const swatches: [string, string][] = [
  ["#e7d7bf", "#c9ad84"],
  ["#8a6a4f", "#5c4530"],
  ["#b08d57", "#8a6a4f"],
  ["#ece0d1", "#b08d57"],
  ["#5c4530", "#3c2c20"],
  ["#faf5ec", "#ece0d1"],
];

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export default function CommunityBand() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = () => setOpenIndex(null);
  const prev = () =>
    setOpenIndex((i) => (i === null ? null : (i - 1 + swatches.length) % swatches.length));
  const next = () =>
    setOpenIndex((i) => (i === null ? null : (i + 1) % swatches.length));

  return (
    <section>
      <div className="flex flex-col items-center gap-2 bg-sand px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-taupe">
            Follow Along
          </p>
          <p className="font-serif italic text-3xl text-taupe-dark">
            @lumiermodest
          </p>
        </div>
        <p className="font-sans text-sm text-espresso/70">
          Join our community — share your looks and tag us @lumiermodest.
        </p>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-6">
        {swatches.map((s, i) => (
          <button
            key={i}
            onClick={() => setOpenIndex(i)}
            aria-label={`Open post ${i + 1}`}
            className="group relative"
          >
            <PlaceholderImage swatch={s} className="aspect-square" />
            <span className="absolute inset-0 flex items-center justify-center bg-espresso/0 transition-colors group-hover:bg-espresso/20" />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-espresso/70 px-4"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Close"
            className="absolute right-6 top-6 text-2xl text-cream"
          >
            ×
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous"
            className="absolute left-4 text-cream/80 hover:text-cream sm:left-8"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next"
            className="absolute right-4 text-cream/80 hover:text-cream sm:right-8"
          >
            <ChevronRight />
          </button>

          <div
            className="flex w-full max-w-3xl flex-col overflow-hidden bg-cream shadow-xl sm:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <PlaceholderImage
              swatch={swatches[openIndex]}
              className="aspect-square w-full sm:w-1/2"
            />
            <div className="flex w-full flex-col p-6 sm:w-1/2">
              <div className="flex items-center gap-2 border-b border-taupe/15 pb-4">
                <Image
                  src="/brand/logo-transparent.png"
                  alt="LumierModest"
                  width={28}
                  height={28}
                  className="h-7 w-7 object-contain"
                />
                <span className="font-sans text-sm font-semibold text-espresso">
                  lumiermodest
                </span>
              </div>
              <p className="mt-4 font-sans text-sm leading-relaxed text-espresso/80">
                This is a placeholder for real customer photos. Follow{" "}
                <span className="font-semibold">@lumiermodest</span> on
                Instagram — tag us in your looks to be featured here.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
