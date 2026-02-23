import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { HiArrowLeft } from 'react-icons/hi2';
import rehypePrettyCode from 'rehype-pretty-code';
import MDXComponents from '../../components/mdx/MDXComponents';
import { getPostBySlug, getAllPostSlugs } from '@/lib/posts';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | Caterina Mammola',
    };
  }

  return {
    title: `${post.title} | Caterina Mammola`,
    description: post.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
      <article className="w-[85%] sm:w-[50%] md:w-2/5 xl:w-[35%] mx-auto pb-16 animate-fade-in">
        <Link
          href="/posts"
          className="inline-flex items-center gap-1 text-[#c02e7e] font-avantGardeMedium text-sm mb-6 group"
        >
          <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-newsreader">
            back to posts
          </span>
        </Link>

        <header className="mt-8 mb-8">
          <h1 className="font-newsreader text-5xl text-[#CA0079] mb-2">
            {post.title}
          </h1>
          <p className="font-avantGardeMedium text-[#acacac] text-sm mb-2">
            {post.description}
          </p>
          <p className="font-avantGardeMedium text-[#777777] text-xs">
            {formattedDate}
          </p>
        </header>

        {post.image && (
          <div className="mb-8 border border-[#252525] bg-[#979797]/10 backdrop-blur-sm rounded-lg p-4">
            <img
              src={post.image}
              alt={post.title}
              className="w-full rounded-lg object-cover"
            />
          </div>
        )}

        <div className="prose prose-invert max-w-none">
          <MDXRemote
            source={post.content}
            components={MDXComponents}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  [rehypePrettyCode, {
                    theme: 'rose-pine',
                    keepBackground: true,
                  }],
                ],
              },
            }}
          />
        </div>
      </article>
  );
}
