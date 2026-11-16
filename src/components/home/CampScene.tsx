"use client";
// ↑ 星と火の粉のアニメーション、スクロールに合わせた奥行きの動きはブラウザで動くため、
//   クライアントコンポーネントにしている。景色の形そのものはサーバーで計算して受け取る。

import { useEffect, useRef } from "react";
import styles from "./CampScene.module.css";

type CampSceneProps = {
  pine1: string; // 奥の森の形（SVG の path）
  pine2: string; // 手前の森の形
};

// 奥行きの動きの強さ。数字が大きいほど、スクロールしたときに大きく動く（手前に見える）
const DEPTH = { mountain: 0.04, pine1: 0.08, pine2: 0.13, ground: 0.2 };

type Star = { x: number; y: number; r: number; phase: number; speed: number };
type Spark = { x: number; y: number; vx: number; vy: number; life: number; decay: number; r: number; phase: number };

export function CampScene({ pine1, pine2 }: CampSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fireRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const canvas = canvasRef.current;
    const fire = fireRef.current;
    const ctx = canvas?.getContext("2d");
    if (!scene || !canvas || !fire || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    // スクロールに合わせて、奥の景色はゆっくり、手前の景色は速く動かす
    const layers = scene.querySelectorAll<HTMLElement | SVGElement>("[data-depth]");
    const onScroll = () => {
      if (reduceMotion) return;
      const y = window.scrollY;
      layers.forEach((layer) => {
        layer.style.transform = `translateY(${y * Number(layer.dataset.depth)}px)`;
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
    };

    // 星の位置は最初に一度だけ決める（空の上半分）
    const stars: Star[] = Array.from({ length: 80 }, () => ({
      x: Math.random(),
      y: Math.random() * 0.5,
      r: 0.4 + Math.random() * 1.1,
      phase: Math.random() * Math.PI * 2,
      speed: 0.6 + Math.random() * 1.4,
    }));
    let sparks: Spark[] = [];

    // 色はダークモードの切り替えで変わるため、ときどき CSS 変数から読み直す
    let sparkColor = "240, 150, 50";
    let showStars = false;
    let lastColorRead = -Infinity;
    let frameId = 0;

    const draw = (t: number) => {
      if (t - lastColorRead > 800) {
        const css = getComputedStyle(document.documentElement);
        sparkColor = css.getPropertyValue("--spark").trim();
        showStars = css.getPropertyValue("--stars").trim() === "1";
        lastColorRead = t;
      }
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // 夜空の星。ひとつずつ違う速さでまたたかせる
      if (showStars) {
        for (const star of stars) {
          const alpha = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin((t / 1000) * star.speed + star.phase));
          ctx.fillStyle = `rgba(236, 240, 250, ${(alpha * 0.9).toFixed(2)})`;
          ctx.beginPath();
          ctx.arc(star.x * w, star.y * h, star.r * dpr, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 焚き火の位置（canvas の座標に変換）から、火の粉を出す
      const canvasRect = canvas.getBoundingClientRect();
      const fireRect = fire.getBoundingClientRect();
      const fx = (fireRect.left + fireRect.width / 2 - canvasRect.left) * dpr;
      const fy = (fireRect.top + fireRect.height * 0.3 - canvasRect.top) * dpr;
      if (!reduceMotion && sparks.length < 40 && Math.random() < 0.35) {
        sparks.push({
          x: fx + (Math.random() - 0.5) * 10 * dpr,
          y: fy,
          vx: (Math.random() - 0.5) * 0.4 * dpr,
          vy: -(0.6 + Math.random() * 1.1) * dpr,
          life: 1,
          decay: 0.006 + Math.random() * 0.01,
          r: (0.8 + Math.random() * 1.4) * dpr,
          phase: Math.random() * Math.PI * 2,
        });
      }
      sparks = sparks.filter((spark) => spark.life > 0);
      for (const spark of sparks) {
        spark.x += spark.vx + Math.sin(t / 300 + spark.phase) * 0.3 * dpr;
        spark.y += spark.vy;
        spark.life -= spark.decay;
        const glow = ctx.createRadialGradient(spark.x, spark.y, 0, spark.x, spark.y, spark.r * 3);
        glow.addColorStop(0, `rgba(${sparkColor}, ${Math.max(0, spark.life).toFixed(2)})`);
        glow.addColorStop(1, `rgba(${sparkColor}, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.r * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // 動きを減らす設定の人には、1回描いたら止める（星は止まった状態で表示される）
      if (!reduceMotion) frameId = requestAnimationFrame(draw);
    };

    resize();
    onScroll();
    frameId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });

    // このページから離れたら、アニメーションと監視を止める
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className={styles.scene} ref={sceneRef} aria-hidden="true">
      <div className={styles.orb} />

      <div className={styles.layers}>
        <svg data-depth={DEPTH.mountain} viewBox="0 0 2000 400" preserveAspectRatio="xMidYMax slice">
          <path
            className={styles.mountain}
            d="M0 170 C 150 120, 300 90, 470 130 S 800 60, 1000 110 S 1350 40, 1560 100 S 1850 80, 2000 120 V400 H0 Z"
          />
        </svg>
        <svg data-depth={DEPTH.pine1} viewBox="0 0 2000 400" preserveAspectRatio="xMidYMax slice">
          <path className={styles.pine1} d={pine1} />
        </svg>
        <svg data-depth={DEPTH.pine2} viewBox="0 0 2000 400" preserveAspectRatio="xMidYMax slice">
          <path className={styles.pine2} d={pine2} />
        </svg>
        <svg data-depth={DEPTH.ground} viewBox="0 0 2000 400" preserveAspectRatio="xMidYMax slice">
          <path className={styles.ground} d="M0 400 L0 360 C 300 338, 620 352, 920 344 S 1520 330, 2000 352 L2000 400 Z" />
        </svg>
      </div>

      <div className={styles.campsite} data-depth={DEPTH.ground}>
        <div className={styles.fire} ref={fireRef}>
          <span className={styles.halo} />
          <span className={styles.smoke}>
            <i />
            <i />
            <i />
          </span>
          <svg viewBox="0 0 60 70">
            <rect className={styles.log} x="6" y="58" width="48" height="7" rx="3.5" transform="rotate(-14 30 61)" />
            <rect className={styles.log} x="6" y="58" width="48" height="7" rx="3.5" transform="rotate(14 30 61)" />
            <path className={`${styles.flame} ${styles.flame1}`} d="M30 6 C 40 22, 50 32, 44 48 C 40 58, 20 58, 16 48 C 10 34, 22 26, 30 6 Z" />
            <path className={`${styles.flame} ${styles.flame2}`} d="M30 20 C 37 30, 42 38, 38 48 C 35 55, 25 55, 22 48 C 19 40, 25 34, 30 20 Z" />
            <path className={`${styles.flame} ${styles.flame3}`} d="M30 32 C 34 38, 36 44, 33 50 C 31 54, 29 54, 27 50 C 25 45, 27 40, 30 32 Z" />
          </svg>
        </div>
        <svg className={styles.tent} viewBox="0 0 140 92">
          <line className={styles.tentPole} x1="70" y1="12" x2="66" y2="2" />
          <path className={styles.tentBody} d="M6 90 L70 10 L134 90 Z" />
          <path className={styles.tentShade} d="M70 10 L134 90 H100 Z" />
          <path className={styles.tentDoor} d="M70 32 L53 90 H87 Z" />
        </svg>
      </div>

      <canvas className={styles.canvas} ref={canvasRef} />
    </div>
  );
}
