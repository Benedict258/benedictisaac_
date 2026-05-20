export type BlogEntry = {
  slug: string;
  title: string;
  titleStyle?: { bold?: boolean; italic?: boolean; underline?: boolean };
  image?: string;
  excerpt: string;
  content?: string;
  mediumUrl?: string;
  linkedinUrl?: string;
  publishedAt?: string;
};

const blogs: BlogEntry[] = [
  {
    slug: "making-sense-of-agentic-ai",
    title: "Making Sense of Agentic AI Workflows",
    titleStyle: { bold: true },
    image: "/blog-agentic.png",
    excerpt:
      "An introduction to agentic AI: how autonomous agents coordinate to solve complex software tasks and practical patterns for system design.",
    content:
      "Full article content goes here. You can paste a long-form article body or a link to Medium/LinkedIn. Use the Admin area to edit this content.",
    mediumUrl: "https://medium.com/@benedictisaac258/example-agentic-ai",
    linkedinUrl: "https://www.linkedin.com/pulse/example-agentic-ai/",
    publishedAt: "2025-11-01",
  },
  {
    slug: "deploying-to-sui-mainnet",
    title: "Deploying Smart Contracts on Sui: A Practical Guide",
    titleStyle: { italic: true },
    image: "/blog-sui.png",
    excerpt:
      "Step-by-step walkthrough for deploying Move contracts on Sui, testing, and integrating with a TypeScript frontend.",
    content: "Full guide content...",
    mediumUrl: "https://medium.com/@benedictisaac258/deploying-to-sui",
    publishedAt: "2025-09-12",
  },
];

export default blogs;
