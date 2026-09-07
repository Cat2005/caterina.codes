"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { recordVisit } from "@/lib/history";

export default function NavTracker() {
  const pathname = usePathname();
  useEffect(() => {
    recordVisit(pathname);
  }, [pathname]);
  useLayoutEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, [pathname]);
  return null;
}
