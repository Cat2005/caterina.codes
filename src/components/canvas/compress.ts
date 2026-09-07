import {
  DESIGN_HEIGHT,
  DESIGN_WIDTH,
  MIN_HEIGHT,
  PORTRAIT_HEIGHT,
  PORTRAIT_WIDTH,
} from "@/lib/scale";
import type { BoardSpec } from "./types";

const TAG_HEIGHT = 54;
const TAG_LEFT = 20;
const BACK_HEIGHT = 110;
const GAP = 16;
const PORTRAIT_GAP = 40;
const MENU_GAP = 120;
const MENU_GAP_X = 70;
const EDGE_TOP = 30;
const EDGE_BOTTOM = 20;
const EDGE_X = 40;
const WIDE = 2700;
const MENU = { x: 56, y: 44, w: 348, h: 437 };

type Item = {
  x: number;
  y: number;
  w: number;
  h: number;
  tagW: number;
  back: boolean;
  fixed: boolean;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

export const frac = (v: number, span: number, size: number) =>
  span - size > 0 ? v / (span - size) : 0;
const tagWidth = (tag?: string) => (tag ? 48 + tag.length * 9.5 : 0);
const overlap = (a0: number, a1: number, b0: number, b1: number) =>
  a0 < b1 && b0 < a1;
const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

const needY = (
  u: Item,
  l: Item,
  ux: number,
  lx: number,
  slack = 0,
  base = GAP,
) => {
  const gap = u.fixed ? MENU_GAP : base;
  const [a0, a1] = [ux - slack, ux + u.w + slack];
  if (l.back && overlap(a0, a1, lx - 10, lx + 110)) return BACK_HEIGHT + gap;
  if (l.tagW && overlap(a0, a1, lx + TAG_LEFT, lx + TAG_LEFT + l.tagW))
    return TAG_HEIGHT + gap;
  if (overlap(a0, a1, lx, lx + l.w)) return gap;
  return -Infinity;
};

const menuItem = (): Item => ({
  ...MENU,
  tagW: 0,
  back: false,
  fixed: true,
  minX: MENU.x,
  maxX: MENU.x,
  minY: MENU.y,
  maxY: MENU.y,
});

const item = (
  b: BoardSpec,
  back: boolean,
  x: number,
  y: number,
  box: { w: number; h: number },
  pinned?: { x: number; y: number; scale?: number },
): Item => {
  const h = b.h ?? 0;
  const isBack = back && !!b.hero;
  const base = {
    w: b.w,
    h,
    tagW: tagWidth(b.tag),
    back: isBack,
    fixed: false,
    minX: EDGE_X,
    maxX: box.w - b.w - EDGE_X,
    minY: EDGE_TOP + (isBack ? BACK_HEIGHT : b.tag ? TAG_HEIGHT : 0),
    maxY: box.h - h - EDGE_BOTTOM,
  };
  if (!pinned) return { ...base, x, y };
  return {
    ...base,
    x: pinned.x,
    y: pinned.y,
    fixed: true,
    minX: pinned.x,
    maxX: pinned.x,
    minY: pinned.y,
    maxY: pinned.y,
  };
};

const shift = (a: Item, b: Item, axis: "x" | "y", amount: number) => {
  if (a.fixed) b[axis] += amount;
  else if (b.fixed) a[axis] -= amount;
  else {
    a[axis] -= amount / 2;
    b[axis] += amount / 2;
  }
  a.x = clamp(a.x, a.minX, a.maxX);
  a.y = clamp(a.y, a.minY, a.maxY);
  b.x = clamp(b.x, b.minX, b.maxX);
  b.y = clamp(b.y, b.minY, b.maxY);
};

const relax = (items: Item[], step: (a: Item, b: Item) => boolean) => {
  for (let iter = 0; iter < 500; iter++) {
    let moved = false;
    for (let i = 0; i < items.length; i++)
      for (let j = i + 1; j < items.length; j++) {
        const [a, b] =
          items[i].y + items[i].h / 2 <= items[j].y + items[j].h / 2
            ? [items[i], items[j]]
            : [items[j], items[i]];
        if (!(a.fixed && b.fixed) && step(a, b)) moved = true;
      }
    if (!moved) break;
  }
};

export function compressedTops(
  boards: BoardSpec[],
  back: boolean,
  vhd = MIN_HEIGHT,
) {
  const xs = boards.map((b) =>
    [DESIGN_WIDTH, WIDE].map(
      (vwd) => frac(b.x, DESIGN_WIDTH, b.w) * (vwd - b.w),
    ),
  );
  const items = boards.map((b, i) =>
    item(
      b,
      back,
      xs[i][0],
      frac(b.y, DESIGN_HEIGHT, b.h ?? 0) * (vhd - (b.h ?? 0)),
      { w: DESIGN_WIDTH, h: vhd },
    ),
  );
  const all = [menuItem(), ...items];
  const at = (it: Item, k: number) =>
    it.fixed ? it.x : xs[items.indexOf(it)][k];
  relax(all, (u, l) => {
    const need = Math.max(
      ...[0, 1].map((k) => needY(u, l, at(u, k), at(l, k))),
    );
    const deficit = need - (l.y - u.y - u.h);
    if (deficit <= 0.25) return false;
    shift(u, l, "y", deficit);
    return true;
  });
  return items.map((it) => it.y);
}

export function portraitPositions(boards: BoardSpec[], back: boolean) {
  const box = { w: PORTRAIT_WIDTH, h: PORTRAIT_HEIGHT };
  const items = boards.map((b) =>
    item(
      b,
      back,
      frac(b.x, DESIGN_WIDTH, b.w) * (box.w - b.w),
      frac(b.y, DESIGN_HEIGHT, b.h ?? 0) * (box.h - (b.h ?? 0)),
      box,
      b.p,
    ),
  );
  relax([menuItem(), ...items], (u, l) => {
    const needX = u.fixed || l.fixed ? MENU_GAP_X : PORTRAIT_GAP;
    const xgap = Math.max(l.x - u.x - u.w, u.x - l.x - l.w);
    const penX = needX - xgap;
    if (penX <= 0.25) return false;
    const penY = needY(u, l, u.x, l.x, needX, PORTRAIT_GAP) - (l.y - u.y - u.h);
    if (penY <= 0.25) return false;
    if (penX <= penY)
      shift(
        u.x + u.w / 2 <= l.x + l.w / 2 ? u : l,
        u.x + u.w / 2 <= l.x + l.w / 2 ? l : u,
        "x",
        penX,
      );
    else shift(u, l, "y", penY);
    return true;
  });
  return items.map((it) => ({ x: it.x, y: it.y }));
}
