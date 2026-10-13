export type FaqItem = {
  id: number;
  title: string;
  image: string;
  description: string;
};

export const faqItems: FaqItem[] = [
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
    image: "/lap.webp",
    description:
      "I ground every build in the problem and constraints, then break the idea into testable components. Ship something usable early, validate assumptions, and keep iterating to balance correctness, learning, and momentum.",
  },
  {
    id: 3,
    title: "What technologies do you work with, and how do you choose them?",
    image: "/stacks.webp",
    description:
      "Stacks depend on the problem. I lean on proven tools for reliability but reach for new tech when it offers clear advantages. Maintainability, performance, and alignment with the goal always guide the choice.",
  },
  {
    id: 4,
    title: "What is it like to collaborate with you?",
    image: "/work.webp",
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
