import { MDXRemote } from "next-mdx-remote-client/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import type { Options as PrettyCodeOptions } from "rehype-pretty-code";

// コードの色付けの設定。テーマは明るい背景に合う github-light を使う。
const prettyCodeOptions: PrettyCodeOptions = {
  theme: "github-light",
};

// MDX の本文を HTML に変換して表示する部品。
// prose は @tailwindcss/typography のクラスで、見出しや段落に読みやすい余白と文字サイズを付ける。
export async function MdxContent({ source }: { source: string }) {
  // MDX の変換処理は内部で現在時刻を読むため、そのままだとビルド時にページを事前生成できない。
  // "use cache" で変換結果を保存し、同じ本文なら毎回変換し直さずに使い回す。
  "use cache";

  return (
    <div className="prose prose-stone max-w-none prose-headings:tracking-tight prose-a:text-accent prose-code:before:content-none prose-code:after:content-none">
      <MDXRemote
        source={source}
        options={{
          // 記事内での import / export を禁止する（記事は文章とコードの表示だけに使う）
          disableImports: true,
          disableExports: true,
          mdxOptions: {
            rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
          },
        }}
      />
    </div>
  );
}
