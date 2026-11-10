// サイト全体で使う基本情報をまとめたファイル。
// サイト名やメニューを変えたいときは、ここだけを直せば全ページに反映される。

export const siteConfig = {
  name: "ryoppi's dev blog",
  description: "Web開発の学習記録、技術記事、制作したアプリケーションを発信するブログです。",
  author: "ryoppi",
  // フッターの著作権表示に使う年
  copyrightYear: 2026,
  // ヘッダーに表示するメニュー
  nav: [
    { label: "Blog", href: "/blog" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
