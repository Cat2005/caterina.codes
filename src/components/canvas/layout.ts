import { DESIGN_HEIGHT, DESIGN_WIDTH, MIN_HEIGHT, MOBILE_HEIGHT, MOBILE_WIDTH, PORTRAIT_HEIGHT, PORTRAIT_WIDTH } from "@/lib/scale";
import { compressedTops, frac, portraitPositions } from "./compress";
import type { BoardSpec, PageSpec } from "./types";

export type Placed = { fx: number; fy: number; w: number; h?: number; dy?: number; scale?: number; p?: Placed; m?: Placed };

const place = (b: BoardSpec, top: number, portrait: { x: number; y: number }): Placed => {
  const h = b.h ?? 0;
  const fy = frac(b.y, DESIGN_HEIGHT, h);
  return {
    fx: frac(b.x, DESIGN_WIDTH, b.w),
    fy,
    w: b.w,
    h: b.h,
    dy: top - fy * (MIN_HEIGHT - h),
    p: { fx: frac(portrait.x, PORTRAIT_WIDTH, b.w), fy: frac(portrait.y, PORTRAIT_HEIGHT, h), w: b.w, h: b.h, scale: b.p?.scale },
  };
};

const placeMobile = (b: BoardSpec): Placed | undefined =>
  b.m && {
    fx: frac(b.m.x, MOBILE_WIDTH, b.m.w),
    fy: frac(b.m.y, MOBILE_HEIGHT, b.m.h),
    w: b.m.w,
    h: b.m.h,
  };

export function layoutBoards({ boards, back }: PageSpec) {
  const tops = compressedTops(boards, !!back);
  const portrait = portraitPositions(boards, !!back);
  return new Map<string, Placed>(boards.map((b, i) => [b.id, { ...place(b, tops[i], portrait[i]), m: placeMobile(b) }]));
}
