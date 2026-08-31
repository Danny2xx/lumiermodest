import Laurel from "./Laurel";
import Sparkle from "./Sparkle";

export default function Flourish({
  className = "",
  tone = "taupe",
  align = "center",
}: {
  className?: string;
  tone?: "taupe" | "gold" | "cream";
  align?: "center" | "start";
}) {
  const color =
    tone === "gold" ? "text-gold" : tone === "cream" ? "text-cream/60" : "text-taupe/50";
  const justify = align === "start" ? "justify-start" : "justify-center";

  return (
    <div className={`flex items-center ${justify} gap-3 ${color} ${className}`}>
      <Laurel className="h-6 w-9" />
      <Sparkle className="h-3 w-3" />
      <Laurel flip className="h-6 w-9" />
    </div>
  );
}
