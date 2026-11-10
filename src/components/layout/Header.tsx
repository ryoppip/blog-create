import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "./Container";
import { NavLinks } from "./NavLinks";

// 全ページの上部に表示するヘッダー。
// スマートフォンではサイト名とメニューを縦に並べ、画面が広い（sm 以上）ときは横に並べる。
export function Header() {
  return (
    <header className="border-b border-border">
      <Container className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          {siteConfig.name}
        </Link>
        <nav aria-label="メインメニュー">
          <NavLinks />
        </nav>
      </Container>
    </header>
  );
}
