import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

// 中身の横幅と左右の余白をそろえるための部品。
// 画面が広くても最大 1200px に収め、左右には常に 24px の余白を取る。
export function Container({ children, className = "" }: ContainerProps) {
  return <div className={`mx-auto w-full max-w-[1200px] px-6 ${className}`}>{children}</div>;
}
