import Link from "next/link";
import styles from "./ContactLink.module.css";

// トップページの最後に置く、お問い合わせページへの大きなリンク。
export function ContactLink() {
  return (
    <Link href="/contact" className={styles.link}>
      <span className={styles.big}>お問い合わせ</span>
      <span className={styles.side}>
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
        ご意見・ご感想をお待ちしています
      </span>
    </Link>
  );
}
