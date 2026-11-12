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

- ページは静的生成を基本とする。
- 記事は `content/posts/` の MDX ファイルで管理する。`src/lib/posts.ts` が `next-mdx-remote-client/utils` の `getFrontmatter` で記事情報を読み、`src/components/blog/MdxContent.tsx` が本文を表示する（コードの色付けは `rehype-pretty-code`、本文の体裁は `@tailwindcss/typography`）。
- `draft: true` の記事は、本番では一覧と記事ページの両方から除外する（開発中は表示する）。
- 記事ファイルは同期処理（`readFileSync`）で読む。コンポーネント内で `await readFile()` を使うと、`cacheComponents` の事前生成で `use cache` か `<Suspense>` が必要になる。
- MDX の変換は内部で現在時刻を読むため、`MdxContent` に `"use cache"` を付けている。外すと事前生成でエラーになる。
- `/blog/[slug]` は `instant = false` を設定している。存在しない記事は、本番では HTTP ステータスが 200 のまま 404 ページと `noindex` が返る。本物の 404 を返すには Proxy での確認が必要。
- 制作実績は `src/data/projects.ts` の配列で管理する。`featured: true` の実績はトップページにも表示する。
- タグや使用技術のラベルは `src/components/common/TagList.tsx` を共通で使う。
- お問い合わせは Google フォームを `src/app/contact/page.tsx` に iframe で埋め込む。埋め込み先の高さは自動調整できないため `FORM_HEIGHT` で指定している。
- 部品は `src/components/` に機能別（`layout`、`blog`、`projects`、`contact`）で置く。
- サイト名、説明、著者、ヘッダーのメニュー、著作権表示の年は `src/config/site.ts` にまとめる。
- サイトの URL（`siteConfig.url`）は、Vercel が自動で設定する `VERCEL_PROJECT_PRODUCTION_URL` から作る。未設定の手元では `http://localhost:3000` になる。
- ページのメタデータは `src/lib/metadata.ts` の `pageMetadata` で作る。各ページで設定しないと、共通レイアウトのサイト名が全ページの SNS 用タイトル（`og:title`）になる。
- `src/app/sitemap.ts` と `src/app/robots.ts` は、記事一覧と `siteConfig.url` から自動で作られる。
- 色は `src/app/globals.css` の CSS 変数で定義し、`bg-surface`、`text-muted`、`border-border`、`text-accent` などの Tailwind クラスとして使う。色を直接書かない（例外は Google フォームを囲む白い枠のみ）。
- ダークモード：`html` の `data-theme`（`light`/`dark`）で切り替える。未設定のときは OS の設定に従う。ちらつき防止のスクリプトは `src/lib/theme.ts`、切り替えボタンは `src/components/layout/ThemeToggle.tsx`。Tailwind の `dark:` クラスは `globals.css` の `@custom-variant dark` で同じ条件に合わせている。
- 記事本文（`.prose`）とコードの色も `globals.css` で CSS 変数に合わせている。コードはライト用（github-light）とダーク用（github-dark）の2配色を出力し、CSS で切り替える。
- フォントは英数字が Geist、日本語が Noto Sans JP（どちらも `next/font`）。
- `cacheComponents` が有効なため、サーバーコンポーネントで `new Date()` などの現在時刻を使うと事前生成でエラーになる。
- デザインはシンプルで落ち着いた技術ブログ風とし、スマートフォン基準で作ってから PC に広げる。

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
