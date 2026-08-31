export default function ContentPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="font-serif text-4xl text-taupe-dark">{title}</h1>
      <div className="mt-8 space-y-5 font-sans text-sm leading-relaxed text-espresso/80">
        {children}
      </div>
    </div>
  );
}
