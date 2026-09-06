import type { CSSProperties, ReactNode } from "react";
import { getImageMeta, getVideoMeta } from "@/lib/images";
import { isVideo } from "@/lib/media";
import { MediaBox } from "./Media";
import type { MediaProps } from "./Media";
import BlurImage from "./BlurImage";
import s from "./layouts.module.css";

type BoxProps = {
  children: ReactNode;
  pad?: number;
  padBottom?: number;
  gap?: number;
  className?: string;
  center?: boolean;
  top?: boolean;
};

const boxStyle = (pad?: number, gap?: number, padBottom?: number) =>
  ({
    ...(pad !== undefined ? { "--pad": `${pad}px` } : {}),
    ...(padBottom !== undefined ? { "--pad-bottom-box": `${padBottom}px` } : {}),
    ...(gap !== undefined ? { "--gap": `${gap}px` } : {}),
  }) as CSSProperties;

export function Stack({ children, pad, padBottom, gap, className, center, top }: BoxProps) {
  const cls = `${s.stack} ${center ? s.center : ""} ${top ? s.top : ""} ${className ?? ""}`;
  return (
    <div className={cls} style={boxStyle(pad, gap, padBottom)}>
      {children}
    </div>
  );
}

export function Row({ children, pad, gap, className }: BoxProps) {
  return (
    <div className={`${s.row} ${className ?? ""}`} style={boxStyle(pad, gap)}>
      {children}
    </div>
  );
}

export function Hero({ children, pad, gap, className }: BoxProps) {
  return (
    <div className={`${s.hero} ${className ?? ""}`} style={boxStyle(pad, gap)}>
      {children}
    </div>
  );
}

export function Col({ children, gap, className }: BoxProps) {
  return (
    <div className={`${s.col} ${className ?? ""}`} style={boxStyle(undefined, gap)}>
      {children}
    </div>
  );
}

type PicProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  center?: boolean;
  bleed?: boolean;
  flush?: boolean;
};

export async function Pic({ src, alt, width, height, className, center, bleed, flush }: PicProps) {
  const meta = await getImageMeta(src);
  const style = {
    ...(width ? { "--w": `${width}px` } : {}),
    ...(height ? { "--h": `${height}px` } : {}),
  } as CSSProperties;
  const cls = `${s.pic} ${center ? s.picCenter : ""} ${bleed ? s.bleed : ""} ${flush ? s.flush : ""} ${className ?? ""}`;
  return (
    <BlurImage
      src={src}
      alt={alt}
      width={meta?.width}
      height={meta?.height}
      blur={meta?.blur}
      className={cls}
      style={style}
      loading="eager"
    />
  );
}

export async function Media(props: MediaProps) {
  const meta = isVideo(props.src) ? await getVideoMeta(props.src, props.poster) : await getImageMeta(props.src);
  return <MediaBox {...props} meta={meta} />;
}
