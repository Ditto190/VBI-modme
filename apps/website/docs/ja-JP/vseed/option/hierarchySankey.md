# HierarchySankey

:::info{title=エンコードマッピング}
階層サンキー図は次の視覚チャネルに対応しています:

`hierarchy`: 階層チャネル。`複数の次元`をサポートします

`size`: サイズチャネル。`1 つの指標`をサポートします

`label`: ラベルチャネル。`複数の次元`と`複数の指標`をサポートします

`tooltip`: ツールチップチャネル。`複数の次元`と`複数の指標`をサポートします

:::

:::note{title=説明}
階層サンキー図。階層的な流れデータを表示するために使用し、ツリー状ノードと流れのリンクで階層関係と流量の大きさを表します。

適用シーン:

\- 上流から下流への階層的な流れ関係を表示

\- ツリー構造における流量配分と経路伝達を強調

:::

:::warning{title=Warning}
データ要件:

\- 階層構造を構築するために少なくとも 1 つの次元フィールドが必要です

\- 流量の大きさをマッピングするために少なくとも 1 つの数値フィールド（指標）が必要です

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
データセット



TidyData 仕様に準拠し、集計済みのデータセットです。グラフのデータソースと構造を定義します

:::

**例**
[{region: '華北', province: '河北', value: 30}, {region: '華南', province: '広東', value: 70}]




## dimensions

**Type:** `HierarchyDimension[] | undefined`

:::note{title=説明}
次元



次元設定。階層構造を定義するために使用し、hierarchy / label / tooltip チャネルをサポートします

:::

**例**
[{id: 'region', alias: '地域'}, {id: 'province', alias: '省'}]




### id

**Type:** `string`

:::note{title=説明}
次元に対応するフィールド ID

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

**Type:** `"tooltip" | "label" | "hierarchy" | undefined`

:::note{title=説明}
次元をマッピングするチャネル

\- hierarchy: 複数の次元を階層チャネルへマッピングできます

\- label: 複数の次元をラベルチャネルへマッピングできます

\- tooltip: 複数の次元をツールチップチャネルへマッピングできます

:::

:::tip{title=Tip}
最初の次元は color チャネルへ直接マッピングされます。

:::


## measures

**Type:** `HierarchyMeasure[] | undefined`

:::note{title=説明}
指標



指標設定。流量の大きさを定義するために使用し、size / label / tooltip チャネルをサポートします

:::

**例**
[{id: 'value', alias: 'フロー量'}]




### id

**Type:** `string`

:::note{title=説明}
指標 ID。重複できません

:::

### alias

**Type:** `string | undefined`

:::note{title=説明}
指標の別名。重複できます。未指定の場合、alias は id になります
:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=説明}
自動数値フォーマット。デフォルトで有効で、最も高い優先度を持ちます

autoFormat=true の場合、numFormat のすべての設定を上書きします

有効にすると、チャートのラベルとツールチップは指標値と言語環境に基づいて適切なフォーマットを自動選択します

フォーマット規則: 10進数、compact notation 有効、小数部は最小0桁・最大2桁、自動丸め、ブラウザーの Intl.NumberFormat で実装

例:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K
:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=説明}
指標のカスタム数値フォーマット。label と tooltip に自動適用されます

注意: カスタムフォーマットを使うには autoFormat=false を明示的に設定してください。そうしないと autoFormat がこの設定を上書きします
:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=説明}
数値フォーマットタイプ。数値（10進数）、パーセント（%）、パーミル（‰）、科学表記をサポートします
:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマット比率。0にはできません
:::

**例**
\- 100000 は 10万 に変換, ratio:10000, symbol:"万"
\- 100000 は 10K に変換, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマット記号。例: %、‰
:::

**例**
\- 100000 は 10万 に変換, ratio:10000, symbol:"万"
\- 100000 は 10K に変換, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=説明}
数値フォーマットの桁区切り記号
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
数値フォーマットの小数桁。ブラウザー Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用します。significantDigits より優先度は低くなります
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
数値フォーマットの有効桁。ブラウザー Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用します。fractionDigits より優先度は高くなります
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
significantDigits と fractionDigits を同時に設定した場合の数値フォーマットの丸め優先度。ブラウザー Intl.NumberFormat を使用し、Intl.NumberFormat の roundingPriority と同じ規則に従います
:::

**例**
\- 1234.5678 は 1230 に変換, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 は 1234.5678 に変換, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
数値フォーマットの丸めモード。ブラウザー Intl.NumberFormat を使用し、Intl.NumberFormat の roundingMode と同じ規則に従います
:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=説明}
数値フォーマットタイプ。数値（10進数）、パーセント（%）、パーミル（‰）、科学表記をサポートします
:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマット比率。0にはできません
:::

**例**
\- 100000 は 10万 に変換, ratio:10000, symbol:"万"
\- 100000 は 10K に変換, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマット記号。例: %、‰
:::

**例**
\- 100000 は 10万 に変換, ratio:10000, symbol:"万"
\- 100000 は 10K に変換, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=説明}
数値フォーマットの桁区切り記号
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
数値フォーマットの小数桁。ブラウザー Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用します。significantDigits より優先度は低くなります
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
数値フォーマットの有効桁。ブラウザー Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用します。fractionDigits より優先度は高くなります
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
significantDigits と fractionDigits を同時に設定した場合の数値フォーマットの丸め優先度。ブラウザー Intl.NumberFormat を使用し、Intl.NumberFormat の roundingPriority と同じ規則に従います
:::

**例**
\- 1234.5678 は 1230 に変換, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 は 1234.5678 に変換, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
数値フォーマットの丸めモード。ブラウザー Intl.NumberFormat を使用し、Intl.NumberFormat の roundingMode と同じ規則に従います
:::

### encoding

**Type:** `"tooltip" | "label" | "size" | undefined`

:::note{title=説明}
指標をマッピングするチャネル

\- size: 指標をサイズチャネルへマッピングし、Treemap や Sunburst などのチャートで面積またはサイズを表示します。

\- label: 指標をラベルチャネルへマッピング

\- tooltip: 指標をツールチップチャネルへマッピング

:::

### parentId

**Type:** `string | undefined`

:::note{title=説明}
フラットな指標設定形式でツリー状の指標グループを構築します。parentId は親指標グループの id を指し、指標ツリーの構築に使用されます

:::

:::tip{title=Tip}
指標ツリーの設定方法は2つあります: 方法1は children で指標ツリーを直接設定する方法、方法2は parentId を持つフラットな指標リストを設定する方法です。この2つの方法は同時に使用できません

:::


## page

**Type:** `Page | undefined`

:::note{title=説明}




ページネーションに使用するフィールド名を指定します。次元である必要があります

:::


### field

**Type:** `string`

:::note{title=説明}
ページネーションフィールド。ページネーションに使うフィールド名を指定します。必ず次元である必要があります
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
離散カラースキーム。チャート内の異なる要素の色を定義します
:::

**例**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=説明}
線形グラデーションカラースキーム。チャート内の異なる要素の色を定義します
:::

**例**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=説明}
カラーマッピング。データ値を具体的な色へマッピングします
:::

**例**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=説明}
正負色設定。チャート内の正の値の色を定義します
:::

### negativeColor

**Type:** `string | undefined`

:::note{title=説明}
正負色設定。チャート内の負の値の色を定義します
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
ラベル機能を有効にするかどうか
:::

### wrap

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルを折り返すかどうか
:::

### showValue

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルに指標値を表示するかどうか

複数指標のシナリオでも値の矛盾を心配する必要はありません。描画に関連するすべての指標は `foldMeasures` で処理され、1つのデータ点を表す1つの指標に統合されるためです。

注意: encoding.label の優先度が高く、この設定は encoding.label には影響しません
:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルに指標値の割合を表示するかどうか

複数指標のシナリオでも値の矛盾を心配する必要はありません。描画に関連するすべての指標は `foldMeasures` で処理され、1つのデータ点を表す1つの指標に統合されるためです。

注意: encoding.label の優先度が高く、この設定は encoding.label には影響しません
:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルに次元ラベルを表示するかどうか

すべての次元ラベルを表示します

注意: encoding.label の優先度が高く、この設定は encoding.label には影響しません
:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=説明}
ラベル値を自動フォーマットするかどうか。autoFormat が true の場合、numFormat 設定は無効になります
:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=説明}
ラベル値のフォーマット設定。`measure` の `format` とマージされ、`measure` の `format` の優先度が高くなります。numFormat の優先度は autoFormat より低くなります
:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=説明}
数値フォーマットタイプ。数値（10進数）、パーセント（%）、パーミル（‰）、科学表記をサポートします
:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマット比率。0にはできません
:::

**例**
\- 100000 は 10万 に変換, ratio:10000, symbol:"万"
\- 100000 は 10K に変換, ratio:1000, symbol:"K"




#### symbol

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマット記号。例: %、‰
:::

**例**
\- 100000 は 10万 に変換, ratio:10000, symbol:"万"
\- 100000 は 10K に変換, ratio:1000, symbol:"K"




#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=説明}
数値フォーマットの桁区切り記号
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
数値フォーマットの小数桁。ブラウザー Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用します。significantDigits より優先度は低くなります
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
数値フォーマットの有効桁。ブラウザー Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用します。fractionDigits より優先度は高くなります
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
significantDigits と fractionDigits を同時に設定した場合の数値フォーマットの丸め優先度。ブラウザー Intl.NumberFormat を使用し、Intl.NumberFormat の roundingPriority と同じ規則に従います
:::

**例**
\- 1234.5678 は 1234.5678 に変換, significantDigits:3 (roundingPriority:morePrecision)




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
数値フォーマットの丸めモード。ブラウザー Intl.NumberFormat を使用し、Intl.NumberFormat の roundingMode と同じ規則に従います
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
マーク色に応じてラベルのフォント色を自動反転するかどうか
:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=説明}
ラベル位置
:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルの重なり回避を有効にするかどうか
:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=説明}
ラベルフィルター。デフォルトでは selectors 間の条件関係は OR です
:::


#### field

**Type:** `string`

:::note{title=説明}
次元フィールド。dimensions のいずれかの項目の id
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

\- in: 次元フィールドの値が value に含まれるデータ項目を選択します

\- not in: 次元フィールドの値が value に含まれないデータ項目を選択します
:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

\- in: 次元フィールドの値が value に含まれるデータ項目を選択します

\- not in: 次元フィールドの値が value に含まれないデータ項目を選択します

operator と同じです
:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
データ項目内の次元フィールド値を選択します。配列をサポートします
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=説明}
動的フィルター（AI生成コード実行）

AI が生成した JavaScript コードで複雑なデータフィルタリングロジックを実装します

主な機能:

\- 任意に複雑なデータフィルター条件をサポート

\- 組み込みユーティリティ関数を使ってデータ操作を実行

\- ブラウザー環境で安全に実行（Web Worker サンドボックス）

環境要件: ブラウザー環境のみ対応し、Node.js 環境では fallback を使用します

注意: selector と dynamicFilter は同時に使用できません。dynamicFilter の優先度が高くなります

チャート動的フィルター設定

AI が生成した JavaScript コードでチャートマーク（棒、点など）をフィルタリングします
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=説明}
ユーザーのフィルター要件説明（自然言語）
:::

**例**
"売上が1000を超える棒をハイライト"

"各地域で利益率が最も高い棒をハイライト"



#### code

**Type:** `string`

:::note{title=説明}
AI が生成した JavaScript フィルターコード

\- 組み込みユーティリティ関数のみ使用できます（_ または R からアクセス）

\- 入力パラメータ: data（配列）。各 item には行番号を示す __row_index フィールドが含まれます

\- 行インデックスとフィールドの組み合わせ配列を返す必要があります: Array<{ __row_index: number, field: string }>

\- __row_index は元データ項目の行番号、field はハイライト対象のフィールドを表します

\- 使用禁止: eval、Function、非同期操作、DOM API、ネットワークリクエスト
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
コード実行に失敗した場合、または環境が対応していない場合のフォールバック
:::


##### field

**Type:** `string`

:::note{title=説明}
次元フィールド。dimensions のいずれかの項目の id
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

\- in: 次元フィールドの値が value に含まれるデータ項目を選択します

\- not in: 次元フィールドの値が value に含まれないデータ項目を選択します
:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

\- in: 次元フィールドの値が value に含まれるデータ項目を選択します

\- not in: 次元フィールドの値が value に含まれないデータ項目を選択します

operator と同じです
:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
データ項目内の次元フィールド値を選択します。配列をサポートします
:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=説明}
動的フィルター実行結果（ランタイムフィールド）

prepare() 段階で書き込まれ、実行時は読み取り専用です
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
凡例機能を有効にするかどうか
:::

**例**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=説明}
凡例の境界線を有効にするかどうか
:::

:::warning{title=Warning}
離散凡例にのみ有効
:::

**例**




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




### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=説明}
凡例の形状
:::

:::warning{title=Warning}
離散凡例にのみ有効
:::

**例**




### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=説明}
凡例位置
:::

**例**




### maxSize

**Type:** `number | undefined`

:::note{title=説明}
凡例項目が多い場合の最大列数または最大行数

position が水平方向 (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr) の場合、maxSize は表示列数を制御します

position が垂直方向 (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb) の場合、maxSize は表示行数を制御します
:::

:::warning{title=Warning}
離散凡例にのみ有効
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
ツールチップを有効にするかどうか
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
