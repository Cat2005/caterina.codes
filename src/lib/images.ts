import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

export type ImageMeta = { width: number; height: number; blur: string };

const cache = new Map<string, Promise<ImageMeta>>();

async function read(src: string): Promise<ImageMeta> {
  const file = path.join(process.cwd(), "public", src);
  const image = sharp(file);
  const { width = 0, height = 0, hasAlpha } = await image.metadata();
  if (hasAlpha) return { width, height, blur: "" };
  const tiny = await image.resize({ width: 32 }).webp({ quality: 60 }).toBuffer();
  return { width, height, blur: `data:image/webp;base64,${tiny.toString("base64")}` };
}

export function getImageMeta(src: string): Promise<ImageMeta | null> {
  if (!src.startsWith("/")) return Promise.resolve(null);
  let hit = cache.get(src);
  if (!hit) {
    hit = read(src);
    cache.set(src, hit);
  }
  return hit.catch(() => null);
}

export type VideoMeta = ImageMeta & { poster: string };

export async function getVideoMeta(src: string, poster?: string): Promise<VideoMeta | null> {
  const candidate = poster ?? src.replace(/\.(mp4|webm|mov)$/i, "-poster.webp");
  if (!fs.existsSync(path.join(process.cwd(), "public", candidate))) return null;
  const meta = await getImageMeta(candidate);
  return meta ? { ...meta, poster: candidate } : null;
}
