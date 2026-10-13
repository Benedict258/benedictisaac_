import type { ViewRank } from "@/data/view";

export type ExperienceGroup = "work" | "leadership";

export type ExperienceEntry = {
  id: string;
  group: ExperienceGroup;
  role: string;
  company: string;
  location: string;
  period: string;
  /** Bullets as written in the software resume (default). */
  bullets?: string[];
  /** Bullets as written in the mechatronics resume, when they differ. */
  bulletsMechatronics?: string[];
  /** Free text, used for entries that come from the site rather than the resumes. */
  description?: string;
  /** Order per view. Lower first. Entries are shown in every view. */
  order: ViewRank;
};

export const experience: ExperienceEntry[] = [
  // ---- Work ----
  {
    id: "waste2light",
    group: "work",
    role: "Embedded Systems Intern",
    company: "Waste2Light",
    location: "Minna, NG",
    period: "Sep 2026 - Present",
    bullets: [
      "Part of a team working on clean energy (wind and hydro), embedded-systems STEM kit development for young students, and school outreach.",
      "Built a component-selection and pricing site for the “green corner”, where schools choose embedded components and units and get a price.",
    ],
    order: { software: 4, mechatronics: 1 },
  },
  {
    id: "nihub",
    group: "work",
    role: "Front Desk Officer",
    company: "NIHUB, FUTMinna",
    location: "Minna, NG",
    period: "Mar 2026 - Present",
    bullets: [
      "Serve as first point of contact at NIHUB, FUTMinna's tech innovation hub, run in partnership with Huawei, Cisco, Microsoft, and Google, guiding students toward the right training or certification track.",
      "Assess visitors' backgrounds and interests to route them into the pathway that fits their goals.",
    ],
    order: { software: 3, mechatronics: 2 },
  },
  {
    id: "lagosrhythm",
    group: "work",
    role: "Full-Stack Developer",
    company: "LagosRhythm",
    location: "Remote",
    period: "Mar 2026 - Present",
    bullets: [
      "Engineered backend services and dynamic frontend components (Node.js, React/Next.js) powering real-time streaming and cultural-discovery features for a fast-growing tourism-tech startup.",
      "Reduced API latency and eliminated cross-device UI instability by restructuring database schema and query design for global traffic.",
      "Delivering production features end-to-end alongside founders and product in a fast-paced startup cycle, from spec to deployment.",
    ],
    bulletsMechatronics: [
      "Engineer backend services and system integrations for a tourism-tech startup's real-time, data-heavy features.",
      "Apply systems-level database and API design to keep performance stable under real-time load.",
    ],
    order: { software: 2, mechatronics: 3 },
  },
  {
    id: "talenxify",
    group: "work",
    role: "Frontend Engineer",
    company: "Talenxify (ATC Africa)",
    location: "Remote",
    period: "Nov 2025 - Present",
    bullets: [
      "Elevated core platform responsiveness by engineering high-performance interfaces in React and Next.js.",
      "Streamlined onboarding architecture and state management, cutting registration friction for new users.",
      "Integrated backend RESTful APIs cross-functionally with engineers and product owners, accelerating feature delivery within tight startup timelines",
    ],
    order: { software: 1, mechatronics: 4 },
  },

  // ---- Leadership & Community ----
  {
    id: "millennium-fellow",
    group: "leadership",
    role: "Millennium Fellow",
    company: "United Nations Academic Impact & Millennium Campus Network (MCN)",
    location: "Minna, NG",
    period: "Aug 2026 - Present",
    description:
      "Selected as a Millennium Fellow — a competitive, semester-long global leadership program for undergraduates presented by the United Nations Academic Impact and the Millennium Campus Network, spanning 300+ campuses worldwide. Advancing the UN Sustainable Development Goals through campus-based cohort leadership training and student-led social impact action.",
    order: { software: 6, mechatronics: 6 },
  },
  {
    id: "gdgoc",
    group: "leadership",
    role: "Programs Management Team Lead",
    company: "GDGoC FUTMinna & American Spaces, Minna",
    location: "Minna, NG",
    period: "Present",
    bullets: [
      "Programs Management Team Lead, 2026/27: Lead the programs management team.",
      "Management Team Member, 2025/26: Organised events, managed the community, and helped grow the ecosystem.",
    ],
    bulletsMechatronics: [
      "Lead the programs management team.",
      "Previously Management Team Member (2025/26): organized events, managed the community, and helped grow the ecosystem.",
    ],
    order: { software: 1, mechatronics: 3 },
  },
  {
    id: "aws-sbg",
    group: "leadership",
    role: "Technical Lead",
    company: "AWS Student Builder Group",
    location: "Minna, NG",
    period: "Jun 2026 - Present",
    bullets: [
      "Lead weekly virtual workshop series, taking student builders from account setup to deployed cloud projects.",
      "Designed a phased curriculum (Foundations, Real Applications, Specialisation tracks, Capstone) that turns AWS services into use-case exercises for early-career developers",
    ],
    order: { software: 2, mechatronics: 4 },
  },
  {
    id: "blockchain-club",
    group: "leadership",
    role: "Technical Lead",
    company: "Blockchain Club FUTMinna",
    location: "Remote",
    period: "May 2026 - Present",
    bullets: [
      "Lead the club’s technical direction and mentor student developers in smart contract development and Web3 fundamentals.",
      "Authored the technical curriculum across EVM/Solidity, Sui/Move, Aptos/Move, and Solana/Rust.",
      "Designed and built the club’s community platform.",
    ],
    order: { software: 3, mechatronics: 5 },
  },
  {
    id: "sui-on-campus",
    group: "leadership",
    role: "Team Lead & Full-Stack Developer",
    company: "Sui On Campus (Team Suirify)",
    location: "Minna, NG",
    period: "Oct 2025 - Present",
    description:
      "Designed and implemented highly interactive web interfaces, increasing engagement by 30%. Led UI structure and content presentation, improved scalability with reusable components, and collaborated cross-functionally to accelerate delivery by 20%.",
    order: { software: 5, mechatronics: 7 },
  },
  {
    id: "devfest",
    group: "leadership",
    role: "Frontend Developer & Protocol Team",
    company: "GDG Minna DevFest",
    location: "Minna, NG",
    period: "Nov 2025",
    description:
      "Built and deployed a responsive DevFest website with registration, agenda, and speaker profiles. Developed interactive schedule components, optimized accessibility and performance, and supported event operations and post-event reviews.",
    order: { software: 7, mechatronics: 8 },
  },
  {
    id: "next-gen-innovators",
    group: "leadership",
    role: "Volunteer (Technology & STEM Programs)",
    company: "Next-Gen Innovators",
    location: "Minna, NG",
    period: "Aug 2025",
    bullets: [
      "Guided students in working with embedded systems, building their ability to use and implement their own systems.",
      "Supported the growth of STEM among young learners through hands-on technology programs.",
    ],
    order: { software: 8, mechatronics: 1 },
  },
];

export default experience;
