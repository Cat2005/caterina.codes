import type { CSSProperties, ReactNode } from "react";
import TitleLink from "./TitleLink";
import s from "./text.module.css";

type TextProps = { children: ReactNode; size?: number; muted?: boolean; className?: string };

const sizeStyle = (size?: number) =>
  (size ? { "--size": `${size}px` } : undefined) as CSSProperties | undefined;

export function Title({ children, size, href, className }: TextProps & { href?: string }) {
  return (
    <h2 className={`${s.title} ${className ?? ""}`} style={sizeStyle(size)}>
      {href ? <TitleLink href={href}>{children}</TitleLink> : children}
    </h2>
  );
}

export function Pixel({ children, size, muted, className }: TextProps) {
  return (
    <p className={`${s.pixel} ${muted ? s.muted : ""} ${className ?? ""}`} style={sizeStyle(size)}>
      {children}
    </p>
  );
}

export function Text({ children, size, muted, className }: TextProps) {
  return (
    <p className={`${s.text} ${muted ? s.muted : ""} ${className ?? ""}`} style={sizeStyle(size)}>
      {children}
    </p>
  );
}
