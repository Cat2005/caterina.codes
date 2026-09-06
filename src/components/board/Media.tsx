"use client";

import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { ImageMeta, VideoMeta } from "@/lib/images";
import { isVideo } from "@/lib/media";
import BlurImage from "./BlurImage";
import { useBoard } from "./BoardContext";
import DeferredVideo from "./DeferredVideo";
import Lightbox from "./Lightbox";
import s from "./layouts.module.css";

export type MediaProps = { src: string; alt?: string; poster?: string; pad?: number; caption?: ReactNode };
export type MediaMeta = ImageMeta | VideoMeta | null;
export type MediaBoxProps = MediaProps & { meta: MediaMeta };


export function MediaElement({ src, alt = "", meta, className }: MediaBoxProps & { className: string }) {
  if (isVideo(src)) {
    const poster = meta && "poster" in meta ? meta.poster : undefined;
    return (
      <DeferredVideo
        src={src}
        poster={poster}
        width={meta?.width}
        height={meta?.height}
        blur={meta?.blur}
        className={className}
      />
    );
  }
  return (
    <BlurImage
      src={src}
      alt={alt}
      width={meta?.width}
      height={meta?.height}
      blur={meta?.blur}
      className={className}
      loading="eager"
    />
  );
}

export function MediaBox(props: MediaBoxProps) {
  const { pad, caption } = props;
  const { tag, clickable } = useBoard();
  const [open, setOpen] = useState(false);
  const style = (pad !== undefined ? { "--pad": `${pad}px` } : undefined) as CSSProperties | undefined;
  const expandable = !clickable;

  const figure = (
    <figure className={s.media} style={style}>
      <MediaElement {...props} className={s.mediaEl} />
      {caption && <figcaption className={s.caption}>{caption}</figcaption>}
    </figure>
  );

  if (!expandable) return figure;
  return (
    <>
      <button type="button" className={s.expand} onClick={() => setOpen(true)} aria-label="Expand">
        {figure}
      </button>
      {open && <Lightbox tag={tag} onClose={() => setOpen(false)} {...props} />}
    </>
  );
}
