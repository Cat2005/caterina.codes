"use client";

import { useEffect, useRef } from "react";

export default function HoverPreload({ urls }: { urls: string[] }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const target = ref.current?.parentElement;
    if (!target || urls.length === 0) return;
    let done = false;
    const warm = () => {
      if (done) return;
      done = true;
      urls.forEach((url) => {
        const img = new Image();
        img.src = url;
      });
    };
    target.addEventListener("mouseenter", warm);
    target.addEventListener("touchstart", warm, { passive: true });
    return () => {
      target.removeEventListener("mouseenter", warm);
      target.removeEventListener("touchstart", warm);
    };
  }, [urls]);

  return <span ref={ref} hidden />;
}
