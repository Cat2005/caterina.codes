"use client";

import Link from "next/link";
import type { CSSProperties, MouseEvent } from "react";
import { useGoBack } from "./useGoBack";
import type { Placed } from "./layout";
import s from "./Canvas.module.css";

export default function BackLink({ href, fx, fy, w, h, m }: Placed & { href: string }) {
  const goBack = useGoBack();
  const style = {
    "--fx": fx,
    "--fy": fy,
    "--w": `${w}px`,
    "--h": `${h ?? 0}px`,
    "--mfx": m?.fx,
    "--mfy": m?.fy,
    "--mw": `${m?.w ?? 0}px`,
    "--mh": `${m?.h ?? 0}px`,
  } as CSSProperties;
  const onClick = (e: MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    if (goBack()) e.preventDefault();
  };
  return (
    <Link href={href} className={s.back} style={style} data-back="" onClick={onClick}>
      &lt; back
    </Link>
  );
}
