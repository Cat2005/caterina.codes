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

type SideProps = { src: string; label?: string; widthPct?: number };

type VideoMetaLike = { poster?: string } | null;

const isVideo = (src: string) => /\.(mp4|webm|mov)$/i.test(src);

const sideMeta = (src: string) => (isVideo(src) ? getVideoMeta(src) : getImageMeta(src));

async function CompareSide({ src, label, widthPct }: SideProps) {
  const meta = await sideMeta(src);
  const media = isVideo(src) ? (
    <DeferredVideo
      src={src}
      poster={(meta as VideoMetaLike)?.poster}
      width={meta?.width}
      height={meta?.height}
      blur={meta?.blur}
      className={s.figureMedia}
    />
  ) : (
    <BlurImage
      src={src}
      alt={label ?? ""}
      width={meta?.width}
      height={meta?.height}
      blur={meta?.blur}
      className={s.figureMedia}
    />
  );
  return (
    <div className={s.compareSide}>
      {widthPct ? (
        <span className={s.compareShrink} style={{ width: `${widthPct}%` }}>
          {media}
        </span>
      ) : (
        media
      )}
      {label && <span className={s.compareLabel}>{label}</span>}
    </div>
  );
}

type CompareProps = {
  leftSrc: string;
  leftLabel?: string;
  rightSrc: string;
  rightLabel?: string;
  matchHeight?: boolean;
  caption?: ReactNode;
};

export async function MDXCompare({
  leftSrc,
  leftLabel,
  rightSrc,
  rightLabel,
  matchHeight,
  caption,
}: CompareProps) {
  const [left, right] = await Promise.all([sideMeta(leftSrc), sideMeta(rightSrc)]);
  const ratio = matchHeight && left && right ? left.width / left.height / (right.width / right.height) : 1;
  return (
    <figure className={s.figure}>
      <div className={s.compare}>
        <CompareSide src={leftSrc} label={leftLabel} widthPct={ratio < 1 ? ratio * 100 : undefined} />
        <CompareSide src={rightSrc} label={rightLabel} widthPct={ratio > 1 ? 100 / ratio : undefined} />
      </div>
      {caption && <figcaption className={s.caption}>{caption}</figcaption>}
    </figure>
  );
}
