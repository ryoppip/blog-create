import { JournalIndex } from "@/components/blog/JournalIndex";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ContactLink } from "@/components/home/ContactLink";
import { Masthead, SiteFacts } from "@/components/home/Masthead";
import { WorksBand } from "@/components/home/WorksBand";
import { Container } from "@/components/layout/Container";
import { ProfileSummary } from "@/components/profile/ProfileSummary";
import { featuredProjects } from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";
import { getAllPosts, getTagCounts } from "@/lib/posts";

export const metadata = pageMetadata({ path: "/" });

// トップページに表示する最新記事の件数
const LATEST_POST_COUNT = 5;

// トップページ（/）
// 上から順に、大きなロゴとキャンプの景色、記事一覧、制作実績、プロフィール、お問い合わせを並べる。
export default function Home() {
  const posts = getAllPosts();
  // 記事一覧は新しい順に並んでいるので、先頭から5件を取り出す
  const latest = posts.slice(0, LATEST_POST_COUNT);

  return (
    <>
      <Masthead latestDate={posts[0]?.date} />

      {/* スマートフォンでは、ロゴの下の紹介文との間を詰めるため上の余白を小さくする */}
      <section className="py-28 max-sm:pt-10 max-sm:pb-20">
        <Container>
          <SectionHeading
            title="Journal"
            ja="記事"
            more={{ href: "/blog", label: "すべての記事" }}
            className="reveal"
          />
          <JournalIndex posts={latest} tags={getTagCounts(latest)} />
          {/* 著者、得意分野、最終更新日（スマートフォンでだけ、ここに表示する） */}
          <SiteFacts latestDate={posts[0]?.date} />
        </Container>
      </section>

      {featuredProjects.length > 0 && <WorksBand projects={featuredProjects} />}

      <section className="py-28 max-sm:py-20">
        <Container>
          <SectionHeading title="About" ja="プロフィール" className="reveal" />
          <div className="reveal">
            <ProfileSummary showLink />
          </div>
        </Container>
      </section>

      <section className="pb-28 max-sm:pb-20">
        <Container className="reveal">
          <ContactLink />
        </Container>
      </section>
    </>
  );
}
