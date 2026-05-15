# Heatmap

:::info{title=推奨}
- 推奨フィールド設定: `1`個のメジャー、`2`個のディメンション

- データリシェイプ対応: 少なくとも`1`個のメジャー、`0`個のディメンション

:::

:::info{title=エンコーディングマッピング}
ヒートマップチャートは以下の視覚チャネルをサポートします:

`xAxis`      : x軸チャネル、`複数ディメンション`をサポートし、ディメンション値によりx軸へマッピングします

`yAxis`      : y軸チャネル、`複数ディメンション`をサポートし、ディメンション値によりy軸へマッピングします

`detail`     : 詳細チャネル、`複数ディメンション`をサポートし、同じ色系列内でより細かなデータを表示するために使用します

`color`      : 色チャネル、`1つのメジャー`をサポートし、メジャー値を色の濃淡にマッピングします

`tooltip`    : ツールチップチャネル、`複数ディメンション`と`複数メジャー`をサポートし、データポイントにホバーした時に表示します

`label`      : ラベルチャネル、`複数ディメンション`と`複数メジャー`をサポートし、データポイント上にデータラベルを表示します

:::

:::note{title=説明}
ヒートマップチャートは、二次元マトリクス内の色の濃淡によってデータの分布と強弱関係を表示します。

適用シナリオ:

- 大規模な二次元データの密度と強度の表示

- カテゴリと数値の相関分析

- 時系列とカテゴリのクロス比較

:::

:::warning{title=Warning}
データ要件:

- 少なくとも2つのディメンションフィールド。ヒートマップチャートの行と列を決定するために使用します

- 少なくとも1つの数値フィールド。色の濃淡へマッピングするために使用します

- 複数メジャーをサポートする場合、通常は1つのメジャーを選択して色へマッピングします

デフォルトで有効な機能:

- 凡例、軸、データラベル、ツールチップ、数値スケーリングがデフォルトで有効です。

:::


## chartType

**Type:** `"heatmap"`

:::note{title=説明}
ヒートマップチャートは、二次元マトリクス内の色の濃淡によってデータの分布と強弱関係を表示します。

:::

**例**
'heatmap'




## dataset

**Type:** `Record[]`

:::note{title=説明}
データセット。TidyData仕様に準拠し、集計済みのデータセットで、チャートのデータソースと構造を定義します。ユーザー入力データに前処理は不要です。VSeedは強力なデータリシェイプ機能を備えており、自動的に整形を処理します。ヒートマップチャートのデータは最終的に2つのディメンションと1つのメジャーに変換されます。

:::

**例**
[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]




## dimensions

**Type:** `HeatmapDimension[] | undefined`

:::note{title=説明}
ディメンション。ヒートマップチャートでは、最初のディメンションは通常X軸にマッピングされ、その他のディメンションはメジャー名（複数存在する場合）と結合されて凡例項目として表示されます。

:::

**例**
[{id: 'category', alias: 'カテゴリ'}]




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

**Type:** `"xAxis" | "tooltip" | "label" | "row" | "column" | "yAxis" | undefined`

:::note{title=説明}
ディメンションをマッピングするチャネル:

- xAxis: 複数ディメンションをx軸にマッピングできます

- yAxis: 複数ディメンションをy軸にマッピングできます

- tooltip: 複数ディメンションをツールチップチャネルにマッピングできます

- label: 複数ディメンションをラベルチャネルにマッピングできます

- row: 複数ディメンションを行チャネルにマッピングできます

- column: 複数ディメンションを列チャネルにマッピングできます

:::


## measures

**Type:** `HeatmapMeasure[] | undefined`

:::note{title=説明}
メジャー。ヒートマップチャートのメジャーは自動的に1つのメジャーに統合され、カラースケールへマッピングされます。複数のメジャーが存在する場合、その名前は他のディメンションと結合されて凡例項目として表示されます。

:::

**例**
[{id: 'value', alias: '値'}]




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

**Type:** `"color" | "tooltip" | "label" | undefined`

:::note{title=説明}
メジャーをマッピングするチャネル:

- color: メジャーを色チャネルにマッピングします

- label: メジャーをラベルチャネルにマッピングします

- tooltip: メジャーをツールチップチャネルにマッピングします

:::

### parentId

**Type:** `string | undefined`

:::note{title=説明}
フラットなメジャー設定でツリー状のメジャー構造を構築します。parentId は親メジャーグループの ID を指し、階層構築に使用されます。

:::

:::tip{title=ヒント}
メジャーツリーの設定方法は2つあります: 方法1は children でメジャーツリーを直接設定する方法、方法2は parentId を持つフラットなメジャーリストを指定する方法です。この2つは同時に使用できません。

:::


## page

**Type:** `Page | undefined`

:::note{title=説明}
ページネーション設定。

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

**Type:** `Background色`

:::note{title=説明}
チャート背景色。

Background color can be a color string (e.g., 'red', 'blue'), or a hex, rgb, or rgba value (e.g., '#ff0000', 'rgba(255,0,0,0.5)').

:::


## color

**Type:** `色 | undefined`

:::note{title=説明}
チャートの配色を定義する色設定。色リスト、色マッピング、色グラデーションを含みます。

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=説明}
チャート内の異なる要素の色を定義するための離散カラースキーム。

:::

**例**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=説明}
チャート内の異なる要素の色を定義するための線形グラデーションカラースキーム。

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
正負色設定。チャート内の正の値の色を定義します。

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=説明}
正負色設定。チャート内の負の値の色を定義します。

:::


## label

**Type:** `ラベル | undefined`

:::note{title=説明}
ヒートマップチャートのラベル設定。データラベルを定義するために使用し、背景色に対する可読性を確保するためにラベルの反転を自動的に有効にします。

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
ラベルにメジャー値を表示するかどうか。

複数メジャーのシナリオでは、すべての描画関連メジャーが `foldMeasures` 処理を経て、単一のデータポイントを表す1つのメジャーに統合されるため、値の競合を心配する必要はありません。

注: エンコーディングのラベルの優先度が高く、この設定はエンコーディングのラベルには影響しません。

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルにメジャー値のパーセンテージを表示するかどうか。

複数メジャーのシナリオでは、すべての描画関連メジャーが `foldMeasures` 処理を経て、単一のデータポイントを表す1つのメジャーに統合されるため、値の競合を心配する必要はありません。

注: エンコーディングのラベルの優先度が高く、この設定はエンコーディングのラベルには影響しません。

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルにディメンション名を表示するかどうか。

Displays all dimension labels.

注: エンコーディングのラベルの優先度が高く、この設定はエンコーディングのラベルには影響しません。

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=説明}
ラベル値を自動フォーマットするかどうか。autoFormat が true の場合、numFormat 設定は無視されます。

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=説明}
ラベル値のフォーマット設定。`measure` 内の `format` とマージされ、`measure` の `format` がより高い優先度を持ちます。numFormat の優先度は autoFormat より低くなります。

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

### labelFontSize

**Type:** `number | undefined`

:::note{title=説明}
ラベルフォントサイズ。

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=説明}
ラベルフォントの太さ。

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
ラベル背景色。

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=説明}
ラベルのストローク（アウトライン）色。

:::

### labelColor

**Type:** `string | undefined`

:::note{title=説明}
ラベルフォント色。

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=説明}
Whether to automatically invert the label font color based on the graphic element color.

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=説明}
ラベル位置。

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=説明}
Whether the label overlap avoidance function is enabled.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=説明}
ラベルフィルタリング。セレクター間のデフォルト条件関係は OR です。

:::


#### field

**Type:** `string`

:::note{title=説明}
ディメンションフィールド ID。

:::

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

**Type:** `ChartDynamicFilter | undefined`

:::note{title=説明}
動的フィルター（AI生成コード実行）。

AI 生成の JavaScript コードで複雑なデータフィルタリングロジックを実装します。

主な機能:

- 任意の複雑なデータフィルタ条件をサポート

- データ操作に組み込みユーティリティ関数を使用

- ブラウザ環境で安全に実行（Web Worker サンドボックス）

環境要件: ブラウザ環境のみをサポートします。Node.js 環境では fallback を使用します。

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.

チャート動的フィルターの設定。

AI生成JavaScriptコードによってチャートマーク（列、点など）をフィルタリングします。

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=説明}
ユーザーのフィルタリング要件説明（自然言語）。

:::

**例**
"1000を超える売上列をハイライトする。"

"各地域で利益率が最も高い列をハイライトする。"



#### code

**Type:** `string`

:::note{title=説明}
AI 生成の JavaScript フィルタリングコード。

- 組み込みユーティリティ関数のみ使用できます（_ または R からアクセス）

- 入力パラメータ: data（配列）。各項目には行番号を表す __row_index フィールドが含まれます。

- 行インデックスとフィールドの組み合わせの配列を返す必要があります: Array<{ __row_index: number, field: string }>。

- __row_index represents the row number of the original data item, and field represents the field to be highlighted.

- 禁止: eval、Function、非同期操作、DOM API、ネットワークリクエスト。

:::

**例**
sales > 1000 のデータ項目の 'sales' フィールドをハイライト:
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

各地域で利益率が最も高いデータ項目をハイライト:
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

複数のフィルター条件を満たすデータ項目をハイライト:
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
コード実行に失敗した場合、または環境がサポートされない場合のフォールバック案。

:::


##### field

**Type:** `string`

:::note{title=説明}
ディメンションフィールド。dimensions のいずれかの項目の id。

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

\- in: データ項目のディメンションフィールドの値が value 内にあるデータ項目を選択します

\- not in: データ項目のディメンションフィールドの値が value 内にないデータ項目を選択します

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

\- in: データ項目のディメンションフィールドの値が value 内にあるデータ項目を選択します

\- not in: データ項目のディメンションフィールドの値が value 内にないデータ項目を選択します

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
データ項目のディメンションフィールドの値を選択します。配列をサポートします。

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=説明}
動的フィルター実行結果（ランタイムフィールド）。prepare() フェーズで書き込まれ、ランタイムでは読み取り専用です。

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`


## legend

**Type:** `ColorLegend | undefined`

:::note{title=説明}
凡例。ヒートマップチャートの色凡例設定で、位置、形式、スタイルなどチャートの凡例を定義するために使用します。

:::


### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=説明}
凡例の位置。

:::

**例**
position: 'rightTop'



### enable

**Type:** `boolean | undefined`

:::note{title=説明}
Whether legend functionality is enabled.

:::

**例**
enable: true



### labelColor

**Type:** `string | undefined`

:::note{title=説明}
凡例フォント色。

:::

### labelFontColor

**Type:** `string | undefined`

:::note{title=説明}
凡例フォント色。

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=説明}
凡例フォントサイズ。

:::

**例**
labelFontSize: 10



### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=説明}
凡例フォントの太さ。

:::

**例**
labelFontWeight: 400



### railBackgroundColor

**Type:** `string | undefined`

### handlerBorderColor

**Type:** `string | undefined`


## tooltip

**Type:** `Tooltip | undefined`

:::note{title=説明}
ツールチップ設定。位置、形式、スタイルなど、チャートのツールチップを定義するために使用します。

:::


### enable

**Type:** `false | true`

:::note{title=説明}
ツールチップ機能を有効にするかどうか。

:::


## brush

**Type:** `Brush | undefined`

:::note{title=説明}
ブラシ設定。範囲選択機能を有効または無効にするために使用します。

:::


### enable

**Type:** `boolean | undefined`

:::note{title=説明}
範囲選択を有効にするかどうか。

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=説明}
ブラシタイプ。選択ボックスの形状と方向を定義します:

- `rect`: 矩形選択。X軸とY軸の両方向で選択できます。

- `polygon`: 多角形選択。複数の点をクリックして任意の形状を描画できます。

- `x`: 横方向選択。選択をX軸方向に制限します。

- `y`: 縦方向選択。選択をY軸方向に制限します。

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=説明}
選択モード。単一選択または複数選択のロジックを定義します:

- `single`: 単一選択モード。一度に1つの選択ボックスのみ存在できます。

- `multiple`: 複数選択モード。複数の選択ボックスを同時に存在させられます。

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=説明}
範囲選択終了後に選択ボックスをクリアするかどうか。

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=説明}
選択範囲内のデータスタイル。

:::


#### opacity

**Type:** `number | undefined`

:::note{title=説明}
選択されたデータポイントの不透明度。範囲は0-1です。

:::

#### stroke

**Type:** `string | undefined`

:::note{title=説明}
ストローク色。

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
ストローク幅。

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=説明}
選択範囲外のデータスタイル。

:::


#### opacity

**Type:** `number | undefined`

:::note{title=説明}
選択範囲外のデータポイントの不透明度。範囲は0-1です。

:::

#### stroke

**Type:** `string | undefined`

:::note{title=説明}
ストローク色。

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
ストローク幅。

:::


## theme

**Type:** `テーマ | undefined`

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

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=説明}
ロケール。チャートの言語設定。'zh-CN' と 'en-US' をサポートします。または intl.setLocale('zh-CN') を呼び出して言語を設定できます。

:::
