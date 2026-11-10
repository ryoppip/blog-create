// "2026-11-11" を "2026年11月11日" の形に変える。
export function formatDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return `${year}年${month}月${day}日`;
}
