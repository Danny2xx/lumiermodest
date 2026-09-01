"use client";

import { useState } from "react";

export default function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-taupe/20 py-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between font-sans text-xs uppercase tracking-[0.14em] text-espresso"
      >
        {title}
        <span
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>
      {open && (
        <div className="mt-3 font-sans text-sm leading-relaxed text-espresso/80">
          {children}
        </div>
      )}
    </div>
  );
}
