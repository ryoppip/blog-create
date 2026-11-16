"use client";
// ↑ メニューの開閉やスクロールへの反応はブラウザで動くため、クライアントコンポーネントにしている。

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { Container } from "./Container";
import styles from "./Header.module.css";
import { ThemeToggle } from "./ThemeToggle";

// 全ページの上部に表示するヘッダー。
// ・スクロールしても画面の上に残り、下へスクロールすると隠れ、上へ戻ると現れる
// ・スマートフォンでは、メニューボタンから開く形になる
// ・記事ページでは、下端の線で読み進めた割合を示す
export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  const [progress, setProgress] = useState(0);

  // /blog/記事名 のような下の階層にいるときも、Journal を現在地として扱う
  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const isArticle = pathname.startsWith("/blog/");

  useEffect(() => {
    // 動きを減らす設定の人には、ヘッダーを隠す動きを使わない
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setScrollingDown(!reduceMotion && y > lastY && y > 200);
      lastY = y;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`${styles.header} ${scrollingDown && !menuOpen ? styles.hidden : ""}`}>
      <Container className={styles.bar}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          {siteConfig.name}
          <b>.</b>
        </Link>

        <nav className={styles.nav} aria-label="メインメニュー">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
            >
              {item.label}
              <small>{item.ja}</small>
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true">
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </Container>

      {menuOpen && (
        <div className={styles.mobileMenu} id="mobile-menu">
          <Container>
            <nav aria-label="メインメニュー（スマートフォン）">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                >
                  {item.label} <span>{item.ja}</span>
                </Link>
              ))}
            </nav>
          </Container>
        </div>
      )}

      {isArticle && (
        <div
          className={styles.progress}
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
