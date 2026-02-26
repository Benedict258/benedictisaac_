import { Pricing as PricingSection } from "@/components/ui/pricing-section-with-comparison";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/ui/footer";
import { buildDiscoveryCallUrl } from "@/lib/scheduling";
import { useTheme } from "next-themes";
import { useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  Globe2,
  Layers,
  Linkedin,
  Mail,
  Moon,
  Phone,
  ServerCog,
  Sparkles,
  Sun,
  Twitter,
} from "lucide-react";

const heroStats: Array<{
  label: string;
  value: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    label: "Launch velocity",
    value: "2-4 week sprints",
    description: "Ship AI, web, and protocol layers without stalls.",
    icon: Sparkles,
  },
  {
    label: "Systems delivered",
    value: "25+ builds",
    description: "Product launches across founders, labs, and dev rel.",
    icon: Layers,
  },
  {
    label: "Operational confidence",
    value: "99.5% uptime",
    description: "Instrumented automations with on-call support.",
    icon: ServerCog,
  },
];

const servicePillars = [
  {
    title: "Agentic & AI execution",
    copy:
      "Rapid orchestration of LLM copilots, evaluators, and observability rails tailored to your workflows.",
  },
  {
    title: "Product-grade web & dashboards",
    copy:
      "Next.js, React, and data viz experiences wired to your stack with reusable component systems.",
  },
  {
    title: "Blockchain + systems integration",
    copy:
      "Sui Move smart contracts, verifiable identity rails, and supporting automation for compliance.",
  },
];

const workingStyle = [
  "Weekly async demos with executable Loom or GitHub updates.",
  "WhatsApp hotline for founders plus 24h response SLA.",
  "Runbooks, docs, and handoff kits after every sprint.",
  "Co-build sessions for in-house teams to pair and upskill.",
];

const PricingPage = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const navigate = useNavigate();
  const isDark = (theme ?? resolvedTheme) === "dark";
  const handleScheduleDiscovery = () => {
    const href = buildDiscoveryCallUrl("Pricing Conversation");
    if (typeof window !== "undefined") {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="container flex flex-wrap items-center justify-between gap-3 py-4">
          <Button variant="ghost" size="sm" className="gap-2" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground">
              Theme
            </span>
            <Button variant="outline" size="sm" className="gap-2" onClick={toggleTheme}>
              {isDark ? (
                <>
                  <Sun className="h-4 w-4" /> Light
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" /> Dark
                </>
              )}
            </Button>
          </div>
        </div>
      </header>
      <main className="bg-background">
        <section className="relative isolate overflow-hidden border-b border-border/40 bg-gradient-to-b from-background via-background to-background">
          <div className="absolute inset-0 opacity-70">
            <div className="absolute -top-32 right-10 h-72 w-72 rounded-full bg-primary/20 blur-[140px]" />
            <div className="absolute bottom-0 left-10 h-64 w-64 rounded-full bg-primary/10 blur-[120px]" />
          </div>
          <div className="container relative grid gap-12 py-24 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <Badge className="w-fit">Pricing</Badge>
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                  Pick a build runway aligned with your roadmap.
                </h1>
                <p className="text-lg text-muted-foreground">
                  Every plan ships with technical leadership, async collaboration, and instrumented delivery so you can focus on traction, not tooling.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="gap-3">
                  <a href="https://wa.link/z9yfhb" target="_blank" rel="noreferrer">
                    Book WhatsApp call <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="gap-3">
                  <a href="mailto:benedictisaac258@gmail.com" target="_blank" rel="noreferrer">
                    Send project brief <Mail className="h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="secondary" className="gap-3" onClick={handleScheduleDiscovery}>
                  Schedule discovery <Phone className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {heroStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="rounded-3xl border border-border/40 bg-background/80 p-6 shadow-2xl shadow-primary/5 backdrop-blur"
                  >
                    <Icon className="mb-4 h-5 w-5 text-primary" />
                    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{stat.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-border/40 bg-background">
          <PricingSection />
        </section>

        <section className="bg-muted/30 py-20">
          <div className="container grid gap-10 lg:grid-cols-2">
            <div className="space-y-5">
              <Badge variant="outline" className="w-fit">
                Delivery Stack
              </Badge>
              <h2 className="text-3xl font-semibold md:text-4xl">
                Every engagement includes hands-on technical product ownership.
              </h2>
              <p className="text-muted-foreground">
                Partner through discovery to launch — from architecture decisions to QA and observability — with the same tone and execution frameworks showcased on the home screen.
              </p>
              <div className="grid gap-4">
                {servicePillars.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="rounded-2xl border border-border/40 bg-background p-5"
                  >
                    <p className="text-lg font-semibold">{pillar.title}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{pillar.copy}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-border/40 bg-background/70 p-8 shadow-xl shadow-primary/10 backdrop-blur">
              <div className="space-y-3">
                <Badge variant="secondary" className="w-fit">
                  Collaboration
                </Badge>
                <h3 className="text-2xl font-semibold">Need a bespoke scope?</h3>
                <p className="text-muted-foreground">
                  Send context, repositories, or metrics and I will outline a custom runway plus resourcing in under 24 hours.
                </p>
              </div>
              <ul className="mt-8 space-y-4">
                {workingStyle.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3">
                <Button asChild size="lg" className="gap-3">
                  <a href="https://wa.link/z9yfhb" target="_blank" rel="noreferrer">
                    Book WhatsApp call <Phone className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="gap-3">
                  <a href="mailto:benedictisaac258@gmail.com" target="_blank" rel="noreferrer">
                    Email scope <Mail className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer
        logo={
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15">
            <Globe2 className="h-5 w-5" />
          </div>
        }
        brandName="Benedict Isaac"
        socialLinks={[
          {
            icon: <Twitter className="h-5 w-5" />,
            href: "https://x.com/DevChronicles_",
            label: "X",
          },
          {
            icon: <Github className="h-5 w-5" />,
            href: "https://github.com/Benedict258/",
            label: "GitHub",
          },
          {
            icon: <Linkedin className="h-5 w-5" />,
            href: "https://www.linkedin.com/in/benedict-isaac-0b60a732b/",
            label: "LinkedIn",
          },
        ]}
        mainLinks={[
          { href: "/#about", label: "About" },
          { href: "/#projects", label: "Projects" },
          { href: "/#experience", label: "Experience" },
          { href: "/#contact", label: "Contact" },
        ]}
        legalLinks={[
          { href: "#", label: "Privacy" },
          { href: "#", label: "Terms" },
        ]}
        copyright={{
          text: "Copyright 2026 Benedict Isaac",
          license: "All rights reserved",
        }}
      />
    </div>
  );
};

export default PricingPage;
