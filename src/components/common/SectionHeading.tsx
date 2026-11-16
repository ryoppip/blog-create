import Link from "next/link";
import styles from "./SectionHeading.module.css";

type SectionHeadingProps = {
  title: string; // 大きく表示する英語（例：Journal）
  ja: string; // 小さく添える日本語（例：記事）
  as?: "h1" | "h2"; // ページの一番上なら h1、ページの途中の区切りなら h2
  more?: { href: string; label: string }; // 右側の「すべての記事 →」のようなリンク
  onBand?: boolean; // 藍色の欄の上に置くとき true
  className?: string;
};

// 「Journal 記事」のような、大きな英語と小さな日本語を組み合わせた見出し。
// トップページの各区切りと、各ページの一番上で共通して使う。
export function SectionHeading({ title, ja, as: Tag = "h2", more, onBand, className = "" }: SectionHeadingProps) {
  return (
    <div className={`${styles.head} ${onBand ? styles.onBand : ""} ${className}`}>
      <Tag className={styles.title}>
        {title}
        <small>{ja}</small>
      </Tag>
      {more && (
        <Link href={more.href} className={styles.more}>
          {more.label}
          <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}
