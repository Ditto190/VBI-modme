# アーキテクチャ設計

VSeed はセマンティックな設定に基づくチャート生成器であり、ユーザーの意図と基盤となるレンダリングエンジン（VChart/VTable）を接続するために設計されています。

> [Deep Wiki](https://deepwiki.com/VisActor/VSeed)

## コアコンセプト

### 1. パイプラインアーキテクチャ (Pipeline Architecture)
VSeed はパイプラインパターンを採用し、チャート Spec を段階的に構築します。全体のプロセスは主に 2 つの段階に分かれます。

- **AdvancedPipeline**:
  - 入力: 初期 `VSeed` オブジェクト。
  - 役割: データリシェイプ (Data Reshape)、テーマの適用、デフォルト設定の推論。
  - 出力: `AdvancedVSeed` (中間状態テンプレート)。

- **SpecPipeline**:
  - 入力: `AdvancedVSeed`。
  - 役割: 中間状態テンプレートを具体的な VChart/VTable 設定項目へ変換します。
  - 出力: 最終的にレンダリング可能な Spec。

### 2. Builder パターン
`VSeedBuilder` クラスは中核となるコーディネーターであり、Context の管理、プラグインの登録、パイプラインの実行を担当します。

### 3. プラグインによる拡張 (Extensibility)
VSeed のコア機能（サポートされるチャートタイプなど）は、完全にプラグイン登録メカニズムによって実装されています。
- **Chart Type Registration**: 各チャートタイプ（例: `bar`, `line`）は登録プラグインです。
- **Theme Registration**: カスタムテーマの登録をサポートします。
