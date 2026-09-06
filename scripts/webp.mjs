import sharp from "sharp";
import { readdir, mkdir, copyFile } from "node:fs/promises";
import { join, extname, basename } from "node:path";

const [src, out] = process.argv.slice(2);
if (!src || !out) {
  console.error("usage: bun scripts/webp.mjs <srcDir> <outDir>");
  process.exit(1);
}
await mkdir(out, { recursive: true });
for (const name of await readdir(src)) {
  const ext = extname(name).toLowerCase();
  const from = join(src, name);
  if ([".png", ".jpg", ".jpeg"].includes(ext)) {
    const to = join(out, `${basename(name, ext)}.webp`);
    await sharp(from).webp({ quality: 88 }).toFile(to);
    console.log(`${name} -> ${basename(to)}`);
  } else if ([".mov", ".mp4", ".webm", ".webp", ".gif", ".svg"].includes(ext)) {
    await copyFile(from, join(out, name));
    console.log(`${name} copied`);
  }
}
