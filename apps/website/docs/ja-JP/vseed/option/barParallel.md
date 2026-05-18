# BarParallel

:::info{title=推奨}
\- 推奨フィールド設定: `1`個の指標、`2`個の次元

\- データリシェイプをサポート: 少なくとも `1`個の指標、`0`個の次元

:::

:::info{title=エンコードマッピング}
並列棒グラフは以下の視覚チャネルをサポートします:

`yAxis`  : Y軸チャネル、`複数の次元`をサポートし、次元値に基づいてY軸へマッピングします

`xAxis`  : X軸チャネル、`複数の指標`をサポートし、指標値に基づいてX軸へマッピングします

`detail` : 詳細チャネル、`複数の次元`をサポートし、同じ色系列の中でより細かい粒度のデータを表示するために使用します

`color`  : 色チャネル、`複数の次元`または`1つの指標`をサポートします。次元の色はデータ系列の区別に使い、指標の色は値をマーク色へ線形マッピングします

`tooltip`: ツールチップチャネル、`複数の次元`と`複数の指標`をサポートし、データ点にマウスを合わせたときに表示されます

`label`  : ラベルチャネル、`複数の次元`と`複数の指標`をサポートし、データ点にデータラベルを表示します

:::

:::note{title=説明}
並列棒グラフは、複数の指標を横方向に並べて比較するシナリオに適しており、複数の棒を並列に配置して異なる指標値を表示します。

適用シナリオ:

- カテゴリ名が長い場合の複数指標比較。

- ランキングと数値を同時に表示する横方向比較。

- 多次元データの並列分析。

:::

:::warning{title=Warning}
データ要件:

\- 少なくとも1つの指標フィールド

\- 最初の次元はY軸に配置されます。残りの次元は指標名（複数指標が存在する場合）と結合され、凡例項目として表示されます。

\- すべての指標は自動的に1つの指標に統合されます。

デフォルトで有効な機能:

\- 凡例、軸、データラベル、ツールチップがデフォルトで有効です。

:::


## chartType

**Type:** `"barParallel"`

:::note{title=説明}
並列棒グラフは、複数指標の横方向の並列比較に適しています。

:::

**例**
'barParallel'




## dataset

**Type:** `Record[]`

:::note{title=説明}
データソース: TidyData 仕様に準拠した集計済みデータセットで、チャートのデータソースと構造を定義します。ユーザー入力データセットは事前処理不要です。VSeed の強力なデータリシェイプ機能が自動的に整形を行います。並列棒グラフのデータは最終的に2つの次元と1つの指標に変換されます。

:::

**例**
[{category:'A', value1:100, value2:200}, {category:'B', value1:150, value2:250}]




## dimensions

**Type:** `BarDimension[] | undefined`

:::note{title=説明}
次元: 最初の次元はY軸にマッピングされます。残りの次元は指標名（複数指標が存在する場合）と結合され、凡例項目として表示されます。

:::

**例**
[{id: 'category', alias: 'category'}]




### id

**Type:** `string`

:::note{title=説明}
次元に対応するフィールドID

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
時間粒度。日付の表示精度を決定します

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "yAxis" | undefined`

:::note{title=説明}
次元をマッピングするチャネル

\- yAxis: 複数の次元をY軸にマッピングできます

\- color: 複数の次元を色チャネルにマッピングできます

\- detail: 複数の次元を詳細チャネルにマッピングできます

\- tooltip: 複数の次元をツールチップチャネルにマッピングできます

\- label: 複数の次元をラベルチャネルにマッピングできます

\- row: 複数の次元を行チャネルにマッピングできます

\- column: 複数の次元を列チャネルにマッピングできます

:::


## measures

**Type:** `BarMeasure[] | undefined`

:::note{title=説明}
指標: 並列棒グラフの指標は自動的に1つの指標に統合され、X軸へマッピングされます。複数指標が存在する場合、指標名は残りの次元と結合されて凡例項目として表示されます。

:::

**例**
[{id: 'value1', alias: 'measure1'}, {id: 'value2', alias: 'measure2'}]




### id

**Type:** `string`

:::note{title=説明}
指標ID。一意である必要があります

:::

### alias

**Type:** `string | undefined`

:::note{title=説明}
指標の別名。重複可能です。未設定の場合、別名は id になります

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=説明}
数値の自動フォーマット。デフォルトで有効で、最優先です

autoFormat=true の場合、すべての numFormat 設定を上書きします

有効にすると、チャートのデータラベルとツールチップは、指標値とロケールに応じて適切なフォーマットを自動選択します

フォーマット規則: コンパクト表記を有効にした小数。最小小数桁数は0、最大小数桁数は2、自動丸めを行い、ブラウザの Intl.NumberFormat 実装を使用します

例:

\- locale='zh-CN': 749740.264 → 74.45万

\- locale='en-US': 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=説明}
指標のカスタム数値フォーマット。ラベルとツールチップに自動適用されます

注意: カスタムフォーマットを使用するには autoFormat=false を明示的に設定してください。そうしない場合、autoFormat がこの設定を上書きします

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=説明}
数値フォーマットのタイプ。number（小数）、percent（%）、permille（‰）、科学表記をサポートします

:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの比率。0 は指定できません

:::

**例**
\- 100000 は 10万 に変換, ratio:10000, symbol:"万"
\- 100000 は 10K に変換, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマットの記号（例: %, ‰）

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
数値フォーマットのサフィックス

:::

#### prefix

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマットのプレフィックス

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの小数桁数。ブラウザの Intl.NumberFormat minimumFractionDigits と maximumFractionDigits を使用し、significantDigits より優先度は低くなります

:::

**例**
\- 1234.5678 は 1235, fractionDigits:0 (roundingMode:halfCeil) に変換されます
\- 1234.5678 は 1234.6, fractionDigits:1 (roundingMode:halfCeil) に変換されます
\- 1234.5678 は 1234.57, fractionDigits:2 (roundingMode:halfCeil) に変換されます
\- 1234.5678 は 1230.568, fractionDigits:3 (roundingMode:halfCeil) に変換されます
\- 1234.5678 は 1234.5678, fractionDigits:4 (roundingMode:halfCeil) に変換されます
\- 1234.5678 は 1234.56780, fractionDigits:5 (roundingMode:halfCeil) に変換されます



#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの有効桁数。ブラウザの Intl.NumberFormat minimumSignificantDigits と maximumSignificantDigits を使用し、fractionDigits より優先度が高くなります

:::

**例**
\- 1234.5678 は 1000, significantDigits:1 に変換されます
\- 1234.5678 は 1200, significantDigits:2 に変換されます
\- 1234.5678 は 1230, significantDigits:3 に変換されます
\- 1234.5678 は 1234, significantDigits:4 に変換されます
\- 1234.5678 は 1234.6, significantDigits:5 (roundingMode:halfCeil) に変換されます
\- 1234.5678 は 1234.57, significantDigits:6 (roundingMode:halfCeil) に変換されます
\- 1234.5678 は 1234.568, significantDigits:7 (roundingMode:halfCeil) に変換されます
\- 1234.5678 は 1234.5678, significantDigits:8 (roundingMode:halfCeil) に変換されます



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=説明}
significantDigits と fractionDigits を同時に設定した場合の丸め優先度。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingPriority と同じ規則に従います

:::

**例**
\- 1234.5678 は 1230, significantDigits:3 (roundingPriority:lessPrecision) に変換されます
\- 1234.5678 は 1234.5678, significantDigits:3 (roundingPriority:morePrecision) に変換されます



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
数値フォーマットのタイプ。number（小数）、percent（%）、permille（‰）、科学表記をサポートします

:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの比率。0 は指定できません

:::

**例**
\- 100000 は 10万 に変換, ratio:10000, symbol:"万"
\- 100000 は 10K に変換, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマットの記号（例: %, ‰）

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
数値フォーマットのサフィックス

:::

#### prefix

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマットのプレフィックス

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの小数桁数。ブラウザの Intl.NumberFormat minimumFractionDigits と maximumFractionDigits を使用し、significantDigits より優先度は低くなります

:::

**例**
\- 1234.5678 は 1235, fractionDigits:0 (roundingMode:halfCeil) に変換されます
\- 1234.5678 は 1234.6, fractionDigits:1 (roundingMode:halfCeil) に変換されます
\- 1234.5678 は 1234.57, fractionDigits:2 (roundingMode:halfCeil) に変換されます
\- 1234.5678 は 1230.568, fractionDigits:3 (roundingMode:halfCeil) に変換されます
\- 1234.5678 は 1234.5678, fractionDigits:4 (roundingMode:halfCeil) に変換されます
\- 1234.5678 は 1234.56780, fractionDigits:5 (roundingMode:halfCeil) に変換されます



#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの有効桁数。ブラウザの Intl.NumberFormat minimumSignificantDigits と maximumSignificantDigits を使用し、fractionDigits より優先度が高くなります

:::

**例**
\- 1234.5678 は 1000, significantDigits:1 に変換されます
\- 1234.5678 は 1200, significantDigits:2 に変換されます
\- 1234.5678 は 1230, significantDigits:3 に変換されます
\- 1234.5678 は 1234, significantDigits:4 に変換されます
\- 1234.5678 は 1234.6, significantDigits:5 (roundingMode:halfCeil) に変換されます
\- 1234.5678 は 1234.57, significantDigits:6 (roundingMode:halfCeil) に変換されます
\- 1234.5678 は 1234.568, significantDigits:7 (roundingMode:halfCeil) に変換されます
\- 1234.5678 は 1234.5678, significantDigits:8 (roundingMode:halfCeil) に変換されます



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=説明}
significantDigits と fractionDigits を同時に設定した場合の丸め優先度。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingPriority と同じ規則に従います

:::

**例**
\- 1234.5678 は 1230, significantDigits:3 (roundingPriority:lessPrecision) に変換されます
\- 1234.5678 は 1234.5678, significantDigits:3 (roundingPriority:morePrecision) に変換されます



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
数値フォーマットの丸めモード。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingMode と同じ規則に従います

:::

### encoding

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | undefined`

:::note{title=説明}
指標をマッピングするチャネル

\- xAxis: X軸にマッピングされる指標

\- detail: 指標がマッピングされる詳細チャネル

\- color: 色チャネルにマッピングされる指標

\- label: label チャネルにマッピングされる指標

\- tooltip: tooltip チャネルにマッピングされる指標

:::

### parentId

**Type:** `string | undefined`

:::note{title=説明}
フラットな指標設定形式でツリー状の指標グループを構築します。parentId は親指標グループの id を指し、指標ツリーの構築に使用します

:::

:::tip{title=Tip}
指標ツリーの設定方法は2つあります。方法1は children で指標ツリーを直接設定する方法、方法2は parentId を持つフラットな指標リストを設定する方法です。この2つの方法は同時に使用できません。

:::


## page

**Type:** `Page | undefined`

:::note{title=説明}
ページング



チャートページネーションのページ設定

:::


### field

**Type:** `string`

:::note{title=説明}
ページネーションフィールド。ページネーションに使用するフィールド名を指定します。次元である必要があります

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
チャートの背景色。デフォルトは透明背景です。背景色は色文字列（例: 'red', 'blue'）、または hex、rgb、rgba 値（例: '#ff0000', 'rgba(255,0,0,0.5)'）を指定できます。

:::


## color

**Type:** `Color | undefined`

:::note{title=説明}
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
データ値を特定の色にマッピングするための色マッピング

:::

**例**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=説明}
正負カラー設定。チャート内の正の値の色を定義します

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=説明}
正負カラー設定。チャート内の負の値の色を定義します

:::


## label

**Type:** `Label | undefined`

:::note{title=説明}
チャートのデータラベル設定。位置、フォーマット、スタイルを含みます。

:::


### enable

**Type:** `false | true`

:::note{title=説明}
ラベル機能を有効にするかどうか

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルを次の行に折り返すかどうか

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルに指標値を表示するかどうか

複数指標のシナリオでは、プロット関連のすべての指標が `foldMeasures` 処理を通って単一データポイントを表す1つの指標へ結合されるため、値の競合を心配する必要はありません

注意: encoding の label の優先度が高く、この設定は encoding の label には影響しません

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルに指標値の割合を表示するかどうか

複数指標のシナリオでは、プロット関連のすべての指標が `foldMeasures` 処理を通って単一データポイントを表す1つの指標へ結合されるため、値の競合を心配する必要はありません

注意: encoding の label の優先度が高く、この設定は encoding の label には影響しません

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルに次元ラベルを表示するかどうか

すべての次元ラベルを表示します

注意: encoding の label の優先度が高く、この設定は encoding の label には影響しません

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=説明}
ラベル値を自動フォーマットするかどうか。autoFormat が true の場合、numFormat 設定は無視されます

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=説明}
ラベル値のフォーマット設定。`measure` の `format` とマージされ、`measure` の `format` がより高い優先度を持ちます。numFormat の優先度は autoFormat より低くなります

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=説明}
数値フォーマットのタイプ。number（小数）、percent（%）、permille（‰）、科学表記をサポートします

:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの比率。0 は指定できません

:::

**例**
\- 100000 は 10万 に変換, ratio:10000, symbol:"万"
\- 100000 は 10K に変換, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマットの記号（例: %, ‰）

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
数値フォーマットのサフィックス

:::

#### prefix

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマットのプレフィックス

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの小数桁数。ブラウザの Intl.NumberFormat minimumFractionDigits と maximumFractionDigits を使用し、significantDigits より優先度は低くなります

:::

**例**
\- 1234.5678 は 1235, fractionDigits:0 (roundingMode:halfCeil) に変換されます
\- 1234.5678 は 1234.6, fractionDigits:1 (roundingMode:halfCeil) に変換されます
\- 1234.5678 は 1234.57, fractionDigits:2 (roundingMode:halfCeil) に変換されます
\- 1234.5678 は 1230.568, fractionDigits:3 (roundingMode:halfCeil) に変換されます
\- 1234.5678 は 1234.5678, fractionDigits:4 (roundingMode:halfCeil) に変換されます
\- 1234.5678 は 1234.56780, fractionDigits:5 (roundingMode:halfCeil) に変換されます



#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの有効桁数。ブラウザの Intl.NumberFormat minimumSignificantDigits と maximumSignificantDigits を使用し、fractionDigits より優先度が高くなります

:::

**例**
\- 1234.5678 は 1000, significantDigits:1 に変換されます
\- 1234.5678 は 1200, significantDigits:2 に変換されます
\- 1234.5678 は 1230, significantDigits:3 に変換されます
\- 1234.5678 は 1234, significantDigits:4 に変換されます
\- 1234.5678 は 1234.6, significantDigits:5 (roundingMode:halfCeil) に変換されます
\- 1234.5678 は 1234.57, significantDigits:6 (roundingMode:halfCeil) に変換されます
\- 1234.5678 は 1234.568, significantDigits:7 (roundingMode:halfCeil) に変換されます
\- 1234.5678 は 1234.5678, significantDigits:8 (roundingMode:halfCeil) に変換されます



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=説明}
significantDigits と fractionDigits を同時に設定した場合の丸め優先度。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingPriority と同じ規則に従います

:::

**例**
\- 1234.5678 は 1230, significantDigits:3 (roundingPriority:lessPrecision) に変換されます
\- 1234.5678 は 1234.5678, significantDigits:3 (roundingPriority:morePrecision) に変換されます



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
数値フォーマットの丸めモード。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingMode と同じ規則に従います

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=説明}
ラベルのフォントサイズ

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=説明}
ラベルのフォントウェイト

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
ラベルの背景色

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=説明}
ラベルの輪郭色

:::

### labelColor

**Type:** `string | undefined`

:::note{title=説明}
ラベルのフォント色

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=説明}
図形要素の色に応じてラベルのフォント色を自動反転するかどうか

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
ラベルフィルタリング。セレクタ間のデフォルト関係は OR です

:::


#### field

**Type:** `string`

:::note{title=説明}
次元フィールド。次元項目のID
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
operator と同じ

\- in: 次元フィールドの値が指定値に含まれるデータ項目を選択します


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
operator と同じ

\- in: 次元フィールドの値が指定値に含まれるデータ項目を選択します


operator と同じ

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
次元フィールドの値。配列に対応します
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=説明}
動的フィルター（AI 生成コード実行）



コア機能:



\- 組み込みユーティリティ関数を使用してデータを操作します

\- ブラウザー環境で安全に実行します（Web Worker サンドボックス）



環境要件: ブラウザー環境のみをサポートします。Node.js 環境では fallback を使用します



注意: selector と dynamicFilter は同時に使用できません。dynamicFilter の優先度が高くなります



チャート動的フィルター設定



チャート動的フィルター設定





:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=説明}
ユーザーのフィルタリング要件説明（自然言語）
:::

**例**
"sales が 1000 を超える棒をハイライト"

"各地域で利益率が最も高い棒をハイライト"



#### code

**Type:** `string`

:::note{title=説明}
AI生成のJavaScriptフィルタリングコード



\- 組み込みユーティリティ関数（_ または R からアクセス）のみ使用できます

\- 入力パラメータ: data（配列）。各 item は行番号を表す __row_index フィールドを含みます

\- 行インデックスとフィールドの組み合わせの配列を返す必要があります: Array<{ __row_index: number, field: string }>

\- __row_index は元データ項目の行番号、field はハイライトするフィールドを表します

\- 使用禁止: eval, Function, 非同期操作, DOM API, ネットワークリクエスト

:::

**例**
sales が 1000 を超えるデータ項目の sales フィールドをハイライト
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

各エリアで利益率が最も高いデータ項目をハイライト
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

複数条件で絞り込んだデータ項目をハイライト
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
コード実行に失敗した場合、または環境が対応していない場合のフォールバック方案
:::


##### field

**Type:** `string`

:::note{title=説明}
次元フィールド。次元項目のID
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
operator と同じ

\- in: 次元フィールドの値が指定値に含まれるデータ項目を選択します


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
operator と同じ

\- in: 次元フィールドの値が指定値に含まれるデータ項目を選択します


operator と同じ

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
次元フィールドの値。配列に対応します
:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=説明}
アニメーションフィルタ実行結果（ランタイムフィールド）



prepare() フェーズで書き込まれ、実行時は読み取り専用です
:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`


## legend

**Type:** `Legend | undefined`

:::note{title=説明}
チャートの凡例を定義する凡例設定。位置、フォーマット、スタイルなどを含みます。

:::


### enable

**Type:** `boolean | undefined`

:::note{title=説明}
凡例機能を有効にするかどうか
:::

**例**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=説明}
凡例の境界線を有効にするかどうか。
:::

:::warning{title=Warning}
離散凡例にのみ適用されます。

:::

**例**
border: true



### labelColor

**Type:** `string | undefined`

:::note{title=説明}
凡例のフォント色

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=説明}
ページャーアイコン色

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=説明}
無効状態のページャーアイコン色

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=説明}
凡例のフォントサイズ
:::

**例**
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=説明}
凡例のフォント色

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=説明}
凡例のフォントウェイト
:::

**例**
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=説明}
凡例の形状
:::

:::warning{title=Warning}
離散凡例にのみ適用されます。

:::

**例**
shapeType: 'circle'



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=説明}
凡例位置
:::

**例**
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=説明}
凡例項目が多い場合の最大列数または行数





:::

:::warning{title=Warning}
離散凡例にのみ適用されます。

:::

**例**
maxSize: 2




## regionPadding

**Type:** `RegionPadding | undefined`

:::note{title=説明}
描画領域の内側余白



VChart region[0].padding にマッピングされ、注釈やラベルなどプロット領域外へ伸びる要素のための余白を確保します。

:::


### top

**Type:** `number | undefined`

### right

**Type:** `number | undefined`

### bottom

**Type:** `number | undefined`

### left

**Type:** `number | undefined`


## tooltip

**Type:** `Tooltip | undefined`

:::note{title=説明}
チャートのツールチップ設定。位置、フォーマット、スタイルなどを定義します。

:::


### enable

**Type:** `false | true`

:::note{title=説明}
ツールチップ機能を有効にするかどうか
:::


## brush

**Type:** `Brush | undefined`

:::note{title=説明}
チャートブラシ設定









:::


### enable

**Type:** `boolean | undefined`

:::note{title=説明}
ブラシ選択を有効にするかどうか

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=説明}
brush のタイプ

brush の形状と選択方向を定義します

\- `rect`: 矩形 brush 選択。X軸方向とY軸方向の両方で同時に選択できます

\- `polygon`: 多角形 brush 選択。複数の点をクリックして任意の多角形を描画し、選択できます

\- `x`: X軸方向の brush 選択。X軸方向にのみ選択し、Y軸方向は制限しません

\- `y`: Y軸方向の brush 選択。Y軸方向にのみ選択し、X軸方向は制限しません
:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=説明}
\- `multiple`: 複数モード。複数の brush 選択を同時に保持できます



ブラシ選択モードを定義します


\- `multiple`: 複数選択モード。複数の brush 領域を同時に存在させられます

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=説明}
選択終了後にブラシ領域をクリアするかどうか

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=説明}
未選択データ点の不透明度。範囲は 0-1 です



ブラシ選択されたデータ点のスタイルを定義します
:::


#### opacity

**Type:** `number | undefined`

:::note{title=説明}
不透明度



選択されたデータポイントの不透明度。範囲は0〜1です

:::

#### stroke

**Type:** `string | undefined`

:::note{title=説明}
ストローク色

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
枠線幅
:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=説明}
X軸、カテゴリ軸、X軸設定。チャートのX軸を定義し、位置、フォーマット、スタイルなどを含みます。



ブラシ選択外のデータ点のスタイルを定義します
:::


#### opacity

**Type:** `number | undefined`

:::note{title=説明}
不透明度



選択されていないデータポイントの不透明度。範囲は 0-1 です

:::

#### stroke

**Type:** `string | undefined`

:::note{title=説明}
ストローク色

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
枠線幅
:::


## animation

**Type:** `BarLikeAnimation | undefined`

:::note{title=説明}
アニメーション設定



チャートアニメーション設定。選択可能な効果はチャートタイプによって制約されます

:::


### enable

**Type:** `boolean | undefined`

:::note{title=説明}
棒/縦棒グラフのアニメーションを有効にするかどうか

:::

### params

**Type:** `BarLikeAnimationParams | undefined`

:::note{title=説明}
Bar/column chart animation parameters

:::


#### appear

**Type:** `BarLikeAppearAnimation | undefined`

:::note{title=説明}
軸を反転表示するかどうか。数値軸にのみ適用されます。

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=説明}
Label color

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=説明}
現在のアニメーション段階を有効にするかどうか

:::

##### ease

**Type:** `string | undefined`

:::note{title=説明}
アニメーションのイージング関数

:::

##### duration

**Type:** `number | undefined`

:::note{title=説明}
アニメーション時間。単位はミリ秒

:::

##### color

**Type:** `string | undefined`

:::note{title=説明}
アニメーションのハイライトまたは雰囲気色

:::

#### update

**Type:** `BarLikeUpdateAnimation | undefined`

:::note{title=説明}
Bar/column chart update animation configuration

:::


##### effects

**Type:** `("growth" | "moveIn")[] | undefined`

:::note{title=説明}
棒/柱グラフの更新効果。成長と移入アニメーションをサポートします

:::
##### enable

**Type:** `boolean | undefined`

:::note{title=説明}
現在のアニメーション段階を有効にするかどうか

:::

##### ease

**Type:** `string | undefined`

:::note{title=説明}
アニメーションのイージング関数

:::

##### duration

**Type:** `number | undefined`

:::note{title=説明}
アニメーション時間。単位はミリ秒

:::

##### color

**Type:** `string | undefined`

:::note{title=説明}
アニメーションのハイライトまたは雰囲気色

:::

#### loop

**Type:** `BarLikeAnimationLoop | undefined`

:::note{title=説明}
\- 1234.5678 は 1234.57, fractionDigits:2 (roundingMode:halfCeil) に変換されます

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=説明}
ループアニメーションを有効にするかどうか

:::

##### interval

**Type:** `number | undefined`

:::note{title=説明}
ループアニメーション間隔。単位はミリ秒

:::

##### loop

**Type:** `BarLikeLoopAnimation | undefined`

:::note{title=説明}
\- 1234.5678 は 1234.57, fractionDigits:2 (roundingMode:halfCeil) に変換されます

:::


###### effects

**Type:** `BarLikeLoopEffect[] | undefined`

:::note{title=説明}
\- 1234.5678 は 1230, significantDigits:3 (roundingPriority:lessPrecision) に変換されます

:::

###### enable

**Type:** `boolean | undefined`

:::note{title=説明}
現在のアニメーション段階を有効にするかどうか

:::

###### ease

**Type:** `string | undefined`

:::note{title=説明}
アニメーションのイージング関数

:::

###### duration

**Type:** `number | undefined`

:::note{title=説明}
アニメーション時間。単位はミリ秒

:::

###### color

**Type:** `string | undefined`

:::note{title=説明}
アニメーションのハイライトまたは雰囲気色

:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=説明}
Bar/column chart atmosphere animation configuration

:::


###### ease

**Type:** `string | undefined`

:::note{title=説明}
雰囲気アニメーションのイージング関数

:::

###### color

**Type:** `string | undefined`

:::note{title=説明}
雰囲気アニメーションの色

:::

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title=説明}
雰囲気アニメーション効果。リップル、表示/非表示、呼吸効果をサポートします

:::


## xAxis

**Type:** `XLinearAxis | undefined`

:::note{title=説明}
X-axis numeric-axis configuration, used to define the chart X-axis, including position, format, style, and related settings.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=説明}
軸を表示するかどうか
:::

### min

**Type:** `number | undefined`

:::note{title=説明}
Axis line width

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=説明}
X-axis ticks

:::

### log

**Type:** `boolean | undefined`

:::note{title=説明}
対数軸を使用するかどうか。数値軸にのみ適用されます

:::

### logBase

**Type:** `number | undefined`

:::note{title=説明}
Base of the logarithmic axis; only applies to numeric axes

:::

### nice

**Type:** `boolean | undefined`

:::note{title=説明}
読みやすい軸 tick label にするため、軸 tick 間隔を自動調整するかどうか。このオプションは min と max が設定されている場合は無効になり、数値軸にのみ適用されます。

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=説明}
軸を反転表示するかどうか。数値軸にのみ有効です
:::

### zero

**Type:** `boolean | undefined`

:::note{title=説明}
座標軸上に 0 値を強制表示するかどうか。min と max が設定されている場合、この設定は無効です。数値軸にのみ有効です。
:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=説明}
数値軸の tick label を自動フォーマットするかどうか。数値軸にのみ適用されます。autoFormat が true の場合、numFormat は無視されます。

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=説明}
数値軸の数値フォーマット。数値軸にのみ適用され、autoFormat より優先度は低くなります。

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=説明}
数値フォーマットのタイプ。decimal、percent（%）、permille（‰）、科学表記をサポートします

:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットのタイプ。number（10進数）、percent（%）、permille（‰）、scientific（科学表記）に対応します

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
Thousands separator for numeric formatting

:::

#### suffix

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマットの桁区切り

:::

#### prefix

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマットの接尾辞

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの接頭辞

:::

**例**
\- 1234.5678 は 1235, fractionDigits:0 (roundingMode:halfCeil) に変換されます
\- 1234.5678 は 1234.6, fractionDigits:1 (roundingMode:halfCeil) に変換されます
\- 1234.5678 は 1234.57, fractionDigits:2 (roundingMode:halfCeil) に変換されます
\- 1234.5678 は 1230.568, fractionDigits:3 (roundingMode:halfCeil) に変換されます
\- 1234.5678 は 1234.5678, fractionDigits:4 (roundingMode:halfCeil) に変換されます
\- 1234.5678 は 1234.56780, fractionDigits:5 (roundingMode:halfCeil) に変換されます



#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}
Significant digits for numeric formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits.

:::

**例**
\- 1234.5678 は 1000, significantDigits:1 に変換されます
\- 1234.5678 は 1200, significantDigits:2 に変換されます
\- 1234.5678 は 1230, significantDigits:3 に変換されます
\- 1234.5678 は 1234, significantDigits:4 に変換されます
\- 1234.5678 は 1234.6, significantDigits:5 (roundingMode:halfCeil) に変換されます
\- 1234.5678 は 1234.57, significantDigits:6 (roundingMode:halfCeil) に変換されます
\- 1234.5678 は 1234.568, significantDigits:7 (roundingMode:halfCeil) に変換されます
\- 1234.5678 は 1234.5678, significantDigits:8 (roundingMode:halfCeil) に変換されます



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=説明}
Rounding priority when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority.

:::

**例**
\- 1234.5678 は 1230, significantDigits:3 (roundingPriority:lessPrecision) に変換されます
\- 1234.5678 は 1234.5678, significantDigits:3 (roundingPriority:morePrecision) に変換されます



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
Rounding mode for numeric formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=説明}
X軸の目盛ラベル
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルを表示するかどうか
:::

#### labelColor

**Type:** `string | undefined`

:::note{title=説明}
ラベルの色
:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=説明}
ラベルのフォントサイズ
:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=説明}
ラベルのフォントの太さ
:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=説明}
ラベルの回転角度
:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=説明}
X軸線
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}
軸線を表示するかどうか
:::

#### lineColor

**Type:** `string | undefined`

:::note{title=説明}
軸線の色
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
軸線の幅
:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=説明}
X軸の目盛
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}
目盛を表示するかどうか
:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=説明}
目盛を内向きにするかどうか
:::

#### tickColor

**Type:** `string | undefined`

:::note{title=説明}
目盛の色
:::

#### tickSize

**Type:** `number | undefined`

:::note{title=説明}
目盛のサイズ
:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=説明}
X軸タイトル
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}
タイトルを表示するかどうか
:::

#### titleText

**Type:** `string | undefined`

:::note{title=説明}
タイトルテキスト。デフォルトではフィールド設定に従います
:::

#### titleColor

**Type:** `string | undefined`

:::note{title=説明}
タイトルの色
:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=説明}
タイトルのフォントサイズ
:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=説明}
タイトルのフォントの太さ
:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=説明}
組み込みの `light` と `dark` テーマを含みます。カスタムテーマは `registerTheme` で追加できます。

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=説明}
selector = [{ profit: 100 }, { profit: 200 }]
:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=説明}
- not in: 次元フィールド値が `value` 配列内にないデータ項目を選択します。

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=説明}
グローバルスタイルまたは条件付きスタイル設定をサポートします。

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=説明}
selector = [{ profit: 100 }, { profit: 200 }]

:::


#### duration

**Type:** `number | undefined`

:::note{title=説明}
value: [100, 300]
:::

#### easing

**Type:** `string | undefined`

:::note{title=説明}
}
:::


## yAxis

**Type:** `YBandAxis | undefined`

:::note{title=説明}
Y-axis category-axis configuration, used to define the chart Y-axis, including position, format, style, and related settings.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=説明}
軸を表示するかどうか
:::

### inverse

**Type:** `boolean | undefined`

:::note{title=説明}
軸を反転表示するかどうか。数値軸にのみ有効です
:::

### zero

**Type:** `boolean | undefined`

:::note{title=説明}
座標軸上に 0 値を強制表示するかどうか。min と max が設定されている場合、この設定は無効です。数値軸にのみ有効です。
:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=説明}
軸ラベルの自動非表示。2つのラベルが重なる場合（間隔が autoHideGap 未満）、重なりを引き起こすラベルを自動的に非表示にします。カテゴリ軸でのみ有効です。
:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=説明}
軸ラベルの自動非表示間隔。2つのテキストラベルの間隔が autoHideGap 未満の場合、重なりを引き起こすラベルを自動的に非表示にします。カテゴリ軸でのみ有効です。

autoHide が有効な場合は autoHide を使用し、autoHideSeparation に設定します

autoHide が無効な場合は sampling サンプリングを使用し、minGap に設定します
:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=説明}
軸ラベルの自動回転。ラベル幅が軸の長さを超える場合、ラベルを自動的に回転します。カテゴリ軸でのみ有効です。
:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=説明}
軸ラベルの自動回転角度範囲。自動回転が有効な場合のラベル回転角度範囲です。カテゴリ軸でのみ有効です。
:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=説明}
軸ラベルの自動長さ制限。ラベル幅が軸の長さを超える場合、超過部分を省略記号で表示し、マウスホバーで完全なラベルを表示します。カテゴリ軸でのみ有効です。
:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=説明}
Maximum length for axis label auto-limit. When label text exceeds this length, overflow is shown with ellipsis and the full label is visible on hover. Only applies to category axes.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=説明}
X軸の目盛ラベル
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルを表示するかどうか
:::

#### labelColor

**Type:** `string | undefined`

:::note{title=説明}
ラベルの色
:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=説明}
ラベルのフォントサイズ

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=説明}
ラベルのフォントウェイト

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=説明}
ラベルの回転角度

:::
### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=説明}
X軸線

:::
#### visible

**Type:** `boolean | undefined`

:::note{title=説明}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=説明}
}
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
\- 100000 は 10万 に変換, ratio:10000, symbol:"万"
:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=説明}
order: 'asc',
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}
数値フォーマットの接尾辞
:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=説明}
目盛を内向きにするかどうか
:::

#### tickColor

**Type:** `string | undefined`

:::note{title=説明}
凡例ソート設定。次元または指標に基づくソート、およびカスタムソート順をサポートします。sort 配列は左から右、または上から下の順序に従います。

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=説明}
目盛のサイズ
:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=説明}
X軸タイトル

:::
#### visible

**Type:** `boolean | undefined`

:::note{title=説明}
\- 1234.5678 は 1234.6 に変換されます。significantDigits:5 (roundingMode:halfCeil)
:::

#### titleText

**Type:** `string | undefined`

:::note{title=説明}
タイトルテキスト。デフォルトではフィールド設定に従います
:::

#### titleColor

**Type:** `string | undefined`

:::note{title=説明}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=説明}
カスタムソート順。この順序は凡例に直接適用されます。昇順は左から右、または上から下に従い、降順は右から左、または下から上に従います。

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=説明}
  ])

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=説明}
組み込みの `light` と `dark` テーマを含みます。カスタムテーマは `registerTheme` で追加できます。

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=説明}
selector = [{ profit: 100 }, { profit: 200 }]
:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=説明}
- not in: 次元フィールド値が `value` 配列内にないデータ項目を選択します。

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=説明}
グローバルスタイルまたは条件付きスタイル設定をサポートします。

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=説明}
selector = [{ profit: 100 }, { profit: 200 }]
:::


#### duration

**Type:** `number | undefined`

:::note{title=説明}
value: [100, 300]
:::

#### easing

**Type:** `string | undefined`

:::note{title=説明}
}
:::


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title=説明}
selector = { profit: 100 }



selector = {

:::


### visible

**Type:** `boolean | undefined`

:::note{title=説明}
Operator

:::

### rectColor

**Type:** `string | undefined`

:::note{title=説明}
operator: 'between'

:::

### labelColor

**Type:** `string | undefined`

:::note{title=説明}
Operator

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=説明}
crosshair の矩形領域ラベルを表示するかどうか

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
\- Supports arbitrarily complex data filtering conditions

:::


## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title=説明}
Bar chart stacked corner radius

:::


## barMaxWidth

**Type:** `string | number | undefined`

:::note{title=説明}
AI が生成した JavaScript コードでチャートマーク（棒、点など）のフィルタリングを実装します。

:::


## barGapInGroup

**Type:** `string | number | undefined`

:::note{title=説明}
同じカテゴリ内の矩形間隔。ピクセル値またはパーセント文字列を指定できます。

:::


## sort

**Type:** `Sort | undefined`

:::note{title=説明}
Y軸のソート設定。次元または指標によるソート、およびカスタムソート順をサポートします



カテゴリ軸のソート設定。次元または指標によるソート、およびカスタムソート順をサポートします
:::

**例**
sort: {
  orderBy: 'profit',
  order: 'asc',
}
sort: {
  customOrder:['2019', '2020', '2021']
}

\- order:'asc'
\- orderBy:'date'
チャートの動的フィルター設定。
\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=説明}
ソート順。値は 'asc' または 'desc' です
:::

**例**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=説明}
利益率が最も高いデータ項目を各リージョンで強調表示
:::

**例**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=説明}
カテゴリ軸に直接適用されるカスタムソート順
:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=説明}
凡例ソート設定。次元または指標によるソート、およびカスタムソート順をサポートします

凡例ソート設定。ソート配列は左から右、または上から下の順序に従います
:::

**例**
sortLegend: {
  orderBy: 'profit',
  order: 'asc',
}
sortLegend: {
  customOrder:['2019', '2020', '2021']
}

\- order:'asc'
\- orderBy:'date'
チャートの動的フィルター設定。
\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=説明}
ソート順。値は 'asc' または 'desc' です
:::

**例**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=説明}
利益率が最も高いデータ項目を各リージョンで強調表示
:::

**例**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=説明}
凡例に直接適用されるカスタムソート順。昇順は左から右または上から下、降順は右から左または下から上です
:::


## theme

**Type:** `Theme | undefined`

:::note{title=説明}
グラフのテーマ。テーマは優先度の低い機能設定で、すべてのグラフタイプに共通する設定と、単一カテゴリのグラフタイプで共通する設定を含みます。組み込みの light と dark テーマがあり、Builder でテーマをカスタマイズできます。

テーマ

組み込みの light、dark テーマがあります。新しいテーマは registerTheme でカスタマイズできます。
:::

**例**
'dark'

'light'

'customThemeName'




### length

**Type:** `number`

### brand

**Type:** `brand`


## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title=説明}
矩形図形要素のスタイル。棒グラフの色、枠線、角丸などを定義する棒グラフスタイル設定です。

グローバルスタイルまたは条件付きスタイル設定をサポートします。

データフィルター

selector を設定すると、数値 selector、ローカルデータ selector、条件付き次元 selector、条件付き指標 selector の4種類のデータマッチング機能を利用できます。

selector が未設定の場合、スタイルは全体に適用されます。
:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=説明}
データセレクター



selector を設定すると、数値 selector、部分データ selector、条件次元 selector、条件指標 selector の4種類のデータマッチングを提供します

selector を設定しない場合、スタイルは全体に適用されます。

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

条件次元セレクター
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

条件指標セレクター
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
#### field

**Type:** `string`

:::note{title=説明}
次元フィールド。dimensions の項目 id
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

- in: 次元フィールドの値が value に含まれるデータ項目を選択します

- not in: 次元フィールドの値が value に含まれないデータ項目を選択します
:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

- in: 次元フィールドの値が value に含まれるデータ項目を選択します

- not in: 次元フィールドの値が value に含まれないデータ項目を選択します

operator と同じ
:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
データ項目の次元フィールド値を選択します。配列をサポートします
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=説明}
動的フィルター（AI 生成コード実行）

AI 生成の JavaScript コードで複雑なデータフィルタリングロジックを実装します。

Top N、統計分析、複雑条件など、静的 selector では表現しにくいシーンに適しています。

主な機能:

- 任意の複雑なデータフィルター条件をサポート

- 組み込みユーティリティ関数でデータ操作を実行

- ブラウザ環境で安全に実行（Web Worker サンドボックス）

環境要件: ブラウザ環境のみサポートし、Node.js 環境では fallback を使用します。

注意: selector と dynamicFilter は同時に使用できません。dynamicFilter の優先度が高くなります。

グラフ動的フィルター設定

AI 生成の JavaScript コードでグラフマーク（棒、点など）をフィルタリングします
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=説明}
ユーザーのフィルター要件説明（自然言語）
:::

**例**
"sales が 1000 を超える棒をハイライト"

"各地域で利益率が最も高い棒をハイライト"



#### code

**Type:** `string`

:::note{title=説明}
AI 生成の JavaScript フィルターコード

- 組み込みユーティリティ関数のみ使用できます（_ または R でアクセス）

- 入力パラメータ: data（配列）。各 item には行番号を表す __row_index フィールドが含まれます

- 行インデックスとフィールドの組み合わせ配列を返す必要があります: Array<{ __row_index: number, field: string }>

- __row_index は元データ項目の行番号、field はハイライト対象フィールドを表します

- 禁止: eval、Function、非同期操作、DOM API、ネットワークリクエスト
:::

**例**
sales が 1000 を超えるデータ項目の `sales` フィールドをハイライトします:
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

各地域で利益率が最も高いデータ項目をハイライトします:
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

複数のフィルタ条件に基づいてデータ項目をハイライトします:
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
コード実行失敗または環境非対応時のフォールバック案
:::


##### field

**Type:** `string`

:::note{title=説明}
次元フィールド。dimensions の項目 id
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

- in: 次元フィールドの値が value に含まれるデータ項目を選択します

- not in: 次元フィールドの値が value に含まれないデータ項目を選択します
:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

- in: 次元フィールドの値が value に含まれるデータ項目を選択します

- not in: 次元フィールドの値が value に含まれないデータ項目を選択します

operator と同じ
:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
データ項目の次元フィールド値を選択します。配列をサポートします
:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=説明}
動的フィルター実行結果（実行時フィールド）

prepare() 段階で書き込まれ、実行時は読み取り専用です
:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### barVisible

**Type:** `boolean | undefined`

:::note{title=説明}
\- in: 次元フィールドの値が value に含まれるデータ項目を選択します

:::

### barColor

**Type:** `string | undefined`

:::note{title=説明}
\- not in: 次元フィールドの値が value に含まれないデータ項目を選択します

:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title=説明}
バー要素（矩形要素）の色の透明度

:::
### barBorderColor

**Type:** `string | undefined`

:::note{title=説明}
演算子

:::

### barBorderWidth

**Type:** `number | undefined`

:::note{title=説明}
\- in: 次元フィールドの値が value に含まれるデータ項目を選択します

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=説明}
\- not in: 次元フィールドの値が value に含まれないデータ項目を選択します

:::

**例**
solid

dashed

dotted



### barBorderOpacity

**Type:** `number | undefined`

:::note{title=説明}
バー要素（矩形要素）の角丸



バー要素（矩形要素）のストローク透明度

:::

**例**
4

[0, 0, 10, 10]
### barRadius

**Type:** `number | number[] | undefined`


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=説明}
注釈点設定。選択したデータに基づいて、注釈点の位置、書式、スタイルなどを定義します。

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=説明}
注釈点のセレクタ。データ点を選択するために使用します。
:::


#### field

**Type:** `string`

:::note{title=説明}
次元フィールド。次元項目のID
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
operator と同じ

\- in: 次元フィールドの値が指定値に含まれるデータ項目を選択します


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
operator と同じ

\- in: 次元フィールドの値が指定値に含まれるデータ項目を選択します


operator と同じ

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
次元フィールドの値。配列に対応します
:::

### measureId

**Type:** `string | undefined`

:::note{title=説明}
注釈ポイントが属する指標 id を指定します。複数指標のシナリオでは、selector と組み合わせて対象指標の注釈ポイントを一意に特定できます。
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=説明}
動的フィルター（AI 生成コード実行）



コア機能:





\- 組み込みユーティリティ関数を使用してデータを操作します

\- ブラウザー環境で安全に実行します（Web Worker サンドボックス）



環境要件: ブラウザー環境のみをサポートします。Node.js 環境では fallback を使用します



注意: selector と dynamicFilter は同時に使用できません。dynamicFilter の優先度が高くなります



チャート動的フィルター設定



チャート動的フィルター設定





:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=説明}
ユーザーのフィルタリング要件説明（自然言語）
:::

**例**
"sales が 1000 を超える棒をハイライト"

"各地域で利益率が最も高い棒をハイライト"



#### code

**Type:** `string`

:::note{title=説明}
AI生成のJavaScriptフィルタリングコード



\- 組み込みユーティリティ関数（_ または R からアクセス）のみ使用できます

\- 入力パラメータ: data（配列）。各 item は行番号を表す __row_index フィールドを含みます

\- 行インデックスとフィールドの組み合わせの配列を返す必要があります: Array<{ __row_index: number, field: string }>

\- __row_index は元データ項目の行番号、field はハイライトするフィールドを表します

\- 使用禁止: eval, Function, 非同期操作, DOM API, ネットワークリクエスト

:::

**例**
sales が 1000 を超えるデータ項目の sales フィールドをハイライト
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

各エリアで利益率が最も高いデータ項目をハイライト
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

複数条件で絞り込んだデータ項目をハイライト
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
コード実行に失敗した場合、または環境が対応していない場合のフォールバック方案
:::


##### field

**Type:** `string`

:::note{title=説明}
次元フィールド。次元項目のID
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
operator と同じ

\- in: 次元フィールドの値が指定値に含まれるデータ項目を選択します


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
operator と同じ

\- in: 次元フィールドの値が指定値に含まれるデータ項目を選択します


operator と同じ

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
次元フィールドの値。配列に対応します
:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=説明}
アニメーションフィルタ実行結果（ランタイムフィールド）



prepare() フェーズで書き込まれ、実行時は読み取り専用です
:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=説明}
'red'

:::

**例**
'annotationtext'



### textColor

**Type:** `string | undefined`

:::note{title=説明}
4

:::

**例**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=説明}
[2, 2]

:::

**例**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=説明}
0

:::

**例**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=説明}
テキストの配置です。通常は right に設定し、テキストを注釈点の左側に表示して、グラフの可視領域内に収めます

'right' を推奨します。これによりテキストを注釈点の左側に配置できます

right: テキストは注釈点の左側にあり、テキストの右端が注釈点に揃います

left: テキストは注釈点の右側にあり、テキストの左端が注釈点に揃います

center: テキストは注釈点の中央にあり、テキストの中心が注釈点に揃います

:::

**例**
'right' テキストは注釈点の左側
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=説明}
テキストの垂直配置です。通常は top に設定し、テキストを注釈点の下側に表示して、グラフの可視領域内に収めます

'top' を推奨します。これによりテキスト全体をグラフの可視領域内に表示できます

top: テキストは注釈点の下側にあり、テキストの上端が注釈点に揃います

middle: テキストは注釈点の中央にあり、テキストの中心が注釈点に揃います

bottom: テキストは注釈点の上側にあり、テキストの下端が注釈点に揃います

:::

**例**
'top' テキストは注釈点の下側
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=説明}
背景を表示するかどうか

:::

**例**
true
### textBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
背景色
:::

**例**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=説明}
テキスト色

:::

**例**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=説明}
背景の枠線幅

:::

**例**
2
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=説明}
背景の角丸

:::

**例**
4
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=説明}
背景の内側余白

:::

**例**
4



### offsetY

**Type:** `number | undefined`

:::note{title=説明}




背景を表示するかどうか。

:::

**例**
offsetY: 5 は注釈ポイント全体を下へ5ピクセル移動します



### offsetX

**Type:** `number | undefined`

:::note{title=説明}
注釈点全体のX方向のピクセルオフセットです。注釈点がグラフ左側（カテゴリ軸の開始点）にある場合は正の値、右側（カテゴリ軸の終了点）にある場合は負の値を推奨します。

負の値では全体が左へ移動します。たとえば \-10 にすると、テキストと背景を含む注釈点コンポーネント全体が左へ10ピクセル移動します

正の値では全体が右へ移動します。たとえば 10 にすると、テキストと背景を含む注釈点コンポーネント全体が右へ10ピクセル移動します

:::

**例**
offsetX: 5, 注釈点全体を右へ5ピクセル移動
## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=説明}
'red'

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=説明}
);
:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=説明}
動的フィルター（AI 生成コード実行）











:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=説明}
ユーザーのフィルタリング要件説明（自然言語）
:::

**例**
"注釈線の基準として最高売上値を取得"

"注釈線用の平均売上を計算"



#### code

**Type:** `string`

:::note{title=説明}
AI生成のJavaScriptフィルタリングコード



\- 組み込みユーティリティ関数（_ または R からアクセス）のみ使用できます

\- 入力パラメータ: data（配列）

\- 単一の数値または文字列を返す必要があります: number | string

\- 適用シーン: 注釈線（水平線、垂直線）に必要な動的値

\- 使用禁止: eval, Function, 非同期操作, DOM API, ネットワークリクエスト

:::

**例**
売上の最大値を注釈線の値として取得
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

平均値を計算して注釈線に使用
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

分位値を注釈線として取得
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

条件に基づいて目標値を計算
```javascript
const currentYearTotal = _.sumBy(
_.filter(data, item => item.year === 2024),
'sales'
);
return currentYearTotal;
```


#### fallback

**Type:** `string | number | undefined`

:::note{title=説明}
コード実行に失敗した場合、または環境が対応していない場合のフォールバック方案
:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=説明}
アニメーションフィルタ実行結果（ランタイムフィールド）



prepare() フェーズで書き込まれ、実行時は読み取り専用です
:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=説明}
'red'

:::

**例**
'annotationtext'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=説明}
選択された次元フィールド値。配列をサポートします。

:::

**例**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=説明}
4

:::

**例**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=説明}
[2, 2]

:::

**例**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=説明}
0

:::

**例**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=説明}
テキストの配置です。通常は設定不要です

'right' を推奨します。これによりテキストを注釈線の左側に配置できます

right: テキストは参照線の左側にあり、テキストの右端が（垂直）注釈線に揃います

left: テキストは参照線の右側にあり、テキストの左端が（垂直）注釈線に揃います

center: テキストは参照線の中央にあり、テキストの中心が（垂直）注釈線に揃います

:::

**例**
'right'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=説明}
middle: テキストは注釈領域内で垂直方向に中央揃えになります。









:::

**例**
'top'



### lineVisible

**Type:** `boolean | undefined`

:::note{title=説明}
注釈領域の色の不透明度
:::

**例**
true



### lineColor

**Type:** `string | undefined`

:::note{title=説明}
注釈領域の枠線色。

:::

**例**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
注釈領域の枠線幅。

:::

**例**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=説明}
注釈領域枠線の角丸半径。

:::

**例**
'solid'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=説明}
背景を表示するかどうか

:::

**例**
true
### textBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
背景色
:::

**例**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=説明}
テキスト色

:::

**例**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=説明}
背景の枠線幅

:::

**例**
2
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=説明}
背景の角丸

:::

**例**
4
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=説明}
背景の内側余白

:::

**例**
4




## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=説明}
次元値の注釈線です。水平方向に表示され、注釈線の位置、スタイル、関連設定を構成できます。

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=説明}
水平線を注釈するための固定Y値です。カテゴリ軸がY方向の場合は次元値を、数値軸がY方向の場合は具体的な数値を入力できます。

:::
### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=説明}
動的フィルター（AI 生成コード実行）











:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=説明}
ユーザーのフィルタリング要件説明（自然言語）
:::

**例**
"注釈線の基準として最高売上値を取得"

"注釈線用の平均売上を計算"



#### code

**Type:** `string`

:::note{title=説明}
AI生成のJavaScriptフィルタリングコード



\- 組み込みユーティリティ関数（_ または R からアクセス）のみ使用できます

\- 入力パラメータ: data（配列）

\- 単一の数値または文字列を返す必要があります: number | string

\- 適用シーン: 注釈線（水平線、垂直線）に必要な動的値

\- 使用禁止: eval, Function, 非同期操作, DOM API, ネットワークリクエスト

:::

**例**
売上の最大値を注釈線の値として取得
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

平均値を計算して注釈線に使用
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

分位値を注釈線として取得
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

条件に基づいて目標値を計算
```javascript
const currentYearTotal = _.sumBy(
_.filter(data, item => item.year === 2024),
'sales'
);
return currentYearTotal;
```


#### fallback

**Type:** `string | number | undefined`

:::note{title=説明}
コード実行に失敗した場合、または環境が対応していない場合のフォールバック方案
:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=説明}
アニメーションフィルタ実行結果（ランタイムフィールド）



prepare() フェーズで書き込まれ、実行時は読み取り専用です
:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=説明}
'red'

:::

**例**
'annotationtext'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=説明}
2





:::

**例**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=説明}
4

:::

**例**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=説明}
[2, 2]

:::

**例**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=説明}
0

:::

**例**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=説明}
テキストの配置です。通常は設定不要です

'right' を推奨します。これによりテキストを注釈線の左側に配置できます

right: テキストは参照線の左側にあり、テキストの右端が（水平）注釈線の終点に揃います

left: テキストは参照線の右側にあり、テキストの左端が（水平）注釈線の終点に揃います

center: テキストは参照線の中央にあり、テキストの中心が（水平）注釈線の終点に揃います

:::

**例**
'right'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=説明}
テキストの垂直配置です。通常は設定不要です

'top' を推奨します。これによりテキスト全体をグラフの可視領域内に表示できます

top: テキストは参照線の下側にあり、テキストの上端が（水平）注釈線に揃います

middle: テキストは参照線の中央にあり、テキストの中心が（水平）注釈線に揃います

bottom: テキストは参照線の上側にあり、テキストの下端が（水平）注釈線に揃います

:::

**例**
'top'
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=説明}
背景を表示するかどうか

:::

**例**
true
### textBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
背景色
:::

**例**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=説明}
テキスト色

:::

**例**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=説明}
背景の枠線幅



背景の枠線幅

:::

**例**
2
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=説明}
背景の角丸

:::

**例**
4
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=説明}
背景の内側余白

:::

**例**
4



### lineVisible

**Type:** `boolean | undefined`

:::note{title=説明}
注釈領域の色の不透明度



注釈領域の色の不透明度
:::

**例**
true



### lineColor

**Type:** `string | undefined`

:::note{title=説明}
注釈領域の枠線色。

:::

**例**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
注釈領域の枠線幅。

:::

**例**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=説明}
注釈領域枠線の角丸半径。

:::

**例**
'solid'



### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=説明}
注釈領域枠線の破線スタイル。

:::


#### positiveColor

**Type:** `string | undefined`

:::note{title=説明}
注釈値より大きい部分の主色
:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=説明}
0

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=説明}
標注領域設定。選択したデータに基づいて、チャートの標注領域（位置、スタイルなど）を定義します。
:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=説明}
チャートでパースペクティブが有効な場合、または指標が結合されている場合に、次元連動機能を有効にするかどうか。

:::


#### field

**Type:** `string`

:::note{title=説明}
次元フィールド。次元項目のID
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
operator と同じ

\- in: 次元フィールドの値が指定値に含まれるデータ項目を選択します


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
operator と同じ

\- in: 次元フィールドの値が指定値に含まれるデータ項目を選択します


operator と同じ

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
次元フィールドの値。配列に対応します
:::

### text

**Type:** `string | string[] | undefined`

:::note{title=説明}
'red'

:::

**例**
'annotationtext'



### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title=説明}
2

:::

**例**
'top'



### textColor

**Type:** `string | undefined`

:::note{title=説明}
4

:::

**例**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=説明}
[2, 2]

:::

**例**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=説明}
0

:::

**例**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=説明}
多項式回帰線設定。多項式の次数、回帰線スタイルなどを含みます。

'center' に設定することを推奨します。これにより、テキストをマークエリアの中央に配置できます







:::

**例**
'center': テキストは注釈領域の中央に配置されます



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=説明}








多項式回帰の次数

:::

**例**
'top': テキストは注釈領域の下部に配置されます



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=説明}
背景を表示するかどうか

:::

**例**
true
### textBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
背景色
:::

**例**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=説明}
テキスト色



テキスト色

:::

**例**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=説明}
背景の枠線幅

:::

**例**
2
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=説明}
背景の角丸



背景の角丸

:::

**例**
4
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=説明}
背景の内側余白

:::

**例**
4



### areaColor

**Type:** `string | undefined`

:::note{title=説明}
マークエリアの色

:::

**例**
'red'



### areaColorOpacity

**Type:** `number | undefined`

:::note{title=説明}
注釈領域の塗りつぶし不透明度
:::

**例**
0.5



### areaBorderColor

**Type:** `string | undefined`

:::note{title=説明}
注釈領域の枠線色
:::

**例**
'red'



### areaBorderWidth

**Type:** `number | undefined`

:::note{title=説明}
注釈領域の枠線幅
:::

**例**
2



### areaBorderRadius

**Type:** `number | undefined`

:::note{title=説明}
注釈領域の枠線角丸
:::

**例**
4



### areaLineDash

**Type:** `number[] | undefined`

:::note{title=説明}
注釈領域の枠線スタイル
:::

**例**
[2, 2]



### outerPadding

**Type:** `number | undefined`

:::note{title=説明}
マークエリアの余白

:::

**例**
0




## annotationDifferenceLine

**Type:** `AnnotationDifferenceLine | AnnotationDifferenceLine[] | undefined`

:::note{title=説明}
Difference annotation line configuration, used to bind two data anchors and display an absolute or percentage difference.

:::


### start

**Type:** `DifferenceAnchor`

:::note{title=説明}
差分注釈線の開始アンカー。

開始点または終了点にバインドするデータを選択するための差分注釈アンカー設定です。
:::


#### selector

**Type:** `DifferenceSelector | DifferenceSelector[]`

:::note{title=説明}
アンカーセレクタ。最終的に1つの論理アンカーを特定する必要があります。
:::

**例**
{ year: '1930', type: 'Autocracies' }

[{ field: 'year', operator: 'in', value: ['1930'] }, { field: 'type', operator: 'in', value: ['Autocracies'] }]




##### field

**Type:** `string`

:::note{title=説明}
次元フィールド。次元項目のID
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
operator と同じ

\- in: 次元フィールドの値が指定値に含まれるデータ項目を選択します


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
operator と同じ

\- in: 次元フィールドの値が指定値に含まれるデータ項目を選択します


operator と同じ

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
次元フィールドの値。配列に対応します
:::

### end

**Type:** `DifferenceAnchor`

:::note{title=説明}
差分注釈線の終了アンカー。

開始点または終了点にバインドするデータを選択するための差分注釈アンカー設定です。
:::


#### selector

**Type:** `DifferenceSelector | DifferenceSelector[]`

:::note{title=説明}
アンカーセレクタ。最終的に1つの論理アンカーを特定する必要があります。
:::

**例**
{ year: '1930', type: 'Autocracies' }

[{ field: 'year', operator: 'in', value: ['1930'] }, { field: 'type', operator: 'in', value: ['Autocracies'] }]




##### field

**Type:** `string`

:::note{title=説明}
次元フィールド。次元項目のID
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
operator と同じ

\- in: 次元フィールドの値が指定値に含まれるデータ項目を選択します


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
operator と同じ

\- in: 次元フィールドの値が指定値に含まれるデータ項目を選択します


operator と同じ

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
次元フィールドの値。配列に対応します
:::

### differenceType

**Type:** `"percent" | "absolute" | undefined`

:::note{title=説明}
差分値のタイプ。

- absolute: 絶対差分を表示します。計算式は end - start です

- percent: パーセント差分を表示します。計算式は (end - start) / start です
:::

### textFontSize

**Type:** `number | undefined`

:::note{title=説明}
テキストのフォントサイズ。

:::

### textColor

**Type:** `string | undefined`

:::note{title=説明}
Text color.

:::

### textBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
テキストの背景色。

:::

### lineColor

**Type:** `string | undefined`

:::note{title=説明}
線の色。
:::

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=説明}
線のスタイル。
:::


## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=説明}
チャートでピボット機能または指標グループが有効な場合に、次元連動を有効にするかどうか

ある次元値にホバーしたとき、他のチャート内の同じ次元値のデータを連動して強調表示します



ピボットグラフの次元連動設定

:::


### enable

**Type:** `false | true`

:::note{title=説明}
ピボットグラフの次元連動を有効にするかどうか

:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title=説明}
すべての次元に対応するサブグラフの Tooltip 情報を表示するかどうか

:::

### showLabel

**Type:** `boolean | undefined`

:::note{title=説明}
crosshair に対応するラベルを表示するかどうか

:::


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=説明}
チャートの言語設定。'zh-CN' と 'en-US' の 2 言語をサポートします。intl.setLocale('zh-CN') を呼び出して言語を設定することもできます
:::
