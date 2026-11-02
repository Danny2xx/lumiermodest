"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import PlaceholderImage from "./PlaceholderImage";
import Reveal from "./motion/Reveal";
import { Stagger, StaggerItem } from "./motion/Stagger";
import { EASE } from "./motion/config";

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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export default function CommunityBand() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);

  const close = () => setOpenIndex(null);
  const prev = () => {
    setDirection(-1);
    setOpenIndex((i) => (i === null ? null : (i - 1 + swatches.length) % swatches.length));
  };
  const next = () => {
    setDirection(1);
    setOpenIndex((i) => (i === null ? null : (i + 1) % swatches.length));
  };

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex]);

  return (
    <section>
      <div className="flex flex-col items-center gap-2 bg-sand px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <Reveal variant="left">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-taupe">
            Follow Along
          </p>
          <p className="font-serif italic text-3xl text-taupe-dark">
            @lumiermodest
          </p>
        </Reveal>
        <Reveal variant="right" delay={0.15}>
          <p className="font-sans text-sm text-espresso/70">
            Join our community — share your looks and tag us @lumiermodest.
          </p>
        </Reveal>
      </div>
      <Stagger className="grid grid-cols-3 sm:grid-cols-6" stagger={0.06}>
        {swatches.map((s, i) => (
          <StaggerItem key={i} variant="scale">
            <button
              onClick={() => {
                setDirection(1);
                setOpenIndex(i);
              }}
              aria-label={`Open post ${i + 1}`}
              className="group relative block w-full overflow-hidden"
            >
              <PlaceholderImage
                swatch={s}
                className="aspect-square transition-transform duration-700 ease-luxe group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-espresso/0 transition-colors duration-500 group-hover:bg-espresso/25" />
            </button>
          </StaggerItem>
        ))}
      </Stagger>

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Community post"
            className="fixed inset-0 z-[60] flex items-center justify-center bg-espresso/70 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-6 top-6 text-2xl text-cream transition-transform duration-300 hover:rotate-90"
            >
              ×
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous"
              className="absolute left-4 text-cream/80 transition-all hover:-translate-x-0.5 hover:text-cream sm:left-8"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next"
              className="absolute right-4 text-cream/80 transition-all hover:translate-x-0.5 hover:text-cream sm:right-8"
            >
              <ChevronRight />
            </button>

            <motion.div
              className="flex w-full max-w-3xl flex-col overflow-hidden bg-cream shadow-xl sm:flex-row"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.45, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-square w-full overflow-hidden sm:w-1/2">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={openIndex}
                    custom={direction}
                    className="absolute inset-0"
                    variants={{
                      enter: (d: number) => ({ x: `${d * 40}%`, opacity: 0 }),
                      center: { x: 0, opacity: 1 },
                      exit: (d: number) => ({ x: `${d * -40}%`, opacity: 0 }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    <PlaceholderImage swatch={swatches[openIndex]} className="h-full w-full" />
                  </motion.div>
                </AnimatePresence>
              </div>
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
