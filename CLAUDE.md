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
2. 共通レイアウト
3. ブログ機能
4. 固定ページ（トップ、プロフィール、制作実績）
5. お問い合わせ
6. 公開準備（SEO、表示確認、Vercel へのデプロイ）

- ページは静的生成を基本とする。
- 記事は `content/posts/` の MDX ファイルで管理し、`src/lib/posts.ts` で読み込む（`next-mdx-remote` と `gray-matter` を予定）。`draft: true` の記事は本番に表示しない。
- 制作実績は `src/data/projects.ts` の配列で管理する。
- お問い合わせは Formspree などの外部フォームサービスを使う。
- 部品は `src/components/` に機能別（`layout`、`blog`、`projects`、`contact`）で置く。
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
