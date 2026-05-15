# RaceScatter

:::note{title=説明}
動的散布図 (Race Scatter Chart)

時間とともに変化するデータ分布を表示するのに適しており、データ点の位置で2つのメジャー値を表します

適用シーン:

\- 2次元空間におけるデータ分布の特徴を分析し、その時間変化を表示する場合

\- 複数の変数間の相関が時間とともに変化する様子を表示する場合

\- 2次元空間におけるデータ点の移動軌跡を観察する場合

:::

:::note{title=Note}
動的散布図:

\- X軸とY軸はいずれも数値軸（連続データ）で、複数のメジャーマッピングをサポートします

\- プレイヤーで時間ディメンションを制御し、データ変化を動的に表示できます

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
データソース。TidyData仕様に準拠したデータセットです

:::


## dimensions

**Type:** `RaceScatterDimension[] | undefined`

:::note{title=説明}
ディメンション。異なるデータ系列の区別と凡例表示に使用されます

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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "player" | undefined`

:::note{title=説明}
レース散布図系チャートにおけるディメンションマッピングチャネル

\- color: 複数ディメンションを色チャネルにマッピングできます

\- detail: 複数ディメンションを詳細チャネルにマッピングできます

\- tooltip: 複数ディメンションをツールチップチャネルにマッピングできます

\- label: 複数ディメンションをラベルチャネルにマッピングできます

\- row: 複数ディメンションを行チャネルにマッピングできます

\- column: 複数ディメンションを列チャネルにマッピングできます

\- player: 複数のディメンションをプレイヤーチャネルへマッピングできます

:::


## measures

**Type:** `ScatterMeasure[] | undefined`

:::note{title=説明}
メジャー。X軸とY軸にそれぞれマッピングするため、少なくとも2つのメジャーが必要です

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


:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマット比率。0 にはできません

:::

**例**

ラベル制限の最大長。テキスト長がこの値を超えると、省略記号で切り詰められ、ホバー時に表示されます（カテゴリ軸でのみ有効）。



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


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}

:::

**例**





\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



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

### format

**Type:** `NumFormat | undefined`


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

ラベル制限の最大長。テキスト長がこの値を超えると、省略記号で切り詰められ、ホバー時に表示されます（カテゴリ軸でのみ有効）。



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


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}

:::

**例**





\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



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

### encoding

**Type:** `"xAxis" | "color" | "tooltip" | "label" | "yAxis" | "size" | undefined`

:::note{title=説明}
メジャーをマッピングするチャネル

\- xAxis: Measure mapped to the X-axis

\- yAxis: メジャーをy軸にマッピングします

\- size: メジャーにマッピングされるサイズ

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
プレイヤー設定。時間ディメンションを指定するために使用され、動的散布図の中心的な設定です

プレイヤーで時間ディメンションの再生進度を制御し、データの動的更新を実現します



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
ソート設定。ディメンション値の並び順を制御します





:::

**例**
\- order:'asc'
\- orderBy:'date'

\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=説明}
])

:::

**例**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=説明}


:::

**例**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=説明}
\- `__row_index` は元データ項目の行番号を表し、`field` は強調表示するフィールドを表します。

:::


## page

**Type:** `Page | undefined`

:::note{title=説明}
ページネーション設定。データ量が多い場面を処理するために使用します

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
背景色設定

:::


## size

**Type:** `number | number[] | undefined`

:::note{title=説明}
散布図メジャーのサイズ。散布図のデータ点サイズまたはサイズ範囲を定義します

\- サイズ範囲が 10 のような数値の場合、データ点のサイズ範囲は 10 に固定されます

\- サイズ範囲が [10, 40] のような長さ2の配列の場合、データ点サイズは10から40の範囲になります

\- sizeRange と排他的で、優先度は size より低いです

:::


## sizeRange

**Type:** `number | number[] | undefined`

:::note{title=説明}
散布図メジャーのサイズ範囲。散布図のデータ点のサイズ範囲を定義します,

\- サイズ範囲が [10, 40] のような長さ2の配列の場合、データ点サイズは10から40の範囲になります

\- サイズ範囲が 10 のような数値の場合、データ点のサイズ範囲は 10 に固定されます

\- sizeRange と排他的で、優先度は size より高いです

:::


## color

**Type:** `Color | undefined`

:::note{title=説明}
色設定。異なるディメンションまたはメジャーを区別するために使用します

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
ラベル設定。データ点上にデータラベルを表示するために使用されます

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


:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマット比率。0 にはできません

:::

**例**

ラベル制限の最大長。テキスト長がこの値を超えると、省略記号で切り詰められ、ホバー時に表示されます（カテゴリ軸でのみ有効）。



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


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}

:::

**例**





\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



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

### labelFontSize

**Type:** `number | undefined`

:::note{title=説明}


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




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

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
演算子



\- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します



注釈ポイントの水平オフセット (ピクセル)。ポイントが左側 (カテゴリ軸の開始位置) にある場合は正の値、右側 (カテゴリ軸の終了位置) にある場合は負の値を推奨します。

負の値はコンポーネント全体を左に移動します (例: -10)。


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


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
クロスヘアに対応するラベルを表示するかどうか。




:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
クロスヘアに対応するラベルを表示するかどうか。




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=説明}
\- not in: ディメンションフィールド値が値リストに含まれないデータ項目を選択します。



テキスト色

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
ツールチップ設定。マウスホバー時に詳細情報を表示するために使用します

:::


### enable

**Type:** `false | true`

:::note{title=説明}


:::


## brush

**Type:** `Brush | undefined`

:::note{title=説明}
ブラシ選択設定。ブラシ選択インタラクションをサポートするために使用します



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
\- 100000 は 10万 に変換, ratio:10000, symbol:"万"



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
X軸設定。数値軸として最初のメジャー値を表示します

:::


### visible

**Type:** `boolean | undefined`

:::note{title=説明}

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
sortLegend: {

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

ラベル制限の最大長。テキスト長がこの値を超えると、省略記号で切り詰められ、ホバー時に表示されます（カテゴリ軸でのみ有効）。



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


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}

:::

**例**





\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



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


## yAxis

**Type:** `YLinearAxis | undefined`

:::note{title=説明}
Y軸設定。数値軸として2つ目のメジャー値を表示します

:::


### visible

**Type:** `boolean | undefined`

:::note{title=説明}

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
sortLegend: {

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

ラベル制限の最大長。テキスト長がこの値を超えると、省略記号で切り詰められ、ホバー時に表示されます（カテゴリ軸でのみ有効）。



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


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}

:::

**例**





\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



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


## crosshairLine

**Type:** `CrosshairLine | undefined`

:::note{title=説明}
クロスヘア設定。データの正確な位置を表示するために使用されます



クロスヘア線設定。チャート内にクロスヘア線（ガイド線）を表示するための設定タイプです

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


## theme

**Type:** `Theme | undefined`

:::note{title=説明}
テーマ設定



演算子



\- not in: ディメンションフィールド値が値リストに含まれないデータ項目を選択します。

:::


### length

**Type:** `number`

### brand

**Type:** `brand`


## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title=説明}
データ点スタイル設定。単一スタイルまたは配列形式にでき、グローバルスタイルまたは条件付きスタイル設定をサポートします

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=説明}
- not in: ディメンションフィールド値が `value` 配列内にないデータ項目を選択します。






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




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

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
演算子



\- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します



注釈ポイントの水平オフセット (ピクセル)。ポイントが左側 (カテゴリ軸の開始位置) にある場合は正の値、右側 (カテゴリ軸の終了位置) にある場合は負の値を推奨します。

負の値はコンポーネント全体を左に移動します (例: -10)。


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


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
クロスヘアに対応するラベルを表示するかどうか。




:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
クロスヘアに対応するラベルを表示するかどうか。




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=説明}
\- not in: ディメンションフィールド値が値リストに含まれないデータ項目を選択します。



テキスト色

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
マークポイント設定。特定のデータ点にマークを追加するために使用します

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
クロスヘアに対応するラベルを表示するかどうか。




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
クロスヘアに対応するラベルを表示するかどうか。




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}


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
演算子



\- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します



注釈ポイントの水平オフセット (ピクセル)。ポイントが左側 (カテゴリ軸の開始位置) にある場合は正の値、右側 (カテゴリ軸の終了位置) にある場合は負の値を推奨します。

負の値はコンポーネント全体を左に移動します (例: -10)。


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


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
クロスヘアに対応するラベルを表示するかどうか。




:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
クロスヘアに対応するラベルを表示するかどうか。




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=説明}
\- not in: ディメンションフィールド値が値リストに含まれないデータ項目を選択します。



テキスト色

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
背景色。


**例**

:::

**例**
2




## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=説明}
数値マークライン。縦方向のマークラインで、特定の X軸数値をマークします

:::


### xValue

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
'red'

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
left: テキストは注釈領域の右側にあり、左端が領域に揃います。

center: テキストは注釈領域内で中央揃えになります。

テキスト色。


**例**

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
数値注釈線。水平注釈線として特定のY軸数値をマークします

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

:::

**例**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=説明}
**例**



**例**

:::

**例**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=説明}
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



### lineVisible

**Type:** `boolean | undefined`

:::note{title=説明}






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


:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=説明}
0

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=説明}
マークエリア設定。特定のデータ範囲を強調表示するために使用します

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
クロスヘアに対応するラベルを表示するかどうか。




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
クロスヘアに対応するラベルを表示するかどうか。




same as operator

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
2



### areaBorderRadius

**Type:** `number | undefined`

:::note{title=説明}


:::

**例**
4



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




## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=説明}
言語設定

:::
