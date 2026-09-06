"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { recordVisit } from "@/lib/history";

export default function NavTracker() {
  const pathname = usePathname();
  useEffect(() => {
    recordVisit(pathname);
  }, [pathname]);
  return null;
}
