import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site";

// トップページ。ステップ4で最新記事や制作実績を追加する。
export default function Home() {
  return (
    <Container className="py-16 sm:py-24">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {siteConfig.name}
      </h1>
      <p className="mt-4 text-muted">{siteConfig.description}</p>
    </Container>
  );
}
