// 記事本文の大見出し（h2）に、上から順に "sec-1"、"sec-2"…という id を付ける小さなプラグイン。
// 目次のリンク（src/lib/posts.ts の getHeadings）から、その見出しへ移動できるようにするために使う。
// MDX を HTML に変換する途中の「木構造（hast）」をたどって、h2 を見つけたら id を付けている。

type HastNode = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

export function rehypeSectionIds() {
  return (tree: HastNode) => {
    let count = 0;
    const visit = (node: HastNode) => {
      if (node.type === "element" && node.tagName === "h2") {
        count += 1;
        node.properties = { ...node.properties, id: `sec-${count}` };
      }
      node.children?.forEach(visit);
    };
    visit(tree);
  };
}
