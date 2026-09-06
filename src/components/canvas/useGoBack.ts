"use client";

import { useRouter } from "next/navigation";
import { hasPrevious } from "@/lib/history";
import { playClose } from "@/lib/sounds";

export function useGoBack() {
  const router = useRouter();
  return () => {
    playClose();
    if (!hasPrevious()) return false;
    router.back();
    return true;
  };
}
