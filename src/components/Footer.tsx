import Image from "next/image";
import Link from "next/link";
import CookiePreferences from "./CookiePreferences";
import FooterNewsletterForm from "./FooterNewsletterForm";
import { whatsAppLink } from "./WhatsAppButton";

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

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.1-.2.2-.6.9-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.8-2-1.3-.5-.5-1-1.1-1.4-1.8-.1-.2 0-.4.1-.5.2-.2.4-.5.6-.7.1-.2.1-.4 0-.6-.1-.2-.6-1.5-.8-2-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.6.3-.4.4-.6 1-.6 1.6 0 .9.4 1.8 1 2.6 1.1 1.6 2.4 2.8 4 3.6.5.2 1 .4 1.5.5.6.2 1.1.2 1.6.1.5-.1 1.6-.7 1.9-1.3.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.5-.3Z" />
      <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.4.7 3.1 1.1 4.8 1.1 5.5 0 10-4.5 10-10S17.5 2 12 2Zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3c-.9-1.3-1.3-2.9-1.3-4.5 0-4.5 3.7-8.2 8.2-8.2s8.2 3.7 8.2 8.2-3.6 8.4-8.2 8.4Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-taupe/15 bg-sand">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2">
        <div className="flex flex-col gap-3 font-sans text-sm uppercase tracking-[0.14em] text-espresso/80">
          <Link href="/about" className="transition-colors hover:text-gold">
            About
          </Link>
          <Link href="/sizing" className="transition-colors hover:text-gold">
            Sizing Guide
          </Link>
          <Link href="/shipping" className="transition-colors hover:text-gold">
            Shipping Policy
          </Link>
          <Link href="/returns" className="transition-colors hover:text-gold">
            Refund Policy
          </Link>
          <Link href="/contact" className="transition-colors hover:text-gold">
            Contact
          </Link>
        </div>

        <div>
          <p className="mb-4 font-serif italic text-xl text-taupe-dark">
            Be the first to know — early access, exclusive previews &amp;
            special offers
          </p>
          <FooterNewsletterForm />
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
            <Link href="/privacy" className="transition-colors hover:text-gold">
              Privacy policy
            </Link>
            <Link href="/returns" className="transition-colors hover:text-gold">
              Refund policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-gold">
              Terms of service
            </Link>
            <Link href="/shipping" className="transition-colors hover:text-gold">
              Shipping policy
            </Link>
            <Link href="/contact" className="transition-colors hover:text-gold">
              Contact information
            </Link>
            <CookiePreferences />
          </div>
          <div className="flex gap-4">
            <a
              href={whatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="transition-colors hover:text-gold"
            >
              <WhatsAppIcon />
            </a>
            <a
              href="https://instagram.com/lumiermodest"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition-colors hover:text-gold"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.tiktok.com/@lumier.modest"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="transition-colors hover:text-gold"
            >
              <TikTokIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
