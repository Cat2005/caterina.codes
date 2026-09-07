import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import Board from "@/components/board/Board";
import BackArea from "@/components/canvas/BackArea";
import BackLink from "@/components/canvas/BackLink";
import mdxComponents from "@/components/mdx/MdxComponents";
import ScrollRail from "@/components/post/ScrollRail";
import { getHeadings } from "@/lib/headings";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import s from "./post.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug((await params).slug);
  if (!post) return { title: "Not found" };
  return { title: `${post.title} | Cat`, description: post.description };
}

export default async function PostPage({ params }: Props) {
  const post = getPostBySlug((await params).slug);
  if (!post) notFound();
  const headings = getHeadings(post.content);

  return (
    <>
      <main className={s.page} data-wide-scale="">
        <BackArea href="/posts" />
        <div className={s.canvas}>
          <BackLink href="/posts" fx={0.62} fy={0} w={1300} h={0} m={{ fx: 0.5, fy: 0, w: 600 }} />
          <Board id={post.slug} hero lead fx={0.62} fy={0} w={1300} m={{ fx: 0.5, fy: 0, w: 600 }}>
            <article className={s.article}>
              <h1 className={s.title}>{post.title}</h1>
              {!post.hideLede && <p className={s.lede}>{post.description}</p>}
              <MDXRemote
                source={post.content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    rehypePlugins: [[rehypePrettyCode, { theme: "rose-pine-dawn", keepBackground: true }]],
                  },
                }}
              />
            </article>
          </Board>
        </div>
      </main>
      <ScrollRail headings={headings} />
    </>
  );
}
