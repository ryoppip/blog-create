"use client";
// ↑ ボタンを押したときの処理はブラウザで動くため、クライアントコンポーネントにしている。

import { THEME_STORAGE_KEY } from "@/lib/theme";

// ライトモードとダークモードを切り替えるボタン。
// 選んだ表示モードはブラウザに保存し、次に開いたときは src/lib/theme.ts のスクリプトが反映する。
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    // 今の表示モード。ボタンで選んでいなければ OS の設定から判断する
    const current =
      root.dataset.theme ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";

    root.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // プライベートモードなどで保存できない場合は、このページを開いている間だけ切り替える
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="ライトモードとダークモードを切り替える"
      className="flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-accent-soft hover:text-foreground"
    >
      {/* どちらのアイコンを見せるかは CSS（dark: クラス）で決める。
          サーバーとブラウザで表示がずれないよう、JavaScript では切り替えない。 */}
      <MoonIcon className="size-[18px] dark:hidden" />
      <SunIcon className="hidden size-[18px] dark:block" />
    </button>
  );
}

function MoonIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}

function SunIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}
