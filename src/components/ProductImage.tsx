import Image from "next/image";
import PlaceholderImage from "./PlaceholderImage";

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
  const zoomClass = zoom
    ? "transition-transform duration-500 group-hover:scale-105"
    : "";

  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes ?? "(min-width: 1024px) 33vw, 100vw"}
          className={`object-cover ${zoomClass}`}
        />
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <PlaceholderImage swatch={swatch} angle={angle} className={`h-full w-full ${zoomClass}`} />
    </div>
  );
}
