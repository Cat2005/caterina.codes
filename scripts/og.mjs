// Builds src/app/opengraph-image.png: the clay board on the dot grid.
// Layout, rotations and grid phase were fitted against the Figma export by
// segmenting it and matching each clay by pixel colour per candidate angle.
//   bun scripts/og.mjs
import sharp from "sharp";
import { statSync } from "node:fs";

const W = 1200;
const H = 630;
const BG = "#fdf7f4";
const DOT = "#e6dada";

// Measured off the export: 86.1px pitch, 4.7px radius, first centre at 85.6/3.4.
const PITCH = 86;
const DOT_R = 4.7;
const DOT_OX = 42.6;
const DOT_OY = -39.6;

// `r` is degrees clockwise about the item's centre.
const GRID = [
  { n: "spotify", x: 59, y: 71, w: 268, r: 0 },
  { n: "cherries", x: 484, y: 101, w: 232, r: 19.5 },
  { n: "acropolis", x: 815, y: 86, w: 261, r: -5.5 },
  { n: "laptop", x: 172, y: 322, w: 352, r: 18 },
  { n: "dumbbell", x: 780, y: 394, w: 268, r: -0.5 },
];

// Most clay renders sit on near-white rather than transparency. Flood fill from
// the border only, so white *inside* the art (laptop screen, building windows)
// survives.
async function cutout(file, tol = 14) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const near = (i) =>
    data[i + 3] === 0 || (255 - data[i] <= tol && 255 - data[i + 1] <= tol && 255 - data[i + 2] <= tol);
  const outside = new Uint8Array(w * h);
  const stack = [];
  for (let x = 0; x < w; x++) stack.push(x, 0, x, h - 1);
  for (let y = 0; y < h; y++) stack.push(0, y, w - 1, y);
  while (stack.length) {
    const y = stack.pop();
    const x = stack.pop();
    if (x < 0 || y < 0 || x >= w || y >= h) continue;
    const p = y * w + x;
    if (outside[p] || !near(p * 4)) continue;
    outside[p] = 1;
    stack.push(x + 1, y, x - 1, y, x, y + 1, x, y - 1);
  }
  const mask = Buffer.alloc(w * h);
  for (let p = 0; p < w * h; p++) mask[p] = outside[p] ? 0 : 255;
  // sharp widens a 1-channel raw buffer to 3 on blur, so step by the real count
  const soft = await sharp(mask, { raw: { width: w, height: h, channels: 1 } })
    .blur(0.7)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const ch = soft.info.channels;
  for (let p = 0; p < w * h; p++) data[p * 4 + 3] = Math.min(data[p * 4 + 3], soft.data[p * ch]);
  return sharp(data, { raw: { width: w, height: h, channels: 4 } }).png().toBuffer();
}

const board = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="${BG}"/>
    <defs><pattern id="d" x="${DOT_OX}" y="${DOT_OY}" width="${PITCH}" height="${PITCH}" patternUnits="userSpaceOnUse">
      <circle cx="${PITCH / 2}" cy="${PITCH / 2}" r="${DOT_R}" fill="${DOT}"/></pattern></defs>
    <rect width="${W}" height="${H}" fill="url(#d)"/></svg>`,
);

const layers = [];
for (const g of GRID) {
  const flat = await sharp(await cutout(`public/clay/${g.n}.webp`)).resize({ width: g.w }).png().toBuffer();
  const before = await sharp(flat).metadata();
  // Rotation grows the bitmap; re-centre it so the placement stays as authored.
  const cx = g.x + before.width / 2;
  const cy = g.y + before.height / 2;
  const buf = g.r
    ? await sharp(flat).rotate(g.r, { background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer()
    : flat;
  const after = await sharp(buf).metadata();
  layers.push({ input: buf, left: Math.round(cx - after.width / 2), top: Math.round(cy - after.height / 2) });
}

const out = "src/app/opengraph-image.png";
await sharp(board).composite(layers).png({ compressionLevel: 9, palette: true }).toFile(out);
const meta = await sharp(out).metadata();
console.log(`${out} ${meta.width}x${meta.height} ${Math.round(statSync(out).size / 1024)}KB`);
