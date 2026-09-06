import sharp from "sharp";
import { readdir } from "node:fs/promises";
import { join, extname } from "node:path";

const [dir, max = "1800"] = process.argv.slice(2);
const limit = Number(max);
for (const name of await readdir(dir)) {
  if (extname(name).toLowerCase() !== ".webp") continue;
  const file = join(dir, name);
  const meta = await sharp(file).metadata();
  if (!meta.width || meta.width <= limit) continue;
  const buf = await sharp(file).resize({ width: limit }).webp({ quality: 85 }).toBuffer();
  await Bun.write(file, buf);
  console.log(`${name}: ${meta.width} -> ${limit}`);
}
