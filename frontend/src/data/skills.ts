export type SkillDomain = "software" | "mechatronics" | "both";

export type Skill = { name: string; domain: SkillDomain };

export type SkillGroup = {
  title: string;
  /** Name of a lucide icon, resolved in the component. */
  icon: "code" | "layers" | "brain" | "server" | "cpu" | "users";
  skills: Skill[];
};

const s = (name: string): Skill => ({ name, domain: "software" });
const m = (name: string): Skill => ({ name, domain: "mechatronics" });
const b = (name: string): Skill => ({ name, domain: "both" });

// Source: the software and mechatronics resumes. Skills that appear in both
// resumes are listed once and tagged "both".
export const skillGroups: SkillGroup[] = [
  {
    title: "Core Technical Expertise",
    icon: "layers",
    skills: [
      s("Full-Stack Development"),
      s("RESTful API Integration"),
      s("Responsive UI Design"),
      s("Performance Optimization"),
      s("Database Management"),
      s("System Integration"),
      s("Decentralized Application (dApp) Architecture"),
    ],
  },
  {
    title: "Languages, Frameworks & Tools",
    icon: "code",
    skills: [
      s("JavaScript (ES6+)"),
      s("TypeScript"),
      b("Python"),
      s("React.js"),
      s("Next.js"),
      s("Node.js"),
      s("Express.js"),
      b("FastAPI"),
      s("Tailwind CSS"),
      s("Sui Move"),
      s("Rust"),
      b("C/C++"),
      b("Git"),
      b("GitHub"),
      s("Supabase"),
      b("PostgreSQL"),
      s("Firebase"),
    ],
  },
  {
    title: "AI & Computer Vision",
    icon: "brain",
    skills: [
      b("Agentic AI Workflows"),
      b("LLM Orchestration (Llama 3.3, Gemini, Groq, Claude)"),
      b("Prompt Engineering"),
      m("Computer Vision"),
      m("Edge AI Deployment"),
      m("OpenCV"),
    ],
  },
  {
    title: "AI Tooling & Observability",
    icon: "server",
    skills: [
      s("Google ADK"),
      s("Agentic Frameworks"),
      s("Multi-Source Data Analysis"),
      s("LLM Observability & Instrumentation (Opik)"),
    ],
  },
  {
    title: "Embedded & Robotics Systems",
    icon: "cpu",
    skills: [
      m("IoT Systems & Automation"),
      m("Embedded Programming (C/C++)"),
      m("Control Systems Logic"),
      m("MATLAB"),
      m("Simulink"),
      m("Proteus"),
    ],
  },
  {
    title: "Core Competencies",
    icon: "users",
    skills: [
      s("Problem Solving & Debugging"),
      s("Software Architecture & Optimization"),
      b("System Design Thinking"),
      b("Technical Team Leadership"),
      b("Open-Source SDK Design"),
      b("Technical Documentation"),
    ],
  },
];

export const skillMatchesView = (skill: Skill, view: "all" | "software" | "mechatronics") =>
  view === "all" || skill.domain === "both" || skill.domain === view;

export default skillGroups;
