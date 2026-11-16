import { MDXRemote } from "next-mdx-remote-client/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import type { Options as PrettyCodeOptions } from "rehype-pretty-code";
import { rehypeSectionIds } from "@/lib/rehype-section-ids";
import { CodeBlock } from "./CodeBlock";

// コードの色付けの設定。コードはライトモードでも暗い背景で表示するため、暗い背景用の配色だけを使う。
const prettyCodeOptions: PrettyCodeOptions = {
  theme: "github-dark",
  // 背景色は配色のものを使わず、globals.css の --code-bg を使う
  keepBackground: false,
};

// MDX の本文を HTML に変換して表示する部品。
// prose は @tailwindcss/typography のクラスで、見出しや段落に読みやすい余白と文字サイズを付ける。
export async function MdxContent({ source }: { source: string }) {
  // MDX の変換処理は内部で現在時刻を読むため、そのままだとビルド時にページを事前生成できない。
  // "use cache" で変換結果を保存し、同じ本文なら毎回変換し直さずに使い回す。
  "use cache";

  return (
    // 本文の色や見出しの番号は globals.css の .prose で、このサイトのルールに合わせている
    <div className="prose max-w-none">
      <MDXRemote
        source={source}
        // コードブロック（<pre>）を、コピーボタン付きの部品に置き換える
        components={{ pre: CodeBlock }}
        options={{
          // 記事内での import / export を禁止する（記事は文章とコードの表示だけに使う）
          disableImports: true,
          disableExports: true,
          mdxOptions: {
            // 大見出しに目次用の id を付けてから、コードに色を付ける
            rehypePlugins: [rehypeSectionIds, [rehypePrettyCode, prettyCodeOptions]],
          },
        }}
      />
    </div>
  );
}
