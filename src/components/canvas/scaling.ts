import { TUNING } from "./tuning";
import type { Body, Box } from "./physics";

function boxesAt(b: Body, s: number): Box[] {
  const boxes: Box[] = [{ x: 0, y: 0, w: b.w0 * s, h: b.h0 * s }];
  if (b.tag) {
    const gap = b.tag.gap * s;
    boxes.push({ x: b.tag.x * s, y: -(gap + b.tag.h), w: b.tag.w, h: gap + b.tag.h });
  }
  return boxes;
}

const extents = (boxes: Box[]) => ({
  l: Math.min(...boxes.map((k) => k.x)),
  t: Math.min(...boxes.map((k) => k.y)),
  r: Math.max(...boxes.map((k) => k.x + k.w)),
  b: Math.max(...boxes.map((k) => k.y + k.h)),
});

export function applyScale(b: Body) {
  b.w = b.w0 * b.s;
  b.h = b.h0 * b.s;
  b.boxes = boxesAt(b, b.s);
  b.ext = extents(b.boxes);
  b.home = extents(boxesAt(b, 1));
}

export function setScale(b: Body, s: number) {
  const ds = s - b.s;
  b.x -= ds * b.ax * b.w0;
  b.y -= ds * b.ay * b.h0;
  b.s = s;
  applyScale(b);
}

export function constrainResize(b: Body) {
  const ex = b.bx + b.x + b.ax * b.w - b.anchorX;
  const ey = b.by + b.y + b.ay * b.h - b.anchorY;
  const dirx = b.ax ? -1 : 1;
  const diry = b.ay ? -1 : 1;
  const rx = ex * dirx < 0 ? Math.abs(ex) / b.w0 : 0;
  const ry = ey * diry < 0 ? Math.abs(ey) / b.h0 : 0;
  b.s = Math.max(TUNING.minScale, b.s - Math.max(rx, ry));
  applyScale(b);
  b.x = b.anchorX - b.bx - b.ax * b.w;
  b.y = b.anchorY - b.by - b.ay * b.h;
}

export function beginResize(b: Body, ax: number, ay: number) {
  b.resizing = true;
  b.ax = ax;
  b.ay = ay;
  b.ts = b.s;
  b.anchorX = b.bx + b.x + ax * b.w;
  b.anchorY = b.by + b.y + ay * b.h;
}

export function targetScale(b: Body, s0: number, dx: number, dy: number) {
  const dirx = b.ax ? -1 : 1;
  const diry = b.ay ? -1 : 1;
  const along = (dx * dirx * b.w0 + dy * diry * b.h0) / (b.w0 * b.w0 + b.h0 * b.h0);
  return Math.min(TUNING.maxScale, Math.max(TUNING.minScale, s0 + along));
}
