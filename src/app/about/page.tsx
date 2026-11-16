import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
import { ProfileSummary } from "@/components/profile/ProfileSummary";
import { siteConfig } from "@/config/site";
import { profile } from "@/data/profile";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About",
  description: `${siteConfig.author}のプロフィールです。`,
  path: "/about",
});

// プロフィールページ（/about）
// 内容は src/data/profile.ts にまとめてある。
export default function AboutPage() {
  return (
    <Container className="py-16 sm:py-24">
      <SectionHeading as="h1" title="About" ja="プロフィール" />
      <ProfileSummary>
        <div>
          <h2 className="mb-3 font-display text-lg">学んでいること</h2>
          <ul className="grid list-disc gap-1 pl-5 marker:text-accent-2">
            {profile.learning.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </ProfileSummary>
    </Container>
  );
}
