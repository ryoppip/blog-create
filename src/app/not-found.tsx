import Link from "next/link";
import { Container } from "@/components/layout/Container";

// 存在しないURLにアクセスしたときに表示するページ。
export default function NotFound() {
  return (
    <Container className="py-20 sm:py-28">
      <p className="font-latin text-[clamp(96px,18vw,220px)] leading-[0.85] font-extrabold tracking-[-0.045em] text-foreground">
        404<b className="text-accent-2">.</b>
      </p>
      <h1 className="mt-10 font-display text-2xl">ページが見つかりません</h1>
      <p className="mt-4 text-muted">お探しのページは移動または削除された可能性があります。</p>
      <Link href="/" className="mt-10 inline-flex gap-2 font-medium text-foreground underline underline-offset-4">
        トップページへ戻る
      </Link>
    </Container>
  );
}
