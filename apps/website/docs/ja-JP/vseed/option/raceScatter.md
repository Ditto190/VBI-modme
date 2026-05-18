# RaceScatter

:::note{title=説明}
動的散布図 (Race Scatter Chart)

時間とともに変化するデータ分布を表示するのに適しており、データ点の位置で2つの指標値を表します

適用シーン:

\- 2次元空間におけるデータ分布の特徴を分析し、その時間変化を表示する場合

\- 複数の変数間の相関が時間とともに変化する様子を表示する場合

\- 2次元空間におけるデータ点の移動軌跡を観察する場合

:::

:::note{title=Note}
動的散布図:

\- X軸とY軸はいずれも数値軸（連続データ）で、複数の指標のマッピングをサポートします

\- プレイヤーで時間次元を制御し、データ変化を動的に表示できます

\- データ点の位置変化により、データの動的変化を直感的に表示します

:::


## chartType

**Type:** `"raceScatter"`

:::note{title=説明}
動的散布図。時間とともに変化するデータ分布を表示するのに適しています

:::


## dataset

**Type:** `Record[]`

:::note{title=説明}
データソース

:::

## dimensions

**Type:** `RaceScatterDimension[] | undefined`

:::note{title=説明}
次元。異なるデータ系列の区別と凡例表示に使用されます

:::


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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "player" | undefined`

:::note{title=説明}
レース散布図系チャートにおける次元マッピングチャネル

\- color: 複数の次元を色チャネルにマッピングできます

\- detail: 複数の次元を詳細チャネルにマッピングできます

\- tooltip: 複数の次元をツールチップチャネルにマッピングできます

\- label: 複数の次元をラベルチャネルにマッピングできます

\- row: 複数の次元を行チャネルにマッピングできます

\- column: 複数の次元を列チャネルにマッピングできます

\- player: 複数の次元をプレイヤーチャネルへマッピングできます

:::


## measures

**Type:** `ScatterMeasure[] | undefined`

:::note{title=説明}
メジャー。少なくとも2つのメジャーが必要で、それぞれX軸とY軸にマッピングされます。

:::

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

**Type:** `"xAxis" | "color" | "tooltip" | "label" | "yAxis" | "size" | undefined`

:::note{title=説明}
指標をマッピングするチャネル

\- xAxis: 指標がマッピングされるx軸

\- yAxis: 指標がマッピングされるy軸

\- size: 指標がマッピングされるサイズ

\- color: 指標がマッピングされる色

\- label: 指標がマッピングされるラベル

\- tooltip: 指標がマッピングされるツールチップ

:::

### parentId

**Type:** `string | undefined`

:::note{title=説明}
フラットな指標設定形式でツリー状の指標グループを構築します。parentId は親指標グループの id を指し、指標ツリーの構築に使用します

:::

:::tip{title=Tip}
measure ツリーの設定方法は2つあります。方法1は children で measure ツリーを直接設定する方法、方法2は parentId を持つフラットな measure リストを設定する方法です。この2つの方法は同時に使用できません

:::


## player

**Type:** `Player | undefined`

:::note{title=説明}
プレイヤー設定。時間次元を指定するための動的棒グラフの中核設定です



プレイヤー設定。再生するフィールド名を指定します。次元である必要があります

:::

:::warning{title=Warning}
この機能は table、pivotTable、dualAxis、histogram、boxPlot などのグラフタイプをサポートせず、指標組み合わせや行列ピボットを有効にした状態では使用できません

:::


### maxCount

**Type:** `number | false | undefined`

:::note{title=説明}
最大再生数。この数を超えるデータは切り捨てられます。false に設定すると制限しません

:::

### interval

**Type:** `number | undefined`

:::note{title=説明}
再生間隔、単位 ms

:::

### autoPlay

**Type:** `boolean | undefined`

:::note{title=説明}
自動再生するかどうか

:::

### loop

**Type:** `boolean | undefined`

:::note{title=説明}
ループ再生するかどうか

:::

### position

**Type:** `"left" | "top" | "right" | "bottom" | undefined`

:::note{title=説明}
プレイヤー位置

:::

### railColor

**Type:** `string | undefined`

:::note{title=説明}
プレイヤー進行バーのトラック色

:::

### fontFamily

**Type:** `string | undefined`

:::note{title=説明}
プレイヤーテキストのフォント

:::

### fontSize

**Type:** `number | undefined`

:::note{title=説明}
プレイヤーテキストのフォントサイズ

:::

### trackColor

**Type:** `string | undefined`

:::note{title=説明}
プレイヤー進行バーの進捗色

:::

### sliderHandleColor

**Type:** `string | undefined`

:::note{title=説明}
プレイヤー進行バーのスライダー色

:::

### sliderHandleBorderColor

**Type:** `string | undefined`

:::note{title=説明}
プレイヤー進行バーのスライダー枠線色

:::

### startButtonColor

**Type:** `string | undefined`

:::note{title=説明}
プレイヤー開始ボタンの色

:::

### pauseButtonColor

**Type:** `string | undefined`

:::note{title=説明}
プレイヤー一時停止ボタンの色

:::

### backwardButtonColor

**Type:** `string | undefined`

:::note{title=説明}
プレイヤー戻るボタンの色

:::

### forwardButtonColor

**Type:** `string | undefined`

:::note{title=説明}
プレイヤー進むボタンの色

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


## size

**Type:** `number | number[] | undefined`

:::note{title=説明}
散布図指標のサイズ。散布図のデータ点サイズまたはサイズ範囲を定義します

\- サイズ範囲が 10 のような数値の場合、データ点のサイズ範囲は 10 に固定されます

\- サイズ範囲が [10, 40] のような長さ2の配列の場合、データ点サイズは10から40の範囲になります

\- sizeRange と排他的で、優先度は size より低いです

:::


## sizeRange

**Type:** `number | number[] | undefined`

:::note{title=説明}
散布図指標のサイズ範囲。散布図のデータ点のサイズ範囲を定義します,

\- サイズ範囲が [10, 40] のような長さ2の配列の場合、データ点サイズは10から40の範囲になります

\- サイズ範囲が 10 のような数値の場合、データ点のサイズ範囲は 10 に固定されます

\- sizeRange と排他的で、優先度は size より高いです

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
ラベルのフォント色

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




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=説明}
ツールチップ

チャートのツールチップ設定。位置、フォーマット、スタイルなどを定義します。
:::


### enable

**Type:** `false | true`

:::note{title=説明}
ラベル機能を有効にするかどうか

:::

## brush

**Type:** `Brush | undefined`

:::note{title=説明}
チャートブラシ設定









:::


### enable

**Type:** `boolean | undefined`

:::note{title=説明}
brush選択を有効にするかどうか

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
ラベルを表示するかどうか
:::

#### lineColor

**Type:** `string | undefined`

:::note{title=説明}
軸線の色
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
枠線幅
:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=説明}
X軸の目盛
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルを表示するかどうか
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
ラベルを表示するかどうか
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
ラベルを表示するかどうか
:::

#### lineColor

**Type:** `string | undefined`

:::note{title=説明}
軸線の色
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
枠線幅
:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=説明}
X軸の目盛
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルを表示するかどうか
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
ラベルを表示するかどうか
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
軸を表示するかどうか
:::

### lineColor

**Type:** `string | undefined`

:::note{title=説明}
クロスヘア線の色

:::

### labelColor

**Type:** `string | undefined`

:::note{title=説明}
ラベルのフォント色

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=説明}
クロスヘア線のラベルを表示するかどうか

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
ラベルの背景色

:::

## theme

**Type:** `Theme | undefined`

:::note{title=説明}
テーマ設定

テーマ

組み込みテーマには light と dark の2種類があります。新しいテーマは registerTheme でカスタムテーマとして定義できます。

:::

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




## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=説明}
注釈点設定。選択したデータに基づいて、注釈点の位置、書式、スタイルなどを定義します。

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
"Highlight data items with sales greater than 1000"




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
線分スタイル

:::

**例**
`lineStyle: 'solid'`




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
"Highlight data items with sales greater than 1000"




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
線分スタイル

:::

**例**
`lineStyle: 'solid'`




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




## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=説明}
Language



チャートの言語設定。'zh\-CN' と 'en\-US' の 2 つの言語をサポートします。また intl.setLocale('zh\-CN') を呼び出して言語を設定できます

:::
