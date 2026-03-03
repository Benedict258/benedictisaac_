"use client";

import { cn } from "@/lib/utils";

type ToolsMarqueeProps = {
  slugs: string[];
  className?: string;
};

const TOOL_LABELS: Record<string, string> = {
  typescript: "TypeScript",
  javascript: "JavaScript",
  dart: "Dart",
  openjdk: "OpenJDK",
  react: "React",
  flutter: "Flutter",
  android: "Android",
  html5: "HTML5",
  css: "CSS",
  nodedotjs: "Node.js",
  express: "Express",
  nextdotjs: "Next.js",
  prisma: "Prisma",
  googlecloud: "Google Cloud",
  postgresql: "PostgreSQL",
  firebase: "Firebase",
  nginx: "NGINX",
  vercel: "Vercel",
  testinglibrary: "Testing Library",
  jest: "Jest",
  cypress: "Cypress",
  docker: "Docker",
  git: "Git",
  jira: "Jira",
  github: "GitHub",
  gitlab: "GitLab",
  vscodium: "VSCodium",
  androidstudio: "Android Studio",
  sonar: "Sonar",
  figma: "Figma",
};

const repeatIcons = <T,>(icons: T[], repeat = 4) =>
  Array.from({ length: repeat }).flatMap(() => icons);

export function ToolsMarquee({ slugs, className }: ToolsMarqueeProps) {
  const icons = slugs.map((slug) => ({
    slug,
    label: TOOL_LABELS[slug] ?? slug,
    src: `https://cdn.simpleicons.org/${slug}`,
  }));

  const repeated = repeatIcons(icons, 4);

  return (
    <span
      className={cn(
        "relative inline-flex h-12 flex-1 items-center overflow-hidden align-middle",
        className,
      )}
      aria-label="Tool icons marquee"
    >
      <span className="flex items-center gap-4 whitespace-nowrap animate-tools-marquee">
        {repeated.map((icon, index) => (
          <span
            key={`${icon.slug}-${index}`}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border/60 bg-background/80 shadow-sm"
          >
            <img
              src={icon.src}
              alt={icon.label}
              loading="lazy"
              className="h-6 w-6 object-contain"
            />
          </span>
        ))}
      </span>
      <span className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-background to-transparent" />
      <span className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent" />
    </span>
  );
}
