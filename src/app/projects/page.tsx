import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
import { ProjectFeature } from "@/components/projects/ProjectFeature";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Works",
  description: "制作したアプリケーションの一覧です。",
  path: "/projects",
});

// 制作実績一覧ページ（/projects）
export default function ProjectsPage() {
  return (
    <Container className="py-16 sm:py-24">
      <SectionHeading as="h1" title="Works" ja="制作実績" />
      <div className="grid gap-20">
        {projects.map((project) => (
          <div key={project.title} className="reveal">
            <ProjectFeature project={project} tone="plain" headingLevel="h2" />
          </div>
        ))}
      </div>
    </Container>
  );
}
