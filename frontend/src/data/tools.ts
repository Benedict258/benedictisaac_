export type ToolLogo = {
  src: string;
  darkSrc?: string;
  alt: string;
  height?: number;
  mdHeight?: number;
};

export const techSlugs = [
  "typescript",
  "javascript",
  "dart",
  "openjdk",
  "react",
  "flutter",
  "android",
  "html5",
  "css",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "googlecloud",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "vscodium",
  "androidstudio",
  "sonar",
  "figma",
];

export const toolLogos: ToolLogo[] = [
  { src: "https://svgl.app/library/nvidia-wordmark-light.svg", alt: "Nvidia" },
  { src: "https://svgl.app/library/supabase_wordmark_light.svg", alt: "Supabase" },
  { src: "https://svgl.app/library/openai_wordmark_light.svg", alt: "OpenAI" },
  { src: "https://svgl.app/library/vercel_wordmark.svg", alt: "Vercel" },
  { src: "https://svgl.app/library/github_wordmark_light.svg", alt: "GitHub" },
  { src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg", alt: "Claude AI" },
  { src: "/aws-light.png", darkSrc: "/awsdark.png", alt: "AWS", height: 26, mdHeight: 32 },
  { src: "/opiklight.png", darkSrc: "/darkopik.png", alt: "Opik", height: 26, mdHeight: 32 },
  { src: "/suidark.png", darkSrc: "/sui.png", alt: "Sui", height: 24, mdHeight: 30 },
  { src: "/metadark.svg", darkSrc: "/meta.png", alt: "Meta", height: 22, mdHeight: 28 },
  { src: "/gemini dark.svg", darkSrc: "/gemini dark.png", alt: "Gemini", height: 24, mdHeight: 30 },
  { src: "/mongo.png", darkSrc: "/mongodark.png", alt: "MongoDB", height: 24, mdHeight: 30 },
  { src: "/matlab.png", darkSrc: "/darkmatlab.png", alt: "MATLAB", height: 24, mdHeight: 30 },
  { src: "/vscode.png", darkSrc: "/darkvscode.png", alt: "VS Code", height: 24, mdHeight: 30 },
  { src: "/yornwin.png", alt: "Yornwins Tech", height: 24, mdHeight: 30 },
];

export const worldMapRoutes = [
  { start: { lat: 9.6152, lng: 6.5478 }, end: { lat: 51.5072, lng: -0.1276 } }, // Minna -> London
  { start: { lat: 9.6152, lng: 6.5478 }, end: { lat: 37.7749, lng: -122.4194 } }, // Minna -> San Francisco
  { start: { lat: 9.6152, lng: 6.5478 }, end: { lat: 1.3521, lng: 103.8198 } }, // Minna -> Singapore
  { start: { lat: 6.5244, lng: 3.3792 }, end: { lat: 48.8566, lng: 2.3522 } }, // Lagos -> Paris
  { start: { lat: 33.738, lng: -84.3826 }, end: { lat: 28.6139, lng: 77.209 } }, // Atlanta -> New Delhi
];
