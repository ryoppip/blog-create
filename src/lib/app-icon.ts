// サイトのアイコン（家紋風「亀甲に山とテント」）の絵柄（SVG）。
// ブラウザのタブ、iPhone・Android のホーム画面のアイコンは、すべてこの絵柄から作る（src/app/icon.tsx、apple-icon.tsx）。
// 藍色の地に、山吹色の六角形の枠（亀甲：長く続くことを表す縁起の良い形）。
// 中に左右の山とテントを左右対称に組み、下に丘を置いている。

const APP_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
  <defs>
    <!-- 丘を、枠の内側の六角形に沿って切り抜くための形 -->
    <clipPath id="hex-inner"><path d="M90 31 L142 61 V119 L90 149 L38 119 V61 Z"/></clipPath>
  </defs>
  <rect width="180" height="180" fill="#17385a"/>
  <!-- 六角形の枠（亀甲） -->
  <path d="M90 24 L148 57 V123 L90 156 L32 123 V57 Z" fill="none" stroke="#e0b04a" stroke-width="5" stroke-linejoin="round"/>
  <!-- 左右の山 -->
  <path d="M44 124 L66 92 L86 124 Z" fill="#ffffff"/>
  <path d="M94 124 L114 92 L136 124 Z" fill="#ffffff"/>
  <!-- テント（藍色の縁取りで山と切り分け、入口を藍色に抜く） -->
  <path d="M60 124 L90 58 L120 124 Z" fill="#ffffff" stroke="#17385a" stroke-width="6" stroke-linejoin="round"/>
  <path d="M90 92 L81 124 H99 Z" fill="#17385a"/>
  <!-- 丘 -->
  <rect x="20" y="130" width="140" height="40" fill="#ffffff" clip-path="url(#hex-inner)"/>
</svg>`;

// 画像として読み込めるように、SVG を data URI（文字列で表した画像）に変換したもの
export const APP_ICON_DATA_URI = `data:image/svg+xml;base64,${Buffer.from(APP_ICON_SVG).toString("base64")}`;

// アイコンの背景色（ホーム画面から開いたときの起動画面の色にも使う）
export const APP_ICON_BACKGROUND = "#17385a";
