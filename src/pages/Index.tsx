import { lazy, Suspense } from "react";
import { CallToAction } from "@/components/ui/cta-3";
import { IconCloud } from "@/components/ui/interactive-icon-cloud";
import { Footer } from "@/components/ui/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { WorldMapRoute } from "@/components/ui/world-map";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  BarChart3,
  Brain,
  Code2,
  FileDown,
  Github,
  Globe2,
  Layers,
  Linkedin,
  Mail,
  Phone,
  ServerCog,
  Sparkles,
  Twitter,
} from "lucide-react";

const AnimatedGridPattern = lazy(() =>
  import("@/components/ui/animated-grid-pattern").then((module) => ({
    default: module.AnimatedGridPattern,
  })),
);
const Timeline = lazy(() =>
  import("@/components/ui/timeline").then((module) => ({
    default: module.Timeline,
  })),
);
const PartnerLogoCloud = lazy(() =>
  import("@/components/ui/logo-cloud-4").then((module) => ({
    default: module.LogoCloud,
  })),
);
const CommunitiesLogoCloud = lazy(() =>
  import("@/components/ui/logo-cloud-2").then((module) => ({
    default: module.LogoCloud,
  })),
);
const WorldMap = lazy(() =>
  import("@/components/ui/world-map").then((module) => ({
    default: module.WorldMap,
  })),
);
const DataHero = lazy(() =>
  import("@/components/ui/data-hero").then((module) => ({
    default: module.DataHero,
  })),
);
const Feature197 = lazy(() =>
  import("@/components/ui/accordion-feature-section").then((module) => ({
    default: module.Feature197,
  })),
);
const Testimonials = lazy(() =>
  import("@/components/ui/testimonials").then((module) => ({
    default: module.Testimonials,
  })),
);

const Index = () => {
  const projects = [
    {
      title: "Suirify",
      description:
        "Sovereign identity protocol on Sui that enables users to verify identity attributes without exposing sensitive personal data.",
      tech: ["Sui Move", "TypeScript", "Zero-Knowledge Proofs", "Nautilus Key"],
      github: "#",
      live: "https://testnet.suirify.com/",
      status: "Active",
    },
    {
      title: "SuiSense (In Development)",
      description:
        "AI interpretation layer for Sui that translates raw transaction and smart contract execution data into clear, human-readable explanations.",
      tech: ["Sui Blockchain", "Sui Move", "Python", "LLMs", "Execution Data"],
      github: "#",
      live: "#",
      status: "In Development",
    },
    {
      title: "HaloAI Agent",
      description:
        "AI-driven WhatsApp copilot for MSMEs enabling conversational order management, automated customer support, and CRM workflows across messaging platforms.",
      tech: [
        "FastAPI",
        "Python",
        "LLMs (Llama 3)",
        "Twilio WhatsApp",
        "PostgreSQL",
      ],
      github: "#",
      live: "https://halo-agent.onrender.com/",
      status: "Prototype",
    },
    {
      title: "Tenax",
      description:
        "AI execution and accountability agent that converts goals into measurable daily actions through behavioral tracking and feedback loops.",
      tech: [
        "Python",
        "LLMs (Llama 3, Gemini, OpenAI)",
        "Opik",
        "React",
        "Supabase",
      ],
      github: "#",
      live: "#",
      status: "Prototype",
    },
    {
      title: "Solar Charger Controller (Simulation)",
      description:
        "Simulation of a solar charge controller focused on efficient battery charging and power regulation using control logic principles.",
      tech: ["MATLAB", "Simulink", "C++"],
      github: "#",
      live: "#",
      status: "Simulation",
    },
    {
      title: "Flux (In Development)",
      description:
        "Product launch operating system that helps startups and creators plan, schedule, and track rollouts from pre-launch to execution.",
      tech: ["Next.js", "TypeScript", "Node.js", "Tailwind CSS"],
      github: "#",
      live: "https://flux.base44.app/",
      status: "Live",
    },
  ];

  const experience = [
    {
      role: "Frontend Engineer",
      company: "Talenxify (ATC Africa)",
      location: "Remote",
      period: "Nov 2025 - Present",
      description:
        "Contributed to core platform infrastructure as part of the full-stack engineering team. Built and maintained React and Next.js front-end features, integrated backend APIs for real-time data flow, and improved performance, onboarding, and overall UX while aligning with fast startup timelines.",
    },
    {
      role: "Team Lead & Full-Stack Developer",
      company: "Sui On Campus (Team Suirify)",
      location: "Minna, NG",
      period: "Oct 2025 - Present",
      description:
        "Designed and implemented highly interactive web interfaces, increasing engagement by 30%. Led UI structure and content presentation, improved scalability with reusable components, and collaborated cross-functionally to accelerate delivery by 20%.",
    },
    {
      role: "Frontend Developer & Protocol Team",
      company: "GDG Minna DevFest",
      location: "Minna, NG",
      period: "Nov 2025",
      description:
        "Built and deployed a responsive DevFest website with registration, agenda, and speaker profiles. Developed interactive schedule components, optimized accessibility and performance, and supported event operations and post-event reviews.",
    },
    {
      role: "Volunteer (Technology & STEM Programs)",
      company: "Next-Gen Innovators",
      location: "Minna, NG",
      period: "Jul 2018",
      description:
        "Delivered hands-on STEM programs introducing IoT, embedded systems, and coding fundamentals to 50+ students. Guided project-based learning and helped build a youth-focused innovation community.",
    },
  ];

  const expertiseGroups: { title: string; icon: LucideIcon; items: string[] }[] = [
    {
      title: "Programming & Systems",
      icon: Code2,
      items: [
        "Python",
        "Sui Move",
        "JavaScript (ES6+)",
        "TypeScript",
        "HTML5",
        "CSS3",
        "C/C++",
        "Blockchain & Web3",
      ],
    },
    {
      title: "Full-Stack Delivery",
      icon: Layers,
      items: [
        "React.js",
        "Next.js",
        "Node.js",
        "Express.js",
        "FastAPI",
        "Tailwind CSS",
        "Responsive UI Design",
        "RESTful API Integration",
      ],
    },
    {
      title: "DevOps & Automation",
      icon: ServerCog,
      items: [
        "System Integration",
        "Performance Optimization",
        "Database Mgmt (MongoDB)",
        "Database Mgmt (PostgreSQL)",
        "Supabase",
        "Git",
        "GitHub",
        "CI/CD Tooling",
        "Agile Delivery",
      ],
    },
    {
      title: "Intelligence & Emerging Tech",
      icon: Brain,
      items: [
        "Artificial Intelligence",
        "Machine Learning",
        "Large Language Models",
        "Conversational AI Systems",
        "Agentic AI Workflows",
        "Blockchain Integration",
        "Execution Agents",
        "Mechatronics Software",
      ],
    },
    {
      title: "Product Systems",
      icon: Sparkles,
      items: [
        "Problem Solving",
        "Software Architecture",
        "System Design Thinking",
        "Cross-Functional Collaboration",
        "Technical Documentation",
        "Embedded Programming",
      ],
    },
    {
      title: "Simulation & Engineering",
      icon: BarChart3,
      items: [
        "MATLAB",
        "Simulink",
        "IoT Systems & Automation",
        "Embedded Programming (C/C++)",
        "Performance Optimization",
      ],
    },
  ];

  const certifications = [
    "Sui Nigeria Developers Workshop (Certificate)",
    "Certificate in Full-Stack Development, Frontend Masters",
    "Meta AI Developer Academy Graduate",
    "RAIN MATLAB & Simulink Certified",
    "MathWorks IoT & Embedded Systems Training",
    "ESIRG DeepTech Computer Vision Program",
    "3MTT #HRJ #158c906a-8d53-4dbc-904c-3a7d4e9cf4a8",
  ];

  const education = {
    degree: "Bachelor of Engineering (BEng), Mechatronics Engineering",
    institution: "Federal University of Technology Minna",
    location: "Minna, NG",
    expected: "Expected Dec 2027",
  };

  const projectTimeline = projects.map((project) => ({
    title: project.title,
    content: (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Badge variant={project.status === "Live" ? "default" : "secondary"}>
            {project.status}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {project.tech.join(" - ")}
          </span>
        </div>
        <p className="text-sm text-muted-foreground max-w-2xl">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {project.github !== "#" && (
            <Button asChild variant="outline" size="sm">
              <a href={project.github} target="_blank" rel="noreferrer">
                Code <ArrowUpRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          )}
          {project.live !== "#" && (
            <Button asChild variant="outline" size="sm">
              <a href={project.live} target="_blank" rel="noreferrer">
                Live <ArrowUpRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    ),
  }));

  const experienceTimeline = experience.map((item) => ({
    title: item.period,
    content: (
      <div className="space-y-3">
        <div>
          <h4 className="text-xl font-semibold text-foreground">
            {item.role}
          </h4>
          <p className="text-sm text-muted-foreground">
            {item.company} - {item.location}
          </p>
        </div>
        <p className="text-sm text-muted-foreground max-w-2xl">
          {item.description}
        </p>
      </div>
    ),
  }));

  const techSlugs = [
    "typescript",
    "javascript",
    "dart",
    "openjdk",
    "react",
    "flutter",
    "android",
    "html5",
    "css3",
    "nodedotjs",
    "express",
    "nextdotjs",
    "prisma",
    "amazonwebservices",
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
    "visualstudio",
    "androidstudio",
    "sonarqube",
    "figma",
  ];

  const logos = [
    {
      src: "https://svgl.app/library/nvidia-wordmark-light.svg",
      alt: "Nvidia",
    },
    {
      src: "https://svgl.app/library/supabase_wordmark_light.svg",
      alt: "Supabase",
    },
    {
      src: "https://svgl.app/library/openai_wordmark_light.svg",
      alt: "OpenAI",
    },
    {
      src: "https://svgl.app/library/vercel_wordmark.svg",
      alt: "Vercel",
    },
    {
      src: "https://svgl.app/library/github_wordmark_light.svg",
      alt: "GitHub",
    },
    {
      src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg",
      alt: "Claude AI",
    },
    {
      src: "/aws-light.png",
      darkSrc: "/awsdark.png",
      alt: "AWS",
      height: 26,
      mdHeight: 32,
    },
    {
      src: "/opiklight.png",
      darkSrc: "/darkopik.png",
      alt: "Opik",
      height: 26,
      mdHeight: 32,
    },
    {
      src: "/suidark.png",
      darkSrc: "/sui.png",
      alt: "Sui",
      height: 24,
      mdHeight: 30,
    },
    {
      src: "/metadark.svg",
      darkSrc: "/meta.png",
      alt: "Meta",
      height: 22,
      mdHeight: 28,
    },
    {
      src: "/gemini dark.svg",
      darkSrc: "/gemini dark.png",
      alt: "Gemini",
      height: 24,
      mdHeight: 30,
    },
    {
      src: "/mongo.png",
      darkSrc: "/mongodark.png",
      alt: "MongoDB",
      height: 24,
      mdHeight: 30,
    },
    {
      src: "/matlab.png",
      darkSrc: "/darkmatlab.png",
      alt: "MATLAB",
      height: 24,
      mdHeight: 30,
    },
    {
      src: "/vscode.png",
      darkSrc: "/darkvscode.png",
      alt: "VS Code",
      height: 24,
      mdHeight: 30,
    },
    {
      src: "/yornwin.png",
      alt: "Yornwins Tech",
      height: 24,
      mdHeight: 30,
    },
  ];

  const worldMapRoutes: WorldMapRoute[] = [
    {
      start: { lat: 9.6152, lng: 6.5478 }, // Minna
      end: { lat: 51.5072, lng: -0.1276 }, // London
    },
    {
      start: { lat: 9.6152, lng: 6.5478 },
      end: { lat: 37.7749, lng: -122.4194 }, // San Francisco
    },
    {
      start: { lat: 9.6152, lng: 6.5478 },
      end: { lat: 1.3521, lng: 103.8198 }, // Singapore
    },
    {
      start: { lat: 6.5244, lng: 3.3792 }, // Lagos
      end: { lat: 48.8566, lng: 2.3522 }, // Paris
    },
    {
      start: { lat: 33.738, lng: -84.3826 }, // Atlanta
      end: { lat: 28.6139, lng: 77.209 }, // New Delhi
    },
  ];

  const faqItems = [
    {
      id: 1,
      title: "What kinds of problems do you enjoy working on the most?",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
      description:
        "I love building products and systems where automation reduces friction and tightens execution. Anything that requires thinking about how pieces connect, how users feel it, and how it scales over time keeps me motivated.",
    },
    {
      id: 2,
      title: "How do you approach building a project from idea to execution?",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
      description:
        "I ground every build in the problem and constraints, then break the idea into testable components. Ship something usable early, validate assumptions, and keep iterating to balance correctness, learning, and momentum.",
    },
    {
      id: 3,
      title: "What technologies do you work with, and how do you choose them?",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      description:
        "Stacks depend on the problem. I lean on proven tools for reliability but reach for new tech when it offers clear advantages. Maintainability, performance, and alignment with the goal always guide the choice.",
    },
    {
      id: 4,
      title: "What is it like to collaborate with you?",
      image:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
      description:
        "I'm adaptable—productive solo but energized by collaboration. Expect clear communication, shared ownership, and thoughtful contributions to design and build discussions while executing reliably.",
    },
    {
      id: 5,
      title: "What opportunities are you currently open to?",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
      description:
        "I'm open to internships, freelance or contract work, startup collaborations, and full-time roles—anywhere I can build real systems, keep learning, and add meaningful value.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Suspense fallback={<div className="min-h-[70vh] bg-background" />}>
        <DataHero />
      </Suspense>

      <section
        id="about"
        className="relative overflow-hidden py-24 sm:py-28"
      >
        <Suspense fallback={null}>
          <AnimatedGridPattern
            numSquares={30}
            maxOpacity={0.08}
            duration={3}
            repeatDelay={1}
            className="[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
          />
        </Suspense>
        <div className="container relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <Badge variant="outline" className="w-fit">
              Full Stack and AI Developer
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Building scalable systems with engineering rigor.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              I am a full-stack and AI developer with a Mechatronics engineering
              foundation, shipping production-ready systems across web, AI, and
              blockchain environments. From Sui Move protocols to React/Next.js,
              Node.js, and Python platforms, I integrate APIs, optimize
              performance, and deploy intelligent workflows that keep teams
              moving fast with trustworthy software.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="sm">
                <a href="/benedictResume.pdf" download>
                  <FileDown className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href="mailto:benedictisaac258@gmail.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </a>
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="ghost" size="sm">
                <a href="https://github.com/Benedict258/" target="_blank" rel="noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <a href="https://medium.com/@benedictisaac258" target="_blank" rel="noreferrer">
                  <span className="mr-2 flex h-4 w-4 items-center justify-center">
                    <img src="/medium.png" alt="Medium logo" className="h-4 w-4" />
                  </span>
                  Medium
                </a>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <a href="https://www.linkedin.com/in/benedict-isaac-0b60a732b/" target="_blank" rel="noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </a>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <a href="https://x.com/DevChronicles_" target="_blank" rel="noreferrer">
                  <Twitter className="mr-2 h-4 w-4" />
                  X
                </a>
              </Button>
            </div>
          </div>
          <div className="rounded-2xl border bg-background/70 backdrop-blur-xl p-8 shadow-xl">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/pic1.jfif" alt="Benedict Isaac" />
                <AvatarFallback>BI</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xl font-semibold">Benedict Isaac</p>
                <p className="text-sm text-muted-foreground">
                  Minna, NG and Remote
                </p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl border px-4 py-3">
                <p className="text-2xl font-semibold">8+</p>
                <p className="text-xs text-muted-foreground">
                  Tools mastered
                </p>
              </div>
              <div className="rounded-xl border px-4 py-3">
                <p className="text-2xl font-semibold">20+</p>
                <p className="text-xs text-muted-foreground">
                  Projects shipped
                </p>
              </div>
              <div className="rounded-xl border px-4 py-3">
                <p className="text-2xl font-semibold">5+</p>
                <p className="text-xs text-muted-foreground">Teams</p>
              </div>
              <div className="rounded-xl border px-4 py-3">
                <p className="text-2xl font-semibold">100%</p>
                <p className="text-xs text-muted-foreground">Focus</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="relative overflow-hidden py-24 sm:py-28">
        <Suspense fallback={null}>
          <AnimatedGridPattern
            numSquares={30}
            maxOpacity={0.08}
            duration={3}
            repeatDelay={1}
            className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)] inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
          />
        </Suspense>
        <div className="container relative z-10 space-y-10">
          <div className="space-y-3 text-center">
            <Badge variant="outline" className="mx-auto w-fit">
              Expertise
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Skills that power my builds.
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              The stacks, methodologies, and focus areas I rely on to ship
              reliable products across web, AI, blockchain, and mechatronics
              environments.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {expertiseGroups.map((group) => {
              const Icon = group.icon;
              return (
                <div
                  key={group.title}
                  className="rounded-2xl border bg-background/85 p-6 shadow-xl backdrop-blur"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-emerald-700/10 p-3 text-emerald-700 dark:bg-primary/10 dark:text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold">{group.title}</h3>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-border/60 bg-background/60 px-3 py-1 text-sm font-medium text-foreground/80"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="tech" className="py-24">
        <div className="container grid gap-10 lg:grid-cols-2 items-center">
          <div className="space-y-4">
            <Badge variant="outline" className="w-fit">
              Tech Stack
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Tools I trust for modern delivery.
            </h2>
            <p className="text-muted-foreground text-lg">
              From frontend craft to backend reliability, these tools help me
              ship fast and maintain quality.
            </p>
          </div>
          <div className="relative rounded-2xl border bg-background/70 p-8 shadow-xl">
            <IconCloud iconSlugs={techSlugs} />
          </div>
        </div>
      </section>

      <section id="technologies" className="py-20">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              Technologies I ship with
            </h2>
            <p className="text-muted-foreground">
              Trusted platforms and services I build on.
            </p>
          </div>
          <Suspense
            fallback={
              <div className="h-32 rounded-3xl border border-dashed border-border/60" />
            }
          >
            <PartnerLogoCloud logos={logos} />
          </Suspense>
        </div>
      </section>

      <section id="expertise" className="py-24 bg-muted/20">
        <div className="container grid gap-10 lg:grid-cols-2 items-center">
          <div className="space-y-4">
            <Badge variant="outline" className="w-fit">
              Global Expertise
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Building with a global perspective.
            </h2>
            <p className="text-muted-foreground text-lg">
              I collaborate across time zones, delivering products that scale and
              perform globally.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline" size="sm">
                <a href="mailto:benedictisaac258@gmail.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Get in touch
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href="https://wa.link/z9yfhb" target="_blank" rel="noreferrer">
                  <Phone className="mr-2 h-4 w-4" />
                  Schedule call
                </a>
              </Button>
            </div>
          </div>
          <Suspense
            fallback={
              <div className="h-[320px] rounded-3xl border border-dashed border-border/60" />
            }
          >
            <WorldMap
              dots={worldMapRoutes}
              lineColor="#34d399"
              className="shadow-xl"
            />
          </Suspense>
        </div>
      </section>

      <section id="projects" className="bg-background">
        <Suspense
          fallback={
            <div className="container py-16 text-center text-muted-foreground">
              Loading projects...
            </div>
          }
        >
          <Timeline
            title="Projects"
            subtitle="Selected work across AI, blockchain, and web platforms."
            data={projectTimeline}
          />
        </Suspense>
      </section>

      <section id="communities" className="py-24">
        <div className="container space-y-6 text-center">
          <Badge variant="outline" className="mx-auto w-fit">
            Communities & Clubs
          </Badge>
          <h2 className="text-3xl font-bold md:text-4xl">
            Collaborating across learning clubs and builders communities.
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            Active member of programs that keep me close to emerging tooling,
            hackathons, mentorship, and student founders across Africa and beyond.
          </p>
        </div>
        <div className="container mt-10">
          <Suspense
            fallback={
              <div className="h-24 rounded-3xl border border-dashed border-border/60" />
            }
          >
            <CommunitiesLogoCloud className="rounded-3xl border border-border/60" />
          </Suspense>
        </div>
      </section>

      <section id="experience" className="bg-background">
        <Suspense
          fallback={
            <div className="container py-16 text-center text-muted-foreground">
              Loading experience...
            </div>
          }
        >
          <Timeline
            title="Experience"
            subtitle="Roles and collaborations that shaped my delivery style."
            data={experienceTimeline}
          />
        </Suspense>
      </section>

      <Suspense
        fallback={
          <div className="container py-16 text-center text-muted-foreground">
            Loading testimonials...
          </div>
        }
      >
        <Testimonials />
      </Suspense>

      <section id="contact" className="py-24">
        <div className="container space-y-10">
          <CallToAction />
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Button asChild variant="outline" size="sm">
              <a href="mailto:benedictisaac258@gmail.com">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href="https://wa.link/z9yfhb" target="_blank" rel="noreferrer">
                <Phone className="mr-2 h-4 w-4" />
                Call
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-background">
        <div className="container text-center mb-6">
          <Badge variant="outline" className="w-fit mx-auto">
            FAQs
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mt-4">
            Answers to common questions
          </h2>
        </div>
        <Suspense
          fallback={
            <div className="container py-10 text-center text-muted-foreground">
              Loading FAQs...
            </div>
          }
        >
          <Feature197 features={faqItems} />
        </Suspense>
      </section>
      <Footer
        logo={
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
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
          { href: "#about", label: "About" },
          { href: "#projects", label: "Projects" },
          { href: "#experience", label: "Experience" },
          { href: "#contact", label: "Contact" },
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

export default Index;
