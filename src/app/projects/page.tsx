import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "制作したアプリケーションの一覧です。",
};

// 制作実績一覧ページ（/projects）
export default function ProjectsPage() {
  return (
    <Container className="py-16 sm:py-24">
      <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
      <p className="mt-4 text-muted">制作したアプリケーション</p>

      {/* スマートフォンでは1列、画面が広いときは2列に並べる */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </Container>
  );
}
