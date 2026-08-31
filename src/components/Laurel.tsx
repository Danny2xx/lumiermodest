export default function Laurel({
  flip = false,
  className = "",
}: {
  flip?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 60 40"
      className={`${flip ? "-scale-x-100" : ""} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    >
      <path d="M2 38C18 34 30 24 34 2" />
      <path d="M8 34C10 30 10 27 8 24" />
      <path d="M14 28C16 24 16 21 14 18" />
      <path d="M20 21C22 17 22 14 20 11" />
      <path d="M26 13C28 10 28 7 26 4" />
    </svg>
  );
}
