# よく使うスクリプト

Monorepo の一貫性を保つため、**すべてのスクリプトはプロジェクトルートで実行する必要があります**。

## コアスクリプト (g)

`g` (Generator) は VSeed 開発で最も重要な補助スクリプトです。

```bash
pnpm run g
```

**説明**:
このコマンドは `build:test`、`build:docs`、`build:api` を組み合わせたもので、開発環境のリソースを同期するために使います:
1. **テストケースの生成**: `tests/integrations` 配下の JSON Spec を解析し、対応する `.test.ts` ファイルを生成します。
2. **ドキュメントの生成**: TypeScript の型定義を解析し、`apps/website` の API ドキュメントを更新します。

**使用する場面**:
- チャートロジックを変更したとき、または新しいチャートタイプを追加したとき。
- TypeScript の型定義を変更したとき。
- コードをコミットする前。

## 開発とビルド

### 開発環境の起動
VSeed の watch モードとドキュメントサイトを同時に起動します。
```bash
pnpm run dev
```

### プロジェクトのビルド
VSeed コアライブラリをビルドします。
```bash
pnpm --filter=@visactor/vseed run build
```

## テスト

### すべてのテストを実行
```bash
pnpm --filter=@visactor/vseed run test
```

### 単体テストを実行
```bash
pnpm --filter=@visactor/vseed run test:unit
```

### 統合テストを実行
```bash
pnpm --filter=@visactor/vseed run test:integration
```

### テストスナップショットを更新
コード変更によってスナップショット差分が発生し、その差分が期待どおりの場合に実行します:
```bash
pnpm --filter=@visactor/vseed run test:update
```

## コード品質

### Lint チェック
```bash
pnpm run lint
```

### 型チェック
```bash
pnpm run typecheck
```
