"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

const TICK_MS = 160;
const FAILSAFE_MS = 8000;

/**
 * Thin gold bar along the top edge while a client-side navigation is in
 * flight. Starts on internal link clicks and back/forward, finishes when the
 * pathname changes (or after a failsafe timeout).
 */
export default function NavigationProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const activeRef = useRef(false);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);
  const failsafe = useRef<ReturnType<typeof setTimeout> | null>(null);
  const settle = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (tick.current) clearInterval(tick.current);
    if (failsafe.current) clearTimeout(failsafe.current);
    if (settle.current) clearTimeout(settle.current);
    tick.current = failsafe.current = settle.current = null;
  };

  const finish = useCallback(() => {
    if (!activeRef.current) return;
    clearTimers();
    setProgress(100);
    settle.current = setTimeout(() => {
      activeRef.current = false;
      setActive(false);
      setProgress(0);
    }, 320);
  }, []);

  const start = useCallback(() => {
    clearTimers();
    activeRef.current = true;
    setActive(true);
    setProgress(14);
    tick.current = setInterval(() => {
      // Ease toward 90% and wait there for the route to resolve.
      setProgress((p) => Math.min(90, p + (90 - p) * 0.14 + 0.3));
    }, TICK_MS);
    failsafe.current = setTimeout(finish, FAILSAFE_MS);
  }, [finish]);

  // Route resolved.
  useEffect(() => {
    finish();
  }, [pathname, finish]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = e.target as Element | null;
      if (!target || target.closest("button, input, select, textarea, label")) return;
      const anchor = target.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      ) {
        return; // same page or hash link
      }
      start();
    };
    const onPop = () => start();
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPop);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPop);
      clearTimers();
    };
  }, [start]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="nav-progress"
          role="progressbar"
          aria-label="Loading page"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
          className="pointer-events-none fixed left-0 top-0 z-[95] h-[2px] bg-gold shadow-[0_0_10px_rgba(176,141,87,0.65)]"
          initial={{ opacity: 1, width: "0%" }}
          animate={{ opacity: 1, width: `${progress}%` }}
          exit={{ opacity: 0 }}
          transition={{
            width: { duration: 0.25, ease: "easeOut" },
            opacity: { duration: 0.3 },
          }}
        />
      )}
    </AnimatePresence>
  );
}
