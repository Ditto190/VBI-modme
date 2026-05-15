# PivotTable

:::info{title=推奨}
- 推奨フィールド設定: メジャー `1` 個、ディメンション `1` 個
- データリシェイプ対応: メジャー `1` 個以上、ディメンション `0` 個
:::

:::info{title=エンコーディングマッピング}
ピボットテーブルは次の視覚チャネルをサポートします:

`row`    : 行ディメンション。`複数のディメンション`をサポートし、行上でディメンション値ごとにデータをグループ化します。

`column` : 列ディメンション。`複数のディメンション`をサポートし、列上でディメンション値ごとにデータをグループ化します。

`detail` : 詳細チャネル。`複数のメジャー`をサポートし、セル内にメジャー値を表示します。

:::

:::note{title=説明}
ピボットテーブルは多次元データのクロス分析に適しており、行/列ディメンションとメジャー計算方法を柔軟に設定できます。

適用シーン:

- 複雑な多次元統計分析
- データのドリルダウンと集計表示
- 業務レポート生成とデータ探索

:::

:::warning{title=Warning}
データ要件:

- 行ディメンション、列ディメンション、メジャーのいずれかが少なくとも1つ必要
- データは事前集計済みである必要があります。
- データはグループ化可能である必要があります。

デフォルトで有効な機能:

- 行/列ソート、データフィルタリング、集計/小計計算、小計/総計表示がデフォルトで有効です。

:::


## chartType

**Type:** `"pivotTable"`

:::note{title=説明}
ピボットテーブルは多次元データのクロス分析シーンに適しています。

:::

**例**
'pivotTable'




## dataset

**Type:** `Record[]`

:::note{title=説明}
TidyData 仕様に準拠し集計済みのデータセットで、チャートのデータソースと構造を定義します。ユーザー入力データに前処理は不要です。VSeed の強力な Data Reshape 機能が自動で整形し、ピボットテーブルのデータは最終的に対応するツリー構造へ変換されるため、手動処理は不要です。

:::

**例**
[{region:'East China', product:'A', sales:1000}, {region:'East China', product:'B', sales:1500}]




## dimensions

**Type:** `TableDimension[] | undefined`

:::note{title=説明}
ピボットテーブルの行ディメンションと列ディメンションです。データは自動でツリー構造に処理され、行軸と列軸へマッピングされます。

:::

**例**
[{id: 'region', alias: 'Region', isRow: true}, {id: 'product', alias: 'Product', isColumn: true}]




### id

**Type:** `string`

:::note{title=説明}
ディメンションに対応するフィールド ID

:::

### alias

**Type:** `string | undefined`

:::note{title=説明}
ディメンションの別名

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=説明}
ディメンションの日付フォーマット設定

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=説明}
時間粒度。日付表示の精度を決定します

:::

### encoding

**Type:** `"row" | "column" | undefined`

:::note{title=説明}
ディメンションをマッピングするチャネル:

- row: 複数のディメンションを行チャネルへマッピングできます

- column: 複数のディメンションを列チャネルへマッピングできます

:::


## measures

**Type:** `TableMeasure[] | undefined`

:::note{title=説明}
ピボットテーブルは複数のディメンションメジャーをサポートします。

:::

**例**
[{id: 'sales', alias: 'Sales', aggregation: 'sum'}]




### id

**Type:** `string`

:::note{title=説明}
メジャー ID。重複できません

:::

### alias

**Type:** `string | undefined`

:::note{title=説明}
メジャーの別名。重複可能。未設定の場合、alias は id になります

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=説明}
自動数値フォーマット。デフォルトで有効で、優先度が最も高いです。

autoFormat=true の場合、すべての numFormat 設定を上書きします。

有効にすると、チャートのデータラベルとツールチップは、メジャー値と言語環境に基づいて適切なフォーマットを自動選択します。

フォーマット規則: 10進数、compact notation 有効、小数部は最小0桁・最大2桁、自動丸め、ブラウザの Intl.NumberFormat 実装を使用します。

例:

- locale=zh-CN: 749740.264 → 74.45~74.45万

- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=説明}
メジャーのカスタム数値フォーマット。ラベルとツールチップに自動適用されます。

注意: カスタムフォーマットを使用するには autoFormat=false を明示的に設定する必要があります。そうしないと autoFormat がこの設定を上書きします。

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=説明}
数値フォーマットタイプ。数値（10進数）、パーセント（%）、パーミル（‰）、科学表記をサポート

:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの比率。0 にはできません

:::

**例**
- 100000 は 10万 に変換, ratio:10000, symbol:"万"
- 100000 は 10K に変換, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマット記号。例: %, ‰

:::

**例**
- 100000 は 10万 に変換, ratio:10000, symbol:"万"
- 100000 は 10K に変換, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=説明}
数値フォーマットの桁区切り

:::

#### suffix

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマットの接尾辞

:::

#### prefix

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマットの接頭辞

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの小数桁数。ブラウザの Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用し、significantDigits より優先度は低いです。

:::

**例**
- 1234.5678 は 1235 に変換, fractionDigits:0 (roundingMode:halfCeil)
- 1234.5678 は 1234.6 に変換, fractionDigits:1 (roundingMode:halfCeil)
- 1234.5678 は 1234.57 に変換, fractionDigits:2 (roundingMode:halfCeil)
- 1234.5678 は 1230.568 に変換, fractionDigits:3 (roundingMode:halfCeil)
- 1234.5678 は 1234.5678 に変換, fractionDigits:4 (roundingMode:halfCeil)
- 1234.5678 は 1234.56780 に変換, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの有効桁数。ブラウザの Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用し、fractionDigits より優先度は高いです。

:::

**例**
- 1234.5678 は 1000 に変換, significantDigits:1
- 1234.5678 は 1200 に変換, significantDigits:2
- 1234.5678 は 1230 に変換, significantDigits:3
- 1234.5678 は 1234 に変換, significantDigits:4
- 1234.5678 は 1234.6 に変換, significantDigits:5 (roundingMode:halfCeil)
- 1234.5678 は 1234.57 に変換, significantDigits:6 (roundingMode:halfCeil)
- 1234.5678 は 1234.568 に変換, significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 は 1234.5678 に変換, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=説明}
significantDigits と fractionDigits の両方を設定した場合の数値フォーマットの丸め優先度。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingPriority と同じ規則に従います。

:::

**例**
- 1234.5678 は 1230 に変換, significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 は 1234.5678 に変換, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
数値フォーマットの丸めモード。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingMode と同じ規則に従います。

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=説明}
数値フォーマットタイプ。数値（10進数）、パーセント（%）、パーミル（‰）、科学表記をサポート

:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの比率。0 にはできません

:::

**例**
- 100000 は 10万 に変換, ratio:10000, symbol:"万"
- 100000 は 10K に変換, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマット記号。例: %, ‰

:::

**例**
- 100000 は 10万 に変換, ratio:10000, symbol:"万"
- 100000 は 10K に変換, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=説明}
数値フォーマットの桁区切り

:::

#### suffix

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマットの接尾辞

:::

#### prefix

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマットの接頭辞

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの小数桁数。ブラウザの Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用し、significantDigits より優先度は低いです。

:::

**例**
- 1234.5678 は 1235 に変換, fractionDigits:0 (roundingMode:halfCeil)
- 1234.5678 は 1234.6 に変換, fractionDigits:1 (roundingMode:halfCeil)
- 1234.5678 は 1234.57 に変換, fractionDigits:2 (roundingMode:halfCeil)
- 1234.5678 は 1230.568 に変換, fractionDigits:3 (roundingMode:halfCeil)
- 1234.5678 は 1234.5678 に変換, fractionDigits:4 (roundingMode:halfCeil)
- 1234.5678 は 1234.56780 に変換, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの有効桁数。ブラウザの Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用し、fractionDigits より優先度は高いです。

:::

**例**
- 1234.5678 は 1000 に変換, significantDigits:1
- 1234.5678 は 1200 に変換, significantDigits:2
- 1234.5678 は 1230 に変換, significantDigits:3
- 1234.5678 は 1234 に変換, significantDigits:4
- 1234.5678 は 1234.6 に変換, significantDigits:5 (roundingMode:halfCeil)
- 1234.5678 は 1234.57 に変換, significantDigits:6 (roundingMode:halfCeil)
- 1234.5678 は 1234.568 に変換, significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 は 1234.5678 に変換, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=説明}
significantDigits と fractionDigits の両方を設定した場合の数値フォーマットの丸め優先度。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingPriority と同じ規則に従います。

:::

**例**
- 1234.5678 は 1230 に変換, significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 は 1234.5678 に変換, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
数値フォーマットの丸めモード。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingMode と同じ規則に従います。

:::

### encoding

**Type:** `"column" | undefined`

:::note{title=説明}
メジャーをマッピングするチャネル:

- column: メジャー列

:::

### parentId

**Type:** `string | undefined`

:::note{title=説明}
フラットなメジャー設定でツリー状のメジャー構造を構築します。parentId は親メジャーグループの ID を指し、階層構築に使用されます。

:::

:::tip{title=Tip}
メジャーツリーの設定方法は2つあります: 方法1は children でメジャーツリーを直接設定する方法、方法2は parentId を持つフラットなメジャーリストを指定する方法です。この2つは同時に使用できません。

:::


## page

**Type:** `Page | undefined`

:::note{title=説明}
ページネーション設定。ページネーションに使用するフィールド名を指定します。ディメンションである必要があります。

:::


### field

**Type:** `string`

:::note{title=説明}
ページネーションフィールド。ページネーションに使用するフィールド名を指定し、ディメンションである必要があります。

:::

### currentValue

**Type:** `string`

:::note{title=説明}
現在のページネーション値。現在ページを決定するために使用する値を指定します。

:::

**例**
'2023-01-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=説明}
チャートの背景色。デフォルトは透明です。色名文字列（例: 'red', 'blue'）または hex、rgb、rgba 値（例: '#ff0000', 'rgba(255,0,0,0.5)'）を指定できます。

:::


## borderColor

**Type:** `string | undefined`

:::note{title=説明}
テーブルの枠線色。

:::


## bodyFontSize

**Type:** `number | undefined`

:::note{title=説明}
テーブル本文のフォントサイズ。

:::


## bodyFontColor

**Type:** `string | undefined`

:::note{title=説明}
テーブル本文のフォント色。

:::


## bodyBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
テーブル本文の背景色。

:::


## headerFontSize

**Type:** `number | undefined`

:::note{title=説明}
行ヘッダーと列ヘッダーのフォントサイズ。

:::


## headerFontColor

**Type:** `string | undefined`

:::note{title=説明}
行ヘッダーと列ヘッダーのフォント色。

:::


## headerBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
行ヘッダーと列ヘッダーの背景色。

:::


## hoverHeaderBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
行または列ヘッダーセルにホバーしたときの背景色。ホバー中の行と列が交差するセルを強調表示します。

:::


## hoverHeaderInlineBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
行または列ヘッダーセルにホバーしたときの背景色。ホバー中の行と列にあるすべてのセルを強調表示します。

:::


## selectedBorderColor

**Type:** `string | undefined`

:::note{title=説明}
選択セルの枠線色。強調表示に使用します。

:::


## selectedBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
選択セルの背景色。強調表示に使用します。

:::


## bodyCellStyle

**Type:** `BodyCellStyle | BodyCellStyle[] | undefined`

:::note{title=説明}
テーブル本文部分のセルに特殊なスタイルを設定します。

:::


### selector

**Type:** `Selector | Selectors | FieldSelector | undefined`

:::note{title=説明}
データセレクタ。

`selector` を設定すると、数値セレクタ、局所データセレクタ、条件付きディメンションセレクタ、条件付きメジャーセレクタの4種類のデータマッチング機能を提供します。

`selector` を設定しない場合、スタイルはグローバルに適用されます。

注意: `selector` と `dynamicFilter` は同時に使用できません。`dynamicFilter` の優先度が高いです。

:::

**例**
数値セレクタ:
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

局所データセレクタ:
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

条件付きディメンションセレクタ:
selector = {
field: 'category',
operator: 'in',
value: 'tool'
}
selector = {
field: 'category',
operator: 'not in',
value: 'book'
}

条件付きメジャーセレクタ:
selector = {
field: 'profit',
operator: '>=',
value: 100
}
selector = {
field: 'profit',
operator: 'between'
value: [100, 300]
}

フィールド列フィルタ:
selector = {
field: 'category'
}
selector = {
field: ['category', 'profit']
}




#### field

**Type:** `string | string[]`

:::note{title=説明}
フィールド名。単一フィールドまたは複数フィールド配列を指定できます。

:::

**例**
単一フィールド:
field: 'sales'

複数フィールド:
field: ['sales', 'profit', 'revenue']



#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子:

- in: ディメンションフィールド値が 'value' リスト内にあるデータ項目を選択

- not in: ディメンションフィールド値が 'value' リスト内にないデータ項目を選択

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子:

- in: ディメンションフィールド値が 'value' リスト内にあるデータ項目を選択

- not in: ディメンションフィールド値が 'value' リスト内にないデータ項目を選択

operator と同じ。

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
選択するディメンション値。配列をサポートします。

:::

### dynamicFilter

**Type:** `TableDynamicFilter | undefined`

:::note{title=説明}
動的フィルタ（コード駆動）。

AI 生成の JavaScript コードで複雑なデータフィルタリングロジックを実装します。
Top N、統計分析、複雑条件など、静的 selector では表現しにくいシーンに適しています。

主な機能:

- 任意の複雑なデータフィルタ条件をサポート

- データ操作に組み込みユーティリティ関数を使用

- ブラウザ環境で安全に実行（Web Worker サンドボックス）

環境要件: ブラウザ環境のみをサポートします。Node.js 環境では fallback を使用します。

注意: `selector` と `dynamicFilter` は同時に使用できません。`dynamicFilter` の優先度が高いです。

テーブル動的フィルタの設定。

AI 生成の JavaScript コードでセル単位の精密なフィルタリングを実装します。

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=説明}
ユーザーのフィルタリング要件説明（自然言語）。

:::

**例**
"売上が 1000 を超えるセルを強調表示"

"各行で最大値のセルを強調表示"



#### code

**Type:** `string`

:::note{title=説明}
AI 生成の JavaScript フィルタリングコード。

- 組み込みユーティリティ関数のみ使用できます（_ または R からアクセス）

- 入力パラメータ: data（配列）。各項目には行番号を表す `_index` フィールドが含まれます。

- セルセレクタ配列を返す必要があります: Array<{ __row_index: number, field: string }>。

- `field` が "*" の場合、行全体が強調表示されます。

- 禁止: eval、Function、非同期操作、DOM API、ネットワークリクエスト。

:::

**例**
Top N フィルタ:
dynamicFilter = {
type: 'row-with-field',
description: '売上上位3製品を強調表示',
code: `
const sorted = _.sortBy(data, 'sales');
const reversed = [...sorted].reverse();
const result = _.take(reversed, 3);
return _.flatten(
_.map(result, item => [
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

複数条件フィルタ:
dynamicFilter = {
type: 'row-with-field',
description: '利益率が20%を超え、売上が5000を超える製品を強調表示',
code: `
const matched = _.filter(data, item => {
const profitRate = (item.profit / item.sales) * 100;
return profitRate > 20 && item.sales > 5000;
});
return _.flatten(
_.map(matched, item => [
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

相対値フィルタ:
dynamicFilter = {
type: 'row-with-field',
description: '平均を上回る売上の製品を強調表示',
code: `
const avgSales = _.meanBy(data, 'sales');
const matched = _.filter(data, item => item.sales > avgSales);
return _.flatten(
_.map(matched, item => [
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

グループ化フィルタ:
dynamicFilter = {
type: 'row-with-field',
description: '各地域で売上が最も高い製品を強調表示',
code: `
const grouped = _.groupBy(data, 'region');
const topByRegion = _.map(_.values(grouped), group => _.maxBy(group, 'sales'));
return _.flatten(
_.map(topByRegion, item => [
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

行全体を強調表示:
dynamicFilter = {
description: '売上が利益を超える行を強調表示',
code: `
const matched = _.filter(data, item => item.sales > item.profit);
return matched.map(item => ({
__row_index: item._index,
field: '*'
}));
`,
enabled: true
}



#### fallback

**Type:** `Selector | Selectors | undefined`

:::note{title=説明}
コード実行に失敗した場合、または環境がサポートされない場合のフォールバック案。

:::


##### field

**Type:** `string`

:::note{title=説明}
ディメンションフィールド ID。

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子:

- in: ディメンションフィールド値が 'value' リスト内にあるデータ項目を選択

- not in: ディメンションフィールド値が 'value' リスト内にないデータ項目を選択

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子:

- in: ディメンションフィールド値が 'value' リスト内にあるデータ項目を選択

- not in: ディメンションフィールド値が 'value' リスト内にないデータ項目を選択

operator と同じ。

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
選択するディメンション値。配列をサポートします。

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=説明}
動的フィルタ実行結果（ランタイムフィールド）。`prepare()` フェーズで書き込まれ、実行時は読み取り専用です。

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### backgroundColor

**Type:** `string | undefined`

:::note{title=説明}
セルの背景色。

:::

### enableBackgroundColorScale

**Type:** `boolean | undefined`

:::note{title=説明}
セル背景のカラースケールを有効にするかどうか。

:::

### backgroundColorScale

**Type:** `{ minValue?: number; maxValue?: number; minColor: string; maxColor: string; } | undefined`

:::note{title=説明}
セル背景色スケールのマッピング。`backgroundColor` より優先度が高いです。

:::


#### minValue

**Type:** `number | undefined`

:::note{title=説明}
最小値。未設定の場合、現在のデータ列の最小値がデフォルトになります。

:::

#### maxValue

**Type:** `number | undefined`

:::note{title=説明}
最大値。未設定の場合、現在のデータ列の最大値がデフォルトになります。

:::

#### minColor

**Type:** `string`

:::note{title=説明}
最小値に対応する色。

:::

#### maxColor

**Type:** `string`

:::note{title=説明}
最大値に対応する色。

:::

### enableProgressBar

**Type:** `boolean | undefined`

:::note{title=説明}
背景プログレスバー（セル値の大きさを反映するバー）を有効にするかどうか。デフォルトでは無効です。

:::

### barPositiveColor

**Type:** `string | undefined`

:::note{title=説明}
セル値が正の場合の背景バーの色。

:::

### barNegativeColor

**Type:** `string | undefined`

:::note{title=説明}
セル値が負の場合の背景バーの色。

:::

### barMin

**Type:** `number | undefined`

:::note{title=説明}
プログレスバーの最小値。
未設定の場合、列の最小値から自動計算されます。

:::

### barMax

**Type:** `number | undefined`

:::note{title=説明}
プログレスバーの最大値。
未設定の場合、列の最大値から自動計算されます。

:::

### textColor

**Type:** `string | undefined`

:::note{title=説明}
セル文字色。

:::

### textFontSize

**Type:** `number | undefined`

:::note{title=説明}
セル文字サイズ。

:::

### borderColor

**Type:** `string | undefined`

:::note{title=説明}
セルの枠線色。

:::

### borderLineWidth

**Type:** `number | undefined`

:::note{title=説明}
セル枠線の線幅。

:::


## indicatorsAsCol

**Type:** `boolean | undefined`

:::note{title=説明}
メジャーを列として表示するかどうか。`true` の場合はメジャーが水平方向（列）に展開され、`false` の場合は垂直方向（行）に展開されます。

:::

**例**
true




## totals

**Type:** `PivotTableTotals | undefined`

:::note{title=説明}
ピボットテーブルの総計と小計設定。

:::

**例**
{ row: { showGrandTotals: true, showSubTotals: true, subTotalsDimensions: ['category'] } }




### row

**Type:** `RowOrColumnTotalConfig | undefined`

:::note{title=説明}
行の総計と小計設定。

:::


#### showGrandTotals

**Type:** `boolean | undefined`

:::note{title=説明}
総計（総計行/列）を表示するかどうか。

:::

#### showSubTotals

**Type:** `boolean | undefined`

:::note{title=説明}
小計を表示するかどうか。

:::

#### subTotalsDimensions

**Type:** `string[] | undefined`

:::note{title=説明}
小計対象のディメンション。これらのディメンションで小計をグループ化します。

:::

**例**
['category', 'region']



### column

**Type:** `RowOrColumnTotalConfig | undefined`

:::note{title=説明}
列の総計と小計設定。

:::


#### showGrandTotals

**Type:** `boolean | undefined`

:::note{title=説明}
総計（総計行/列）を表示するかどうか。

:::

#### showSubTotals

**Type:** `boolean | undefined`

:::note{title=説明}
小計を表示するかどうか。

:::

#### subTotalsDimensions

**Type:** `string[] | undefined`

:::note{title=説明}
小計対象のディメンション。これらのディメンションで小計をグループ化します。

:::

**例**
['category', 'region']




## theme

**Type:** `Theme | undefined`

:::note{title=説明}
チャートテーマ。テーマは優先度の低い設定で、すべてのチャートタイプで共有される一般設定と、チャートカテゴリ内で共有される固有設定を含みます。

ライトテーマとダークテーマが組み込まれています。ユーザーは Builder でカスタムテーマを定義できます。

:::

**例**
'dark'

'light'

'customThemeName'




### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `Locale | undefined`

:::note{title=説明}
ロケール。チャート言語設定。'zh-CN' と 'en-US' をサポートします。別の方法として `intl.setLocale('zh-CN')` を呼び出して言語を設定できます。

:::
