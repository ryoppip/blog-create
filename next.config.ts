import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      // Tailwind の処理は通常の CSS（globals.css）だけにかける。
      // 部品ごとの CSS Modules（〇〇.module.css）まで "*.css" として扱うと、
      // 部品用のクラス名が作られず、見た目が当たらなくなるため対象から外している。
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
        condition: { not: { path: "*.module.css" } },
      },
    },
  },
};

export default nextConfig;
