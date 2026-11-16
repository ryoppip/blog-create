"use client";
// ↑ 分類のボタンで絞り込む処理はブラウザで動くため、クライアントコンポーネントにしている。

import Link from "next/link";
import { useState } from "react";
import { formatDate } from "@/lib/date";
import type { PostMeta } from "@/lib/posts";
import styles from "./JournalIndex.module.css";

type JournalIndexProps = {
  posts: PostMeta[];
  tags: { tag: string; count: number }[]; // 絞り込みボタンに並べる分類と記事数
};

// 記事一覧。画像を使わず、大きな文字の目次のように並べる。
// トップページと /blog の両方で使う。
export function JournalIndex({ posts, tags }: JournalIndexProps) {
  // 選んでいる分類。null のときは「すべて」
  const [selected, setSelected] = useState<string | null>(null);
  const shown = selected ? posts.filter((post) => post.tags.includes(selected)) : posts;

  return (
    <>
      {tags.length > 0 && (
        <div className={styles.filters} role="group" aria-label="分類で絞り込む">
          <button
            type="button"
            className={styles.filter}
            aria-pressed={selected === null}
            onClick={() => setSelected(null)}
          >
            すべて<sup>{posts.length}</sup>
          </button>
          {tags.map(({ tag, count }) => (
            <button
              key={tag}
              type="button"
              className={styles.filter}
              aria-pressed={selected === tag}
              onClick={() => setSelected(tag)}
            >
              {tag}
              <sup>{count}</sup>
            </button>
          ))}
        </div>
      )}

      {shown.length === 0 ? (
        <p className={styles.empty}>まだ記事がありません。</p>
      ) : (
        <ul className={styles.list}>
          {shown.map((post) => (
            <li key={post.slug} className="reveal">
              <Link href={`/blog/${post.slug}`} className={styles.row}>
                <span className={styles.meta}>
                  <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.minutes} MIN
                </span>
                <div>
                  <h3 className={styles.title}>{post.title}</h3>
                  {post.description && <p className={styles.description}>{post.description}</p>}
                </div>
                <span className={styles.tags}>
                  {post.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </span>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
