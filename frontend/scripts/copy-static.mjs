import { promises as fs } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const publicDir = path.join(root, "public");
const distDir = path.join(root, "dist");

const files = ["_redirects", "static.json"];

async function copyIfExists(file) {
  const from = path.join(publicDir, file);
  const to = path.join(distDir, file);
  try {
    await fs.mkdir(distDir, { recursive: true });
    await fs.copyFile(from, to);
    console.log(`Copied ${file} -> dist`);
  } catch (err) {
    if (err?.code === "ENOENT") {
      // Skip if the file doesn't exist in public/
      return;
    }
    throw err;
  }
}

await Promise.all(files.map(copyIfExists));
