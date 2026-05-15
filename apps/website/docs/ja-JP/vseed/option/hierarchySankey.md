# HierarchySankey

:::info{title=エンコーディングマッピング}
階層サンキー図は次のビジュアルチャネルをサポートします:

`hierarchy`: 階層チャネル。`複数のディメンション`をサポートします

`size`: サイズチャネル。`1 つのメジャー`をサポートします

`label`: ラベルチャネル。`複数のディメンション`と`複数のメジャー`をサポートします

`tooltip`: ツールチップチャネル。`複数のディメンション`と`複数のメジャー`をサポートします

:::

:::note{title=説明}
階層サンキー図は階層的な流れデータを表示するために使用し、ツリー状ノードと流れのリンクで階層関係と流量の大きさを表します

適用シナリオ:

\- 上流から下流への階層的な流れ関係を表示する場合

\- ツリー構造における流量配分と経路伝達を強調する場合

:::

:::warning{title=Warning}
データ要件:

\- 階層構造を構築するために少なくとも 1 つのディメンションフィールドが必要です

\- 流量の大きさをマッピングするために少なくとも 1 つの数値フィールド（メジャー）が必要です

\- advanced pipeline では tidyData を VChart がサポートするツリー型 children 構造へ変換する必要があります

:::


## chartType

**Type:** `"hierarchySankey"`

:::note{title=説明}
階層サンキー図



階層サンキー図。階層構造内の流れ関係と流量の大きさを表示します

:::

**例**
'hierarchySankey'




## dataset

**Type:** `Record[]`

:::note{title=説明}
TidyData仕様に準拠し、事前集計済みのデータセットで、チャートのデータソースと構造を定義します。ユーザーが入力データを手動処理する必要はありません。VSeedの強力なデータリシェイプ機能が自動的に処理します。面グラフのデータは最終的に2つのディメンションと1つのメジャーにリシェイプされます。



TidyData 仕様に準拠し、集計済みのデータセットです。グラフのデータソースと構造を定義します

:::

**例**
[{region: '華北', province: '河北', value: 30}, {region: '華南', province: '広東', value: 70}]




## dimensions

**Type:** `HierarchyDimension[] | undefined`

:::note{title=説明}
最初のディメンションはX軸にマッピングされ、残りのディメンションはメジャー名（複数メジャーがある場合）と結合されて凡例項目として表示されます。



ディメンション設定。階層構造を定義するために使用し、hierarchy / label / tooltip チャネルをサポートします

:::

**例**
[{id: 'region', alias: '地域'}, {id: 'province', alias: '省'}]




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

**Type:** `"tooltip" | "label" | "hierarchy" | undefined`

:::note{title=説明}
ディメンションをマッピングするチャネル

\- hierarchy: 複数のディメンションを階層チャネルへマッピングできます

\- label: 複数のディメンションをラベルチャネルへマッピングできます

\- tooltip: 複数のディメンションをツールチップチャネルへマッピングできます

:::

:::tip{title=Tip}
最初のディメンションは color チャネルへ直接マッピングされます。

:::


## measures

**Type:** `HierarchyMeasure[] | undefined`

:::note{title=説明}
メジャー



メジャー設定。流量の大きさを定義するために使用し、size / label / tooltip チャネルをサポートします

:::

**例**
[{id: 'value', alias: 'フロー量'}]




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

**Type:** `"tooltip" | "label" | "size" | undefined`

:::note{title=説明}
メジャーをマッピングするチャネル

\- size: メジャーをサイズチャネルへマッピングし、Treemap や Sunburst などのチャートで面積またはサイズを表示します。

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




ページネーションに使用するフィールド名を指定します。ディメンションである必要があります

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




背景色には 'red'、'blue' などの色文字列を指定できます。また、'#ff0000' や 'rgba(255,0,0,0.5)' のような hex、rgb、rgba も使用できます

:::


## color

**Type:** `Color | undefined`

:::note{title=説明}
色



色設定。色リスト、色マッピング、色グラデーションなど、グラフの配色方案を定義します

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
チャートデータラベルを定義するラベル設定。位置、フォーマット、スタイルを含みます。



ラベル設定。位置、形式、スタイルなど、グラフのデータラベルを定義します

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




凡例設定。階層サンキー図の色凡例の表示、位置、スタイルを定義します

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





## tooltip

**Type:** `Tooltip | undefined`

:::note{title=説明}




ツールチップ設定。内容、形式、スタイルなど、グラフのツールチップ情報を定義します

:::


### enable

**Type:** `false | true`

:::note{title=説明}


:::


## theme

**Type:** `Theme | undefined`

:::note{title=説明}




light と dark の 2 つのテーマを内蔵しています。ユーザーは Builder でテーマをカスタマイズできます



const maxItems = _.map(grouped, group =>



_.map(maxItems, item => [

:::

**例**
'dark'

'light'




### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=説明}
言語



グラフの言語設定。'zh\-CN' と 'en\-US' の 2 つの言語をサポートします

:::
