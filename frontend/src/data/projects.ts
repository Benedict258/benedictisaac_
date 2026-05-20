export type Project = {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  readme?: string; // short README/PRD text
  tech: string[];
  github?: string;
  live?: string;
  docsUrl?: string;
  videoUrl?: string;
  tags?: string[];
  changelog?: string[];
  publishedDate?: string;
  license?: string;
  status?: string;
  screenshots?: string[];
  features?: string[];
  team?: string[];
};

export const projects: Project[] = [
  {
    slug: "suirify",
    title: "Suirify",
    description:
      "Sovereign identity protocol on Sui that enables users to verify identity attributes without exposing sensitive personal data.",
    tech: ["Sui Move", "TypeScript", "Zero-Knowledge Proofs", "Nautilus Key"],
    github: "#",
    live: "https://testnet.suirify.com/",
    status: "Active",
    screenshots: [],
    tags: [],
    readme: "",
    videoUrl: "",
    docsUrl: "",
    changelog: [],
    publishedDate: "",
    license: "",
  },
  {
    slug: "clauselens",
    title: "ClauseLens",
    description:
      "ClauseLens is an AI-powered legal intelligence platform that deconstructs complex Terms & Privacy policies into clear summaries and risk scores.",
    longDescription:
      "ClauseLens is a cutting-edge digital guardian built by TeamSuiaah to help users take control of their privacy and digital footprint. It analyzes Terms of Service and Privacy Policies, produces risk scores, categorized red flags, translations, and maintains an audit history.",
    tech: [
      "React",
      "Vite",
      "Tailwind CSS",
      "motion/react",
      "Firebase (Firestore, Auth)",
      "Llama-3.3",
      "Google Gemini",
      "Lucide React",
    ],
    github: "#",
    live: "https://clauselens.suirify.com/",
    status: "Live",
    features: [
      "Multi-source analysis (URL, text, file)",
      "AI risk scoring (0-10)",
      "Categorized red flags (Data Collection, Liability, User Rights)",
      "On-the-fly translation",
      "Browser extension for real-time scanning",
      "Secure audit history",
    ],
    team: ["Benedict Isaac", "Amanda Adewumi"],
    screenshots: [],
  },
  {
    slug: "suisense",
    title: "SuiSense (In Development)",
    description:
      "AI interpretation layer for Sui that translates raw transaction and smart contract execution data into clear, human-readable explanations.",
    tech: ["Sui Blockchain", "Sui Move", "Python", "LLMs", "Execution Data"],
    github: "#",
    live: "#",
    status: "In Development",
    screenshots: [],
  },
  {
    slug: "haloai",
    title: "HaloAI Agent",
    description:
      "AI-driven WhatsApp copilot for MSMEs enabling conversational order management, automated customer support, and CRM workflows across messaging platforms.",
    tech: ["FastAPI", "Python", "LLMs (Llama 3)", "Twilio WhatsApp", "PostgreSQL"],
    github: "#",
    live: "https://halo-agent.onrender.com/",
    status: "Prototype",
    screenshots: [],
  },
  {
    slug: "tenax",
    title: "Tenax",
    description:
      "AI execution and accountability agent that converts goals into measurable daily actions through behavioral tracking and feedback loops.",
    tech: ["Python", "LLMs (Llama 3, Gemini, OpenAI)", "Opik", "React", "Supabase"],
    github: "#",
    live: "#",
    status: "Prototype",
    screenshots: [],
  },
  {
    slug: "solar-charger-sim",
    title: "Solar Charger Controller (Simulation)",
    description:
      "Simulation of a solar charge controller focused on efficient battery charging and power regulation using control logic principles.",
    tech: ["MATLAB", "Simulink", "C++"],
    github: "#",
    live: "#",
    status: "Simulation",
    screenshots: [],
  },
  {
    slug: "flux",
    title: "Flux (In Development)",
    description:
      "Product launch operating system that helps startups and creators plan, schedule, and track rollouts from pre-launch to execution.",
    tech: ["Next.js", "TypeScript", "Node.js", "Tailwind CSS"],
    github: "#",
    live: "https://flux.base44.app/",
    status: "Live",
    screenshots: [],
  },
  {
    slug: "cight",
    title: "CIGHT",
    description:
      "CIGHT is an AI-powered entertainment recognition and discovery platform that identifies movies and TV shows from screenshots and clips instantly.",
    longDescription:
      "CIGHT provides frame-based recognition, anime support, watch-provider lookup, and an AI expert for recommendations. It integrates TMDB, Trace.moe, and AniList.",
    tech: [
      "React",
      "Vite",
      "Tailwind CSS",
      "motion/react",
      "Firebase (Firestore, Auth)",
      "Google Gemini",
      "TMDB API",
      "Trace.moe / AniList",
    ],
    github: "#",
    live: "https://cight-257251079622.us-west1.run.app/",
    status: "Live",
    features: [
      "AI scanner for screenshots and clips",
      "Anime recognition via Trace.moe",
      "Watch provider lookups (TMDB)",
      "Personal library and recommendations",
    ],
    screenshots: [],
  },
];

export default projects;
