import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleToc } from "@/components/blog/ArticleToc";
import { MdxContent } from "@/components/blog/MdxContent";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site";
import { profile } from "@/data/profile";
import { formatDate } from "@/lib/date";
import { pageMetadata } from "@/lib/metadata";
import { getAllPosts, getHeadings, getNextPost, getPostBySlug } from "@/lib/posts";
import styles from "./article.module.css";

// 実在する記事はすべて下の generateStaticParams で事前生成されるので、移動は速いまま。
// 事前生成されていないURLでは表示を待ってもよいページとして設定し、Suspense の読み込み表示を不要にする。
export const instant = false;

// ビルド時に、どの記事のページを作るかを Next.js に伝える。
// ここで返した slug の数だけ、/blog/[slug] のHTMLが事前に作られる。
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// 記事ごとにブラウザのタブのタイトルと説明文を設定する。
export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const base = pageMetadata({
    title: post.meta.title,
    description: post.meta.description || undefined,
    path: `/blog/${post.meta.slug}`,
  });

  return {
    ...base,
    // SNS 用の情報を「記事」として上書きし、公開日も伝える
    openGraph: { ...base.openGraph, type: "article", publishedTime: post.meta.date },
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
  const next = getNextPost(meta.slug);

  return (
    <article className={styles.article}>
      <Container>
        <Link href="/blog" className={styles.back}>
          <span aria-hidden="true">←</span>Journal
        </Link>

        <header className={styles.head}>
          {meta.tags.length > 0 && (
            <div className={styles.tags}>
              {meta.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          )}
          <h1 className={styles.title}>{meta.title}</h1>
        </header>

        <dl className={styles.meta}>
          <div>
            <dt>公開日</dt>
            <dd>
              <time dateTime={meta.date}>{formatDate(meta.date)}</time>
            </dd>
          </div>
          <div>
            <dt>読了時間</dt>
            <dd>約{meta.minutes}分</dd>
          </div>
          <div>
            <dt>著者</dt>
            <dd>{siteConfig.author}</dd>
          </div>
        </dl>

        <div className={styles.body}>
          <ArticleToc headings={getHeadings(content)} />
          <div>
            <MdxContent source={content} />

            <div className={styles.end}>
              <div className={styles.author}>
                <div>
                  <strong>{siteConfig.author}</strong>
                  <p>{profile.intro}</p>
                </div>
                <Link href="/about" className={styles.authorLink}>
                  プロフィール<span aria-hidden="true">→</span>
                </Link>
              </div>
              {next && (
                <Link href={`/blog/${next.slug}`} className={styles.next}>
                  <span className={styles.nextLabel}>NEXT ARTICLE</span>
                  <h2 className={styles.nextTitle}>
                    {next.title}
                    <span aria-hidden="true">→</span>
                  </h2>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}
