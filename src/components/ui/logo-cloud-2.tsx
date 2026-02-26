import type { ComponentProps, HTMLAttributes } from "react";

import { Plus } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

type Logo = {
  src: string;
  darkSrc?: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = HTMLAttributes<HTMLDivElement>;

const communityLogos: Logo[] = [
  { src: "/gdg.png", darkSrc: "/darkgdg.png", alt: "GDG - Google Developer Groups" },
  { src: "/10.8.8.webp", alt: "10.8.8 Community" },
  { src: "/icp.webp", darkSrc: "/darkicp.png", alt: "Sahara ICP Hubs" },
  { src: "/awscloud.png", darkSrc: "/darkaws.png", alt: "AWS Cloud Clubs" },
  { src: "/3mtt.jfif", darkSrc: "/dark3mtt.png", alt: "3MTT" },
  { src: "/encode.png", darkSrc: "/darkencode.png", alt: "Encode Club" },
  { src: "/suioncampus.png", alt: "Sui On Campus" },
  { src: "/windows.png", alt: "Windows on America" },
];

export function LogoCloud({ className, ...props }: LogoCloudProps) {
  return (
    <div
      className={cn(
        "relative grid grid-cols-2 border-x md:grid-cols-4",
        className,
      )}
      {...props}
    >
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-screen border-t" />

      <LogoCard
        className="relative border-b border-r bg-secondary/60 dark:bg-secondary/30"
        logo={communityLogos[0]}
      >
        <Plus
          className="absolute -bottom-[12.5px] -right-[12.5px] h-7 w-7 text-muted-foreground"
          strokeWidth={1}
        />
      </LogoCard>

      <LogoCard className="border-b md:border-r" logo={communityLogos[1]} />

      <LogoCard
        className="relative border-b border-r md:bg-secondary/60 dark:md:bg-secondary/30"
        logo={communityLogos[2]}
      >
        <Plus
          className="absolute -bottom-[12.5px] -right-[12.5px] h-7 w-7 text-muted-foreground"
          strokeWidth={1}
        />
        <Plus
          className="absolute -bottom-[12.5px] -left-[12.5px] hidden h-7 w-7 text-muted-foreground md:block"
          strokeWidth={1}
        />
      </LogoCard>

      <LogoCard
        className="border-b bg-secondary/60 md:bg-background dark:bg-secondary/30 md:dark:bg-background"
        logo={communityLogos[3]}
      />

      <LogoCard
        className="relative border-b border-r bg-secondary/60 md:border-b-0 md:bg-background dark:bg-secondary/30 md:dark:bg-background"
        logo={communityLogos[4]}
      >
        <Plus
          className="absolute -bottom-[12.5px] -right-[12.5px] h-7 w-7 text-muted-foreground md:hidden"
          strokeWidth={1}
        />
      </LogoCard>

      <LogoCard
        className="border-b bg-background md:border-b-0 md:border-r md:bg-secondary/60 dark:md:bg-secondary/30"
        logo={communityLogos[5]}
      />

      <LogoCard className="border-r" logo={communityLogos[6]} />

      <LogoCard className="bg-secondary/50 dark:bg-secondary/30" logo={communityLogos[7]} />

      <div className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 w-screen border-b" />
    </div>
  );
}

type LogoCardProps = ComponentProps<"div"> & {
  logo: Logo;
};

function LogoCard({ logo, className, children, ...props }: LogoCardProps) {
  const { theme, resolvedTheme } = useTheme();
  const isDark = (theme ?? resolvedTheme) === "dark";
  const imageSrc = isDark && logo.darkSrc ? logo.darkSrc : logo.src;

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-background px-4 py-8 md:p-8",
        className,
      )}
      {...props}
    >
      <img
        alt={logo.alt}
        className="pointer-events-none h-9 select-none object-contain md:h-12"
        height={logo.height ?? 36}
        src={imageSrc}
        width={logo.width ?? 180}
        draggable={false}
      />
      {children}
    </div>
  );
}
