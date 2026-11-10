import { TagList } from "@/components/common/TagList";
import type { Project } from "@/data/projects";

// 制作実績1件分のカード。
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="rounded-lg border border-border bg-white p-6">
      <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
      <p className="mt-2 text-sm text-muted">{project.description}</p>
      <TagList tags={project.techs} />

      {(project.github || project.url) && (
        <div className="mt-5 flex gap-5 text-sm">
          {project.url && <ExternalLink href={project.url}>サイトを見る</ExternalLink>}
          {project.github && <ExternalLink href={project.github}>GitHub</ExternalLink>}
        </div>
      )}
    </article>
  );
}

// 外部サイトへのリンク。新しいタブで開く。
// rel="noopener noreferrer" は、開いた先のページから元のページを操作されないようにする安全対策。
function ExternalLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent underline underline-offset-4"
    >
      {children} ↗
    </a>
  );
}
