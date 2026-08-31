export default function CollectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-10 border-b border-taupe/15 pb-10">
      <p className="mb-2 font-sans text-xs uppercase tracking-[0.3em] text-taupe">
        {eyebrow}
      </p>
      <h1 className="font-script text-5xl text-taupe-dark sm:text-6xl">
        {title}
      </h1>
      <p className="mt-3 font-serif text-lg text-espresso/70">{subtitle}</p>
    </div>
  );
}
