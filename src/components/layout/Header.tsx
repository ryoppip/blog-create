import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "./Container";
import { NavLinks } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";

// 全ページの上部に表示するヘッダー。
// スマートフォンではサイト名とメニューを縦に並べ、画面が広い（sm 以上）ときは横に並べる。
// 見た目の作り込みは、デザイン改善の段階2で行う。
export function Header() {
  return (
    <header className="border-b border-border">
      <Container className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight">
            {siteConfig.name}
          </Link>
          {/* スマートフォンでは、表示モードの切り替えボタンをサイト名の右に置く */}
          <div className="sm:hidden">
            <ThemeToggle />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <nav aria-label="メインメニュー">
            <NavLinks />
          </nav>
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
}
