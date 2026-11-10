import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: `${siteConfig.author}のプロフィールです。`,
};

// 使える技術。分野ごとにまとめて表示する。
const skills = [
  { category: "フロントエンド", items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"] },
  { category: "ツール", items: ["Git", "GitHub", "VS Code"] },
];

// プロフィールページ（/about）
// 【仮の内容】自己紹介と学習内容は、ご自身の内容に書き換えてください。
export default function AboutPage() {
  return (
    <Container className="py-16 sm:py-24">
      <h1 className="text-3xl font-bold tracking-tight">About</h1>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">{siteConfig.author}</h2>
        <p className="mt-4">
          Web開発を学んでいます。学習の過程でつまずいたことや調べたことを、このブログで記録しています。
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">学習中のこと</h2>
        <ul className="mt-4 list-disc space-y-1 pl-5">
          <li>Next.js と React でのWebアプリケーション開発</li>
          <li>TypeScript による型を使った開発</li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">使える技術</h2>
        <dl className="mt-4 space-y-4">
          {skills.map((skill) => (
            <div key={skill.category}>
              <dt className="text-sm font-medium text-muted">{skill.category}</dt>
              <dd className="mt-1">{skill.items.join(" / ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">リンク</h2>
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-accent underline underline-offset-4"
        >
          GitHub ↗
        </a>
      </section>
    </Container>
  );
}
