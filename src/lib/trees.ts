// トップページのキャンプの景色や、制作実績の欄に並べる針葉樹のシルエットを作る。
// SVG の path（図形の線を表す文字列）を計算して返す。ビルド時にサーバーで計算するので、ブラウザの負担はない。

// 決まった数（seed）から、毎回同じ並びの乱数を作る。木の形がアクセスのたびに変わらないようにするため。
function seededRandom(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type TreeLineOptions = {
  seed: number; // 木の並び方を決める数
  base: number; // 地面の高さ（SVG の座標。400 が一番下）
  amp: number; // 丘の起伏の大きさ
  hill: number; // 丘の起伏の間隔
  minH: number; // いちばん低い木の高さ
  maxH: number; // いちばん高い木の高さ
  scale: number; // 木の幅の倍率
};

// 横幅 2000、高さ 400 の SVG の中に、ゆるやかな丘と、その上に並ぶ3段の針葉樹を描く
export function treeLine(o: TreeLineOptions) {
  const random = seededRandom(o.seed);
  const W = 2000;
  const H = 400;
  const ground = (x: number) =>
    o.base + Math.sin(x / o.hill + o.seed) * o.amp + Math.sin(x / (o.hill * 0.37)) * o.amp * 0.4;
  const p = (x: number, y: number) => `${x.toFixed(1)} ${y.toFixed(1)}`;

  let d = "";
  let x = -30;
  while (x < W + 30) {
    const w = (18 + random() * 18) * o.scale;
    const h = o.minH + random() * (o.maxH - o.minH);
    const b = ground(x) + 4;
    // 下から上へ、3段に重なった針葉樹の形をたどる
    d +=
      `M${p(x - w / 2, b)}` +
      `L${p(x - w * 0.17, b - h * 0.36)}L${p(x - w * 0.36, b - h * 0.36)}` +
      `L${p(x - w * 0.11, b - h * 0.66)}L${p(x - w * 0.26, b - h * 0.66)}` +
      `L${p(x, b - h)}` +
      `L${p(x + w * 0.26, b - h * 0.66)}L${p(x + w * 0.11, b - h * 0.66)}` +
      `L${p(x + w * 0.36, b - h * 0.36)}L${p(x + w * 0.17, b - h * 0.36)}` +
      `L${p(x + w / 2, b)}Z`;
    x += w * (0.35 + random() * 0.5);
  }

  // 木の下の地面
  d += `M0 ${H}`;
  for (let gx = 0; gx <= W; gx += 40) d += `L${p(gx, ground(gx))}`;
  return `${d}L${W} ${H}Z`;
}
