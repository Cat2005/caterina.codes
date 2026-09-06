import type { ReactNode } from "react";

export type Heading = { id: string; text: string; level: number };

export function headingText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(headingText).join("");
  if (typeof node === "object" && "props" in node) {
    const props = (node as { props?: { children?: ReactNode } }).props;
    return headingText(props?.children);
  }
  return "";
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getHeadings(source: string): Heading[] {
  const headings: Heading[] = [];
  let fenced = false;
  for (const line of source.split("\n")) {
    if (line.trimStart().startsWith("```")) {
      fenced = !fenced;
      continue;
    }
    if (fenced) continue;
    const match = /^ {0,3}(#{1,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;
    const text = match[2]
      .replace(/<[^>]+>/g, "")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[`*_]/g, "")
      .trim();
    headings.push({ id: slugify(text), text, level: match[1].length });
  }
  return headings;
}
