"use client";
// ↑ この部品はブラウザ側で動く「クライアントコンポーネント」。
// 現在のURLを知る usePathname はブラウザ側でしか使えないため、メニュー部分だけをここに分けている。

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex gap-5 text-sm">
      {siteConfig.nav.map((item) => {
        // /blog/記事名 のような下の階層にいるときも、Blog を現在地として扱う
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={
                isActive
                  ? "font-medium text-foreground"
                  : "text-muted transition-colors hover:text-foreground"
              }
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
