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
}: {
  src?: string;
  swatch: [string, string];
  angle?: number;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes ?? "(min-width: 1024px) 33vw, 100vw"}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <PlaceholderImage swatch={swatch} angle={angle} className={className} />
  );
}
