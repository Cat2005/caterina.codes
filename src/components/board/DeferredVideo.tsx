"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import s from "./BlurImage.module.css";

type Props = {
  src: string;
  poster?: string;
  width?: number;
  height?: number;
  blur?: string;
  className?: string;
  delay?: number;
};

export default function DeferredVideo({ src, poster, width, height, blur, className, delay = 700 }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      const video = ref.current;
      if (!video) return;
      video.preload = "auto";
      video.play().catch(() => undefined);
    }, delay);
    return () => clearTimeout(id);
  }, [delay]);

  useEffect(() => {
    if (!loaded) return;
    const id = setTimeout(() => setDone(true), 400);
    return () => clearTimeout(id);
  }, [loaded]);

  const wrapStyle = {
    ...(blur ? { "--blur": `url(${blur})` } : {}),
    ...(width && height ? { aspectRatio: `${width} / ${height}` } : {}),
  } as CSSProperties;

  return (
    <span className={`${s.wrap} ${done ? s.done : ""} ${className ?? ""}`} style={wrapStyle}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        width={width}
        height={height}
        muted
        loop
        playsInline
        preload="none"
        onLoadedData={() => setLoaded(true)}
        className={`${s.img} ${loaded ? s.loaded : ""}`}
      />
    </span>
  );
}
