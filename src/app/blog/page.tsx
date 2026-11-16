import { JournalIndex } from "@/components/blog/JournalIndex";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
import { pageMetadata } from "@/lib/metadata";
import { getAllPosts, getTagCounts } from "@/lib/posts";

export const metadata = pageMetadata({
  title: "Journal",
  description: "技術記事と学習記録の一覧です。",
  path: "/blog",
});

// 記事一覧ページ（/blog）
export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Container className="py-16 sm:py-24">
      <SectionHeading as="h1" title="Journal" ja="記事" />
      <JournalIndex posts={posts} tags={getTagCounts(posts)} />
    </Container>
  );
}
