"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "lumiermodest-announcement-dismissed";

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

  if (!visible) return null;

  return (
    <div className="relative flex items-center justify-center bg-espresso px-10 py-2 text-center font-sans text-xs tracking-[0.1em] text-cream">
      <p>
        Free UK shipping on orders over £75 — no code needed.
      </p>
      <button
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-3 text-cream/70 hover:text-cream"
      >
        ×
      </button>
    </div>
  );
}
