// サイトのアイコン「テントくん」の絵柄（SVG）。
// ブラウザのタブ、iPhone・Android のホーム画面のアイコンは、すべてこの絵柄から作る（src/app/icon.tsx、apple-icon.tsx）。
// 朝の空と山を背景に、顔の付いた山吹色のテントが座っている。

const APP_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#dce8f1"/>
      <stop offset="1" stop-color="#f3efe4"/>
    </linearGradient>
  </defs>
  <rect width="180" height="180" fill="url(#sky)"/>
  <circle cx="140" cy="44" r="28" fill="#e7b04a" fill-opacity="0.2"/>
  <circle cx="140" cy="44" r="18" fill="#e7b04a"/>
  <path d="M0 120 L40 76 L70 104 L104 64 L180 126 V180 H0 Z" fill="#a9bfd3"/>
  <path d="M104 64 L118 76 L110 80 L100 74 L92 78 Z" fill="#ffffff" fill-opacity="0.85"/>
  <path d="M0 150 C 60 138, 120 140, 180 150 V180 H0 Z" fill="#7f9db3"/>
  <path d="M40 152 L90 76 L140 152 Z" fill="#e0a83a"/>
  <path d="M90 76 L140 152 H118 Z" fill="#000000" fill-opacity="0.12"/>
  <line x1="90" y1="78" x2="86" y2="67" stroke="#5b4632" stroke-width="3" stroke-linecap="round"/>
  <ellipse cx="79" cy="118" rx="4.5" ry="6" fill="#3b2412"/>
  <ellipse cx="101" cy="118" rx="4.5" ry="6" fill="#3b2412"/>
  <circle cx="80.5" cy="116" r="1.5" fill="#ffffff"/>
  <circle cx="102.5" cy="116" r="1.5" fill="#ffffff"/>
  <ellipse cx="69" cy="129" rx="6" ry="4" fill="#ff7a7a" fill-opacity="0.5"/>
  <ellipse cx="111" cy="129" rx="6" ry="4" fill="#ff7a7a" fill-opacity="0.5"/>
  <path d="M84 128 Q 90 134 96 128" fill="none" stroke="#3b2412" stroke-width="2.6" stroke-linecap="round"/>
  <path d="M90 136 L80 152 H100 Z" fill="#8e6218"/>
</svg>`;

// 画像として読み込めるように、SVG を data URI（文字列で表した画像）に変換したもの
export const APP_ICON_DATA_URI = `data:image/svg+xml;base64,${Buffer.from(APP_ICON_SVG).toString("base64")}`;

// アイコンの背景色（ホーム画面から開いたときの起動画面の色にも使う）
export const APP_ICON_BACKGROUND = "#dce8f1";
