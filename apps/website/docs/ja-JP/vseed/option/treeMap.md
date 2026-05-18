# TreeMap

:::info{title=エンコーディングマッピング}
ツリーマップは次の視覚チャネルをサポートします:

`color`: 色チャネル、`複数の次元`または`1 つの指標`をサポート

`label`: ラベルチャネル、`複数の次元`と`複数の指標`をサポート

`tooltip`: ツールチップチャネル、`複数の次元`と`複数の指標`をサポート

:::

:::note{title=説明}
ツリーマップは階層データを表示するために使用され、各矩形領域の大きさが数値の大きさを表します。

適用シーン:

\- 階層データの割合分布を表示

\- 全体と部分の関係を強調

:::

:::warning{title=Warning}
データ要件:

\- 面積サイズのマッピングに使用する数値フィールドが少なくとも1つ必要

\- 階層分割に使用する次元フィールドが少なくとも1つ必要

:::


## chartType

**Type:** `"treeMap"`

:::note{title=説明}
ツリーマップ



ツリーマップは、階層データの比例関係を表示します。

:::

**例**
'treeMap'




## dataset

**Type:** `Record[]`

:::note{title=説明}
データセット



TidyData 仕様に従って集計済みのデータセットで、チャートのデータソースと構造を定義します。

:::

**例**
[{category:'A', value:30}, {category:'B', value:70}]




## dimensions

**Type:** `HierarchyDimension[] | undefined`

:::note{title=説明}
次元



データの階層構造を定義するための次元設定。

:::

**例**
[{id: 'category', alias: 'カテゴリ'}]




### id

**Type:** `string`

:::note{title=説明}
次元に対応するフィールド ID

:::

### alias

**Type:** `string | undefined`

:::note{title=説明}
次元の別名

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=説明}
次元の日付フォーマット設定

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=説明}
時間粒度。日付表示の精度を決定します

:::

### encoding

**Type:** `"tooltip" | "label" | "hierarchy" | undefined`

:::note{title=説明}
次元をマッピングするチャネル

\- hierarchy: 複数の次元を階層チャネルへマッピングできます

\- label: 複数の次元をラベルチャネルへマッピングできます

\- tooltip: 複数の次元をツールチップチャネルへマッピングできます

:::

:::tip{title=ヒント}
最初の次元は color チャネルへ直接マッピングされます。

:::


## measures

**Type:** `HierarchyMeasure[] | undefined`

:::note{title=説明}
指標



扇形のサイズ（面積）を定義するための指標設定。

:::

**例**
[{id: 'value', alias: '値'}]




### id

**Type:** `string`

:::note{title=説明}
指標 ID。重複できません

:::

### alias

**Type:** `string | undefined`

:::note{title=説明}
指標の別名。重複可能。未設定の場合、alias は id になります

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=説明}
自動数値フォーマット。デフォルトで有効で、優先度が最も高い

autoFormat=true の場合、すべての numFormat 設定を上書きします

有効にすると、チャートのデータラベルとツールチップは、指標値と言語環境に基づいて適切なフォーマットを自動選択します

フォーマット規則: 10進数、compact notation 有効、小数部は最小0桁・最大2桁、自動丸め、ブラウザの Intl.NumberFormat 実装を使用

例:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=説明}
指標のカスタム数値フォーマット。ラベルとツールチップに自動適用されます

注意: カスタムフォーマットを使用するには autoFormat=false を明示的に設定する必要があります。そうしないと autoFormat がこの設定を上書きします

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
\- 100000 は 10万 に変換, ratio:10000, symbol:"万"
\- 100000 は 10K に変換, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマット記号。例: %, ‰

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
数値フォーマットの小数桁数。ブラウザの Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用し、significantDigits より優先度は低いです

:::

**例**
\- 1234.5678 は 1235 に変換, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 は 1234.6 に変換, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 は 1234.57 に変換, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 は 1230.568 に変換, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 は 1234.5678 に変換, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 は 1234.56780 に変換, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの有効桁数。ブラウザの Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用し、fractionDigits より優先度は高いです

:::

**例**
\- 1234.5678 は 1000 に変換, significantDigits:1
\- 1234.5678 は 1200 に変換, significantDigits:2
\- 1234.5678 は 1230 に変換, significantDigits:3
\- 1234.5678 は 1234 に変換, significantDigits:4
\- 1234.5678 は 1234.6 に変換, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 は 1234.57 に変換, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 は 1234.568 に変換, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 は 1234.5678 に変換, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=説明}
significantDigits と fractionDigits の両方を設定した場合の数値フォーマットの丸め優先度。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingPriority と同じ規則に従います

:::

**例**
\- 1234.5678 は 1230 に変換, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 は 1234.5678 に変換, significantDigits:3 (roundingPriority:morePrecision)



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
数値フォーマットタイプ。数値（10進数）、パーセント（%）、パーミル（‰）、科学表記をサポート

:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの比率。0 にはできません

:::

**例**
\- 100000 は 10万 に変換, ratio:10000, symbol:"万"
\- 100000 は 10K に変換, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマット記号。例: %, ‰

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
数値フォーマットの小数桁数。ブラウザの Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用し、significantDigits より優先度は低いです

:::

**例**
\- 1234.5678 は 1235 に変換, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 は 1234.6 に変換, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 は 1234.57 に変換, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 は 1230.568 に変換, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 は 1234.5678 に変換, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 は 1234.56780 に変換, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの有効桁数。ブラウザの Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用し、fractionDigits より優先度は高いです

:::

**例**
\- 1234.5678 は 1000 に変換, significantDigits:1
\- 1234.5678 は 1200 に変換, significantDigits:2
\- 1234.5678 は 1230 に変換, significantDigits:3
\- 1234.5678 は 1234 に変換, significantDigits:4
\- 1234.5678 は 1234.6 に変換, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 は 1234.57 に変換, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 は 1234.568 に変換, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 は 1234.5678 に変換, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=説明}
significantDigits と fractionDigits の両方を設定した場合の数値フォーマットの丸め優先度。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingPriority と同じ規則に従います

:::

**例**
\- 1234.5678 は 1230 に変換, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 は 1234.5678 に変換, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
数値フォーマットの丸めモード。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingMode と同じ規則に従います

:::

### encoding

**Type:** `"tooltip" | "label" | "size" | undefined`

:::note{title=説明}
指標をマッピングするチャネル

\- size: 指標をサイズチャネルへマッピングし、Treemap や Sunburst などのチャートで面積またはサイズを表示します。

\- label: 指標をラベルチャネルへマッピング

\- tooltip: 指標をツールチップチャネルへマッピング

:::

### parentId

**Type:** `string | undefined`

:::note{title=説明}
フラットな指標設定形式でツリー状の指標グループを構築します。parentId は親指標グループの id を指し、指標ツリーの構築に使用されます

:::

:::tip{title=ヒント}
指標ツリーの設定方法は2つあります: 方法1は children で指標ツリーを直接設定する方法、方法2は parentId を持つフラットな指標リストを設定する方法です。この2つの方法は同時に使用できません

:::


## page

**Type:** `Page | undefined`

:::note{title=説明}
ページネーション設定



ページネーションに使用するフィールド名を指定します。次元である必要があります

:::


### field

**Type:** `string`

:::note{title=説明}
ページネーションフィールド。ページネーションに使用するフィールド名を指定し、次元である必要があります

:::

### currentValue

**Type:** `string`

:::note{title=説明}
現在のページネーション値。現在ページを決定するために使用する値を指定します

:::

**例**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=説明}
チャートの背景色



背景色には色名文字列（例: 'red', 'blue'）または hex、rgb、rgba 値（例: '#ff0000', 'rgba(255,0,0,0.5)'）を指定できます

:::


## color

**Type:** `Color | undefined`

:::note{title=説明}
色



チャートの配色を定義する色設定。色リスト、色マッピング、色グラデーションを含みます。

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=説明}
チャート内の各要素の色を定義する離散カラースキーム

:::

**例**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=説明}
チャート内の各要素の色を定義する線形グラデーションカラースキーム

:::

**例**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=説明}
データ値を特定の色へマッピングするための色マッピング

:::

**例**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=説明}
正負色設定。チャート内の正の値の色を定義します

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=説明}
正負色設定。チャート内の負の値の色を定義します

:::


## label

**Type:** `Label | undefined`

:::note{title=説明}
ラベル



チャートデータラベルを定義するラベル設定。位置、フォーマット、スタイルを含みます。

:::


### enable

**Type:** `false | true`

:::note{title=説明}
ラベル機能を有効にするかどうか

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルを次の行へ折り返すかどうか

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルに指標値を表示するかどうか

複数指標のシナリオでは値の競合を心配する必要はありません。描画に関連するすべての指標は `foldMeasures` 処理を経て、単一データポイントを表す1 つの指標へ統合されます

注意: encoding の label の優先度が高いため、この設定は encoding の label には影響しません

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルに指標値の割合を表示するかどうか

複数指標のシナリオでは値の競合を心配する必要はありません。描画に関連するすべての指標は `foldMeasures` 処理を経て、単一データポイントを表す1 つの指標へ統合されます

注意: encoding の label の優先度が高いため、この設定は encoding の label には影響しません

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルに次元ラベルを表示するかどうか

すべての次元ラベルを表示

注意: encoding の label の優先度が高いため、この設定は encoding の label には影響しません

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=説明}
ラベル値を自動フォーマットするかどうか。autoFormat が true の場合、numFormat 設定は無視されます

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=説明}
ラベル値のフォーマット設定。`measure` の `format` とマージされ、`measure` の `format` の優先度が高くなります。numFormat の優先度は autoFormat より低くなります

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
\- 100000 は 10万 に変換, ratio:10000, symbol:"万"
\- 100000 は 10K に変換, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマット記号。例: %, ‰

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
数値フォーマットの小数桁数。ブラウザの Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用し、significantDigits より優先度は低いです

:::

**例**
\- 1234.5678 は 1235 に変換, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 は 1234.6 に変換, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 は 1234.57 に変換, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 は 1230.568 に変換, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 は 1234.5678 に変換, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 は 1234.56780 に変換, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの有効桁数。ブラウザの Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用し、fractionDigits より優先度は高いです

:::

**例**
\- 1234.5678 は 1000 に変換, significantDigits:1
\- 1234.5678 は 1200 に変換, significantDigits:2
\- 1234.5678 は 1230 に変換, significantDigits:3
\- 1234.5678 は 1234 に変換, significantDigits:4
\- 1234.5678 は 1234.6 に変換, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 は 1234.57 に変換, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 は 1234.568 に変換, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 は 1234.5678 に変換, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=説明}
significantDigits と fractionDigits の両方を設定した場合の数値フォーマットの丸め優先度。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingPriority と同じ規則に従います

:::

**例**
\- 1234.5678 は 1230 に変換, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 は 1234.5678 に変換, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
数値フォーマットの丸めモード。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingMode と同じ規則に従います

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=説明}
ラベル font size

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=説明}
ラベル font weight

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
ラベルの背景色

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=説明}
ラベルのストローク色

:::

### labelColor

**Type:** `string | undefined`

:::note{title=説明}
ラベルfont色

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=説明}
グラフィック要素の色に基づいてラベルのフォント色を自動反転するかどうか

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=説明}
ラベル位置

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルの重なり回避機能を有効にするかどうか

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=説明}
ラベル filtering; the default relationship between selectors is OR

:::


#### field

**Type:** `string`

:::note{title=説明}
次元フィールド。特定の次元項目の ID

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

\- in: 次元フィールド値が指定値内にあるデータ項目を選択

\- not in: 次元フィールド値が指定値内にないデータ項目を選択

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

\- in: 次元フィールド値が指定値内にあるデータ項目を選択

\- not in: 次元フィールド値が指定値内にないデータ項目を選択

operator と同じ

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
次元フィールド値を選択します。配列をサポート

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=説明}
動的フィルタ（AI 生成コード実行）

AI 生成の JavaScript コードで複雑なデータフィルタリングロジックを実装します

主な機能:

\- 任意に複雑なデータフィルタ条件をサポート

\- データ操作に組み込みユーティリティ関数を使用

\- ブラウザ環境で安全に実行（Web Worker サンドボックス）

環境要件: ブラウザ環境のみをサポートします。Node.js 環境では fallback を使用します

注意: selector と dynamicFilter は同時に使用できません。dynamicFilter の優先度が高いです

チャート動的フィルタ設定

AI 生成の JavaScript コードでチャートマーク（バー、ポイントなど）のフィルタリングを実装します

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=説明}
ユーザーのフィルタリング要件説明（自然言語）

:::

**例**
"売上が 1000 を超える列を強調表示"

"各エリアで利益率が最も高い列を強調表示"



#### code

**Type:** `string`

:::note{title=説明}
AI 生成の JavaScript フィルタリングコード

\- 組み込みユーティリティ関数のみ使用できます（_ または R からアクセス）

\- 入力パラメータ: data（配列）。各項目には行番号を表す __row_index フィールドが含まれます

\- 行インデックスとフィールドの組み合わせ配列を返す必要があります: Array<{ __row_index: number, field: string }>

\- __row_index は元データ項目の行番号を表し、field は強調表示するフィールドを表します

\- 禁止: eval、Function、非同期操作、DOM API、ネットワークリクエスト

:::

**例**
売上が 1000 を超えるデータ項目の sales フィールドを強調表示
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

各エリアで利益率が最も高いデータ項目を強調表示
```javascript
const grouped = _.groupBy(data, 'area');
const maxItems = _.map(grouped, group =>
_.maxBy(group, item => item.profit / item.sales)
);
return _.flatten(
_.map(maxItems, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'profit' }
])
);
```

複数条件でフィルタリングされたデータ項目を強調表示
```javascript
const filtered = _.filter(data, item => {
const profitRate = item.profit / item.sales;
return profitRate > 0.2 && item.sales > 5000;
});
return _.flatten(
_.map(filtered, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'sales' }
])
);
```



#### fallback

**Type:** `Selector | Selectors | undefined`

:::note{title=説明}
コード実行に失敗した場合、または環境がサポートされない場合のフォールバック案

:::


##### field

**Type:** `string`

:::note{title=説明}
次元フィールド。特定の次元項目の ID

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

\- in: 次元フィールド値が指定値内にあるデータ項目を選択

\- not in: 次元フィールド値が指定値内にないデータ項目を選択

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

\- in: 次元フィールド値が指定値内にあるデータ項目を選択

\- not in: 次元フィールド値が指定値内にないデータ項目を選択

operator と同じ

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
次元フィールド値を選択します。配列をサポート

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


## tooltip

**Type:** `Tooltip | undefined`

:::note{title=説明}
ツールチップ



チャートのツールチップを定義するツールチップ設定。位置、フォーマット、スタイルなどを含みます。

:::


### enable

**Type:** `false | true`

:::note{title=説明}
ツールチップを有効にするかどうか

:::


## theme

**Type:** `Theme | undefined`

:::note{title=説明}
チャートテーマ。テーマの優先度は低く、すべてのチャートタイプで共有される共通設定と、各チャートカテゴリ固有の設定を含みます

組み込みのライトテーマとダークテーマ。ユーザーは Builder でカスタムテーマを定義できます

テーマ

組み込みのライトテーマとダークテーマ。registerTheme で新しいテーマをカスタマイズできます。

:::

**例**
'dark'

'light'




### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=説明}
言語

チャート言語設定。'zh-CN' と 'en-US' をサポートします。さらに intl.setLocale('zh-CN') メソッドを呼び出して言語を指定できます。

:::
