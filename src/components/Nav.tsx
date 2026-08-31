"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "./CartContext";
import SearchOverlay from "./SearchOverlay";

const links = [
  { href: "/abayas", label: "Abayas" },
  { href: "/hijabs", label: "Hijabs" },
  { href: "/last-chance", label: "Last Chance" },
  { href: "/about", label: "About" },
];

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

export default function Nav() {
  const { open, count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-taupe/15 bg-cream/95 backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-6 py-4">
        <div className="flex items-center gap-6">
          <button
            className="flex flex-col gap-1.5 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className="block h-px w-5 bg-espresso" />
            <span className="block h-px w-5 bg-espresso" />
          </button>

          <nav className="hidden gap-6 font-sans text-xs tracking-[0.18em] uppercase text-espresso md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="whitespace-nowrap transition-colors hover:text-taupe"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <Link href="/" className="flex items-center gap-2 justify-self-center">
          <Image
            src="/brand/logo-transparent.png"
            alt="LumierModest"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <span className="hidden font-serif text-xl text-taupe-dark sm:block">
            LumierModest
          </span>
        </Link>

        <div className="flex items-center justify-end gap-5 text-espresso">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="transition-colors hover:text-taupe"
          >
            <SearchIcon />
          </button>
          <Link
            href="/account"
            aria-label="Account"
            className="transition-colors hover:text-taupe"
          >
            <AccountIcon />
          </Link>
          <button
            onClick={open}
            aria-label="Open cart"
            className="relative transition-colors hover:text-taupe"
          >
            <BagIcon />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-taupe-dark text-[10px] text-cream">
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

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
