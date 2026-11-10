// 記事ファイル（content/posts/*.mdx）を読み込む処理をまとめたファイル。
// ページ側はここの関数を呼ぶだけで、ファイルの場所や読み方を知らなくてよい。

import fs from "node:fs";
import path from "node:path";
import { getFrontmatter } from "next-mdx-remote-client/utils";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

// 記事の情報（ファイル先頭の --- で囲んだ部分）
export type PostMeta = {
  slug: string; // URL に使う名前（ファイル名から .mdx を除いたもの）
  title: string;
  date: string; // "2026-11-11" の形式
  description: string;
  tags: string[];
  draft: boolean;
};

export type Post = {
  meta: PostMeta;
  content: string; // 記事情報を除いた本文
};

type RawFrontmatter = Partial<Record<keyof Omit<PostMeta, "slug">, unknown>>;

// 1つの記事ファイルを読み込み、記事情報と本文に分ける。
// 読み込みは同期処理（readFileSync）にしている。Next.js がビルド時にそのまま静的なHTMLを作れるため。
function readPost(slug: string): Post {
  const source = fs.readFileSync(path.join(POSTS_DIR, `${slug}.mdx`), "utf-8");
  const { frontmatter, strippedSource } = getFrontmatter<RawFrontmatter>(source);

  const { title, date } = frontmatter;
  if (typeof title !== "string" || !title) {
    throw new Error(`${slug}.mdx に title がありません`);
  }
  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`${slug}.mdx の date は "2026-11-11" の形式で書いてください`);
  }

  return {
    meta: {
      slug,
      title,
      date,
      description:
        typeof frontmatter.description === "string" ? frontmatter.description : "",
      tags: Array.isArray(frontmatter.tags)
        ? frontmatter.tags.filter((tag): tag is string => typeof tag === "string")
        : [],
      draft: frontmatter.draft === true,
    },
    content: strippedSource,
  };
}

// 下書き（draft: true）は、開発中（npm run dev）だけ表示し、本番では表示しない。
function isVisible(meta: PostMeta) {
  return !meta.draft || process.env.NODE_ENV !== "production";
}

// 公開する記事の一覧を、新しい順に返す。
export function getAllPosts(): PostMeta[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => readPost(file.replace(/\.mdx$/, "")).meta)
    .filter(isVisible)
    .sort((a, b) => b.date.localeCompare(a.date));
}

// URL の slug に一致する記事を返す。見つからなければ undefined。
// 実在する記事の一覧から探すので、URL に想定外の文字が入っていても別のファイルは読まれない。
export function getPostBySlug(slug: string): Post | undefined {
  const exists = getAllPosts().some((post) => post.slug === slug);
  return exists ? readPost(slug) : undefined;
}
