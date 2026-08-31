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
    <div
      className={`mb-10 border-b pb-10 ${
        dark ? "border-cream/20" : "border-taupe/15"
      }`}
    >
      <p
        className={`mb-2 font-sans text-xs uppercase tracking-[0.3em] ${
          dark ? "text-gold" : "text-taupe"
        }`}
      >
        {eyebrow}
      </p>
      <h1
        className={`font-script text-5xl sm:text-6xl ${
          dark ? "text-cream" : "text-taupe-dark"
        }`}
      >
        {title}
      </h1>
      <p
        className={`mt-3 font-serif text-lg ${
          dark ? "text-cream/70" : "text-espresso/70"
        }`}
      >
        {subtitle}
      </p>
    </div>
  );
}
