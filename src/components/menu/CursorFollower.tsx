"use client";

import { useEffect, useRef } from "react";
import { cursorSrc, useCursor } from "./cursors";
import s from "./CursorFollower.module.css";

export default function CursorFollower() {
  const index = useCursor();
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: PointerEvent) => {
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      el.dataset.visible = "";
    };
    const hide = () => {
      delete el.dataset.visible;
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("mouseleave", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("mouseleave", hide);
    };
  }, []);

  return <img ref={ref} src={cursorSrc(index)} alt="" className={s.cursor} draggable={false} />;
}
