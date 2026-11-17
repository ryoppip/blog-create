import { ImageResponse } from "next/og";
import { APP_ICON_DATA_URI } from "@/lib/app-icon";

// iPhone・iPad で「ホーム画面に追加」したときのアイコン（180px の PNG）。
// 角の丸みは iPhone が自動で付けるので、四角いまま作る。
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    // eslint-disable-next-line @next/next/no-img-element -- 画像を作る処理の中なので、通常の <img> を使う
    <img src={APP_ICON_DATA_URI} width={180} height={180} alt="" />,
    size,
  );
}
