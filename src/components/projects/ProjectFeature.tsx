import type { Project } from "@/data/projects";
import styles from "./ProjectFeature.module.css";

type ProjectFeatureProps = {
  project: Project;
  tone: "band" | "plain"; // 藍色の欄の上なら band、通常の背景なら plain
  headingLevel?: "h2" | "h3";
};

// 制作実績1件分。左に作品名と説明、右に種類や使用技術などの一覧を並べる。
export function ProjectFeature({ project, tone, headingLevel: Heading = "h3" }: ProjectFeatureProps) {
  const details = [
    { label: "種類", value: project.kind },
    { label: "使用技術", value: project.techs.join(" / ") },
    { label: "担当", value: project.role },
    ...(project.host ? [{ label: "公開先", value: project.host }] : []),
  ];

  return (
    <article className={`${styles.work} ${styles[tone]}`}>
      <div>
        <span className={styles.kicker}>
          {project.featured ? "FEATURED · " : ""}
          {project.year}
        </span>
        <Heading className={styles.title}>{project.title}</Heading>
        <p className={styles.description}>{project.description}</p>
        {(project.url || project.github) && (
          <div className={styles.links}>
            {project.url && <ExternalPill href={project.url}>サイトを見る</ExternalPill>}
            {project.github && <ExternalPill href={project.github}>GitHub</ExternalPill>}
          </div>
        )}
      </div>
      <dl className={styles.details}>
        {details.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

// 外部サイトへのリンク。新しいタブで開く。
// rel="noopener noreferrer" は、開いた先のページから元のページを操作されないようにする安全対策。
function ExternalPill({ href, children }: { href: string; children: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.pill}>
      {children} ↗
    </a>
  );
}
