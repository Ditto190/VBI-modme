# Radar

:::info{title=推奨}
\- 推奨フィールド設定: `1` 個のメジャー、`1` 個のディメンション

\- データリシェイプ対応: 少なくとも `1` 個のメジャー、`0` 個のディメンション

:::

:::info{title=エンコーディングマッピング}
レーダーチャートは次の視覚チャネルをサポートします:

`angle`  : 角度チャネル。`複数のディメンション`をサポートし、ディメンション値を角度軸にマッピングします

`radius` : 半径チャネル。`複数のメジャー`をサポートし、メジャー値を半径軸にマッピングします

`color`  : 色チャネル。`複数のディメンション`または`1つのメジャー`をサポートします。ディメンション色はデータ系列の区別に、メジャー色はメジャー値を図形色へ線形マッピングするために使用されます

`tooltip`: ツールチップチャネル。`複数のディメンション`と`複数のメジャー`をサポートし、データ点にマウスオーバーしたときに表示されます

`label`  : ラベルチャネル。`複数のディメンション`と`複数のメジャー`をサポートし、データ点上にデータラベルを表示します

:::

:::note{title=説明}
レーダーチャート。多軸座標系で各ディメンションの値分布を表示し、多次元データの比較分析に適しています

適用シーン:

\- 多次元データの総合的なパフォーマンス比較

\- 複数オブジェクトの複数指標における性能評価

\- カテゴリデータの多次元特徴表示

:::

:::warning{title=Warning}
データ要件:

\- 少なくとも1つの数値フィールド（メジャー）

\- 最初のディメンションはレーダーチャートの各ディメンション軸になり、他のディメンションは異なる系列として比較されます

\- 複数のメジャーをそれぞれ異なる系列として表示できます

デフォルトで有効な機能:

\- 凡例、レーダー座標系、データラベル、ツールチップ、数値スケーリングはデフォルトで有効です

:::


## chartType

**Type:** `"radar"`

:::note{title=説明}
レーダーチャート



レーダーチャート。多軸座標系で多次元データの比較関係を表示します

:::

**例**
'radar'




## dataset

**Type:** `Record[]`

:::note{title=説明}
データセット



TidyData仕様に準拠し、集計済みのデータセット。チャートのデータソースと構造を定義します。ユーザー入力データを処理する必要はありません。VSeedには強力なデータリシェイプ機能があり、自動的に変換します。レーダーチャートのデータは最終的に2つのディメンションと1つのメジャーに変換されます。

:::

**例**
[{month:'1月', value:100}, {month:'2月', value:150}, {month:'3月', value:120}]




## dimensions

**Type:** `RadarDimension[] | undefined`

:::note{title=説明}
最初のディメンションはX軸にマッピングされ、残りのディメンションはメジャー名（複数メジャーがある場合）と結合されて凡例項目として表示されます。



レーダーチャートの最初のディメンションは角度軸にマッピングされ、残りのディメンションはメジャー名（複数メジャーがある場合）と統合され、凡例項目として表示されます。

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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "angle" | undefined`

:::note{title=説明}
ディメンションをマッピングするチャネル

\- angle: 複数のディメンションを角度チャネルにマッピングできます

\- color: 複数ディメンションを色チャネルにマッピングできます

\- detail: 複数ディメンションを詳細チャネルにマッピングできます

\- tooltip: 複数ディメンションをツールチップチャネルにマッピングできます

\- label: 複数ディメンションをラベルチャネルにマッピングできます

\- row: 複数ディメンションを行チャネルにマッピングできます

\- column: 複数ディメンションを列チャネルにマッピングできます

:::


## measures

**Type:** `RadarMeasure[] | undefined`

:::note{title=説明}
メジャー



レーダーチャートのメジャーは自動的に1つのメジャーに統合され、半径軸にマッピングされます。複数のメジャーがある場合、メジャー名は他のディメンションと統合され、凡例項目として表示されます。

:::

**例**
[{id: 'value', alias: '値'}]




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

**Type:** `"color" | "tooltip" | "label" | "radius" | undefined`

:::note{title=説明}
メジャーをマッピングするチャネル

\- radius: メジャーにマッピングされる半径

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


## page

**Type:** `Page | undefined`

:::note{title=説明}
ページング設定。ページングのフィールド名を指定します。ディメンションである必要があります

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
ラベル



ラベル設定。データラベルの位置、書式、スタイルなどを定義します。

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
凡例



凡例設定。凡例の位置、書式、スタイルなどを定義します。

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


## animation

**Type:** `RadarAnimation | undefined`

:::note{title=説明}
アニメーション設定



チャートアニメーション設定。選択可能な効果はチャートタイプによって制約されます

:::


### enable

**Type:** `boolean | undefined`

:::note{title=説明}
レーダーチャートアニメーションを有効にするかどうか

:::

### params

**Type:** `RadarAnimationParams | undefined`

:::note{title=説明}
レーダーチャートアニメーションパラメータ

:::


#### appear

**Type:** `RadarAppearAnimation | undefined`

:::note{title=説明}
レーダーチャートの入場アニメーション設定

:::


##### effects

**Type:** `("radial" | "scale")[] | undefined`

:::note{title=説明}
レーダーチャートの入場効果。放射状とズームのアニメーションをサポートします

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

**Type:** `RadarUpdateAnimation | undefined`

:::note{title=説明}
レーダーチャートの更新アニメーション設定

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=説明}
レーダーチャートの更新効果。成長アニメーションをサポートします

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

**Type:** `RadarAnimationLoop | undefined`

:::note{title=説明}
レーダーチャートのループアニメーション設定

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

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=説明}
レーダーチャートの雰囲気アニメーション設定

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


## theme

**Type:** `Theme | undefined`

:::note{title=説明}
チャートのテーマ。テーマは優先度の低い機能設定で、すべてのチャートタイプに共通する一般設定と、単一チャートタイプに共通する設定を含みます



組み込みの light と dark の2種類のテーマがあります。ユーザーは Builder でテーマをカスタマイズできます



演算子



\- not in: ディメンションフィールド値が値リストに含まれないデータ項目を選択します。

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




## areaStyle

**Type:** `AreaStyle | AreaStyle[] | undefined`

:::note{title=説明}
エリアマークスタイル設定。エリアマークの色、不透明度、枠線などを定義します。

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

### areaVisible

**Type:** `boolean | undefined`

:::note{title=説明}
エリアマークを表示するかどうか



エリアマークを表示するかどうか

:::

### areaColor

**Type:** `string | undefined`

:::note{title=説明}
エリアマークの色



エリアマークの色

:::

### areaColorOpacity

**Type:** `number | undefined`

:::note{title=説明}
エリアマーク色の不透明度



エリアマーク色の不透明度

:::


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=説明}
言語



チャート言語設定。'zh\-CN' と 'en\-US' の2言語をサポートします。また intl.setLocale('zh\-CN') を呼び出して言語を設定できます

:::
