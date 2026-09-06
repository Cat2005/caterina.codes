import { Hero, Pic, Stack } from "@/components/board/layouts";
import { Pixel, Text, Title } from "@/components/board/text";
import type { BoardSpec, PageSpec } from "@/components/canvas/types";
import type { PostMeta } from "@/lib/posts";

type Image = { src: string; width?: number; bleed?: boolean; h?: number };

const images: Record<string, Image> = {
  "bicepcurl-post": { src: "/clay/dumbbell.webp", width: 150 },
  "make-mindmaps": { src: "/posts/mindmap-card.webp", bleed: true, h: 375 },
  "makeup-post": { src: "/posts/lip-instagram-comments.webp", bleed: true, h: 300 },
  "kids-hackathon": { src: "/posts/hackathon-poster.webp", bleed: true, h: 345 },
};

type Frame = { x: number; y: number; w: number; h: number };

const slots: Frame[] = [
  { x: 520, y: 100, w: 335, h: 330 },
  { x: 300, y: 980, w: 335, h: 330 },
  { x: 1450, y: 760, w: 335, h: 330 },
  { x: 1300, y: 180, w: 335, h: 330 },
  { x: 1000, y: 900, w: 335, h: 330 },
];

const intro: BoardSpec = {
  id: "posts-intro",
  tag: "Posts",
  x: 683,
  y: 567,
  w: 550,
  h: 240,
  content: (
    <Hero gap={16}>
      <Title size={52}>Posts</Title>
      <Pixel size={20}>Some of my thoughts on learning, marketing, product and UI.</Pixel>
    </Hero>
  ),
};

export function postBoard(post: PostMeta, frame: Frame): BoardSpec {
  const image = images[post.slug];
  return {
    id: post.slug,
    tag: "Post",
    href: `/posts/${post.slug}`,
    ...frame,
    h: image?.h ?? frame.h,
    fit: true,
    content: (
      <Stack pad={28} padBottom={16} gap={10} top={image?.bleed}>
        {image && <Pic src={image.src} alt="" width={image.width} bleed={image.bleed} />}
        <Title size={22}>{post.title}</Title>
        <Text size={12}>{post.description}</Text>
      </Stack>
    ),
  };
}

export function postsPage(posts: PostMeta[]): PageSpec {
  const boards = posts.slice(0, slots.length).map((p, i) => postBoard(p, slots[i]));
  return { boards: [intro, ...boards] };
}
