# Scatter

:::info{title=推奨}
\- 推奨フィールド設定: `2` 個のメジャー、`1` 個のディメンション

\- データリシェイプ対応: 少なくとも `1` 個のメジャー、`0` 個のディメンション

:::

:::info{title=エンコーディングマッピング}
散布図は次の視覚チャネルをサポートします:

`xAxis`  : X軸チャネル。`複数のメジャー`をサポートし、メジャー値をX軸にマッピングします

`yAxis`  : Y軸チャネル。`複数のメジャー`をサポートし、メジャー値をY軸にマッピングします

`color`  : 色チャネル。`複数のディメンション`または`1つのメジャー`をサポートします。ディメンション色はデータ系列の区別に、メジャー色はメジャー値を図形色へ線形マッピングするために使用されます

`tooltip`: ツールチップチャネル。`複数のディメンション`と`複数のメジャー`をサポートし、データ点にマウスオーバーしたときに表示されます

`label`  : ラベルチャネル。`複数のディメンション`と`複数のメジャー`をサポートし、データ点上にデータラベルを表示します

:::

:::note{title=説明}
散布図。点の位置でデータ値を表し、データ分布を表示するのに適しています

適用シーン:

\- 中心傾向、分布範囲、外れ値など、データ分布の特徴を分析する場合

:::

:::warning{title=Warning}
データ要件:

\- 少なくとも2つの数値フィールド（メジャー）

\- 最初のメジャーフィールドはX軸に配置され、残りのメジャーは統合されてY軸にマッピングされます

\- メジャー名とディメンション名は統合され、凡例項目として表示されます

デフォルトで有効な機能:

\- 凡例、軸、データ点マーク、ツールチップ、トレンドラインはデフォルトで有効です

:::


## chartType

**Type:** `"scatter"`

:::note{title=説明}
散布図



散布図。点の位置でデータ値を表し、データ分布を表示するのに適しています

:::

**例**
'scatter'




## dataset

**Type:** `Record[]`

:::note{title=説明}
データセット



TidyData仕様に準拠し、集計済みのデータセット。チャートのデータソースと構造を定義します。ユーザー入力データセットを処理する必要はありません。VSeedには強力なデータリシェイプ機能があり、自動的に変換します。散布図のデータは最終的に2つのディメンションと1つのメジャーに変換されます。

:::

**例**
[{month:'1月', value:100}, {month:'2月', value:150}, {month:'3月', value:120}]




## dimensions

**Type:** `ScatterDimension[] | undefined`

:::note{title=説明}
最初のディメンションはX軸にマッピングされ、残りのディメンションはメジャー名（複数メジャーがある場合）と結合されて凡例項目として表示されます。



散布図の最初のディメンションはX軸にマッピングされ、残りのディメンションはメジャー名（複数メジャーがある場合）と統合され、凡例項目として表示されます

:::

**例**
[{id: "month", alias: "月"}]




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

**Type:** `ScatterMeasure[] | undefined`

:::note{title=説明}
散布図メジャー

:::

**例**
[
  {
    id: 'profit', alias: '利益', encoding: 'xAxis'
  },
  {
    id: 'sales', alias: '売上高', encoding: 'yAxis'
  }
]




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


:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}


:::

**例**





#### symbol

**Type:** `string | undefined`

:::note{title=説明}

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

### format

**Type:** `NumFormat | undefined`


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

### encoding

**Type:** `"xAxis" | "color" | "tooltip" | "label" | "yAxis" | "size" | undefined`

:::note{title=説明}
メジャーをマッピングするチャネル

\- xAxis: Measure mapped to the X-axis

\- yAxis: メジャーをy軸にマッピングします

\- size: メジャーにマッピングされるサイズ

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
ページング設定。ページングのフィールド名を指定します。ディメンションである必要があります

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


## backgroundColor

**Type:** `BackgroundColor`

:::note{title=説明}
チャートの背景色



背景色には 'red'、'blue' などの色文字列、または hex、rgb、rgba（例: '#ff0000'、'rgba(255,0,0,0.5)'）を指定できます

:::


## color

**Type:** `Color | undefined`

:::note{title=説明}
色



色設定。色リスト、色マッピング、色グラデーションなど、チャートの配色を定義します。

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
ラベル



ラベル設定。データラベルの位置、書式、スタイルなどを定義します。

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





#### symbol

**Type:** `string | undefined`

:::note{title=説明}

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

### labelFontSize

**Type:** `number | undefined`

:::note{title=説明}
  orderBy: 'profit',

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=説明}
or

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
**例**




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
**例**




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=説明}




背景のストローク色













'red'











背景の角丸半径

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=説明}


:::

**例**
"売上高が1000を超えるデータ項目を強調表示"

"各地域で利益率が最も高いデータ項目を強調表示"



#### code

**Type:** `string`

:::note{title=説明}
演算子



\- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します

**例**






:::

**例**
売上高が1000を超えるデータ項目の sales フィールドを強調表示
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

各地域で利益率が最も高いデータ項目を強調表示
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

複数条件でフィルタリングされたデータ項目を強調表示
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
**例**




:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
**例**




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=説明}




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
凡例



凡例設定。凡例の位置、書式、スタイルなどを定義します。

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
border: true



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
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=説明}


:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=説明}


:::

**例**
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=説明}


:::

:::warning{title=Warning}


:::

**例**
shapeType: 'circle'



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=説明}


:::

**例**
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=説明}






:::

:::warning{title=Warning}


:::

**例**
maxSize: 2




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=説明}
ツールチップ



ツールチップ設定。ツールチップの位置、書式、スタイルなどを定義します。

:::


### enable

**Type:** `false | true`

:::note{title=説明}


:::


## brush

**Type:** `Brush | undefined`

:::note{title=説明}
ブラシ選択



ブラシ選択設定。brush の選択機能を有効または無効にします



ブラシ選択モード: 単一または複数

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
選択されたデータポイントの不透明度。範囲は0-1です







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


## animation

**Type:** `ScatterAnimation | undefined`

:::note{title=説明}
アニメーション設定



チャートアニメーション設定。選択可能な効果はチャートタイプによって制約されます

:::


### enable

**Type:** `boolean | undefined`

:::note{title=説明}
散布図アニメーションを有効にするかどうか

:::

### params

**Type:** `ScatterAnimationParams | undefined`

:::note{title=説明}
散布図アニメーションパラメータ

:::


#### appear

**Type:** `ScatterAppearAnimation | undefined`

:::note{title=説明}
散布図の入場アニメーション設定

:::


##### effects

**Type:** `("growth" | "scale")[] | undefined`

:::note{title=説明}
散布図の入場効果。成長とズームのアニメーションをサポートします

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

**Type:** `ScatterUpdateAnimation | undefined`

:::note{title=説明}
散布図の更新アニメーション設定

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=説明}
散布図の更新効果。成長アニメーションをサポートします

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

**Type:** `ScatterAnimationLoop | undefined`

:::note{title=説明}
散布図のループアニメーション設定

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

**Type:** `ScatterLoopAnimation | undefined`

:::note{title=説明}
散布図のループアニメーション設定

:::


###### effects

**Type:** `ScatterLoopEffect[] | undefined`

:::note{title=説明}
散布図のループ効果

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
散布図の雰囲気アニメーション設定

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

**Type:** `XLinearAxis | undefined`

:::note{title=説明}
X軸



数値軸。X軸設定。X軸の位置、書式、スタイルなどを定義します。

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


:::

**例**





#### symbol

**Type:** `string | undefined`

:::note{title=説明}

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
Y軸



数値軸。Y軸設定。Y軸の位置、書式、スタイルなどを定義します。

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


:::

**例**





#### symbol

**Type:** `string | undefined`

:::note{title=説明}

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
垂直ガイド線



マウスがチャート上を移動したときに表示される垂直ガイド線



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
チャートのテーマ。テーマは優先度の低い機能設定で、すべてのチャートタイプに共通する一般設定と、単一チャートタイプに共通する設定を含みます



組み込みの light と dark の2種類のテーマがあります。ユーザーは Builder でテーマをカスタマイズできます



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


## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title=説明}
ポイントマークスタイル



ポイントマークスタイル設定。ポイントマークの色、枠線などを定義します。

グローバルスタイルまたは条件付きスタイル設定をサポートします

データフィルター




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
**例**




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
**例**




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=説明}




背景のストローク色















'red'











背景の角丸半径

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=説明}


:::

**例**
"売上高が1000を超えるデータ項目を強調表示"

"各地域で利益率が最も高いデータ項目を強調表示"



#### code

**Type:** `string`

:::note{title=説明}
演算子



\- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します

**例**






:::

**例**
売上高が1000を超えるデータ項目の sales フィールドを強調表示
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

各地域で利益率が最も高いデータ項目を強調表示
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

複数条件でフィルタリングされたデータ項目を強調表示
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
**例**




:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
**例**




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=説明}




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
注釈点



注釈点設定。選択したデータに基づいて、注釈点の位置、書式、スタイルなどを定義します。

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
**例**




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
**例**




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




背景のストローク色















'red'











背景の角丸半径

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=説明}


:::

**例**
"売上高が1000を超えるデータ項目を強調表示"

"各地域で利益率が最も高いデータ項目を強調表示"



#### code

**Type:** `string`

:::note{title=説明}
演算子



\- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します

**例**






:::

**例**
売上高が1000を超えるデータ項目の sales フィールドを強調表示
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

各地域で利益率が最も高いデータ項目を強調表示
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

複数条件でフィルタリングされたデータ項目を強調表示
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
**例**




:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
**例**




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=説明}




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
垂直注釈線



数値注釈線（平均線、最大値線、最小値線など）。垂直方向に表示され、注釈線の位置やスタイルなどを設定できます。X軸メジャーの平均線など、数値に対応する注釈線を描画する場合はこの設定を使用してください

:::


### xValue

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
水平注釈線



数値注釈線（平均線、最大値線、最小値線など）。垂直方向に表示され、注釈線の位置やスタイルなどを設定できます。Y軸メジャーの平均線など、数値に対応する注釈線を描画する場合はこの設定を使用してください

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
注釈領域



注釈領域設定。選択したデータに基づいて、注釈領域の位置、スタイルなどを定義します。

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
**例**




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
**例**




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




## linearRegressionLine

**Type:** `LinearRegressionLine | LinearRegressionLine[] | undefined`

:::note{title=説明}
線形回帰線



線形回帰線設定。線形回帰線のスタイルなどを含みます。

:::


### enable

**Type:** `boolean | undefined`

:::note{title=説明}
有効にするかどうか

:::

### color

**Type:** `string | undefined`

:::note{title=説明}
回帰線の色

回帰線の色を設定します。未設定の場合、チャートのメイン色がデフォルトで使用されます

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
回帰線の幅

回帰線の幅を設定します。単位はピクセルで、デフォルト値は1です

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=説明}
回帰線スタイル

回帰線のスタイルを設定します。実線、破線など。デフォルトは実線です

:::

### text

**Type:** `string | undefined`

:::note{title=説明}
回帰線ラベルテキスト

回帰線のラベルテキストを設定します。空文字列はラベルを表示しないことを意味します

:::

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



### confidenceIntervalVisible

**Type:** `boolean | undefined`

:::note{title=説明}
信頼区間を表示するかどうか

:::

### confidenceLevel

**Type:** `number | undefined`

:::note{title=説明}
信頼区間の値設定。デフォルトは95%信頼度です

:::

### confidenceIntervalColor

**Type:** `string | undefined`

:::note{title=説明}
信頼区間の色

:::

### confidenceIntervalOpacity

**Type:** `number | undefined`

:::note{title=説明}
信頼区間の不透明度

:::

**例**
0.5



### shadowBlur

**Type:** `number | undefined`

:::note{title=説明}
図形のぼかし効果の強度

:::

**例**
0



### shadowColor

**Type:** `string | undefined`

:::note{title=説明}
図形の影の色

:::

**例**
'#FFFFFF4D'



### shadowOffsetX

**Type:** `number | undefined`

:::note{title=説明}
影の水平オフセット距離

:::

**例**
0



### shadowOffsetY

**Type:** `number | undefined`

:::note{title=説明}
影の垂直オフセット距離

:::

**例**
1




## lowessRegressionLine

**Type:** `LowessRegressionLine | LowessRegressionLine[] | undefined`

:::note{title=説明}
局所加重回帰線設定項目



局所加重回帰線設定項目。局所加重回帰線のスタイルなどを含みます。

:::


### enable

**Type:** `boolean | undefined`

:::note{title=説明}
有効にするかどうか

:::

### color

**Type:** `string | undefined`

:::note{title=説明}
回帰線の色

回帰線の色を設定します。未設定の場合、チャートのメイン色がデフォルトで使用されます

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
回帰線の幅

回帰線の幅を設定します。単位はピクセルで、デフォルト値は1です

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=説明}
回帰線スタイル

回帰線のスタイルを設定します。実線、破線など。デフォルトは実線です

:::

### text

**Type:** `string | undefined`

:::note{title=説明}
回帰線ラベルテキスト

回帰線のラベルテキストを設定します。空文字列はラベルを表示しないことを意味します

:::

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



### confidenceIntervalVisible

**Type:** `boolean | undefined`

:::note{title=説明}
信頼区間を表示するかどうか

:::

### confidenceLevel

**Type:** `number | undefined`

:::note{title=説明}
信頼区間の値設定。デフォルトは95%信頼度です

:::

### confidenceIntervalColor

**Type:** `string | undefined`

:::note{title=説明}
信頼区間の色

:::

### confidenceIntervalOpacity

**Type:** `number | undefined`

:::note{title=説明}
信頼区間の不透明度

:::

**例**
0.5




## polynomialRegressionLine

**Type:** `PolynomialRegressionLine | PolynomialRegressionLine[] | undefined`

:::note{title=説明}
多項式回帰線



多項式回帰線設定。多項式の次数、回帰線のスタイルなどを含みます。

:::


### enable

**Type:** `boolean | undefined`

:::note{title=説明}
有効にするかどうか

:::

### color

**Type:** `string | undefined`

:::note{title=説明}
回帰線の色

回帰線の色を設定します。未設定の場合、チャートのメイン色がデフォルトで使用されます

:::

### degree

**Type:** `number | undefined`

:::note{title=説明}
多項式回帰の次数

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
回帰線の幅

回帰線の幅を設定します。単位はピクセルで、デフォルト値は1です

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=説明}
回帰線スタイル

回帰線のスタイルを設定します。実線、破線など。デフォルトは実線です

:::

### text

**Type:** `string | undefined`

:::note{title=説明}
回帰線ラベルテキスト

回帰線のラベルテキストを設定します。空文字列はラベルを表示しないことを意味します

:::

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



### confidenceIntervalVisible

**Type:** `boolean | undefined`

:::note{title=説明}
信頼区間を表示するかどうか

:::

### confidenceLevel

**Type:** `number | undefined`

:::note{title=説明}
信頼区間の値設定。デフォルトは95%信頼度です

:::

### confidenceIntervalColor

**Type:** `string | undefined`

:::note{title=説明}
信頼区間の色

:::

### confidenceIntervalOpacity

**Type:** `number | undefined`

:::note{title=説明}
信頼区間の不透明度

:::

**例**
0.5




## logisticRegressionLine

**Type:** `LogisticRegressionLine | LogisticRegressionLine[] | undefined`

:::note{title=説明}
ロジスティック回帰線



ロジスティック回帰線設定。ロジスティック回帰線のスタイルなどを含みます。

:::


### enable

**Type:** `boolean | undefined`

:::note{title=説明}
有効にするかどうか

:::

### color

**Type:** `string | undefined`

:::note{title=説明}
回帰線の色

回帰線の色を設定します。未設定の場合、チャートのメイン色がデフォルトで使用されます

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
回帰線の幅

回帰線の幅を設定します。単位はピクセルで、デフォルト値は1です

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=説明}
回帰線スタイル

回帰線のスタイルを設定します。実線、破線など。デフォルトは実線です

:::

### text

**Type:** `string | undefined`

:::note{title=説明}
回帰線ラベルテキスト

回帰線のラベルテキストを設定します。空文字列はラベルを表示しないことを意味します

:::

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



### confidenceIntervalVisible

**Type:** `boolean | undefined`

:::note{title=説明}
信頼区間を表示するかどうか

:::

### confidenceLevel

**Type:** `number | undefined`

:::note{title=説明}
信頼区間の値設定。デフォルトは95%信頼度です

:::

### confidenceIntervalColor

**Type:** `string | undefined`

:::note{title=説明}
信頼区間の色

:::

### confidenceIntervalOpacity

**Type:** `number | undefined`

:::note{title=説明}
信頼区間の不透明度

:::

**例**
0.5




## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=説明}
チャートでピボット機能またはメジャーグループが有効な場合に、ディメンション連動を有効にするかどうか

あるディメンション値にホバーしたとき、他のチャート内の同じディメンション値のデータを連動して強調表示します



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
言語



チャート言語設定。'zh\-CN' と 'en\-US' の2言語をサポートします。また intl.setLocale('zh\-CN') を呼び出して言語を設定できます

:::

