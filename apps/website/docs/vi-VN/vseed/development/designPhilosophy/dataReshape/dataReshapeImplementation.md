# Reshape dữ liệu - Triển khai

:::info Đơn giản mà tinh tế
Đây là một trong những module thú vị nhất và cốt lõi nhất của VSeed. Nhìn có vẻ phức tạp, nhưng thực ra rất đơn giản và tinh tế, chỉ chưa đến 200 dòng mã.

Chỉ cần sử dụng tốt `foldMeasures` và `unfoldDimensions`, có thể chuyển đổi bất kỳ chỉ số và chiều dữ liệu nào thành chỉ số và chiều dữ liệu cố định, từ đó đạt được ánh xạ trực quan đủ linh hoạt.
:::

## foldMeasures

[Vị trí mã nguồn](https://github.com/VisActor/VSeed/blob/main/packages/vseed/src/dataReshape/foldMeasures.ts)

`foldMeasures` `fold` toàn bộ chỉ số thành một chỉ số, thêm một `chiều tên chỉ số` và một `chiều Id chỉ số`. Tất cả thông tin có thể bị mất đều được lưu trong `foldInfo`, đồng thời có thể thực hiện thống kê dữ liệu trong quá trình này.

### Đặc điểm

1. Đặc điểm 1: Sau khi `foldMeasures` chạy xong, chắc chắn chỉ còn 1 trường chỉ số. Điều này có nghĩa là dữ liệu được mô tả bằng nhiều chỉ số đều có thể được chuyển thành 1 chỉ số; dữ liệu nhiều chỉ số bất kỳ có thể tương ứng với một phần tử đồ họa.
2. Đặc điểm 2: Mục dữ liệu và dữ liệu của phần tử đồ họa (phần tử hình học) khớp nghiêm ngặt với nhau. Một dữ liệu tương ứng với một phần tử đồ họa.
3. Đặc điểm 3: Quá trình này thực hiện thống kê dữ liệu.

:::tip Điểm tinh tế nhất!!!
- `1` chỉ số `0` chiều, sau `foldMeasures` có thể nhận được `1` chỉ số và `2` chiều (bao gồm tên chỉ số và Id chỉ số).
- `4` chỉ số `1` chiều, sau `2` lần `foldMeasures` có thể nhận được `2` chỉ số và `3` chiều (bao gồm tên chỉ số và Id chỉ số), nhờ đó hỗ trợ hoàn hảo các kịch bản như biểu đồ hai trục.
- `N` chỉ số `0` chiều, sau `Y` (Y ≤ N) lần `foldMeasures`, có thể nhận được `Y` chỉ số và `2` chiều (bao gồm tên chỉ số và Id chỉ số).

:::
### Ví dụ tối thiểu có thể chạy

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

      // Xóa các trường chỉ số khác để tránh lặp lại
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

```json title=Kết quả mong đợi
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

[Vị trí mã nguồn](https://github.com/VisActor/VSeed/blob/main/packages/vseed/src/dataReshape/unfoldDimensions.ts)


`unfoldDimensions` `concat` bất kỳ chiều dữ liệu nào thành một chiều dữ liệu mới mà không làm mất thông tin. Tất cả thông tin được thêm vào đều được lưu trong `unfoldInfo`.

Một `unfoldDimensions` hoàn chỉnh == chuyển tất cả giá trị chiều thành chỉ số + một lần `foldMeasures`

Tuy nhiên, chi phí duyệt `dataset` rất lớn. Một lần `foldMeasures` dư thừa sẽ làm giảm hiệu năng.

`foldMeasures` có thể trực tiếp đảm bảo một dữ liệu chỉ có một chỉ số. Vì vậy, chỉ cần thực hiện phép gộp đơn giản ngay trên dữ liệu nguồn là có thể tinh tế đạt được hiệu quả tương đương, cuối cùng cải thiện hiệu năng đáng kể.

Sau khi cân nhắc, về lý thuyết `unfoldDimensions` có thể được hợp nhất hoàn toàn với `foldMeasures`, hoàn thành toàn bộ xử lý dữ liệu trong một lần duyệt `dataset`. Tuy nhiên, vì khả năng đọc và bảo trì, khi chưa có bottleneck hiệu năng, tạm thời không hợp nhất.

### Đặc điểm

Đặc điểm 1: Sau khi `unfoldDimensions` chạy xong, chắc chắn chỉ còn 1 trường chỉ số. 
Đặc điểm 2: Có thể gộp chiều mà không làm mất dữ liệu gốc.

:::tip Điểm tinh tế nhất!!!
1. Chỉ cần thực hiện sau `foldMeasures`, có thể dùng thao tác `concat` đơn giản nhất để hoàn tất việc mở rộng chiều và gộp chỉ số, với hiệu năng cực kỳ tốt.
2. Bất kỳ chiều nào cũng có thể được gộp thành một trường chiều hoàn toàn mới, đạt được ánh xạ kênh thị giác tùy ý.
3. Vì bản thân không phức tạp, về lý thuyết có thể hợp nhất với `foldMeasures` để giảm số lần duyệt và nâng cao hiệu năng.

:::

### Ví dụ tối thiểu có thể chạy

```js
const XEncoding = '__DimX__'
const ColorEncoding = '__DimColor__'
/**
 * Mở rộng và gộp chiều của kênh thị giác. Vì gộp chiều sau foldMeasures nên không cần tích Descartes
 * @param {Array<Object>} dataset Tập dữ liệu gốc
 * @param {Array<Object>} dimensions Mảng chiều, mỗi đối tượng chiều ít nhất chứa trường id
 * @param {Object} encoding Đối tượng encoding, key là tên kênh, value là mảng id chiều
 * @param {Object} options Cấu hình
 *  - foldMeasureId: tên trường của chỉ số đã fold
 *  - separator: dấu phân tách để nối giá trị chiều
 *  - colorItemAsId: có chỉ dùng mục màu làm colorId hay không, mặc định false
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

  // Lọc các chiều tương ứng theo encoding
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
 * Áp dụng encoding vào dữ liệu, chỉnh sửa datum tại chỗ
 * @param {string} encoding Tên trường encoding
 * @param {Array<Object>} dimensions Mảng chiều
 * @param {Object} datum Một dòng dữ liệu
 * @param {string} separator Dấu phân tách nối chuỗi
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

```json title=Kết quả mong đợi
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
