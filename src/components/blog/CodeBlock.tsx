"use client";
// ↑ クリップボードへのコピーはブラウザで動くため、クライアントコンポーネントにしている。

import { useRef, useState, type ComponentProps } from "react";

// 記事内のコードブロック（<pre>）に、右上の「コピー」ボタンを付ける部品。
// MdxContent で、MDX の <pre> をこの部品に置き換えている。
export function CodeBlock(props: ComponentProps<"pre">) {
  const preRef = useRef<HTMLPreElement>(null);
  const [label, setLabel] = useState("コピー");

  async function copy() {
    try {
      await navigator.clipboard.writeText(preRef.current?.innerText ?? "");
      setLabel("コピーしました");
    } catch {
      setLabel("コピーできませんでした");
    }
    setTimeout(() => setLabel("コピー"), 1600);
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="absolute top-[6px] right-2 cursor-pointer rounded-[3px] border border-white/20 bg-transparent px-2.5 py-0.5 font-sans text-xs text-[#e6ecf5] transition-colors hover:border-white/60"
      >
        {label}
      </button>
      <pre ref={preRef} {...props} />
    </>
  );
}
