# RoseParallel

:::info{title=推奨}
\- 推奨フィールド構成: `1` 個の指標、`1` 個の次元

\- データ再構成をサポート: 少なくとも `1` 個の指標、`0` 個の次元

:::

:::info{title=エンコーディングマッピング}
グループ化ローズグラフは次の視覚チャネルをサポートします:

`angle`  : 角度チャネル。`複数の次元`をサポートし、次元値を角度軸へマッピングします

`radius` : 半径チャネル。`複数の指標`をサポートし、指標値を半径軸へマッピングします

`detail` : 詳細チャネル。`複数の次元`をサポートし、同じ色系列内でより細かい粒度のデータを表示する場合に使用します

`color`  : 色チャネル。`複数の次元`または `1つの指標`をサポートします。次元色は系列の区別に使い、指標色は指標値を図形色へ線形マッピングするために使います

`tooltip`: ツールチップチャネル。`複数の次元`と `複数の指標`をサポートし、データ点にホバーしたときに表示されます

`label`  : ラベルチャネル。`複数の次元`と `複数の指標`をサポートし、データ点上にデータラベルを表示します

:::

:::note{title=説明}
グループ化ローズグラフ。極座標系で扇形の弧度と半径によりデータの大きさを表示し、多次元データ比較に適しています

適用シーン:

\- 多次元データの分布比較

\- 周期性データの強弱比較

\- カテゴリデータの数値と比率の同時表示

:::

:::warning{title=Warning}
データ要件:

\- 少なくとも1つの数値フィールド（指標）

\- 最初の次元は角度軸に配置されます。その他の次元は指標名（複数指標が存在する場合）と結合され、凡例項目として表示されます

\- すべての指標は自動的に1つの指標へ統合されます

デフォルトで有効な機能:

\- 凡例、極座標系、データラベル、ツールチップ、数値スケーリングがデフォルトで有効です

:::


## chartType

**Type:** `"roseParallel"`

:::note{title=説明}
グループ化ローズグラフ



グループ化ローズグラフ。極座標系で多次元データの比較関係を表示します

:::

**例**
'roseParallel'




## dataset

**Type:** `Record[]`

:::note{title=説明}
データセット



TidyData 仕様に準拠した集計済みデータセットです。グラフのデータソースと構造を定義するために使います。ユーザーが入力したデータセットに手動処理は不要で、VSeed の強力なデータ再構成機能が自動的に変換します。ローズグラフのデータは最終的に2つの次元と1つの指標に変換されます。

:::

**例**
[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]




## dimensions

**Type:** `RadarDimension[] | undefined`

:::note{title=説明}
次元



ローズグラフの最初の次元は角度軸にマッピングされます。その他の次元は指標名（複数指標が存在する場合）と結合され、凡例項目として表示されます。

:::

**例**
[{id: 'category', alias: 'Category'}]




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



ローズグラフの指標は自動的に1つの指標へ統合され、半径軸にマッピングされます。複数の指標が存在する場合、指標名は他の次元と結合され、凡例項目として表示されます。

:::

**例**
[{id: 'value', alias: 'Value'}]




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

有効にすると、グラフのラベルとツールチップは指標値と言語環境に基づいて適切なフォーマットを自動選択します

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
\- 100000 は 10万, ratio:10000, symbol:"万"
\- 100000 は 10K に変換されます。ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマット記号。例: %、‰
:::

**例**
\- 100000 は 10万, ratio:10000, symbol:"万"
\- 100000 は 10K に変換されます。ratio:1000, symbol:"K"



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
\- 100000 は 10万, ratio:10000, symbol:"万"
\- 100000 は 10K に変換されます。ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマット記号。例: %、‰
:::

**例**
\- 100000 は 10万, ratio:10000, symbol:"万"
\- 100000 は 10K に変換されます。ratio:1000, symbol:"K"



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

**Type:** `"color" | "tooltip" | "label" | "radius" | undefined`

:::note{title=説明}
指標をマッピングするチャネル

\- radius: 指標を半径チャネルへマッピングします

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
指標ツリーの設定方法は2つあります。方法1は children を持つ指標ツリーを直接設定すること、方法2は parentId を持つフラットな指標リストを設定することです。この2つは同時に使用できません

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
グラフの背景色



背景色には色名文字列（例: 'red', 'blue'）または hex、rgb、rgba 値（例: '#ff0000', 'rgba(255,0,0,0.5)'）を指定できます
:::


## color

**Type:** `Color | undefined`

:::note{title=説明}
色設定。色リスト、色マッピング、色グラデーションなど、グラフの配色方案を定義します。



:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=説明}
離散カラースキーム。グラフ内の異なる要素の色を定義します
:::

**例**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=説明}
線形グラデーションカラースキーム。グラフ内の異なる要素の色を定義します
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
正負色設定。グラフ内の正の値の色を定義します

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=説明}
正負色設定。グラフ内の負の値の色を定義します

:::


## label

**Type:** `PieLabel | undefined`

:::note{title=説明}
ラベル

グラフのデータラベル設定。データラベルの位置、フォーマット、スタイルなどを定義します。
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
\- 100000 は 10万, ratio:10000, symbol:"万"
\- 100000 は 10K に変換されます。ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマット記号。例: %、‰
:::

**例**
\- 100000 は 10万, ratio:10000, symbol:"万"
\- 100000 は 10K に変換されます。ratio:1000, symbol:"K"



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

グラフ動的フィルター設定

AI が生成した JavaScript コードでグラフマーク（棒、点など）をフィルタリングします
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=説明}
ユーザーのフィルター要件説明（自然言語）
:::

**例**
\- データ操作用の組み込みユーティリティ関数を使用します




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
ユーザーのフィルタリング要件説明（自然言語）
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

return _.flatten(
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

return _.flatten(
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

グラフの凡例設定。凡例の位置、フォーマット、スタイルなどを定義します。
:::


### enable

**Type:** `boolean | undefined`

:::note{title=説明}
凡例機能を有効にするかどうか
:::

**例**
sales が 1000 を超えるデータ項目の sales フィールドをハイライトします



### border

**Type:** `boolean | undefined`

:::note{title=説明}
凡例の境界線を有効にするかどうか
:::

:::warning{title=Warning}
離散凡例にのみ有効
:::

**例**
各エリアで利益率が最も高いデータ項目をハイライトします



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
演算子



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
\- not in: 次元フィールドの値が value に含まれないデータ項目を選択します



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=説明}
凡例の形状
:::

:::warning{title=Warning}
離散凡例にのみ有効
:::

**例**
演算子



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=説明}
凡例位置
:::

**例**
\- in: 次元フィールドの値が value に含まれるデータ項目を選択します



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

グラフのツールチップ設定。ツールチップの位置、フォーマット、スタイルなどを定義します。
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

グラフのブラシ選択設定
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

グラフのアニメーション設定。選択可能な効果はグラフタイプによって制約されます
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
グラフテーマ。テーマは優先度の低い機能設定で、すべてのグラフタイプに共通する設定と、単一グラフタイプで共有されるグラフ設定を含みます

組み込みの light と dark の2つのテーマがあり、ユーザーは Builder でテーマをカスタマイズできます

テーマ

組み込みの light、dark の2つのテーマがあり、新しいテーマは registerTheme でカスタマイズできます。
:::

**例**
ブラシ選択終了後に選択範囲をクリアするかどうか

未選択データ点の不透明度。範囲は 0-1 です

ブラシ選択されたデータ点のスタイルを定義します




### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=説明}
言語

グラフ言語設定。'zh-CN' と 'en-US' の2言語をサポートし、intl.setLocale('zh-CN') メソッドで言語を設定することもできます
:::
