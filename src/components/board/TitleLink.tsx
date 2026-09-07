"use client";

import type { ReactNode } from "react";
import LinkArrow from "@/components/LinkArrow";
import { playOpen } from "@/lib/sounds";
import s from "./text.module.css";

type Props = { href: string; children: ReactNode };

export default function TitleLink({ href, children }: Props) {
  return (
    <a className={s.titleLink} href={href} target="_blank" rel="noreferrer" onClick={playOpen}>
      {children}
      <LinkArrow />
    </a>
  );
}

export function TextLink({ href, children }: Props) {
  return (
    <a className={s.textLink} href={href} target="_blank" rel="noreferrer" onClick={playOpen}>
      {children}
      <LinkArrow />
    </a>
  );
}
