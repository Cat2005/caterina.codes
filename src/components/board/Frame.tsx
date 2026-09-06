import type { ReactNode } from "react";
import s from "./Board.module.css";

export default function Frame({ tag, children }: { tag?: string; children: ReactNode }) {
  return (
    <>
      {tag && <span className={s.tag}>{tag}</span>}
      <span className={`${s.corner} ${s.tl}`} />
      <span className={`${s.corner} ${s.tr}`} />
      <span className={`${s.corner} ${s.bl}`} />
      <span className={`${s.corner} ${s.br}`} />
      <div className={s.inner}>{children}</div>
    </>
  );
}
