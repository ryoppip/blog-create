import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { profile } from "@/data/profile";
import styles from "./ProfileSummary.module.css";

type ProfileSummaryProps = {
  showLink?: boolean; // 「プロフィールを詳しく見る →」を表示するか（トップページでは表示する）
  children?: ReactNode; // /about ページで、一覧の下に追加で表示する内容
};

// プロフィールの要約。トップページの About 欄と /about ページの両方で使う。
export function ProfileSummary({ showLink = false, children }: ProfileSummaryProps) {
  const facts = [{ label: "名前", value: siteConfig.author }, ...profile.facts];

  return (
    <div className={styles.about}>
      <p className={styles.statement}>
        {profile.statement.map((line, index) => (
          <span key={line}>
            {index > 0 && <br />}
            {highlight(line, profile.emphasis)}
          </span>
        ))}
      </p>
      <div className={styles.side}>
        <p>{profile.intro}</p>
        <dl className={styles.facts}>
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
          <div>
            <dt>リンク</dt>
            <dd>
              <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                GitHub ↗
              </a>
            </dd>
          </div>
        </dl>
        {children}
        {profile.isPlaceholder && <span className={styles.placeholder}>プロフィールの文章は仮の内容です</span>}
        {showLink && (
          <Link href="/about" className={styles.link}>
            プロフィールを詳しく見る<span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </div>
  );
}

// 文章の中の強調したい言葉だけを、藍色の <em> で囲む
function highlight(text: string, word: string) {
  const index = text.indexOf(word);
  if (!word || index === -1) return text;
  return (
    <>
      {text.slice(0, index)}
      <em>{word}</em>
      {text.slice(index + word.length)}
    </>
  );
}
