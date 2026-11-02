import Flourish from "./Flourish";
import Reveal from "./motion/Reveal";
import SplitText from "./motion/SplitText";

export default function CollectionHeader({
  eyebrow,
  title,
  subtitle,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  dark?: boolean;
}) {
  return (
    <div className="mb-10 pb-10">
      <Reveal mode="mount" variant="fade" delay={0.1} duration={0.8}>
        <p
          className={`mb-2 font-sans text-xs uppercase tracking-[0.3em] ${
            dark ? "text-gold" : "text-taupe"
          }`}
        >
          {eyebrow}
        </p>
      </Reveal>
      <SplitText
        text={title}
        as="h1"
        by="char"
        mode="mount"
        delay={0.2}
        stagger={0.035}
        className={`font-serif italic tracking-tight text-5xl sm:text-6xl ${
          dark ? "text-cream" : "text-taupe-dark"
        }`}
      />
      <Reveal mode="mount" delay={0.6}>
        <p
          className={`mt-3 font-sans text-lg ${
            dark ? "text-cream/70" : "text-espresso/70"
          }`}
        >
          {subtitle}
        </p>
      </Reveal>
      <Flourish tone={dark ? "cream" : "taupe"} className="mt-8" draw />
    </div>
  );
}
