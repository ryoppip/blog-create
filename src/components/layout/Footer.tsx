import { siteConfig } from "@/config/site";
import { Container } from "./Container";

// 全ページの下部に表示するフッター。
export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="py-8 text-sm text-muted">
        <p>
          © {siteConfig.copyrightYear} {siteConfig.author}
        </p>
      </Container>
    </footer>
  );
}
