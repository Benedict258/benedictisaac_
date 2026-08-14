export type Certification = {
  slug: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialId?: string;
  verificationLink?: string;
  description?: string;
  relatedProject?: string;
};

export const certifications: Certification[] = [
  {
    slug: "red-hat-python",
    title: "Red Hat Certified Specialist in Python Programming",
    issuer: "Red Hat",
    date: "May 2026",
    image: "/redhatpython.png",
    description:
      "Certification validating core Python programming skills — data structures, control flow, functions, error handling, and file I/O — assessed through Red Hat's official specialist exam.",
  },
  {
    slug: "red-hat-openshift",
    title: "Red Hat Certified Specialist in OpenShift Administration",
    issuer: "Red Hat",
    date: "May 2026",
    image: "/redhatopenshift.png",
    description:
      "Certification covering administration of containerized applications on Red Hat OpenShift — cluster management, networking, storage, and deploying and scaling workloads in a Kubernetes-based environment.",
  },
  {
    slug: "meta-ai-academy",
    title: "AI Agents and Agentic AI Systems Development",
    issuer: "Meta (via RAIN — Robotics and Artificial Intelligence Nigeria)",
    date: "Dec 2025",
    image: "/metaai.png",
    credentialId: "CN:0295",
    description:
      "Intensive program on designing and building AI agents and agentic systems — covering agent architecture, orchestration, and practical development patterns — delivered by Meta in partnership with RAIN.",
  },
  {
    slug: "sui-development-workshop",
    title: "Sui Development Workshop",
    issuer: "Sui Nigeria",
    date: "Oct 2025",
    image: "/suiminna.png",
    description:
      "Hands-on workshop on Sui blockchain development — Move programming fundamentals, Sui's object-centric data model, and building and deploying smart contracts on Sui.",
  },
  {
    slug: "devfest-gdg-minna",
    title: "DevFest",
    issuer: "GDG Minna",
    date: "Nov 2025",
    image: "/devfest.png",
    description:
      "Recognizes contribution to GDG Minna's DevFest as part of the Frontend Development & Protocol Team, building the event's registration, scheduling, and speaker platform under a live event deadline.",
  },
  {
    slug: "matlab-onramp",
    title: "MATLAB Onramp",
    issuer: "MathWorks",
    date: "Aug 2025",
    image: "/matlabonramp.png",
    description:
      "Foundational course covering MATLAB syntax, data analysis, and visualization — the base skills carried forward into later Simulink-based control systems and simulation work.",
  },
  {
    slug: "next-gen-innovators-service",
    title: "Certificate of Service",
    issuer: "Next-Gen Innovators",
    date: "Aug 2025",
    image: "/nextgen.png",
    description:
      "Recognizes volunteer service delivering project-based STEM workshops on IoT, embedded systems, and coding fundamentals to 50+ students.",
  },
  {
    slug: "full-stack-mern",
    title: "Full-Stack Development (MERN Stack)",
    issuer: "Power Learn Project",
    date: "Nov 2025",
    image: "/plpcert.png",
    credentialId: "f2e5a82a-ff35-44f7-99d3-1dd1c70ed2dc",
    description:
      "Certification in full-stack web development with the MERN stack — MongoDB, Express.js, React, and Node.js — covering database design, API development, and deploying complete applications.",
  },
  {
    slug: "3mtt-deeptech-computer-vision",
    title: "3MTT DeepTech Computer Vision Program",
    issuer: "3MTT",
    date: "Jan 2026",
    image: "/3mtt-cv.png",
    relatedProject: "ess",
    description:
      "Deep-tech training in computer vision — image processing, object detection, and model deployment on constrained hardware — forming the technical foundation behind the ESS edge-recognition project.",
  },
  {
    slug: "kaggle-google-ai-agents-vibecoding",
    title: "5-Day AI Agents: Intensive Vibe Coding Course",
    issuer: "Google & Kaggle",
    date: "June 2026",
    image: "/google-kaggle-aiagent.png",
    credentialId: "",
    description:
      "Five-day intensive covering the full agent-development lifecycle through vibe coding — natural language as the primary build interface. Curriculum spanned agent tool integration and interoperability, context engineering (memory, sessions, and skills), agent quality and security testing, and taking agents from local prototype to production deployment. Completed the Kaggriculture capstone — building and deploying an autonomous agent to manage resources in a live farming-simulation challenge.",
  },
];

export default certifications;
