import React from 'react';
import { Metadata } from 'next';
import BlogCard from '../components/BlogCard';
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Posts | Caterina Mammola',
  description: 'Blog posts by Caterina Mammola',
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
      <div className="w-[85%] sm:w-[50%] md:w-2/5 xl:w-[35%] mx-auto pb-16 animate-fade-in">
        <h1 className="font-newsreader text-5xl text-[#CA0079] mb-12">
          posts
        </h1>

        <div className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
              />
            ))
          ) : (
            <p className="font-avantGardeMedium text-[#acacac] text-sm">
              No posts yet. Check back soon!
            </p>
          )}
        </div>
      </div>
  );
}
