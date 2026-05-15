# Pie

:::info{title=推奨}
- 推奨フィールド設定: メジャー `1` 個、ディメンション `1` 個

\- Data Reshape をサポート: 少なくとも `1` 個のメジャー、`0` 個のディメンション

:::

:::info{title=エンコーディングマッピング}
円グラフは次のビジュアルチャネルをサポートします:

`angle`  : 角度チャネル。`複数のメジャー`をサポートし、メジャー値に基づいて扇形角度へマッピングします

`detail` : 詳細チャネル。`複数のディメンション`をサポートし、同じカラー系列内でより細かな粒度のデータを表示するときに使用します

`color`  : カラーチャネル。`複数のディメンション`または`1 つのメジャー`をサポートします。ディメンションの色は系列の区別に、メジャーの色はメジャー値から図形色への線形マッピングに使用します

`tooltip`: ツールチップチャネル。`複数のディメンション`と`複数のメジャー`をサポートし、データ点にマウスホバーしたときに表示されます

`label`  : ラベルチャネル。`複数のディメンション`と`複数のメジャー`をサポートし、データ点上にデータラベルを表示します

:::

:::note{title=説明}
円グラフは単一ディメンションデータの構成比を表示するのに適しており、扇形の面積で各カテゴリの比率を表します

適用シナリオ:

\- カテゴリデータの構成比分布を表示する場合

\- 全体と部分の関係を強調

\- カテゴリ数が少ない場合（6 個以下を推奨）の構成比分析

:::

:::warning{title=Warning}
データ要件:

\- 少なくとも 1 つの数値フィールド

\- すべてのディメンションはメジャー名（複数メジャーがある場合）と結合されて 1 つのディメンションとなり、凡例項目として表示されます

\- すべてのメジャーは自動的に 1 つのメジャーにマージされます

デフォルトで有効な機能:

\- デフォルトで凡例、データラベル、ツールチップ、比率計算を有効化します

:::


## chartType

**Type:** `"pie"`

:::note{title=説明}
円グラフ



円グラフ。単一ディメンションデータの構成比を表示します

:::

**例**
'pie'




## dataset

**Type:** `Record[]`

:::note{title=説明}
TidyData仕様に準拠し、事前集計済みのデータセットで、チャートのデータソースと構造を定義します。ユーザーが入力データを手動処理する必要はありません。VSeedの強力なデータリシェイプ機能が自動的に処理します。面グラフのデータは最終的に2つのディメンションと1つのメジャーにリシェイプされます。



TidyData 仕様に準拠し、集計済みのデータセットです。グラフのデータソースと構造を定義します。ユーザーが入力するデータセットに追加処理は不要です。VSeed には強力なデータ再整形機能があり、自動でデータを再整形します。ファネルチャートのデータは最終的に 1 つのディメンションと 1 つのメジャーに変換されます。

:::

**例**
[{category:'A', value:30}, {category:'B', value:70}]




## dimensions

**Type:** `PieDimension[] | undefined`

:::note{title=説明}
最初のディメンションはX軸にマッピングされ、残りのディメンションはメジャー名（複数メジャーがある場合）と結合されて凡例項目として表示されます。



円グラフのすべてのディメンションはメジャー名（複数メジャーがある場合）と結合されて 1 つのディメンションとなり、角度へマッピングされ、凡例項目として表示されます

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

**Type:** `PieMeasure[] | undefined`

:::note{title=説明}
メジャー



円グラフのすべてのメジャーは自動的に 1 つのメジャーに結合され、半径軸へマッピングされます。複数のメジャーがある場合、メジャー名は他のディメンションと結合され、凡例項目として表示されます。

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

**Type:** `"color" | "tooltip" | "label" | "angle" | undefined`

:::note{title=説明}
メジャーをマッピングするチャネル

\- angle: メジャーがマッピングされる角度

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






:::


## color

**Type:** `Color | undefined`

:::note{title=説明}
色





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

**Type:** `PieLabel | undefined`

:::note{title=説明}
チャートデータラベルを定義するラベル設定。位置、フォーマット、スタイルを含みます。





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

**Type:** `PieLikeAnimation | undefined`

:::note{title=説明}
軸ラベルの自動非表示間隔。2 つのテキストラベルの間隔が autoHideGap 未満の場合、重なったラベルは自動的に非表示になります。カテゴリ軸でのみ有効です。



autoHide が無効な場合は、minGap で設定されたサンプリングを使用します

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

**Type:** `PieLikeAnimationLoop | undefined`

:::note{title=説明}
円グラフ/ドーナツグラフ/ローズグラフのループアニメーション設定

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

**Type:** `NoEffectAtmosphereConfig | undefined`

:::note{title=説明}
円グラフ/ドーナツグラフ/ローズグラフの雰囲気アニメーション設定

:::


###### ease

**Type:** `string | undefined`

:::note{title=説明}


:::

###### color

**Type:** `string | undefined`

:::note{title=説明}


:::


## theme

**Type:** `Theme | undefined`

:::note{title=説明}




データセレクタ。設定されている場合、数値、部分データ項目、ディメンション、またはメジャーのマッチング機能を提供します。未設定の場合、スタイルはグローバルに適用されます。



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

**Type:** `Locale | undefined`

:::note{title=説明}
言語



グラフの言語設定。'zh\-CN' と 'en\-US' の 2 つの言語をサポートします。また intl.setLocale('zh\-CN') メソッドを呼び出して言語を設定できます

:::

