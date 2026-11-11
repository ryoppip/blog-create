// 制作実績のデータ。新しい実績はこの配列に1件ずつ追加する。
// 型（Project）を決めておくと、項目の書き忘れや書き間違いをエディタが教えてくれる。

export type Project = {
  title: string;
  description: string;
  techs: string[]; // 使用技術
  github?: string; // ソースコードのURL（? は「書かなくてもよい」という意味）
  url?: string; // 公開先のURL
  featured?: boolean; // true にするとトップページにも表示する
};

export const projects: Project[] = [
  {
    title: "RYO TECH",
    description:
      "このサイトです。Web開発の学習記録と制作実績を発信する個人ブログとして作りました。記事はMDXで管理しています。",
    techs: ["Next.js", "React", "TypeScript", "Tailwind CSS", "MDX"],
    github: "https://github.com/ryoppip/blog-create",
    featured: true,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
