"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Sparkle from "./Sparkle";

type Slide = {
  left: string;
  center: string;
  right: string;
};

const slides: Slide[] = [
  {
    left: "/campaign/espresso-silk.jpg",
    center: "/campaign/ivory-silk.jpg",
    right: "/campaign/gold-thread.jpg",
  },
  {
    left: "/campaign/fabric-swatches.jpg",
    center: "/campaign/gold-silk.jpg",
    right: "/campaign/espresso-silk.jpg",
  },
  {
    left: "/campaign/gold-silk.jpg",
    center: "/campaign/fabric-swatches.jpg",
    right: "/campaign/ivory-silk.jpg",
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
    <div className="absolute inset-0">
      {sources.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={i === index ? alt : ""}
          fill
          sizes={sizes}
          priority={i === 0}
          className={`object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [playing]);

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
          <p className="flex items-center gap-2 font-sans text-xs tracking-[0.3em] uppercase text-cream">
            <Sparkle className="h-3 w-3" />
            New Season
            <Sparkle className="h-3 w-3" />
          </p>
          <h1 className="font-serif italic tracking-tight text-5xl text-cream drop-shadow sm:text-6xl md:text-7xl">
            Elevated Elegance
          </h1>
          <Link
            href="/abayas"
            className="mt-2 bg-cream px-8 py-3 font-sans text-xs uppercase tracking-[0.18em] text-espresso transition-all duration-200 hover:scale-[1.03] hover:bg-white"
          >
            Shop Collection
          </Link>
        </div>

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-4">
          <button
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            className="text-cream/90 transition-colors hover:text-cream"
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === index ? "bg-cream" : "bg-cream/40"
                }`}
              />
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
