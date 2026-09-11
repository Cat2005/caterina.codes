"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { playBump } from "@/lib/sounds";
import { createBody, step, TUNING } from "./physics";
import type { Body, Bounds } from "./physics";
import { applyScale, beginResize, targetScale } from "./scaling";

type Corner = { name: string; ax: number; ay: number };
type Held = { body: Body; sx: number; sy: number; ox: number; oy: number; s0: number; corner?: Corner; outside: boolean; dragging: boolean };

const CORNERS: Corner[] = [
  { name: "tl", ax: 1, ay: 1 },
  { name: "tr", ax: 0, ay: 1 },
  { name: "bl", ax: 1, ay: 0 },
  { name: "br", ax: 0, ay: 0 },
];

const scaleOf = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--scale")) || 1;

function cornerAt(el: HTMLElement, x: number, y: number) {
  const r = el.getBoundingClientRect();
  if (!r.width) return;
  const z = TUNING.cornerZone;
  return CORNERS.find((c) => {
    const cx = c.ax ? r.left : r.right;
    const cy = c.ay ? r.top : r.bottom;
    return Math.abs(x - cx) <= z && Math.abs(y - cy) <= z;
  });
}

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
    let hovered: HTMLElement | undefined;

    const measure = () => {
      scale = scaleOf();
      const r = root.getBoundingClientRect();
      const padTop = parseFloat(getComputedStyle(root).getPropertyValue("--pad-top")) || 0;
      bounds = { left: 0, top: padTop, right: r.width / scale, bottom: r.height / scale };
      for (const b of bodies) {
        const br = b.el.getBoundingClientRect();
        b.w0 = br.width / scale / b.s;
        b.h0 = br.height / scale / b.s;
        b.bx = (br.left - r.left) / scale - b.x;
        b.by = (br.top - r.top) / scale - b.y;
        const tag = b.fixed ? undefined : Array.from(b.el.querySelectorAll(":scope > span")).find((el) => el.textContent);
        const tr = tag?.getBoundingClientRect();
        b.tag =
          tr && tr.bottom <= br.top
            ? { x: (tr.left - br.left) / scale / b.s, gap: (br.top - tr.bottom) / scale / b.s, w: tr.width / scale, h: tr.height / scale }
            : undefined;
        applyScale(b);
      }
    };

    const raise = (body: Body) => {
      order.splice(order.indexOf(body), 1);
      order.push(body);
      order.forEach((b, i) => {
        b.el.style.zIndex = String(i + 1);
      });
    };

    const findCorner = (x: number, y: number) => {
      for (let i = order.length - 1; i >= 0; i--) {
        const corner = cornerAt(order[i].el, x, y);
        if (corner) return { body: order[i], corner };
      }
    };

    const hover = (el?: HTMLElement, corner?: Corner) => {
      if (hovered && hovered !== el) delete hovered.dataset.corner;
      hovered = el;
      if (el && corner) el.dataset.corner = corner.name;
    };

    const tick = (t: number) => {
      const dt = Math.max(1 / 240, Math.min((t - last) / 1000, 1 / 30));
      last = t;
      const { active, impacts } = step(bodies, bounds, dt, t / 1000, { reduced: reduce.matches, homing });
      for (const b of boards) {
        b.el.style.setProperty("--px", `${b.x}px`);
        b.el.style.setProperty("--py", `${b.y}px`);
        b.el.style.setProperty("--sz", `${b.s}`);
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
      const hit = e.pointerType === "mouse" ? findCorner(e.clientX, e.clientY) : undefined;
      const el = hit ? hit.body.el : (e.target as Element).closest<HTMLElement>("[data-body]");
      const body = hit ? hit.body : el && byEl.get(el);
      if (!el || !body || body.held) return;
      measure();
      body.held = true;
      body.tx = body.x;
      body.ty = body.y;
      body.vx = 0;
      body.vy = 0;
      if (hit) {
        beginResize(body, hit.corner.ax, hit.corner.ay);
        el.style.setProperty("--origin", "0 0");
        hover(el, hit.corner);
      }
      raise(body);
      const outside = !el.contains(e.target as Node);
      held.set(e.pointerId, { body, sx: e.clientX, sy: e.clientY, ox: body.x, oy: body.y, s0: body.s, corner: hit?.corner, outside, dragging: false });
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
      const dx = (e.clientX - h.sx) / scale;
      const dy = (e.clientY - h.sy) / scale;
      if (h.corner) {
        h.body.ts = targetScale(h.body, h.s0, dx, dy);
      } else {
        h.body.tx = h.ox + dx;
        h.body.ty = h.oy + dy;
      }
      wake();
    };

    const onUp = (e: PointerEvent) => {
      const h = held.get(e.pointerId);
      if (!h) return;
      held.delete(e.pointerId);
      h.body.held = false;
      h.body.resizing = false;
      if (h.dragging || h.outside) suppress = true;
      const k = h.dragging && !h.corner && !reduce.matches ? TUNING.throw : 0;
      h.body.vx *= k;
      h.body.vy *= k;
      wake();
    };

    const onHover = (e: PointerEvent) => {
      if (held.size || e.pointerType !== "mouse") return;
      const hit = findCorner(e.clientX, e.clientY);
      hover(hit?.body.el, hit?.corner);
    };

    const onLeave = () => hover();

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
    root.addEventListener("pointermove", onHover);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("click", onClick, true);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointermove", onHover);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("click", onClick, true);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={ref} className={className} data-canvas="">
      {children}
    </div>
  );
}
