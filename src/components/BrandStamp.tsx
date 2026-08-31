export default function BrandStamp({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none hidden h-24 w-24 rotate-6 items-center justify-center rounded-full border border-taupe/30 text-center font-sans text-[9px] uppercase leading-tight tracking-[0.1em] text-taupe/60 sm:flex ${className}`}
    >
      London
      <br />
      Est. 2026
      <br />
      UK
    </div>
  );
}
