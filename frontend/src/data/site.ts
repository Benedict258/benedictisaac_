import type { View } from "@/data/view";

export const SITE_URL = "https://benedictisaac.dev";

export const site = {
  name: "Benedict Isaac",
  title: "Full-Stack & Agentic AI Engineer",
  location: "Minna, NG and Remote",
  email: "benedictisaac258@gmail.com",
  whatsapp: "https://wa.link/z9yfhb",
  twitterHandle: "@DevChronicles_",
};

/** Headline and tagline per view. Wording is taken from the two resumes. */
export const headlines: Record<View, { role: string; tagline: string }> = {
  all: {
    role: "Full-Stack and Agentic AI Engineer and Mechatronics Engineering student",
    tagline: "Building agentic AI systems from cloud to edge.",
  },
  software: {
    role: "Full-Stack and Agentic AI Engineer and Mechatronics Engineering student",
    tagline: "Building agentic AI systems from cloud to edge.",
  },
  mechatronics: {
    role: "Mechatronics Engineering student | Agentic AI, Embedded Systems & Robotics",
    tagline: "Building agentic AI systems from cloud to edge.",
  },
};

/** Professional summaries, verbatim from the resumes. */
export const summaries: Record<View, string> = {
  all: "Full-stack and agentic AI engineer and Mechatronics Engineering student, building agentic AI systems from cloud to edge. Ships production-grade React/Next.js interfaces backed by multi-LLM orchestration and RESTful APIs, and deploys intelligent agentic workflows across web, AI, and blockchain environments. Leads technical teams and communities, and brings a systems-first approach to reliability and performance, driven to build transparent, trustworthy technology at scale.",
  software:
    "Full-stack and agentic AI engineer and Mechatronics Engineering student, building agentic AI systems from cloud to edge. Ships production-grade React/Next.js interfaces backed by multi-LLM orchestration and RESTful APIs, and deploys intelligent agentic workflows across web, AI, and blockchain environments. Leads technical teams and communities, and brings a systems-first approach to reliability and performance, driven to build transparent, trustworthy technology at scale.",
  mechatronics:
    "Mechatronics Engineering student building agentic AI systems from cloud to edge. Developing ESN-PRISM, an edge-native recognition and security monitoring system, and researching agentic architectures for robotics through the ECAPs hardware initiative. Backed by full-stack experience shipping production systems, leading technical teams, and teaching embedded systems to young students, with a systems-first approach to hardware-software integration.",
};

export const resumes = [
  {
    label: "Resume (Software)",
    href: "/Benedict-Isaac-Resume-Software.pdf",
  },
  {
    label: "Resume (Mechatronics)",
    href: "/Benedict-Isaac-Resume-Mechatronics.pdf",
  },
];

export type SocialLink = {
  label: string;
  href: string;
  /** Name of a lucide icon, or an image under /public. */
  icon: "github" | "linkedin" | "twitter" | "medium" | "discord" | "telegram";
};

export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/Benedict258/", icon: "github" },
  { label: "Medium", href: "https://medium.com/@benedictisaac258", icon: "medium" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/benedict-isaac-0b60a732b/",
    icon: "linkedin",
  },
  { label: "X", href: "https://x.com/DevChronicles_", icon: "twitter" },
  { label: "Discord", href: "https://discord.com/users/benedict258", icon: "discord" },
  { label: "Telegram", href: "https://t.me/Benedict258", icon: "telegram" },
];

export const navLinks = [
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Mechatronics", href: "/#mechatronics" },
  { label: "Certifications", href: "/#certificates" },
  { label: "Contact", href: "/#contact" },
];
