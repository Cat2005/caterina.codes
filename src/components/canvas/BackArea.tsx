"use client";

import { useRouter } from "next/navigation";
import { useGoBack } from "./useGoBack";
import s from "./Canvas.module.css";

export default function BackArea({ href }: { href: string }) {
  const router = useRouter();
  const goBack = useGoBack();
  const onClick = () => {
    if (!goBack()) router.push(href);
  };
  return <div className={s.backArea} onClick={onClick} aria-hidden="true" />;
}
