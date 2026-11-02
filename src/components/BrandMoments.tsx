import Image from "next/image";
import Link from "next/link";
import Flourish from "./Flourish";
import Reveal from "./motion/Reveal";
import SplitText from "./motion/SplitText";
import { Stagger, StaggerItem } from "./motion/Stagger";

const moments = [
  {
    src: "/campaign/about-breaking-news.jpg",
    alt: "A model in the red Yarah abaya reading a newspaper headlined 'Lumier Modest is here!'",
  },
  {
    src: "/campaign/about-on-call.jpg",
    alt: "A model in the Yasmin abaya taking a call while hands pass her a coffee, a tablet and paperwork",
  },
  {
    src: "/campaign/moment-makeup.jpg",
    alt: "Behind the scenes at the shoot: two models getting ready at a lit mirror",
  },
];

/**
 * The brand's personality shots, which otherwise only lived on the About
 * page. Swipeable on phones, three across on larger screens.
 */
export default function BrandMoments() {
  return (
    <section className="bg-cream py-16">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <SplitText
          text="Lumier Modest is here"
          as="h2"
          stagger={0.05}
          className="font-serif italic tracking-tight text-4xl text-taupe-dark sm:text-5xl"
        />
        <Reveal variant="fade" delay={0.2}>
          <Flourish className="mt-6" draw />
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-6 max-w-xl font-sans text-sm leading-relaxed text-espresso/80">
            Abayas and hijabs designed in Birmingham, made to disappear into
            the everyday and hold up in a room full of people dressed to
            impress.
          </p>
        </Reveal>
      </div>

      <Stagger className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 sm:mx-auto sm:grid sm:max-w-5xl sm:grid-cols-3 sm:gap-6 sm:overflow-visible">
        {moments.map((m) => (
          <StaggerItem
            key={m.src}
            className="relative aspect-[2/3] w-[72%] flex-shrink-0 snap-center overflow-hidden bg-sand sm:w-auto"
          >
            <Image
              src={m.src}
              alt={m.alt}
              fill
              sizes="(min-width: 640px) 320px, 72vw"
              className="object-cover"
            />
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={0.2} className="mt-10 text-center">
        <Link
          href="/about"
          className="font-sans text-xs uppercase tracking-[0.18em] text-taupe-dark underline underline-offset-4 transition-colors hover:text-gold-ink"
        >
          Read our story
        </Link>
      </Reveal>
    </section>
  );
}
