"use client";

import type { ReactNode } from "react";
import LinkArrow from "@/components/LinkArrow";
import { playOpen } from "@/lib/sounds";
import s from "./text.module.css";

export default function TitleLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className={s.titleLink} href={href} target="_blank" rel="noreferrer" onClick={playOpen}>
      {children}
      <LinkArrow />
    </a>
  );
}
