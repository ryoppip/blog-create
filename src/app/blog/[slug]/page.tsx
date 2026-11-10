import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/blog/MdxContent";
import { TagList } from "@/components/common/TagList";
import { Container } from "@/components/layout/Container";
import { formatDate } from "@/lib/date";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

// 実在する記事はすべて下の generateStaticParams で事前生成されるので、移動は速いまま。
// 事前生成されていないURLでは表示を待ってもよいページとして設定し、Suspense の読み込み表示を不要にする。
// 注意：存在しない記事は本番では 404 ページの中身と noindex で返るが、HTTP ステータスは 200 になる（Next.js の仕様）。
export const instant = false;

// ビルド時に、どの記事のページを作るかを Next.js に伝える。
// ここで返した slug の数だけ、/blog/[slug] のHTMLが事前に作られる。
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// 記事ごとにブラウザのタブのタイトルと説明文を設定する。
export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.meta.title,
    description: post.meta.description,
  };
}

// 記事詳細ページ（/blog/記事名）
export default async function PostPage(props: PageProps<"/blog/[slug]">) {
  // URL の [slug] の部分を受け取る（Next.js 16 では await が必要）
  const { slug } = await props.params;
  const post = getPostBySlug(slug);

  // 存在しない記事なら 404 ページを表示する
  if (!post) notFound();

  const { meta, content } = post;

  return (
    <Container className="py-16 sm:py-24">
      <article>
        <header className="border-b border-border pb-8">
          <time dateTime={meta.date} className="text-sm text-muted">
            {formatDate(meta.date)}
          </time>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {meta.title}
          </h1>
          <TagList tags={meta.tags} />
        </header>
        <div className="mt-10">
          <MdxContent source={content} />
        </div>
      </article>
      <Link
        href="/blog"
        className="mt-16 inline-block text-sm text-accent underline underline-offset-4"
      >
        ← 記事一覧へ戻る
      </Link>
    </Container>
  );
}
