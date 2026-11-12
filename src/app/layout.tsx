import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_JP } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/config/site";
import { baseOpenGraph } from "@/lib/metadata";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import "./globals.css";

// next/font はフォントを自動で最適化して読み込む仕組み。
// variable で指定した名前の CSS 変数として globals.css から使う。
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 日本語フォント。日本語の文字は数が多いため、ページで使われている文字の分だけが自動で読み込まれる。
// 先読み（preload）は英数字部分だけにして、最初の表示を重くしないようにしている。
const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

// ブラウザのタブや検索結果に表示される情報。
// 各ページで title を指定すると「ページ名 | サイト名」の形になる。
export const metadata: Metadata = {
  // SNS 用の画像URLなどを、/blog のような相対パスで書けるようにする基準のURL
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  // SNS でシェアされたときの情報（Open Graph）の共通部分。
  // ページごとの内容は、各ページで src/lib/metadata.ts の pageMetadata を使って設定する。
  openGraph: { ...baseOpenGraph, type: "website" },
};

// 全ページ共通の枠。children に各ページの中身が入る。
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning：下のスクリプトが html に data-theme を付けるため、
    // サーバーで作った HTML と違っても警告を出さないようにする
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansJp.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* 保存された表示モード（ライト/ダーク）を、画面を描く前に反映する。
            ページを開いた瞬間に色が切り替わる「ちらつき」を防ぐ。 */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col">
        <Header />
        {/* flex-1 で中身が少ないページでもフッターを画面の下端に置く */}
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
