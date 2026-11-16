// "2026-11-11" を "2026.11.11" の形に変える。
export function formatDate(date: string) {
  return date.replaceAll("-", ".");
}
