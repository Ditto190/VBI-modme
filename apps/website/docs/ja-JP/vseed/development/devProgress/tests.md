# テストフロー

VSeed は厳格なテスト駆動開発フローを採用しています。**すべてのテストコマンドはプロジェクトルートで実行する必要があります。**

## テスト分類

### 1. 単体テスト (Unit Tests)
- **目的**: 独立したユーティリティ関数と Pipeline ノードのロジックをテストします。
- **場所**: `packages/vseed/tests/unit`
- **実行**:
  ```bash
  pnpm --filter=@visactor/vseed run test:unit
  ```

### 2. 統合テスト (Integration Tests)
- **目的**: 完全なチャート生成フロー (VSeed Spec -> VChart Spec) をテストします。
- **仕組み**: データ駆動です。`packages/vseed/tests/integrations` 配下の JSON ファイルを読み取り、テストケースを自動生成してスナップショットを比較します。
- **実行**:
  ```bash
  pnpm --filter=@visactor/vseed run test:integration
  ```

## コアワークフロー (Workflow)

### ステップ 1: テストを実行
開発中は関連するテストを頻繁に実行し、ロジックを検証します。
```bash
# すべてのテストを実行
pnpm --filter=@visactor/vseed run test
```

### ステップ 2: スナップショット変更を処理
コード変更によって出力 Spec が変わった場合 (Bug 修正や Feature 追加など):
1. コンソール出力の Diff を確認し、その変更が期待どおりかを判断します。
2. 期待どおりであれば、更新コマンドを実行します:
   ```bash
   pnpm --filter=@visactor/vseed run test:update
   ```

### ステップ 3: カバレッジチェック
コードをコミットする前に、テストカバレッジを確認することを推奨します。
```bash
pnpm --filter=@visactor/vseed run test:coverage
```

## 注意事項
- **自動生成**: 統合テストの `.test.ts` ファイルは `g` スクリプトによって生成されるため、**手動で変更しないでください**。
- **ケースの追加**: 統合テストを追加するには、`packages/vseed/tests/integrations` 配下の対応する分類ディレクトリに新しい JSON 設定ファイルを追加し、その後 `pnpm run g` を実行します。
