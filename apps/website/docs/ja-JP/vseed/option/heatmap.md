# Heatmap

:::info{title=推奨}
\- 推奨フィールド構成: `1`個の指標、`2`個の次元

\- データリシェイプをサポート: 少なくとも `1`個の指標、`0`個の次元

:::

:::info{title=エンコードマッピング}
ヒートマップは次の視覚チャネルに対応しています:

`xAxis`      : X軸チャネル、`複数の次元`をサポートし、次元値に基づいてX軸へマッピングします

`yAxis`      : Y軸チャネル、`複数の次元`をサポートし、次元値に基づいてY軸へマッピングします

`detail` : 詳細チャネル、`複数の次元`をサポートし、同じ色系列内でより細かい粒度のデータを表示するときに使用します

`color`  : 色チャネル、`1つの指標`をサポートし、指標値を色へマッピングします

`tooltip`: ツールチップチャネル、`複数の次元`と`複数の指標`をサポートし、データ点にマウスホバーしたときに表示されます

`label`  : ラベルチャネル、`複数の次元`と`複数の指標`をサポートし、データ点上にデータラベルを表示します

:::

:::note{title=説明}
ヒートマップ。二次元マトリクスの色の濃淡で、データの分布と強弱関係を表示します。

適用シーン:

\- 大規模な二次元データの密度と強度の表示

\- カテゴリと数値の関連分析

\- 時系列とカテゴリのクロス比較

:::

:::warning{title=Warning}
データ要件:

\- ヒートマップの行と列を決定するため、少なくとも2つの次元フィールドが必要です

\- 色の濃淡をマッピングするため、少なくとも1つの数値フィールド（指標）が必要です

\- 複数の指標に対応する場合、通常は1つの指標を選択して色へマッピングします

デフォルトで有効な機能:

\- 凡例、座標軸、データラベル、ツールチップ、数値スケーリングはデフォルトで有効です

:::


## chartType

**Type:** `"heatmap"`

:::note{title=説明}
ヒートマップ



ヒートマップ。二次元マトリクスの色の濃淡で、データの分布と強弱関係を表示します。

:::

**例**
'heatmap'




## dataset

**Type:** `Record[]`

:::note{title=説明}
データセット



TidyData仕様に準拠し、集計済みのデータセットで、チャートのデータソースと構造を定義します。ユーザーが入力するデータセットに追加処理は不要です。VSeedには強力なデータリシェイプ機能があり、自動でデータをリシェイプします。ヒートマップのデータは最終的に2つの次元と1つの指標へ変換されます。

:::

**例**
[{month:'1月', value:100}, {month:'2月', value:150}, {month:'3月', value:120}]




## dimensions

**Type:** `HeatmapDimension[] | undefined`

:::note{title=説明}
次元



ヒートマップでは、最初の次元が角度軸にマッピングされ、残りの次元は（複数の指標がある場合）指標名と結合され、凡例項目として表示されます。

:::

**例**
[{id: 'category', alias: 'カテゴリ'}]




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

**Type:** `"xAxis" | "tooltip" | "label" | "row" | "column" | "yAxis" | undefined`

:::note{title=説明}
次元をマッピングするチャネル

\- xAxis: 複数の次元をX軸にマッピングできます

\- yAxis: 複数の次元をY軸にマッピングできます

\- tooltip: 複数の次元をツールチップチャネルにマッピングできます

\- label: 複数の次元をラベルチャネルにマッピングできます

\- row: 複数の次元を行チャネルにマッピングできます

\- column: 複数の次元を列チャネルにマッピングできます

:::


## measures

**Type:** `HeatmapMeasure[] | undefined`

:::note{title=説明}
指標



ヒートマップの指標は自動的に 1 つの指標へ統合され、半径軸にマッピングされます。複数の指標がある場合、指標名は残りの次元と結合され、凡例項目として表示されます。

:::

**例**
[{id: 'value', alias: '数値'}]




### id

**Type:** `string`

:::note{title=説明}
指標ID。重複できません

:::

### alias

**Type:** `string | undefined`

:::note{title=説明}
指標の別名。重複可能です。未設定の場合、alias は id になります

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=説明}
数値の自動フォーマット。デフォルトで有効で、最優先です

autoFormat=true の場合、numFormat のすべての設定を上書きします

有効にすると、チャートのデータラベルとツールチップは指標値と言語環境に応じて適切なフォーマットを自動選択します

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
数値フォーマットのタイプ。number（10進数）、percent（%）、permille（‰）、scientific（科学表記）に対応します

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
数値フォーマットのタイプ。number（10進数）、percent（%）、permille（‰）、scientific（科学表記）に対応します

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの倍率。0にはできません

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
数値フォーマットの記号。例: %, ‰

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
数値フォーマットの桁区切り

:::

**例**
\- 1234.5678 は 1230 に変換されます。significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 は 1234.5678 に変換されます。significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
数値フォーマットのタイプ。number（10進数）、percent（%）、permille（‰）、scientific（科学表記）に対応します

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=説明}
数値フォーマットのタイプ。number（10進数）、percent（%）、permille（‰）、scientific（科学表記）に対応します

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
数値フォーマットのタイプ。number（10進数）、percent（%）、permille（‰）、scientific（科学表記）に対応します

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの倍率。0にはできません

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
数値フォーマットの記号。例: %, ‰

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
数値フォーマットの桁区切り

:::

**例**
\- 1234.5678 は 1230 に変換されます。significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 は 1234.5678 に変換されます。significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
数値フォーマットの接頭辞

:::

### encoding

**Type:** `"color" | "tooltip" | "label" | undefined`

:::note{title=説明}
指標をマッピングするチャネル

\- color: color チャネルにマッピングされる指標

\- label: label チャネルにマッピングされる指標

\- tooltip: tooltip チャネルにマッピングされる指標

:::

### parentId

**Type:** `string | undefined`

:::note{title=説明}
フラットな指標設定形式でツリー状の指標グループを構築します。parentId は親指標グループの id を指し、指標ツリーの構築に使います

:::

:::tip{title=ヒント}
指標ツリーの設定方法は2つあります。方法1は children を持つ指標ツリーを直接設定すること、方法2は parentId を持つフラットな指標リストを設定することです。この2つは同時に使用できません

:::


## page

**Type:** `Page | undefined`

:::note{title=説明}
ページネーション設定

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
チャート背景色



背景色は色名文字列（例: 'red', 'blue'）、または hex、rgb、rgba 値（例: '#ff0000', 'rgba(255,0,0,0.5)'）で指定できます

:::


## color

**Type:** `Color | undefined`

:::note{title=説明}
色



チャートの配色を定義する色設定。色リスト、色マッピング、カラーグラデーションを含みます。

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=説明}
チャート内の異なる要素の色を定義する離散カラースキーム

:::

**例**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=説明}
チャート内の異なる要素の色を定義する線形グラデーションカラースキーム

:::

**例**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=説明}
データ値を特定の色にマッピングする色マッピング

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
ヒートマップのラベル設定。チャートのデータラベルを定義し、ラベルの反転色を自動的に有効化して可読性を確保します。

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

複数指標のシーンでは値の衝突を心配する必要はありません。描画に関連するすべての指標は `foldMeasures` 処理を通り、単一データ点を表す1つの指標にマージされます

注意: encoding の label は優先度が高いため、この設定は encoding の label には影響しません

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルに指標値の割合を表示するかどうか

複数指標のシーンでは値の衝突を心配する必要はありません。描画に関連するすべての指標は `foldMeasures` 処理を通り、単一データ点を表す1つの指標にマージされます

注意: encoding の label は優先度が高いため、この設定は encoding の label には影響しません

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルに次元ラベルを表示するかどうか

すべての次元ラベルを表示します

注意: encoding の label は優先度が高いため、この設定は encoding の label には影響しません

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
数値フォーマットのタイプ。number（10進数）、percent（%）、permille（‰）、scientific（科学表記）に対応します

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
数値フォーマットの倍率。0にはできません

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
数値フォーマットの記号。例: %, ‰

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
数値フォーマットの桁区切り

:::

**例**
\- 1234.5678 は 1230 に変換されます。significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 は 1234.5678 に変換されます。significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
数値フォーマットの接頭辞

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=説明}
  orderBy: 'profit',

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=説明}
significantDigits と fractionDigits の両方が設定された場合の数値フォーマットの丸め優先度。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingPriority と同じ規則に従います

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
ラベルの背景色

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=説明}
ラベルの枠線色

:::

### labelColor

**Type:** `string | undefined`

:::note{title=説明}
ラベルのフォント色

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=説明}
要素の色に基づいてフォント色を自動反転するかどうか

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
ラベルフィルタリング。セレクタ間のデフォルト関係は Or です

:::


#### field

**Type:** `string`

:::note{title=説明}
return _.flatten(

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
テキストの垂直揃え。通常は 'top' に設定し、テキストを注釈点の下側に表示して、チャートの可視領域内に収めます。

const profitRate = item.profit / item.sales;

});

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
テキストの垂直揃え。通常は 'top' に設定し、テキストを注釈点の下側に表示して、チャートの可視領域内に収めます。

const profitRate = item.profit / item.sales;

});

4

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
次元フィールドの値を選択します。配列をサポートします
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=説明}
アニメーションフィルタ（AI生成コード実行）



AI生成の JavaScript コードで複雑なデータフィルタリングロジックを実装します



主な機能:

\- 任意の複雑なデータフィルタリング条件に対応します

\- データ操作用の組み込みユーティリティ関数を使用します

\- ブラウザ環境（Web Worker サンドボックス）で安全に実行します



環境要件: ブラウザ環境のみ対応します。Node.js 環境ではフォールバックを使用します



注意: selector と dynamicFilter は同時に使用できません。dynamicFilter の優先度が高くなります



チャートのアニメーションフィルタ設定



AI生成の JavaScript コードでチャートマーカー（棒、点など）のフィルタリングを実装します

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=説明}
Background padding

:::

**例**
\- Supports any complex data filtering conditions

\- Uses built-in utility functions for data operations



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
sales が1000を超えるデータ項目の sales フィールドをハイライトします
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

各地域で利益率が最も高いデータ項目をハイライトします
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

複数条件でフィルターされたデータ項目をハイライトします
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
field: 'sales'

:::


##### field

**Type:** `string`

:::note{title=説明}
return _.flatten(

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
テキストの垂直揃え。通常は 'top' に設定し、テキストを注釈点の下側に表示して、チャートの可視領域内に収めます。

const profitRate = item.profit / item.sales;

});

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
テキストの垂直揃え。通常は 'top' に設定し、テキストを注釈点の下側に表示して、チャートの可視領域内に収めます。

const profitRate = item.profit / item.sales;

});

4

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
次元フィールドの値を選択します。配列をサポートします
:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=説明}
動的フィルター実行結果（ランタイムフィールド）

prepare() フェーズで書き込まれ、実行時は読み取り専用です
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
legend



ヒートマップの色凡例設定。凡例の位置、フォーマット、スタイルなどを定義します。

:::


### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=説明}
凡例の位置

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
legend font color

:::

### labelFontColor

**Type:** `string | undefined`

:::note{title=説明}
legend font color

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
legend font color

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
ツールチップ



ヒートマップのツールチップ設定。ツールチップの位置、フォーマット、スタイルなどを定義します。

:::


### enable

**Type:** `false | true`

:::note{title=説明}
チャートのツールチップ設定。位置、フォーマット、スタイルなどを定義します。

:::


## brush

**Type:** `Brush | undefined`

:::note{title=説明}
ツールチップ機能を有効にするかどうか



ブラシ選択枠の形状と選択方向を定義します



\- `polygon`: 多角形選択。複数の点をクリックして任意の多角形を描画して選択できます

:::


### enable

**Type:** `boolean | undefined`

:::note{title=説明}
ブラシ選択モード: 単一または複数

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=説明}
選択されたデータ点のスタイルを定義します。



brushtype

不透明度

選択されたデータ点の不透明度。範囲は 0-1 です

\- `polygon`: 多角形ブラシ選択。複数の点をクリックして任意の多角形を描画して選択します

\- `x`: X軸方向のみのブラシ選択。Y軸方向は制限されません

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=説明}
\- `y`: Y軸方向のみのブラシ選択。X軸方向は制限されません



選択されたデータ点の不透明度。範囲は 0-1 です

未選択データ項目のスタイル

選択されたブラシ範囲外のデータ点のスタイルを定義します

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=説明}
\- `multiple`: 複数選択モード。複数のブラシ範囲を同時に存在させることができます

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=説明}
ブラシ選択終了後に選択範囲をクリアするかどうか



未選択データ点の不透明度。範囲は 0-1 です

:::


#### opacity

**Type:** `number | undefined`

:::note{title=説明}
ブラシ選択されたデータ点のスタイルを定義します



未選択データ項目のスタイル

:::

#### stroke

**Type:** `string | undefined`

:::note{title=説明}
ブラシ選択範囲外のデータ点の不透明度。範囲は 0-1 です

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
ブラシ選択範囲外のデータ点の不透明度。範囲は 0-1 です

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=説明}
枠線幅



X軸、カテゴリ軸、X軸設定。チャートのX軸を定義し、位置、フォーマット、スタイルなどを含みます。

:::


#### opacity

**Type:** `number | undefined`

:::note{title=説明}
ブラシ選択外のデータ点のスタイルを定義します



未選択データ項目のスタイル

:::

#### stroke

**Type:** `string | undefined`

:::note{title=説明}
カテゴリ軸（X軸）設定。チャートのX軸を定義し、位置、フォーマット、スタイルなどを含みます。

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
カテゴリ軸（X軸）設定。チャートのX軸を定義し、位置、フォーマット、スタイルなどを含みます。

:::


## theme

**Type:** `Theme | undefined`

:::note{title=説明}
チャートのテーマ。テーマは優先度の低い機能設定で、すべてのチャートタイプで共通する汎用設定と、単一チャートタイプで共通するチャート設定を含みます。



組み込みのライトテーマとダークテーマ。ユーザーは Builder でテーマをカスタマイズできます。



テーマ



組み込みのライトテーマとダークテーマ。registerTheme で新しいテーマをカスタマイズできます。

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



チャートの言語設定。'zh-CN' と 'en-US' に対応します。intl.setLocale('zh-CN') を呼び出して言語を設定することもできます。

:::
