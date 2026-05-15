# Agent 開発コンテキスト (VSeed)

このドキュメントは agent-code とコントリビューター向けです。VSeed サブパッケージの中核アーキテクチャ、データフロー、拡張方法をまとめ、自動化開発時に全体像をすばやく把握できるようにします。

> これは Agent 利用を想定した「コンテキスト索引」です。より詳しいエンジニアリング説明は `packages/vseed/AGENTS.md` を参照してください。

## 1. 目標と位置づけ

VSeed は `VSeed DSL` を `VChart` / `VTable` のレンダリング可能な Spec に変換する **Spec Builder** であり、チャートのインテリジェントな生成と編集を支えます。

- 入力: `VSeed DSL`
- 出力: `VChart` / `VTable` Spec
- コアフロー: `AdvancedPipeline` + `SpecPipeline`

## 2. 二段階 Pipeline

1. **AdvancedPipeline**

- 入力: `VSeed DSL`
- 出力: `AdvancedVSeed` (シリアライズ可能な中間状態)
- 役割: データリシェイプ、デフォルト推論、エンコーディングモデリング、テーマとスタイル、分析設定

2. **SpecPipeline**

- 入力: `AdvancedVSeed`
- 出力: 最終 Spec (シリアライズ不可、直接レンダリングされる)
- 役割: 中間状態を具体的な VChart / VTable 設定へマッピング

## 3. Builder エントリーポイント

- `Builder.from(vseed).build()` を使って Spec を生成します
- `prepare()` は必要に応じて dynamicFilter を実行します

ソースのエントリーポイント:
- `packages/vseed/src/builder/builder/builder.ts`
- `packages/vseed/src/builder/builder/build.ts`
- `packages/vseed/src/builder/builder/prepare.ts`

## 4. データリシェイプ (コア)

- `foldMeasures`: 複数の指標を単一指標へ折りたたみ、`foldInfo` を生成します
- `unfoldDimensions`: 視覚エンコーディングチャネルごとにディメンションを統合し、`unfoldInfo` を生成します
- `dataReshapeByEncoding`: 組み合わせ呼び出し (fold + unfold)

ソース入口:
- `packages/vseed/src/dataReshape/foldMeasures.ts`
- `packages/vseed/src/dataReshape/unfoldDimensions.ts`
- `packages/vseed/src/dataReshape/dataReshapeByEncoding.ts`

## 5. 拡張と登録

- `registerAll()`: すべてのチャートとテーマを登録します
- `registerXxx()`: 個別のチャートタイプ pipeline を登録します
- `updateAdvanced()` / `updateSpec()`: カスタム Pipe を挿入します

ソース入口:
- `packages/vseed/src/builder/register/all.ts`
- `packages/vseed/src/builder/register/chartType/*`
- `packages/vseed/src/builder/register/custom.ts`

## 6. Pipeline 設計原則

- Pipe はできるだけ原子的にし、if/else を減らします
- Adapter によって条件付きフローを組み合わせます
- チャートタイプは Pipe の組み合わせで決まります

参考:
- `apps/website/docs/ja-JP/vseed/development/designPhilosophy/pipeline/pipelineDesign.md`

## 7. より詳しいコンテキスト

- `packages/vseed/AGENTS.md`
- `apps/website/docs/ja-JP/vseed/development/architecture.md`
- `apps/website/docs/ja-JP/vseed/development/designPhilosophy/vseed.md`
