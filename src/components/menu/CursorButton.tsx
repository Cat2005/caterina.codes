"use client";

import { cursors, cursorSrc, setCursor, useCursor } from "./cursors";
import s from "./Menu.module.css";

export default function CursorButton() {
  const index = useCursor();
  return (
    <button
      type="button"
      className={s.cursorButton}
      aria-label="Change cursor"
      onClick={() => setCursor((index + 1) % cursors.length)}
    >
      <img src={cursorSrc(index)} alt="" className={s.cursorImage} />
    </button>
  );
}
