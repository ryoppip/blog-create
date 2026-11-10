import Link from "next/link";
import { formatDate } from "@/lib/date";
import type { PostMeta } from "@/lib/posts";

// 記事一覧に並べる1件分のカード。
export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="py-8">
      <time dateTime={post.date} className="text-sm text-muted">
        {formatDate(post.date)}
      </time>
      <h2 className="mt-1 text-xl font-semibold tracking-tight">
        <Link
          href={`/blog/${post.slug}`}
          className="transition-colors hover:text-accent"
        >
          {post.title}
        </Link>
      </h2>
      {post.description && (
        <p className="mt-2 text-muted">{post.description}</p>
      )}
      <TagList tags={post.tags} />
    </article>
  );
}

// タグの一覧。記事詳細ページでも使う。
export function TagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;

  return (
    <ul className="mt-3 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-border px-3 py-0.5 text-xs text-muted"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
