# 데이터 재구성 - 구현

:::info 단순하지만 정교함
이것은 VSeed에서 가장 흥미롭고 핵심적인 모듈입니다. 복잡해 보이지만 실제로는 매우 단순하고 정교하며, 코드도 200줄이 채 되지 않습니다.

`foldMeasures`와 `unfoldDimensions`를 잘 활용하면 임의의 지표와 차원을 고정된 지표와 차원으로 변환할 수 있고, 충분히 자유로운 시각화 매핑을 구현할 수 있습니다.
:::

## foldMeasures

[소스 코드 위치](https://github.com/VisActor/VSeed/blob/main/packages/vseed/src/dataReshape/foldMeasures.ts)

`foldMeasures`는 모든 지표를 하나의 지표로 `fold`하고, `지표 이름 차원`과 `지표 Id 차원`을 추가합니다. 이 과정에서 손실될 수 있는 모든 정보는 `foldInfo`에 저장되며, 동시에 데이터 통계도 수행할 수 있습니다.

### 특징

1. 특징 1: `foldMeasures` 실행 후에는 반드시 지표 필드가 1개만 남습니다. 즉 여러 지표로 설명된 데이터를 모두 하나의 지표로 변환할 수 있고, 임의의 다중 지표 데이터를 하나의 그래픽 요소에 대응시킬 수 있습니다.
2. 특징 2: 데이터 항목과 그래픽 요소(기하 요소)의 데이터가 엄격하게 일치합니다. 하나의 데이터는 하나의 그래픽 요소에 대응합니다.
3. 특징 3: 이 과정에서 데이터 통계를 수행합니다.

:::tip 가장 정교한 부분!!!
- `1`개 지표와 `0`개 차원은 `foldMeasures` 후 `1`개 지표와 `2`개 차원(지표 이름과 지표 Id 포함)을 얻을 수 있습니다.
- `4`개 지표와 `1`개 차원은 `2`번의 `foldMeasures` 후 `2`개 지표와 `3`개 차원(지표 이름과 지표 Id 포함)을 얻을 수 있어, 이중 축 차트 같은 시나리오를 완벽하게 지원할 수 있습니다.
- `N`개 지표와 `0`개 차원은 `Y`(Y ≤ N)번의 `foldMeasures` 후 `Y`개 지표와 `2`개 차원(지표 이름과 지표 Id 포함)을 얻을 수 있습니다.

:::
### 최소 실행 가능 예제

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

      // 중복을 피하기 위해 다른 지표 필드를 삭제
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

```json title=예상 출력
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

[소스 코드 위치](https://github.com/VisActor/VSeed/blob/main/packages/vseed/src/dataReshape/unfoldDimensions.ts)


`unfoldDimensions`는 정보를 잃지 않는 전제에서 임의의 차원을 하나의 새로운 차원으로 `concat`합니다. 추가되는 모든 정보는 `unfoldInfo`에 저장됩니다.

완전한 `unfoldDimensions` == 모든 차원 값을 지표로 변환 + 한 번의 `foldMeasures`

하지만 `dataset`을 순회하는 비용은 큽니다. 불필요한 `foldMeasures`를 한 번 더 수행하면 성능이 저하됩니다.

`foldMeasures`는 하나의 데이터에 지표가 하나만 존재함을 직접 보장할 수 있습니다. 따라서 원본 데이터에서 단순한 병합만 수행해도 같은 효과를 정교하게 달성할 수 있고, 최종적으로 성능을 크게 향상시킬 수 있습니다.

검토해 보면, 이론적으로 `unfoldDimensions`는 `foldMeasures`와 완전히 합쳐져 한 번의 `dataset` 순회 안에서 모든 데이터 처리를 완료할 수 있습니다. 하지만 가독성과 유지보수성을 위해, 성능 병목이 없는 상황에서는 임시로 두 기능을 합치지 않습니다.

### 특징

특징 1: `unfoldDimensions` 실행 후에는 반드시 지표 필드가 1개만 남습니다. 
특징 2: 원본 데이터를 잃지 않고 차원을 병합할 수 있습니다.

:::tip 가장 정교한 부분!!!
1. `foldMeasures` 이후에 수행하기만 하면 가장 단순한 `concat` 작업으로 차원 펼침과 지표 병합을 완료할 수 있어 성능이 매우 뛰어납니다.
2. 임의의 차원을 완전히 새로운 차원 필드로 병합할 수 있어, 임의의 시각 채널 매핑을 구현할 수 있습니다.
3. 자체적으로 복잡하지 않기 때문에, 이론적으로는 `foldMeasures`와 합쳐 순회 횟수를 줄이고 성능을 높일 수 있습니다.

:::

### 최소 실행 가능 예제

```js
const XEncoding = '__DimX__'
const ColorEncoding = '__DimColor__'
/**
 * 시각 채널의 차원을 펼치고 병합한다. foldMeasures 후에 차원을 병합하므로 데카르트 곱이 필요하지 않다
 * @param {Array<Object>} dataset 원본 데이터셋
 * @param {Array<Object>} dimensions 차원 배열. 각 차원 객체는 최소한 id 필드를 포함한다
 * @param {Object} encoding 인코딩 객체. key는 채널 이름, value는 차원 id 배열
 * @param {Object} options 설정 항목
 *  - foldMeasureId: fold된 지표의 필드명
 *  - separator: 차원 값을 이어 붙이는 구분자
 *  - colorItemAsId: 색상 항목만 colorId로 사용할지 여부, 기본값 false
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

  // encoding에 따라 대응하는 차원을 필터링
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
 * 데이터를 인코딩에 적용하고 datum을 제자리에서 수정한다
 * @param {string} encoding 인코딩 필드명
 * @param {Array<Object>} dimensions 차원 배열
 * @param {Object} datum 단일 데이터
 * @param {string} separator 연결 구분자
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

```json title=예상 출력
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
