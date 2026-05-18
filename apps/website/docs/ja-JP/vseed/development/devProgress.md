# 開発フロー

## プロジェクトの起動

```bash title="プロジェクトを起動"
pnpm install && pnpm dev
```

## 要件を理解してコードを書く

これは複雑なプロセスですが、通常は次の 3 つです。
1. 入力を明確にする: `vseed`
2. 出力を明確にする: `vseed` を `advancedVSeed` に変換する、または `advancedVSeed` を `spec` に変換する
3. コードを書き、新しい入力が期待どおりの出力を持つことを保証する

:::tip
`playground` (`apps/website/docs/ja-JP/playground/index.mdx`) は、デバッグと開発に使用できます。
:::

## テストケースを新規作成する

必要であれば、新しいテストケースの作成を検討できます。

:::tip
カバレッジが低下した場合は、新しいテストケースを作成する必要があります。
:::

`packages/vseed/tests/*` ディレクトリ配下に、新しい `testName.json` を作成し、VSeed DSL を書き込みます。

実行:

```bash title="テストケースを作成"
pnpm build:canvasTest
```

## ユニットテストを実行してカバレッジを更新する

```bash title="ユニットテストを実行してカバレッジを更新"
pnpm test:coverage
```

次の 3 つを確認します。
1. すべてのテストが通る
2. スナップショットの変更が期待どおりである
3. カバレッジが低下していない

> カバレッジの変化は README.md に自動更新されます

## 設定項目ドキュメントを更新する

チャートタイプの TypeScript 定義を変更した場合は、設定項目ドキュメントを更新してください。

:::tip
`packages/vseed/src/types/chartType` 配下のすべての型定義は、各チャートの設定項目ドキュメントに対応しています。変更がある場合は必ず更新してください。
:::

```bash title="設定項目ドキュメントを更新"
pnpm build:docs
```

## リリースと提出

```bash title="変更内容を記述"
pnpm changeset
```

`pnpm changeset` コマンドを実行したら、プロンプトに従って次を選択します。
1. 変更するパッケージを選択します。通常は `vseed` のみです
2. セマンティックバージョニングに従い、変更タイプを選択します。ほとんどの場合、Enter キーを 2 回押して `major` と `minor` をスキップし、`patch` を選択すれば十分です
3. 変更説明を入力します。例: `fix: chart render error caused by only one measure`

:::tip 推奨
1 つの機能または Bugfix は、1 つの `changeset`、1 つの `commit` に対応します

1 つの `Pull Request` は、1 つの `issue` に対応します

1 つの `Pull Request` が複数の機能または複数の Bugfix を含む場合、複数の `changeset`、複数の `commit` に対応します
:::

## コミット

```bash title="すべてをコミット"
git add .
git commit -m "fix: chart render error caused by only one measure"
git push
```
