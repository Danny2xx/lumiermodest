import type { ReactNode } from "react";

/**
 * Seamless horizontal ticker (CSS only, pauses on hover).
 * `items` are repeated to fill the track, then the track is duplicated so the
 * -50% translate loops without a visible seam.
 */
export default function Marquee({
  items,
  separator,
  repeat = 4,
  className = "",
  itemClassName = "",
}: {
  items: ReactNode[];
  separator?: ReactNode;
  repeat?: number;
  className?: string;
  itemClassName?: string;
}) {
  const track = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {Array.from({ length: repeat }).flatMap((_, r) =>
        items.map((item, i) => (
          <span key={`${r}-${i}`} className={`flex items-center ${itemClassName}`}>
            <span className="whitespace-nowrap">{item}</span>
            {separator && <span className="mx-6 flex items-center">{separator}</span>}
          </span>
        ))
      )}
    </div>
  );

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        {track(false)}
        {track(true)}
      </div>
    </div>
  );
}
