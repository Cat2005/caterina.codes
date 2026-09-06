import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import Board from "@/components/board/Board";
import BackLink from "@/components/canvas/BackLink";
import mdxComponents from "@/components/mdx/MdxComponents";
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

  return (
    <main className={s.page}>
      <div className={s.canvas}>
        <BackLink href="/posts" fx={0.62} fy={0} w={1300} h={0} />
        <Board id={post.slug} hero fx={0.62} fy={0} w={1300}>
          <article className={s.article}>
            <h1 className={s.title}>{post.title}</h1>
            <p className={s.lede}>{post.description}</p>
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  rehypePlugins: [
                    [
                      rehypePrettyCode,
                      { theme: "rose-pine-dawn", keepBackground: true },
                    ],
                  ],
                },
              }}
            />
          </article>
        </Board>
      </div>
    </main>
  );
}
