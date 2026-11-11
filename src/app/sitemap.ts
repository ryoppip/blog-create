import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllPosts } from "@/lib/posts";

// /sitemap.xml を作る。検索エンジンに、サイトにあるページの一覧を伝えるためのファイル。
// 記事を追加すると、次のビルドで自動的に一覧に加わる。
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/blog", "/projects", "/about", "/contact"].map((path) => ({
    url: `${siteConfig.url}${path}`,
  }));

  const posts = getAllPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.date,
  }));

  return [...pages, ...posts];
}
