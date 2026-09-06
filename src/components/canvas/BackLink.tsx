"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { CSSProperties, MouseEvent } from "react";
import { hasPrevious } from "@/lib/history";
import type { Placed } from "./layout";
import s from "./Canvas.module.css";

export default function BackLink({ href, fx, fy, w, h }: Placed & { href: string }) {
  const router = useRouter();
  const style = { "--fx": fx, "--fy": fy, "--w": `${w}px`, "--h": `${h ?? 0}px` } as CSSProperties;
  const onClick = (e: MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || !hasPrevious()) return;
    e.preventDefault();
    router.back();
  };
  return (
    <Link href={href} className={s.back} style={style} onClick={onClick}>
      &lt; back
    </Link>
  );
}
