"use client";

import { useEffect, useRef, useState } from "react";
import type { Heading } from "@/lib/headings";
import s from "./ScrollRail.module.css";

type Mark = Heading & { step: number };

const lead = 120;
const gap = 4;
const reach = 260;
const slack = 90;

function scroller() {
  const doc = (document.scrollingElement as HTMLElement | null) ?? document.documentElement;
  if (doc.scrollHeight - doc.clientHeight > 1) return doc;
  const body = document.body;
  return body.scrollHeight - body.clientHeight > 1 ? body : doc;
}

function offsetOf(el: Element, sc: HTMLElement) {
  const top = el.getBoundingClientRect().top + sc.scrollTop;
  if (sc === document.scrollingElement || sc === document.documentElement) return top;
  return top - sc.getBoundingClientRect().top;
}

const swing = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function ScrollRail({ headings }: { headings: Heading[] }) {
  const [marks, setMarks] = useState<Mark[]>([]);
  const rootRef = useRef<HTMLElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const tweenRef = useRef(0);

  useEffect(() => () => cancelAnimationFrame(tweenRef.current), []);

  useEffect(() => {
    const root = rootRef.current;
    const readout = readoutRef.current;
    if (!root || !readout) return;
    let frame = 0;

    const measure = () => {
      const sc = scroller();
      const range = sc.scrollHeight - sc.clientHeight;
      const style = getComputedStyle(root);
      const pitch = parseFloat(style.getPropertyValue("--pitch"));
      const edges = parseFloat(style.getPropertyValue("--top")) + parseFloat(style.getPropertyValue("--bottom"));
      const steps = Math.floor((root.clientHeight - edges) / pitch);
      let last = -gap;
      setMarks(
        headings.flatMap((heading) => {
          const el = document.getElementById(heading.id);
          if (!el || range <= 0 || steps < 2) return [];
          const at = Math.min(Math.max((offsetOf(el, sc) - lead) / range, 0), 1);
          const step = Math.min(Math.max(Math.round(at * (steps - 1)), last + gap), steps - 1);
          last = step;
          return [{ ...heading, step }];
        }),
      );
    };

    const paint = () => {
      frame = 0;
      const sc = scroller();
      const range = sc.scrollHeight - sc.clientHeight;
      const progress = range > 0 ? Math.min(Math.max(sc.scrollTop / range, 0), 1) : 0;
      root.style.setProperty("--progress", String(progress));
      readout.textContent = progress.toFixed(2);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const edge = window.innerWidth - e.clientX;
      const open = "open" in root.dataset;
      if (!open && edge < reach) root.dataset.open = "";
      else if (open && edge > reach + slack) delete root.dataset.open;
    };

    const onLeave = () => delete root.dataset.open;

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    paint();
    document.addEventListener("scroll", onScroll, { capture: true, passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);
    const media = document.querySelectorAll("img, video");
    media.forEach((el) => el.addEventListener("load", onResize));
    const timer = window.setTimeout(onResize, 600);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      document.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
      media.forEach((el) => el.removeEventListener("load", onResize));
    };
  }, [headings]);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const sc = scroller();
    const from = sc.scrollTop;
    const to = Math.min(Math.max(offsetOf(el, sc) - lead, 0), sc.scrollHeight - sc.clientHeight);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sc.scrollTop = to;
      return;
    }
    const span = Math.min(900, 320 + Math.abs(to - from) * 0.28);
    cancelAnimationFrame(tweenRef.current);
    let started = 0;
    const step = (now: number) => {
      if (!started) started = now;
      const t = Math.min((now - started) / span, 1);
      sc.scrollTop = from + (to - from) * swing(t);
      if (t < 1) tweenRef.current = requestAnimationFrame(step);
    };
    tweenRef.current = requestAnimationFrame(step);
  };

  if (headings.length < 2) return null;

  return (
    <nav ref={rootRef} className={s.rail} aria-label="Sections">
      <div className={s.zone} aria-hidden />
      <div className={s.ticks} aria-hidden />
      {marks.map((mark) => (
        <button
          key={mark.id}
          type="button"
          className={s.mark}
          style={{ "--step": mark.step } as React.CSSProperties}
          onClick={() => go(mark.id)}
        >
          <span className={s.label}>{mark.text}</span>
          <span className={s.notch} />
        </button>
      ))}
      <div className={s.cursor} aria-hidden>
        <span ref={readoutRef} className={s.readout}>
          0.00
        </span>
        <span className={s.line} />
      </div>
    </nav>
  );
}
