# よく使うスクリプト

Monorepo の一貫性を保つため、**すべてのスクリプトはプロジェクトルートで実行してください**。

## コアスクリプト (g)

```bash
pnpm run g
```
**説明**: VQuery の `g` スクリプトは次を実行します。
1. `build:test`: テストリソースをコンパイルします。
2. `build:docs`: API ドキュメントを生成します。

## 開発とビルド

### ビルド
```bash
pnpm --filter=@visactor/vquery run build
```

## テスト

### テストの実行
VQuery は Rstest でテストします。
```bash
pnpm --filter=@visactor/vquery run test
```

### スナップショットの更新
```bash
pnpm --filter=@visactor/vquery run test:update
```

### カバレッジ
```bash
pnpm --filter=@visactor/vquery run test:coverage
```
