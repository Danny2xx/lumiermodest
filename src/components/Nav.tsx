"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "./CartContext";

const links = [
  { href: "/abayas", label: "Abayas" },
  { href: "/hijabs", label: "Hijabs" },
  { href: "/last-chance", label: "Last Chance" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const { open, count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-taupe/15 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className="block h-px w-5 bg-espresso" />
          <span className="block h-px w-5 bg-espresso" />
        </button>

        <nav className="hidden gap-8 font-sans text-xs tracking-[0.18em] uppercase text-espresso md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-taupe"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/brand/logo-transparent.png"
            alt="LumierModest"
            width={44}
            height={44}
            className="h-11 w-11 object-contain"
            priority
          />
          <span className="hidden font-serif text-2xl text-taupe-dark sm:block">
            LumierModest
          </span>
        </Link>

        <div className="flex items-center gap-5">
          <Link
            href="/about"
            className="hidden font-sans text-xs tracking-[0.18em] uppercase text-espresso transition-colors hover:text-taupe md:hidden"
          >
            About
          </Link>
          <button
            onClick={open}
            className="relative font-sans text-xs tracking-[0.18em] uppercase text-espresso transition-colors hover:text-taupe"
            aria-label="Open cart"
          >
            Bag
            {count > 0 && (
              <span className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-taupe-dark text-[10px] text-cream">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-4 border-t border-taupe/15 px-6 py-4 font-sans text-sm uppercase tracking-[0.14em] md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
