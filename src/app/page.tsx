import Link from "next/link";
import type { ReactNode } from "react";
import { PostCard } from "@/components/blog/PostCard";
import { Container } from "@/components/layout/Container";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { siteConfig } from "@/config/site";
import { featuredProjects } from "@/data/projects";
import { getAllPosts } from "@/lib/posts";

// トップページに表示する最新記事の件数
const LATEST_POST_COUNT = 3;

// トップページ（/）
export default function Home() {
  // 記事一覧は新しい順に並んでいるので、先頭から3件を取り出す
  const latestPosts = getAllPosts().slice(0, LATEST_POST_COUNT);

  return (
    <Container className="py-16 sm:py-24">
      {/* 自己紹介 */}
      <section>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {siteConfig.name}
        </h1>
        <p className="mt-4 text-muted">{siteConfig.description}</p>
        <Link
          href="/about"
          className="mt-6 inline-block text-sm text-accent underline underline-offset-4"
        >
          プロフィールを見る →
        </Link>
      </section>

      <Section title="最新の記事" moreHref="/blog" moreLabel="記事一覧へ">
        {latestPosts.length === 0 ? (
          <p className="mt-6 text-muted">まだ記事がありません。</p>
        ) : (
          <div className="divide-y divide-border">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </Section>

      {featuredProjects.length > 0 && (
        <Section title="制作実績" moreHref="/projects" moreLabel="制作実績一覧へ">
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </Section>
      )}
    </Container>
  );
}

// 見出しと「一覧へ」のリンクが付いた、トップページの区切り。
function Section({
  title,
  moreHref,
  moreLabel,
  children,
}: {
  title: string;
  moreHref: string;
  moreLabel: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-20">
      <div className="flex items-baseline justify-between border-b border-border pb-3">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <Link
          href={moreHref}
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          {moreLabel} →
        </Link>
      </div>
      {children}
    </section>
  );
}
