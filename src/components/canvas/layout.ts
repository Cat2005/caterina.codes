import { PAD_BOTTOM, PAD_TOP, PAD_X } from "@/lib/scale";
import type { BoardSpec } from "./types";

export type Placed = { fx: number; fy: number; w: number; h?: number };

export function layoutBoards(boards: BoardSpec[]) {
  const minX = Math.min(...boards.map((b) => b.x));
  const minY = Math.min(...boards.map((b) => b.y));
  const maxX = Math.max(...boards.map((b) => b.x + b.w));
  const maxY = Math.max(...boards.map((b) => b.y + (b.h ?? 0)));
  const spanX = maxX - minX;
  const spanY = maxY - minY;
  const frac = (v: number, min: number, span: number, size: number) =>
    span - size > 0 ? (v - min) / (span - size) : 0;
  const placed = new Map<string, Placed>(
    boards.map((b) => [
      b.id,
      { fx: frac(b.x, minX, spanX, b.w), fy: frac(b.y, minY, spanY, b.h ?? 0), w: b.w, h: b.h },
    ]),
  );
  const padLeft = Math.max(PAD_X, minX);
  const padTop = Math.max(PAD_TOP, minY);
  return { placed, padLeft, padTop, fitW: spanX + padLeft + PAD_X, fitH: spanY + padTop + PAD_BOTTOM };
}
