import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// /robots.txt を作る。検索エンジンに、すべてのページを巡回してよいことと、サイトマップの場所を伝える。
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
