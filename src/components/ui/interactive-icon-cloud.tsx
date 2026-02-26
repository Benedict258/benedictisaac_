"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import {
  Cloud,
  ICloud,
  renderSimpleIcon,
  SimpleIcon,
} from "react-icon-cloud";
import {
  siAndroid,
  siAndroidstudio,
  siCss,
  siCypress,
  siDart,
  siDocker,
  siExpress,
  siFigma,
  siFirebase,
  siFlutter,
  siGit,
  siGithub,
  siGitlab,
  siHtml5,
  siJavascript,
  siJest,
  siJira,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siPrisma,
  siReact,
  siTestinglibrary,
  siTypescript,
  siVercel,
  siGooglecloud,
  siSonar,
  siVscodium,
} from "simple-icons";

export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
  },
};

export const renderCustomIcon = (icon: SimpleIcon, theme: string) => {
  const bgHex = theme === "light" ? "#f3f2ef" : "#080510";
  const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff";
  const minContrastRatio = theme === "dark" ? 2 : 1.2;

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: any) => e.preventDefault(),
    },
  });
};

export type DynamicCloudProps = {
  iconSlugs: string[];
};

const slugAliases: Record<string, string> = {
  visualstudio: "vscodium",
  visualstudiocode: "vscodium",
  java: "openjdk",
  amazonwebservices: "googlecloud",
  amazonaws: "googlecloud",
  css3: "css",
  sonarqube: "sonar",
};

const normalizeSlugs = (slugs: string[]) =>
  slugs.map((slug) => slugAliases[slug] ?? slug);

export function IconCloud({ iconSlugs }: DynamicCloudProps) {
  const [isClient, setIsClient] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const activeTheme = theme === "system" ? resolvedTheme : theme;
  const slugKey = useMemo(() => iconSlugs.join("|"), [iconSlugs]);
  const normalizedSlugs = useMemo(
    () => normalizeSlugs(iconSlugs),
    [slugKey],
  );

  useEffect(() => {
    setIsClient(typeof window !== "undefined");
  }, []);

  const renderedIcons = useMemo(() => {
    const iconMap: Record<string, SimpleIcon> = {
      android: siAndroid,
      androidstudio: siAndroidstudio,
      googlecloud: siGooglecloud,
      css: siCss,
      cypress: siCypress,
      dart: siDart,
      docker: siDocker,
      express: siExpress,
      figma: siFigma,
      firebase: siFirebase,
      flutter: siFlutter,
      git: siGit,
      github: siGithub,
      gitlab: siGitlab,
      html5: siHtml5,
      openjdk: siOpenjdk,
      javascript: siJavascript,
      jest: siJest,
      jira: siJira,
      nextdotjs: siNextdotjs,
      nginx: siNginx,
      nodedotjs: siNodedotjs,
      postgresql: siPostgresql,
      prisma: siPrisma,
      react: siReact,
      sonar: siSonar,
      testinglibrary: siTestinglibrary,
      typescript: siTypescript,
      vercel: siVercel,
      vscodium: siVscodium,
    };

    return normalizedSlugs
      .map((slug) => iconMap[slug])
      .filter(Boolean)
      .map((icon) => renderCustomIcon(icon, activeTheme || "light"));
  }, [normalizedSlugs, activeTheme]);

  if (!isClient) {
    return <div className="h-48 w-full" />;
  }

  return (
    // @ts-ignore
    <Cloud {...cloudProps}>
      <>{renderedIcons}</>
    </Cloud>
  );
}
