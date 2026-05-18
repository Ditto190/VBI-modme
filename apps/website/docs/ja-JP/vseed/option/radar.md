# Radar

:::info{title=推奨}
\- 推奨フィールド構成: `1` 個の指標、`1` 個の次元

\- データ再構成をサポート: 少なくとも `1` 個の指標、`0` 個の次元

:::

:::info{title=エンコーディングマッピング}
レーダーグラフは次の視覚チャネルをサポートします:

`angle`  : 角度チャネル。`複数の次元`をサポートし、次元値を角度軸にマッピングします

`radius` : 半径チャネル。`複数の指標`をサポートし、指標値を半径軸にマッピングします

`color`  : 色チャネル。`複数の次元`または`1つの指標`をサポートします。次元色はデータ系列の区別に、指標色は指標値を図形色へ線形マッピングするために使用されます

`tooltip`: ツールチップチャネル。`複数の次元`と`複数の指標`をサポートし、データ点にマウスオーバーしたときに表示されます

`label`  : ラベルチャネル。`複数の次元`と`複数の指標`をサポートし、データ点上にデータラベルを表示します

:::

:::note{title=説明}
レーダーグラフ。多軸座標系で各次元の値分布を表示し、多次元データの比較分析に適しています

適用シーン:

\- 多次元データの総合的なパフォーマンス比較

\- 複数オブジェクトの複数指標における性能評価

\- カテゴリデータの多次元特徴表示

:::

:::warning{title=Warning}
データ要件:

\- 少なくとも1つの数値フィールド（指標）

\- 最初の次元はレーダーグラフの各次元軸になり、他の次元は異なる系列として比較されます

\- 複数の指標をそれぞれ異なる系列として表示できます

デフォルトで有効な機能:

\- 凡例、レーダー座標系、データラベル、ツールチップ、数値スケーリングはデフォルトで有効です

:::


## chartType

**Type:** `"radar"`

:::note{title=説明}
レーダーグラフ



レーダーグラフ。多軸座標系で多次元データの比較関係を表示します

:::

**例**
'radar'




## dataset

**Type:** `Record[]`

:::note{title=説明}
データセット



TidyData仕様に準拠し、集計済みのデータセット。グラフのデータソースと構造を定義します。ユーザー入力データを処理する必要はありません。VSeedには強力なデータ再構成機能があり、自動的に変換します。レーダーグラフのデータは最終的に2つの次元と1つの指標に変換されます。

:::

**例**
[{month:'1月', value:100}, {month:'2月', value:150}, {month:'3月', value:120}]




## dimensions

**Type:** `RadarDimension[] | undefined`

:::note{title=説明}
次元

レーダーグラフの最初の次元は角度軸にマッピングされ、残りの次元は指標名（複数の指標がある場合）と統合され、凡例項目として表示されます。

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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "angle" | undefined`

:::note{title=説明}
次元をマッピングするチャネル

\- angle: 複数の次元を角度チャネルにマッピングできます

\- color: 複数の次元を色チャネルにマッピングできます

\- detail: 複数の次元を詳細チャネルにマッピングできます

\- tooltip: 複数の次元をツールチップチャネルにマッピングできます

\- label: 複数の次元をラベルチャネルにマッピングできます

\- row: 複数の次元を行チャネルにマッピングできます

\- column: 複数の次元を列チャネルにマッピングできます

:::


## measures

**Type:** `RadarMeasure[] | undefined`

:::note{title=説明}
指標



レーダーグラフの指標は自動的に1つの指標に統合され、半径軸にマッピングされます。複数の指標がある場合、指標名は他の次元と統合され、凡例項目として表示されます。

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
指標の別名。重複可能。未設定の場合、別名は ID になります

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=説明}
数値の自動フォーマット。デフォルトで有効で、優先度が最も高いです

autoFormat=true の場合、すべての numFormat 設定を上書きします。

有効にすると、グラフのデータラベルとツールチップは指標値とロケールに基づいて適切なフォーマットを自動選択します。

フォーマット規則: 10進数、コンパクト表記を有効化、小数桁は最小 0 桁・最大 2 桁、自動丸め、ブラウザの Intl.NumberFormat 実装を使用します。

例:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=説明}
指標用のカスタム数値フォーマット。ラベルとツールチップに自動適用されます。

注意: カスタムフォーマットを使用するには autoFormat を明示的に false に設定する必要があります。そうしない場合、autoFormat がこの設定を上書きします。

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=説明}
数値フォーマットタイプ。数値（10進数）、パーセント（%）、パーミル（‰）、科学的記数法をサポートします
:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマット比率。0 にはできません

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
数値フォーマットの千区切り記号
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
数値フォーマットの小数桁数。ブラウザの Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits でフォーマットします。significantDigits より優先度は低くなります
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
数値フォーマットの有効桁数。ブラウザの Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits でフォーマットします。fractionDigits より優先度は高くなります
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
数値フォーマットの丸め優先度。significantDigits と fractionDigits が同時に設定された場合の丸め優先度を扱います。ブラウザの Intl.NumberFormat でフォーマットし、roundingPriority と同じ規則に従います
:::

**例**
\- 1234.5678 は 1230 に変換, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 は 1234.5678 に変換, significantDigits:3 (roundingPriority:morePrecision)




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
数値フォーマットの丸めモード。ブラウザ提供の Intl.NumberFormat でフォーマットし、ルールは Intl.NumberFormat の roundingMode と同じです

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=説明}
数値フォーマットタイプ。数値（10進数）、パーセント（%）、パーミル（‰）、科学的記数法をサポートします
:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマット比率。0 にはできません

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
数値フォーマットの千区切り記号
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
数値フォーマットの小数桁数。ブラウザの Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits でフォーマットします。significantDigits より優先度は低くなります
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
数値フォーマットの有効桁数。ブラウザの Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits でフォーマットします。fractionDigits より優先度は高くなります
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
数値フォーマットの丸め優先度。significantDigits と fractionDigits が同時に設定された場合の丸め優先度を扱います。ブラウザの Intl.NumberFormat でフォーマットし、roundingPriority と同じ規則に従います
:::

**例**
\- 1234.5678 は 1230 に変換, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 は 1234.5678 に変換, significantDigits:3 (roundingPriority:morePrecision)




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
数値フォーマットの丸めモード。ブラウザ提供の Intl.NumberFormat でフォーマットし、ルールは Intl.NumberFormat の roundingMode と同じです

:::

### encoding

**Type:** `"color" | "tooltip" | "label" | "radius" | undefined`

:::note{title=説明}
指標をマッピングするチャネル

\- radius: 指標にマッピングされる半径

\- color: カラーチャネルにマッピングされる指標

\- label: ラベルチャネルにマッピングされる指標

\- tooltip: ツールチップチャネルにマッピングされる指標

:::

### parentId

**Type:** `string | undefined`

:::note{title=説明}
フラットな指標設定形式でツリー状の指標グループを構築します。parentId は親指標グループの ID を指し、指標ツリーの構築に使用されます。

:::

:::tip{title=Tip}
指標ツリーの設定方法は 2 つあります。方式 1 は children で指標ツリーを直接設定する方法、方式 2 は parentId を持つフラットな指標リストを設定する方法です。この 2 つの方法は同時に使用できません。

:::


## page

**Type:** `Page | undefined`

:::note{title=説明}
ページング設定。ページングのフィールド名を指定します。次元である必要があります

:::


### field

**Type:** `string`

:::note{title=説明}
ページネーションフィールド。ページネーションに使用するフィールド名を指定し、次元である必要があります。

:::

### currentValue

**Type:** `string`

:::note{title=説明}
現在のページネーション値。現在ページを決定するために使用する値を指定します。

:::

**例**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=説明}
グラフの背景色



背景色には 'red'、'blue' などの色文字列、または hex、rgb、rgba（例: '#ff0000'、'rgba(255,0,0,0.5)'）を指定できます

:::


## color

**Type:** `Color | undefined`

:::note{title=説明}
色



色設定。色リスト、色マッピング、色グラデーションなど、グラフの配色を定義します。

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=説明}
グラフ内の異なる要素の色を定義するための離散カラースキーム。

:::

**例**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=説明}
グラフ内の異なる要素の色を定義するための線形グラデーションカラースキーム。

:::

**例**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=説明}
データ値を特定の色にマッピングするための色マッピング。

:::

**例**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=説明}
正負色設定。グラフ内の正の値の色を定義します。

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=説明}
正負色設定。グラフ内の負の値の色を定義します。

:::


## label

**Type:** `Label | undefined`

:::note{title=説明}
ラベル



ラベル設定。データラベルの位置、書式、スタイルなどを定義します。

:::


### enable

**Type:** `false | true`

:::note{title=説明}
ラベル機能を有効にするかどうか。

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルを次の行に折り返すかどうか。

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルに指標値を表示するかどうか。

複数の指標のシナリオでは、すべての描画関連指標が `foldMeasures` 処理を経て、単一のデータポイントを表す1つの指標に統合されるため、値の競合を心配する必要はありません。

注意: encoding の label の方が優先度が高いため、この設定は encoding の label に影響しません。

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルに指標値をパーセントで表示するかどうか。

複数の指標のシナリオでは、すべての描画関連指標が `foldMeasures` 処理を経て、単一のデータポイントを表す1つの指標に統合されるため、値の競合を心配する必要はありません。

注意: encoding の label の方が優先度が高いため、この設定は encoding の label に影響しません。

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルに次元ラベルを表示するかどうか。

すべての次元ラベルを表示します。

注意: encoding の label の方が優先度が高いため、この設定は encoding の label に影響しません。

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=説明}
ラベル値を自動フォーマットするかどうか。autoFormat が true の場合、numFormat 設定は無視されます。

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=説明}
ラベル値のフォーマット設定。`measure` の `format` とマージされ、`measure` の `format` の方が優先度が高くなります。numFormat の優先度は autoFormat より低くなります。

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=説明}
数値フォーマットタイプ。数値（10進数）、パーセント（%）、パーミル（‰）、科学的記数法をサポートします
:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマット比率。0 にはできません

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
数値フォーマットの千区切り記号
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
数値フォーマットの小数桁数。ブラウザの Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits でフォーマットします。significantDigits より優先度は低くなります
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
数値フォーマットの有効桁数。ブラウザの Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits でフォーマットします。fractionDigits より優先度は高くなります
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
数値フォーマットの丸め優先度。significantDigits と fractionDigits が同時に設定された場合の丸め優先度を扱います。ブラウザの Intl.NumberFormat でフォーマットし、roundingPriority と同じ規則に従います
:::

**例**
\- 1234.5678 は 1230 に変換, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 は 1234.5678 に変換, significantDigits:3 (roundingPriority:morePrecision)




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
数値フォーマットの丸めモード。ブラウザ提供の Intl.NumberFormat でフォーマットし、ルールは Intl.NumberFormat の roundingMode と同じです

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=説明}
ラベルのフォントサイズ
:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=説明}
矩形の最大高さ。ピクセル値またはパーセント文字列を指定できます。

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
ラベルのフォント色

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=説明}
要素の色に基づいてラベルのフォント色を自動反転するかどうか。

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=説明}
ラベル位置

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルの重なり処理を有効にするかどうか。

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=説明}
ラベル選択。セレクタ間の条件はデフォルトで OR です。

:::


#### field

**Type:** `string`

:::note{title=説明}
次元フィールド。dimensions のいずれかの項目の id
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
クロスヘアに対応するラベルを表示するかどうか。




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
クロスヘアに対応するラベルを表示するかどうか。




operator と同じ

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
データ項目内の次元フィールドの値を選択します。配列をサポートします
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=説明}
動的フィルター（AI生成コード実行）

AI が生成した JavaScript コードで複雑なデータ絞り込みロジックを実装します

主な機能:

- 任意の複雑なデータ絞り込み条件をサポート

- 組み込みユーティリティ関数を使ってデータを操作

- ブラウザー環境で安全に実行（Web Worker サンドボックス）

環境要件: ブラウザー環境のみをサポートし、Node.js 環境では fallback を使用します

注意: selector と dynamicFilter は同時に使用できず、dynamicFilter の優先度が高くなります

チャート動的フィルター設定

AI 生成の JavaScript コードでチャートマーク（棒、点など）の絞り込みを実装します

:::

#### type

**Type:** `"row-with-field"`
#### description

**Type:** `string | undefined`

:::note{title=説明}
ユーザーの絞り込み要件の説明（自然言語）

:::

**例**
"売上が1000を超えるバーを強調表示"

"各地域で利益率が最も高いバーを強調表示"


#### code

**Type:** `string`

:::note{title=説明}
AI 生成の JavaScript 絞り込みコード

- 組み込みユーティリティ関数のみ使用できます（_ または R 経由でアクセス）

- 入力パラメータ: data（配列）。各 item には行番号を表す __row_index フィールドが含まれます

- 行インデックスとフィールドの組み合わせ配列を返す必要があります: Array<{ __row_index: number, field: string }>

- __row_index は元データ項目の行番号、field は強調表示するフィールドを表します

- 禁止: eval、Function、非同期操作、DOM API、ネットワークリクエスト

:::

**例**
売上が1000を超えるデータ項目の sales フィールドを強調表示
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

各地域で利益率が最も高いデータ項目を強調表示
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

複数条件に一致するデータ項目を強調表示
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
コード実行失敗時、または環境がサポートされない場合のフォールバック

:::

##### field

**Type:** `string`

:::note{title=説明}
ディメンションフィールド。dimensions のいずれかの項目の id

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

- in: ディメンションフィールドの値が value に含まれるデータ項目を選択します

- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

- in: ディメンションフィールドの値が value に含まれるデータ項目を選択します

- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します

operator と同じ

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
データ項目内のディメンションフィールドの値を選択します。配列をサポートします

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


## legend

**Type:** `Legend | undefined`

:::note{title=説明}
凡例



凡例設定。凡例の位置、書式、スタイルなどを定義します。

:::


### enable

**Type:** `boolean | undefined`

:::note{title=説明}
凡例機能を有効にするかどうか。

:::

**例**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=説明}
凡例の枠線を有効にするかどうか。

:::

:::warning{title=Warning}
離散凡例にのみ適用されます。

:::

**例**
border: true



### labelColor

**Type:** `string | undefined`

:::note{title=説明}
凡例フォント色。

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=説明}
ページネーションアイコンの色。

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=説明}
ページネーションアイコンの無効/グレーアウト時の色。

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=説明}
凡例フォントサイズ。

:::

**例**
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=説明}
凡例フォント色。

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=説明}
凡例フォントの太さ。

:::

**例**
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=説明}
凡例の形状タイプ。

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
凡例項目が多い場合の列数または行数の最大値。

position が水平方向 (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr) の場合、maxSize は表示列数を制御します。

position が垂直方向 (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb) の場合、maxSize は表示行数を制御します。

:::

:::warning{title=Warning}
離散凡例にのみ適用されます。

:::

**例**
maxSize: 2




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=説明}
ツールチップ



ツールチップ設定。ツールチップの位置、書式、スタイルなどを定義します。

:::


### enable

**Type:** `false | true`

:::note{title=説明}
ツールチップ機能を有効にするかどうか
:::


## brush

**Type:** `Brush | undefined`

:::note{title=説明}
ブラシ選択



ブラシ選択設定。brush の選択機能を有効または無効にします



\- `y`: Y 軸ブラシ。Y 軸方向のみ選択し、X 軸方向は制限されません。

:::


### enable

**Type:** `boolean | undefined`

:::note{title=説明}
brush 選択を有効にするかどうか
:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=説明}
brush の種類

選択範囲の形状と選択方向を定義します。

\- `rect`: 矩形選択。X軸方向とY軸方向の両方で同時に範囲選択できます

\- `polygon`: 多角形選択。複数の点をクリックして任意の多角形を描いて範囲選択します

\- `x`: X軸方向の選択。X軸方向のみで範囲選択し、Y軸方向は制限しません

\- `y`: Y軸方向の選択。Y軸方向のみで範囲選択し、X軸方向は制限しません
:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=説明}
範囲選択モード。単一選択か複数選択か



ブラシ選択のモードを定義します

\- `single`: 単一選択モード。一度に1つのブラシ選択枠のみ存在できます

\- `multiple`: 複数選択モード。複数のブラシ選択枠を同時に存在させることができます
:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=説明}
ブラシ選択終了後に選択範囲をクリアするかどうか
:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=説明}
選択範囲内データのスタイル

選択されたデータ点のスタイルを定義します
:::


#### opacity

**Type:** `number | undefined`

:::note{title=説明}
\- 100000 は 10万 に変換, ratio:10000, symbol:"万"



選択範囲外のデータポイントのスタイルを定義します。

:::

#### stroke

**Type:** `string | undefined`

:::note{title=説明}
ストローク色
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
ストローク幅
:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=説明}
X 軸、カテゴリ軸、X 軸設定。位置、フォーマット、スタイルなど、グラフの X 軸を定義します。





:::


#### opacity

**Type:** `number | undefined`

:::note{title=説明}
\- 100000 は 10万 に変換, ratio:10000, symbol:"万"





:::

#### stroke

**Type:** `string | undefined`

:::note{title=説明}
ストローク色
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
ストローク幅
:::


## animation

**Type:** `RadarAnimation | undefined`

:::note{title=説明}
アニメーション設定



グラフアニメーション設定。選択可能な効果はグラフタイプによって制約されます

:::


### enable

**Type:** `boolean | undefined`

:::note{title=説明}
レーダーグラフアニメーションを有効にするかどうか

:::

### params

**Type:** `RadarAnimationParams | undefined`

:::note{title=説明}
レーダーグラフアニメーションパラメータ

:::


#### appear

**Type:** `RadarAppearAnimation | undefined`

:::note{title=説明}
レーダーグラフの入場アニメーション設定

:::


##### effects

**Type:** `("radial" | "scale")[] | undefined`

:::note{title=説明}
レーダーグラフの入場効果。放射状とズームのアニメーションをサポートします

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

**Type:** `RadarUpdateAnimation | undefined`

:::note{title=説明}
レーダーグラフの更新アニメーション設定

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=説明}
レーダーグラフの更新効果。成長アニメーションをサポートします

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

**Type:** `RadarAnimationLoop | undefined`

:::note{title=説明}
レーダーグラフのループアニメーション設定

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

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=説明}
レーダーグラフの雰囲気アニメーション設定

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


## theme

**Type:** `Theme | undefined`

:::note{title=説明}
グラフのテーマ。テーマは優先度の低い機能設定で、すべてのグラフタイプに共通する一般設定と、単一グラフタイプに共通する設定を含みます



組み込みの light と dark の2種類のテーマがあります。ユーザーは Builder でテーマをカスタマイズできます



演算子



\- not in: 次元フィールド値が値リストに含まれないデータ項目を選択します。

:::

**例**
'dark'

'light'

'customThemeName'




### length

**Type:** `number`

### brand

**Type:** `brand`


## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title=説明}
ポイントマークスタイル設定。ポイントマークの色、枠線などを定義します。

グローバルスタイルまたは条件付きスタイル設定をサポートします

データフィルター




:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=説明}
- not in: 次元フィールド値が `value` 配列内にないデータ項目を選択します。






:::

**例**
棒プリミティブ (矩形) のストローク色
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]


selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]


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
次元フィールド。dimensions のいずれかの項目の id
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
クロスヘアに対応するラベルを表示するかどうか。




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
クロスヘアに対応するラベルを表示するかどうか。




operator と同じ

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
データ項目内の次元フィールドの値を選択します。配列をサポートします
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=説明}
動的フィルター（AI生成コード実行）

AI が生成した JavaScript コードで複雑なデータ絞り込みロジックを実装します

Top N、統計分析、複雑な条件など、静的 selector では表現しにくい場面に適しています

主な機能:

- 任意の複雑なデータ絞り込み条件をサポート

- 組み込みユーティリティ関数を使ってデータを操作

- ブラウザー環境で安全に実行（Web Worker サンドボックス）

環境要件: ブラウザー環境のみをサポートし、Node.js 環境では fallback を使用します

注意: selector と dynamicFilter は同時に使用できず、dynamicFilter の優先度が高くなります

チャート動的フィルター設定

AI 生成の JavaScript コードでチャートマーク（棒、点など）の絞り込みを実装します

:::

#### type

**Type:** `"row-with-field"`
#### description

**Type:** `string | undefined`

:::note{title=説明}
ユーザーの絞り込み要件の説明（自然言語）

:::

**例**
"売上が1000を超えるバーを強調表示"

"各地域で利益率が最も高いバーを強調表示"


#### code

**Type:** `string`

:::note{title=説明}
AI 生成の JavaScript 絞り込みコード

- 組み込みユーティリティ関数のみ使用できます（_ または R 経由でアクセス）

- 入力パラメータ: data（配列）。各 item には行番号を表す __row_index フィールドが含まれます

- 行インデックスとフィールドの組み合わせ配列を返す必要があります: Array<{ __row_index: number, field: string }>

- __row_index は元データ項目の行番号、field は強調表示するフィールドを表します

- 禁止: eval、Function、非同期操作、DOM API、ネットワークリクエスト

:::

**例**
売上が1000を超えるデータ項目の sales フィールドを強調表示
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

各地域で利益率が最も高いデータ項目を強調表示
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

複数条件に一致するデータ項目を強調表示
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
コード実行失敗時、または環境がサポートされない場合のフォールバック

:::

##### field

**Type:** `string`

:::note{title=説明}
ディメンションフィールド。dimensions のいずれかの項目の id

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

- in: ディメンションフィールドの値が value に含まれるデータ項目を選択します

- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

- in: ディメンションフィールドの値が value に含まれるデータ項目を選択します

- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します

operator と同じ

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
データ項目内のディメンションフィールドの値を選択します。配列をサポートします

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

### pointVisible

**Type:** `boolean | undefined`

:::note{title=説明}
ポイントを表示するかどうか

:::

### pointSize

**Type:** `number | undefined`

:::note{title=説明}
ポイントサイズ



ポイントサイズ

:::

### pointColor

**Type:** `string | undefined`

:::note{title=説明}
ポイントマークの色



ポイントマークの色

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note{title=説明}
ポイントマーク色の不透明度



ポイントマーク色の不透明度

:::

### pointBorderColor

**Type:** `string | undefined`

:::note{title=説明}
ポイントマークの枠線色



ポイントマークの枠線色

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note{title=説明}
ポイントマークの枠線幅



ポイントマークの枠線幅

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=説明}
ポイントマークの枠線スタイル



ポイントマークの枠線スタイル

:::

**例**
solid

dashed

dotted




## lineStyle

**Type:** `LineStyle | LineStyle[] | undefined`

:::note{title=説明}
ラインマークスタイル設定。ラインマークの色、不透明度、曲線などを定義します。

グローバルスタイルまたは条件付きスタイル設定をサポートします

データフィルター




:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=説明}
- not in: 次元フィールド値が `value` 配列内にないデータ項目を選択します。






:::

**例**
棒プリミティブ (矩形) のストローク色
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]


selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]


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
次元フィールド。dimensions のいずれかの項目の id
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
クロスヘアに対応するラベルを表示するかどうか。




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
クロスヘアに対応するラベルを表示するかどうか。




operator と同じ

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
データ項目内の次元フィールドの値を選択します。配列をサポートします
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=説明}
動的フィルター（AI生成コード実行）

AI が生成した JavaScript コードで複雑なデータ絞り込みロジックを実装します

Top N、統計分析、複雑な条件など、静的 selector では表現しにくい場面に適しています

主な機能:

- 任意の複雑なデータ絞り込み条件をサポート

- 組み込みユーティリティ関数を使ってデータを操作

- ブラウザー環境で安全に実行（Web Worker サンドボックス）

環境要件: ブラウザー環境のみをサポートし、Node.js 環境では fallback を使用します

注意: selector と dynamicFilter は同時に使用できず、dynamicFilter の優先度が高くなります

チャート動的フィルター設定

AI 生成の JavaScript コードでチャートマーク（棒、点など）の絞り込みを実装します

:::

#### type

**Type:** `"row-with-field"`
#### description

**Type:** `string | undefined`

:::note{title=説明}
ユーザーの絞り込み要件の説明（自然言語）

:::

**例**
"売上が1000を超えるバーを強調表示"

"各地域で利益率が最も高いバーを強調表示"


#### code

**Type:** `string`

:::note{title=説明}
AI 生成の JavaScript 絞り込みコード

- 組み込みユーティリティ関数のみ使用できます（_ または R 経由でアクセス）

- 入力パラメータ: data（配列）。各 item には行番号を表す __row_index フィールドが含まれます

- 行インデックスとフィールドの組み合わせ配列を返す必要があります: Array<{ __row_index: number, field: string }>

- __row_index は元データ項目の行番号、field は強調表示するフィールドを表します

- 禁止: eval、Function、非同期操作、DOM API、ネットワークリクエスト

:::

**例**
売上が1000を超えるデータ項目の sales フィールドを強調表示
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

各地域で利益率が最も高いデータ項目を強調表示
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

複数条件に一致するデータ項目を強調表示
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
コード実行失敗時、または環境がサポートされない場合のフォールバック

:::

##### field

**Type:** `string`

:::note{title=説明}
ディメンションフィールド。dimensions のいずれかの項目の id

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

- in: ディメンションフィールドの値が value に含まれるデータ項目を選択します

- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

- in: ディメンションフィールドの値が value に含まれるデータ項目を選択します

- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します

operator と同じ

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
データ項目内のディメンションフィールドの値を選択します。配列をサポートします

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

### lineVisible

**Type:** `boolean | undefined`

:::note{title=説明}
線分を表示するかどうか

:::

### lineSmooth

**Type:** `boolean | undefined`

:::note{title=説明}
線分を滑らかにするかどうか

:::

### lineColor

**Type:** `string | undefined`

:::note{title=説明}
線分の色

:::

### lineColorOpacity

**Type:** `number | undefined`

:::note{title=説明}
線分色の不透明度

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
線分の幅

:::

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=説明}
線分スタイル

:::

**例**
`lineStyle: 'solid'`




## areaStyle

**Type:** `AreaStyle | AreaStyle[] | undefined`

:::note{title=説明}
エリアマークスタイル設定。エリアマークの色、不透明度、枠線などを定義します。

グローバルスタイルまたは条件付きスタイル設定をサポートします

データフィルター




:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=説明}
- not in: 次元フィールド値が `value` 配列内にないデータ項目を選択します。






:::

**例**
棒プリミティブ (矩形) のストローク色
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]


selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]


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
次元フィールド。dimensions のいずれかの項目の id
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
クロスヘアに対応するラベルを表示するかどうか。




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
クロスヘアに対応するラベルを表示するかどうか。




operator と同じ

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
データ項目内の次元フィールドの値を選択します。配列をサポートします
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=説明}
動的フィルター（AI生成コード実行）

AI が生成した JavaScript コードで複雑なデータ絞り込みロジックを実装します

Top N、統計分析、複雑な条件など、静的 selector では表現しにくい場面に適しています

主な機能:

- 任意の複雑なデータ絞り込み条件をサポート

- 組み込みユーティリティ関数を使ってデータを操作

- ブラウザー環境で安全に実行（Web Worker サンドボックス）

環境要件: ブラウザー環境のみをサポートし、Node.js 環境では fallback を使用します

注意: selector と dynamicFilter は同時に使用できず、dynamicFilter の優先度が高くなります

チャート動的フィルター設定

AI 生成の JavaScript コードでチャートマーク（棒、点など）の絞り込みを実装します

:::

#### type

**Type:** `"row-with-field"`
#### description

**Type:** `string | undefined`

:::note{title=説明}
ユーザーの絞り込み要件の説明（自然言語）

:::

**例**
"売上が1000を超えるバーを強調表示"

"各地域で利益率が最も高いバーを強調表示"


#### code

**Type:** `string`

:::note{title=説明}
AI 生成の JavaScript 絞り込みコード

- 組み込みユーティリティ関数のみ使用できます（_ または R 経由でアクセス）

- 入力パラメータ: data（配列）。各 item には行番号を表す __row_index フィールドが含まれます

- 行インデックスとフィールドの組み合わせ配列を返す必要があります: Array<{ __row_index: number, field: string }>

- __row_index は元データ項目の行番号、field は強調表示するフィールドを表します

- 禁止: eval、Function、非同期操作、DOM API、ネットワークリクエスト

:::

**例**
売上が1000を超えるデータ項目の sales フィールドを強調表示
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

各地域で利益率が最も高いデータ項目を強調表示
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

複数条件に一致するデータ項目を強調表示
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
コード実行失敗時、または環境がサポートされない場合のフォールバック

:::

##### field

**Type:** `string`

:::note{title=説明}
ディメンションフィールド。dimensions のいずれかの項目の id

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

- in: ディメンションフィールドの値が value に含まれるデータ項目を選択します

- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

- in: ディメンションフィールドの値が value に含まれるデータ項目を選択します

- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します

operator と同じ

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
データ項目内のディメンションフィールドの値を選択します。配列をサポートします

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

### areaVisible

**Type:** `boolean | undefined`

:::note{title=説明}
エリアマークを表示するかどうか



エリアマークを表示するかどうか

:::

### areaColor

**Type:** `string | undefined`

:::note{title=説明}
エリアマークの色



エリアマークの色

:::

### areaColorOpacity

**Type:** `number | undefined`

:::note{title=説明}
エリアマーク色の不透明度



エリアマーク色の不透明度

:::


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=説明}
言語



グラフ言語設定。'zh\-CN' と 'en\-US' の2言語をサポートします。また intl.setLocale('zh\-CN') を呼び出して言語を設定できます

:::
