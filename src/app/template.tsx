/**
 * Re-mounts on every route change, so the CSS entrance plays per page.
 * Pure CSS (no hydration needed) and ends on `transform: none`, so fixed
 * elements inside pages keep positioning against the viewport.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-enter">{children}</div>;
}
