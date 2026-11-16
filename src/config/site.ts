// サイト全体で使う基本情報をまとめたファイル。
// サイト名やメニューを変えたいときは、ここだけを直せば全ページに反映される。

export const siteConfig = {
  // サイト名。トップページの大きなロゴでは、空白の位置で2行に分けて表示する
  name: "RYO TECH",
  // サイトの正式なURL。Vercel では本番のドメインが VERCEL_PROJECT_PRODUCTION_URL に自動で入る。
  // 手元で動かすときは localhost を使う。独自ドメインを使う場合も Vercel 側で設定すれば自動で反映される。
  url: process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000",
  description: "Web開発の学習記録、技術記事、制作したアプリケーションを発信するブログです。",
  // トップページの縦書きのキャッチコピー
  tagline: "学びを、コードと言葉で残す。",
  author: "Ryoya",
  role: "Web Developer（学習中）",
  // トップページに表示する得意分野
  focus: "Next.js / TypeScript",
  github: "https://github.com/ryoppip",
  // フッターの著作権表示に使う年
  copyrightYear: 2026,
  // ヘッダーに表示するメニュー。label は英語の名前、ja は小さく添える日本語
  nav: [
    { label: "Journal", ja: "記事", href: "/blog" },
    { label: "Works", ja: "制作実績", href: "/projects" },
    { label: "About", ja: "プロフィール", href: "/about" },
    { label: "Contact", ja: "お問い合わせ", href: "/contact" },
  ],
} as const;
