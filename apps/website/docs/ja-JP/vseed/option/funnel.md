# Funnel

:::info{title=推奨}
- 推奨フィールド設定: 指標 `1` 個、ディメンション `1` 個

\- データリシェイプをサポート: 少なくとも `1` 個の指標、`0` 個のディメンション

:::

:::info{title=エンコードマッピング}
漏斗グラフは次の視覚チャネルに対応しています:

`size`   : サイズチャネル、`複数の指標`をサポートし、指標値を漏斗の幅にマッピングします

`detail` : 詳細チャネル、`複数のディメンション`をサポートし、同じ色系列内でより細かい粒度のデータを表示するときに使用します

`color`  : 色チャネル、`複数のディメンション`または`1つの指標`をサポートします。ディメンション色はデータ系列の区別に、指標色は指標値を図形色へ線形マッピングするために使用します

`tooltip`: ツールチップチャネル、`複数のディメンション`と`複数の指標`をサポートし、データ点にマウスホバーしたときに表示されます

`label`  : ラベルチャネル、`複数のディメンション`と`複数の指標`をサポートし、データ点上にデータラベルを表示します

:::

:::note{title=説明}
漏斗グラフ。単一ディメンションデータの構成比を表示するために使用します。

適用シーン:

漏斗グラフの適用シーン:

\- 複数の連続した標準化ステップを持つプロセスの分析に適しており、各段階でのデータ離脱や転換状況を明確に表示します

:::

:::warning{title=Warning}
データ要件:

\- 少なくとも1つの数値フィールド（指標）が必要です

\- すべてのディメンションは（複数の指標がある場合）指標名と結合されて1つのディメンションになり、凡例項目として表示されます

\- すべての指標は自動的に1つの指標へ統合されます

デフォルトで有効な機能:

\- 凡例、データラベル、ツールチップ、構成比計算はデフォルトで有効です

:::


## chartType

**Type:** `"funnel"`

:::note{title=説明}
漏斗グラフ



漏斗グラフ。単一ディメンションデータの構成比を表示します。

:::

**例**
'funnel'




## dataset

**Type:** `Record[]`

:::note{title=説明}
データセット。TidyData 仕様に準拠し、集計済みのデータセットです。グラフのデータソースと構造を定義します。ユーザーが入力するデータセットに追加処理は不要です。VSeed には強力なデータリシェイプ機能があり、自動でデータをリシェイプします。漏斗グラフのデータは最終的に 1 つのディメンションと 1 つの指標に変換されます。

:::

**例**
[{category:'A', value:30}, {category:'B', value:70}]




## dimensions

**Type:** `PieDimension[] | undefined`

:::note{title=説明}
ディメンション



漏斗グラフでは、すべてのディメンションが（複数の指標がある場合）指標名と結合されて1つのディメンションになり、凡例項目として表示されます。

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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=説明}
ディメンションをマッピングするチャネル

\- color: 複数ディメンションを色チャネルにマッピングできます

\- detail: 複数ディメンションを詳細チャネルにマッピングできます

\- tooltip: 複数のディメンションをツールチップチャネルへマッピングできます

\- label: 複数のディメンションをラベルチャネルへマッピングできます

\- row: 複数ディメンションを行チャネルにマッピングできます

\- column: 複数ディメンションを列チャネルにマッピングできます

:::


## measures

**Type:** `FunnelMeasure[] | undefined`

:::note{title=説明}
指標



漏斗グラフでは、すべての指標が自動的に1つの指標へ統合されます。複数の指標がある場合、指標名は残りのディメンションと結合され、凡例項目として表示されます。

:::

**例**
[{id: 'value', alias: '数値構成比', format: 'percent'}]




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
\- 1234.5678 は 1235 に変換されます。fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 は 1234.6 に変換されます。fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 は 1234.57 に変換されます。fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 は 1230.568 に変換されます。fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 は 1234.5678 に変換されます。fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 は 1234.56780 に変換されます。fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの有効桁。ブラウザー Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用します。fractionDigits より優先度は高くなります
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
significantDigits と fractionDigits を同時に設定した場合の数値フォーマットの丸め優先度。ブラウザー Intl.NumberFormat を使用し、Intl.NumberFormat の roundingPriority と同じ規則に従います
:::

**例**
\- 1234.5678 は 1230 に変換されます。significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 は 1234.5678 に変換されます。significantDigits:3 (roundingPriority:morePrecision)



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
\- 1234.5678 は 1235 に変換されます。fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 は 1234.6 に変換されます。fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 は 1234.57 に変換されます。fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 は 1230.568 に変換されます。fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 は 1234.5678 に変換されます。fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 は 1234.56780 に変換されます。fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの有効桁。ブラウザー Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用します。fractionDigits より優先度は高くなります
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
significantDigits と fractionDigits を同時に設定した場合の数値フォーマットの丸め優先度。ブラウザー Intl.NumberFormat を使用し、Intl.NumberFormat の roundingPriority と同じ規則に従います
:::

**例**
\- 1234.5678 は 1230 に変換されます。significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 は 1234.5678 に変換されます。significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
数値フォーマットの丸めモード。ブラウザー Intl.NumberFormat を使用し、Intl.NumberFormat の roundingMode と同じ規則に従います
:::

### encoding

**Type:** `"color" | "tooltip" | "label" | "size" | undefined`

:::note{title=説明}
指標がマッピングされるチャネル

\- label: 指標をラベルチャネルへマッピング

\- color: color チャネルにマッピングされる指標

\- label: label チャネルにマッピングされる指標

\- tooltip: tooltip チャネルにマッピングされる指標

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
ページネーション設定

:::


### field

**Type:** `string`

:::note{title=説明}
ページネーションフィールド。ページネーションに使うフィールド名を指定します。必ずディメンションである必要があります
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
線形グラデーション色設定。チャートのカラースキームを定義します

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

**Type:** `Label | undefined`

:::note{title=説明}
チャートのデータラベルを定義するラベル設定。位置、フォーマット、スタイルなどを含みます。

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
ラベルにディメンションラベルを表示するかどうか

すべてのディメンションラベルを表示します

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
\- 1234.5678 は 1235 に変換されます。fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 は 1234.6 に変換されます。fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 は 1234.57 に変換されます。fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 は 1230.568 に変換されます。fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 は 1234.5678 に変換されます。fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 は 1234.56780 に変換されます。fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの有効桁。ブラウザー Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用します。fractionDigits より優先度は高くなります
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
significantDigits と fractionDigits を同時に設定した場合の数値フォーマットの丸め優先度。ブラウザー Intl.NumberFormat を使用し、Intl.NumberFormat の roundingPriority と同じ規則に従います
:::

**例**
\- 1234.5678 は 1230 に変換されます。significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 は 1234.5678 に変換されます。significantDigits:3 (roundingPriority:morePrecision)



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
ディメンションフィールド。dimensions のいずれかの項目の id
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

\- in: ディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します
:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

\- in: ディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します

operator と同じです
:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
データ項目内のディメンションフィールド値を選択します。配列をサポートします
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
\- 任意の複雑なデータフィルター条件に対応

\- 組み込みユーティリティ関数を使ってデータ操作を行います



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
return _.map(filtered, item => ({
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

const maxItems = _.map(grouped, group =>
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

const profitRate = item.profit / item.sales;
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
ディメンションフィールド。dimensions のいずれかの項目の id
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

\- in: ディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します
:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

\- in: ディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します

operator と同じです
:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
データ項目内のディメンションフィールド値を選択します。配列をサポートします
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


## legend

**Type:** `ColorLegend | undefined`

:::note{title=説明}
色凡例設定。凡例の位置、フォーマット、スタイルなどを定義します。

:::


### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=説明}
凡例位置
:::

**例**
position: 'rightTop'



### enable

**Type:** `boolean | undefined`

:::note{title=説明}
凡例機能を有効にするかどうか
:::

**例**
enable: true



### labelColor

**Type:** `string | undefined`

:::note{title=説明}
凡例のフォント色
:::

### labelFontColor

**Type:** `string | undefined`

:::note{title=説明}
凡例のフォント色
:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=説明}
凡例のフォントサイズ
:::

**例**
labelFontSize: 10



### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=説明}
凡例のフォントウェイト
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




ブラシ選択を有効にするかどうか

:::


### enable

**Type:** `false | true`

:::note{title=説明}
ツールチップを有効にするかどうか
:::


## brush

**Type:** `Brush | undefined`

:::note{title=説明}








ブラシ選択モード: 単一または複数

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
選択されたデータポイントの不透明度。範囲は0-1です







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
X 軸、カテゴリ軸、X 軸設定。位置、フォーマット、スタイルなど、チャートの X 軸を定義します。





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


## theme

**Type:** `Theme | undefined`

:::note{title=説明}




データセレクタ。設定されている場合、数値、部分データ項目、ディメンション、または指標のマッチング機能を提供します。未設定の場合、スタイルはグローバルに適用されます。



const maxItems = _.map(grouped, group =>



_.map(maxItems, item => [

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



グラフの言語設定。'zh\-CN' と 'en\-US' の 2 つの言語をサポートします。また intl.setLocale('zh\-CN') メソッドを呼び出して言語を設定できます

:::
