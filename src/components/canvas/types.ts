import type { ReactNode } from "react";

export type Box = { x: number; y: number; w: number; h: number };

export type BoardSpec = {
  id: string;
  x: number;
  y: number;
  w: number;
  h?: number;
  m?: Box;
  p?: { x: number; y: number; scale?: number };
  tag?: string;
  href?: string;
  hero?: boolean;
  intro?: boolean;
  fit?: boolean;
  post?: boolean;
  content: ReactNode;
};

export type PageSpec = {
  back?: string;
  boards: BoardSpec[];
};
