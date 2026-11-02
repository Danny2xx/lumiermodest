"use client";

import { useSyncExternalStore } from "react";
import { INTRO_DONE_EVENT } from "./config";

function subscribe(onChange: () => void) {
  window.addEventListener(INTRO_DONE_EVENT, onChange);
  return () => window.removeEventListener(INTRO_DONE_EVENT, onChange);
}

function getSnapshot() {
  const root = document.documentElement;
  return (
    root.hasAttribute("data-intro-seen") ||
    root.hasAttribute("data-intro-done") ||
    !document.getElementById("lm-preloader")
  );
}

const getServerSnapshot = () => false;

/**
 * True once the brand intro has finished or was skipped. Lets above-the-fold
 * entrances wait for the curtain to lift instead of playing underneath it.
 */
export function useIntroReady() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
