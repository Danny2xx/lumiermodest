"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import Flourish from "./Flourish";
import Reveal from "./motion/Reveal";
import SplitText from "./motion/SplitText";

/**
 * The launch teaser beside a way into the shop. The 2.5MB video only starts
 * downloading as it nears the screen, so it never competes with the hero for
 * bandwidth; until then (and for anyone who prefers reduced motion, who gets
 * controls instead of autoplay) the poster frame stands in.
 */
export default function NewCollection({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
        <Reveal variant="scale" className="mx-auto w-full max-w-sm">
          <video
            ref={videoRef}
            src={near ? "/campaign/collection.mp4" : undefined}
            poster="/campaign/collection-poster.jpg"
            autoPlay={!reduceMotion}
            controls={!!reduceMotion}
            muted
            loop
            playsInline
            preload="none"
            aria-label="New collection teaser: the LumierModest rail, ready for something big"
            className="aspect-[9/16] w-full bg-sand object-cover shadow-xl"
          />
        </Reveal>

        <div className="text-center md:text-left">
          <SplitText
            text="The first collection is here"
            as="h2"
            stagger={0.05}
            className="font-serif italic tracking-tight text-4xl text-taupe-dark sm:text-5xl"
          />
          <Reveal variant="fade" delay={0.2}>
            <Flourish className="mt-6 md:justify-start" draw />
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-6 font-sans text-sm leading-relaxed text-espresso/80">
              Shimmer, lace, chiffon and linen: abayas made to be worn and
              noticed, alongside the first of our hijabs, with more on the way.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              {links.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-8 py-3 font-sans text-xs uppercase tracking-[0.18em] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                    i === 0
                      ? "bg-taupe-dark text-cream hover:bg-espresso"
                      : "border border-taupe-dark text-taupe-dark hover:bg-taupe-dark hover:text-cream"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
