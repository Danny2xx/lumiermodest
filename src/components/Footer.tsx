import Image from "next/image";
import Link from "next/link";

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

      <div className="flex justify-center pb-8">
        <Image
          src="/brand/logo-transparent.png"
          alt="LumierModest"
          width={120}
          height={120}
          className="h-24 w-24 object-contain"
        />
      </div>

      <div className="border-t border-taupe/15 px-6 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 font-sans text-xs text-espresso/60 md:flex-row">
          <p>© {new Date().getFullYear()} LumierModest. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-taupe">
              Privacy policy
            </Link>
            <Link href="/returns" className="hover:text-taupe">
              Refund policy
            </Link>
            <Link href="/terms" className="hover:text-taupe">
              Terms of service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
