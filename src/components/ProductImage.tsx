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
    return (
      <div className={`relative overflow-hidden bg-sand/60 ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes ?? "(min-width: 1024px) 33vw, 100vw"}
          onLoad={() => setLoaded(true)}
          className={`object-cover transition-[opacity,transform] duration-700 ease-luxe ${
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
