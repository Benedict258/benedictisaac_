export type PlanSlug = "startup" | "growth" | "enterprise" | "custom";

export interface PricingPlan {
  slug: PlanSlug;
  name: string;
  subtitle?: string;
  description: string;
  bestFor?: string;
  scope?: string;
  price: string;
  highlight?: string;
  includeInMatrix?: boolean;
  details?: string[];
}

export interface PricingFeatureRow {
  feature: string;
  values: [string, string, string];
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    slug: "startup",
    name: "Startup",
    description: "Web, frontend, basic automation, MVP support",
    bestFor: "Best for: founders validating ideas, small teams, short feedback loops",
    scope: "Scope: limited features, focused execution, async collaboration",
    price: "Starting from $500/month",
    includeInMatrix: true,
  },
  {
    slug: "growth",
    name: "Growth",
    subtitle: "Scaling systems & automation",
    description: "Full-stack work, AI workflows, integrations, dashboards",
    price: "Starting from $1,500/month",
    includeInMatrix: true,
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    subtitle: "Custom / Deep engineering",
    description: "Bespoke systems, agentic AI, architecture, observability",    bestFor: "Best for: funded startups, companies, long-term engagements",
    scope: "Scope: system design, custom agents, dedicated engineering time",
    price: "Starting from $5,000/month (Custom)",
    includeInMatrix: true,
    highlight: "Contact for roadmap",
  },
  {
    slug: "custom",
    name: "Custom (Personalized)",
    description: "Mix AI, blockchain, infra, and enablement tracks for personalized offers.",
    details: [
      "Examples: portfolio designs, landing pages, custom builds",
      "Perfect for individuals and flexible engagements",
    ],
    price: "Tailored scope",
    includeInMatrix: false,
  },
];

export const FEATURE_PLAN_SLUGS: PlanSlug[] = ["startup", "growth", "enterprise"];

export const FEATURE_MATRIX: PricingFeatureRow[] = [
  {
    feature: "Web & Frontend Engineering",
    values: ["✔️", "✔️", "✔️"],
  },
  {
    feature: "Full-Stack & SaaS Support",
    values: ["✔️", "✔️", "✔️"],
  },
  {
    feature: "AI & Automation Workflows",
    values: ["✔️", "✔️", "✔️"],
  },
  {
    feature: "Agentic AI Systems",
    values: ["—", "✔️", "✔️"],
  },
  {
    feature: "API Integrations",
    values: ["✔️", "✔️", "✔️"],
  },
  {
    feature: "System Design & Architecture",
    values: ["—", "✔️", "✔️"],
  },
  {
    feature: "Observability & Optimization",
    values: ["—", "✔️", "✔️"],
  },
  {
    feature: "Custom Solutions",
    values: ["—", "—", "✔️"],
  },
  {
    feature: "Collaboration Scope",
    values: ["Limited", "Extended", "Dedicated"],
  },
];

export const getPlanBySlug = (slug: PlanSlug) =>
  PRICING_PLANS.find((plan) => plan.slug === slug) ?? PRICING_PLANS[0];
