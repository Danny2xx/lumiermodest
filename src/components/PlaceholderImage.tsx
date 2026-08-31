export default function PlaceholderImage({
  swatch,
  className = "",
}: {
  swatch: [string, string];
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(150deg, ${swatch[0]} 0%, ${swatch[1]} 100%)`,
      }}
    >
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full opacity-15"
        preserveAspectRatio="xMidYMid slice"
      >
        <text
          x="100"
          y="120"
          textAnchor="middle"
          fontSize="90"
          fontFamily="serif"
          fill="#faf5ec"
        >
          LM
        </text>
      </svg>
    </div>
  );
}
