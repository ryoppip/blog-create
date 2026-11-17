import { ImageResponse } from "next/og";
import { APP_ICON_DATA_URI } from "@/lib/app-icon";

// サイトのアイコン（PNG）を、大きさ違いで3つ作る。
// ・32px：ブラウザのタブに出る小さなアイコン
// ・192px、512px：Android でホーム画面に追加したときのアイコン（src/app/manifest.ts から使う）
// それぞれ /icon/32、/icon/192、/icon/512 というURLになる。
export function generateImageMetadata() {
  return [32, 192, 512].map((px) => ({
    id: String(px),
    size: { width: px, height: px },
    contentType: "image/png",
  }));
}

export default async function Icon({ id }: { id: Promise<string> }) {
  const px = Number(await id);
  return new ImageResponse(
    // ImageResponse は、ここに書いた見た目を PNG 画像に変換する。絵柄は src/lib/app-icon.ts の SVG
    // eslint-disable-next-line @next/next/no-img-element -- 画像を作る処理の中なので、通常の <img> を使う
    <img src={APP_ICON_DATA_URI} width={px} height={px} alt="" />,
    { width: px, height: px },
  );
}
