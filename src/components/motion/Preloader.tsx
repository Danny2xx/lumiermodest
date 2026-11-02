"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import SplitText from "./SplitText";
import { EASE, EASE_IN_OUT, INTRO_DONE_EVENT, INTRO_STORAGE_KEY } from "./config";

type Phase = "run" | "exit" | "gone";

const noopSubscribe = () => () => {};
const readSeen = () => document.documentElement.hasAttribute("data-intro-seen");
const serverSeen = () => false;

const INTRO_MS = 2300;

/**
 * One-time brand curtain, shown once per browser session. Server-rendered so
 * it covers the page before hydration; an inline script in the root layout
 * hides it instantly on repeat visits. Click anywhere to skip.
 */
export default function Preloader() {
  const seen = useSyncExternalStore(noopSubscribe, readSeen, serverSeen);
  const [phase, setPhase] = useState<Phase>("run");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (seen) return;
    document.body.style.overflow = "hidden";
    timer.current = setTimeout(() => setPhase("exit"), INTRO_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
      document.body.style.overflow = "";
    };
  }, [seen]);

  useEffect(() => {
    if (phase !== "exit") return;
    try {
      sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
    } catch {
      // private mode: the intro simply plays again next load
    }
    document.body.style.overflow = "";
    document.documentElement.setAttribute("data-intro-done", "");
    window.dispatchEvent(new Event(INTRO_DONE_EVENT));
  }, [phase]);

  if (seen || phase === "gone") return null;

  const skip = () => {
    if (phase !== "run") return;
    if (timer.current) clearTimeout(timer.current);
    setPhase("exit");
  };

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.documentElement.setAttribute("data-intro-seen", "");
        setPhase("gone");
      }}
    >
      {phase !== "exit" && (
        <motion.div
          key="curtain"
          id="lm-preloader"
          onClick={skip}
          aria-hidden
          className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-cream text-center"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: EASE_IN_OUT }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
          >
            <Image
              src="/brand/logo-transparent.png"
              alt=""
              width={96}
              height={96}
              priority
              className="h-20 w-20 object-contain sm:h-24 sm:w-24"
            />
          </motion.div>

          <SplitText
            text="LumierModest"
            as="p"
            by="char"
            mode="mount"
            delay={0.35}
            stagger={0.045}
            duration={0.8}
            className="mt-5 font-serif text-3xl tracking-[0.08em] text-taupe-dark sm:text-4xl"
          />

          <motion.span
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
            className="mt-5 block h-px w-24 origin-center bg-gold"
          />

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.15, ease: EASE }}
            className="mt-4 font-sans text-[10px] uppercase tracking-[0.32em] text-taupe"
          >
            Timeless Modesty. Elevated Elegance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="absolute bottom-8 h-px w-16 overflow-hidden bg-taupe/15"
          >
            <motion.span
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              className="block h-full w-full bg-gold/70"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
