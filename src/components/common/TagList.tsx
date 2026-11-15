// タグや使用技術を小さなラベルで並べる部品。ブログ記事と制作実績の両方で使う。
export function TagList({ tags }: { tags: readonly string[] }) {
  if (tags.length === 0) return null;

  return (
    <ul className="mt-3 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-sm bg-accent-soft px-2.5 py-0.5 text-xs text-accent"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
