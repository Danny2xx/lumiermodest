import Link from "next/link";
import Flourish from "@/components/Flourish";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";

export const metadata = { title: "Page not found — LumierModest" };

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
      <Reveal mode="mount" variant="fade" delay={0.1}>
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-taupe">404</p>
      </Reveal>
      <SplitText
        text="Nothing to see here"
        as="h1"
        mode="mount"
        delay={0.2}
        className="mt-3 font-serif italic tracking-tight text-5xl text-taupe-dark sm:text-6xl"
      />
      <Reveal mode="mount" delay={0.7}>
        <Flourish className="mt-6" draw />
      </Reveal>
      <Reveal mode="mount" delay={0.85} className="mt-6 font-sans text-sm text-espresso/70">
        <p>The page you were looking for has moved or never existed.</p>
      </Reveal>
      <Reveal mode="mount" delay={1} className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="bg-taupe-dark px-8 py-3 font-sans text-xs uppercase tracking-[0.18em] text-cream transition-all duration-200 hover:scale-[1.02] hover:bg-espresso active:scale-[0.98]"
        >
          Back Home
        </Link>
        <Link
          href="/abayas"
          className="border border-taupe-dark px-8 py-3 font-sans text-xs uppercase tracking-[0.18em] text-taupe-dark transition-all duration-200 hover:scale-[1.02] hover:bg-taupe-dark hover:text-cream active:scale-[0.98]"
        >
          Shop Collection
        </Link>
      </Reveal>
    </div>
  );
}
