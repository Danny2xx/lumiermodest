import Laurel from "./Laurel";
import Sparkle from "./Sparkle";

export default function Flourish({
  className = "",
  tone = "taupe",
  align = "center",
  draw = false,
}: {
  className?: string;
  tone?: "taupe" | "gold" | "cream";
  align?: "center" | "start";
  /** Draw the laurels in and let the sparkle twinkle. */
  draw?: boolean;
}) {
  const color =
    tone === "gold" ? "text-gold" : tone === "cream" ? "text-cream/60" : "text-taupe/50";
  const justify = align === "start" ? "justify-start" : "justify-center";

  return (
    <div className={`flex items-center ${justify} gap-3 ${color} ${className}`}>
      <Laurel className="h-6 w-9" draw={draw} />
      <Sparkle className="h-3 w-3" twinkle={draw} />
      <Laurel flip className="h-6 w-9" draw={draw} delay={0.1} />
    </div>
  );
}
