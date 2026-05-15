# ColumnPercent

:::info{title=推奨}
\- 推奨フィールド設定: `1` 個のメジャー、`2` 個のディメンション

\- Data Reshape をサポート: 少なくとも `1` 個のメジャー、`0` 個のディメンション

:::

:::info{title=エンコーディングマッピング}
パーセント縦棒グラフは次のビジュアルチャネルをサポートします:

`xAxis`  : x 軸チャネル。`複数のディメンション`をサポートし、ディメンション値を x 軸へマッピングします

`yAxis`  : y 軸チャネル。`複数のメジャー`をサポートし、メジャー値を y 軸へマッピングします

`detail` : 詳細チャネル。`複数のディメンション`をサポートし、同じカラー系列内でより細かな粒度のデータを表示するときに使用します

`color`  : カラーチャネル。`複数のディメンション`または`1 つのメジャー`をサポートします。ディメンションの色は系列の区別に、メジャーの色はメジャー値から図形色への線形マッピングに使用します

`tooltip`: ツールチップチャネル。`複数のディメンション`と`複数のメジャー`をサポートし、データ点にマウスホバーしたときに表示されます

`label`  : ラベルチャネル。`複数のディメンション`と`複数のメジャー`をサポートし、データ点上にデータラベルを表示します

:::

:::note{title=説明}
パーセント縦棒グラフは、各カテゴリの構成比を表示する場面に適しており、Y軸はデータの比率をパーセント形式で表示します

適用シナリオ:

\- 異なるカテゴリデータの構成比の比較

\- 多次元データの構成分析

\- 時系列における構成比の変化傾向

:::

:::warning{title=Warning}
データ要件:

\- 少なくとも1つのメジャーフィールド

\- 最初のディメンションはX軸に配置され、残りのディメンションはメジャー名（複数メジャーがある場合）と結合されて凡例項目として表示されます。

\- すべてのメジャーは自動的に 1 つのメジャーにマージされます

デフォルトで有効な機能:

\- デフォルトで凡例、軸、パーセントラベル、ツールチップ、比率計算を有効化します

:::


## chartType

**Type:** `"columnPercent"`

:::note{title=説明}
パーセント縦棒グラフ



パーセント縦棒グラフ。各カテゴリデータの構成比をパーセント形式で表示します

:::

**例**
'columnPercent'




## dataset

**Type:** `Record[]`

:::note{title=説明}
TidyData仕様に準拠し、事前集計済みのデータセットで、チャートのデータソースと構造を定義します。ユーザーが入力データを手動処理する必要はありません。VSeedの強力なデータリシェイプ機能が自動的に処理します。面グラフのデータは最終的に2つのディメンションと1つのメジャーにリシェイプされます。



TidyData 仕様に準拠し、集計済みのデータセットです。グラフのデータソースと構造を定義します。ユーザーが入力するデータセットに追加処理は不要です。VSeed には強力なデータ再整形機能があり、自動でデータを再整形します。パーセント縦棒グラフのデータは最終的に 2 つのディメンションと 1 つのメジャーに変換されます。

:::

**例**
[{category:'A', value:30}, {category:'B', value:70}]




## dimensions

**Type:** `ColumnDimension[] | undefined`

:::note{title=説明}
最初のディメンションはX軸にマッピングされ、残りのディメンションはメジャー名（複数メジャーがある場合）と結合されて凡例項目として表示されます。



**例**

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

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=説明}
ディメンションをマッピングするチャネル

\- xAxis: 複数ディメンションをx軸にマッピングできます

\- color: 複数ディメンションを色チャネルにマッピングできます

\- detail: 複数ディメンションを詳細チャネルにマッピングできます

\- tooltip: 複数のディメンションをツールチップチャネルへマッピングできます

\- label: 複数のディメンションをラベルチャネルへマッピングできます

\- row: 複数ディメンションを行チャネルにマッピングできます

\- column: 複数ディメンションを列チャネルにマッピングできます

:::


## measures

**Type:** `ColumnMeasure[] | undefined`

:::note{title=説明}
メジャー



パーセント縦棒グラフのメジャーは自動的に 1 つのメジャーに結合され、Y軸へマッピングされます。複数のメジャーがある場合、メジャー名は他のディメンションと結合され、凡例項目として表示されます。

:::

**例**
[{id: 'value', alias: '値の割合', format: 'percent'}]




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
自動数値フォーマット。デフォルトで有効で、優先度が最も高い

autoFormat=true の場合、すべての numFormat 設定を上書きします

有効にすると、チャートのデータラベルとツールチップは、メジャー値と言語環境に基づいて適切なフォーマットを自動選択します

フォーマット規則: 10進数、compact notation 有効、小数部は最小0桁・最大2桁、自動丸め、ブラウザの Intl.NumberFormat 実装を使用

例:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=説明}
メジャーのカスタム数値フォーマット。ラベルとツールチップに自動適用されます

注意: カスタムフォーマットを使用するには autoFormat=false を明示的に設定する必要があります。そうしないと autoFormat がこの設定を上書きします

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
数値フォーマットの小数桁数。ブラウザの Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用し、significantDigits より優先度は低いです

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
数値フォーマットの有効桁数。ブラウザの Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用し、fractionDigits より優先度は高いです

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
significantDigits と fractionDigits の両方を設定した場合の数値フォーマットの丸め優先度。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingPriority と同じ規則に従います

:::

**例**
\- 1234.5678 は 1230 に変換, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 は 1234.5678 に変換, significantDigits:3 (roundingPriority:morePrecision)



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
数値フォーマットタイプ。数値（10進数）、パーセント（%）、パーミル（‰）、科学表記をサポート

:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの比率。0 にはできません

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
数値フォーマットの小数桁数。ブラウザの Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用し、significantDigits より優先度は低いです

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
数値フォーマットの有効桁数。ブラウザの Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用し、fractionDigits より優先度は高いです

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
significantDigits と fractionDigits の両方を設定した場合の数値フォーマットの丸め優先度。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingPriority と同じ規則に従います

:::

**例**
\- 1234.5678 は 1230 に変換, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 は 1234.5678 に変換, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
数値フォーマットの丸めモード。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingMode と同じ規則に従います

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "yAxis" | undefined`

:::note{title=説明}
メジャーをマッピングするチャネル

\- yAxis: メジャーをy軸にマッピングします

\- detail: メジャーを詳細チャネルにマッピングします

\- color: メジャーを色チャネルにマッピングします

\- label: メジャーをラベルチャネルへマッピング

\- tooltip: メジャーをツールチップチャネルへマッピング

:::

### parentId

**Type:** `string | undefined`

:::note{title=説明}
フラットなメジャー設定形式でツリー状のメジャーグループを構築します。parentId は親メジャーグループの id を指し、メジャーツリーの構築に使用されます

:::

:::tip{title=Tip}
メジャーツリーの設定方法は2つあります: 方法1は children でメジャーツリーを直接設定する方法、方法2は parentId を持つフラットなメジャーリストを設定する方法です。この2つの方法は同時に使用できません

:::


## page

**Type:** `Page | undefined`

:::note{title=説明}


:::


### field

**Type:** `string`

:::note{title=説明}


:::

### currentValue

**Type:** `string`

:::note{title=説明}


:::

**例**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=説明}
チャートの背景色。デフォルトは透明背景です。背景色には色文字列 (例: 'red', 'blue')、または hex、rgb、rgba 値 (例: '#ff0000', 'rgba(255,0,0,0.5)') を指定できます。

:::


## color

**Type:** `Color | undefined`

:::note{title=説明}


:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=説明}


:::

**例**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=説明}


:::

**例**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=説明}


:::

**例**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=説明}


:::

### negativeColor

**Type:** `string | undefined`

:::note{title=説明}


:::


## label

**Type:** `Label | undefined`

:::note{title=説明}


:::


### enable

**Type:** `false | true`

:::note{title=説明}


:::

### wrap

**Type:** `boolean | undefined`

:::note{title=説明}


:::

### showValue

**Type:** `boolean | undefined`

:::note{title=説明}






:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=説明}






:::

### showDimension

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


:::

**例**
\- 100000 は 10K に変換, ratio:1000, symbol:"K"




#### symbol

**Type:** `string | undefined`

:::note{title=説明}


:::

**例**
\- 100000 は 10K に変換, ratio:1000, symbol:"K"




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
\- 1234.5678 は 1234.6 に変換, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 は 1234.57 に変換, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 は 1230.568 に変換, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 は 1234.5678 に変換, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 は 1234.56780 に変換, fractionDigits:5 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}


:::

**例**
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


:::

**例**
\- 1234.5678 は 1234.5678 に変換, significantDigits:3 (roundingPriority:morePrecision)




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}


:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=説明}


:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=説明}


:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}


:::

### labelStroke

**Type:** `string | undefined`

:::note{title=説明}


:::

### labelColor

**Type:** `string | undefined`

:::note{title=説明}


:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=説明}


:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=説明}


:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=説明}


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






:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}








:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=説明}
































:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=説明}


:::

**例**
"売上が1000を超える棒をハイライト"

"各地域で利益率が最も高い棒をハイライト"



#### code

**Type:** `string`

:::note{title=説明}














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


:::


##### field

**Type:** `string`

:::note{title=説明}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}






:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}








:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=説明}






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


:::


### enable

**Type:** `boolean | undefined`

:::note{title=説明}


:::

**例**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=説明}


:::

:::warning{title=Warning}


:::

**例**




### labelColor

**Type:** `string | undefined`

:::note{title=説明}


:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=説明}


:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=説明}


:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=説明}


:::

**例**




### labelFontColor

**Type:** `string | undefined`

:::note{title=説明}


:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=説明}


:::

**例**




### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=説明}


:::

:::warning{title=Warning}


:::

**例**




### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=説明}


:::

**例**




### maxSize

**Type:** `number | undefined`

:::note{title=説明}






:::

:::warning{title=Warning}


:::

**例**





## regionPadding

**Type:** `RegionPadding | undefined`

:::note{title=説明}




**Type:** `false | true`

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
ブラシ選択を有効にするかどうか

:::


### enable

**Type:** `false | true`

:::note{title=説明}


:::


## brush

**Type:** `Brush | undefined`

:::note{title=説明}








ブラシ選択モード: 単一または複数

:::


### enable

**Type:** `boolean | undefined`

:::note{title=説明}


:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=説明}
**Type:** `XLinearAxis | undefined`



**Type:** `boolean | undefined`









:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=説明}
選択されたデータポイントの不透明度。範囲は0-1です



**Type:** `number | boolean | undefined`

**Type:** `string | undefined`



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
**Type:** `boolean | undefined`

:::


## animation

**Type:** `BarLikeAnimation | undefined`

:::note{title=説明}
軸ラベルの自動非表示間隔。2 つのテキストラベルの間隔が autoHideGap 未満の場合、重なったラベルは自動的に非表示になります。カテゴリ軸でのみ有効です。



autoHide が無効な場合は、minGap で設定されたサンプリングを使用します

:::


### enable

**Type:** `boolean | undefined`

:::note{title=説明}


:::

### params

**Type:** `BarLikeAnimationParams | undefined`

:::note{title=説明}


:::


#### appear

**Type:** `BarLikeAppearAnimation | undefined`

:::note{title=説明}


:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=説明}


:::

##### enable

**Type:** `boolean | undefined`

:::note{title=説明}


:::

##### ease

**Type:** `string | undefined`

:::note{title=説明}
**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::

##### duration

**Type:** `number | undefined`

:::note{title=説明}


:::

##### color

**Type:** `string | undefined`

:::note{title=説明}


:::

#### update

**Type:** `BarLikeUpdateAnimation | undefined`

:::note{title=説明}


:::


##### effects

**Type:** `("growth" | "moveIn")[] | undefined`

:::note{title=説明}


:::

##### enable

**Type:** `boolean | undefined`

:::note{title=説明}


:::

##### ease

**Type:** `string | undefined`

:::note{title=説明}
**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::

##### duration

**Type:** `number | undefined`

:::note{title=説明}


:::

##### color

**Type:** `string | undefined`

:::note{title=説明}


:::

#### loop

**Type:** `BarLikeAnimationLoop | undefined`

:::note{title=説明}


:::


##### enable

**Type:** `boolean | undefined`

:::note{title=説明}
**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::

##### interval

**Type:** `number | undefined`

:::note{title=説明}


:::

##### loop

**Type:** `BarLikeLoopAnimation | undefined`

:::note{title=説明}


:::


###### effects

**Type:** `BarLikeLoopEffect[] | undefined`

:::note{title=説明}


:::

###### enable

**Type:** `boolean | undefined`

:::note{title=説明}


:::

###### ease

**Type:** `string | undefined`

:::note{title=説明}
**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::

###### duration

**Type:** `number | undefined`

:::note{title=説明}


:::

###### color

**Type:** `string | undefined`

:::note{title=説明}


:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=説明}


:::


###### ease

**Type:** `string | undefined`

:::note{title=説明}


:::

###### color

**Type:** `string | undefined`

:::note{title=説明}


:::

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title=説明}


:::


## xAxis

**Type:** `XBandAxis | undefined`

:::note{title=説明}
**Type:** `boolean | undefined`

:::


### visible

**Type:** `boolean | undefined`

:::note{title=説明}
グリッド線タイプ

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=説明}
X軸 animation configuration

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


Y 軸、数値軸、Y 軸設定。位置、フォーマット、スタイルなど、チャートの Y 軸を定義します。

**Type:** `string | undefined`

:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=説明}


:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=説明}


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
\- 100000 は 10万 に変換, ratio:10000, symbol:"万"

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=説明}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}
数値フォーマットの接尾辞

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=説明}
数値フォーマットの接頭辞

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマットの小数桁数。ブラウザの Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用し、significantDigits より優先度は低いです

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
\- 1234.5678 は 1234.6 に変換, significantDigits:5 (roundingMode:halfCeil)

:::

#### titleText

**Type:** `string | undefined`

:::note{title=説明}
**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=説明}
\- 1234.5678 は 1234.5678 に変換, significantDigits:3 (roundingPriority:morePrecision)

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの丸めモード。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingMode と同じ規則に従います

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

**Type:** `YLinearAxis | undefined`

:::note{title=説明}


:::


### visible

**Type:** `boolean | undefined`

:::note{title=説明}
**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::

### min

**Type:** `number | undefined`

:::note{title=説明}


:::

### max

**Type:** `number | boolean | undefined`

:::note{title=説明}


:::

### log

**Type:** `boolean | undefined`

:::note{title=説明}


:::

### logBase

**Type:** `number | undefined`

:::note{title=説明}


:::

### nice

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


:::

**例**





#### symbol

**Type:** `string | undefined`

:::note{title=説明}
**Type:** `string | undefined`

:::

**例**





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
**Type:** `{ duration?: number; easing?: string; } | undefined`

:::

**例**


アニメーションのイージング関数






#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}
カテゴリ軸ソート設定。ディメンションまたはメジャーに基づくソート、およびカスタムソート順をサポートします

:::

**例**
sort: {
  orderBy: 'profit',
  order: 'asc',
}
sort: {
  customOrder:['2019', '2020', '2021']
}




#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=説明}


:::

**例**
ソート順。任意値は 'asc' または 'desc' です




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}


:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=説明}
\- orderBy:'date'

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}
カスタムソート順。カテゴリ軸に直接適用されます

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=説明}


:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=説明}
  orderBy: 'profit',

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=説明}
or

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
**Type:** `string[] | undefined`

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
**Type:** `brand`

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=説明}


:::

#### tickSize

**Type:** `number | undefined`

:::note{title=説明}


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
sort order, optional values 'asc' or 'desc'

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=説明}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=説明}


:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=説明}
**Type:** `string | number | undefined`

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
**例**

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=説明}
selector = [{ profit: 100 }, { profit: 200 }]

:::


#### duration

**Type:** `number | undefined`

:::note{title=説明}
operator: 'not in',

:::

#### easing

**Type:** `string | undefined`

:::note{title=説明}
}

:::


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title=説明}
コード実行に失敗した場合、または環境がサポートされない場合のフォールバック方法。





:::


### visible

**Type:** `boolean | undefined`

:::note{title=説明}
selector = {

:::

### rectColor

**Type:** `string | undefined`

:::note{title=説明}
\- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します

:::

### labelColor

**Type:** `string | undefined`

:::note{title=説明}
演算子

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=説明}


:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}


:::


## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title=説明}
並列縦棒グラフの積み上げ角丸

:::


## barMaxWidth

**Type:** `string | number | undefined`

:::note{title=説明}


:::


## sort

**Type:** `Sort | undefined`

:::note{title=説明}
AI生成のJavaScriptコードで複雑なデータフィルタリングロジックを実装します





:::

**例**


**Type:** `"in" | "not in" | undefined`
}

演算子
}


\- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します

注意: selector と dynamicFilter は同時に使用できません。dynamicFilter の優先度が高いです




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=説明}


:::

**例**
**Type:** `"row-with-field"`



### orderBy

**Type:** `string | undefined`

:::note{title=説明}


:::

**例**





### customOrder

**Type:** `string[] | undefined`

:::note{title=説明}


:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=説明}






:::

**例**

チャートのアニメーションフィルタ設定

}

AI が生成した JavaScript コードでチャートマーカー (棒、点など) のフィルタリングを実装します
}



_.maxBy(group, item => item.profit / item.sales)





### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=説明}
])

:::

**例**
"Highlight the bar with the highest profit rate in each region"



### orderBy

**Type:** `string | undefined`

:::note{title=説明}
AI 生成の JavaScript フィルタリングコード

:::

**例**

\- 入力パラメータ: data (配列)。各項目には行番号を表す __row_index フィールドが含まれます



### customOrder

**Type:** `string[] | undefined`

:::note{title=説明}


:::


## theme

**Type:** `Theme | undefined`

:::note{title=説明}




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


## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title=説明}
矩形マークのスタイル。グラフの矩形マークの色、枠線、角丸などを定義します。

棒プリミティブ (矩形) を表示するかどうか





**Type:** `string | undefined`

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=説明}




**Type:** `string | undefined`

**Type:** `boolean | undefined`

:::

**例**
棒プリミティブ (矩形) のストローク色

**Type:** `number | undefined`

**Type:** `string | undefined`

**Type:** `number | undefined`





field: 'category',
operator: 'in',
value: 'tool'
}

field: 'category',
operator: 'not in',
value: 'book'
}

**例**

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


**Type:** `number | number[] | undefined`



:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}




**Type:** `Selector | Selectors | undefined`

4

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=説明}




\- in: ディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します





**Type:** `"in" | "not in" | undefined`

\- not in: ディメンションフィールド値が値リストに含まれないデータ項目を選択します。



















:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=説明}


:::

**例**
"売上が1000を超える棒をハイライト"

"各地域で利益率が最も高い棒をハイライト"



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
\- 禁止事項: eval、Function、非同期処理、DOM API、ネットワークリクエスト

const profitRate = item.profit / item.sales;

});

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}




**Type:** `Selector | Selectors | undefined`

);

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=説明}




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


:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title=説明}


:::

### barBorderColor

**Type:** `string | undefined`

:::note{title=説明}


:::

### barBorderWidth

**Type:** `number | undefined`

:::note{title=説明}
**Type:** `string | string[] | undefined`

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=説明}


:::

**例**
**Type:** `string | undefined`







### barBorderOpacity

**Type:** `number | undefined`

:::note{title=説明}




テキストフォントサイズ

:::

**例**
12

[0, 0, 10, 10]



### barRadius

**Type:** `number | number[] | undefined`


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=説明}


:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=説明}


:::


#### field

**Type:** `string`

:::note{title=説明}
'right' Text is on the left side of the annotation point.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
テキストの垂直揃え。通常は 'top' に設定して注釈ポイントの下部にテキストを表示し、チャートの表示領域内に収まるようにします。

テキストがチャートの表示領域内で完全に表示されるように 'top' に設定することを推奨します。

top: テキストは注釈ポイントの下部にあり、テキストの上端がポイントに揃います。

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
'top' Text is at the bottom of the annotation point.





**Type:** `boolean | undefined`

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




背景のストローク色

true













'red'











背景の角丸半径

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=説明}
背景のパディング

:::

**例**
"売上が1000を超える棒をハイライト"

"各地域で利益率が最も高い棒をハイライト"



#### code

**Type:** `string`

:::note{title=説明}
負の値はコンポーネント全体を上方向に移動します。例: -10 はテキストと背景を 10 ピクセル上に移動します。





**例**







:::

**例**

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
**Type:** `"value"`

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}


**例**



:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}








:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
"Use the highest sales value as a mark line reference"

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=説明}
注釈線の平均値を計算します





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
**Type:** `string | number | undefined`

:::

**例**
'注釈テキスト'



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






テキスト色

'注釈テキスト'

:::

**例**
'right' テキストは注釈点の左側



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=説明}
テキストがチャートの表示領域内で完全に表示されるように 'top' に設定することを推奨します。

top: テキストは参照線の下部にあり、上端が (垂直) 注釈線の端に揃います。

middle: テキストは参照線上で中央揃えになり、中心が (垂直) 注釈線の端に揃います。

bottom: テキストは参照線の上部にあり、下端が (垂直) 注釈線の端に揃います。



:::

**例**
'top' テキストは注釈点の下側



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
'right'

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
**Type:** `boolean | undefined`

:::

**例**




### offsetY

**Type:** `number | undefined`

:::note{title=説明}
**Type:** `string | undefined`

**例**



:::

**例**
**Type:** `number | undefined`



### offsetX

**Type:** `number | undefined`

:::note{title=説明}






:::

**例**





## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=説明}
**Type:** `number | undefined`

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=説明}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=説明}






**Type:** `string | number | (string | number)[] | undefined`





:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=説明}
平均、最大値、分位数、ビジネスラインなど、注釈線の位置をデータに基づいて動的に決定する必要があるシナリオに適しています。

:::

**例**
"注釈線の参照値として最大売上を取得"

"注釈線に使用する平均売上を計算"



#### code

**Type:** `string`

:::note{title=説明}






**例**







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
prepare() フェーズで書き込まれ、実行時は読み取り専用です

:::

**例**
'注釈テキスト'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=説明}
_.filter(data, item => item.year === 2024),

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
const index = Math.floor(sorted.length * 0.75);

:::

**例**
**Type:** `false | true`



### textFontWeight

**Type:** `number | undefined`

:::note{title=説明}


:::

**例**




### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=説明}


テキスト位置



注釈線ラベル位置 (ラベルの線に対する相対位置)。



:::

**例**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=説明}
**例**

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


:::

**例**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=説明}


:::

**例**




### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=説明}
テキストがチャートの表示領域内で完全に表示されるように 'top' に設定することを推奨します。

:::

**例**
'solid'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=説明}


:::

**例**
center: テキストは基準線の中央にあります（水平マークラインの端）。



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
**例**

:::

**例**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=説明}
**例**

:::

**例**





## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=説明}
4

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=説明}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=説明}












:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=説明}


:::

**例**
"注釈線の参照値として最大売上を取得"

"注釈線に使用する平均売上を計算"



#### code

**Type:** `string`

:::note{title=説明}
演算子



\- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します



'red'

**Type:** `"in" | "not in" | undefined`

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::

**例**
\- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します
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

'solid'
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
'注釈テキスト'



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
center: テキストは注釈領域内で中央揃えになり、テキストの中心が領域に揃います。

:::

**例**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=説明}
テキストの垂直揃え。通常は 'top' に設定して注釈領域の下部にテキストを表示し、チャートの表示領域内に収まるようにします。

:::

**例**




### textFontWeight

**Type:** `number | undefined`

:::note{title=説明}


:::

**例**
**Type:** `boolean | undefined`



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=説明}








背景色

:::

**例**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=説明}
背景のストローク色



背景のストローク色

**例**

**例**

:::

**例**
'top'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=説明}
**例**

:::

**例**




### textBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
背景の角丸半径

:::

**例**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=説明}
背景のパディング

:::

**例**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=説明}
注釈領域の色



注釈領域の色

:::

**例**




### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=説明}
**例**

:::

**例**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=説明}
**例**

:::

**例**




### lineVisible

**Type:** `boolean | undefined`

:::note{title=説明}
**例**



**例**

:::

**例**




### lineColor

**Type:** `string | undefined`

:::note{title=説明}


:::

**例**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=説明}


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


:::


#### positiveColor

**Type:** `string | undefined`

:::note{title=説明}


:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=説明}


:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=説明}
**例**

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=説明}
4

:::


#### field

**Type:** `string`

:::note{title=説明}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}




注釈領域の色

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
**例**

**Type:** `number | undefined`





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
'注釈テキスト'



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
'center' テキストは注釈領域の中央



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=説明}








多項式回帰の次数

:::

**例**
'top' テキストは注釈領域の下側



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=説明}


:::

**例**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
**Type:** `string | undefined`

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
**Type:** `boolean | undefined`



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
グラフでピボット機能またはメジャー組み合わせを有効にしたとき、ディメンション連動機能を有効にするかどうか

あるディメンション値にホバーしたとき、他のグラフ内の同じディメンション値のデータを連動して強調表示します



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

**Type:** `Locale | undefined`

:::note{title=説明}
グラフの言語設定。'zh\-CN' と 'en\-US' の 2 つの言語をサポートします。また intl.setLocale('zh\-CN') メソッドを呼び出して言語を設定できます

:::

