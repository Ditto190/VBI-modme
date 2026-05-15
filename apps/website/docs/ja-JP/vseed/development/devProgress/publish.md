---
title: リリース
---


# リリース

## changeset の生成

新しい changeset を生成するには、リポジトリのルートディレクトリで `pnpm changeset` を実行してください。`.changeset` ディレクトリに生成された markdown ファイルはリポジトリへコミットする必要があります。
```bash
pnpm changeset
```

changeset を生成した後、`git commit` を実行します:
```bash
git add .
git commit -m "chore: commit message"
```

上記の手順は複数回繰り返せます。各 changeset の内容は最終的なバージョンリリースに累積されます。

## バージョンの更新

次のコマンドを実行してバージョンを更新し、ChangeLog を更新します。
```bash
pnpm changeset version
```

依存関係と lock file を更新します:
```bash
pnpm install
```

変更をコミットします:
```bash
git add .
git commit -m "chore: release message"
git push
```

PR が `main` ブランチへマージされると、changesets workflow が自動でトリガーされ、パッケージングとリリース作業が実行されます。
