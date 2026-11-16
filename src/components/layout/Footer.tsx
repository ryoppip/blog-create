import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "./Container";

// 全ページの下部に表示するフッター。
export function Footer() {
  return (
    <footer>
      <Container className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-border pt-7 pb-10">
        <Link href="/" className="font-latin text-lg font-extrabold tracking-tight text-foreground">
          {siteConfig.name}
          <b className="text-accent-2">.</b>
        </Link>
        <nav aria-label="フッターメニュー" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub ↗
          </a>
        </nav>
        <p className="font-mono text-xs tracking-wide text-muted">
          © {siteConfig.copyrightYear} {siteConfig.author}
        </p>
      </Container>
    </footer>
  );
}
