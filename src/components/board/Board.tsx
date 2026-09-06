import { ViewTransition } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { Placed } from "../canvas/layout";
import { BoardProvider } from "./BoardContext";
import BoardLink from "./BoardLink";
import Frame from "./Frame";
import HoverPreload from "./HoverPreload";
import s from "./Board.module.css";

export type BoardProps = {
  id: string;
  fx: number;
  fy: number;
  w: number;
  h?: number;
  m?: Placed;
  tag?: string;
  href?: string;
  hero?: boolean;
  lead?: boolean;
  plain?: boolean;
  fit?: boolean;
  preload?: string[];
  index?: number;
  children: ReactNode;
};

const isExternal = (href: string) => /^https?:/.test(href);

export default function Board(props: BoardProps) {
  const { id, tag, href, hero, lead, plain, fit, preload, index = 0, fx, fy, w, h, m, children } = props;
  const style = {
    "--fx": fx,
    "--fy": fy,
    "--w": `${w}px`,
    "--h": `${h ?? 0}px`,
    "--height": h && !fit ? `${h}px` : "auto",
    "--mfx": m?.fx,
    "--mfy": m?.fy,
    "--mw": `${m?.w ?? 0}px`,
    "--mh": `${m?.h ?? 0}px`,
    "--mheight": m?.h ? `${m.h}px` : "auto",
    "--i": index,
  } as CSSProperties;
  const off = plain && !m;
  const className = s.board;
  const frame = (
    <BoardProvider value={{ tag, clickable: href !== undefined }}>
      <Frame tag={tag}>{children}</Frame>
      {preload && preload.length > 0 && <HoverPreload urls={preload} />}
    </BoardProvider>
  );

  const shared = hero || (href !== undefined && !isExternal(href));
  const el: ReactNode = href ? (
    <BoardLink
      href={href}
      external={isExternal(href)}
      shared={shared}
      lead={lead}
      plain={plain}
      off={off}
      className={className}
      style={style}
    >
      {frame}
    </BoardLink>
  ) : (
    <div
      className={className}
      style={style}
      data-hero={hero ? "" : undefined}
      data-lead={lead ? "" : undefined}
      data-plain={plain ? "" : undefined}
      data-off={off ? "" : undefined}
      data-shared={shared ? "" : undefined}
    >
      {frame}
    </div>
  );

  if (!shared) return el;
  return (
    <ViewTransition name={`board-${id}`} share="morph" default="none">
      {el}
    </ViewTransition>
  );
}
