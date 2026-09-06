"use client";

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { playOpen } from "@/lib/sounds";

type Props = {
  href: string;
  external: boolean;
  className: string;
  style: CSSProperties;
  children: ReactNode;
};

export default function BoardLink({ href, external, className, style, children }: Props) {
  if (external) {
    return (
      <a href={href} className={className} style={style} target="_blank" rel="noreferrer" onClick={playOpen}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} style={style} onClick={playOpen}>
      {children}
    </Link>
  );
}
