import { useSyncExternalStore } from "react";

export const cursors = ["red", "blue", "green", "pink", "purple"];

const storageKey = "cursor";
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function read() {
  const saved = Number(localStorage.getItem(storageKey));
  return Number.isInteger(saved) && saved >= 0 && saved < cursors.length ? saved : 0;
}

export function setCursor(index: number) {
  localStorage.setItem(storageKey, String(index));
  listeners.forEach((cb) => cb());
}

export function useCursor() {
  return useSyncExternalStore(subscribe, read, () => 0);
}

export function cursorSrc(index: number) {
  return `/cursors/${cursors[index]}.png`;
}
