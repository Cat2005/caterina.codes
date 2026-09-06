import sharp from "sharp";
import { access, mkdir } from "node:fs/promises";
import { join } from "node:path";

const [src, out] = process.argv.slice(2);
if (!src || !out) {
  console.error("usage: bun scripts/cursors.mjs <srcDir> <outDir>");
  process.exit(1);
}
const names = ["red", "blue", "green", "pink", "purple"];
const height = 128;
const white = 235;
await mkdir(out, { recursive: true });

async function exists(file) {
  return access(file).then(() => true, () => false);
}

function isBackground(data, i) {
  return data[i + 3] === 0 || (data[i] >= white && data[i + 1] >= white && data[i + 2] >= white);
}

async function removeWhite(file) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const seen = new Uint8Array(width * height);
  const stack = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const p = y * width + x;
    if (seen[p] || !isBackground(data, p * 4)) return;
    seen[p] = 1;
    stack.push(p);
  };
  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }
  while (stack.length) {
    const p = stack.pop();
    const x = p % width;
    const y = (p - x) / width;
    data[p * 4 + 3] = 0;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }
  return sharp(data, { raw: { width, height, channels: 4 } }).png().toBuffer();
}

async function source(name) {
  const big = join(src, `${name}-big.png`);
  if (await exists(big)) return removeWhite(big);
  return sharp(join(src, `cursor-${name}.png`)).png().toBuffer();
}

for (const name of names) {
  const input = await sharp(await source(name)).trim().png().toBuffer();
  await sharp(input).resize({ height }).png().toFile(join(out, `${name}.png`));
  console.log(`${name}.png`);
}
