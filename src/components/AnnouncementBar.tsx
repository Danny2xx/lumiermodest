"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Marquee from "./motion/Marquee";
import Sparkle from "./Sparkle";
import { EASE } from "./motion/config";

const STORAGE_KEY = "lumiermodest-announcement-dismissed";

const messages = [
  "Free UK shipping on orders over £75 — no code needed",
  "Designed in the UK",
  "14-day returns",
];

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "true") return;
    } catch {
      // ignore
    }
    setVisible(true);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
  };

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          key="announcement"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="relative overflow-hidden bg-espresso font-sans text-xs tracking-[0.1em] text-cream"
        >
          <div className="relative py-2 pr-10">
            <Marquee
              items={messages}
              separator={<Sparkle className="h-2 w-2 text-gold" />}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-espresso to-transparent"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-10 w-10 bg-linear-to-l from-espresso to-transparent"
            />
          </div>
          <button
            onClick={dismiss}
            aria-label="Dismiss announcement"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/70 transition-all duration-300 hover:rotate-90 hover:text-cream"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
