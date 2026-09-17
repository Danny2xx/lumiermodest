"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import SearchOverlay from "./SearchOverlay";
import Flourish from "./Flourish";

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

function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 20.5s-7.5-4.6-10-9.3C.6 8.1 2 4.5 5.4 3.7 8 3.1 10.3 4.4 12 7c1.7-2.6 4-3.9 6.6-3.3 3.4.8 4.8 4.4 3.4 7.5-2.5 4.7-10 9.3-10 9.3Z" />
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

export default function Nav({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  const { open, count } = useCart();
  const { open: openWishlist, count: wishlistCount } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-taupe/15">
      <button
        className="absolute left-6 top-1/2 z-50 flex h-4 w-6 -translate-y-1/2 flex-col justify-between md:hidden"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span
          className={`block h-px w-6 transition-colors duration-300 ${menuOpen ? "bg-cream" : "bg-espresso"} transition-transform duration-300 ${
            menuOpen ? "translate-y-[7.5px] rotate-45" : ""
          }`}
        />
        <span
          className={`block h-px w-6 transition-colors duration-300 ${menuOpen ? "bg-cream" : "bg-espresso"} transition-opacity duration-200 ${
            menuOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block h-px w-6 transition-colors duration-300 ${menuOpen ? "bg-cream" : "bg-espresso"} transition-transform duration-300 ${
            menuOpen ? "-translate-y-[7.5px] -rotate-45" : ""
          }`}
        />
      </button>
      <div className="bg-cream/95 backdrop-blur">
      <div
        className={`mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-6 transition-[padding] duration-300 ${
          scrolled ? "py-2" : "py-3"
        }`}
      >
        {/* Empty track, so the brand centres against the icons opposite. */}
        <div aria-hidden />

        <Link href="/" className="flex items-center gap-2 justify-self-center">
          <Image
            src="/brand/logo-transparent.png"
            alt="LumierModest"
            width={40}
            height={40}
            className={`object-contain transition-all duration-300 ${
              scrolled ? "h-8 w-8" : "h-10 w-10"
            }`}
            priority
          />
          <span
            className={`hidden font-serif text-taupe-dark transition-all duration-300 sm:block ${
              scrolled ? "text-lg" : "text-xl"
            }`}
          >
            LumierModest
          </span>
        </Link>

        <div className="flex items-center justify-end gap-5 text-espresso">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="transition-colors hover:text-gold"
          >
            <SearchIcon />
          </button>
          <Link
            href="/account"
            aria-label="Account"
            className="transition-colors hover:text-gold"
          >
            <AccountIcon />
          </Link>
          <button
            onClick={openWishlist}
            aria-label="Open wishlist"
            className="relative transition-colors hover:text-gold"
          >
            <HeartIcon />
            {wishlistCount > 0 && (
              <span className="absolute -right-2 -top-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-taupe-dark text-[10px] text-cream">
                {wishlistCount}
              </span>
            )}
          </button>
          <button
            onClick={open}
            aria-label="Open cart"
            className="relative transition-colors hover:text-gold"
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

      {/* Categories get their own row, so the list can grow as she adds
          them without crowding the brand. Wraps rather than overflowing.
          Hidden on mobile — the burger menu covers it there. */}
      <nav
        className={`mx-auto hidden max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 font-sans text-xs uppercase tracking-[0.18em] text-espresso transition-[padding] duration-300 md:flex ${
          scrolled ? "pb-2" : "pb-3"
        }`}
      >
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="relative whitespace-nowrap pb-1 transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:text-gold hover:after:w-full"
          >
            {l.label}
          </Link>
        ))}
      </nav>
      </div>

      {/* Full-screen mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-espresso transition-opacity duration-500 md:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8 px-6">
          <nav className="flex flex-col items-center gap-6">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`font-serif italic text-4xl text-cream transition-all duration-500 hover:text-gold ${
                  menuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: menuOpen ? `${150 + i * 70}ms` : "0ms" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div
            className={`transition-all duration-500 ${
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: menuOpen ? "430ms" : "0ms" }}
          >
            <Flourish tone="cream" />
          </div>

          <div
            className={`flex items-center gap-8 text-cream transition-all duration-500 ${
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: menuOpen ? "500ms" : "0ms" }}
          >
            <button
              onClick={() => {
                setMenuOpen(false);
                setSearchOpen(true);
              }}
              aria-label="Search"
              className="transition-colors hover:text-gold"
            >
              <SearchIcon />
            </button>
            <Link
              href="/account"
              onClick={() => setMenuOpen(false)}
              aria-label="Account"
              className="transition-colors hover:text-gold"
            >
              <AccountIcon />
            </Link>
            <button
              onClick={() => {
                setMenuOpen(false);
                openWishlist();
              }}
              aria-label="Open wishlist"
              className="transition-colors hover:text-gold"
            >
              <HeartIcon />
            </button>
            <button
              onClick={() => {
                setMenuOpen(false);
                open();
              }}
              aria-label="Open cart"
              className="transition-colors hover:text-gold"
            >
              <BagIcon />
            </button>
          </div>
        </div>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
