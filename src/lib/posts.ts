// 記事ファイル（content/posts/*.mdx）を読み込む処理をまとめたファイル。
// ページ側はここの関数を呼ぶだけで、ファイルの場所や読み方を知らなくてよい。

import fs from "node:fs";
import path from "node:path";
import { getFrontmatter } from "next-mdx-remote-client/utils";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

// 日本語の文章を1分間に読める文字数の目安。読了時間の計算に使う
const CHARS_PER_MINUTE = 500;

// 記事の情報（ファイル先頭の --- で囲んだ部分と、本文から計算した読了時間）
export type PostMeta = {
  slug: string; // URL に使う名前（ファイル名から .mdx を除いたもの）
  title: string;
  date: string; // "2026-11-11" の形式
  description: string;
  tags: string[];
  draft: boolean;
  minutes: number; // 読了時間（分）
};

export type Post = {
  meta: PostMeta;
  content: string; // 記事情報を除いた本文
};

// 目次に使う大見出し（## で書いた見出し）
export type Heading = {
  id: string; // 記事ページで見出しに付く id（src/lib/rehype-section-ids.ts と同じ付け方）
  text: string;
};

type RawFrontmatter = Partial<Record<keyof Omit<PostMeta, "slug" | "minutes">, unknown>>;

// コードブロック（``` で囲んだ部分）を除いた本文の行を返す
function proseLines(content: string) {
  let inCode = false;
  return content.split("\n").filter((line) => {
    if (line.trimStart().startsWith("```")) {
      inCode = !inCode;
      return false;
    }
    return !inCode;
  });
}

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

  const chars = proseLines(strippedSource).join("").replace(/\s/g, "").length;

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
      minutes: Math.max(1, Math.round(chars / CHARS_PER_MINUTE)),
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

// 記事一覧の次（1つ古い記事）を返す。記事ページの最後の「次の記事」に使う。
// いちばん古い記事のときは、いちばん新しい記事に戻る。記事が1本だけなら undefined。
export function getNextPost(slug: string): PostMeta | undefined {
  const posts = getAllPosts();
  if (posts.length < 2) return undefined;
  const index = posts.findIndex((post) => post.slug === slug);
  return posts[(index + 1) % posts.length];
}

// タグごとの記事数を、記事数の多い順に返す。記事一覧の絞り込みボタンに使う。
export function getTagCounts(posts: PostMeta[]) {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts].map(([tag, count]) => ({ tag, count })).sort((a, b) => b.count - a.count);
}

// 本文から大見出し（## で始まる行）を取り出す。目次に使う。
export function getHeadings(content: string): Heading[] {
  return proseLines(content)
    .map((line) => line.match(/^##\s+(.+?)\s*$/)?.[1])
    .filter((text): text is string => Boolean(text))
    .map((text, index) => ({
      id: `sec-${index + 1}`,
      // `コード` や **太字** などの記号を取り除いて、目次には文字だけを表示する
      text: text.replace(/[`*_]/g, ""),
    }));
}
