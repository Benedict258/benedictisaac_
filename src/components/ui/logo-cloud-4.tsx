import * as React from "react";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

type Logo = {
  src: string;
  darkSrc?: string;
  alt: string;
  width?: number;
  height?: number;
  mdHeight?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

export function LogoCloud({ logos }: LogoCloudProps) {
  const { theme, resolvedTheme } = useTheme();
  const isDark = (theme ?? resolvedTheme) === "dark";

  return (
    <div className="relative mx-auto max-w-3xl bg-gradient-to-r from-secondary via-transparent to-secondary py-6 md:border-x">
      <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t" />

      <InfiniteSlider gap={42} reverse duration={60} durationOnHover={20}>
        {logos.map((logo) => {
          const src = isDark && logo.darkSrc ? logo.darkSrc : logo.src;
          const height = logo.height ?? 16;
          const mdHeight = logo.mdHeight ?? 20;
          const style = {
            "--logo-height": `${height}px`,
            "--logo-height-md": `${mdHeight}px`,
            width: logo.width ? `${logo.width}px` : undefined,
          } as React.CSSProperties;

          return (
            <img
              alt={logo.alt}
              className={cn(
                "pointer-events-none select-none object-contain transition-opacity duration-300",
                "h-[var(--logo-height)] md:h-[var(--logo-height-md)]",
                !logo.darkSrc && "dark:brightness-0 dark:invert",
              )}
              key={`logo-${logo.alt}`}
              loading="lazy"
              src={src}
              style={style}
            />
          );
        })}
      </InfiniteSlider>

      <ProgressiveBlur
        blurIntensity={1}
        className="pointer-events-none absolute top-0 left-0 h-full w-[160px]"
        direction="left"
      />
      <ProgressiveBlur
        blurIntensity={1}
        className="pointer-events-none absolute top-0 right-0 h-full w-[160px]"
        direction="right"
      />

      <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b" />
    </div>
  );
}
