import PlaceholderImage from "./PlaceholderImage";

const swatches: [string, string][] = [
  ["#e7d7bf", "#c9ad84"],
  ["#8a6a4f", "#5c4530"],
  ["#b08d57", "#8a6a4f"],
  ["#ece0d1", "#b08d57"],
  ["#5c4530", "#3c2c20"],
  ["#faf5ec", "#ece0d1"],
];

export default function CommunityBand() {
  return (
    <section>
      <div className="flex flex-col items-center gap-2 bg-sand px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-taupe">
            Follow Along
          </p>
          <p className="font-serif italic text-3xl text-taupe-dark">
            @lumiermodest
          </p>
        </div>
        <p className="font-sans text-sm text-espresso/70">
          Join our community — share your looks and tag us @lumiermodest.
        </p>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-6">
        {swatches.map((s, i) => (
          <PlaceholderImage key={i} swatch={s} className="aspect-square" />
        ))}
      </div>
    </section>
  );
}
