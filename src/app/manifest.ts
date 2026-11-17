import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { APP_ICON_BACKGROUND } from "@/lib/app-icon";

// /manifest.webmanifest を作る。Android などで「ホーム画面に追加」したときの名前やアイコンを、ブラウザに伝えるファイル。
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name, // ホーム画面のアイコンの下に出る名前
    description: siteConfig.description,
    start_url: "/",
    display: "standalone", // ホーム画面から開いたとき、ブラウザの枠を出さずアプリのように表示する
    background_color: APP_ICON_BACKGROUND,
    theme_color: "#17385a",
    icons: [
      { src: "/icon/192", sizes: "192x192", type: "image/png" },
      { src: "/icon/512", sizes: "512x512", type: "image/png" },
      // maskable：Android が丸や角丸の形に切り抜いて表示してもよいアイコン
      { src: "/icon/512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
