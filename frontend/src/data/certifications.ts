export type CertificationGroup = "primary" | "other";

export type Certification = {
  slug: string;
  title: string;
  issuer: string;
  /** Missing when the resumes give no date. */
  date?: string;
  /** Missing when no certificate image is available yet. */
  image?: string;
  credentialId?: string;
  verificationLink?: string;
  description?: string;
  relatedProject?: string;
  group: CertificationGroup;
};

// Names, issuers and dates follow the software and mechatronics resumes.
// TODO: images, credential IDs and descriptions for the entries marked below.
export const certifications: Certification[] = [
  {
    slug: "ai-backend-engineering",
    title: "AI Backend Engineering",
    issuer: "Mastering Backend",
    date: "June 2026",
    group: "primary",
    // TODO: credential ID, image, description
  },
  {
    slug: "kaggle-google-ai-agents-vibecoding",
    title: "5-Day Agentic AI Vibe Coding",
    issuer: "Google/ Kaggle",
    date: "June 2026",
    image: "/google-kaggle-aiagent.webp",
    credentialId: "", // TODO
    group: "primary",
    description:
      "Five-day intensive covering the full agent-development lifecycle through vibe coding — natural language as the primary build interface. Curriculum spanned agent tool integration and interoperability, context engineering (memory, sessions, and skills), agent quality and security testing, and taking agents from local prototype to production deployment. Completed the Kaggriculture capstone — building and deploying an autonomous agent to manage resources in a live farming-simulation challenge.",
  },
  {
    slug: "mit-intro-universal-ai",
    title: "Introduction to Universal AI",
    issuer: "MIT",
    date: "June 2026",
    group: "primary",
    // TODO: credential ID, image, description
  },
  {
    slug: "red-hat-openshift-ai",
    title: "Introduction to Red Hat OpenShift AI (AI262F)",
    issuer: "Red Hat",
    date: "May 2026",
    group: "primary",
    // TODO: credential ID, image, description
  },
  {
    slug: "red-hat-python",
    title: "Python Programming with Red Hat (AD141, Ver. 9.0)",
    issuer: "Red Hat",
    date: "April 2026",
    image: "/redhatpython.webp",
    group: "primary",
    description:
      "Certification validating core Python programming skills — data structures, control flow, functions, error handling, and file I/O — assessed through Red Hat's official specialist exam.",
  },
  {
    slug: "3mtt-deeptech-computer-vision",
    title: "3MTT DeepTech Computer Vision Program",
    issuer: "FMICDE, 3MTT, DSN, Google, DeepTech",
    date: "Jan 2026",
    image: "/3mtt-cv.webp",
    relatedProject: "esn-prism",
    group: "primary",
    description:
      "Deep-tech training in computer vision — image processing, object detection, and model deployment on constrained hardware — forming the technical foundation behind the ESN-PRISM edge-recognition project.",
  },
  {
    slug: "meta-ai-academy",
    title: "Meta AI Developer Academy Graduate",
    issuer: "Meta / RAIN",
    date: "Nov 2025",
    image: "/metaai.webp",
    credentialId: "CN:0295",
    group: "primary",
    description:
      "Intensive program on designing and building AI agents and agentic systems — covering agent architecture, orchestration, and practical development patterns — delivered by Meta in partnership with RAIN (Robotics and Artificial Intelligence Nigeria).",
  },
  {
    slug: "full-stack-mern",
    title: "Certificate in Full-Stack Development (MERN STACK)",
    issuer: "Power Learn Project",
    date: "Oct 2025",
    image: "/plpcert.webp",
    credentialId: "f2e5a82a-ff35-44f7-99d3-1dd1c70ed2dc",
    group: "primary",
    description:
      "Certification in full-stack web development with the MERN stack — MongoDB, Express.js, React, and Node.js — covering database design, API development, and deploying complete applications.",
  },
  {
    slug: "matlab-simulink-certified",
    title: "MATLAB & Simulink Certified",
    issuer: "MathWorks",
    group: "primary",
    // TODO: date, credential ID, image, description
  },

  // ---- Other certificates (already on the site; not on the resumes) ----
  {
    slug: "red-hat-openshift",
    title: "Red Hat Certified Specialist in OpenShift Administration",
    issuer: "Red Hat",
    date: "May 2026",
    image: "/redhatopenshift.webp",
    group: "other",
    description:
      "Certification covering administration of containerized applications on Red Hat OpenShift — cluster management, networking, storage, and deploying and scaling workloads in a Kubernetes-based environment.",
  },
  {
    slug: "sui-development-workshop",
    title: "Sui Development Workshop",
    issuer: "Sui Nigeria",
    date: "Oct 2025",
    image: "/suiminna.webp",
    group: "other",
    description:
      "Hands-on workshop on Sui blockchain development — Move programming fundamentals, Sui's object-centric data model, and building and deploying smart contracts on Sui.",
  },
  {
    slug: "devfest-gdg-minna",
    title: "DevFest",
    issuer: "GDG Minna",
    date: "Nov 2025",
    image: "/devfest.webp",
    group: "other",
    description:
      "Recognizes contribution to GDG Minna's DevFest as part of the Frontend Development & Protocol Team, building the event's registration, scheduling, and speaker platform under a live event deadline.",
  },
  {
    slug: "matlab-onramp",
    title: "MATLAB Onramp",
    issuer: "MathWorks",
    date: "Aug 2025",
    image: "/matlabonramp.webp",
    group: "other",
    description:
      "Foundational course covering MATLAB syntax, data analysis, and visualization — the base skills carried forward into later Simulink-based control systems and simulation work.",
  },
  {
    slug: "next-gen-innovators-service",
    title: "Certificate of Service",
    issuer: "Next-Gen Innovators",
    date: "Aug 2025",
    image: "/nextgen.webp",
    group: "other",
    description:
      "Recognizes volunteer service delivering project-based STEM workshops on IoT, embedded systems, and coding fundamentals to 50+ students.",
  },
];

export const primaryCertifications = certifications.filter((c) => c.group === "primary");
export const otherCertifications = certifications.filter((c) => c.group === "other");

export default certifications;
