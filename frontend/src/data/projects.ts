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
      "Privacy-first sovereign identity protocol on Sui enabling secure, reusable on-chain attestations for decentralized applications.",
    longDescription:
      `Suirify is a privacy-first sovereign identity protocol built on the Sui blockchain. It enables a "verify once, use everywhere" model with consent-first, on-chain attestation objects that let dApps gate features without storing sensitive personal data.

Why Suirify?
- Privacy-first: PII is processed in memory and immediately deleted; applications only read sanitized public claims.
- Reusable credentials: One-time verification issues an on-chain attestation users can present across various dApps.
- Compliance-friendly: Auditable attestations enable compliant DeFi, KYC gating, and age checks.
- Emerging Market Focus: Initially focused on Nigeria (NIN integration) with plans to scale globally.

How it Works
Suirify bridges real-world identity with Web3 by allowing users to verify their National Identification Number (NIN) privately. Once verified, a non-transferable "digital badge" is issued on-chain. dApps can then verify this badge via the Suirify SDK to ensure users are real and unique without ever seeing their underlying government ID data.`,
    tech: ["Sui Move", "TypeScript", "Zero-Knowledge Proofs", "Nautilus Key", "Sui SDK", "NIN API"],
    github: "#",
    live: "https://testnet.suirify.com/",
    status: "Active",
    screenshots: ["/suilogo.png", "/SUIRIFY.png"],
    features: [
      "On-Chain Attestation Objects",
      "Consent-First Data Sharing",
      "PII Memory Sanitization",
      "Nigerian NIN Integration",
      "Sybil Attack Prevention",
      "Reusable Identity Credentials"
    ],
    team: ["Benedict Isaac", "Team Suirify"],
    tags: ["Privacy", "Identity", "Sui", "Web3"],
    publishedDate: "2024",
  },
  {
    slug: "safroi",
    title: "Safroi",
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
    live: "https://safroi.vercel.app/",
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
    screenshots: ["/ClauseLens.png", "/ClauseLens1.png", "/ClauseLens2.png", "/ClauseLens3.png"],
  },
  {
    slug: "haloai",
    title: "HaloAI Agent",
    description:
      "AI-driven WhatsApp copilot and pocket-sized CRM for MSMEs enabling conversational order management and automated customer support.",
    longDescription:
      `HaloAgent is your pocket-sized CRM and AI assistant built for vendors and MSMEs: take orders, send updates, collect feedback, and grow repeat sales, all from the chat your customers already use.

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
      "Unified Web & Chat History"
    ],
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
    slug: "tenaxai",
    title: "Tenaxai",
    description:
      "AI-driven Product-to-Market Launch OS for startups and creators to discover markets, generate creatives, and track rollouts.",
    longDescription:
      `Tenaxai is a comprehensive Product-to-Market Launch Operating System designed for the right market, right message, and right time. It puts AI-driven market intelligence at your fingertips, allowing startups and creators to plan, schedule, and track rollouts from pre-launch to execution.

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
      "AI-Generated Business Model Canvas (BMC) Builder"
    ],
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
    screenshots: ["/Cight.png", "/Cight1.png", "/Cight3.png"],
  },
  {
    slug: "ess",
    title: "ESS",
    description:
      "Edge-native persistent recognition and security monitoring system engineered to run on constrained hardware with an integrated lightweight LLM reasoning layer and live gesture-based control.",
    longDescription:
      `ESS (Edge-Native Persistent Recognition & Security Monitoring System) is a computer vision system designed for real-time recognition and security monitoring on constrained hardware — no dedicated GPU required.

Key Capabilities
- Runs entirely on edge devices with no cloud dependency for core inference
- Integrated lightweight LLM reasoning layer for contextual decision-making
- Live gesture-based control for hands-free interaction
- Optimized for low-power, resource-constrained environments

How it Works
ESS combines lightweight computer vision models with a local LLM reasoning layer to perform real-time scene understanding and security monitoring. The system processes video feeds locally, detects objects and anomalies, and uses gesture recognition to allow operators to interact with the system without physical input devices. All processing happens on-device, ensuring privacy and low latency.`,
    tech: ["Computer Vision", "Edge AI", "Python", "LLM (via Groq)", "Gesture Recognition"],
    github: "#",
    live: "#",
    status: "In Development",
    features: [
      "Real-time object detection and recognition on edge hardware",
      "Lightweight LLM reasoning layer for contextual analysis",
      "Live gesture-based control interface",
      "No dedicated GPU required",
      "Privacy-first local processing",
      "Low-latency security monitoring",
    ],
    screenshots: [],
    tags: ["Edge AI", "Computer Vision", "Security", "Python"],
    publishedDate: "2026",
  },
  {
    slug: "agentic-architectures-research",
    title: "Research: Agentic Architectures in Robotics & Engineering Systems",
    description:
      "Ongoing research into applying agentic AI structures to robotics and engineering systems, with ECAPs as the applied hardware product — a plug-and-play edge AI concept built on a layered agentic intelligence stack.",
    longDescription:
      `This is an active research initiative exploring how agentic AI architectures can be applied to robotics and physical engineering systems.

ECAPs (Edge Computing Agentic Processors)
The applied output of this research is the ECAP concept — a plug-and-play edge AI hardware module built on a layered agentic intelligence stack. ECAPs are designed to bring autonomous decision-making capabilities to robotic and engineering systems without relying on cloud infrastructure.

Research Areas
- Multi-agent coordination in physical systems
- Edge-native agentic inference pipelines
- Hardware-software co-design for autonomous robotics
- Layered intelligence stacks for real-time engineering control

Status: This research is in its early stages. The work is exploratory and ongoing.`,
    tech: ["Agentic AI", "Robotics", "Edge Computing", "Hardware Prototyping"],
    github: "#",
    live: "#",
    status: "Active Research",
    features: [
      "Layered agentic intelligence stack for edge hardware",
      "Multi-agent coordination frameworks for robotics",
      "Cloud-independent autonomous decision-making",
      "Hardware-software co-design methodology",
    ],
    screenshots: [],
    tags: ["Agentic AI", "Robotics", "Edge Computing", "Research"],
    publishedDate: "2026",
  },
];

export default projects;
