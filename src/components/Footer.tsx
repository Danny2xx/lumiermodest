import Image from "next/image";
import Link from "next/link";
import CookiePreferences from "./CookiePreferences";

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.6 5.1c-.9-.6-1.5-1.6-1.6-2.7h-3.1v13.4c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5c.3 0 .5 0 .8.1v-3.2c-.3 0-.5-.1-.8-.1-3.1 0-5.6 2.5-5.6 5.6s2.5 5.6 5.6 5.6 5.6-2.5 5.6-5.6V9c1.2.9 2.7 1.4 4.2 1.4V7.3c-.9 0-1.8-.3-2.6-.8-.1 0-.1-.1-.2-.1z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-taupe/15 bg-sand">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2">
        <div className="flex flex-col gap-3 font-sans text-sm uppercase tracking-[0.14em] text-espresso/80">
          <Link href="/about" className="hover:text-taupe">
            About
          </Link>
          <Link href="/sizing" className="hover:text-taupe">
            Sizing Guide
          </Link>
          <Link href="/shipping" className="hover:text-taupe">
            Shipping Policy
          </Link>
          <Link href="/returns" className="hover:text-taupe">
            Refund Policy
          </Link>
          <Link href="/contact" className="hover:text-taupe">
            Contact
          </Link>
        </div>

        <div>
          <p className="mb-4 font-serif text-xl text-taupe-dark">
            Be the first to know — early access, exclusive previews &amp;
            special offers
          </p>
          <form className="flex border-b border-taupe/40 pb-2">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 bg-transparent font-sans text-sm text-espresso placeholder:text-espresso/50 focus:outline-none"
            />
            <button
              type="submit"
              className="font-sans text-sm text-taupe-dark"
              aria-label="Subscribe"
            >
              →
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-10">
        <Image
          src="/brand/logo-transparent.png"
          alt="LumierModest"
          width={160}
          height={160}
          className="h-36 w-36 object-contain"
        />
      </div>

      <div className="border-t border-taupe/15 px-6 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 font-sans text-xs text-espresso/60 md:flex-row">
          <p>© {new Date().getFullYear()} LumierModest. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="hover:text-taupe">
              Privacy policy
            </Link>
            <Link href="/returns" className="hover:text-taupe">
              Refund policy
            </Link>
            <Link href="/terms" className="hover:text-taupe">
              Terms of service
            </Link>
            <Link href="/shipping" className="hover:text-taupe">
              Shipping policy
            </Link>
            <Link href="/contact" className="hover:text-taupe">
              Contact information
            </Link>
            <CookiePreferences />
          </div>
          <div className="flex gap-4">
            <a
              href="https://instagram.com/lumiermodest"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-taupe"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://tiktok.com/@lumiermodest"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="hover:text-taupe"
            >
              <TikTokIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
