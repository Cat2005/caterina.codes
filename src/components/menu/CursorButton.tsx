"use client";

import { useEffect, useRef } from "react";
import { playOpen } from "@/lib/sounds";
import { cursors, cursorSrc, setCursor, useCursor } from "./cursors";
import s from "./Menu.module.css";

const pad = 0.04;
const margin = 2.4;
const stiffness = 0.22;
const damping = 0.74;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), Math.max(min, max));

const band = (over: number, room: number) => room * (1 - 1 / (1 + (over / room) * 2));

const ease = (value: number, min: number, max: number) => {
  if (max < min) return (min + max) / 2;
  if (value < min) return min - band(min - value, pad * 0.8);
  if (value > max) return max + band(value - max, pad * 0.8);
  return value;
};

const within = (x: number, y: number, box: DOMRect, slack: number) =>
  x >= box.left - slack && x <= box.right + slack && y >= box.top - slack && y <= box.bottom + slack;

export default function CursorButton() {
  const index = useCursor();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const image = imageRef.current;
    if (!button || !image) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    let engaged = false;
    let frame = 0;
    let x = 0.5;
    let y = 0.5;
    let vx = 0;
    let vy = 0;
    let tx = 0.5;
    let ty = 0.5;
    let limX = 1;
    let limY = 1;

    const rest = () => {
      const box = button.getBoundingClientRect();
      const icon = image.getBoundingClientRect();
      return { x: (1 - icon.width / box.width) / 2, y: (1 - icon.height / box.height) / 2 };
    };

    const settle = () => {
      delete image.dataset.track;
      image.style.left = "";
      image.style.top = "";
    };

    const tick = () => {
      const snap = still.matches;
      vx = snap ? 0 : (vx + (tx - x) * stiffness) * damping;
      vy = snap ? 0 : (vy + (ty - y) * stiffness) * damping;
      x = clamp(snap ? tx : x + vx, 0, limX);
      y = clamp(snap ? ty : y + vy, 0, limY);
      if (x === 0 || x === limX) vx = 0;
      if (y === 0 || y === limY) vy = 0;
      image.style.left = `${x * 100}%`;
      image.style.top = `${y * 100}%`;
      const done = Math.abs(tx - x) < 0.0005 && Math.abs(ty - y) < 0.0005;
      if (engaged || !done) {
        frame = requestAnimationFrame(tick);
        return;
      }
      frame = 0;
      settle();
    };

    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const release = () => {
      if (!engaged) return;
      engaged = false;
      delete document.documentElement.dataset.cursorHidden;
      const home = rest();
      tx = home.x;
      ty = home.y;
      start();
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const box = button.getBoundingClientRect();
      const hit = (e.target as Element | null)?.closest?.("a, button");
      if (engaged && hit && hit !== button) {
        release();
        return;
      }
      if (!engaged) {
        if (!within(e.clientX, e.clientY, box, 0)) return;
        const home = rest();
        if (!image.dataset.track) {
          x = home.x;
          y = home.y;
          vx = 0;
          vy = 0;
        }
        engaged = true;
        image.dataset.track = "";
      } else if (!within(e.clientX, e.clientY, box, box.width * margin)) {
        release();
        return;
      }
      const icon = image.getBoundingClientRect();
      limX = 1 - icon.width / box.width;
      limY = 1 - icon.height / box.height;
      tx = ease((e.clientX - box.left) / box.width, pad, limX - pad);
      ty = ease((e.clientY - box.top) / box.height, pad, limY - pad);
      document.documentElement.dataset.cursorHidden = "";
      start();
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("mouseleave", release);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("mouseleave", release);
      cancelAnimationFrame(frame);
      delete document.documentElement.dataset.cursorHidden;
      settle();
    };
  }, []);

  const cycle = () => {
    setCursor((index + 1) % cursors.length);
    playOpen();
    const image = imageRef.current;
    if (!image) return;
    delete image.dataset.pop;
    void image.offsetWidth;
    image.dataset.pop = "";
  };

  return (
    <button ref={buttonRef} type="button" className={s.cursorButton} aria-label="Change cursor" onClick={cycle}>
      <img
        ref={imageRef}
        src={cursorSrc(index)}
        alt=""
        className={s.cursorImage}
        onAnimationEnd={() => {
          if (imageRef.current) delete imageRef.current.dataset.pop;
        }}
      />
    </button>
  );
}
