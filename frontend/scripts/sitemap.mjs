import { promises as fs } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const distDir = path.join(root, "dist");
const SITE_URL = "https://benedictisaac.dev";

// Slugs are read from the data files so the sitemap never drifts from the site.
const slugsFrom = async (file) => {
  const source = await fs.readFile(path.join(root, "src", "data", file), "utf8");
  return [...source.matchAll(/^\s*slug:\s*"([^"]+)"/gm)].map((m) => m[1]);
};

const projectSlugs = await slugsFrom("projects.ts");
const certSlugs = await slugsFrom("certifications.ts");

const paths = [
  "/",
  "/projects",
  ...projectSlugs.map((s) => `/project/${s}`),
  ...certSlugs.map((s) => `/certifications/${s}`),
];

const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map((p) => `  <url>\n    <loc>${SITE_URL}${p === "/" ? "" : p}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
  .join("\n")}
</urlset>
`;

await fs.mkdir(distDir, { recursive: true });
await fs.writeFile(path.join(distDir, "sitemap.xml"), xml);
console.log(`Wrote sitemap.xml with ${paths.length} URLs`);
