import { collide, walls } from "./collide";
import { applyScale, constrainResize, setScale } from "./scaling";
import { TUNING } from "./tuning";

export { TUNING } from "./tuning";

export type Box = { x: number; y: number; w: number; h: number };
export type Tag = { x: number; gap: number; w: number; h: number };

export type Body = {
  el: HTMLElement;
  fixed: boolean;
  boxes: Box[];
  ext: { l: number; t: number; r: number; b: number };
  home: { l: number; t: number; r: number; b: number };
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
  w0: number;
  h0: number;
  tag?: Tag;
  s: number;
  ts: number;
  vs: number;
  ax: number;
  ay: number;
  anchorX: number;
  anchorY: number;
  resizing: boolean;
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
  boxes: [],
  ext: { l: 0, t: 0, r: 0, b: 0 },
  home: { l: 0, t: 0, r: 0, b: 0 },
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
  w0: 0,
  h0: 0,
  s: 1,
  ts: 1,
  vs: 0,
  ax: 0,
  ay: 0,
  anchorX: 0,
  anchorY: 0,
  resizing: false,
  held: false,
  tx: 0,
  ty: 0,
  pinned: 0,
  walls: 0,
  lastBump: 0,
});

function integrate(b: Body, dt: number, o: Options) {
  b.px = b.x;
  b.py = b.y;
  b.pinned = 0;
  if (b.fixed) return;
  if (b.held) {
    const k = 1 - Math.exp(-TUNING.follow * dt);
    if (b.resizing) {
      setScale(b, b.s + (b.ts - b.s) * k);
      return;
    }
    b.x += (b.tx - b.x) * k;
    b.y += (b.ty - b.y) * k;
    return;
  }
  if (o.homing) {
    b.vx += (-TUNING.homeStiffness * b.x - TUNING.homeDamping * b.vx) * dt;
    b.vy += (-TUNING.homeStiffness * b.y - TUNING.homeDamping * b.vy) * dt;
    b.vs += (-TUNING.homeStiffness * (b.s - 1) - TUNING.homeDamping * b.vs) * dt;
    b.s += b.vs * dt;
    applyScale(b);
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
    if (b.resizing) constrainResize(b);
    b.vx = (b.x - b.px) / dt;
    b.vy = (b.y - b.py) / dt;
  }
}

const atHome = (b: Body) => Math.hypot(b.x, b.y) < 0.5 && Math.abs(b.s - 1) < 0.002 && Math.abs(b.vs) < 0.01;

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
    const settled = speed < TUNING.sleepSpeed && (!o.homing || atHome(b));
    if (!settled) {
      active = true;
      continue;
    }
    b.vx = 0;
    b.vy = 0;
    if (o.homing) {
      b.x = 0;
      b.y = 0;
      b.s = 1;
      b.vs = 0;
      applyScale(b);
    }
  }
  return { active, impacts };
}
