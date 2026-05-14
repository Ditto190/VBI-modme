# テストフロー

VQuery は `rstest` フレームワークでテストします。**すべてのコマンドはルートディレクトリで実行してください。**

## テストの仕組み
VQuery のテストは次をカバーします。
- **Unit**: ユーティリティ関数とコンパイラロジック。
- **Examples**: SQL 生成とデータクエリの一連の流れ。

## よく使うコマンド

### すべてのテストを実行
```bash
pnpm --filter=@visactor/vquery run test
```

### スナップショットを更新
SQL 生成ロジックの変更が想定どおりであれば、スナップショットを更新してください。
```bash
pnpm --filter=@visactor/vquery run test:update
```

### カバレッジレポート
テストカバレッジを生成して確認します。
```bash
pnpm --filter=@visactor/vquery run test:coverage
```
