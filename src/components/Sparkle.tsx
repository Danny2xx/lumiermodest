export default function Sparkle({
  className = "",
  twinkle = false,
  delay = 0,
}: {
  className?: string;
  /** Gently pulse and rotate, forever. */
  twinkle?: boolean;
  /** Seconds to offset the twinkle so neighbours are out of phase. */
  delay?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`${twinkle ? "animate-twinkle" : ""} ${className}`}
      style={twinkle && delay ? { animationDelay: `${delay}s` } : undefined}
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 0c.6 6.5 5.5 11.4 12 12-6.5.6-11.4 5.5-12 12-.6-6.5-5.5-11.4-12-12 6.5-.6 11.4-5.5 12-12Z" />
    </svg>
  );
}
