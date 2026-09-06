import sharp from "sharp";
import { readdir, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, extname, basename } from "node:path";

const [dir] = process.argv.slice(2);
const tmp = join(dir, ".posters-tmp");
await mkdir(tmp, { recursive: true });
for (const name of await readdir(dir)) {
  if (![".mp4", ".webm", ".mov"].includes(extname(name).toLowerCase())) continue;
  const out = join(dir, `${basename(name, extname(name))}-poster.webp`);
  if (existsSync(out)) continue;
  const png = join(tmp, `${basename(name, extname(name))}.png`);
  const proc = Bun.spawnSync(["ffmpeg", "-y", "-loglevel", "error", "-i", join(dir, name), "-frames:v", "1", png]);
  if (proc.exitCode !== 0) {
    console.error(`ffmpeg failed for ${name}`);
    continue;
  }
  await sharp(png).webp({ quality: 82 }).toFile(out);
  console.log(`${name} -> ${basename(out)}`);
}
await rm(tmp, { recursive: true, force: true });
