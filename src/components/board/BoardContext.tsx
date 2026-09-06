"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";

type BoardInfo = { tag?: string; clickable: boolean };

const BoardContext = createContext<BoardInfo>({ clickable: false });

export function BoardProvider({ value, children }: { value: BoardInfo; children: ReactNode }) {
  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
}

export const useBoard = () => useContext(BoardContext);
