import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
import { ProjectFeature } from "@/components/projects/ProjectFeature";
import type { Project } from "@/data/projects";
import { treeLine } from "@/lib/trees";
import { Spotlight } from "./Spotlight";
import styles from "./WorksBand.module.css";

// 欄の下に並べる森の形（ビルド時に計算する）
const TREES = treeLine({ seed: 7, base: 392, amp: 10, hill: 300, minH: 110, maxH: 250, scale: 1.15 });

// トップページの制作実績の欄。藍色の背景に、注目の実績を大きく表示する。
export function WorksBand({ projects }: { projects: Project[] }) {
  return (
    <Spotlight className={styles.band}>
      <svg className={styles.trees} viewBox="0 0 2000 400" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <path d={TREES} />
      </svg>
      <div className={styles.spot} aria-hidden="true" />
      <Container className={styles.inner}>
        <SectionHeading title="Works" ja="制作実績" more={{ href: "/projects", label: "すべての制作実績" }} onBand />
        {projects.map((project) => (
          <ProjectFeature key={project.title} project={project} tone="band" />
        ))}
      </Container>
    </Spotlight>
  );
}
