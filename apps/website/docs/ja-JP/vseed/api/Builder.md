# Builder

## Methods

### prepare

```ts
prepare(): Promise<void>
```

動的フィルターコードを非同期で実行します。`build()` の前に呼び出し、`dynamicFilter` 内の `code` を実行するために使います。冪等なメソッドで、複数回呼び出しても重複実行されません。

### build

```ts
build<T = S>(): T
```

最終的なグラフ設定（Spec）を生成します。最もよく使われる中核メソッドです。設定に `dynamicFilter` 内の `code` が含まれる場合は、先に `prepare()` を呼び出す必要があります。

### buildSpec

```ts
buildSpec<T = S>(advanced: AdvancedVSeed): T
```

中間層設定（AdvancedVSeed）を最終 Spec に変換します。中間層設定を深くカスタマイズする必要がある場合にのみ使用します。

### buildAdvanced

```ts
buildAdvanced(): AdvancedVSeed | null
```

中間層設定（AdvancedVSeed）、つまりグラフテンプレートを生成します。元の VSeed より詳細で、より多くのグラフ内部情報を公開します。

### getColorItems

```ts
getColorItems(): __type[]
```

データ内で色に関係するフィールド情報を取得します。グラフの凡例や色フィルター UI の生成によく使われます。

### getColorIdMap

```ts
getColorIdMap(): Record
```

色フィールドの詳細なマッピング表を取得します。キーは色 ID、値は詳細情報です。

### getColorValueMap

```ts
getColorValueMap(): undefined | Record
```

離散カラーマップ内の `colorId` から最終的な色値へのマッピングを取得します。

## Static Methods

### getAdvancedPipeline

```ts
static getAdvancedPipeline(chartType: ChartType): Pipe[]
```

[内部メソッド] 指定したグラフタイプのテンプレート構築パイプラインを取得します。VSeed から AdvancedVSeed への変換過程をデバッグするために使います。

### getSpecPipeline

```ts
static getSpecPipeline(chartType: ChartType): SpecPipe[]
```

[内部メソッド] 指定したグラフタイプの Spec 構築パイプラインを取得します。AdvancedVSeed から Spec への変換過程をデバッグするために使います。

### getTheme

```ts
static getTheme(themeKey?: string): CustomThemeConfig
```

指定したテーマの設定を取得します。`themeKey` を渡さない場合は、デフォルトで `'light'` テーマを返します。

### getThemeMap

```ts
static getThemeMap(): Record<string, CustomThemeConfig>
```

登録済みのすべてのテーマ設定を取得します。

### from

```ts
static from<T extends Spec = Spec>(vseed: VSeed): Builder<T>
```

Builder インスタンスを簡単に作成するための静的ファクトリメソッドです。

### registerAdvancedPipeline

```ts
static registerAdvancedPipeline(chartType: ChartType, pipeline: AdvancedPipeline): void
```

[拡張メソッド] 新しいグラフタイプのテンプレート構築パイプラインを登録します。

### registerSpecPipeline

```ts
static registerSpecPipeline(chartType: ChartType, pipeline: SpecPipeline): void
```

[拡張メソッド] 新しいグラフタイプの Spec 構築パイプラインを登録します。

### updateAdvanced

```ts
static updateAdvanced(chartType: ChartType, pipe: AdvancedPipe): void
```

[拡張メソッド] 既存グラフのテンプレート構築ロジックを変更し、カスタム Pipe を挿入して生成される AdvancedVSeed に影響を与えます。

### updateSpec

```ts
static updateSpec(chartType: ChartType, pipe: SpecPipe): void
```

[拡張メソッド] 既存グラフの Spec 構築ロジックを変更し、カスタム Pipe を挿入して生成される最終 Spec に影響を与えます。

### registerTheme

```ts
static registerTheme(key: string, theme: CustomThemeConfig): void
```

[拡張メソッド] カスタムテーマを登録します。

## Properties

### get locale

```ts
get locale()
```

現在の Builder が使用しているロケールを取得します。

### get vseed

```ts
get vseed()
```

現在の VSeed 入力データを取得します。

### set vseed

```ts
set vseed(value)
```

VSeed 入力データを更新します。更新後は `prepare()` のキャッシュ状態がクリアされます。

### get isPrepared

```ts
get isPrepared()
```

`prepare()` の状態を取得します。

### set isPrepared

```ts
set isPrepared(value: boolean)
```

`prepare()` の状態を設定します。

### get advancedVSeed

```ts
get advancedVSeed()
```

現在の AdvancedVSeed 中間設定オブジェクトを取得します。

### set advancedVSeed

```ts
set advancedVSeed(value)
```

AdvancedVSeed 中間設定オブジェクトを設定します。通常は既存の中間設定のキャッシュまたは再利用に使います。

### get spec

```ts
get spec()
```

現在生成されている最終 Spec オブジェクトを取得します。

### set spec

```ts
set spec(value)
```

Spec オブジェクトを設定します。通常はキャッシュに使います。

### get performance

```ts
get performance()
```

構築過程の性能統計情報を取得します。各段階の所要時間（単位: ms）を含みます。

### set performance

```ts
set performance(value)
```

性能統計情報を設定します。
