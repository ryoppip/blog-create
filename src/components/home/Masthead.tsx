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
          {/* スマートフォンでは、1文ずつ改行して読みやすくする（Masthead.module.css の .sentence） */}
          <p className={styles.intro}>
            <span className={styles.sentence}>Web開発を学ぶITエンジニアの技術ブログです。</span>
            <span className={styles.sentence}>学習の記録、技術記事、制作したアプリケーションを発信しています。</span>
          </p>
          {/* PCでは紹介文の横に並べる。スマートフォンでは隠し、記事一覧の下の SiteFacts で表示する */}
          {siteFacts(latestDate).map((fact) => (
            <dl key={fact.label} className={styles.desktopOnly}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </dl>
          ))}
        </div>
      </Container>
    </section>
  );
}

// 著者、得意分野、最終更新日の3項目。PC用とスマートフォン用で同じ内容を使う
function siteFacts(latestDate?: string) {
  return [
    { label: "WRITER", value: siteConfig.author },
    { label: "FOCUS", value: siteConfig.focus },
    { label: "LATEST", value: latestDate ? `${formatDate(latestDate)} 更新` : "—" },
  ];
}

// スマートフォンでだけ表示する3項目。トップページの記事一覧の下に置く
export function SiteFacts({ latestDate }: { latestDate?: string }) {
  return (
    <div className={styles.mobileFacts}>
      {siteFacts(latestDate).map((fact) => (
        <dl key={fact.label}>
          <dt>{fact.label}</dt>
          <dd>{fact.value}</dd>
        </dl>
      ))}
    </div>
  );
}
