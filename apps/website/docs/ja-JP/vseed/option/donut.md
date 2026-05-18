# Donut

:::info{title=推奨}
- 推奨フィールド構成: `1` 個の指標、`2` 個の次元

- データリシェイプをサポート: 少なくとも `1` 個の指標、`0` 個の次元
:::

:::info{title=エンコーディングマッピング}
ドーナツチャートは次のビジュアルチャネルをサポートします:

`angle`  : 角度チャネル。`複数の指標`をサポートし、指標値に基づいて扇形角度へマッピングします

`detail` : 詳細チャネル。`複数の次元`をサポートし、同じカラー系列内でより細かな粒度のデータを表示するときに使用します

`color`  : カラーチャネル。`複数の次元`または`1 つの指標`をサポートします。次元の色は系列の区別に、指標の色は指標値から図形色への線形マッピングに使用します

`tooltip`: ツールチップチャネル。`複数の次元`と`複数の指標`をサポートし、データ点にマウスホバーしたときに表示されます

`label`  : ラベルチャネル。`複数の次元`と`複数の指標`をサポートし、データ点上にデータラベルを表示します
:::

:::note{title=説明}
ドーナツチャートは単一次元データの構成比を表示するのに適しており、中央の空白領域に集計情報を表示できます

適用シナリオ:

- 全体データと各部分の比率を同時に表示する場合

- 全体と部分の関係を強調

- 中央領域に主要指標やタイトルを表示する場合
:::

:::warning{title=Warning}
データ要件:

- 少なくとも 1 つの指標フィールド

- すべての次元は指標名（複数指標がある場合）と結合され、凡例項目として表示されます

- すべての指標は自動的に 1 つの指標にマージされます

デフォルトで有効な機能:

- 凡例、データラベル、ツールチップ、比率計算、中央テキストがデフォルトで有効です
:::


## chartType

**Type:** `"donut"`

:::note{title=説明}
ドーナツチャート

ドーナツチャート。中央に空白領域を持つ円グラフのバリエーションです
:::

**例**
'donut'




## dataset

**Type:** `Record[]`

:::note{title=説明}
データセット

TidyData 仕様に準拠し、集計済みのデータセットです。チャートのデータソースと構造を定義します。ユーザー入力データセットに追加処理は不要です。VSeed には強力なデータリシェイプ機能があり、自動でデータを再整形します。ドーナツチャートのデータは最終的に 1 つの次元と 1 つの指標に変換されます。
:::

**例**
[{category:'A', value:30}, {category:'B', value:70}]




## dimensions

**Type:** `PieDimension[] | undefined`

:::note{title=説明}
次元

ドーナツチャートのすべての次元は指標名（複数指標がある場合）と結合されて 1 つの次元となり、円グラフの角度へマッピングされ、凡例項目として表示されます。
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
時間粒度。日付の表示精度を決定します
:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=説明}
次元をマッピングするチャネル

\- color: 複数の次元を色チャネルにマッピングできます

\- detail: 複数の次元を詳細チャネルにマッピングできます

\- tooltip: 複数の次元をツールチップチャネルへマッピングできます

\- label: 複数の次元をラベルチャネルへマッピングできます

\- row: 複数の次元を行チャネルにマッピングできます

\- column: 複数の次元を列チャネルにマッピングできます
:::


## measures

**Type:** `PieMeasure[] | undefined`

:::note{title=説明}
指標

ドーナツチャートのすべての指標は自動的に 1 つの指標にマージされ、円グラフの半径へマッピングされます。複数指標がある場合、指標名は残りの次元と結合され、凡例項目として表示されます。
:::

**例**
[{id: 'value', alias: '値の比率', format: 'percent'}]




### id

**Type:** `string`

:::note{title=説明}
指標 ID。重複できません
:::

### alias

**Type:** `string | undefined`

:::note{title=説明}
指標の別名。重複できます。未指定の場合、alias は id になります
:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=説明}
自動数値フォーマット。デフォルトで有効で、最も高い優先度を持ちます

autoFormat=true の場合、numFormat のすべての設定を上書きします

有効にすると、チャートのラベルとツールチップは指標値と言語環境に基づいて適切なフォーマットを自動選択します

フォーマット規則: 10進数、compact notation 有効、小数部は最小0桁・最大2桁、自動丸め、ブラウザーの Intl.NumberFormat で実装

例:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K
:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=説明}
指標のカスタム数値フォーマット。label と tooltip に自動適用されます

注意: カスタムフォーマットを使うには autoFormat=false を明示的に設定してください。そうしないと autoFormat がこの設定を上書きします
:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=説明}
数値フォーマットタイプ。数値（10進数）、パーセント（%）、パーミル（‰）、科学表記をサポートします
:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマット比率。0にはできません
:::

**例**
\- 100000 は 10万 に変換, ratio:10000, symbol:"万"
\- 100000 は 10K に変換, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマット記号。例: %、‰
:::

**例**
\- 100000 は 10万 に変換, ratio:10000, symbol:"万"
\- 100000 は 10K に変換, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=説明}
数値フォーマットの桁区切り記号
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
数値フォーマットの小数桁。ブラウザー Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用します。significantDigits より優先度は低くなります
:::

**例**
\- 1234.5678 は 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 は 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 は 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 は 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 は 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 は 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの有効桁。ブラウザー Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用します。fractionDigits より優先度は高くなります
:::

**例**
\- 1234.5678 は 1000, significantDigits:1
\- 1234.5678 は 1200, significantDigits:2
\- 1234.5678 は 1230, significantDigits:3
\- 1234.5678 は 1234, significantDigits:4
\- 1234.5678 は 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 は 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 は 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 は 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=説明}
significantDigits と fractionDigits を同時に設定した場合の数値フォーマットの丸め優先度。ブラウザー Intl.NumberFormat を使用し、Intl.NumberFormat の roundingPriority と同じ規則に従います
:::

**例**
\- 1234.5678 は 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 は 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
数値フォーマットの丸めモード。ブラウザー Intl.NumberFormat を使用し、Intl.NumberFormat の roundingMode と同じ規則に従います
:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=説明}
数値フォーマットタイプ。数値（10進数）、パーセント（%）、パーミル（‰）、科学表記をサポートします
:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマット比率。0にはできません
:::

**例**
\- 100000 は 10万 に変換, ratio:10000, symbol:"万"
\- 100000 は 10K に変換, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマット記号。例: %、‰
:::

**例**
\- 100000 は 10万 に変換, ratio:10000, symbol:"万"
\- 100000 は 10K に変換, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=説明}
数値フォーマットの桁区切り記号
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
数値フォーマットの小数桁。ブラウザー Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用します。significantDigits より優先度は低くなります
:::

**例**
\- 1234.5678 は 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 は 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 は 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 は 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 は 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 は 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの有効桁。ブラウザー Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用します。fractionDigits より優先度は高くなります
:::

**例**
\- 1234.5678 は 1000, significantDigits:1
\- 1234.5678 は 1200, significantDigits:2
\- 1234.5678 は 1230, significantDigits:3
\- 1234.5678 は 1234, significantDigits:4
\- 1234.5678 は 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 は 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 は 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 は 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=説明}
significantDigits と fractionDigits を同時に設定した場合の数値フォーマットの丸め優先度。ブラウザー Intl.NumberFormat を使用し、Intl.NumberFormat の roundingPriority と同じ規則に従います
:::

**例**
\- 1234.5678 は 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 は 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
数値フォーマットの丸めモード。ブラウザー Intl.NumberFormat を使用し、Intl.NumberFormat の roundingMode と同じ規則に従います
:::

### encoding

**Type:** `"color" | "tooltip" | "label" | "angle" | undefined`

:::note{title=説明}
指標をマッピングするチャネル

\- angle: 指標がマッピングされる角度

\- color: 指標を色チャネルにマッピングします

\- label: 指標をラベルチャネルへマッピング

\- tooltip: 指標をツールチップチャネルへマッピング
:::

### parentId

**Type:** `string | undefined`

:::note{title=説明}
フラットな指標設定形式でツリー状の指標グループを構築します。parentId は親指標グループの id を指し、指標ツリーの構築に使用されます
:::

:::tip{title=Tip}
指標ツリーの設定方法は2つあります: 方法1は children で指標ツリーを直接設定する方法、方法2は parentId を持つフラットな指標リストを設定する方法です。この2つの方法は同時に使用できません
:::


## page

**Type:** `Page | undefined`

:::note{title=説明}
ページネーション設定。ページネーションに使うフィールド名を指定します。必ず次元である必要があります
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
チャートの背景色



背景色には色名文字列（例: 'red', 'blue'）または hex、rgb、rgba 値（例: '#ff0000', 'rgba(255,0,0,0.5)'）を指定できます
:::


## color

**Type:** `Color | undefined`

:::note{title=説明}
色

チャートの配色方案を定義する色設定です。色リスト、色マッピング、色グラデーションなどを含みます。
:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=説明}
離散カラースキーム。チャート内の異なる要素の色を定義します
:::

**例**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=説明}
線形グラデーションカラースキーム。チャート内の異なる要素の色を定義します
:::

**例**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=説明}
カラーマッピング。データ値を具体的な色へマッピングします
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

**Type:** `PieLabel | undefined`

:::note{title=説明}
ラベル

チャートのデータラベル設定。データラベルの位置、フォーマット、スタイルなどを定義します。
:::


### enable

**Type:** `false | true`

:::note{title=説明}
ラベル機能を有効にするかどうか
:::

### wrap

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルを折り返すかどうか
:::

### showValue

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルに指標値を表示するかどうか

複数指標のシナリオでも値の矛盾を心配する必要はありません。描画に関連するすべての指標は `foldMeasures` で処理され、1つのデータ点を表す1つの指標に統合されるためです。

注意: encoding.label の優先度が高く、この設定は encoding.label には影響しません
:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルに指標値の割合を表示するかどうか

複数指標のシナリオでも値の矛盾を心配する必要はありません。描画に関連するすべての指標は `foldMeasures` で処理され、1つのデータ点を表す1つの指標に統合されるためです。

注意: encoding.label の優先度が高く、この設定は encoding.label には影響しません
:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルに次元ラベルを表示するかどうか

すべての次元ラベルを表示します

注意: encoding.label の優先度が高く、この設定は encoding.label には影響しません
:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=説明}
ラベル値を自動フォーマットするかどうか。autoFormat が true の場合、numFormat 設定は無効になります
:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=説明}
ラベル値のフォーマット設定。`measure` の `format` とマージされ、`measure` の `format` の優先度が高くなります。numFormat の優先度は autoFormat より低くなります
:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=説明}
数値フォーマットタイプ。数値（10進数）、パーセント（%）、パーミル（‰）、科学表記をサポートします
:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマット比率。0にはできません
:::

**例**
\- 100000 は 10万 に変換, ratio:10000, symbol:"万"
\- 100000 は 10K に変換, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマット記号。例: %、‰
:::

**例**
\- 100000 は 10万 に変換, ratio:10000, symbol:"万"
\- 100000 は 10K に変換, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=説明}
数値フォーマットの桁区切り記号
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
数値フォーマットの小数桁。ブラウザー Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用します。significantDigits より優先度は低くなります
:::

**例**
\- 1234.5678 は 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 は 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 は 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 は 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 は 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 は 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの有効桁。ブラウザー Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用します。fractionDigits より優先度は高くなります
:::

**例**
\- 1234.5678 は 1000, significantDigits:1
\- 1234.5678 は 1200, significantDigits:2
\- 1234.5678 は 1230, significantDigits:3
\- 1234.5678 は 1234, significantDigits:4
\- 1234.5678 は 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 は 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 は 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 は 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=説明}
significantDigits と fractionDigits を同時に設定した場合の数値フォーマットの丸め優先度。ブラウザー Intl.NumberFormat を使用し、Intl.NumberFormat の roundingPriority と同じ規則に従います
:::

**例**
\- 1234.5678 は 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 は 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
数値フォーマットの丸めモード。ブラウザー Intl.NumberFormat を使用し、Intl.NumberFormat の roundingMode と同じ規則に従います
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
マーク色に応じてラベルのフォント色を自動反転するかどうか
:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=説明}
ラベル位置
:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルの重なり回避を有効にするかどうか
:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=説明}
ラベルフィルター。デフォルトでは selectors 間の条件関係は OR です
:::


#### field

**Type:** `string`

:::note{title=説明}
次元フィールド。dimensions のいずれかの項目の id
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

\- in: 次元フィールドの値が value に含まれるデータ項目を選択します

\- not in: 次元フィールドの値が value に含まれないデータ項目を選択します
:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

\- in: 次元フィールドの値が value に含まれるデータ項目を選択します

\- not in: 次元フィールドの値が value に含まれないデータ項目を選択します

operator と同じです
:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
データ項目内の次元フィールド値を選択します。配列をサポートします
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=説明}
動的フィルター（AI生成コード実行）

AI が生成した JavaScript コードで複雑なデータフィルタリングロジックを実装します

主な機能:

\- 任意に複雑なデータフィルター条件をサポート

\- 組み込みユーティリティ関数を使ってデータ操作を実行

\- ブラウザー環境で安全に実行（Web Worker サンドボックス）

環境要件: ブラウザー環境のみ対応し、Node.js 環境では fallback を使用します

注意: selector と dynamicFilter は同時に使用できません。dynamicFilter の優先度が高くなります

チャート動的フィルター設定

AI が生成した JavaScript コードでチャートマーク（棒、点など）をフィルタリングします
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=説明}
ユーザーのフィルター要件説明（自然言語）
:::

**例**
"売上が 1000 を超える列をハイライト"

"各地域で利益率が最も高い列をハイライト"



#### code

**Type:** `string`

:::note{title=説明}
AI が生成した JavaScript フィルターコード

\- 組み込みユーティリティ関数のみ使用できます（_ または R からアクセス）

\- 入力パラメータ: data（配列）。各 item には行番号を示す __row_index フィールドが含まれます

\- 行インデックスとフィールドの組み合わせ配列を返す必要があります: Array<{ __row_index: number, field: string }>

\- __row_index は元データ項目の行番号、field はハイライト対象のフィールドを表します

\- 使用禁止: eval、Function、非同期操作、DOM API、ネットワークリクエスト
:::

**例**
売上が 1000 を超えるデータ項目の sales フィールドをハイライト
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

各地域で利益率が最も高いデータ項目をハイライト
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

複数条件に一致するデータ項目をハイライト
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
コード実行に失敗した場合、または環境が対応していない場合のフォールバック
:::


##### field

**Type:** `string`

:::note{title=説明}
次元フィールド。dimensions のいずれかの項目の id
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

\- in: 次元フィールドの値が value に含まれるデータ項目を選択します

\- not in: 次元フィールドの値が value に含まれないデータ項目を選択します
:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

\- in: 次元フィールドの値が value に含まれるデータ項目を選択します

\- not in: 次元フィールドの値が value に含まれないデータ項目を選択します

operator と同じです
:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
データ項目内の次元フィールド値を選択します。配列をサポートします
:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=説明}
動的フィルター実行結果（ランタイムフィールド）

prepare() 段階で書き込まれ、実行時は読み取り専用です
:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### labelLayout

**Type:** `"arc" | "labelLine" | "edge" | undefined`

:::note{title=説明}
ラベルのレイアウト方式。円グラフ、ドーナツグラフで `labelPosition` が `outside` の場合のみ有効です

\- arc: 円弧に沿ってラベルを配置します

\- labelLine: ラベルの両端を揃え、ガイド線で扇形マークとラベルを接続します

\- edge: ラベルの両端を揃え、ガイド線で扇形マークとラベルを接続し、グラフの両端の端に近づけます
:::


## legend

**Type:** `Legend | undefined`

:::note{title=説明}
凡例

チャートの凡例設定。凡例の位置、フォーマット、スタイルなどを定義します。
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
凡例の境界線を有効にするかどうか
:::

:::warning{title=Warning}
離散凡例にのみ有効
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
離散凡例にのみ有効
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
凡例項目が多い場合の最大列数または最大行数

position が水平方向 (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr) の場合、maxSize は表示列数を制御します

position が垂直方向 (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb) の場合、maxSize は表示行数を制御します
:::

:::warning{title=Warning}
離散凡例にのみ有効
:::

**例**
maxSize: 2




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=説明}
ツールチップ

チャートのツールチップ設定。ツールチップの位置、フォーマット、スタイルなどを定義します。
:::


### enable

**Type:** `false | true`

:::note{title=説明}
ツールチップを有効にするかどうか
:::


## brush

**Type:** `Brush | undefined`

:::note{title=説明}
ブラシ選択

brush による範囲選択を有効化または無効化するための設定です。

チャートのブラシ選択設定
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
ブラシ選択モード。単一選択または複数選択

選択モードを定義します。

\- `single`: 単一選択モード。一度に存在できる選択範囲は1つだけです

\- `multiple`: 複数選択モード。複数の選択範囲を同時に保持できます
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
不透明度

選択されたデータ点の不透明度。値の範囲は0から1です
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
選択範囲外データのスタイル

選択されていないデータ点のスタイルを定義します
:::


#### opacity

**Type:** `number | undefined`

:::note{title=説明}
不透明度

選択されていないデータ点の不透明度。値の範囲は0から1です
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

**Type:** `PieLikeAnimation | undefined`

:::note{title=説明}
アニメーション設定

チャートのアニメーション設定。選択可能な効果はチャートタイプによって制約されます
:::


### enable

**Type:** `boolean | undefined`

:::note{title=説明}
円グラフ/ドーナツグラフ/ローズグラフのアニメーションを有効にするかどうか
:::

### params

**Type:** `PieLikeAnimationParams | undefined`

:::note{title=説明}
円グラフ/ドーナツグラフ/ローズグラフのアニメーションパラメータ
:::


#### appear

**Type:** `PieLikeAppearAnimation | undefined`

:::note{title=説明}
円グラフ/ドーナツグラフ/ローズグラフの入場アニメーション設定
:::


##### effects

**Type:** `("radial" | "scale")[] | undefined`

:::note{title=説明}
円グラフ/ドーナツグラフ/ローズグラフの入場効果。放射状アニメーションとズームアニメーションをサポートします
:::

##### enable

**Type:** `boolean | undefined`

:::note{title=説明}
現在のアニメーション段階を有効にするかどうか
:::

##### ease

**Type:** `string | undefined`

:::note{title=説明}
アニメーション easing 関数
:::

##### duration

**Type:** `number | undefined`

:::note{title=説明}
アニメーション時間。単位はミリ秒
:::

##### color

**Type:** `string | undefined`

:::note{title=説明}
アニメーションのハイライト色または雰囲気色
:::

#### update

**Type:** `PieLikeUpdateAnimation | undefined`

:::note{title=説明}
円グラフ/ドーナツグラフ/ローズグラフの更新アニメーション設定
:::


##### effects

**Type:** `"radial"[] | undefined`

:::note{title=説明}
円グラフ/ドーナツグラフ/ローズグラフの更新効果。放射状アニメーションをサポートします
:::

##### enable

**Type:** `boolean | undefined`

:::note{title=説明}
現在のアニメーション段階を有効にするかどうか
:::

##### ease

**Type:** `string | undefined`

:::note{title=説明}
アニメーション easing 関数
:::

##### duration

**Type:** `number | undefined`

:::note{title=説明}
アニメーション時間。単位はミリ秒
:::

##### color

**Type:** `string | undefined`

:::note{title=説明}
アニメーションのハイライト色または雰囲気色
:::

#### loop

**Type:** `PieLikeAnimationLoop | undefined`

:::note{title=説明}
円グラフ/ドーナツグラフ/ローズグラフのループアニメーション設定
:::


##### enable

**Type:** `boolean | undefined`

:::note{title=説明}
ループアニメーションを有効にするかどうか
:::

##### interval

**Type:** `number | undefined`

:::note{title=説明}
ループアニメーションの間隔。単位はミリ秒
:::

##### loop

**Type:** `PieLikeLoopAnimation | undefined`

:::note{title=説明}
円グラフ/ドーナツグラフ/ローズグラフのループアニメーション設定
:::


###### effects

**Type:** `PieLikeLoopEffect[] | undefined`

:::note{title=説明}
円グラフ/ドーナツグラフ/ローズグラフのループ効果
:::

###### enable

**Type:** `boolean | undefined`

:::note{title=説明}
現在のアニメーション段階を有効にするかどうか
:::

###### ease

**Type:** `string | undefined`

:::note{title=説明}
アニメーション easing 関数
:::

###### duration

**Type:** `number | undefined`

:::note{title=説明}
アニメーション時間。単位はミリ秒
:::

###### color

**Type:** `string | undefined`

:::note{title=説明}
アニメーションのハイライト色または雰囲気色
:::

##### atmosphere

**Type:** `NoEffectAtmosphereConfig | undefined`

:::note{title=説明}
円グラフ/ドーナツグラフ/ローズグラフの雰囲気アニメーション設定
:::


###### ease

**Type:** `string | undefined`

:::note{title=説明}
雰囲気アニメーションの easing 関数
:::

###### color

**Type:** `string | undefined`

:::note{title=説明}
雰囲気アニメーション色
:::


## theme

**Type:** `Theme | undefined`

:::note{title=説明}
チャートテーマ。テーマは優先度の低い機能設定で、すべてのチャートタイプに共通する設定と、単一チャートタイプで共有されるチャート設定を含みます

組み込みの light と dark の2つのテーマがあり、ユーザーは Builder でテーマをカスタマイズできます

テーマ

組み込みの light、dark の2つのテーマがあり、新しいテーマは registerTheme でカスタマイズできます。
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
言語

チャート言語設定。'zh-CN' と 'en-US' の2言語をサポートし、intl.setLocale('zh-CN') メソッドで言語を設定することもできます
:::
