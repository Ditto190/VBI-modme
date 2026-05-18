# Table

:::info{title=推奨}
\- 推奨フィールド構成: `任意` 個の指標、`任意` 個の次元

\- データの再構成をサポート: 少なくとも `任意` 個の指標、`任意` 個の次元

:::

:::info{title=エンコードマッピング}
次元ツリーと指標ツリーの設定のみをサポートし、デフォルトでは column にエンコードされます。

:::

:::note{title=説明}
テーブルは詳細データの表示に適しており、行と列が明確で具体的な値を確認しやすくなります。

適用シーン:

\- 詳細なデータ明細を表示する

\- データ項目を正確に比較する

\- 複数次元の属性を表示する

:::

:::warning{title=注意}
データ要件:

\- 少なくとも 1 つの次元フィールド

\- 少なくとも1つの指標フィールド

\- 次元フィールドはテーブルの列見出しとして使用されます

デフォルトで有効な機能:

\- 並べ替え、フィルタリング、ページネーションがデフォルトで有効です

:::


## chartType

**Type:** `"table"`

:::note{title=説明}
詳細データを表示する標準テーブルコンポーネント

:::

**例**
'table'




## dataset

**Type:** `Record[]`

:::note{title=説明}
TidyData 仕様に準拠した集計済みデータセットです。グラフのデータソースと構造を定義します。ユーザーが提供するデータセットに前処理は不要で、各フィールドが 1 列に、各レコードが 1 行に対応します。

:::

**例**
[{id: 1, name: "A", value: 100}, {id: 2, name: "B", value: 200}]




## dimensions

**Type:** `DimensionTree | undefined`

:::note{title=説明}
テーブル内の各次元は 1 つの列に対応します。

:::

**例**
[{id: "name", alias: "Name"}]




### id

**Type:** `string`

### alias

**Type:** `string | undefined`

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=説明}
次元の日付フォーマット設定

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=説明}
時間粒度。日付の表示精度を決定します

:::

### encoding

**Type:** `"row" | "column" | undefined`

:::note{title=説明}
次元をマッピングするチャネル

\- row: 複数の次元を行チャネルにマッピングできます

\- column: 複数の次元を列チャネルにマッピングできます

:::

### children

**Type:** `(TableDimension | DimensionGroup)[] | undefined`


#### id

**Type:** `string`

#### alias

**Type:** `string | undefined`

#### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=説明}
次元の日付フォーマット設定

:::


##### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=説明}
時間粒度。日付の表示精度を決定します

:::

#### encoding

**Type:** `"row" | "column" | undefined`

:::note{title=説明}
次元をマッピングするチャネル

\- row: 複数の次元を行チャネルにマッピングできます

\- column: 複数の次元を列チャネルにマッピングできます

:::


## measures

**Type:** `MeasureTree | undefined`

:::note{title=説明}
テーブル内の各指標は 1 つの行に対応し、指標の組み合わせをネイティブにサポートします。

:::

**例**
[{id: "value", alias: "Value"}]




### id

**Type:** `string`

:::note{title=説明}
指標グループ ID。一意である必要があります。

:::

### alias

**Type:** `string | undefined`

:::note{title=説明}
指標グループの別名。重複可能です。未指定の場合は ID が既定値になります。

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=説明}
数値の自動フォーマット。デフォルトで有効で、最優先です

autoFormat=true の場合、numFormat のすべての設定を上書きします

有効にすると、グラフのデータラベルとツールチップは指標値と言語環境に応じて適切なフォーマットを自動選択します

フォーマット規則: 10進数値で compact notation を有効にし、小数部は最小0桁、最大2桁、自動丸めを行い、ブラウザの Intl.NumberFormat 実装を使用します

例:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=説明}
指標のカスタム数値フォーマット。label と tooltip に自動適用されます

注意: カスタムフォーマットを使うには autoFormat=false を明示する必要があります。そうしないと autoFormat がこの設定を上書きします

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=説明}
数値フォーマットのタイプ。数値（10進数）、パーセント（%）、パーミル（‰）、科学表記をサポートします

:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの倍率。0にはできません

:::

**例**
\- 100000 は 10万 に変換, ratio:10000, symbol:"万"
\- 100000 は 10K に変換, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマットの記号。例: %, ‰

:::

**例**
\- 100000 は 10万 に変換, ratio:10000, symbol:"万"
\- 100000 は 10K に変換, ratio:1000, symbol:"K"



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
数値フォーマットの小数桁数。ブラウザの Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用します。significantDigits より優先度は低くなります

:::

**例**
\- 1234.5678 は 1235 に変換されます。fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 は 1234.6 に変換されます。fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 は 1234.57 に変換されます。fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 は 1230.568 に変換されます。fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 は 1234.5678 に変換されます。fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 は 1234.56780 に変換されます。fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの有効数字。ブラウザの Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用します。fractionDigits より優先度が高くなります

:::

**例**
\- 1234.5678 は 1000 に変換されます。significantDigits:1
\- 1234.5678 は 1200 に変換されます。significantDigits:2
\- 1234.5678 は 1230 に変換されます。significantDigits:3
\- 1234.5678 は 1234 に変換されます。significantDigits:4
\- 1234.5678 は 1234.6 に変換されます。significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 は 1234.57 に変換されます。significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 は 1234.568 に変換されます。significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 は 1234.5678 に変換されます。significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=説明}
significantDigits と fractionDigits の両方が設定された場合の数値フォーマットの丸め優先度。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingPriority と同じ規則に従います

:::

**例**
\- 1234.5678 は 1230 に変換されます。significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 は 1234.5678 に変換されます。significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
数値フォーマットの丸めモード。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingMode と同じ規則に従います

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=説明}
数値フォーマットのタイプ。数値（10進数）、パーセント（%）、パーミル（‰）、科学表記をサポートします

:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの倍率。0にはできません

:::

**例**
\- 100000 は 10万 に変換, ratio:10000, symbol:"万"
\- 100000 は 10K に変換, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマットの記号。例: %, ‰

:::

**例**
\- 100000 は 10万 に変換, ratio:10000, symbol:"万"
\- 100000 は 10K に変換, ratio:1000, symbol:"K"



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
数値フォーマットの小数桁数。ブラウザの Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用します。significantDigits より優先度は低くなります

:::

**例**
\- 1234.5678 は 1235 に変換されます。fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 は 1234.6 に変換されます。fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 は 1234.57 に変換されます。fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 は 1230.568 に変換されます。fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 は 1234.5678 に変換されます。fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 は 1234.56780 に変換されます。fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの有効数字。ブラウザの Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用します。fractionDigits より優先度が高くなります

:::

**例**
\- 1234.5678 は 1000 に変換されます。significantDigits:1
\- 1234.5678 は 1200 に変換されます。significantDigits:2
\- 1234.5678 は 1230 に変換されます。significantDigits:3
\- 1234.5678 は 1234 に変換されます。significantDigits:4
\- 1234.5678 は 1234.6 に変換されます。significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 は 1234.57 に変換されます。significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 は 1234.568 に変換されます。significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 は 1234.5678 に変換されます。significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=説明}
significantDigits と fractionDigits の両方が設定された場合の数値フォーマットの丸め優先度。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingPriority と同じ規則に従います

:::

**例**
\- 1234.5678 は 1230 に変換されます。significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 は 1234.5678 に変換されます。significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
数値フォーマットの丸めモード。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingMode と同じ規則に従います

:::

### encoding

**Type:** `"column" | undefined`

:::note{title=説明}
指標をマッピングするチャネル

\- column: 指標列

:::

### parentId

**Type:** `string | undefined`

:::note{title=説明}
フラットな指標設定形式でツリー状の指標グループを構築します。parentId は親指標グループの id を指し、指標ツリーの構築に使います

:::

:::tip{title=ヒント}
指標ツリーの設定方法は2つあります。方法1は children を持つ指標ツリーを直接設定すること、方法2は parentId を持つフラットな指標リストを設定することです。この2つは同時に使用できません

:::

### children

**Type:** `(TableMeasure | MeasureGroup)[] | undefined`

:::note{title=説明}
指標グループ内の子指標または指標グループ。

:::


## page

**Type:** `Page | undefined`

:::note{title=説明}
ページネーション設定。ページネーションに使用するフィールド名を指定します。このフィールドは次元である必要があります。

:::


### field

**Type:** `string`

:::note{title=説明}
ページネーションフィールド。ページネーションに使うフィールド名を指定します。必ず次元である必要があります

:::

### currentValue

**Type:** `string`

:::note{title=説明}
現在のページネーション値。現在のページを判定するための値を指定します

:::

**例**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=説明}
背景色は色名文字列（例: 'red', 'blue'）、または hex、rgb、rgba 値（例: '#ff0000', 'rgba(255,0,0,0.5)'）で指定できます

:::


## borderColor

**Type:** `string | undefined`

:::note{title=説明}
テーブルの境界線色

:::


## bodyFontSize

**Type:** `number | undefined`

:::note{title=説明}
テーブル本文のフォントサイズ

:::


## bodyFontColor

**Type:** `string | undefined`

:::note{title=説明}
テーブル本文のフォント色

:::


## bodyBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
テーブル本文の背景色

:::


## headerFontSize

**Type:** `number | undefined`

:::note{title=説明}
Header font size

:::


## headerFontColor

**Type:** `string | undefined`

:::note{title=説明}
ヘッダーのフォント色

:::


## headerBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
ヘッダーの背景色

:::


## hoverHeaderBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
ヘッダーセルにマウスをホバーしたときの背景色。ホバー中のセルを強調表示するために使用します。

:::


## hoverHeaderInlineBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
ヘッダーにマウスをホバーしたときの行全体の背景色。ホバー中の行を強調表示するために使用します。

:::


## selectedBorderColor

**Type:** `string | undefined`

:::note{title=説明}
選択セルの境界線色。選択状態を強調表示するために使用します。

:::


## selectedBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
選択セルの背景色。選択状態を強調表示するために使用します。

:::


## bodyCellStyle

**Type:** `BodyCellStyle | BodyCellStyle[] | undefined`

:::note{title=説明}
テーブル本文部分のセルに特殊なスタイルを設定します。

:::


### selector

**Type:** `Selector | Selectors | FieldSelector | undefined`

:::note{title=説明}
- not in: 次元フィールド値が `value` 配列に含まれないデータ項目を選択します。

selector を設定すると、数値セレクター、部分データセレクター、条件付き次元セレクター、条件付き指標セレクターの 4 種類のデータマッチングを利用できます。

selector が設定されていない場合、このスタイルは全体に適用されます。

注意: selector と dynamicFilter は同時に使用できません。dynamicFilter の優先度が高くなります。

:::

**例**
数値セレクター
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

部分データセレクター
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

条件付き次元セレクター
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

条件付き指標セレクター
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

フィールド列フィルタリング
selector = {
field: 'category'
}
selector = {
field: ['category', 'profit']
}




#### field

**Type:** `string | string[]`

:::note{title=説明}
フィールド名。単一フィールドまたは複数フィールドの配列を指定できます。

:::

**例**
単一フィールド
field: 'sales'

複数フィールド
field: ['sales', 'profit', 'revenue']



#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
テキストの垂直揃え。通常は 'top' に設定し、テキストを注釈点の下側に表示して、グラフの可視領域内に収めます。

\- in: 次元フィールドの値が value 配列に含まれるデータ項目を選択します。

\- not in: 次元フィールドの値が value 配列に含まれないデータ項目を選択します。

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
テキストの垂直揃え。通常は 'top' に設定し、テキストを注釈点の下側に表示して、グラフの可視領域内に収めます。

\- in: 次元フィールドの値が value 配列に含まれるデータ項目を選択します。

\- not in: 次元フィールドの値が value 配列に含まれないデータ項目を選択します。

operator と同じ

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
次元フィールドの値を選択します。配列をサポートします。

:::

### dynamicFilter

**Type:** `TableDynamicFilter | undefined`

:::note{title=説明}
動的フィルター（コード駆動）



AI が生成した JavaScript コードで複雑なデータフィルタリングロジックを実装します。

Top N、統計分析、複雑な条件など、静的 selector では表現しにくいシナリオに適しています。



主な機能:

\- 任意に複雑なデータフィルタリング条件をサポートします。

\- データ操作に組み込みユーティリティ関数を使用します。

\- ブラウザー環境（Web Worker サンドボックス）で安全に実行されます。



環境要件: ブラウザー環境のみをサポートします。Node.js 環境ではフォールバックを使用します。



注意: selector と dynamicFilter は同時に使用できません。dynamicFilter の優先度が高くなります。



テーブル動的フィルター設定



AI が生成した JavaScript コードで、テーブルのセル単位の精密なフィルタリングを実装します。

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=説明}
ユーザーのフィルタリング要件説明（自然言語）。

:::

**例**
"売上が1000を超えるセルをハイライト"

"各行で最大値のセルをハイライト"



#### code

**Type:** `string`

:::note{title=説明}
AI 生成の JavaScript フィルタリングコード。



\- 組み込みユーティリティ関数（_ または R からアクセス可能）のみ使用できます。

\- 入力パラメーター: data（配列）。各項目には行番号を表す _index フィールドが含まれます。

\- セルセレクターの配列 Array<{ __row_index: number, field: string }> を返す必要があります。

\- field が "*" の場合、行全体を強調表示することを示します。

\- 禁止事項: eval、Function、非同期処理、DOM API、ネットワークリクエスト。

:::

**例**
Top N フィルタリング
dynamicFilter = {
type: 'row\-with\-field',
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

複数条件フィルタリング
dynamicFilter = {
type: 'row\-with\-field',
description: 'Highlight products with profit margin > 20% and sales > 5000',
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

相対値フィルタリング
dynamicFilter = {   *
type: 'row\-with\-field',
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

グループ別フィルタリング
dynamicFilter = {
type: 'row\-with\-field',
description: 'Highlight the product with the highest sales in each region',
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

行全体を強調表示
dynamicFilter = {
description: 'Highlight rows where sales are greater than profit',
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
次元フィールド。dimensions 内の項目 ID。

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
テキストの垂直揃え。通常は 'top' に設定し、テキストを注釈点の下側に表示して、グラフの可視領域内に収めます。

\- in: 次元フィールドの値が value 配列に含まれるデータ項目を選択します。

\- not in: 次元フィールドの値が value 配列に含まれないデータ項目を選択します。

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
テキストの垂直揃え。通常は 'top' に設定し、テキストを注釈点の下側に表示して、グラフの可視領域内に収めます。

\- in: 次元フィールドの値が value 配列に含まれるデータ項目を選択します。

\- not in: 次元フィールドの値が value 配列に含まれないデータ項目を選択します。

operator と同じ

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
次元フィールドの値を選択します。配列をサポートします。

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=説明}
動的フィルタ実行結果（ランタイムフィールド）



prepare() フェーズで書き込まれ、実行時は読み取り専用

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
セルの背景色

:::

### enableBackgroundColorScale

**Type:** `boolean | undefined`

:::note{title=説明}
背景色のカラースケール設定を有効にするかどうか

:::

### backgroundColorScale

**Type:** `{ minValue?: number; maxValue?: number; minColor: string; maxColor: string; } | undefined`

:::note{title=説明}
セル背景色のカラースケールマッピング。backgroundColor より優先されます

:::


#### minValue

**Type:** `number | undefined`

:::note{title=説明}
最小値。未設定の場合は現在のデータ列の最小値が既定値になります

:::

#### maxValue

**Type:** `number | undefined`

:::note{title=説明}
最大値。未設定の場合は現在のデータ列の最大値が既定値になります

:::

#### minColor

**Type:** `string`

:::note{title=説明}
最小値に対応する色

:::

#### maxColor

**Type:** `string`

:::note{title=説明}
最大値に対応する色

:::

### enableProgressBar

**Type:** `boolean | undefined`

:::note{title=説明}
進捗バー機能（セル値の相対的な大きさを示すバー）を有効にするかどうか。デフォルトでは無効です

:::

### barPositiveColor

**Type:** `string | undefined`

:::note{title=説明}
セル値が正の場合の進捗バー色

:::

### barNegativeColor

**Type:** `string | undefined`

:::note{title=説明}
セル値が負の場合の進捗バー色

:::

### barMin

**Type:** `number | undefined`

:::note{title=説明}
進捗バーの最小値



未設定の場合は列の最小値を自動計算します

:::

### barMax

**Type:** `number | undefined`

:::note{title=説明}
進捗バーの最大値



未設定の場合は列の最大値を自動計算します

:::

### textColor

**Type:** `string | undefined`

:::note{title=説明}
セルテキスト色

:::

### textFontSize

**Type:** `number | undefined`

:::note{title=説明}
セルテキストのフォントサイズ

:::

### borderColor

**Type:** `string | undefined`

:::note{title=説明}
セルの境界線色

:::

### borderLineWidth

**Type:** `number | undefined`

:::note{title=説明}
セル境界線の線幅

:::


## totals

**Type:** `TotalType | undefined`

:::note{title=説明}
表示する集計行のタイプ。指標列にのみ適用されます

\- 'sum': Displays the sum row

\- 'avg': Displays the average row

\- 'max': Displays the maximum row

\- 'min': Displays the minimum row

\- 'count': Displays the count row



テーブル集計行タイプ

\- 'sum': Sum

\- 'avg': Average

\- 'max': Maximum

\- 'min': Minimum

\- 'count': Count

:::

**例**
'sum'




## theme

**Type:** `Theme | undefined`

:::note{title=説明}
グラフテーマ。テーマは優先度の低い設定で、すべてのグラフタイプで共有される共通設定と、各グラフタイプ固有の設定を含みます。組み込みテーマには 'light' と 'dark' があり、Builder でカスタマイズできます。



テーマ



組み込みの light / dark テーマがあります。新しいテーマは registerTheme でカスタマイズできます。

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

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=説明}
グラフの言語設定。'zh-CN' と 'en-US' をサポートします。また、intl.setLocale('zh-CN') メソッドで言語を設定できます。

:::
