import { Container } from "@/components/layout/Container";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description: "お問い合わせフォームです。",
  path: "/contact",
});

// Google フォームのURL。フォームを作り直したときは、ここを新しいURLに変える。
const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSedUn9iUZXwOSAW3hZ0dvglvPaOCJTpH5ynqpYY6OBNjyw8hQ/viewform";

// 埋め込むフォームの高さ（px）。
// 外部サイトの中身の高さは自動で合わせられないため、質問の数に合わせて手動で決めている。
// 質問を増やしてフォームの下が切れたら、この数字を大きくする。
const FORM_HEIGHT = 1200;

// お問い合わせページ（/contact）
export default function ContactPage() {
  return (
    <Container className="py-16 sm:py-24">
      <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
      <p className="mt-4 text-muted">
        お仕事のご相談や記事へのご感想など、お気軽にお送りください。
      </p>

      {/* iframe は、ほかのサイトのページを枠の中に表示するタグ。
          ?embedded=true を付けると、Google フォームが埋め込み用の表示になる。
          Google フォームはダークモードに対応していないため、枠の背景は常に白にしている。 */}
      <div className="mt-10 overflow-hidden rounded-lg border border-border bg-white">
        <iframe
          src={`${FORM_URL}?embedded=true`}
          title="お問い合わせフォーム"
          width="100%"
          height={FORM_HEIGHT}
          className="block w-full"
        >
          読み込んでいます…
        </iframe>
      </div>

      <p className="mt-6 text-sm text-muted">
        フォームが表示されない場合は、
        <a
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline underline-offset-4"
        >
          こちらから直接開いてください ↗
        </a>
      </p>
    </Container>
  );
}
