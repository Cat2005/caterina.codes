"use client";

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { playOpen } from "@/lib/sounds";

type Props = {
  href: string;
  external: boolean;
  shared: boolean;
  className: string;
  style: CSSProperties;
  children: ReactNode;
};

export default function BoardLink({ href, external, shared, className, style, children }: Props) {
  const marker = shared ? "" : undefined;
  if (external) {
    return (
      <a
        href={href}
        className={className}
        style={style}
        data-shared={marker}
        target="_blank"
        rel="noreferrer"
        onClick={playOpen}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} style={style} data-shared={marker} onClick={playOpen}>
      {children}
    </Link>
  );
}
