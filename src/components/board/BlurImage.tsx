"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import s from "./BlurImage.module.css";

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  blur?: string;
  className?: string;
  style?: CSSProperties;
  loading?: "lazy" | "eager";
};

export default function BlurImage({ src, alt, width, height, blur, className, style, loading = "lazy" }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const mounted = useRef(0);
  const [loaded, setLoaded] = useState(false);
  const [done, setDone] = useState(false);

  const onLoad = () => {
    setLoaded(true);
    if (performance.now() - mounted.current < 120) setDone(true);
  };

  useLayoutEffect(() => {
    mounted.current = performance.now();
    if (ref.current?.complete && ref.current.naturalWidth > 0) {
      setLoaded(true);
      setDone(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const id = setTimeout(() => setDone(true), 400);
    return () => clearTimeout(id);
  }, [loaded]);

  const wrapStyle = { ...style, ...(blur ? { "--blur": `url(${blur})` } : {}) } as CSSProperties;
  return (
    <span className={`${s.wrap} ${done ? s.done : ""} ${className ?? ""}`} style={wrapStyle}>
      <img
        ref={ref}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        draggable={false}
        onLoad={onLoad}
        onTransitionEnd={() => setDone(true)}
        className={`${s.img} ${loaded ? s.loaded : ""} ${done ? s.instant : ""}`}
      />
    </span>
  );
}
