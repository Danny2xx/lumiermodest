/** Hairline ring spinner that inherits the current text colour. */
export default function Spinner({
  className = "",
  label = "Loading",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <span
      role="status"
      aria-label={label}
      className={`inline-block h-4 w-4 animate-spin-slow rounded-full border border-current border-t-transparent ${className}`}
    />
  );
}
