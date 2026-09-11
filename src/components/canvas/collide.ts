import { TUNING } from "./tuning";
import type { Body, Bounds, Box } from "./physics";

export const LEFT = 1;
export const RIGHT = 2;
export const UP = 4;
export const DOWN = 8;

const invMass = (b: Body) => (b.fixed ? 0 : b.held ? 1 / (b.w * b.h * TUNING.heldWeight) : 1 / (b.w * b.h));

const bit = (nx: number, ny: number) => (nx > 0 ? RIGHT : nx < 0 ? LEFT : ny > 0 ? DOWN : UP);

const strength = (speed: number) =>
  Math.min(1, Math.max(0, (speed - TUNING.bumpSpeed) / (TUNING.bumpFullSpeed - TUNING.bumpSpeed)));

const canBump = (b: Body, speed: number, now: number) => speed >= TUNING.bumpSpeed && now - b.lastBump >= TUNING.bumpGap;

function resolve(a: Body, ba: Box, b: Body, bb: Box, e: number, now: number, impacts: number[]) {
  const halfW = (ba.w + bb.w) / 2 + TUNING.gap;
  const halfH = (ba.h + bb.h) / 2 + TUNING.gap;
  const ox = b.bx + bb.x + bb.w / 2 - (a.bx + ba.x + ba.w / 2);
  const oy = b.by + bb.y + bb.h / 2 - (a.by + ba.y + ba.h / 2);
  const dx = ox + b.x - a.x;
  const dy = oy + b.y - a.y;
  if (Math.abs(dx) >= halfW || Math.abs(dy) >= halfH) return;
  const pdx = ox + b.px - a.px;
  const pdy = oy + b.py - a.py;
  const sepX = Math.abs(pdx) >= halfW - 0.01;
  const sepY = Math.abs(pdy) >= halfH - 0.01;
  let nx = 0;
  let ny = 0;
  let p: number;
  if (sepX && !sepY) {
    nx = pdx < 0 ? -1 : 1;
    p = halfW - nx * dx;
  } else if (sepY && !sepX) {
    ny = pdy < 0 ? -1 : 1;
    p = halfH - ny * dy;
  } else if (halfW - Math.abs(dx) < halfH - Math.abs(dy)) {
    nx = dx < 0 ? -1 : 1;
    p = halfW - Math.abs(dx);
  } else {
    ny = dy < 0 ? -1 : 1;
    p = halfH - Math.abs(dy);
  }
  const ia = a.pinned & bit(-nx, -ny) ? 0 : invMass(a);
  const ib = b.pinned & bit(nx, ny) ? 0 : invMass(b);
  const total = ia + ib;
  if (!total) return;
  a.x -= (nx * p * ia) / total;
  a.y -= (ny * p * ia) / total;
  b.x += (nx * p * ib) / total;
  b.y += (ny * p * ib) / total;
  if (!ib) a.pinned |= bit(nx, ny);
  if (!ia) b.pinned |= bit(-nx, -ny);
  const rv = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
  if (rv >= 0) return;
  const j = (-(1 + e) * rv) / total;
  a.vx -= j * ia * nx;
  a.vy -= j * ia * ny;
  b.vx += j * ib * nx;
  b.vy += j * ib * ny;
  if (canBump(a, -rv, now) && canBump(b, -rv, now)) {
    a.lastBump = now;
    b.lastBump = now;
    impacts.push(strength(-rv));
  }
}

export function collide(a: Body, b: Body, e: number, now: number, impacts: number[]) {
  for (const ba of a.boxes) {
    for (const bb of b.boxes) resolve(a, ba, b, bb, e, now, impacts);
  }
}

const lo = (raw: number, home: number) => (home > 0 ? Math.min(raw, 0) : raw);
const hi = (raw: number, home: number) => (home < 0 ? Math.max(raw, 0) : raw);

export function walls(b: Body, bounds: Bounds, e: number, now: number, impacts: number[]) {
  if (b.fixed) return;
  const left = bounds.left + TUNING.edge - b.bx;
  const right = bounds.right - TUNING.edge - b.bx;
  const top = bounds.top + TUNING.edge - b.by;
  const bottom = bounds.bottom - TUNING.edge - b.by;
  const minX = lo(left - b.ext.l, left - b.home.l);
  const maxX = hi(right - b.ext.r, right - b.home.r);
  const minY = lo(top - b.ext.t, top - b.home.t);
  const maxY = hi(bottom - b.ext.b, bottom - b.home.b);
  let touching = 0;
  let hit = 0;
  if (b.x < minX) {
    b.x = minX;
    touching |= LEFT;
    if (b.vx < 0) {
      hit = Math.max(hit, -b.vx);
      b.vx = -b.vx * e;
    }
  } else if (b.x > maxX) {
    b.x = maxX;
    touching |= RIGHT;
    if (b.vx > 0) {
      hit = Math.max(hit, b.vx);
      b.vx = -b.vx * e;
    }
  }
  if (b.y < minY) {
    b.y = minY;
    touching |= UP;
    if (b.vy < 0) {
      hit = Math.max(hit, -b.vy);
      b.vy = -b.vy * e;
    }
  } else if (b.y > maxY) {
    b.y = maxY;
    touching |= DOWN;
    if (b.vy > 0) {
      hit = Math.max(hit, b.vy);
      b.vy = -b.vy * e;
    }
  }
  b.pinned |= touching;
  const fresh = touching & ~b.walls;
  b.walls = touching;
  if (fresh && canBump(b, hit, now)) {
    b.lastBump = now;
    impacts.push(strength(hit));
  }
}
