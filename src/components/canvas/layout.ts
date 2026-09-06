import { DESIGN_HEIGHT, DESIGN_WIDTH, MOBILE_HEIGHT, MOBILE_WIDTH } from "@/lib/scale";
import type { BoardSpec } from "./types";

export type Placed = { fx: number; fy: number; w: number; h?: number; m?: Placed };

const frac = (v: number, span: number, size: number) => (span - size > 0 ? v / (span - size) : 0);

const place = (b: BoardSpec): Placed => ({
  fx: frac(b.x, DESIGN_WIDTH, b.w),
  fy: frac(b.y, DESIGN_HEIGHT, b.h ?? 0),
  w: b.w,
  h: b.h,
});

const placeMobile = (b: BoardSpec): Placed | undefined =>
  b.m && {
    fx: frac(b.m.x, MOBILE_WIDTH, b.m.w),
    fy: frac(b.m.y, MOBILE_HEIGHT, b.m.h),
    w: b.m.w,
    h: b.m.h,
  };

export function layoutBoards(boards: BoardSpec[]) {
  return new Map<string, Placed>(boards.map((b) => [b.id, { ...place(b), m: placeMobile(b) }]));
}
