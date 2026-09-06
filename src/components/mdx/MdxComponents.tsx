import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { headingText, slugify } from "@/lib/headings";
import { MDXImage, MDXVideo } from "./MdxMedia";
import s from "./mdx.module.css";

type Kids = { children?: ReactNode };

const mdxComponents = {
  h1: ({ children }: Kids) => (
    <h1 id={slugify(headingText(children))} className={s.h1}>
      {children}
    </h1>
  ),
  h2: ({ children }: Kids) => (
    <h2 id={slugify(headingText(children))} className={s.h2}>
      {children}
    </h2>
  ),
  h3: ({ children }: Kids) => (
    <h3 id={slugify(headingText(children))} className={s.h3}>
      {children}
    </h3>
  ),
  p: ({ children }: Kids) => <p className={s.p}>{children}</p>,
  a: ({ href, children }: { href?: string; children?: ReactNode }) => (
    <a href={href} target="_blank" rel="noreferrer" className={s.a}>
      {children}
    </a>
  ),
  img: ({ src, alt }: { src?: string; alt?: string }) => <MDXImage src={src ?? ""} alt={alt ?? ""} />,
  blockquote: ({ children }: Kids) => <blockquote className={s.quote}>{children}</blockquote>,
  pre: ({ children, ...props }: ComponentPropsWithoutRef<"pre">) => (
    <pre className={s.pre} {...props}>
      {children}
    </pre>
  ),
  code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => {
    const block = "data-language" in props;
    return (
      <code className={block ? s.codeBlock : s.code} {...props}>
        {children}
      </code>
    );
  },
  ul: ({ children }: Kids) => <ul className={s.list}>{children}</ul>,
  ol: ({ children }: Kids) => <ol className={s.list}>{children}</ol>,
  li: ({ children }: Kids) => <li className={s.li}>{children}</li>,
  hr: () => <hr className={s.hr} />,
  strong: ({ children }: Kids) => <strong className={s.strong}>{children}</strong>,
  Pink: ({ children }: Kids) => <span className={s.accent}>{children}</span>,
  SignOff: () => <p className={s.signoff}>Cat &lt;3</p>,
  MDXImage,
  MDXVideo,
};

export default mdxComponents;
