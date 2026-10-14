import type { ImgHTMLAttributes } from "react";
import { sizeOf } from "@/data/image-sizes";

type SiteImageProps = ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string; priority?: boolean };

/** <img> that sets width and height from the generated size map and lazy-loads by default. */
export function SiteImage({ src, alt, priority, ...props }: SiteImageProps) {
  const size = sizeOf(src);
  return (
    <img
      src={src}
      alt={alt}
      width={size?.w}
      height={size?.h}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      {...props}
    />
  );
}
