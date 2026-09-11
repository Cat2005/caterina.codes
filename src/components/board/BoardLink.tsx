"use client";

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { playOpen } from "@/lib/sounds";

type Props = {
  href: string;
  external: boolean;
  shared: boolean;
  lead?: boolean;
  plain?: boolean;
  post?: boolean;
  off?: boolean;
  className: string;
  style: CSSProperties;
  children: ReactNode;
};

export default function BoardLink({ href, external, shared, lead, plain, post, off, className, style, children }: Props) {
  const marker = shared ? "" : undefined;
  const flags = {
    "data-body": "",
    "data-lead": lead ? "" : undefined,
    "data-plain": plain ? "" : undefined,
    "data-post": post ? "" : undefined,
    "data-off": off ? "" : undefined,
  };
  if (external) {
    return (
      <a
        href={href}
        className={className}
        style={style}
        data-shared={marker}
        {...flags}
        target="_blank"
        rel="noreferrer"
        onClick={playOpen}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} style={style} data-shared={marker} {...flags} onClick={playOpen}>
      {children}
    </Link>
  );
}
