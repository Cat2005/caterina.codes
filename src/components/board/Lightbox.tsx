"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Frame from "./Frame";
import { MediaElement } from "./Media";
import type { MediaBoxProps } from "./Media";
import s from "./Lightbox.module.css";

type Props = MediaBoxProps & { tag?: string; onClose: () => void };

export default function Lightbox({ tag, onClose, caption, ...media }: Props) {
  const [closing, setClosing] = useState(false);
  const requestClose = () => setClosing(true);

  useEffect(() => {
    if (!closing) return;
    const id = setTimeout(onClose, 240);
    return () => clearTimeout(id);
  }, [closing, onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setClosing(true);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  return createPortal(
    <div
      className={`${s.backdrop} ${closing ? s.closing : ""}`}
      onClick={requestClose}
      role="dialog"
      aria-modal="true"
    >
      <div className={s.board} onClick={(e) => e.stopPropagation()}>
        <Frame tag={tag}>
          <figure className={s.figure}>
            <MediaElement {...media} className={s.mediaEl} />
            {caption && <figcaption className={s.caption}>{caption}</figcaption>}
          </figure>
        </Frame>
      </div>
    </div>,
    document.body,
  );
}
