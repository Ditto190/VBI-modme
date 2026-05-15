# RacePie

:::note{title=説明}
動的円グラフ (Race Pie Chart)

時間とともに変化するデータの比率関係を表示するのに適しており、扇形の面積で各カテゴリの比率を表します

適用シーン:

\- カテゴリデータの比率分布が時間とともに変化する様子を表示する場合

\- 時間ディメンションにおけるデータの全体と部分の関係の変化を強調する場合

\- 総量に占める各カテゴリの比率変動を観察する場合

:::

:::note{title=Note}
動的円グラフ:

\- 角度はメジャー値に、色はディメンション値にマッピングされます

\- プレイヤーで時間ディメンションを制御し、比率の変化を動的に表示できます

\- 扇形の面積はデータの変化に応じて動的に調整されます

:::


## chartType

**Type:** `"racePie"`

:::note{title=説明}
動的円グラフ。時間とともに変化するデータの比率関係を表示するのに適しています

:::


## dataset

**Type:** `Record[]`

:::note{title=説明}
データソース

:::


## dimensions

**Type:** `RacePieDimension[] | undefined`

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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "player" | undefined`

:::note{title=説明}
ディメンションをマッピングするチャネル

\- color: 複数ディメンションを色チャネルにマッピングできます

\- detail: 複数ディメンションを詳細チャネルにマッピングできます

\- tooltip: 複数のディメンションをツールチップチャネルへマッピングできます

\- label: 複数のディメンションをラベルチャネルへマッピングできます

\- row: 複数ディメンションを行チャネルにマッピングできます

\- column: 複数ディメンションを列チャネルにマッピングできます

\- player: 複数のディメンションをプレイヤーチャネルへマッピングできます

:::


## measures

**Type:** `PieMeasure[] | undefined`

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




## player

**Type:** `Player | undefined`

:::note{title=説明}
プレイヤー設定。時間ディメンションを指定するために使用され、動的円グラフの中心的な設定です



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


## backgroundColor

**Type:** `BackgroundColor`

:::note{title=説明}

:::


## color

**Type:** `Color | undefined`

:::note{title=説明}
色設定

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
ラベル設定

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
凡例設定

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


## theme

**Type:** `Theme | undefined`

:::note{title=説明}
テーマ設定



const maxItems = _.map(grouped, group =>



_.map(maxItems, item => [

:::


### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=説明}
言語設定

:::
