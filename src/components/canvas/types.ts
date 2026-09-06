import type { ReactNode } from "react";

export type BoardSpec = {
  id: string;
  x: number;
  y: number;
  w: number;
  h?: number;
  tag?: string;
  href?: string;
  hero?: boolean;
  fit?: boolean;
  content: ReactNode;
};

export type PageSpec = {
  back?: string;
  boards: BoardSpec[];
};
