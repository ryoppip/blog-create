import Link from "next/link";
import { Container } from "@/components/layout/Container";

// 存在しないURLにアクセスしたときに表示するページ。
export default function NotFound() {
  return (
    <Container className="py-16 sm:py-24">
      <p className="text-sm font-medium text-accent">404</p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight">
        ページが見つかりません
      </h1>
      <p className="mt-4 text-muted">
        お探しのページは移動または削除された可能性があります。
      </p>
      <Link
        href="/"
        className="mt-8 inline-block text-accent underline underline-offset-4"
      >
        トップページへ戻る
      </Link>
    </Container>
  );
}
