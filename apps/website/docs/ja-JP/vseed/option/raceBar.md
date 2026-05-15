# RaceBar

:::note{title=説明}
動的棒グラフ (Race Bar Chart)

時間の経過に伴うデータ順位の変化を表示するのに適しています

:::


## chartType

**Type:** `"raceBar"`

:::note{title=説明}
動的棒グラフ。時間の経過に伴うデータ順位の変化を表示するのに適しています

:::


## dataset

**Type:** `Record[]`

:::note{title=説明}
データソース

:::


## dimensions

**Type:** `RaceBarDimension[] | undefined`

:::note{title=説明}
最初のディメンションはX軸にマッピングされ、残りのディメンションはメジャー名（複数メジャーがある場合）と結合されて凡例項目として表示されます。

:::


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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "yAxis" | "player" | undefined`

:::note{title=説明}
ディメンションをマッピングするチャネル

\- player: 複数のディメンションを再生チャネルへマッピングできます

\- yAxis: 複数ディメンションをY軸にマッピングできます

\- color: 複数ディメンションを色チャネルにマッピングできます

\- detail: 複数ディメンションを詳細チャネルにマッピングできます

\- tooltip: 複数ディメンションをツールチップチャネルにマッピングできます

\- label: 複数ディメンションをラベルチャネルにマッピングできます

\- row: 複数ディメンションを行チャネルにマッピングできます

\- column: 複数ディメンションを列チャネルにマッピングできます

:::


## measures

**Type:** `RaceBarMeasure[] | undefined`

:::note{title=説明}
メジャー

:::


### id

**Type:** `string`

:::note{title=説明}
メジャー ID。重複できません

:::

### alias

**Type:** `string | undefined`

:::note{title=説明}
メジャーのエイリアス。重複可能。未設定の場合、エイリアスは ID になります

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=説明}
数値の自動フォーマット。デフォルトで有効で、優先度が最も高いです

autoFormat=true の場合、すべての numFormat 設定を上書きします。

有効にすると、チャートのデータラベルとツールチップはメジャー値とロケールに基づいて適切なフォーマットを自動選択します。

フォーマット規則: 10進数、コンパクト表記を有効化、小数桁は最小 0 桁・最大 2 桁、自動丸め、ブラウザの Intl.NumberFormat 実装を使用します。

例:

\- locale=zh-CN: 749740.264 → 74.45~74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=説明}
メジャー用のカスタム数値フォーマット。ラベルとツールチップに自動適用されます。

注意: カスタムフォーマットを使用するには autoFormat を明示的に false に設定する必要があります。そうしない場合、autoFormat がこの設定を上書きします。

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=説明}
数値フォーマットタイプ。decimal、percent (%)、permille (‰)、科学的記数法をサポートします

:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの比率。0 にはできません

:::

**例**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマット記号。例: %, ‰

:::

**例**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=説明}
数値フォーマット用の桁区切り

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
数値フォーマットの小数桁数。ブラウザの Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用し、significantDigits より優先度は低くなります。

:::

**例**
\- 1234.5678 converted to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの有効桁数。ブラウザの Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用し、fractionDigits より優先度は高くなります。

:::

**例**
\- 1234.5678 converted to 1000, significantDigits:1
\- 1234.5678 converted to 1200, significantDigits:2
\- 1234.5678 converted to 1230, significantDigits:3
\- 1234.5678 converted to 1234, significantDigits:4
\- 1234.5678 converted to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=説明}
significantDigits と fractionDigits の両方を設定した場合の丸め優先度。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingPriority と同じ規則に従います。

:::

**例**
\- 1234.5678 converted to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converted to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



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
数値フォーマットタイプ。decimal、percent (%)、permille (‰)、科学的記数法をサポートします

:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの比率。0 にはできません

:::

**例**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマット記号。例: %, ‰

:::

**例**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=説明}
数値フォーマット用の桁区切り

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
数値フォーマットの小数桁数。ブラウザの Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用し、significantDigits より優先度は低くなります。

:::

**例**
\- 1234.5678 converted to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの有効桁数。ブラウザの Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用し、fractionDigits より優先度は高くなります。

:::

**例**
\- 1234.5678 converted to 1000, significantDigits:1
\- 1234.5678 converted to 1200, significantDigits:2
\- 1234.5678 converted to 1230, significantDigits:3
\- 1234.5678 converted to 1234, significantDigits:4
\- 1234.5678 converted to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=説明}
significantDigits と fractionDigits の両方を設定した場合の丸め優先度。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingPriority と同じ規則に従います。

:::

**例**
\- 1234.5678 converted to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converted to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
数値フォーマットの丸めモード。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingMode と同じ規則に従います。

:::

### encoding

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | undefined`

:::note{title=説明}
メジャーをマッピングするチャネル

\- xAxis: Measure mapped to the X-axis

\- detail: Measure mapped to the detail channel

\- color: Measure mapped to the color channel

\- label: Measure mapped to the label channel

\- tooltip: Measure mapped to the tooltip channel

:::

### parentId

**Type:** `string | undefined`

:::note{title=説明}
フラットなメジャー設定形式でツリー状のメジャーグループを構築します。parentId は親メジャーグループの ID を指し、メジャーツリーの構築に使用されます。

:::

:::tip{title=Tip}
メジャーツリーの設定方法は 2 つあります。方式 1 は children でメジャーツリーを直接設定する方法、方式 2 は parentId を持つフラットなメジャーリストを設定する方法です。この 2 つの方法は同時に使用できません。

:::


## player

**Type:** `Player | undefined`

:::note{title=説明}
プレイヤー設定。時間ディメンションを指定するための動的棒グラフの中核設定です



プレイヤー設定。再生するフィールド名を指定します。ディメンションである必要があります

:::

:::warning{title=Warning}
この機能は table、pivotTable、dualAxis、histogram、boxPlot などのグラフタイプをサポートせず、メジャー組み合わせや行列ピボットを有効にした状態では使用できません

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
ソート設定。動的棒グラフでは通常、値に基づく動的ソートが必要です





:::

**例**
注意: selector と dynamicFilter は同時に使用できません。dynamicFilter の方が優先度が高くなります。

チャートの動的フィルタ設定。





### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=説明}

:::

**例**
ユーザーのフィルタリング要件説明（自然言語）。



### orderBy

**Type:** `string | undefined`

:::note{title=説明}


:::

**例**





### customOrder

**Type:** `string[] | undefined`

:::note{title=説明}
\- `__row_index` は元データ項目の行番号を表し、`field` は強調表示するフィールドを表します。

:::


## page

**Type:** `Page | undefined`

:::note{title=説明}


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
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=説明}
背景色

:::


## color

**Type:** `Color | undefined`

:::note{title=説明}
色設定

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

**Type:** `Label | undefined`

:::note{title=説明}
ラベル設定

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

注意: encoding の label の方が優先度が高いため、この設定は encoding の label に影響しません。

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルにメジャー値をパーセントで表示するかどうか。

複数メジャーのシナリオでは、すべての描画関連メジャーが `foldMeasures` 処理を経て、単一のデータポイントを表す1つのメジャーに統合されるため、値の競合を心配する必要はありません。

注意: encoding の label の方が優先度が高いため、この設定は encoding の label に影響しません。

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルにディメンションラベルを表示するかどうか。

すべてのディメンションラベルを表示します。

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
数値フォーマットタイプ。decimal、percent (%)、permille (‰)、科学的記数法をサポートします。

:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの倍率。0 にはできません。

:::

**例**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマット記号。例: %, ‰

:::

**例**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=説明}
数値フォーマット用の桁区切り。

:::

#### suffix

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマットの接尾辞。

:::

#### prefix

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマットの接頭辞。

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの小数桁数。ブラウザの Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用し、significantDigits より優先度は低くなります。

:::

**例**
\- 1234.5678 converted to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの有効桁数。ブラウザの Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用し、fractionDigits より優先度は高くなります。

:::

**例**
\- 1234.5678 converted to 1000, significantDigits:1
\- 1234.5678 converted to 1200, significantDigits:2
\- 1234.5678 converted to 1230, significantDigits:3
\- 1234.5678 converted to 1234, significantDigits:4
\- 1234.5678 converted to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=説明}
significantDigits と fractionDigits の両方を設定した場合の丸め優先度。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingPriority と同じ規則に従います。

:::

**例**
\- 1234.5678 converted to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converted to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
数値フォーマットの丸めモード。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingMode と同じ規則に従います。

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
ディメンションフィールド。dimensions 内の項目 ID。

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

\- in: ディメンションフィールド値が値リストに含まれるデータ項目を選択します。

\- not in: ディメンションフィールド値が値リストに含まれないデータ項目を選択します。

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

\- in: ディメンションフィールド値が値リストに含まれるデータ項目を選択します。

\- not in: ディメンションフィールド値が値リストに含まれないデータ項目を選択します。

operator と同じ。

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
選択されたディメンションフィールド値。配列をサポートします。

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=説明}
動的フィルタ (AI 生成コード実行)



AI 生成の JavaScript コードで複雑なデータフィルタリングロジックを実装します。



主な機能:

\- 任意に複雑なデータフィルタ条件をサポートします。

\- データ操作には組み込みユーティリティ関数を使用します。

\- ブラウザ環境 (Web Worker サンドボックス) で安全に実行します。



環境要件: ブラウザ環境のみサポートします。Node.js 環境ではフォールバックを使用します。



注意: selector と dynamicFilter は同時に使用できません。dynamicFilter の方が優先度が高くなります。



チャートの動的フィルタ設定。



AI が生成した JavaScript コードでチャートマーカー (棒、点など) をフィルタします。

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=説明}
ユーザーのフィルタリング要件説明（自然言語）。

:::

**例**
"売上高が1000を超えるバーを強調表示"

"各地域で利益率が最も高いバーを強調表示"



#### code

**Type:** `string`

:::note{title=説明}
AI 生成の JavaScript フィルタリングコード。



\- 組み込みユーティリティ関数のみを使用します (_ または R でアクセス)。

\- 入力パラメータ: data (配列)。各項目には行番号を表す `__row_index` フィールドが含まれます。

\- 行インデックスとフィールドの組み合わせ配列 `Array<{ __row_index: number, field: string }>` を返す必要があります。

\- `__row_index` は元データ項目の行番号を表し、`field` は強調表示するフィールドを表します。

\- 禁止事項: eval、Function、非同期処理、DOM API、ネットワークリクエスト。

:::

**例**
Highlight the `sales` field of data items where sales are greater than 1000:
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight the data item with the highest profit margin in each region:
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

Highlight data items based on multiple filtering conditions:
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
コード実行に失敗した場合、または環境がサポートされない場合のフォールバック戦略。

:::


##### field

**Type:** `string`

:::note{title=説明}
ディメンションフィールド。dimensions 内の項目 ID。

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

\- in: ディメンションフィールド値が値リストに含まれるデータ項目を選択します。

\- not in: ディメンションフィールド値が値リストに含まれないデータ項目を選択します。

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

\- in: ディメンションフィールド値が値リストに含まれるデータ項目を選択します。

\- not in: ディメンションフィールド値が値リストに含まれないデータ項目を選択します。

operator と同じ。

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
選択されたディメンションフィールド値。配列をサポートします。

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=説明}
動的フィルタの実行結果 (ランタイムフィールド)。



prepare() フェーズで書き込まれ、実行時は読み取り専用です。

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
凡例設定

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
凡例フォントの太さ



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




### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=説明}
凡例の形状タイプ。

:::

:::warning{title=Warning}
離散凡例にのみ適用されます。

:::

**例**
ブラシ



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=説明}
凡例位置

:::

**例**




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
ブラシ mode; defines whether single or multiple areas can be selected.




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=説明}
ツールチップ設定

:::


### enable

**Type:** `false | true`

:::note{title=説明}


:::


## brush

**Type:** `Brush | undefined`

:::note{title=説明}
ブラシ選択設定



\- `y`: Y 軸ブラシ。Y 軸方向のみ選択し、X 軸方向は制限されません。

:::


### enable

**Type:** `boolean | undefined`

:::note{title=説明}


:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=説明}












:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=説明}








:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=説明}


:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=説明}






:::


#### opacity

**Type:** `number | undefined`

:::note{title=説明}
ブラシで選択されていないデータのスタイル。



選択範囲外のデータポイントのスタイルを定義します。

:::

#### stroke

**Type:** `string | undefined`

:::note{title=説明}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=説明}


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


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=説明}

:::


## xAxis

**Type:** `XLinearAxis | undefined`

:::note{title=説明}
X軸設定。数値軸で、メジャー値を表示します

:::


### visible

**Type:** `boolean | undefined`

:::note{title=説明}
軸線 color

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
軸を表示するかどうか。

:::

### zero

**Type:** `boolean | undefined`

:::note{title=説明}


:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=説明}


:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=説明}


:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=説明}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマット比率。0 にはできません

:::

**例**
自動回転が有効な場合の角度範囲（カテゴリ軸でのみ有効）。




#### symbol

**Type:** `string | undefined`

:::note{title=説明}


:::

**例**

ラベル制限の最大長。テキスト長がこの値を超えると、省略記号で切り詰められ、ホバー時に表示されます（カテゴリ軸でのみ有効）。



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=説明}

:::

#### suffix

**Type:** `string | undefined`

:::note{title=説明}

:::

#### prefix

**Type:** `string | undefined`

:::note{title=説明}

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=説明}

:::

**例**
ラベル font weight


\- 1234.5678 は 1230.568 に変換されます, fractionDigits:3 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}

:::

**例**





\- 1234.5678 は 1234.5678 に変換されます, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=説明}


:::

**例**

軸線 width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
数値フォーマットの丸めモード。ブラウザ提供の Intl.NumberFormat でフォーマットし、ルールは Intl.NumberFormat の roundingMode と同じです

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=説明}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}


:::

#### labelColor

**Type:** `string | undefined`

:::note{title=説明}


:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=説明}

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=説明}

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=説明}


:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=説明}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}


:::

#### lineColor

**Type:** `string | undefined`

:::note{title=説明}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=説明}


:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=説明}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}


:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=説明}


:::

#### tickColor

**Type:** `string | undefined`

:::note{title=説明}


:::

#### tickSize

**Type:** `number | undefined`

:::note{title=説明}
\- 1234.5678 は 1234.5678 に変換, fractionDigits:4 (roundingMode:halfCeil)

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=説明}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}


:::

#### titleText

**Type:** `string | undefined`

:::note{title=説明}


:::

#### titleColor

**Type:** `string | undefined`

:::note{title=説明}

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=説明}


:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=説明}
X軸目盛りラベル

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=説明}


:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=説明}

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=説明}

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=説明}

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=説明}

:::


#### duration

**Type:** `number | undefined`

:::note{title=説明}


:::

#### easing

**Type:** `string | undefined`

:::note{title=説明}


:::


## yAxis

**Type:** `YBandAxis | undefined`

:::note{title=説明}
Y軸設定。カテゴリ軸で、ディメンション値を表示し、バーは縦方向に配置されます

:::


### visible

**Type:** `boolean | undefined`

:::note{title=説明}

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=説明}
sortLegend: {

:::

### zero

**Type:** `boolean | undefined`

:::note{title=説明}


:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=説明}


:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=説明}






:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=説明}

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=説明}
'dark'

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=説明}


:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=説明}


:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=説明}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}


:::

#### labelColor

**Type:** `string | undefined`

:::note{title=説明}
value: 'tool'

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=説明}


:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=説明}
矩形の最大高さ。ピクセル値またはパーセント文字列を指定できます。

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=説明}


:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=説明}
**例**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=説明}

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=説明}


:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=説明}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}


:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=説明}


:::

#### tickColor

**Type:** `string | undefined`

:::note{title=説明}
凡例ソート設定。ディメンションまたはメジャーに基づくソート、およびカスタムソート順をサポートします。sort 配列は左から右、または上から下の順序に従います。

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=説明}
sortLegend: {

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=説明}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}


:::

#### titleText

**Type:** `string | undefined`

:::note{title=説明}

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


:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=説明}
- not in: ディメンションフィールド値が `value` 配列内にないデータ項目を選択します。

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=説明}
グローバルスタイルまたは条件付きスタイル設定をサポートします。

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=説明}


:::


#### duration

**Type:** `number | undefined`

:::note{title=説明}

:::

#### easing

**Type:** `string | undefined`

:::note{title=説明}


:::


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title=説明}
水平ツールチップ設定



selector = {

:::


### visible

**Type:** `boolean | undefined`

:::note{title=説明}


:::

### rectColor

**Type:** `string | undefined`

:::note{title=説明}
operator: 'between'

:::

### labelColor

**Type:** `string | undefined`

:::note{title=説明}

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=説明}

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
solid

:::


## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title=説明}
積み上げ角丸

:::


## barMaxWidth

**Type:** `string | number | undefined`

:::note{title=説明}
矩形の最大高さ

:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=説明}
凡例ソート設定



チャート動的フィルタ設定: AI生成のJavaScriptコードでチャートマーク（棒、ポイントなど）をフィルタします。

:::

**例**
);


Highlight data items based on multiple filtering conditions:




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=説明}
])

:::

**例**




### orderBy

**Type:** `string | undefined`

:::note{title=説明}


:::

**例**

  __row_index: item.__row_index,



### customOrder

**Type:** `string[] | undefined`

:::note{title=説明}
  _.maxBy(group, item => item.profit / item.sales)

:::


## theme

**Type:** `Theme | undefined`

:::note{title=説明}
演算子



\- not in: ディメンションフィールド値が値リストに含まれないデータ項目を選択します。

:::


### length

**Type:** `number`

### brand

**Type:** `brand`


## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title=説明}
棒グラフスタイル設定

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=説明}
- not in: ディメンションフィールド値が `value` 配列内にないデータ項目を選択します。






:::

**例**
棒プリミティブ (矩形) のストローク色




動的フィルタ実行結果（ランタイムフィールド）



field: 'category',
operator: 'in',
value: 'tool'
}
field: 'category',
operator: 'not in',
value: 'book'
}


field: 'profit',
operator: '>=',
value: 100
}
field: 'profit',
operator: 'between'
value: [100, 300]
}




#### field

**Type:** `string`

:::note{title=説明}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}






:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}






:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
注釈ポイント用セレクタ。データポイントを選択するために使用します。

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=説明}
- center: テキストはポイント上で中央揃えになります。









演算子

\- in: ディメンションフィールド値が値リストに含まれるデータ項目を選択します。

\- not in: ディメンションフィールド値が値リストに含まれないデータ項目を選択します。


















:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=説明}


:::

**例**
"売上高が1000を超えるバーを強調表示"

"各地域で利益率が最も高いバーを強調表示"



#### code

**Type:** `string`

:::note{title=説明}













:::

**例**

```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

"Highlight the bar with the highest profit margin in each region"
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
const grouped = _.groupBy(data, 'area');

:::


##### field

**Type:** `string`

:::note{title=説明}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
_.map(filtered, item => [

{ __row_index: item.__row_index, field: 'sales' }

);

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
垂直注釈線の固定X値。カテゴリ軸がX方向の場合はディメンション値を入力でき、数値軸がX方向の場合は具体的な数値を使用できます。






:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
ブラウザ環境でのみサポートされます（Web Worker が必要）。

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=説明}
\- not in: ディメンションフィールド値が値リストに含まれないデータ項目を選択します。



\- in: ディメンションフィールドの値が value に含まれるデータ項目を選択します

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


:::

### barColor

**Type:** `string | undefined`

:::note{title=説明}
prepare() フェーズで書き込まれ、実行時は読み取り専用です。

:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title=説明}
const avgSales = _.meanBy(data, 'sales');

:::

### barBorderColor

**Type:** `string | undefined`

:::note{title=説明}


:::

### barBorderWidth

**Type:** `number | undefined`

:::note{title=説明}
'注釈テキスト'

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=説明}
テキスト色。

:::

**例**
'red'







### barBorderOpacity

**Type:** `number | undefined`

:::note{title=説明}
**例**





:::

**例**
注釈テキスト。

[0, 0, 10, 10]



### barRadius

**Type:** `number | number[] | undefined`


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=説明}
マークポイント設定

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=説明}


:::


#### field

**Type:** `string`

:::note{title=説明}

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
bottom: テキストは注釈ポイントの上に配置され、下端がポイントに揃います。

テキストがチャートの表示領域内で完全に表示されるように 'top' に設定することを推奨します。

**例**

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}






true

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
背景色。

:::

### measureId

**Type:** `string | undefined`

:::note{title=説明}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=説明}
**例**









背景の枠線幅。

線の表示可否。

**例**









背景枠線の角丸半径。



**例**





:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=説明}


:::

**例**
"売上高が1000を超えるバーを強調表示"

"各地域で利益率が最も高いバーを強調表示"



#### code

**Type:** `string`

:::note{title=説明}








注釈ポイントの水平オフセット (ピクセル)。ポイントが左側 (カテゴリ軸の開始位置) にある場合は正の値、右側 (カテゴリ軸の終了位置) にある場合は負の値を推奨します。

負の値はコンポーネント全体を左に移動します (例: -10)。

正の値はコンポーネント全体を右に移動します (例: 10)。

:::

**例**
offsetX: 5 (コンポーネント全体が 5 ピクセル右に移動)
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```


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


:::


##### field

**Type:** `string`

:::note{title=説明}
"最高売上値を注釈線の参照値として取得"

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}


AI 生成の JavaScript フィルタリングコード。

\- 組み込みユーティリティ関数のみを使用します (_ または R でアクセス)。

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}




最大売上値を注釈線の値として取得します:

const maxSales = _.maxBy(data, 'sales')?.sales;

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=説明}
ユーザーのフィルタリング要件説明（自然言語）。



);

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
prepare() フェーズで書き込まれ、実行時は読み取り専用です。

:::

**例**
'マークテキスト'



### textColor

**Type:** `string | undefined`

:::note{title=説明}


:::

**例**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=説明}


:::

**例**




### textFontWeight

**Type:** `number | undefined`

:::note{title=説明}


:::

**例**




### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=説明}




テキストのフォントサイズ。


**例**

:::

**例**
'right' テキストはマークポイントの左側に配置されます



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=説明}
**例**









:::

**例**
'top' テキストはマークポイントの下側に配置されます



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=説明}
**例**

:::

**例**




### textBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
top: テキストは参照線の下に配置され、上端が (垂直) 注釈線の端に揃います。

:::

**例**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=説明}


:::

**例**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=説明}


:::

**例**




### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=説明}


:::

**例**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=説明}


:::

**例**




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
背景色。


**例**

:::

**例**
2




## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=説明}
数値マークライン

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=説明}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=説明}




背景枠線の角丸半径。

線の表示可否。





:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=説明}


:::

**例**
"売上高が最も高い値をマークラインの参照として取得"

"マークライン用に平均売上高を計算"



#### code

**Type:** `string`

:::note{title=説明}











動的フィルタ (AI 生成コード実行)

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

**例**
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
\- 入力パラメータ: data (配列)。

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=説明}




const maxSales = _.maxBy(data, 'sales')?.sales;

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=説明}


:::

**例**
'マークテキスト'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=説明}
選択されたディメンションフィールド値。配列をサポートします。

:::

**例**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=説明}
'注釈テキスト'

:::

**例**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=説明}


:::

**例**




### textFontWeight

**Type:** `number | undefined`

:::note{title=説明}


:::

**例**




### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=説明}




テキスト色。


**例**

:::

**例**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=説明}
**例**









:::

**例**
'top'



### lineVisible

**Type:** `boolean | undefined`

:::note{title=説明}


:::

**例**




### lineColor

**Type:** `string | undefined`

:::note{title=説明}
**例**

:::

**例**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
top: テキストは参照線の下に配置され、上端が (水平) 注釈線に揃います。

:::

**例**




### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=説明}


:::

**例**
'solid'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=説明}


:::

**例**




### textBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}


:::

**例**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=説明}


:::

**例**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=説明}


:::

**例**




### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=説明}


:::

**例**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=説明}


:::

**例**





## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=説明}
ディメンション値マークライン

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=説明}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=説明}
**例**











:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=説明}


:::

**例**
"売上高が最も高い値をマークラインの参照として取得"

"マークライン用に平均売上高を計算"



#### code

**Type:** `string`

:::note{title=説明}
演算子



\- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します







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


:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=説明}
\- not in: ディメンションフィールド値が値リストに含まれないデータ項目を選択します。



テキスト色

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=説明}
**例**

:::

**例**
'マークテキスト'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=説明}
**例**





:::

**例**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=説明}


:::

**例**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=説明}


:::

**例**



### textFontWeight

**Type:** `number | undefined`

:::note{title=説明}


:::

**例**



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=説明}
left: テキストは注釈領域の右側にあり、左端が領域に揃います。

center: テキストは注釈領域内で中央揃えになります。



**例**



:::

**例**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=説明}
middle: テキストは注釈領域内で垂直方向に中央揃えになります。

bottom: テキストは注釈領域の上部にあり、下端が領域に揃います。

背景のストローク色

**例**



:::

**例**
'top'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=説明}


:::

**例**



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}


:::

**例**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=説明}


:::

**例**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=説明}






:::

**例**




### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=説明}


:::

**例**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=説明}


:::

**例**




### lineVisible

**Type:** `boolean | undefined`

:::note{title=説明}






:::

**例**
0.5



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


:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=説明}
0

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=説明}
マークエリア設定

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=説明}
チャートでパースペクティブが有効な場合、またはメジャーが結合されている場合に、ディメンション連動機能を有効にするかどうか。

:::


#### field

**Type:** `string`

:::note{title=説明}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}




すべてのディメンション対応サブチャートのツールチップを表示するかどうか。

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
クロスヘアに対応するラベルを表示するかどうか。






:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}


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


:::

**例**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}

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
**例**

:::

**例**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=説明}
**例**



**例**

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


:::

**例**
0.5



### areaBorderColor

**Type:** `string | undefined`

:::note{title=説明}


:::

**例**
'red'



### areaBorderWidth

**Type:** `number | undefined`

:::note{title=説明}


:::

**例**




### areaBorderRadius

**Type:** `number | undefined`

:::note{title=説明}


:::

**例**



### areaLineDash

**Type:** `number[] | undefined`

:::note{title=説明}


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




## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=説明}
ディメンション連動設定



ピボットグラフのディメンション連動設定

:::


### enable

**Type:** `false | true`

:::note{title=説明}
ピボットグラフのディメンション連動を有効にするかどうか

:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title=説明}
すべてのディメンションに対応するサブグラフの Tooltip 情報を表示するかどうか

:::

### showLabel

**Type:** `boolean | undefined`

:::note{title=説明}
crosshair に対応するラベルを表示するかどうか

:::


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=説明}
言語設定

:::
