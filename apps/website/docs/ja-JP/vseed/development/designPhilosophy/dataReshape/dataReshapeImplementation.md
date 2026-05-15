# データリシェイプ - 実装

:::info シンプルで巧妙
これは VSeed の中でも特に面白く、かつ中核となるモジュールです。一見複雑に見えますが、実際には非常にシンプルで巧妙で、コードは 200 行にも満たない規模です。

`foldMeasures` と `unfoldDimensions` をうまく使えば、任意の指標と次元を固定された指標と次元へ変換でき、十分に自由度の高い可視化マッピングを実現できます。
:::

## foldMeasures

[ソースコードの場所](https://github.com/VisActor/VSeed/blob/main/packages/vseed/src/dataReshape/foldMeasures.ts)

`foldMeasures` はすべての指標を 1 つの指標へ `fold` し、`指標名次元` と `指標Id次元` を追加します。この過程で失われる可能性のある情報はすべて `foldInfo` に保存され、同時にデータ統計も行えます。

### 特徴

1. 特性 1: `foldMeasures` の実行後は必ず指標フィールドが 1 つだけになります。つまり、複数指標で記述されたデータをすべて 1 つの指標に変換でき、任意の複数指標データを 1 つの図形要素に対応させられます。
2. 特性 2: データ項目と図形要素（幾何要素）のデータが厳密に一致し、1 件のデータが 1 つの図形要素に対応します。
3. 特性 3: この処理の中でデータ統計を行います。

:::tip 最も巧妙な点!!!
- `1` 個の指標、`0` 個の次元は、`foldMeasures` 後に `1` 個の指標、`2` 個の次元（指標名と指標Idを含む）を得られます。
- `4` 個の指標、`1` 個の次元は、`2` 回の `foldMeasures` 後に `2` 個の指標、`3` 個の次元（指標名と指標Idを含む）を得られ、双軸グラフなどのシーンをきれいにサポートできます。
- `N` 個の指標、`0` 個の次元は、`Y`（Y ≤ N）回の `foldMeasures` 後に `Y` 個の指標と `2` 個の次元（指標名と指標Idを含む）を得られます。

:::
### 最小実行可能例

```js title=foldMeasures
const data = [
  { category: 'A', sales: 100, profit: 30 },
  { category: 'B', sales: 200, profit: 50 },
]

const measures = [
  { id: 'sales', alias: 'Sales' },
  { id: 'profit', alias: 'Profit' },
]

function foldMeasures(dataset, measures, options) {
  const {
    measureId,
    measureName,
    measureValue,
    colorMeasureId,
    allowEmptyFold = true,
  } = options || {}

  const foldInfo = {
    measureId,
    measureName,
    measureValue,
    statistics: {
      max: -Infinity,
      min: Infinity,
      sum: 0,
      count: 0,
      colorMin: Infinity,
      colorMax: -Infinity,
    },
    foldMap: {},
  }

  const ids = measures.map(m => m.id)
  const result = []

  for (const row of dataset) {
    for (const measure of measures) {
      const { id, alias } = measure
      const newRow = { ...row }

      // 重複を避けるため、他の指標フィールドを削除する
      for (const key of ids) {
        delete newRow[key]
      }

      newRow[measureId] = id
      newRow[measureName] = alias || id
      newRow[measureValue] = row[id]

      if (colorMeasureId) {
        const colorValue = row[colorMeasureId]
        newRow.color = colorValue
        foldInfo.statistics.colorMin = Math.min(foldInfo.statistics.colorMin, Number(colorValue))
        foldInfo.statistics.colorMax = Math.max(foldInfo.statistics.colorMax, Number(colorValue))
      }

      const val = Number(row[id])
      foldInfo.statistics.min = Math.min(foldInfo.statistics.min, val)
      foldInfo.statistics.max = Math.max(foldInfo.statistics.max, val)
      foldInfo.statistics.sum += val
      foldInfo.statistics.count++

      foldInfo.foldMap[id] = alias

      result.push(newRow)
    }
  }

  return { dataset: result, foldInfo }
}

const { dataset: foldedData, foldInfo } = foldMeasures(data, measures, {
  measureId: '__MeaId__',
  measureName: '__MeaName__',
  measureValue: '__MeaValue__',
})

console.log(foldedData)
```

```json title=期待される出力
[
  {
    "category": "A",
    "__MeaId__": "sales",
    "__MeaName__": "Sales",
    "__MeaValue__": 100
  },
  {
    "category": "A",
    "__MeaId__": "profit",
    "__MeaName__": "Profit",
    "__MeaValue__": 30
  },
  {
    "category": "B",
    "__MeaId__": "sales",
    "__MeaName__": "Sales",
    "__MeaValue__": 200
  },
  {
    "category": "B",
    "__MeaId__": "profit",
    "__MeaName__": "Profit",
    "__MeaValue__": 50
  }
]
```

## unfoldDimensions

[ソースコードの場所](https://github.com/VisActor/VSeed/blob/main/packages/vseed/src/dataReshape/unfoldDimensions.ts)


`unfoldDimensions` は情報を失わずに、任意の次元を 1 つの新しい次元へ `concat` します。追加された情報はすべて `unfoldInfo` に保存されます。

完全な `unfoldDimensions` == すべての次元値を指標へ変換 + 1 回の `foldMeasures`

ただし、`dataset` の走査コストは大きく、余分な `foldMeasures` を 1 回行うと性能低下につながります。

`foldMeasures` は 1 件のデータに指標が 1 つだけであることを直接保証できます。そのため、元データ上で単純な結合を行うだけで同等の効果を巧妙に実現でき、最終的に大きく性能を高められます。

検討の結果、理論上 `unfoldDimensions` は `foldMeasures` と完全に統合し、1 回の `dataset` 走査ですべてのデータ処理を完了できます。ただし、可読性と保守性のため、性能ボトルネックがない場合は現時点では統合しません。

### 特徴

特性 1: `unfoldDimensions` の実行後は必ず指標フィールドが 1 つだけになります。 
特性 2: 元データを失わずに次元を結合できます。

:::tip 最も巧妙な点!!!
1. `foldMeasures` の後に実行すれば、最も単純な `concat` 操作だけで次元の展開と指標の結合を完了でき、非常に優れた性能を得られます。
2. 任意の次元をまったく新しい次元フィールドへ結合でき、任意の視覚チャネルマッピングを実現できます。
3. それ自体は複雑ではないため、理論上は `foldMeasures` と統合して走査回数を減らし、性能を向上させることもできます。

:::

### 最小実行可能例

```js
const XEncoding = '__DimX__'
const ColorEncoding = '__DimColor__'
/**
 * 視覚チャネルの次元を展開して結合する。foldMeasures 後に次元を結合するため、デカルト積は不要
 * @param {Array<Object>} dataset 元データセット
 * @param {Array<Object>} dimensions 次元配列。各次元オブジェクトは少なくとも id フィールドを含む
 * @param {Object} encoding エンコーディングオブジェクト。key はチャネル名、value は次元 id 配列
 * @param {Object} options 設定項目
 *  - foldMeasureId: fold 済み指標のフィールド名
 *  - separator: 次元値を連結する区切り文字
 *  - colorItemAsId: colorId としてカラー項目のみを使うかどうか。デフォルトは false
 * @returns {Object} { dataset, unfoldInfo }
 */
function unfoldDimensions(dataset, dimensions, encoding, options) {
  const { foldMeasureId, separator, colorItemAsId } = options || {}

  const unfoldInfo = {
    encodingX: XEncoding,
    encodingColor: ColorEncoding,

    colorItems: [],
    colorIdMap: {},
  }

  // encoding に基づいて対応する次元を絞り込む
  const xDimensions = encoding.x ? dimensions.filter(d => encoding.x.includes(d.id)) : []
  const colorDimensions = encoding.color ? dimensions.filter(d => encoding.color.includes(d.id)) : []

  const colorItemsSet = new Set()
  const colorIdMap = {}

  for (let i = 0; i < dataset.length; i++) {
    const datum = dataset[i]

    applyEncoding(XEncoding, xDimensions, datum, separator)
    applyEncoding(ColorEncoding, colorDimensions, datum, separator)

    const measureId = String(datum[foldMeasureId])
    const colorItem = String(datum[ColorEncoding])
    colorItemsSet.add(colorItem)
  }

  unfoldInfo.colorItems = Array.from(colorItemsSet)

  return {
    dataset,
    unfoldInfo,
  }
}

/**
 * エンコーディングをデータへ適用し、datum をインプレースで変更する
 * @param {string} encoding エンコーディングフィールド名
 * @param {Array<Object>} dimensions 次元配列
 * @param {Object} datum 1 件のデータ
 * @param {string} separator 連結区切り文字
 */
function applyEncoding(encoding, dimensions, datum, separator) {
  if (encoding && dimensions.length) {
    datum[encoding] = dimensions.map(dim => String(datum[dim.id])).join(separator)
  }
}


const dataset = [
  { "category": "A", "__MeaId__": "sales",  "__MeaName__":  "Sales",  "__MeaValue__": 100 },
  { "category": "A", "__MeaId__": "profit", "__MeaName__": "Profit",  "__MeaValue__": 30  },
  { "category": "B", "__MeaId__": "sales",  "__MeaName__":  "Sales",  "__MeaValue__": 200 },
  { "category": "B", "__MeaId__": "profit", "__MeaName__": "Profit",  "__MeaValue__": 50  }
]
const dimensions = [
  { id: 'category'},
  { id: '__MeaName__'},
]

const encoding = {
  x: ['category'],
  color: ['__MeaName__'],
}

const options = {
  foldMeasureId: '__MeaId__',
  separator: '-',
  colorItemAsId: false,
}

const { dataset: unfoldedData, unfoldInfo } = unfoldDimensions(dataset, dimensions, encoding, options)

console.log(unfoldedData)


```

```json title=期待される出力
[
  {
    "category": "A",
    "__MeaId__": "sales",
    "__MeaName__": "Sales",
    "__MeaValue__": 100,
    "__DimX__": "A",
    "__DimColor__": "Sales"
  },
  {
    "category": "A",
    "__MeaId__": "profit",
    "__MeaName__": "Profit",
    "__MeaValue__": 30,
    "__DimX__": "A",
    "__DimColor__": "Profit"
  },
  {
    "category": "B",
    "__MeaId__": "sales",
    "__MeaName__": "Sales",
    "__MeaValue__": 200,
    "__DimX__": "B",
    "__DimColor__": "Sales"
  },
  {
    "category": "B",
    "__MeaId__": "profit",
    "__MeaName__": "Profit",
    "__MeaValue__": 50,
    "__DimX__": "B",
    "__DimColor__": "Profit"
  }
]
```
