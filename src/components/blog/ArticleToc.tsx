"use client";
// ↑ 今読んでいる見出しを調べる処理はブラウザで動くため、クライアントコンポーネントにしている。

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/posts";
import styles from "./ArticleToc.module.css";

// 記事の目次。見出しには本文と同じ「01」「02」…の番号を付ける。
// PCでは今読んでいる見出しを強調し、スマートフォンでは開閉できる形で表示する。
export function ArticleToc({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState(headings[0]?.id);

  useEffect(() => {
    // 見出しが画面の上のほう（上から15%〜30%の帯）に入ったら、その見出しを「読んでいる場所」にする
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px" },
    );
    for (const heading of headings) {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return <aside aria-hidden="true" />;

  const number = (index: number) => String(index + 1).padStart(2, "0");

  return (
    <aside>
      <nav className={styles.toc} aria-label="目次">
        <span className={styles.label}>CONTENTS</span>
        {headings.map((heading, index) => (
          <a key={heading.id} href={`#${heading.id}`} aria-current={heading.id === activeId ? "true" : undefined}>
            <span className={styles.number}>{number(index)}</span>
            <span>{heading.text}</span>
          </a>
        ))}
      </nav>
      <details className={styles.mobile}>
        <summary>目次</summary>
        <ol>
          {headings.map((heading) => (
            <li key={heading.id}>
              <a href={`#${heading.id}`}>{heading.text}</a>
            </li>
          ))}
        </ol>
      </details>
    </aside>
  );
}
