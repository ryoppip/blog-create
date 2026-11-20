// サイトのアイコン（家紋風「白地に藍」）の絵柄（SVG）。
// ブラウザのタブ、iPhone・Android のホーム画面のアイコンは、すべてこの絵柄から作る（src/app/icon.tsx、apple-icon.tsx）。
// 白地に藍色の丸い枠。中に左右の山とテントを左右対称に組み、下に丘、丘の上に山吹色の焚き火の点を置いている。

const APP_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
  <defs>
    <!-- 丘を、枠の内側の丸に沿って切り抜くための形 -->
    <clipPath id="ring-inner"><circle cx="90" cy="90" r="56"/></clipPath>
  </defs>
  <rect width="180" height="180" fill="#ffffff"/>
  <!-- 丸い枠 -->
  <circle cx="90" cy="90" r="62" fill="none" stroke="#17385a" stroke-width="5"/>
  <!-- 左右の山 -->
  <path d="M40 128 L64 92 L86 128 Z" fill="#17385a"/>
  <path d="M94 128 L116 92 L140 128 Z" fill="#17385a"/>
  <!-- テント（白い縁取りで山と切り分け、入口を白く抜く） -->
  <path d="M58 128 L90 56 L122 128 Z" fill="#17385a" stroke="#ffffff" stroke-width="6" stroke-linejoin="round"/>
  <path d="M90 94 L80 128 H100 Z" fill="#ffffff"/>
  <!-- 丘と、焚き火の明かり -->
  <rect x="20" y="134" width="140" height="40" fill="#17385a" clip-path="url(#ring-inner)"/>
  <circle cx="90" cy="144" r="4" fill="#c99520"/>
</svg>`;

// 画像として読み込めるように、SVG を data URI（文字列で表した画像）に変換したもの
export const APP_ICON_DATA_URI = `data:image/svg+xml;base64,${Buffer.from(APP_ICON_SVG).toString("base64")}`;

// アイコンの背景色（ホーム画面から開いたときの起動画面の色にも使う）
export const APP_ICON_BACKGROUND = "#ffffff";
