import Link from "next/link";
import PlaceholderImage from "./PlaceholderImage";

export default function Hero() {
  return (
    <section className="relative grid h-[70vh] min-h-[420px] grid-cols-3">
      <PlaceholderImage swatch={["#e7d7bf", "#c9ad84"]} className="h-full" />
      <div className="relative h-full">
        <PlaceholderImage swatch={["#8a6a4f", "#5c4530"]} className="h-full" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-espresso/10 px-4 text-center">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-cream">
            New Season
          </p>
          <h1 className="font-script text-6xl text-cream drop-shadow sm:text-7xl">
            elevated elegance
          </h1>
          <Link
            href="/abayas"
            className="mt-2 bg-cream px-8 py-3 font-sans text-xs uppercase tracking-[0.18em] text-espresso transition-colors hover:bg-white"
          >
            Shop Collection
          </Link>
        </div>
      </div>
      <PlaceholderImage swatch={["#5c4530", "#3c2c20"]} className="h-full" />
    </section>
  );
}
