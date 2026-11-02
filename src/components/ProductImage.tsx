"use client";

import { useState } from "react";
import Image from "next/image";
import PlaceholderImage from "./PlaceholderImage";

/**
 * Product photo (or gradient placeholder) that fades in once the file has
 * loaded. Pass `zoom` to scale gently when an ancestor `group` is hovered.
 */
export default function ProductImage({
  src,
  swatch,
  angle,
  alt,
  className = "",
  priority = false,
  sizes,
  zoom = false,
}: {
  src?: string;
  swatch: [string, string];
  angle?: number;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  zoom?: boolean;
}) {
  const [loaded, setLoaded] = useState(priority);
  const zoomClass = zoom ? "group-hover:scale-105" : "";

  if (src) {
    // A 32px copy (well under 1KB) arrives almost at once and is shown
    // blurred, so there's a soft version of the photo while the full one
    // loads instead of an empty box. 32 and 75 are the smallest width and
    // the only quality the image optimiser allows by default.
    const preview = `/_next/image?url=${encodeURIComponent(src)}&w=32&q=75`;
    return (
      <div
        className={`relative overflow-hidden ${className}`}
        style={{
          backgroundImage: `linear-gradient(160deg, ${swatch[0]}, ${swatch[1]})`,
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 scale-110 bg-cover bg-center blur-xl"
          style={{ backgroundImage: `url(${preview})` }}
        />
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes ?? "(min-width: 1024px) 33vw, 100vw"}
          onLoad={() => setLoaded(true)}
          className={`object-cover transition-[opacity,transform] duration-300 ease-luxe ${
            loaded ? "opacity-100" : "opacity-0"
          } ${zoomClass}`}
        />
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <PlaceholderImage
        swatch={swatch}
        angle={angle}
        className={`h-full w-full transition-transform duration-700 ease-luxe ${zoomClass}`}
      />
    </div>
  );
}
