// Post-build prerender. Serves dist/ locally, opens each public route in headless Chrome,
// and writes the rendered HTML next to the SPA shell so crawlers and link previews get real
// content, titles and OG tags. If no Chrome is available the build still succeeds and the
// site works as a normal SPA.
import { promises as fs } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const distDir = path.join(root, "dist");
const PORT = 4789;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".pdf": "application/pdf",
  ".xml": "application/xml",
};

const startServer = () =>
  new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      const urlPath = decodeURIComponent((req.url ?? "/").split("?")[0]);
      let file = path.join(distDir, urlPath);
      if (!file.startsWith(distDir)) {
        res.writeHead(403).end();
        return;
      }
      try {
        const stat = await fs.stat(file);
        if (stat.isDirectory()) file = path.join(file, "index.html");
        const body = await fs.readFile(file);
        res.writeHead(200, { "Content-Type": MIME[path.extname(file)] ?? "application/octet-stream" }).end(body);
      } catch {
        // SPA fallback
        const body = await fs.readFile(path.join(distDir, "app-shell.html"));
        res.writeHead(200, { "Content-Type": MIME[".html"] }).end(body);
      }
    });
    server.listen(PORT, "127.0.0.1", () => resolve(server));
  });

const localChromePaths = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);

const findChrome = async () => {
  // On Vercel there is no system Chrome, so use the bundled serverless build.
  if (process.env.VERCEL) {
    try {
      const chromium = (await import("@sparticuz/chromium")).default;
      return { executablePath: await chromium.executablePath(), args: chromium.args };
    } catch (err) {
      console.warn(`prerender: could not load @sparticuz/chromium (${err.message})`);
    }
  }
  for (const candidate of localChromePaths) {
    try {
      await fs.access(candidate);
      return { executablePath: candidate, args: ["--no-sandbox"] };
    } catch {
      // try the next one
    }
  }
  return null;
};

const main = async () => {
  try {
    await fs.access(path.join(distDir, "index.html"));
  } catch {
    console.warn("prerender: dist/index.html not found, skipping");
    return;
  }

  // Keep an untouched copy of the SPA shell. Routes without a prerendered file (pricing, admin,
  // invoices, 404s) are rewritten to it, so they never flash home-page content.
  await fs.copyFile(path.join(distDir, "index.html"), path.join(distDir, "app-shell.html"));

  const chrome = await findChrome();
  if (!chrome) {
    console.warn("prerender: no Chrome found, skipping. The site will be served as a client-rendered SPA.");
    return;
  }

  const puppeteer = (await import("puppeteer-core")).default;
  const server = await startServer();
  const browser = await puppeteer.launch({
    executablePath: chrome.executablePath,
    args: chrome.args,
    headless: "new",
  });

  try {
    const base = `http://127.0.0.1:${PORT}`;
    const visit = async (route) => {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 900 });
      await page.goto(`${base}${route}`, { waitUntil: "networkidle0", timeout: 60000 });
      await page.waitForSelector("main h1", { timeout: 20000 });
      // Let effects (document title, meta tags) and entry animations settle.
      await new Promise((r) => setTimeout(r, 1500));
      // Heavy decorative content (the world map is a large inline image) is left to the client.
      await page.evaluate(() => document.querySelectorAll("[data-no-prerender]").forEach((el) => el.replaceChildren()));
      const html = await page.content();
      const links = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")));
      await page.close();
      return { html, links };
    };

    // The home page links to the featured items; /projects links to every project.
    const home = await visit("/");
    const projectsPage = await visit("/projects");
    const discovered = new Set(["/", "/projects"]);
    for (const href of [...home.links, ...projectsPage.links]) {
      if (href && (href.startsWith("/project/") || href.startsWith("/certifications/"))) discovered.add(href.split("#")[0]);
    }

    const pages = new Map([
      ["/", home.html],
      ["/projects", projectsPage.html],
    ]);
    for (const route of discovered) {
      if (pages.has(route)) continue;
      pages.set(route, (await visit(route)).html);
    }

    for (const [route, html] of pages) {
      const out = route === "/" ? path.join(distDir, "index.html") : path.join(distDir, route, "index.html");
      await fs.mkdir(path.dirname(out), { recursive: true });
      await fs.writeFile(out, `<!doctype html>\n${html.replace(/^<!DOCTYPE html>/i, "")}`);
      console.log(`prerender: wrote ${route}`);
    }
  } finally {
    await browser.close();
    server.close();
  }
};

main().catch((err) => {
  // Never fail the deploy because of prerendering.
  console.warn(`prerender: failed (${err.message}). Continuing with the SPA build.`);
});
