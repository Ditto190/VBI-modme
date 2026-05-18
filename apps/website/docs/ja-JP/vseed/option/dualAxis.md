# DualAxis

:::info{title=推奨}
\- 推奨フィールド構成: `2` 個の指標、`2` 個の次元

\- データリシェイプをサポート: 少なくとも `1` 個の指標、`0` 個の次元

:::

:::info{title=エンコードマッピング}
双軸グラフは次の視覚チャネルに対応しています:

`xAxis`          : X軸チャネル、`複数の次元`をサポートし、次元値に基づいてX軸へマッピングします

`primaryYAxis`   : 主Y軸チャネル、`複数の指標`をサポートし、指標を主軸へマッピングします

`secondaryYAxis` : 副Y軸チャネル、`複数の指標`をサポートし、指標を副軸へマッピングします

`detail`         : 詳細チャネル、`複数の次元`をサポートし、同じ色系列内でより細かい粒度のデータを表示するときに使用します

`color`          : 色チャネル、`複数の次元`または`1つの指標`をサポートします。次元色はデータ系列の区別に、指標色は指標値を図形色へ線形マッピングするために使用します

`tooltip`        : ツールチップチャネル、`複数の次元`と`複数の指標`をサポートし、データ点にマウスホバーしたときに表示されます

`label`          : ラベルチャネル、`複数の次元`と`複数の指標`をサポートし、データ点上にデータラベルを表示します

:::

:::note{title=説明}
双軸グラフ。異なる規模または異なる単位の2つの指標の比較関係を表示するのに適しており、主座標軸と副座標軸を含みます

適用シーン:

\- 規模の異なる指標の比較分析

\- 相関する指標のトレンド比較

\- 数値と成長率などの複合指標を同時に表示する必要がある場合

\- 異なるチャートタイプの組み合わせをサポートします（例: 折れ線グラフ + 棒グラフ / 折れ線グラフ + 面グラフ / 面グラフ + 棒グラフ）
:::

:::warning{title=注意}
データ要件:

- 少なくとも 1 つの指標フィールド

\- 指標グループに対応します。第1グループの指標は左側の主軸に、第2グループの指標は右側の副軸に配置されます

- 最初の次元はX軸に配置され、その他の次元は（複数の指標が存在する場合）指標名と結合されて凡例項目になります。

\- 2つの指標フィールドグループを左右のY軸へ個別にマッピングできます。同じ指標グループ内の項目は自動的に1つの指標として統合されます

デフォルトで有効な機能:

\- 座標軸、凡例、データラベル、ツールチップはデフォルトで有効です

:::


## chartType

**Type:** `"dualAxis"`

:::note{title=説明}
双軸グラフ。異なる桁を持つ2つの指標の比較関係を表示する複合チャートです

:::

**例**
'dualAxis'




## dataset

**Type:** `Record[]`

:::note{title=説明}
TidyData 仕様に準拠した集計済みデータセットで、チャートのデータソースと構造を定義します。ユーザー入力データセットは事前処理不要です。VSeed の強力なデータリシェイプ機能が自動的に整形を行います。柱状グラフのデータは最終的に2つの次元と1つの指標に変換されます。

:::

**例**
[{category:'A', value:100}, {category:'B', value:200}]




## dimensions

**Type:** `ColumnDimension[] | undefined`

:::note{title=説明}
柱状グラフの最初の次元はX軸にマッピングされます。残りの次元は指標名（複数指標が存在する場合）と結合され、凡例項目として表示されます。

:::

**例**
[{id: "category", alias: "category"}]




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

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=説明}
次元をマッピングするチャネル

\- xAxis: 複数の次元をX軸にマッピングできます

\- color: 複数の次元を色チャネルにマッピングできます

\- detail: 複数の次元を詳細チャネルにマッピングできます

\- tooltip: 複数の次元をツールチップチャネルにマッピングできます

\- label: 複数の次元をラベルチャネルにマッピングできます

\- row: 複数の次元を行チャネルにマッピングできます

\- column: 複数の次元を列チャネルにマッピングできます

:::


## measures

**Type:** `DualAxisMeasure[] | undefined`

:::note{title=説明}
双軸グラフの指標

`encoding` で `primaryYAxis` と `secondaryYAxis` にマッピングされた指標について、

`parentId` プロパティを設定して指標をグループ化できます。異なるグループの指標は別々のサブチャートに表示されます。

また、`chartType` プロパティを設定して、異なる指標グループのチャートタイプを指定できます。
:::

**例**
[{ id: 'value', encoding: 'primaryYAxis' }, { id: 'growth', encoding: 'secondaryYAxis' }]




### id

**Type:** `string`

:::note{title=説明}
指標ID。重複できません

:::

### alias

**Type:** `string | undefined`

:::note{title=説明}
指標の別名。重複可能です。未設定の場合、alias は id になります

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=説明}
数値の自動フォーマット。デフォルトで有効で、最優先です

autoFormat=true の場合、numFormat のすべての設定を上書きします

有効にすると、チャートのデータラベルとツールチップは指標値と言語環境に応じて適切なフォーマットを自動選択します

フォーマット規則: 10進数値で compact notation を有効にし、小数部は最小0桁、最大2桁、自動丸めを行い、ブラウザの Intl.NumberFormat 実装を使用します

例:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=説明}
指標のカスタム数値フォーマット。label と tooltip に自動適用されます

注意: カスタムフォーマットを使うには autoFormat=false を明示する必要があります。そうしないと autoFormat がこの設定を上書きします

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=説明}
数値フォーマットのタイプ。number（10進数）、percent（%）、permille（‰）、scientific（科学表記）に対応します

:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの倍率。0にはできません

:::

**例**
\- 100000 は 10万 に変換, ratio:10000, symbol:"万"
\- 100000 は 10K に変換, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマットの記号。例: %, ‰

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
数値フォーマットの小数桁数。ブラウザの Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用します。significantDigits より優先度は低くなります

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
数値フォーマットの有効数字。ブラウザの Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用します。fractionDigits より優先度が高くなります

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
significantDigits と fractionDigits の両方が設定された場合の数値フォーマットの丸め優先度。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingPriority と同じ規則に従います

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
数値フォーマットのタイプ。number（10進数）、percent（%）、permille（‰）、scientific（科学表記）に対応します

:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの倍率。0にはできません

:::

**例**
\- 100000 は 10万 に変換, ratio:10000, symbol:"万"
\- 100000 は 10K に変換, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマットの記号。例: %, ‰

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
数値フォーマットの小数桁数。ブラウザの Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用します。significantDigits より優先度は低くなります

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
数値フォーマットの有効数字。ブラウザの Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用します。fractionDigits より優先度が高くなります

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
significantDigits と fractionDigits の両方が設定された場合の数値フォーマットの丸め優先度。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingPriority と同じ規則に従います

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

**Type:** `"color" | "tooltip" | "label" | "primaryYAxis" | "secondaryYAxis" | undefined`

:::note{title=説明}
- secondaryYAxis: 指標が副Y軸にマッピングされます。

数値フォーマットの有効数字。ブラウザの Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用します。fractionDigits より優先度が高くなります

\- secondaryYAxis: 指標がマッピングされる副Y軸

significantDigits と fractionDigits の両方が設定された場合の数値フォーマットの丸め優先度。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingPriority と同じ規則に従います

\- label: 指標がラベルチャネルにマッピングされます

数値フォーマットの丸めモード。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingMode と同じ規則に従います

:::

### parentId

**Type:** `string | undefined`

:::note{title=説明}
フラットな指標設定形式でツリー状の指標グループを構築します。parentId は親指標グループの id を指し、指標ツリーの構築に使います

:::

:::tip{title=ヒント}
指標ツリーの設定方法は2つあります。方法1は children を持つ指標ツリーを直接設定すること、方法2は parentId を持つフラットな指標リストを設定することです。この2つは同時に使用できません

:::


### chartType

**Type:** `"area" | "column" | "areaPercent" | "columnParallel" | "columnPercent" | "line" | "scatter" | undefined`

:::note{title=説明}
双軸グラフ内でこの指標のチャートタイプを設定します。双軸グラフのみに適用されます

\- color: color チャネルにマッピングされる 指標

\- label: label チャネルにマッピングされる指標

\- tooltip: tooltip チャネルにマッピングされる指標

フラットな指標設定形式でツリー状の指標グループを構築します。parentId は親指標グループの id を指し、指標ツリーの構築に使います

指標ツリーの設定方法は2つあります。方法1は children を持つ指標ツリーを直接設定すること、方法2は parentId を持つフラットな指標リストを設定することです。この2つは同時に使用できません

\- areaPercent: 百分比面グラフ

\- scatter: 散布図

:::


## page

**Type:** `Page | undefined`

:::note{title=説明}
ページネーション設定。ページネーションに使用するフィールド名を指定します。このフィールドは次元である必要があります。

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




## alignTicks

**Type:** `boolean | boolean[] | undefined`

:::note{title=説明}
双軸グラフの2本の軸の目盛りを揃えるかどうかを定義します。`指標s` が複数グループある場合、`alignTicks` は配列として設定でき、各項目が1つの双軸グラフの目盛りを揃えるかどうかに対応します。

:::

**例**
{"chartType":"dualAxis","dataset":[{"date":"2019","profit":10,"sales":100},{"date":"2020","profit":30,"sales":200},{"date":"2021","profit":30,"sales":300},{"date":"2022","profit":50,"sales":500}],"alignTicks":[false,true],"dual指標":[{"primary指標":[{"id":"profit"}],"secondary指標":[{"id":"sales"}]},{"primary指標":[{"id":"profit"}],"secondary指標":[{"id":"sales"}]}]}




## primaryYAxis

**Type:** `YLinearAxis | YLinearAxis[] | undefined`

:::note{title=説明}
双軸グラフの主Y軸設定。主Y軸の位置やスタイルなどを定義します。`指標s` が複数グループある場合、`primaryYAxis` は配列として設定でき、各項目が1つの双軸グラフの主Y軸に対応します。

:::


### visible

**Type:** `boolean | undefined`

:::note{title=説明}
グリッド線タイプ

:::

### min

**Type:** `number | undefined`

:::note{title=説明}
Axis line width

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=説明}
Y軸目盛

:::

### log

**Type:** `boolean | undefined`

:::note{title=説明}
対数軸を使用するかどうか。数値軸にのみ適用されます

:::

### logBase

**Type:** `number | undefined`

:::note{title=説明}
アニメーションのイージング関数。

:::

### nice

**Type:** `boolean | undefined`

:::note{title=説明}
Y軸（カテゴリ軸）設定。Y軸を定義し、位置、フォーマット、スタイルなどを含みます。

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=説明}
X軸アニメーション設定

:::

### zero

**Type:** `boolean | undefined`

:::note{title=説明}
数値軸（Y軸）設定。チャートのY軸を定義し、位置、フォーマット、スタイルなどを含みます。

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=説明}
数値軸の目盛ラベルを自動フォーマットするかどうか。数値軸にのみ適用されます。autoFormat が true の場合、numFormat は無視されます。

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=説明}
数値軸の数値フォーマット。数値軸にのみ有効で、autoFormat より優先度は低くなります

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=説明}
数値フォーマットのタイプ。number（10進数）、percent（%）、permille（‰）、scientific（科学表記）に対応します

:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの倍率。0にはできません

:::

**例**
- 100000 は 10K に変換, ratio:1000, symbol:"K"
数値フォーマットの接尾辞



#### symbol

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマットの記号。例: %, ‰

:::

**例**
- 100000 は 10K に変換, ratio:1000, symbol:"K"
数値フォーマットの接尾辞



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=説明}
ラベル値のフォーマット設定。`measure` の `format` とマージされ、`measure` の `format` の優先度が高くなります。numFormat の優先度は autoFormat より低くなります

:::

#### suffix

**Type:** `string | undefined`

:::note{title=説明}
operator: 'not in',

:::

#### prefix

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマットの桁区切り

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの小数桁数。ブラウザの Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用します。significantDigits より優先度は低くなります

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
数値フォーマットの有効数字。ブラウザの Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用します。fractionDigits より優先度が高くなります

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
数値フォーマットの桁区切り

:::

**例**
\- 1234.5678 は次に変換されます: 1230, significantDigits:3 (roundingPriority:lessPrecision)
ラベルのフォントサイズ。



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
数値フォーマットのタイプ。number（10進数）、percent（%）、permille（‰）、scientific（科学表記）に対応します

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=説明}
数値フォーマットの小数桁数。ブラウザの Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用します。significantDigits より優先度は低くなります

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}
カテゴリ軸に直接適用されるカスタムソート順

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマットの有効数字。ブラウザの Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用します。fractionDigits より優先度が高くなります

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=説明}
  orderBy: 'profit',

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=説明}
selector = {

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=説明}
  order: 'asc',

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=説明}
Background padding

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}
数値フォーマットの小数桁数。ブラウザの Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用します。significantDigits より優先度は低くなります

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマットの有効数字。ブラウザの Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用します。fractionDigits より優先度が高くなります

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
\- `multiple`: 複数選択モード。複数のブラシ範囲を同時に存在させることができます

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=説明}
AI が生成した JavaScript フィルターコード

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルフィルタリング。セレクタ間のデフォルト関係は Or です

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=説明}
数値フォーマットの丸めモード。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingMode と同じ規則に従います

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=説明}
ラベルのフォントサイズ

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=説明}
グリッド線タイプ

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=説明}
AI が生成した JavaScript フィルターコード

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}
\- 1234.5678 は 1234.6 に変換されます。significantDigits:5 (roundingMode:halfCeil)

:::

#### titleText

**Type:** `string | undefined`

:::note{title=説明}
sort order, optional values 'asc' or 'desc'

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=説明}
\- 1234.5678 は 1234.5678 に変換されます。significantDigits:3 (roundingPriority:morePrecision)

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットのタイプ。number（10進数）、percent（%）、permille（‰）、scientific（科学表記）に対応します

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの倍率。0にはできません

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=説明}
Includes built-in `light` and `dark` themes. Custom themes can be added via `registerTheme`.

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
- not in: 次元フィールド値が `value` 配列に含まれないデータ項目を選択します。

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=説明}
Background padding

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=説明}
数値フォーマットの桁区切り

:::


#### duration

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの接尾辞

:::

#### easing

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマットの丸めモード。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingMode と同じ規則に従います

:::


## secondaryYAxis

**Type:** `YLinearAxis | YLinearAxis[] | undefined`

:::note{title=説明}
双軸グラフの副Y軸設定。副Y軸の位置やスタイルなどを定義します。`指標s` が複数グループある場合、`secondaryYAxis` は配列として設定でき、各項目が1つの双軸グラフの副Y軸に対応します。

:::


### visible

**Type:** `boolean | undefined`

:::note{title=説明}
グリッド線タイプ

:::

### min

**Type:** `number | undefined`

:::note{title=説明}
Axis line width

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=説明}
Y軸目盛

:::

### log

**Type:** `boolean | undefined`

:::note{title=説明}
対数軸を使用するかどうか。数値軸にのみ適用されます

:::

### logBase

**Type:** `number | undefined`

:::note{title=説明}
アニメーションのイージング関数。

:::

### nice

**Type:** `boolean | undefined`

:::note{title=説明}
Y軸（カテゴリ軸）設定。Y軸を定義し、位置、フォーマット、スタイルなどを含みます。

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=説明}
X軸アニメーション設定

:::

### zero

**Type:** `boolean | undefined`

:::note{title=説明}
数値軸（Y軸）設定。チャートのY軸を定義し、位置、フォーマット、スタイルなどを含みます。

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=説明}
数値軸の目盛ラベルを自動フォーマットするかどうか。数値軸にのみ適用されます。autoFormat が true の場合、numFormat は無視されます。

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=説明}
数値軸の数値フォーマット。数値軸にのみ有効で、autoFormat より優先度は低くなります

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=説明}
数値フォーマットのタイプ。number（10進数）、percent（%）、permille（‰）、scientific（科学表記）に対応します

:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの倍率。0にはできません

:::

**例**
- 100000 は 10K に変換, ratio:1000, symbol:"K"
数値フォーマットの接尾辞



#### symbol

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマットの記号。例: %, ‰

:::

**例**
- 100000 は 10K に変換, ratio:1000, symbol:"K"
数値フォーマットの接尾辞



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
数値フォーマットのタイプ。number（10進数）、percent（%）、permille（‰）、scientific（科学表記）に対応します

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの小数桁数。ブラウザの Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用します。significantDigits より優先度は低くなります

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
数値フォーマットの有効数字。ブラウザの Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用します。fractionDigits より優先度が高くなります

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
数値フォーマットの桁区切り

:::

**例**
\- 1234.5678 は次に変換されます: 1230, significantDigits:3 (roundingPriority:lessPrecision)
ラベルのフォントサイズ。



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
数値フォーマットの接頭辞

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=説明}
数値フォーマットの小数桁数。ブラウザの Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用します。significantDigits より優先度は低くなります

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}
カテゴリ軸に直接適用されるカスタムソート順

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=説明}
sort order, optional values 'asc' or 'desc'

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=説明}
  orderBy: 'profit',

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=説明}
significantDigits と fractionDigits の両方が設定された場合の数値フォーマットの丸め優先度。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingPriority と同じ規則に従います

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=説明}
コード実行に失敗した場合、または環境が対応していない場合のフォールバック方案

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=説明}
Background padding

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマットの接頭辞

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
\- 100000 は 10万 に変換, ratio:10000, symbol:"万"

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=説明}
  order: 'asc',

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
ラベルのフォントサイズ

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=説明}
ラベルのフォントウェイト

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=説明}
Background padding

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}
\- 1234.5678 は 1234.6 に変換されます。significantDigits:5 (roundingMode:halfCeil)

:::

#### titleText

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマットの丸めモード。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingMode と同じ規則に従います

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=説明}
\- 1234.5678 は 1234.5678 に変換されます。significantDigits:3 (roundingPriority:morePrecision)

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットのタイプ。number（10進数）、percent（%）、permille（‰）、scientific（科学表記）に対応します

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの倍率。0にはできません

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=説明}
Includes built-in `light` and `dark` themes. Custom themes can be added via `registerTheme`.

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマットの記号。例: %, ‰

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=説明}
- not in: 次元フィールド値が `value` 配列に含まれないデータ項目を選択します。

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=説明}
Background padding

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=説明}
数値フォーマットの桁区切り

:::


#### duration

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの接尾辞

:::

#### easing

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマットの接頭辞

:::


## xAxis

**Type:** `XBandAxis | undefined`

:::note{title=説明}
X軸カテゴリ軸設定。チャートのX軸を定義し、位置、フォーマット、スタイル、および関連設定を含みます。

:::


### visible

**Type:** `boolean | undefined`

:::note{title=説明}
グリッド線タイプ

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=説明}
X軸アニメーション設定

:::

### zero

**Type:** `boolean | undefined`

:::note{title=説明}
数値軸（Y軸）設定。チャートのY軸を定義し、位置、フォーマット、スタイルなどを含みます。

:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=説明}
order: 'asc'

:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=説明}
軸ラベルの自動非表示間隔。2つのラベルの間隔が autoHideGap より小さい場合、重なったラベルは自動的に非表示になります。カテゴリ軸にのみ適用されます。

Y軸、数値軸、Y軸設定。チャートのY軸を定義し、位置、フォーマット、スタイルなどを含みます。

When autoHide is disabled, use sampling and configure it through minGap.

:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=説明}
軸ラベルの自動回転。ラベル幅が軸の長さを超えると、ラベルは自動的に回転します。カテゴリ軸にのみ適用されます。

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=説明}
'dark'

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=説明}
軸ラベルの自動省略。ラベル幅が軸の長さを超えると、はみ出した部分は省略記号で表示され、ホバー時に完全なラベルが表示されます。カテゴリ軸にのみ適用されます。

:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=説明}
軸ラベル自動省略の最大長。ラベルテキストがこの長さを超えると省略記号で表示され、ホバー時に完全なラベルが表示されます。カテゴリ軸にのみ適用されます。

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=説明}
\- orderBy:'date'

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}
カテゴリ軸に直接適用されるカスタムソート順

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
ラベルの回転角度

:::
### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=説明}
X 軸線

:::
#### visible

**Type:** `boolean | undefined`

:::note{title=説明}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=説明}
ラベルのフォントサイズ

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
ラベルのフォントウェイト

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=説明}
X 軸目盛り

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
数値フォーマットの小数桁数。ブラウザの Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用します。significantDigits より優先度は低くなります

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=説明}
\- 1234.5678 は 1234.5678 に変換されます。fractionDigits:4 (roundingMode:halfCeil)

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=説明}
X 軸タイトル

:::
#### visible

**Type:** `boolean | undefined`

:::note{title=説明}
\- 1234.5678 は 1234.6 に変換されます。significantDigits:5 (roundingMode:halfCeil)

:::

#### titleText

**Type:** `string | undefined`

:::note{title=説明}
sort order, optional values 'asc' or 'desc'

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=説明}
\- 1234.5678 は 1234.5678 に変換されます。significantDigits:3 (roundingPriority:morePrecision)

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの丸めモード。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingMode と同じ規則に従います

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=説明}
X軸目盛ラベル

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=説明}
Includes built-in `light` and `dark` themes. Custom themes can be added via `registerTheme`.

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
- not in: 次元フィールド値が `value` 配列に含まれないデータ項目を選択します。

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=説明}
グリッド線タイプ

:::
### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=説明}
X軸アニメーション設定

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


## backgroundColor

**Type:** `BackgroundColor`

:::note{title=説明}
チャートの背景色。色文字列を指定でき、デフォルトは透明背景です。例: 'red'、'blue'。hex、rgb、rgba（例: '#ff0000'、'rgba(255,0,0,0.5)'）も指定できます。

:::


## color

**Type:** `Color | undefined`

:::note{title=説明}
チャートの配色を定義する色設定。色リスト、色マッピング、カラーグラデーションを含みます。

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=説明}
チャート内の異なる要素の色を定義する離散カラースキーム

:::

**例**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=説明}
チャート内の異なる要素の色を定義する線形グラデーションカラースキーム

:::

**例**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=説明}
データ値を特定の色にマッピングする色マッピング

:::

**例**
{
 'sales': 'blue',
}
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
チャートのデータラベル設定。位置、フォーマット、スタイルを含みます。

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

複数指標のシーンでは値の衝突を心配する必要はありません。描画に関連するすべての指標は `foldMeasures` 処理を通り、単一データ点を表す1つの指標にマージされます

注意: encoding の label は優先度が高いため、この設定は encoding の label には影響しません

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルに指標値の割合を表示するかどうか

複数指標のシーンでは値の衝突を心配する必要はありません。描画に関連するすべての指標は `foldMeasures` 処理を通り、単一データ点を表す1つの指標にマージされます

注意: encoding の label は優先度が高いため、この設定は encoding の label には影響しません

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=説明}
ラベルに次元ラベルを表示するかどうか

すべての次元ラベルを表示します

注意: encoding の label は優先度が高いため、この設定は encoding の label には影響しません

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=説明}
ラベル値を自動フォーマットするかどうか。autoFormat が true の場合、numFormat 設定は無視されます

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=説明}
ラベル値のフォーマット設定。`measure` の `format` とマージされ、`measure` の `format` の優先度が高くなります。numFormat の優先度は autoFormat より低くなります

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=説明}
数値フォーマットのタイプ。number（10進数）、percent（%）、permille（‰）、scientific（科学表記）に対応します

:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
数値フォーマットの倍率。0にはできません

:::

**例**
\- 100000 は 10万 に変換, ratio:10000, symbol:"万"
\- 100000 は 10K に変換, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=説明}
数値フォーマットの記号。例: %, ‰

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
数値フォーマットの小数桁数。ブラウザの Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用します。significantDigits より優先度は低くなります

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
数値フォーマットの有効数字。ブラウザの Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用します。fractionDigits より優先度が高くなります

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
significantDigits と fractionDigits の両方が設定された場合の数値フォーマットの丸め優先度。ブラウザの Intl.NumberFormat を使用し、Intl.NumberFormat の roundingPriority と同じ規則に従います

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
ラベルの枠線色

:::

### labelColor

**Type:** `string | undefined`

:::note{title=説明}
ラベルのフォント色

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=説明}
要素の色に基づいてフォント色を自動反転するかどうか

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
ラベルフィルタリング。セレクタ間のデフォルト関係は Or です

:::


#### field

**Type:** `string`

:::note{title=説明}
次元フィールド。次元項目のID

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

4

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
次元フィールドの値。配列に対応します

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=説明}
アニメーションフィルタ（AI生成コード実行）



AI生成の JavaScript コードで複雑なデータフィルタリングロジックを実装します



主な機能:

\- 任意の複雑なデータフィルタリング条件に対応します

\- データ操作用の組み込みユーティリティ関数を使用します

\- ブラウザ環境（Web Worker サンドボックス）で安全に実行します



環境要件: ブラウザ環境のみ対応します。Node.js 環境ではフォールバックを使用します



注意: selector と dynamicFilter は同時に使用できません。dynamicFilter の優先度が高くなります



チャートのアニメーションフィルタ設定



AI生成の JavaScript コードでチャートマーカー（棒、点など）のフィルタリングを実装します

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=説明}
ユーザーのフィルタリング要件説明（自然言語）

:::

**例**
\- Supports any complex data filtering conditions

\- Uses built-in utility functions for data operations



#### code

**Type:** `string`

:::note{title=説明}
AI 生成の JavaScript フィルターコード

- 組み込みユーティリティ関数のみ使用できます（_ または R でアクセス）

- 入力パラメータ: data（配列）。各 item には行番号を表す __row_index フィールドが含まれます

- 行インデックスとフィールドの組み合わせ配列を返す必要があります: Array<{ __row_index: number, field: string }>

- __row_index は元データ項目の行番号、field はハイライト対象フィールドを表します

- 禁止: eval、Function、非同期操作、DOM API、ネットワークリクエスト

:::

**例**
sales が1000を超えるデータ項目の sales フィールドをハイライトします
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

各地域で利益率が最も高いデータ項目をハイライトします
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

複数条件でフィルターされたデータ項目をハイライトします
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
複数条件フィルタリングでデータ項目をハイライトします

:::


##### field

**Type:** `string`

:::note{title=説明}
コード実行に失敗した場合、または環境が対応していない場合のフォールバック方案

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
次元フィールド。次元項目のID

演算子

\- in: 次元フィールドの値が value に含まれるデータ項目を選択します

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
\- not in: 次元フィールドの値が value に含まれないデータ項目を選択します

演算子

\- in: 次元フィールドの値が value に含まれるデータ項目を選択します

\- not in: 次元フィールドの値が value に含まれないデータ項目を選択します

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
次元フィールド値でデータ項目を選択します。配列に対応します

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=説明}
動的フィルター実行結果（ランタイムフィールド）

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
prepare() フェーズで書き込まれ、実行時は読み取り専用です

:::


### enable

**Type:** `boolean | undefined`

:::note{title=説明}
凡例機能を有効にするかどうか

:::

**例**
凡例機能を有効にするかどうか



### border

**Type:** `boolean | undefined`

:::note{title=説明}
凡例の枠線を有効にするかどうか

:::

:::warning{title=Warning}
離散凡例でのみ有効です

:::

**例**
凡例のフォントウェイト



### labelColor

**Type:** `string | undefined`

:::note{title=説明}
legend font color

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=説明}
legend font color

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=説明}
Pagination icon disabled color

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=説明}
凡例のフォントサイズ

:::

**例**
凡例のフォントサイズ



### labelFontColor

**Type:** `string | undefined`

:::note{title=説明}
legend font color

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=説明}
legend font color

:::

**例**
凡例のフォントウェイト



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=説明}
凡例の形状
:::

:::warning{title=Warning}
離散凡例でのみ有効です

:::

**例**
Brush



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=説明}
凡例の位置

:::

**例**
凡例位置



### maxSize

**Type:** `number | undefined`

:::note{title=説明}
Maximum number of columns or rows when there are many legends

If position is horizontal (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize controls the number of columns displayed

If position is vertical (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize controls the number of rows displayed

:::

:::warning{title=Warning}
離散凡例でのみ有効です

:::

**例**
ブラシモード。単一または複数の領域を選択できるかを定義します。




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=説明}
ブラシ選択を有効にするかどうか

:::


### enable

**Type:** `false | true`

:::note{title=説明}
チャートのツールチップ設定。位置、フォーマット、スタイルなどを定義します。

:::


## brush

**Type:** `Brush | undefined`

:::note{title=説明}
ツールチップ機能を有効にするかどうか



ブラシ選択枠の形状と選択方向を定義します



\- `polygon`: 多角形選択。複数の点をクリックして任意の多角形を描画して選択できます

:::


### enable

**Type:** `boolean | undefined`

:::note{title=説明}
ブラシ選択モード: 単一または複数

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=説明}
選択されたデータ点のスタイルを定義します。



brushtype

不透明度

選択されたデータ点の不透明度。範囲は 0-1 です

\- `polygon`: 多角形ブラシ選択。複数の点をクリックして任意の多角形を描画して選択します

\- `x`: X軸方向のみのブラシ選択。Y軸方向は制限されません

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=説明}
\- `y`: Y軸方向のみのブラシ選択。X軸方向は制限されません



選択されたデータ点の不透明度。範囲は 0-1 です

未選択データ項目のスタイル

選択されたブラシ範囲外のデータ点のスタイルを定義します

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=説明}
\- `multiple`: 複数選択モード。複数のブラシ範囲を同時に存在させることができます

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=説明}
ブラシ選択終了後に選択範囲をクリアするかどうか



未選択データ点の不透明度。範囲は 0-1 です

:::


#### opacity

**Type:** `number | undefined`

:::note{title=説明}
ブラシ選択されたデータ点のスタイルを定義します



未選択データ項目のスタイル

:::

#### stroke

**Type:** `string | undefined`

:::note{title=説明}
ブラシ選択外のデータ点のスタイルを定義します

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
カテゴリ軸（X軸）設定。チャートのX軸を定義し、位置、フォーマット、スタイルなどを含みます。

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=説明}
枠線幅



X軸、カテゴリ軸、X軸設定。チャートのX軸を定義し、位置、フォーマット、スタイルなどを含みます。

:::


#### opacity

**Type:** `number | undefined`

:::note{title=説明}
ブラシ選択外のデータ点のスタイルを定義します



未選択データ項目のスタイル

:::

#### stroke

**Type:** `string | undefined`

:::note{title=説明}
ブラシ選択範囲外のデータ点の不透明度。範囲は 0-1 です

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
カテゴリ軸（X軸）設定。チャートのX軸を定義し、位置、フォーマット、スタイルなどを含みます。

:::


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title=説明}
コード実行に失敗した場合、または環境が対応していない場合の fallback 方案。



ローカルデータセレクタ

:::


### visible

**Type:** `boolean | undefined`

:::note{title=説明}
selector = {

:::

### rectColor

**Type:** `string | undefined`

:::note{title=説明}
\- not in: 次元フィールドの値が value に含まれないデータ項目を選択します

:::

### labelColor

**Type:** `string | undefined`

:::note{title=説明}
Operator

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=説明}
チャートテーマ。テーマは優先度の低い設定で、すべてのチャートタイプで共有される共通設定と、各チャートタイプ固有の設定を含みます。組み込みテーマには 'light' と 'dark' があり、Builder でカスタマイズできます。

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
テーマ

:::


## sort

**Type:** `Sort | undefined`

:::note{title=説明}
X軸のソート設定。次元または指標によるソート、およびカスタムソート順をサポートします



カテゴリ軸のソート設定。次元または指標によるソート、およびカスタムソート順をサポートします
:::

**例**
sort: {
チャートのアニメーションフィルター設定
field: 'sales'
}
sort: {
Operator
}

const grouped = _.groupBy(data, 'area');
\- not in: 次元フィールドの値が value に含まれないデータ項目を選択します
_.maxBy(group, item => item.profit / item.sales)
注意: selector と dynamicFilter は同時に使用できません。dynamicFilter の優先度が高くなります




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
AI が生成した JavaScript フィルターコード

:::

**例**
\- not in: 次元フィールドの値が value に含まれないデータ項目を選択します
\- Input parameters: data (array), each item contains a __row_index field representing the row number



### customOrder

**Type:** `string[] | undefined`

:::note{title=説明}
Suitable for scenarios complex for static selectors, such as Top N, statistical analysis, or complex combined conditions.

:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=説明}
環境要件: ブラウザ環境のみ対応します。Node.js 環境では fallback を使用します



チャート動的フィルター設定: AI が生成した JavaScript コードでチャートマーク（棒、点など）をフィルタリングします。

:::

**例**
return _.map(filtered, item => ({
チャートのアニメーションフィルター設定
field: 'sales'
}
return _.map(filtered, item => ({
Operator
}

const grouped = _.groupBy(data, 'area');
\- not in: 次元フィールドの値が value に含まれないデータ項目を選択します
_.maxBy(group, item => item.profit / item.sales)
注意: selector と dynamicFilter は同時に使用できません。dynamicFilter の優先度が高くなります




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
AI が生成した JavaScript フィルターコード

:::

**例**
\- not in: 次元フィールドの値が value に含まれないデータ項目を選択します
\- Input parameters: data (array), each item contains a __row_index field representing the row number



### customOrder

**Type:** `string[] | undefined`

:::note{title=説明}
  _.maxBy(group, item => item.profit / item.sales)

:::


## theme

**Type:** `Theme | undefined`

:::note{title=説明}
Operator



const maxItems = _.map(grouped, group =>



_.map(maxItems, item => [

:::

**例**
Operator

Highlight items meeting multiple filtering conditions

const filtered = _.filter(data, item => {




### length

**Type:** `number`

### brand

**Type:** `brand`


## barMaxWidth

**Type:** `string | number | undefined`

:::note{title=説明}
Maximum column width. It can be a pixel value or a percentage string.

:::


## barGapInGroup

**Type:** `string | number | undefined`

:::note{title=説明}
Distance between columns in the same category. It can be a pixel value or a percentage string.

:::


## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title=説明}
矩形マークスタイル。柱グラフの色、境界線、角丸などを定義します。

グローバルスタイルまたは条件付きスタイル設定をサポートします

データフィルター

selector を設定すると、数値 selector、部分データ selector、条件付き次元 selector、条件付き指標 selector の 4 種類のデータマッチングを利用できます

selector を設定しない場合、スタイルは全体に適用されます。

:::
### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=説明}
データセレクタ

selector を設定すると、数値 selector、部分データ selector、条件付き次元 selector、条件付き指標 selector の 4 種類のデータマッチングを利用できます

selector を設定しない場合、スタイルは全体に適用されます。

:::

**例**
数値セレクタ
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

部分データセレクタ
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

条件付き次元セレクタ
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

条件付き指標セレクタ
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
次元フィールド。dimensions の項目 id

:::
#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

- in: 次元フィールドの値が value に含まれるデータ項目を選択します

- not in: 次元フィールドの値が value に含まれないデータ項目を選択します

:::
#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

- in: 次元フィールドの値が value に含まれるデータ項目を選択します

- not in: 次元フィールドの値が value に含まれないデータ項目を選択します

operator と同じ

:::
#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
データ項目の次元フィールド値を選択します。配列をサポートします

:::
### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=説明}
動的フィルター（AI 生成コード実行）

AI 生成の JavaScript コードで複雑なデータフィルタリングロジックを実装します。

Top N、統計分析、複雑条件など、静的 selector では表現しにくいシーンに適しています。

主な機能:

- 任意の複雑なデータフィルター条件をサポート

- 組み込みユーティリティ関数でデータ操作を実行

- ブラウザ環境で安全に実行（Web Worker サンドボックス）

環境要件: ブラウザ環境のみサポートし、Node.js 環境では fallback を使用します。

注意: selector と dynamicFilter は同時に使用できません。dynamicFilter の優先度が高くなります。

グラフ動的フィルター設定

AI 生成の JavaScript コードでグラフマーク（棒、点など）をフィルタリングします

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
AI 生成の JavaScript フィルターコード

- 組み込みユーティリティ関数のみ使用できます（_ または R でアクセス）

- 入力パラメータ: data（配列）。各 item には行番号を表す __row_index フィールドが含まれます

- 行インデックスとフィールドの組み合わせ配列を返す必要があります: Array<{ __row_index: number, field: string }>

- __row_index は元データ項目の行番号、field はハイライト対象フィールドを表します

- 禁止: eval、Function、非同期操作、DOM API、ネットワークリクエスト

:::

**例**
sales が1000を超えるデータ項目の sales フィールドをハイライトします
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

各地域で利益率が最も高いデータ項目をハイライトします
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

複数条件でフィルターされたデータ項目をハイライトします
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
コード実行失敗または環境非対応時のフォールバック案

:::
##### field

**Type:** `string`

:::note{title=説明}
次元フィールド。dimensions の項目 id

:::
##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

- in: 次元フィールドの値が value に含まれるデータ項目を選択します

- not in: 次元フィールドの値が value に含まれないデータ項目を選択します

:::
##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

- in: 次元フィールドの値が value に含まれるデータ項目を選択します

- not in: 次元フィールドの値が value に含まれないデータ項目を選択します

operator と同じ

:::
##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
データ項目の次元フィールド値を選択します。配列をサポートします

:::
#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=説明}
動的フィルター実行結果（実行時フィールド）

prepare() 段階で書き込まれ、実行時は読み取り専用です

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
棒要素（矩形）を表示するかどうか

:::
### barColor

**Type:** `string | undefined`

:::note{title=説明}
棒要素（矩形）の色

:::
### barColorOpacity

**Type:** `number | undefined`

:::note{title=説明}
棒要素（矩形）の色の透明度

:::
### barBorderColor

**Type:** `string | undefined`

:::note{title=説明}
棒要素（矩形）の枠線色

:::
### barBorderWidth

**Type:** `number | undefined`

:::note{title=説明}
棒要素（矩形）の枠線幅

:::
### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=説明}
棒要素（矩形）の枠線スタイル

:::

**例**
solid

dashed

dotted
### barBorderOpacity

**Type:** `number | undefined`

:::note{title=説明}
棒要素（矩形）の角丸

棒要素（矩形）のストローク透明度

:::

**例**
4

[0, 0, 10, 10]
### barRadius

**Type:** `number | number[] | undefined`


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

### areaVisible

**Type:** `boolean | undefined`

:::note{title=説明}
エリアマークを表示するかどうか



エリアマークを表示するかどうか

:::

### areaColor

**Type:** `string | undefined`

:::note{title=説明}
面積図形要素の色

面積図形要素の色
:::

### areaColorOpacity

**Type:** `number | undefined`

:::note{title=説明}
面積図形要素の色の不透明度

面積図形要素の色の不透明度
:::


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=説明}
注釈点設定。選択したデータに基づいて、注釈点の位置、形式、スタイルなどを定義します。

:::
### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=説明}
注釈点のセレクタ。データ点を選択するために使用します。

:::
#### field

**Type:** `string`

:::note{title=説明}
次元フィールド。dimensions の項目 id

:::
#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

- in: 次元フィールドの値が value に含まれるデータ項目を選択します

- not in: 次元フィールドの値が value に含まれないデータ項目を選択します

:::
#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

- in: 次元フィールドの値が value に含まれるデータ項目を選択します

- not in: 次元フィールドの値が value に含まれないデータ項目を選択します

operator と同じ

:::
#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
データ項目の次元フィールド値を選択します。配列をサポートします

:::
### measureId

**Type:** `string | undefined`

:::note{title=説明}
注釈点が属する指標 id を指定します。複数 measure のシーンでは、selector と組み合わせて対象指標の注釈点を一意に特定できます。

:::
### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=説明}
動的フィルター（AI 生成コード実行）

AI 生成の JavaScript コードで複雑なデータフィルタリングロジックを実装します。

Top N、統計分析、複雑条件など、静的 selector では表現しにくいシーンに適しています。

主な機能:

- 任意の複雑なデータフィルター条件をサポート

- 組み込みユーティリティ関数でデータ操作を実行

- ブラウザ環境で安全に実行（Web Worker サンドボックス）

環境要件: ブラウザ環境のみサポートし、Node.js 環境では fallback を使用します。

注意: selector と dynamicFilter は同時に使用できません。dynamicFilter の優先度が高くなります。

グラフ動的フィルター設定

AI 生成の JavaScript コードでグラフマーク（棒、点など）をフィルタリングします

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
AI 生成の JavaScript フィルターコード

- 組み込みユーティリティ関数のみ使用できます（_ または R でアクセス）

- 入力パラメータ: data（配列）。各 item には行番号を表す __row_index フィールドが含まれます

- 行インデックスとフィールドの組み合わせ配列を返す必要があります: Array<{ __row_index: number, field: string }>

- __row_index は元データ項目の行番号、field はハイライト対象フィールドを表します

- 禁止: eval、Function、非同期操作、DOM API、ネットワークリクエスト

:::

**例**
sales が1000を超えるデータ項目の sales フィールドをハイライトします
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

各地域で利益率が最も高いデータ項目をハイライトします
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

複数条件でフィルターされたデータ項目をハイライトします
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
コード実行失敗または環境非対応時のフォールバック案

:::
##### field

**Type:** `string`

:::note{title=説明}
次元フィールド。dimensions の項目 id

:::
##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

- in: 次元フィールドの値が value に含まれるデータ項目を選択します

- not in: 次元フィールドの値が value に含まれないデータ項目を選択します

:::
##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

- in: 次元フィールドの値が value に含まれるデータ項目を選択します

- not in: 次元フィールドの値が value に含まれないデータ項目を選択します

operator と同じ

:::
##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
データ項目の次元フィールド値を選択します。配列をサポートします

:::
#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=説明}
動的フィルター実行結果（実行時フィールド）

prepare() 段階で書き込まれ、実行時は読み取り専用です

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
テキスト内容

:::

**例**
'Annotation text'
### textColor

**Type:** `string | undefined`

:::note{title=説明}
テキスト色

:::

**例**
'red'
### textFontSize

**Type:** `number | undefined`

:::note{title=説明}
テキストのフォントサイズ

:::

**例**
12
### textFontWeight

**Type:** `number | undefined`

:::note{title=説明}
テキストのフォントウェイト

:::

**例**
400
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=説明}
テキストの配置。通常は設定不要です

`right` を推奨します。これによりテキストを注釈線の左側に配置できます

right: テキストは参照線の左側にあり、テキストの右端が（垂直）注釈線に揃います

left: テキストは参照線の右側にあり、テキストの左端が（垂直）注釈線に揃います

center: テキストは参照線の中央にあり、テキストの中心が（垂直）注釈線に揃います

:::

**例**
'right'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=説明}
テキストの垂直配置。通常は top に設定し、テキストを注釈点の下側に表示して、チャートの可視領域内に収めます

top を推奨します。これによりテキスト全体をチャートの可視領域内に表示できます

top: テキストは注釈点の下側にあり、テキストの上端が注釈点に揃います

middle: テキストは注釈点の中心にあり、テキストの中心が注釈点に揃います

bottom: テキストは注釈点の上側にあり、テキストの下端が注釈点に揃います

:::

**例**
'top'
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
背景の枠線色

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
注釈点全体の Y 方向オフセット距離。注釈点がチャート上側（値が大きい）にある場合は正の値、下側（値が小さい）にある場合は負の値を推奨します。

負の値では全体が上に移動します。例: -10 を設定すると、テキストと背景を含む注釈点コンポーネント全体が 10px 上に移動します

正の値では全体が下に移動します。例: 10 を設定すると、テキストと背景を含む注釈点コンポーネント全体が 10px 下に移動します

:::

**例**
offsetY: 5
### offsetX

**Type:** `number | undefined`

:::note{title=説明}
注釈点全体の X 方向オフセット距離。注釈点がチャート左側（カテゴリ軸の始点）にある場合は正の値、右側（カテゴリ軸の終点）にある場合は負の値を推奨します。

負の値では全体が左に移動します。例: -10 を設定すると、テキストと背景を含む注釈点コンポーネント全体が 10px 左に移動します

正の値では全体が右に移動します。例: 10 を設定すると、テキストと背景を含む注釈点コンポーネント全体が 10px 右に移動します

:::

**例**
offsetX: 5
## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=説明}
垂直注釈線設定。選択したデータまたは固定値に基づいて垂直参照線を定義します。

:::
### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=説明}
垂直線を注釈する固定 X 値。カテゴリ軸が X 方向の場合は次元値、数値軸が X 方向の場合は具体的な数値を入力できます

:::
### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=説明}
動的フィルター（AI 生成コード実行）

AI 生成の JavaScript フィルターコード

- 組み込みユーティリティ関数のみ使用できます（_ または R でアクセス）

- 入力パラメータ: data（配列）

- 単一の数値または文字列を返す必要があります: number | string

- 適用シーン: 注釈線（水平線、垂直線）に必要な動的値

- 禁止: eval、Function、非同期操作、DOM API、ネットワークリクエスト

:::
#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=説明}
ユーザーの動的値要件説明（自然言語）

:::

**例**
"注釈線の基準として最大売上値を取得"

"注釈線用に平均売上を計算"
#### code

**Type:** `string`

:::note{title=説明}
動的フィルター（AI 生成コード実行）

AI 生成の JavaScript フィルターコード

- 組み込みユーティリティ関数のみ使用できます（_ または R でアクセス）

- 入力パラメータ: data（配列）

- 単一の数値または文字列を返す必要があります: number | string

- 適用シーン: 注釈線（水平線、垂直線）に必要な動的値

- 禁止: eval、Function、非同期操作、DOM API、ネットワークリクエスト

:::

**例**
売上の最大値を注釈線の値として取得
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

平均値を計算して注釈線に使用
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

分位値を注釈線として取得
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

条件に基づいて目標値を計算
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
コード実行失敗または環境非対応時のフォールバック値

:::
#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=説明}
動的フィルター実行結果（実行時フィールド）

prepare() 段階で書き込まれ、実行時は読み取り専用です

:::
##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=説明}
テキスト内容

:::

**例**
'Annotation text'
### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=説明}
テキスト位置

注釈線のラベル位置（線に対する相対位置）。

:::

**例**
'outsideEnd'
### textColor

**Type:** `string | undefined`

:::note{title=説明}
テキスト色

:::

**例**
'red'
### textFontSize

**Type:** `number | undefined`

:::note{title=説明}
テキストのフォントサイズ

:::

**例**
12
### textFontWeight

**Type:** `number | undefined`

:::note{title=説明}
テキストのフォントウェイト

:::

**例**
400
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=説明}
テキストの配置。通常は設定不要です

`right` を推奨します。これによりテキストを注釈線の左側に配置できます

right: テキストは参照線の左側にあり、テキストの右端が（垂直）注釈線に揃います

left: テキストは参照線の右側にあり、テキストの左端が（垂直）注釈線に揃います

center: テキストは参照線の中央にあり、テキストの中心が（垂直）注釈線に揃います

:::

**例**
'right'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=説明}
テキストの垂直配置。通常は設定不要です

top を推奨します。これによりテキスト全体をチャートの可視領域内に表示できます

top: テキストは参照線の下側にあり、テキストの上端が（垂直）注釈線の終点に揃います

middle: テキストは参照線の中央にあり、テキストの中心が（垂直）注釈線の終点に揃います

bottom: テキストは参照線の上側にあり、テキストの下端が（垂直）注釈線の終点に揃います

:::

**例**
'top'
### lineVisible

**Type:** `boolean | undefined`

:::note{title=説明}
線を表示するかどうか

:::

**例**
true
### lineColor

**Type:** `string | undefined`

:::note{title=説明}
線の色

:::

**例**
'red'
### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
線の幅

:::

**例**
2
### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=説明}
線のスタイル

:::

**例**
'solid'
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
背景の枠線色

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
水平注釈線設定。選択したデータまたは固定値に基づいて水平参照線を定義します。

:::
### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=説明}
水平線を注釈する固定 Y 値。カテゴリ軸が Y 方向の場合は次元値、数値軸が Y 方向の場合は具体的な数値を入力できます

:::
### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=説明}
動的フィルター（AI 生成コード実行）

AI 生成の JavaScript フィルターコード

- 組み込みユーティリティ関数のみ使用できます（_ または R でアクセス）

- 入力パラメータ: data（配列）

- 単一の数値または文字列を返す必要があります: number | string

- 適用シーン: 注釈線（水平線、垂直線）に必要な動的値

- 禁止: eval、Function、非同期操作、DOM API、ネットワークリクエスト

:::
#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=説明}
Background padding

:::

**例**
Line visible

次元フィールド。次元項目の ID です



#### code

**Type:** `string`

:::note{title=説明}
動的フィルター（AI 生成コード実行）

AI 生成の JavaScript フィルターコード

- 組み込みユーティリティ関数のみ使用できます（_ または R でアクセス）

- 入力パラメータ: data（配列）

- 単一の数値または文字列を返す必要があります: number | string

- 適用シーン: 注釈線（水平線、垂直線）に必要な動的値

- 禁止: eval、Function、非同期操作、DOM API、ネットワークリクエスト

:::

**例**
売上の最大値を注釈線の値として取得
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

平均値を計算して注釈線に使用
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

分位値を注釈線として取得
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

条件に基づいて目標値を計算
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
コード実行失敗または環境非対応時のフォールバック値

:::
#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=説明}
動的フィルター実行結果（実行時フィールド）

prepare() 段階で書き込まれ、実行時は読み取り専用です

:::
##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=説明}
テキスト内容

:::

**例**
'Annotation text'
### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=説明}
テキスト位置

注釈線のラベル位置（線に対する相対位置）。

:::

**例**
'outsideEnd'
### textColor

**Type:** `string | undefined`

:::note{title=説明}
テキスト色

:::

**例**
'red'
### textFontSize

**Type:** `number | undefined`

:::note{title=説明}
テキストのフォントサイズ

:::

**例**
12
### textFontWeight

**Type:** `number | undefined`

:::note{title=説明}
テキストのフォントウェイト

:::

**例**
400
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=説明}
テキストの配置。通常は設定不要です

`right` を推奨します。これによりテキストを注釈線の左側に配置できます

right: テキストは参照線の左側にあり、テキストの右端が（垂直）注釈線に揃います

left: テキストは参照線の右側にあり、テキストの左端が（垂直）注釈線に揃います

center: テキストは参照線の中央にあり、テキストの中心が（垂直）注釈線に揃います

:::

**例**
'right'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=説明}
テキストの垂直配置。通常は設定不要です

top を推奨します。これによりテキスト全体をチャートの可視領域内に表示できます

top: テキストは参照線の下側にあり、テキストの上端が（水平）注釈線に揃います

middle: テキストは参照線の中央にあり、テキストの中心が（水平）注釈線に揃います

bottom: テキストは参照線の上側にあり、テキストの下端が（水平）注釈線に揃います

:::

**例**
'top'
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
背景の枠線色

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
線を表示するかどうか

:::

**例**
true
### lineColor

**Type:** `string | undefined`

:::note{title=説明}
線の色

:::

**例**
'red'
### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
線の幅

:::

**例**
2
### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=説明}
線のスタイル

:::

**例**
'solid'
### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=説明}
分割線設定。注釈値を基準に正負部分を異なる色で表示できます。

:::
#### positiveColor

**Type:** `string | undefined`

:::note{title=説明}
注釈値より大きい部分に対応する主色

:::
#### negativeColor

**Type:** `string | undefined`

:::note{title=説明}
注釈値より小さい部分に対応する主色

:::
## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=説明}
注釈領域設定。選択したデータに基づき、注釈領域の位置やスタイルなどを定義します。

:::
### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=説明}
注釈領域セレクタ。領域に対応するデータを選択するために使用します。

:::
#### field

**Type:** `string`

:::note{title=説明}
次元フィールド。dimensions の項目 id

:::
#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

- in: 次元フィールドの値が value に含まれるデータ項目を選択します

- not in: 次元フィールドの値が value に含まれないデータ項目を選択します

:::
#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
演算子

- in: 次元フィールドの値が value に含まれるデータ項目を選択します

- not in: 次元フィールドの値が value に含まれないデータ項目を選択します

operator と同じ

:::
#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
データ項目の次元フィールド値を選択します。配列をサポートします

:::
### text

**Type:** `string | string[] | undefined`

:::note{title=説明}
テキスト内容

:::

**例**
'Annotation text'
### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title=説明}
テキスト位置

:::

**例**
'top'
### textColor

**Type:** `string | undefined`

:::note{title=説明}
テキスト色

:::

**例**
'red'
### textFontSize

**Type:** `number | undefined`

:::note{title=説明}
テキストのフォントサイズ

:::

**例**
12
### textFontWeight

**Type:** `number | undefined`

:::note{title=説明}
テキストのフォントウェイト

:::

**例**
400
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=説明}
テキストの配置。通常は設定不要です

center: テキストは注釈領域の中央にあり、テキスト中心が領域に揃います

left: テキストは注釈領域の左側にあります

right: テキストは注釈領域の右側にあります

:::

**例**
'center'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=説明}
テキストの垂直配置。通常は設定不要です

top: テキストは注釈領域の上側にあります

middle: テキストは注釈領域の中央にあります

bottom: テキストは注釈領域の下側にあります

:::

**例**
'middle'
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
背景の枠線色

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
注釈領域の色

:::

**例**
'rgba(255,0,0,0.1)'
### areaColorOpacity

**Type:** `number | undefined`

:::note{title=説明}
注釈領域の透明度

:::

**例**
0.2
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
注釈領域の角丸

:::

**例**
4
### areaLineDash

**Type:** `number[] | undefined`

:::note{title=説明}
注釈領域の枠線破線設定

:::

**例**
[4, 4]
### outerPadding

**Type:** `number | undefined`

:::note{title=説明}
外側余白

:::

**例**
8
## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=説明}
チャートでピボット機能または指標の組み合わせが有効な場合、次元連動機能を有効にするかどうか。

ある次元値に hover したとき、他のチャート内の同じ次元値のデータを連動してハイライトします。

ピボットチャート次元連動設定
:::


### enable

**Type:** `false | true`

:::note{title=説明}
ピボットチャートの次元連動を有効にするかどうか
:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title=説明}
すべての次元に対応する子チャートの Tooltip 情報を表示するかどうか
:::

### showLabel

**Type:** `boolean | undefined`

:::note{title=説明}
crosshair に対応するラベルを表示するかどうか
:::


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=説明}
チャートの言語設定。'zh-CN' と 'en-US' の 2 言語をサポートします。intl.setLocale('zh-CN') を呼び出して言語を設定することもできます
:::
