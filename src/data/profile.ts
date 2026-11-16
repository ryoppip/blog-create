// プロフィールの内容。トップページの About 欄と /about ページの両方で使う。
// 【仮の内容】自己紹介や経歴は、ご自身の内容に書き換えてください。

export const profile = {
  // 大きく表示する一文。改行したい位置で配列を分ける。強調する言葉は emphasis に書く
  statement: ["作りながら学び、", "学んだことを共有する。"],
  emphasis: "共有",
  intro:
    "Web開発を学んでいます。学習の過程でつまずいたことや調べたことを、このブログで記録しています。",
  facts: [
    { label: "学習中の技術", value: "Next.js / TypeScript" },
    { label: "使っている技術", value: "React / Tailwind CSS / Git" },
    { label: "使っているツール", value: "VS Code / GitHub" },
  ],
  // 学んでいること（/about ページで箇条書きにする）
  learning: ["Next.js と React でのWebアプリケーション開発", "TypeScript による型を使った開発"],
  isPlaceholder: true, // 本当の内容に書き換えたら false にする（「仮の内容です」の表示が消える）
};
