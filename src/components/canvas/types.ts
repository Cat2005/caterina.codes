import type { ReactNode } from "react";

export type Box = { x: number; y: number; w: number; h: number };

export type BoardSpec = {
  id: string;
  x: number;
  y: number;
  w: number;
  h?: number;
  m?: Box;
  tag?: string;
  href?: string;
  hero?: boolean;
  intro?: boolean;
  fit?: boolean;
  content: ReactNode;
};

export type PageSpec = {
  back?: string;
  boards: BoardSpec[];
};
