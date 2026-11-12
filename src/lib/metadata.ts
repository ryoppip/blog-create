import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

// SNS でシェアされたときの情報（Open Graph）のうち、全ページ共通の部分
export const baseOpenGraph = {
  siteName: siteConfig.name,
  locale: "ja_JP",
} as const;

type PageMetadataInput = {
  title?: string; // 省略するとサイト名がタイトルになる（トップページ用）
  description?: string;
  path: string; // "/about" のようなページのURL
};

// ページごとのタイトル、説明文、正式なURL、SNS 用の情報をまとめて作る。
// SNS 用の情報はページごとに書かないと、共通レイアウトの内容（サイト名）が全ページで使われてしまう。
export function pageMetadata({
  title,
  description = siteConfig.description,
  path,
}: PageMetadataInput): Metadata {
  return {
    // title を undefined のまま渡すと「タイトルなし」として扱われ、<title> が消えてしまう。
    // そのため、指定されたときだけ設定し、省略時は共通レイアウトのサイト名が使われるようにする。
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      ...baseOpenGraph,
      type: "website",
      title: title ?? siteConfig.name,
      description,
      url: path,
    },
  };
}
