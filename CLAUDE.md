# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

Web開発の学習過程、技術記事、制作実績を発信する個人ブログ兼ポートフォリオサイト。Next.js 16（App Router）、React 19、TypeScript、Tailwind CSS 4 で構築し、Vercel で公開する予定。

Next.js のコードを書く前に [AGENTS.md](AGENTS.md) に従い、`node_modules/next/dist/docs/` の該当ガイドを確認する。AGENTS.md は `next dev` が自動で再生成するため、そのままコミットする。

## コマンド

- `npm run dev`: 開発サーバーを起動（http://localhost:3000）
- `npm run lint`: ESLint を実行
- `npm run build`: 本番ビルド（型チェックを含む）

テストは未導入。

## 設計方針

実装は次の順で段階的に進める。各ステップの目的とコードの役割を初心者向けに解説する。

1. 土台作り（完了）
2. 共通レイアウト（完了）
3. ブログ機能（完了）
4. 固定ページ（トップ、プロフィール、制作実績）（完了。プロフィールの文章は仮）
5. お問い合わせ（完了）
6. 公開準備（完了。https://blog-create-seven.vercel.app/ で公開中。`main` へのプッシュで Vercel が自動デプロイする）

### デザイン

- 雑誌風の「文字組みで見せる」デザイン。大きな欧文の見出し（`SectionHeading`：英語＋小さな日本語）、細い区切り線、余白で整理し、カードやサムネイル画像は使わない。
- 配色のテーマは「藍染」：藍（`accent`）が主な色、山吹（`accent-2`）は線や印だけに使う差し色（コントラストが足りないため文字には使わない）。画面幅いっぱいの藍色はトップページの制作実績の欄（`WorksBand`）だけに使う。
- トップページのロゴの背景はキャンプの景色（`src/components/home/CampScene.tsx`）。ライトモードは朝（朝日、煙）、ダークモードは夜（月、星、光るテント、火の粉）。木々の形は `src/lib/trees.ts` でビルド時に計算し、星と火の粉は canvas、奥行きはスクロールに合わせて動かす。
- 色はすべて `src/app/globals.css` の CSS 変数で定義する（キャンプの景色の色も `--camp-〇〇` などで定義）。Tailwind クラス（`text-muted`、`border-border` など）か、CSS Modules の `var(--〇〇)` で使い、部品に色を直接書かない。例外は Google フォームを囲む白い枠と、常に暗い背景のコードブロック内の文字色。
- 部品の見た目は、同じフォルダの CSS Modules（`〇〇.module.css`）に書く。小さな調整は Tailwind クラスでよい。`next.config.ts` の Turbopack の設定で、Tailwind の処理から `*.module.css` を外している。外さないと CSS Modules のクラス名がすべて `undefined` になり、見た目が当たらない（ビルドは成功するので気づきにくい）。
- フォント（すべて `next/font`）：欧文の見出しが Inter Tight（`font-latin`）、和文の見出しが Zen Kaku Gothic New（`font-display`）、本文が Noto Sans JP（`font-sans`）、コードとラベルが JetBrains Mono（`font-mono`）。
- ダークモード：`html` の `data-theme`（`light`/`dark`）で切り替える。未設定のときは OS の設定に従う。ちらつき防止のスクリプトは `src/lib/theme.ts`、切り替えボタンは `src/components/layout/ThemeToggle.tsx`。Tailwind の `dark:` クラスは `globals.css` の `@custom-variant dark` で同じ条件に合わせている。canvas の色は CSS 変数（`--spark`、`--stars`）を読んで切り替える。
- 動き：スクロールで現れる演出は `class="reveal"`（`globals.css`、スクロール連動のため非対応ブラウザでは普通に表示）。すべての動きは `prefers-reduced-motion` で止まるようにする。

### 記事

- 記事は `content/posts/` の MDX ファイルで管理する。`src/lib/posts.ts` が記事情報（`getFrontmatter`）、読了時間、目次（`getHeadings`）、次の記事（`getNextPost`）、タグの件数を作り、`src/components/blog/MdxContent.tsx` が本文を表示する。
- 大見出し（`##`）には `src/lib/rehype-section-ids.ts` が `sec-1`、`sec-2`…の id を付け、`getHeadings` も同じ順で id を作る。番号「01」「02」は `globals.css` の CSS カウンターで表示する。どちらもコードブロック内の行は数えない。
- コードは常に暗い背景で表示し、配色は github-dark の1つだけ。` ```tsx title="Hello.tsx" ` のように書くとファイル名が出る。コピーボタンは `CodeBlock`（MDX の `<pre>` を置き換え）。
- `draft: true` の記事は、本番では一覧と記事ページの両方から除外する（開発中は表示する）。
- 記事ファイルは同期処理（`readFileSync`）で読む。コンポーネント内で `await readFile()` を使うと、`cacheComponents` の事前生成で `use cache` か `<Suspense>` が必要になる。
- MDX の変換は内部で現在時刻を読むため、`MdxContent` に `"use cache"` を付けている。外すと事前生成でエラーになる。
- `/blog/[slug]` は `instant = false` を設定している。Vercel 上では、存在しない記事に HTTP 404 が返ることを確認済み（手元の `next start` では 200 と `noindex` になる）。

### そのほか

- ページは静的生成を基本とする。`cacheComponents` が有効なため、サーバーコンポーネントで `new Date()` などの現在時刻を使うと事前生成でエラーになる。
- サイト名、キャッチコピー、著者、得意分野、メニューは `src/config/site.ts`、プロフィールの内容は `src/data/profile.ts`（仮の内容。書き換えたら `isPlaceholder` を `false` にする）、制作実績は `src/data/projects.ts`（`featured: true` はトップページにも表示）にまとめる。
- お問い合わせは Google フォームを `src/app/contact/page.tsx` に iframe で埋め込む。埋め込み先の高さは自動調整できないため `FORM_HEIGHT` で指定している。
- サイトの URL（`siteConfig.url`）は、Vercel が自動で設定する `VERCEL_PROJECT_PRODUCTION_URL` から作る。未設定の手元では `http://localhost:3000` になる。
- ページのメタデータは `src/lib/metadata.ts` の `pageMetadata` で作る。各ページで設定しないと、共通レイアウトのサイト名が全ページの SNS 用タイトル（`og:title`）になる。
- `src/app/sitemap.ts` と `src/app/robots.ts` は、記事一覧と `siteConfig.url` から自動で作られる。
- 開発サーバーでは Google Fonts への接続に失敗し、代わりのフォントで表示されることがある（本番ビルドでは正しく組み込まれる）。

## 禁止事項

- `rm -rf` コマンドは絶対に実行しない
- `.env` ファイルを読んだり変更したりしない
- `package.json` の依存パッケージを無断で変更しない
- データベースへの削除操作（DELETE文）を実行しない

## Git 運用ルール

- リモートは `origin`（https://github.com/ryoppip/blog-create.git）、デフォルトブランチは `main`。
- コードを変更するたびに、コミットして GitHub にプッシュする。変更をローカルだけに残したまま作業を終えない。
- プッシュに失敗した場合は、失敗した旨と原因をユーザーに報告する。
- `gh` CLI は未インストールのため、Git の操作は `git` コマンドで行う。
