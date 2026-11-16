import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site";
import { formatDate } from "@/lib/date";
import { treeLine } from "@/lib/trees";
import { CampScene } from "./CampScene";
import styles from "./Masthead.module.css";

// 森の形はビルド時にここで計算し、景色の部品（CampScene）に渡す
const PINE_1 = treeLine({ seed: 17, base: 285, amp: 16, hill: 300, minH: 50, maxH: 110, scale: 0.75 });
const PINE_2 = treeLine({ seed: 41, base: 340, amp: 10, hill: 380, minH: 60, maxH: 140, scale: 1 });

// トップページの一番上。キャンプの景色の上に大きなロゴと縦書きのキャッチコピーを置き、
// その下に紹介文、著者、得意分野、最終更新日を並べる。
export function Masthead({ latestDate }: { latestDate?: string }) {
  // "RYO TECH" を空白の位置で2行に分ける
  const [first, ...rest] = siteConfig.name.split(" ");

  return (
    <section>
      <div className={styles.stage}>
        <CampScene pine1={PINE_1} pine2={PINE_2} />
        <Container className={styles.grid}>
          <h1 className={styles.wordmark} aria-label={siteConfig.name}>
            <span className={styles.line}>
              <span>{first}</span>
            </span>
            <span className={styles.line}>
              <span>
                {rest.join(" ")}
                <span className={styles.dot}>.</span>
              </span>
            </span>
          </h1>
          <p className={styles.tagline}>{siteConfig.tagline}</p>
        </Container>
      </div>

      <Container>
        <div className={styles.info}>
          <p>
            Web開発を学ぶ {siteConfig.author} の技術ブログです。学習の記録、技術記事、制作したアプリケーションを発信しています。
          </p>
          <dl>
            <dt>WRITER</dt>
            <dd>{siteConfig.author}</dd>
          </dl>
          <dl>
            <dt>FOCUS</dt>
            <dd>{siteConfig.focus}</dd>
          </dl>
          <dl>
            <dt>LATEST</dt>
            <dd>{latestDate ? `${formatDate(latestDate)} 更新` : "—"}</dd>
          </dl>
        </div>
      </Container>
    </section>
  );
}
