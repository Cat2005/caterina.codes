import { DESIGN_HEIGHT, DESIGN_WIDTH } from "@/lib/scale";
import type { BoardSpec } from "./types";

export type Placed = { fx: number; fy: number; w: number; h?: number };

const frac = (v: number, span: number, size: number) => (span - size > 0 ? v / (span - size) : 0);

export function layoutBoards(boards: BoardSpec[]) {
  return new Map<string, Placed>(
    boards.map((b) => [
      b.id,
      {
        fx: frac(b.x, DESIGN_WIDTH, b.w),
        fy: frac(b.y, DESIGN_HEIGHT, b.h ?? 0),
        w: b.w,
        h: b.h,
      },
    ]),
  );
}
