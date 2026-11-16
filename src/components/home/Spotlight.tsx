"use client";
// ↑ マウスの位置を読み取る処理はブラウザで動くため、クライアントコンポーネントにしている。

import type { ReactNode } from "react";

type SpotlightProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

// 中の要素の上でマウスを動かすと、その位置を CSS 変数（--mx、--my）に書き込む枠。
// CSS 側でこの変数を使い、カーソルに付いてくる光を描いている（WorksBand.module.css の .spot）。
export function Spotlight({ children, className, id }: SpotlightProps) {
  return (
    <section
      id={id}
      className={className}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
      }}
    >
      {children}
    </section>
  );
}
