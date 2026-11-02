"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import Sparkle from "./Sparkle";
import Reveal from "./motion/Reveal";
import SplitText from "./motion/SplitText";
import { useIntroReady } from "./motion/intro";

const SLIDE_MS = 5000;

type Slide = {
  left: string;
  center: string;
  right: string;
};

// From the first collection's shoot. Phones only show the centre column.
const slides: Slide[] = [
  {
    left: "/campaign/hero-lumier.jpg",
    center: "/campaign/hero-yasmin.jpg",
    right: "/campaign/hero-yarah.jpg",
  },
  {
    left: "/campaign/hero-muna.jpg",
    center: "/campaign/hero-layla.jpg",
    right: "/campaign/hero-yarah-red.jpg",
  },
  {
    left: "/campaign/hero-satin.jpg",
    center: "/campaign/hero-shimmer.jpg",
    right: "/campaign/hero-jersey.jpg",
  },
];

function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 4l14 8-14 8V4z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <rect x="5" y="4" width="5" height="16" />
      <rect x="14" y="4" width="5" height="16" />
    </svg>
  );
}

/** Crossfades between slides while the active one slowly drifts in (Ken Burns). */
function CrossfadePanel({
  sources,
  index,
  alt,
  sizes,
}: {
  sources: string[];
  index: number;
  alt: string;
  sizes: string;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {sources.map((src, i) => {
        const active = i === index;
        return (
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={{ opacity: i === 0 ? 1 : 0, scale: 1 }}
            animate={{ opacity: active ? 1 : 0, scale: active ? 1.08 : 1 }}
            transition={
              active
                ? {
                    opacity: { duration: 1.2, ease: "easeInOut" },
                    scale: { duration: SLIDE_MS / 1000 + 2, ease: "linear" },
                  }
                : {
                    opacity: { duration: 1.2, ease: "easeInOut" },
                    scale: { duration: 0, delay: 1.2 },
                  }
            }
          >
            <Image
              src={src}
              alt={active ? alt : ""}
              fill
              sizes={sizes}
              priority={i === 0}
              className="object-cover"
            />
          </motion.div>
        );
      })}
    </div>
  );
}

const REDUCE_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(onChange: () => void) {
  const query = window.matchMedia(REDUCE_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export default function Hero({ shopHref }: { shopHref: string }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [cycle, setCycle] = useState(0);
  const ready = useIntroReady();

  // Movement can trigger migraine and vestibular symptoms, so a slideshow
  // that advances on its own has to honour the system setting.
  const reduceMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    () => window.matchMedia(REDUCE_MOTION).matches,
    () => false
  );

  // Restart the timer whenever the slide changes so every slide gets a full turn.
  useEffect(() => {
    if (!playing || reduceMotion) return;
    const timer = setTimeout(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, SLIDE_MS);
    return () => clearTimeout(timer);
  }, [playing, reduceMotion, index, cycle]);

  const togglePlay = () => {
    if (!playing) setCycle((c) => c + 1);
    setPlaying(!playing);
  };

  return (
    <section className="relative grid h-[85vh] min-h-[520px] grid-cols-1 md:h-[70vh] md:min-h-[420px] md:grid-cols-3">
      <div className="relative hidden h-full md:block">
        <CrossfadePanel
          sources={slides.map((s) => s.left)}
          index={index}
          alt=""
          sizes="33vw"
        />
      </div>
      <div className="relative h-full">
        <CrossfadePanel
          sources={slides.map((s) => s.center)}
          index={index}
          alt="LumierModest new season"
          sizes="(min-width: 768px) 34vw, 100vw"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-espresso/35 px-6 text-center">
          <Reveal mode="mount" active={ready} variant="fade" delay={0.2} duration={0.9}>
            <p className="flex items-center gap-2 font-sans text-xs tracking-[0.3em] uppercase text-cream">
              <Sparkle className="h-3 w-3" twinkle />
              New Season
              <Sparkle className="h-3 w-3" twinkle delay={1.3} />
            </p>
          </Reveal>
          <SplitText
            text="Elevated Elegance"
            as="h1"
            mode="mount"
            active={ready}
            delay={0.35}
            stagger={0.14}
            duration={1.1}
            className="font-serif italic tracking-tight text-5xl text-cream drop-shadow sm:text-6xl md:text-7xl"
          />
          <Reveal mode="mount" active={ready} delay={0.95}>
            <Link
              href={shopHref}
              className="group relative mt-2 inline-block overflow-hidden bg-cream px-8 py-3 font-sans text-xs uppercase tracking-[0.18em] text-espresso transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-cream">
                Shop Collection
              </span>
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 bg-taupe-dark transition-transform duration-500 ease-luxe group-hover:scale-x-100"
              />
            </Link>
          </Reveal>
        </div>

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-4">
          {!reduceMotion && (
            <button
              onClick={togglePlay}
              aria-label={playing ? "Pause slideshow" : "Play slideshow"}
              className="text-cream/90 transition-colors hover:text-cream"
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>
          )}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className="flex h-4 w-7 items-center"
              >
                <span className="block h-px w-full overflow-hidden bg-cream/40">
                  {i === index && (
                    <span
                      key={`${index}-${cycle}`}
                      className="block h-full w-full origin-left bg-cream animate-slide-progress"
                      style={{ animationPlayState: playing ? "running" : "paused" }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="relative hidden h-full md:block">
        <CrossfadePanel
          sources={slides.map((s) => s.right)}
          index={index}
          alt=""
          sizes="33vw"
        />
      </div>
    </section>
  );
}
