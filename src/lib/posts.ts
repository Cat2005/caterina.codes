import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "src/content/posts");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

export type Post = PostMeta & { content: string; hideLede: boolean };

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const { data } = matter(fs.readFileSync(path.join(postsDir, f), "utf8"));
      return {
        slug: f.replace(/\.mdx$/, ""),
        title: data.title,
        description: data.description,
        date: data.date,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const full = path.join(postsDir, `${slug}.mdx`);
  if (!fs.existsSync(full)) return null;
  const { data, content } = matter(fs.readFileSync(full, "utf8"));
  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    hideLede: data.hideLede ?? false,
    content,
  };
}

export function getPostImages(slug: string, limit = 2): string[] {
  const post = getPostBySlug(slug);
  if (!post) return [];
  const found = [...post.content.matchAll(/src="(\/posts\/[^"]+\.(?:webp|png|jpe?g))"/g)].map((m) => m[1]);
  return [...new Set(found)].slice(0, limit);
}
