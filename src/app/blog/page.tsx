import type { Metadata } from "next";
import { PostCard } from "@/components/blog/PostCard";
import { Container } from "@/components/layout/Container";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "技術記事と学習記録の一覧です。",
};

// 記事一覧ページ（/blog）
export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Container className="py-16 sm:py-24">
      <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
      <p className="mt-4 text-muted">技術記事と学習記録</p>

      {posts.length === 0 ? (
        <p className="mt-12 text-muted">まだ記事がありません。</p>
      ) : (
        // divide-y で記事と記事の間に区切り線を入れる
        <div className="mt-8 divide-y divide-border">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </Container>
  );
}
