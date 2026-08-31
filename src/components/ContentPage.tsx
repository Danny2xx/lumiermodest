import BrandStamp from "./BrandStamp";
import Flourish from "./Flourish";

export default function ContentPage({
  title,
  children,
  stamp = true,
}: {
  title: string;
  children: React.ReactNode;
  stamp?: boolean;
}) {
  return (
    <div className="relative mx-auto max-w-3xl px-6 py-20">
      {stamp && <BrandStamp className="absolute right-6 top-4" />}
      <h1 className="font-serif italic tracking-tight text-5xl text-taupe-dark">
        {title}
      </h1>
      <Flourish className="mt-4" align="start" />
      <div className="mt-8 space-y-5 font-sans text-sm leading-relaxed text-espresso/80">
        {children}
      </div>
    </div>
  );
}

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="pt-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-espresso">
      {children}
    </h2>
  );
}

export function NeedHelp({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-6">
      <p className="font-serif italic text-2xl text-taupe">Need help?</p>
      <p className="mt-2">{children}</p>
    </div>
  );
}
