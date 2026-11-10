import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

// 中身の横幅と左右の余白をそろえるための部品。
// 画面が広くても読みやすい幅（max-w-3xl）に収め、スマートフォンでは左右に余白を取る。
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-3xl px-4 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}
