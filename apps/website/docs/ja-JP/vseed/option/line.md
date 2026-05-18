# Line

:::info{title=推奨}
\- 推奨フィールド構成: 指標 `1` 個、次元 `2` 個

\- データリシェイプをサポート: 少なくとも指標 `1` 個、次元 `0` 個

:::

:::info{title=エンコードマッピング}
折れ線グラフは次の視覚チャネルに対応しています:

`x`      : x 軸チャネル。`複数の次元`をサポートし、次元値を x 軸へマッピングします

`y`      : y 軸チャネル。`複数の指標`をサポートし、指標値を y 軸へマッピングします

`color`  : 色チャネル。`複数の次元`または`1 つの指標`をサポートします。次元の色はデータ系列の区別に、指標の色は指標値を図形色へ線形マッピングするために使用します

`tooltip`: ツールチップチャネル。`複数の次元`と`複数の指標`をサポートし、データ点にマウスホバーしたときに表示されます

`label`  : ラベルチャネル。`複数の次元`と`複数の指標`をサポートし、データ点上にデータラベルを表示します

:::

:::note{title=説明}
折れ線グラフ。線分でデータ点をつないでトレンド線を形成し、時間または順序付きカテゴリに沿ったデータの変化傾向を表示するのに適しています。

適用シーン:

\- 時系列データの変化傾向を表示

\- 複数データ系列のトレンドを比較

\- データの増加または減少パターンを分析

:::

:::warning{title=Warning}
データ要件:

\- 少なくとも 1 つの数値フィールド（指標）が必要です

\- 最初の次元は X 軸に配置され、残りの次元は複数の指標がある場合に指標名と結合され、凡例項目として表示されます

\- すべての指標は自動的に 1 つの指標へ統合されます

デフォルトで有効な機能:

\- 凡例、座標軸、データ点マーカー、ツールチップ、トレンド線はデフォルトで有効です

:::

## chartType

**Type:** `"line"`

:::note{title=説明}
折れ線グラフ。時間または順序付きカテゴリに沿ったデータの変化傾向を表示するのに適しています

:::

**例**
'line'




## dataset

**Type:** `Record[]`

:::note{title=説明}
データセット



TidyData 仕様に準拠した集計済みデータセットです。グラフのデータソースと構造を定義します。VSeed が自動的にデータをリシェイプするため、ユーザー入力を事前処理する必要はありません。面積グラフのデータは最終的に2つの次元と1つの指標へ変換されます。

:::

**例**
[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]




## dimensions

**Type:** `ColumnDimension[] | undefined`

:::note{title=説明}
次元



最初の次元はX軸にマッピングされ、残りの次元は複数指標が存在する場合に指標名と結合され、凡例項目として表示されます。

:::

**例**
[{ id: 'month', alias: 'Month' }, { id: 'year', alias: 'Year' }]




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

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=説明}
次元をマッピングするチャネル

\- xAxis: 複数次元をx軸にマッピングできます

\- color: 複数次元を色チャネルにマッピングできます

\- detail: 複数次元を詳細チャネルにマッピングできます

\- tooltip: 複数次元をツールチップチャネルにマッピングできます

\- label: 複数次元をラベルチャネルにマッピングできます

\- row: 複数次元を行チャネルにマッピングできます

\- column: 複数次元を列チャネルにマッピングできます

:::


## measures

**Type:** `ColumnMeasure[] | undefined`

:::note{title=説明}
指標



面積グラフの指標は自動的に1つの指標へ結合され、Y軸にマッピングされます。指標名は他の次元と結合され、凡例項目として表示されます。

:::

**例**
[{id: 'value', alias: 'Value'}]




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
\- 1234.5678 は 1235 に変換されます。fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 は 1234.6 に変換されます。fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 は 1234.57 に変換されます。fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 は 1230.568 に変換されます。fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 は 1234.5678 に変換されます。fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 は 1234.56780 に変換されます。fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの有効桁数。ブラウザの Intl.NumberFormat minimumSignificantDigits と maximumSignificantDigits を使用し、fractionDigits より優先度が高くなります

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
significantDigits と fractionDigits を同時に設定した場合の丸め優先度。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingPriority と同じ規則に従います

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
\- 1234.5678 は 1235 に変換されます。fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 は 1234.6 に変換されます。fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 は 1234.57 に変換されます。fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 は 1230.568 に変換されます。fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 は 1234.5678 に変換されます。fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 は 1234.56780 に変換されます。fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの有効桁数。ブラウザの Intl.NumberFormat minimumSignificantDigits と maximumSignificantDigits を使用し、fractionDigits より優先度が高くなります

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
significantDigits と fractionDigits を同時に設定した場合の丸め優先度。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingPriority と同じ規則に従います

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

**Type:** `"color" | "detail" | "tooltip" | "label" | "yAxis" | undefined`

:::note{title=説明}
指標をマッピングするチャネル

\- yAxis: 指標をy軸にマッピングします

\- detail: 指標を詳細チャネルにマッピングします

\- color: measure を色チャネルにマッピングします

\- label: measure を label チャネルにマッピングします

\- tooltip: measure を tooltip チャネルにマッピングします

:::

### parentId

**Type:** `string | undefined`

:::note{title=説明}
フラットな指標設定形式でツリー状の指標グループを構築します。parentId は親指標グループの id を指し、指標ツリーの構築に使用します

:::

:::tip{title=Tip}
measure ツリーの設定方法は2つあります。方法1は children で measure ツリーを直接設定する方法、方法2は parentId を持つフラットな measure リストを設定する方法です。この2つの方法は同時に使用できません

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
チャートの背景色



背景色は色文字列（例: 'red', 'blue'）、または hex、rgb、rgba 値（例: '#ff0000', 'rgba(255,0,0,0.5)'）を指定できます

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
ラベル



チャートのデータラベルを定義するラベル設定。位置、フォーマット、スタイルを含みます。

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
\- 1234.5678 は 1235 に変換されます。fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 は 1234.6 に変換されます。fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 は 1234.57 に変換されます。fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 は 1230.568 に変換されます。fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 は 1234.5678 に変換されます。fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 は 1234.56780 に変換されます。fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの有効桁数。ブラウザの Intl.NumberFormat minimumSignificantDigits と maximumSignificantDigits を使用し、fractionDigits より優先度が高くなります

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
significantDigits と fractionDigits を同時に設定した場合の丸め優先度。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingPriority と同じ規則に従います

:::

**例**
\- 1234.5678 は 1230 に変換されます。significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 は 1234.5678 に変換されます。significantDigits:3 (roundingPriority:morePrecision)



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
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=説明}
AI生成のJavaScriptフィルタリングコード



- 組み込みユーティリティ関数（_ または R からアクセス）のみ使用できます

- 入力パラメータ: data（配列）。各 item は行番号を表す __row_index フィールドを含みます

- 行インデックスとフィールドの組み合わせの配列を返す必要があります: Array<{ __row_index: number, field: string }>

- __row_index は元データ項目の行番号、field はハイライトするフィールドを表します

- 使用禁止: eval, Function, 非同期操作, DOM API, ネットワークリクエスト

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
凡例の境界線を有効にするかどうか。
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
凡例項目が多い場合の最大列数または行数





:::

:::warning{title=Warning}
離散凡例にのみ有効
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
ツールチップ

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

**Type:** `LineAreaAnimation | undefined`

:::note{title=説明}
アニメーション設定



チャートアニメーション設定。選択可能な効果はチャートタイプによって制約されます

:::


### enable

**Type:** `boolean | undefined`

:::note{title=説明}
折れ線/面積グラフのアニメーションを有効にするかどうか

:::

### params

**Type:** `LineAreaAnimationParams | undefined`

:::note{title=説明}
折れ線/面積グラフのアニメーションパラメーター

:::


#### appear

**Type:** `LineAreaAppearAnimation | undefined`

:::note{title=説明}
折れ線/面積グラフの出現アニメーション設定

:::


##### effects

**Type:** `("load" | "growth")[] | undefined`

:::note{title=説明}
折れ線/面積グラフの出現効果。ロードと成長アニメーションをサポートします

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

**Type:** `LineAreaUpdateAnimation | undefined`

:::note{title=説明}
折れ線/面積グラフの更新アニメーション設定

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=説明}
折れ線/面積グラフの更新効果。成長アニメーションをサポートします

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

**Type:** `LineAreaAnimationLoop | undefined`

:::note{title=説明}
折れ線/面積グラフのループアニメーション設定

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

**Type:** `LineAreaLoopAnimation | undefined`

:::note{title=説明}
折れ線/面積グラフのループアニメーション設定

:::


###### effects

**Type:** `LineAreaLoopEffect[] | undefined`

:::note{title=説明}
折れ線/面積グラフのループ効果

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
折れ線/面積グラフの雰囲気アニメーション設定

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

**Type:** `XBandAxis | undefined`

:::note{title=説明}
X軸



カテゴリ軸。位置、フォーマット、スタイル、関連設定を定義するX軸設定です。

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
軸ラベルの自動非表示。2つのラベルが重なる場合、重なりを引き起こすラベルを自動的に非表示にします。カテゴリ軸にのみ有効です。
:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=説明}
軸ラベルの自動非表示間隔。2つのテキストラベルの間隔が autoHideGap より小さい場合、重なりを引き起こすラベルを自動的に非表示にします。カテゴリ軸にのみ有効です。

autoHide が有効な場合は autoHide を使用し、autoHideSeparation で設定します。

autoHide が無効な場合は sampling を使用し、minGap で設定します。
:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=説明}
軸ラベルの自動回転。ラベル幅が軸の長さを超えると、ラベルを自動的に回転します。カテゴリ軸にのみ有効です。
:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=説明}
軸ラベルの自動回転角度範囲。カテゴリ軸にのみ有効です。
:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=説明}
軸ラベルの自動長さ制限。ラベル幅が軸の長さを超えると、超過部分を省略記号で表示し、ホバー時に完全なラベルを表示します。カテゴリ軸にのみ有効です。
:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=説明}
軸ラベルの自動長さ制限の最大長。ラベルテキストがこの長さを超えると、超過部分を省略記号で表示し、ホバー時に完全なラベルを表示します。カテゴリ軸にのみ有効です。
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
X軸アニメーション設定
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

**Type:** `YLinearAxis | undefined`

:::note{title=説明}
Y軸



数値軸。Y軸設定。Y軸の位置、書式、スタイルなどを定義します。

:::


### visible

**Type:** `boolean | undefined`

:::note{title=説明}
軸を表示するかどうか
:::

### min

**Type:** `number | undefined`

:::note{title=説明}
軸線 width

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=説明}
X 軸目盛り

:::

### log

**Type:** `boolean | undefined`

:::note{title=説明}
対数軸を使用するかどうか。数値軸にのみ有効です

:::

### logBase

**Type:** `number | undefined`

:::note{title=説明}
アニメーションのイージング関数。

:::

### nice

**Type:** `boolean | undefined`

:::note{title=説明}
Y軸（カテゴリ軸）設定。Y軸の位置、形式、スタイルなどを定義します。

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
\- 1234.5678 は 1235 に変換されます。fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 は 1234.6 に変換されます。fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 は 1234.57 に変換されます。fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 は 1230.568 に変換されます。fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 は 1234.5678 に変換されます。fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 は 1234.56780 に変換されます。fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの有効桁数。ブラウザの Intl.NumberFormat minimumSignificantDigits と maximumSignificantDigits を使用し、fractionDigits より優先度が高くなります

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
significantDigits と fractionDigits を同時に設定した場合の丸め優先度。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingPriority と同じ規則に従います

:::

**例**
\- 1234.5678 は 1230 に変換されます。significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 は 1234.5678 に変換されます。significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
数値フォーマットの丸めモード。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingMode と同じ規則に従います

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


## crosshairLine

**Type:** `CrosshairLine | undefined`

:::note{title=説明}
垂直ガイド線

マウスがグラフ上を移動するときに表示される垂直ガイド線。

クロスヘア線（ガイド線）をグラフに表示するための設定です。
:::


### visible

**Type:** `boolean | undefined`

:::note{title=説明}
クロスヘア線を表示するかどうか

:::

### lineColor

**Type:** `string | undefined`

:::note{title=説明}
クロスヘア線の色

:::

### labelColor

**Type:** `string | undefined`

:::note{title=説明}
クロスヘア線ラベルの色

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=説明}
クロスヘア線のラベルを表示するかどうか

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
クロスヘア線ラベルの背景色

:::


## sort

**Type:** `Sort | undefined`

:::note{title=説明}
X軸ソート設定。次元または指標によるソート、およびカスタムソート順をサポートします

カテゴリ軸ソート設定。次元または指標によるソート、およびカスタムソート順をサポートします
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
グラフのテーマ。テーマは優先度の低い機能設定で、すべてのグラフタイプに共通する設定と、単一カテゴリのグラフタイプで共通する設定を含みます。

組み込みテーマとして light と dark の 2 種類があり、Builder でカスタマイズできます。

テーマ

組み込みの light、dark テーマがあり、新しいテーマは registerTheme でカスタマイズできます。
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
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=説明}
AI生成のJavaScriptフィルタリングコード



- 組み込みユーティリティ関数（_ または R からアクセス）のみ使用できます

- 入力パラメータ: data（配列）。各 item は行番号を表す __row_index フィールドを含みます

- 行インデックスとフィールドの組み合わせの配列を返す必要があります: Array<{ __row_index: number, field: string }>

- __row_index は元データ項目の行番号、field はハイライトするフィールドを表します

- 使用禁止: eval, Function, 非同期操作, DOM API, ネットワークリクエスト

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
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=説明}
AI生成のJavaScriptフィルタリングコード



- 組み込みユーティリティ関数（_ または R からアクセス）のみ使用できます

- 入力パラメータ: data（配列）。各 item は行番号を表す __row_index フィールドを含みます

- 行インデックスとフィールドの組み合わせの配列を返す必要があります: Array<{ __row_index: number, field: string }>

- __row_index は元データ項目の行番号、field はハイライトするフィールドを表します

- 使用禁止: eval, Function, 非同期操作, DOM API, ネットワークリクエスト

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
注釈ポイントが属する measure id を指定します。複数 measure のシナリオでは、selector と組み合わせて対象 measure の注釈ポイントを一意に特定できます。
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
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=説明}
AI生成のJavaScriptフィルタリングコード



- 組み込みユーティリティ関数（_ または R からアクセス）のみ使用できます

- 入力パラメータ: data（配列）。各 item は行番号を表す __row_index フィールドを含みます

- 行インデックスとフィールドの組み合わせの配列を返す必要があります: Array<{ __row_index: number, field: string }>

- __row_index は元データ項目の行番号、field はハイライトするフィールドを表します

- 使用禁止: eval, Function, 非同期操作, DOM API, ネットワークリクエスト

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
'マークテキスト'



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
true



### offsetX

**Type:** `number | undefined`

:::note{title=説明}
注釈点全体のX方向のピクセルオフセットです。注釈点がグラフ左側（カテゴリ軸の開始点）にある場合は正の値、右側（カテゴリ軸の終了点）にある場合は負の値を推奨します。

負の値では全体が左へ移動します。たとえば -10 にすると、テキストと背景を含む注釈点コンポーネント全体が左へ10ピクセル移動します

正の値では全体が右へ移動します。たとえば 10 にすると、テキストと背景を含む注釈点コンポーネント全体が右へ10ピクセル移動します

:::

**例**
offsetX: 5, 注釈点全体を右へ5ピクセル移動
## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=説明}
次元値の注釈線。垂直方向に表示され、位置とスタイルを設定できます

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
"売上高が最も高い値をマークラインの参照として取得"

"マークライン用に平均売上高を計算"



#### code

**Type:** `string`

:::note{title=説明}
\- 入力パラメータ: data（配列）。各項目には行番号を表す __row_index フィールドが含まれます



\- __row_index は元データ項目の行番号を表します。field はハイライトするフィールドを表します






\- 禁止: eval、Function、非同期操作、DOM API、ネットワークリクエスト

:::

**例**

```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```


```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```


```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```


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
'マークテキスト'



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
数値注釈線です。平均線、最大値線、最小値線などを含みます。水平方向に表示され、位置とスタイルを設定できます。平均線など、数値に対応する注釈線を描画する場合に使用します。

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
"売上高が最も高い値をマークラインの参照として取得"

"マークライン用に平均売上高を計算"



#### code

**Type:** `string`

:::note{title=説明}
\- 入力パラメータ: data（配列）。各項目には行番号を表す __row_index フィールドが含まれます



\- __row_index は元データ項目の行番号を表します。field はハイライトするフィールドを表します






\- 禁止: eval、Function、非同期操作、DOM API、ネットワークリクエスト

:::

**例**

```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```


```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```


```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```


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
'マークテキスト'



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
注釈領域

選択したデータに基づいて、注釈領域の位置やスタイルを定義する設定です。
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
'マークテキスト'



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
'center' テキストはマークエリアの中央に配置されます



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=説明}








多項式回帰の次数

:::

**例**
'top' テキストはマークエリアの下側に配置されます



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
差分注釈線

選択した2つのデータ点に基づいて差分注釈線を描画し、差分テキストを自動計算します。
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
Language



チャートの言語設定。'zh\-CN' と 'en\-US' の 2 つの言語をサポートします。また intl.setLocale('zh\-CN') を呼び出して言語を設定できます

:::
