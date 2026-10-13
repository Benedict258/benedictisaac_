import type { View, ViewRank } from "@/data/view";
import { sortForView } from "@/data/view";

export type ProjectCategory = "Software" | "AI" | "Blockchain" | "Mechatronics";

/** Wording used when the Mechatronics view is active and the mechatronics resume words a project differently. */
export type ProjectMechatronicsVariant = {
  subtitle?: string;
  description?: string;
  tech?: string[];
  impact?: string;
};

export type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  longDescription?: string;
  readme?: string; // short README/PRD text
  impact?: string; // "Key Impact" line from the resume
  tech: string[];
  github?: string;
  live?: string;
  npm?: string;
  docker?: string;
  docsUrl?: string;
  videoUrl?: string;
  tags?: string[];
  changelog?: string[];
  publishedDate?: string;
  license?: string;
  status?: string;
  screenshots?: string[];
  /** Alt text per screenshot, same order as `screenshots`. */
  screenshotAlts?: string[];
  features?: string[];
  team?: string[];
  categories: ProjectCategory[];
  /** Order per view. A missing key hides the project in that view. */
  rank: ViewRank;
  /** Shown under the collapsed "Earlier work" list instead of the main grid. */
  earlier?: boolean;
  mechatronics?: ProjectMechatronicsVariant;
};

// Wording for the main projects comes from the software and mechatronics resumes.
// TODO placeholders: GitHub repos and screenshots are listed in TODO.md.
export const projects: Project[] = [
  {
    slug: "openatlas",
    title: "OpenAtlas",
    subtitle: "Open SDK & Gateway Connecting N-ATLaS to Real Applications",
    description:
      "Led an open-source toolkit that lets developers build with the N-ATLaS language model in Hausa, Yoruba, Igbo, and Nigerian-accented English: a TypeScript SDK, an API gateway with key management and usage limits, and a GPU-served backend for the LLM and speech recognition.",
    impact:
      "Published @openatlas/sdk on npm with three starter kits (Citizen Services, Education, Customer Service), verified end-to-end against the live model.",
    tech: ["TypeScript", "Cloudflare Workers", "D1", "Python", "FastAPI", "Docker", "AMD ROCm"],
    github: "https://github.com/Benedict258/OpenAtlas",
    live: "https://getopenatlas.xyz",
    npm: "https://www.npmjs.com/package/@openatlas/sdk",
    status: "Published",
    screenshots: [], // TODO: screenshots
    categories: ["Software", "AI"],
    rank: { software: 1, mechatronics: 4 },
    mechatronics: {
      subtitle: "GPU-Served Inference Stack for Nigerian-Language AI",
      description:
        "Led a four-person team building the deployment stack behind an open SDK for the N-ATLaS model: a FastAPI inference server on an AMD MI300X (ROCm) GPU for LLM and speech recognition, fronted by a Cloudflare Worker gateway with hashed API keys and rate limits, plus a Docker and free-GPU notebook path for self-hosting.",
      tech: ["Python", "FastAPI", "Docker", "ROCm", "Cloudflare Workers", "TypeScript"],
      impact: "Published @openatlas/sdk on npm; verified end-to-end against the live model",
    },
  },
  {
    slug: "safroi",
    title: "Safroi",
    subtitle: "AI-Powered Legal Intelligence Platform",
    description:
      "Engineered a full-stack legal-tech platform that deconstructs Terms of Service into actionable risk ratings from live URLs, raw text, or file uploads, paired with a real-time multi-language translation layer.",
    longDescription:
      "Safroi is a cutting-edge digital guardian built by TeamSuiaah to help users take control of their privacy and digital footprint. It analyzes Terms of Service and Privacy Policies, produces risk scores, categorized red flags, translations, and maintains an audit history.",
    impact:
      "Automated multi-language contract risk scoring against global privacy standards, closing compliance blind spots through real-time policy analysis.",
    tech: [
      "React 18",
      "Vite",
      "Groq (Llama-3.3)",
      "Google Gemini (Gemma 4)",
      "Firebase (Firestore & Auth)",
      "Tailwind CSS",
      "Motion",
    ],
    github: "#", // TODO: repo link
    live: "https://safroi.vercel.app/",
    docker: "https://hub.docker.com/u/benedict258",
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
    // TODO: these screenshots still show the old "ClauseLens" brand; replace with Safroi-branded ones.
    screenshots: ["/Safroi.webp", "/Safroi1.webp", "/Safroi2.webp", "/Safroi3.webp"],
    screenshotAlts: [
      "Safroi landing page with the headline 'Protecting your digital footprint on the internet'",
      "Browser extension page with a high risk score of 8.4",
      "Analyzer page asking the user to sign in to analyze a contract or website URL",
      "Analysis result for a website with a risk score of 2, marked safe",
    ],
    categories: ["Software", "AI"],
    rank: { software: 2 },
  },
  {
    slug: "buiry",
    title: "Buiry",
    subtitle: "Portable Build-Memory for AI Agents",
    description:
      "Built a persistent build-memory and dataset-generation layer that lets AI coding agents carry project context across sessions and tools, based on a context-file technique I originated. Built for Sui Overflow 2026 and now being rebuilt as an open-core developer tool for portable agent memory on Walrus.",
    impact:
      "Originated the persistent build-memory technique and built it into a working layer as portable agent memory on Walrus.",
    tech: ["Sui", "Walrus"], // TODO: rest of the stack (language, framework)
    github: "#", // TODO: repo link
    live: "#", // TODO: live link
    status: "Being rebuilt",
    screenshots: [], // TODO: screenshots
    categories: ["AI", "Blockchain", "Software"],
    rank: { software: 3 },
  },
  {
    slug: "suirify",
    title: "Suirify",
    subtitle: "Sovereign Identity Protocol",
    description:
      "Designed a zero-knowledge digital identity protocol on the Sui blockchain enabling secure, privacy-preserving credential authentication without exposing raw personal identifiable information.",
    longDescription: `Suirify is a privacy-first sovereign identity protocol built on the Sui blockchain. It enables a "verify once, use everywhere" model with consent-first, on-chain attestation objects that let dApps gate features without storing sensitive personal data.

Why Suirify?
- Privacy-first: PII is processed in memory and immediately deleted; applications only read sanitized public claims.
- Reusable credentials: One-time verification issues an on-chain attestation users can present across various dApps.
- Compliance-friendly: Auditable attestations enable compliant DeFi, KYC gating, and age checks.
- Emerging Market Focus: Initially focused on Nigeria (NIN integration) with plans to scale globally.

How it Works
Suirify bridges real-world identity with Web3 by allowing users to verify their National Identification Number (NIN) privately. Once verified, a non-transferable "digital badge" is issued on-chain. dApps can then verify this badge via the Suirify SDK to ensure users are real and unique without ever seeing their underlying government ID data.`,
    impact:
      "Formulated reusable, soulbound cryptographic digital credentials optimized for frictionless, compliant decentralized application (dApp) ecosystem integrations.",
    tech: ["Sui Move", "Move Prover", "TypeScript", "Rust", "Node.js", "Git", "Sui zkLogin"],
    github: "#", // TODO: repo link
    live: "https://suirify.onrender.com",
    status: "Active",
    screenshots: ["/suilogo.png", "/SUIRIFY.webp"],
    features: [
      "On-Chain Attestation Objects",
      "Consent-First Data Sharing",
      "PII Memory Sanitization",
      "Nigerian NIN Integration",
      "Sybil Attack Prevention",
      "Reusable Identity Credentials",
    ],
    team: ["Benedict Isaac", "Team Suirify"],
    tags: ["Privacy", "Identity", "Sui", "Web3"],
    publishedDate: "2024",
    categories: ["Blockchain", "Software"],
    rank: { software: 4 },
  },
  {
    slug: "arche",
    title: "Arche",
    subtitle: "Behavioral Simulation & Intelligent Recommendation Engine",
    description:
      "Architected a production-grade multi-LLM orchestration system to simulate user personas, predict text-review registers, and manage context-aware history snapshots instrumented with structured logging, latency tracking, and real-time web search integration.",
    impact:
      "Achieved a 100% test pass rate (41/41) and full scenario validation (20/20), with zero-PII storage via transparent token hashing and context redaction.",
    tech: ["Python", "Groq (Llama)", "SQLite", "Serper API", "DuckDuckGo API", "SHA256 Hashing", "Pytest"],
    github: "#", // TODO: repo link
    live: "#", // TODO: live link
    screenshots: [], // TODO: screenshots
    categories: ["AI", "Software"],
    rank: { software: 5 },
  },
  {
    slug: "esn-prism",
    title: "ESN-PRISM",
    subtitle: "Edge-Native Recognition & Security Monitoring Intelligence",
    description:
      "Built an edge-native computer vision system that lets users query a live surveillance feed conversationally instead of reviewing footage by hand, pairing real-time recognition with a lightweight Llama reasoning layer and gesture-based control, engineered to run on a standard laptop with no dedicated GPU.",
    longDescription:
      "Built an edge-native computer vision system that lets users query a live surveillance feed conversationally instead of reviewing footage by hand, pairing real-time recognition with a lightweight Llama reasoning layer and gesture-based control, engineered to run on a standard laptop with no dedicated GPU.",
    impact: "Build complete and in testing; runs live on a Core i5 with no GPU.",
    tech: ["Python", "OpenCV", "Computer Vision", "Meta Llama (via Groq)", "Gesture Recognition"],
    github: "#",
    live: "#",
    status: "In Testing",
    features: [
      "Query a live surveillance feed conversationally",
      "Real-time recognition and security monitoring",
      "Lightweight Llama reasoning layer",
      "Gesture-based control",
      "Runs on a standard laptop with no dedicated GPU",
    ],
    screenshots: [],
    tags: ["Edge AI", "Computer Vision", "Security", "Python"],
    publishedDate: "2026",
    categories: ["AI", "Mechatronics"],
    rank: { software: 6, mechatronics: 1 },
    mechatronics: {
      subtitle: "Edge-Native Recognition & Security Monitoring",
      description:
        "Built an edge-native computer vision system for real-time recognition and security monitoring, integrating a lightweight LLM reasoning layer alongside live gesture-based control, engineered to run smoothly on constrained hardware with no dedicated GPU.",
      tech: ["Python", "Computer Vision", "Edge AI", "LLM (via Groq)", "Gesture Recognition"],
      impact: "Build complete and in testing; runs live on a Core i5 laptop with no dedicated GPU.",
    },
  },
  {
    slug: "winterarc",
    title: "WinterArc",
    subtitle: "Personal Workspace",
    description:
      "Personal workspace PWA for layered daily and weekly task planning with persistent check-off.",
    tech: ["Vite", "MongoDB Atlas", "PWA"],
    github: "#", // TODO: repo link
    live: "https://workspace.benedictisaac.dev",
    status: "Live",
    screenshots: [], // TODO: screenshots
    categories: ["Software"],
    rank: { software: 7 },
  },
  {
    slug: "ecaps",
    title: "ECAPs",
    subtitle: "Edge Computing Agentic Processors (active research)",
    description:
      "Designing a plug-and-play edge AI hardware product built on a five-layer agentic intelligence stack, bringing on-device agentic compute to robotics, engineering systems, and locally accessible deployments. Currently at concept, architecture, and simulation-first prototyping stage.",
    longDescription:
      "Designing a plug-and-play edge AI hardware product built on a five-layer agentic intelligence stack, bringing on-device agentic compute to robotics, engineering systems, and locally accessible deployments. Currently at concept, architecture, and simulation-first prototyping stage.",
    tech: ["Edge Computing", "Agentic AI Systems Design", "Hardware Architecture"],
    github: "#",
    live: "#",
    status: "Active Research",
    screenshots: [],
    tags: ["Edge Computing", "Agentic AI", "Hardware", "Research"],
    publishedDate: "2026",
    categories: ["Mechatronics", "AI"],
    rank: { mechatronics: 2 },
  },
  {
    slug: "agentic-architectures-research",
    title: "Research: Agentic Architectures in Robotics & Engineering Systems",
    description:
      "Researching how layered agentic AI structures can be applied to robotics and engineering systems, and prototyping an agentic engineering structure, with ECAPs as the reference architecture.",
    longDescription:
      "Researching how layered agentic AI structures can be applied to robotics and engineering systems, and prototyping an agentic engineering structure, with ECAPs as the reference architecture.",
    tech: ["Agentic AI Systems Design", "Robotics Systems Integration", "Edge Computing"],
    github: "#",
    live: "#",
    status: "Active Research",
    screenshots: [],
    tags: ["Agentic AI", "Robotics", "Edge Computing", "Research"],
    publishedDate: "2026",
    categories: ["Mechatronics", "AI"],
    rank: { mechatronics: 3 },
  },

  // ---- Earlier work (descriptions as already on the site) ----
  {
    slug: "haloai",
    title: "HaloAI Agent",
    description:
      "AI-driven WhatsApp copilot and pocket-sized CRM for MSMEs enabling conversational order management and automated customer support.",
    longDescription: `HaloAgent is your pocket-sized CRM and AI assistant built for vendors and MSMEs: take orders, send updates, collect feedback, and grow repeat sales, all from the chat your customers already use.

Key Benefits
- Works where your customers are: WhatsApp-first, plus a full web app.
- Turn chats into reliable orders, automated updates, and loyalty without extra tech headaches.
- Smart suggestions and simple reports that help you sell more and stress less.
- Trusted by local vendors across Nigeria.

How it Works
Works instantly with your WhatsApp number or from our web app. The same agent, same history, and double the reach. HaloAgent helps market vendors, bakers, tailors, and small shops act like the big players with fast replies, fewer mistakes, and happier customers. No complicated setup—just connect your number, upload your menu, and let the agent do the heavy lifting.`,
    tech: ["FastAPI", "Python", "LLMs (Llama 3)", "Twilio WhatsApp", "PostgreSQL", "React"],
    github: "#",
    live: "https://halo-agent.onrender.com/",
    status: "Prototype",
    features: [
      "Inventory & Menu Management",
      "Automated WhatsApp Order Tracking",
      "One-tap Reordering for Customers",
      "Multilingual Message Support",
      "Conversational CRM Workflows",
      "Unified Web & Chat History",
    ],
    screenshots: [],
    categories: ["AI", "Software"],
    rank: { software: 10 },
    earlier: true,
  },
  {
    slug: "tenaxai",
    title: "Tenaxai",
    description:
      "AI-driven Product-to-Market Launch OS for startups and creators to discover markets, generate creatives, and track rollouts.",
    longDescription: `Tenaxai is a comprehensive Product-to-Market Launch Operating System designed for the right market, right message, and right time. It puts AI-driven market intelligence at your fingertips, allowing startups and creators to plan, schedule, and track rollouts from pre-launch to execution.

Whether you're validating a new idea or iterating on a live product, Tenaxai provides the intelligent workspace needed to navigate the complexities of product-market fit and growth. It combines strategic planning, creative execution, and deep analytics into a single, battle-tested platform.`,
    tech: ["Next.js", "TypeScript", "Node.js", "Tailwind CSS", "LLMs (OpenAI, Gemini)", "PostgreSQL"],
    github: "#",
    live: "https://tenaxai.tech/",
    status: "Live",
    features: [
      "Market & Product Fit stress testing",
      "AI-Assisted Planning & Readiness (Checklists, Sprints)",
      "Multi-channel Creative & Messaging Generation",
      "KPI Analytics & Demand Forecasting",
      "Interactive Market Explorer & Growth Heatmaps",
      "Battle-tested GTM Playbooks & Frameworks",
      "Risk Simulation & 'What-if' Scenario Planning",
      "AI-Generated Business Model Canvas (BMC) Builder",
    ],
    screenshots: [],
    categories: ["AI", "Software"],
    rank: { software: 11 },
    earlier: true,
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
    screenshots: ["/Cight.webp", "/Cight1.webp", "/Cight3.webp"],
    categories: ["AI", "Software"],
    rank: { software: 12 },
    earlier: true,
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
    categories: ["Mechatronics"],
    rank: { mechatronics: 5 },
    earlier: true,
  },
];

/** Old slugs that should keep working. */
export const legacySlugs: Record<string, string> = {
  ess: "esn-prism",
};

export const findProject = (slug?: string) => {
  const resolved = slug ? legacySlugs[slug] ?? slug : undefined;
  return projects.find((p) => p.slug === resolved);
};

/** Returns the project with the mechatronics wording applied when that view is active. */
export const projectForView = (project: Project, view: View): Project =>
  view === "mechatronics" && project.mechatronics
    ? { ...project, ...Object.fromEntries(Object.entries(project.mechatronics).filter(([, v]) => v !== undefined)) }
    : project;

export const mainProjects = (view: View) =>
  sortForView(
    projects.filter((p) => !p.earlier),
    (p) => p.rank,
    view,
  ).map((p) => projectForView(p, view));

export const earlierProjects = (view: View) =>
  sortForView(
    projects.filter((p) => p.earlier),
    (p) => p.rank,
    view,
  ).map((p) => projectForView(p, view));

export const PROJECT_FILTERS = ["All", "Software", "AI", "Blockchain", "Mechatronics"] as const;
export type ProjectFilter = (typeof PROJECT_FILTERS)[number];

export default projects;
