import Link from "next/link";
import type { CSSProperties } from "react";
import type { Placed } from "./layout";
import s from "./Canvas.module.css";

export default function BackLink({ href, fx, fy, w, h }: Placed & { href: string }) {
  const style = { "--fx": fx, "--fy": fy, "--w": `${w}px`, "--h": `${h ?? 0}px` } as CSSProperties;
  return (
    <Link href={href} className={s.back} style={style}>
      &lt; back
    </Link>
  );
}
