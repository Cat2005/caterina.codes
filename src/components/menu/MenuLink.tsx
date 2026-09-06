"use client";

import Link from "next/link";
import NdotIcon, { type IconName } from "./NdotIcon";
import { playOpen } from "@/lib/sounds";
import s from "./Menu.module.css";

type Props = { href: string; label: string; icon: IconName; external?: boolean };

export default function MenuLink({ href, label, icon, external }: Props) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={s.link} onClick={playOpen}>
        <NdotIcon name={icon} />
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={s.link} onClick={playOpen}>
      <NdotIcon name={icon} />
      {label}
    </Link>
  );
}
