import BlogNavbar from '../components/BlogNavbar';

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <BlogNavbar activePage="posts" />
      {children}
    </div>
  );
}
