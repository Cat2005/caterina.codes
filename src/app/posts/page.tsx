import Canvas from "@/components/canvas/Canvas";
import { postsPage } from "@/content/boards/postCards";
import { getAllPosts } from "@/lib/posts";

export default function PostsPage() {
  return <Canvas spec={postsPage(getAllPosts())} />;
}
