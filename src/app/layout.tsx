import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/config/site";
import { baseOpenGraph } from "@/lib/metadata";
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
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        {/* flex-1 で中身が少ないページでもフッターを画面の下端に置く */}
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
