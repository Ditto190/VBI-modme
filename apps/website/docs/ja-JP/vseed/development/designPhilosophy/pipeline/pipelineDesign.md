# pipeline 設計

:::info なぜ Pipeline なのか？
1. チーム内の先輩たちによる選択です。
2. Pipeline の利点は、`VSeed` が各チャートタイプの実行フローを独立して制御できることです。適切に設計すれば、各チャートタイプの実装を疎結合にしながら局所的に再利用でき、各チャートタイプがあらゆる細部を精密に制御できます。これは Pipeline がもたらすものであり、`VSeed` が最も必要としているものです。
3. それに比べれば、Pipeline パターンの欠点は設計時に回避できます。`Pipe` 単体の規模を小さくし、`Pipe` 間の依存を減らせば、このパターンによる欠点を大きく避けられます。
4. 4 世代にわたる Pipeline の設計と最適化を経て、VSeed ではすでに 5 つ目のバージョンです。踏むべき落とし穴はすでに踏んできました。

:::

## Pipeline とは？

Pipeline は強力な抽象であり、エンジニアリングプラクティスです。複雑なタスクを、接続され順番に実行される一連の小さなステップへ分解します。その設計思想と実装方式は、関数型プログラミング（FP）の核心的な考え方から深い影響を受けています。

### Pipeline の利点:
- モジュール化: 原子的に実装し、原子を組み合わせてモジュールを得ます。
- 自動化: 入力を決めるだけで自動的に出力を得られ、内部実装を気にする必要がありません。
- 純粋関数: 指定された入力から必ず期待される出力が得られることは、純粋関数の特徴です。
- 並行性: 自然に並行処理をサポートします。
- 再利用性: すべてのモジュールを再利用できます。
- テスト容易性: 理論上、各モジュールは独立しており、単独でテストして品質を保証できます。
- 追跡容易性: 各段階の入力と出力が明確で、問題の特定やフロー状態の監視がしやすくなります。
- キャッシュ容易性: 理論上、単一の `Pipe` の出力を個別にキャッシュできるため、重複計算を避けて効率を高められます。

### Pipeline の欠点:
- 順序依存: `Pipe` 間に順序依存がある場合、前段を理解してからでないと後段を理解できないため、理解コストが増えます。問題をすばやく特定するには、全体フローへの深い理解が必要です。
- デバッグコスト: Pipeline は順番に実行されるため、どこかの段階が失敗すると Pipeline 全体が失敗します。失敗した段階を特定して修正する必要があり、デバッグが難しくなります。
- パフォーマンス問題: Pipeline は順番に実行されるため、各段階の出力は前段の完了を待つ必要があり、パフォーマンス問題につながることがあります。特にある段階の実行時間が長い場合、Pipeline 全体の効率に影響します。
- 関数型プログラミング: 新しい概念を理解する必要があり、一定の学習コストがあります。そのため、設計原理と実装詳細を貢献ガイドに書き、他の開発者が理解して使えるようにして欠点を補う必要があります。

## VSeed では Pipeline をどう書くべきか？

### Pipe 合成パターン

複数の機能 `Pipe` は、より大きな機能 `Pipe` に合成することも、より複雑な Pipeline に合成することもできます。

VSeed では、完全な Pipeline が 1 つのチャートタイプの実装に対応します。`Pipe` の合成関係を記述することで、異なるチャートタイプを作れます。Pipeline の合成段階では、各 `pipe` の具体的な実装を気にする必要はありません。


#### 合成の差異

例:

折れ線グラフと面グラフは、ラベル、凡例、軸など多くの機能を再利用できます。しかし折れ線グラフには面図形スタイルがないため、pipeline は機能 `Pipe` を合成することでこの差異を解決します。この過程に `if` 文はありません。

```ts
const lineChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,
]

const areaChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,

  // 面グラフだけが面図形スタイルを持つ
  areaStyle,
]
```


### Pipe アダプターパターン

合成パターンに加えて、`Pipe` の構築には一定の条件が伴うことがよくあります。異なる条件下での `Pipe` 合成を満たすため、VSeed では多くの `Pipe` アダプターを使用します。

#### 合成条件

例:

折れ線グラフにはピボット機能があります。ピボットなしでは VChart によってレンダリングされ、VChart spec を出力します。ピボットありでは VTable によってレンダリングされ、VTable spec を出力します。

ピボット折れ線グラフは、ラベル、凡例、軸など、折れ線グラフの基本機能をほぼ再利用する必要があります。そのためアダプターパターンによって、折れ線グラフの `Pipe` をピボット折れ線グラフの `Pipe` に適配します。

```ts
const pivotLineChartPipeline = [
  initPivotChart,
  pivotIndicators([
    label,
    xAxis,
    yAxis,
    lineStyle,
    pointStyle,
  ]),
  pivotChartLegend,
]

const commonLineChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,
]

const lineChartPipeline = [
  pivotAdapter(commonLineChartPipeline, pivotLineChartPipeline)
]
```

まとめると、各 adapter は 1 つの `if else` です。`pipe` 内に隠れた条件を adapter として抽象化できるため、`if else` を最上位へ前置できます。これにより依存関係がより明確で、保守コストの低い Pipeline が得られます。

### Pipeline の最小単位: 機能 Pipe

VSeed は、すべてのチャートタイプが機能を最小単位として使い、十分な再利用性と拡張性を提供することを期待しています。チャートタイプの pipeline はボトムアップに構築します。各機能 `Pipe` は、独立し、テスト可能で、再利用可能なモジュールであるべきです。

最も重要なのは、機能差異を異なる `Pipe` として抽象化すること（つまり `if else` を少なく書くこと）であり、大きく万能な `Pipe` を書くことではありません。

#### フラットな機能 Pipe

例:

横棒グラフ、縦棒グラフ、折れ線グラフ、面グラフ、散布図はいずれも X 軸と Y 軸を持ちます。これらは似ていますが少しずつ異なります。大きく万能な `axes` pipe を書くと、次のようになるかもしれません。

```ts
const lineChartPipeline = [
  axes
]
const barChartPipeline = [
  axes
]
const areaChartPipeline = [
  axes
]
const scatterChartPipeline = [
  axes
]
const axes = (spec, context) => {
  if (isLine || isArea || isColumn){
    // 折れ線グラフ、面グラフ、縦棒グラフには離散軸 1 つと連続軸 1 つがある
    return xy(spec, context)
  }
  if (isScatter){
    // 散布図には 2 つの連続軸がある
    return yy(spec, context)
  }
  if (isBar){
    // 横棒グラフには離散軸 1 つと連続軸 1 つがあるが、軸方向は折れ線、面、縦棒グラフと異なる
    return yx(spec, context)
  }
}

const xy = (spec, context) => {
  linearAxis(spec, context, {orient: 'left'})
  bandAxis(spec, context, {orient: 'bottom'})
}

const yx = (spec, context) => {
  linearAxis(spec, context, {orient: 'bottom'})
  bandAxis(spec, context, {orient: 'left'})
}

const yy = (spec, context) => {
  linearAxis(spec, context, {orient: 'bottom'})
  linearAxis(spec, context, {orient: 'left'})
}
```

上記のロジックは、1 つの機能 `Pipe` の中で、チャートタイプに応じて異なる子機能 `pipe` を選択しています。これにより次の問題が生じます。
1. `xy`、`yx`、`yy` の中で重複する機能をどう再利用するのか。似ているが異なる大量のサブ関数を、異なる子機能 `pipe` の中で重複して呼び出す必要があります。依存関係が複雑になりやすく、保守コストが増えます。
2. 折れ線グラフや面グラフの機能を変更するとき、ロジックが分岐しているため横棒グラフを見落としやすくなります。そのため新機能を実装するときに差異を考慮する必要があります。

spec pipeline 全体の規模が数百個の `pipe` まで拡大すると、このような書き方は非常に高い保守コストをもたらします。そのため、チャートタイプに応じて異なる子機能 `pipe` を選択する、より単純な方法が必要です。

上の例を続けると、差異を異なる `Pipe` として抽象化し、より細かい機能粒度で差異をカプセル化し、最後に pipeline 内で直接合成すれば、上記の問題を避けられます。

```ts
const lineChartPipeline = [
  xBandAxis,
  yLinearAxis,
]
const barChartPipeline = [
  yBandAxis,
  xLinearAxis,
]
const areaChartPipeline = [
  xBandAxis,
  yLinearAxis,
]
const scatterChartPipeline = [
  xLinearAxis,
  yLinearAxis,
]

const xBandAxis = (spec, context) => {
}
const yBandAxis = (spec, context) => {
}
const xLinearAxis = (spec, context) => {
}
const yLinearAxis = (spec, context) => {
}
```

上記の例では `axes` pipe を実装せず、`xBandAxis`、`yBandAxis`、`xLinearAxis`、`yLinearAxis` という 4 つの pipe を直接合成しています。これにより、`axes` pipe の中でチャートタイプに応じて異なる子機能 `pipe` を選択する問題を避け、チャートタイプによる分岐を避け、`if else` の使用を減らせます。

すべてのチャートタイプ差異による分岐は Pipeline の上に置くべきです。やむを得ない場合を除き、Pipeline 内でチャートタイプに応じて異なる子機能 `pipe` を選択する必要はありません。

この合成方式は VSeed の設計哲学に合っています。つまり、`if else` 条件判断で大きく万能な機能 `Pipe` を作るのではなく、よりフラットな機能 `Pipe` の合成を使います。
