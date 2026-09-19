import Flourish from "./Flourish";

export default function CollectionHeader({
  eyebrow,
  title,
  subtitle,
  dark = false,
}: {
  /** Optional on purpose: a tracked label above every heading is template
      grammar, not voice. Use it only where it genuinely says something. */
  eyebrow?: string;
  title: string;
  subtitle: string;
  dark?: boolean;
}) {
  return (
    <div className="mb-10 pb-10">
      {eyebrow && (
        <p
          className={`mb-2 font-sans text-xs uppercase tracking-[0.3em] ${
            dark ? "text-gold" : "text-taupe-dark"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h1
        className={`font-serif italic tracking-tight text-5xl sm:text-6xl ${
          dark ? "text-cream" : "text-taupe-dark"
        }`}
      >
        {title}
      </h1>
      <p
        className={`mt-3 font-sans text-lg ${
          dark ? "text-cream/70" : "text-espresso/80"
        }`}
      >
        {subtitle}
      </p>
      <Flourish tone={dark ? "cream" : "taupe"} className="mt-8" />
    </div>
  );
}
