import type { ReactNode } from "react";
import BlurImage from "@/components/board/BlurImage";
import DeferredVideo from "@/components/board/DeferredVideo";
import { getImageMeta, getVideoMeta } from "@/lib/images";
import s from "./mdx.module.css";

type ImageProps = { src: string; alt?: string; caption?: ReactNode; noBorder?: boolean };

export async function MDXImage({ src, alt = "", caption }: ImageProps) {
  const meta = await getImageMeta(src);
  return (
    <figure className={s.figure}>
      <BlurImage
        src={src}
        alt={alt}
        width={meta?.width}
        height={meta?.height}
        blur={meta?.blur}
        className={s.figureMedia}
      />
      {caption && <figcaption className={s.caption}>{caption}</figcaption>}
    </figure>
  );
}

type VideoProps = {
  src: string;
  caption?: ReactNode;
  type?: "youtube" | "local";
  noBorder?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
};

const youtubeId = (url: string) => {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/)([^#&?]{11})/);
  return m ? m[1] : null;
};

export async function MDXVideo({ src, caption, type, autoPlay = false, loop = false }: VideoProps) {
  const id = type === "youtube" || /youtu/.test(src) ? youtubeId(src) : null;
  const meta = id ? null : await getVideoMeta(src);
  return (
    <figure className={s.figure}>
      {id ? (
        <div className={s.embed}>
          <iframe src={`https://www.youtube.com/embed/${id}`} allowFullScreen className={s.embedFrame} />
        </div>
      ) : autoPlay ? (
        <DeferredVideo
          src={src}
          poster={meta?.poster}
          width={meta?.width}
          height={meta?.height}
          blur={meta?.blur}
          className={s.figureMedia}
        />
      ) : (
        <video
          src={src}
          poster={meta?.poster}
          width={meta?.width}
          height={meta?.height}
          playsInline
          controls
          loop={loop}
          preload="metadata"
          className={s.figureMedia}
        />
      )}
      {caption && <figcaption className={s.caption}>{caption}</figcaption>}
    </figure>
  );
}
