export const TUNING = {
  friction: 1.6,
  restitution: 0.3,
  wallRestitution: 0.3,
  follow: 9,
  throw: 0.55,
  maxSpeed: 2500,
  heldWeight: 30,
  gap: 8,
  edge: 10,
  substeps: 4,
  iterations: 4,
  sleepSpeed: 6,
  homeStiffness: 140,
  homeDamping: 24,
  bumpSpeed: 120,
  bumpFullSpeed: 1400,
  bumpGap: 0.12,
  mouseThreshold: 6,
  touchThreshold: 10,
};

export type Body = {
  el: HTMLElement;
  fixed: boolean;
  x: number;
  y: number;
  px: number;
  py: number;
  vx: number;
  vy: number;
  bx: number;
  by: number;
  w: number;
  h: number;
  top: number;
  held: boolean;
  tx: number;
  ty: number;
  pinned: number;
  walls: number;
  lastBump: number;
};

export type Bounds = { left: number; top: number; right: number; bottom: number };
export type Options = { reduced: boolean; homing: boolean };

export const createBody = (el: HTMLElement, fixed = false): Body => ({
  el,
  fixed,
  x: 0,
  y: 0,
  px: 0,
  py: 0,
  vx: 0,
  vy: 0,
  bx: 0,
  by: 0,
  w: 0,
  h: 0,
  top: 0,
  held: false,
  tx: 0,
  ty: 0,
  pinned: 0,
  walls: 0,
  lastBump: 0,
});

const LEFT = 1;
const RIGHT = 2;
const UP = 4;
const DOWN = 8;

const invMass = (b: Body) => (b.fixed ? 0 : b.held ? 1 / (b.w * b.h * TUNING.heldWeight) : 1 / (b.w * b.h));

const bit = (nx: number, ny: number) => (nx > 0 ? RIGHT : nx < 0 ? LEFT : ny > 0 ? DOWN : UP);

const strength = (speed: number) =>
  Math.min(1, Math.max(0, (speed - TUNING.bumpSpeed) / (TUNING.bumpFullSpeed - TUNING.bumpSpeed)));

const canBump = (b: Body, speed: number, now: number) => speed >= TUNING.bumpSpeed && now - b.lastBump >= TUNING.bumpGap;

function integrate(b: Body, dt: number, o: Options) {
  b.px = b.x;
  b.py = b.y;
  b.pinned = 0;
  if (b.fixed) return;
  if (b.held) {
    const k = 1 - Math.exp(-TUNING.follow * dt);
    b.x += (b.tx - b.x) * k;
    b.y += (b.ty - b.y) * k;
    return;
  }
  if (o.homing) {
    b.vx += (-TUNING.homeStiffness * b.x - TUNING.homeDamping * b.vx) * dt;
    b.vy += (-TUNING.homeStiffness * b.y - TUNING.homeDamping * b.vy) * dt;
  } else {
    const damp = Math.exp(-TUNING.friction * dt);
    b.vx *= damp;
    b.vy *= damp;
  }
  const speed = Math.hypot(b.vx, b.vy);
  if (speed > TUNING.maxSpeed) {
    b.vx *= TUNING.maxSpeed / speed;
    b.vy *= TUNING.maxSpeed / speed;
  }
  b.x += b.vx * dt;
  b.y += b.vy * dt;
}

function collide(a: Body, b: Body, e: number, now: number, impacts: number[]) {
  const halfW = (a.w + b.w) / 2 + TUNING.gap;
  const halfH = (a.h + b.h) / 2 + TUNING.gap;
  const dx = b.bx + b.x + b.w / 2 - (a.bx + a.x + a.w / 2);
  const dy = b.by + b.y + b.h / 2 - (a.by + a.y + a.h / 2);
  if (Math.abs(dx) >= halfW || Math.abs(dy) >= halfH) return;
  const pdx = b.bx + b.px + b.w / 2 - (a.bx + a.px + a.w / 2);
  const pdy = b.by + b.py + b.h / 2 - (a.by + a.py + a.h / 2);
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

function walls(b: Body, bounds: Bounds, e: number, now: number, impacts: number[]) {
  if (b.fixed) return;
  const minX = Math.min(0, bounds.left + TUNING.edge - b.bx);
  const maxX = Math.max(0, bounds.right - TUNING.edge - b.w - b.bx);
  const minY = Math.min(0, bounds.top + b.top - b.by);
  const maxY = Math.max(0, bounds.bottom - TUNING.edge - b.h - b.by);
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

function substep(live: Body[], bounds: Bounds, dt: number, now: number, o: Options, impacts: number[]) {
  const e = o.reduced ? 0 : TUNING.restitution;
  const we = o.reduced ? 0 : TUNING.wallRestitution;
  for (const b of live) integrate(b, dt, o);
  if (o.homing) return;
  for (let i = 0; i < TUNING.iterations; i++) {
    for (const b of live) walls(b, bounds, we, now, impacts);
    for (let a = 0; a < live.length; a++) {
      for (let c = a + 1; c < live.length; c++) collide(live[a], live[c], e, now, impacts);
    }
  }
  for (const b of live) walls(b, bounds, we, now, impacts);
  for (const b of live) {
    if (!b.held) continue;
    b.vx = (b.x - b.px) / dt;
    b.vy = (b.y - b.py) / dt;
  }
}

export function step(bodies: Body[], bounds: Bounds, dt: number, now: number, o: Options) {
  const impacts: number[] = [];
  const live = bodies.filter((b) => b.w > 0 && b.h > 0);
  const sub = dt / TUNING.substeps;
  for (let i = 0; i < TUNING.substeps; i++) substep(live, bounds, sub, now + i * sub, o, impacts);
  let active = false;
  for (const b of live) {
    if (b.fixed) continue;
    if (b.held) {
      active = true;
      continue;
    }
    const speed = Math.hypot(b.vx, b.vy);
    const settled = speed < TUNING.sleepSpeed && (!o.homing || Math.hypot(b.x, b.y) < 0.5);
    if (!settled) {
      active = true;
      continue;
    }
    b.vx = 0;
    b.vy = 0;
    if (o.homing) {
      b.x = 0;
      b.y = 0;
    }
  }
  return { active, impacts };
}
