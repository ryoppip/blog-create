// 制作実績のデータ。新しい実績はこの配列に1件ずつ追加する。
// 型（Project）を決めておくと、項目の書き忘れや書き間違いをエディタが教えてくれる。

export type Project = {
  title: string;
  description: string;
  kind: string; // 種類（例：個人ブログ兼ポートフォリオ）
  role: string; // 担当した範囲
  techs: string[]; // 使用技術
  year: number; // 制作した年
  host?: string; // 公開先（? は「書かなくてもよい」という意味）
  github?: string; // ソースコードのURL
  url?: string; // 公開先のURL
  featured?: boolean; // true にするとトップページにも表示する
};

export const projects: Project[] = [
  {
    title: "RYO TECH",
    description:
      "このサイトです。Web開発の学習記録と制作実績を発信する個人ブログとして、設計から公開まで自分で作りました。",
    kind: "個人ブログ兼ポートフォリオ",
    role: "設計、デザイン、実装、公開",
    techs: ["Next.js", "React", "TypeScript", "Tailwind CSS", "MDX"],
    year: 2026,
    host: "Vercel",
    url: "https://blog-create-seven.vercel.app/",
    github: "https://github.com/ryoppip/blog-create",
    featured: true,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
