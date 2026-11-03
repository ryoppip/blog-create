# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクトの現状

2026-11-04 時点で、このディレクトリにはこのファイル以外何もありません（コード、ビルド設定、README はいずれも未作成）。そのため、ビルド・lint・テストのコマンドやアーキテクチャはまだ定まっていません。

技術スタックやコマンド、複数ファイルにまたがる設計が決まったら、この CLAUDE.md に追記してください。

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
