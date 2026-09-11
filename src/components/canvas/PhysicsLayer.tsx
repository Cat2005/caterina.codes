"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { playBump } from "@/lib/sounds";
import { createBody, step, TUNING } from "./physics";
import type { Body, Bounds } from "./physics";

type Held = { body: Body; sx: number; sy: number; ox: number; oy: number; dragging: boolean };

const scaleOf = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--scale")) || 1;

export default function PhysicsLayer({ className, children }: { className: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const boards = Array.from(root.querySelectorAll<HTMLElement>("[data-body]")).map((el) => createBody(el));
    const obstacles = Array.from(document.querySelectorAll<HTMLElement>("[data-obstacle]")).map((el) => createBody(el, true));
    const bodies = [...boards, ...obstacles];
    const byEl = new Map(boards.map((b) => [b.el, b]));
    const held = new Map<number, Held>();
    const order = [...boards];
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    let scale = 1;
    let bounds: Bounds = { left: 0, top: 0, right: 0, bottom: 0 };
    let raf = 0;
    let last = 0;
    let lastBump = 0;
    let homing = false;
    let suppress = false;

    const measure = () => {
      scale = scaleOf();
      const r = root.getBoundingClientRect();
      const padTop = parseFloat(getComputedStyle(root).getPropertyValue("--pad-top")) || 0;
      bounds = { left: 0, top: padTop, right: r.width / scale, bottom: r.height / scale };
      for (const b of bodies) {
        const br = b.el.getBoundingClientRect();
        b.w = br.width / scale;
        b.h = br.height / scale;
        b.bx = (br.left - r.left) / scale - b.x;
        b.by = (br.top - r.top) / scale - b.y;
        const tag = Array.from(b.el.querySelectorAll(":scope > span")).find((el) => el.textContent);
        b.top = TUNING.edge + (tag ? Math.max(0, br.top - tag.getBoundingClientRect().top) / scale : 0);
      }
    };

    const raise = (body: Body) => {
      order.splice(order.indexOf(body), 1);
      order.push(body);
      order.forEach((b, i) => {
        b.el.style.zIndex = String(i + 1);
      });
    };

    const tick = (t: number) => {
      const dt = Math.max(1 / 240, Math.min((t - last) / 1000, 1 / 30));
      last = t;
      const { active, impacts } = step(bodies, bounds, dt, t / 1000, { reduced: reduce.matches, homing });
      for (const b of boards) {
        b.el.style.setProperty("--px", `${b.x}px`);
        b.el.style.setProperty("--py", `${b.y}px`);
      }
      if (impacts.length && t - lastBump >= TUNING.bumpGap * 1000) {
        lastBump = t;
        playBump(Math.max(...impacts));
      }
      if (homing && !active) {
        homing = false;
        measure();
      }
      raf = active ? requestAnimationFrame(tick) : 0;
    };

    const wake = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const el = (e.target as Element).closest<HTMLElement>("[data-body]");
      const body = el && byEl.get(el);
      if (!el || !body || body.held) return;
      measure();
      body.held = true;
      body.tx = body.x;
      body.ty = body.y;
      body.vx = 0;
      body.vy = 0;
      raise(body);
      held.set(e.pointerId, { body, sx: e.clientX, sy: e.clientY, ox: body.x, oy: body.y, dragging: false });
      suppress = false;
      e.preventDefault();
      wake();
    };

    const onMove = (e: PointerEvent) => {
      const h = held.get(e.pointerId);
      if (!h) return;
      if (!h.dragging) {
        const threshold = e.pointerType === "mouse" ? TUNING.mouseThreshold : TUNING.touchThreshold;
        if (Math.hypot(e.clientX - h.sx, e.clientY - h.sy) < threshold) return;
        h.dragging = true;
        h.body.el.setPointerCapture(e.pointerId);
      }
      h.body.tx = h.ox + (e.clientX - h.sx) / scale;
      h.body.ty = h.oy + (e.clientY - h.sy) / scale;
      wake();
    };

    const onUp = (e: PointerEvent) => {
      const h = held.get(e.pointerId);
      if (!h) return;
      held.delete(e.pointerId);
      h.body.held = false;
      if (h.dragging) {
        suppress = true;
        const k = reduce.matches ? 0 : TUNING.throw;
        h.body.vx *= k;
        h.body.vy *= k;
      }
      wake();
    };

    const onClick = (e: MouseEvent) => {
      if (!suppress) return;
      suppress = false;
      e.preventDefault();
      e.stopPropagation();
    };

    const onResize = () => {
      homing = true;
      wake();
    };

    root.addEventListener("pointerdown", onDown);
    root.addEventListener("click", onClick, true);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("click", onClick, true);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
