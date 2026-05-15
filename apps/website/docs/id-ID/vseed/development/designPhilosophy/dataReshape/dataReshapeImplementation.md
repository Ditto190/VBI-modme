# Reshape Data - Implementasi

:::info Sederhana sekaligus cerdik
Ini adalah salah satu modul VSeed yang paling menarik dan paling inti. Sekilas terlihat kompleks, tetapi sebenarnya sangat sederhana dan cerdik, dengan kode kurang dari 200 baris.

Selama `foldMeasures` dan `unfoldDimensions` digunakan dengan baik, metrik dan dimensi apa pun dapat diubah menjadi metrik dan dimensi tetap, sehingga pemetaan visual dapat dibuat cukup bebas.
:::

## foldMeasures

[Lokasi kode sumber](https://github.com/VisActor/VSeed/blob/main/packages/vseed/src/dataReshape/foldMeasures.ts)

`foldMeasures` melakukan `fold` terhadap semua metrik menjadi satu metrik, menambahkan satu `dimensi nama metrik` dan satu `dimensi Id metrik`. Semua informasi yang mungkin hilang disimpan di dalam `foldInfo`, dan statistik data juga dapat dihitung dalam proses ini.

### Karakteristik

1. Karakteristik 1: Setelah `foldMeasures` selesai dijalankan, pasti hanya ada 1 field metrik. Artinya, data yang dijelaskan oleh banyak metrik dapat diubah menjadi 1 metrik, sehingga data multi-metrik apa pun dapat dipetakan ke satu elemen grafis.
2. Karakteristik 2: Item data dan data elemen grafis (elemen geometris) selalu konsisten secara ketat. Satu data berkorespondensi dengan satu elemen grafis.
3. Karakteristik 3: Proses ini melakukan statistik data.

:::tip Bagian paling cerdik!!!
- `1` metrik `0` dimensi, setelah `foldMeasures` dapat memperoleh `1` metrik dan `2` dimensi (termasuk nama metrik dan Id metrik).
- `4` metrik `1` dimensi, setelah `2` kali `foldMeasures` dapat memperoleh `2` metrik dan `3` dimensi (termasuk nama metrik dan Id metrik), sehingga dapat mendukung skenario seperti grafik sumbu ganda dengan baik.
- `N` metrik `0` dimensi, setelah `Y` (Y ≤ N) kali `foldMeasures`, dapat memperoleh `Y` metrik dan `2` dimensi (termasuk nama metrik dan Id metrik).

:::
### Contoh minimal yang dapat dijalankan

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

      // Hapus field metrik lain untuk menghindari duplikasi
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

```json title=Output yang diharapkan
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

[Lokasi kode sumber](https://github.com/VisActor/VSeed/blob/main/packages/vseed/src/dataReshape/unfoldDimensions.ts)


`unfoldDimensions` melakukan `concat` pada dimensi apa pun menjadi satu dimensi baru tanpa kehilangan informasi. Semua informasi tambahan disimpan di dalam `unfoldInfo`.

`unfoldDimensions` lengkap == mengubah semua nilai dimensi menjadi metrik + satu kali `foldMeasures`

Namun biaya untuk melakukan iterasi atas `dataset` sangat besar. Satu kali `foldMeasures` tambahan akan menyebabkan penurunan performa.

`foldMeasures` dapat langsung menjamin bahwa satu data hanya memiliki satu metrik. Karena itu, kita dapat melakukan penggabungan sederhana langsung pada data sumber untuk mencapai efek ekuivalen secara cerdik, dan pada akhirnya meningkatkan performa secara signifikan.

Setelah dipertimbangkan, secara teori `unfoldDimensions` dapat sepenuhnya digabung dengan `foldMeasures`, sehingga semua pemrosesan data selesai dalam satu kali iterasi `dataset`. Namun demi keterbacaan dan kemudahan pemeliharaan, selama belum ada bottleneck performa, untuk sementara keduanya tidak digabung.

### Karakteristik

Karakteristik 1: Setelah `unfoldDimensions` selesai dijalankan, pasti hanya ada 1 field metrik. 
Karakteristik 2: Dimensi dapat digabung tanpa kehilangan data asli.

:::tip Bagian paling cerdik!!!
1. Selama dijalankan setelah `foldMeasures`, operasi `concat` yang paling sederhana sudah cukup untuk menyelesaikan pengembangan dimensi dan penggabungan metrik, dengan performa yang sangat baik.
2. Dimensi apa pun dapat digabung menjadi field dimensi yang benar-benar baru, sehingga pemetaan channel visual dapat dibuat secara bebas.
3. Karena prosesnya sendiri tidak kompleks, secara teori proses ini dapat digabung dengan `foldMeasures` untuk mengurangi jumlah iterasi dan meningkatkan performa.

:::

### Contoh minimal yang dapat dijalankan

```js
const XEncoding = '__DimX__'
const ColorEncoding = '__DimColor__'
/**
 * Mengembangkan dan menggabungkan dimensi pada channel visual. Karena dimensi digabung setelah foldMeasures, produk Kartesius tidak diperlukan
 * @param {Array<Object>} dataset Dataset asli
 * @param {Array<Object>} dimensions Array dimensi; setiap objek dimensi setidaknya memiliki field id
 * @param {Object} encoding Objek encoding, key adalah nama channel, value adalah array id dimensi
 * @param {Object} options Opsi konfigurasi
 *  - foldMeasureId: nama field metrik yang sudah di-fold
 *  - separator: pemisah untuk menyambung nilai dimensi
 *  - colorItemAsId: apakah hanya menggunakan item warna sebagai colorId, nilai bawaan false
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

  // Filter dimensi yang sesuai berdasarkan encoding
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
 * Menerapkan encoding ke data dan mengubah datum secara in-place
 * @param {string} encoding Nama field encoding
 * @param {Array<Object>} dimensions Array dimensi
 * @param {Object} datum Satu data
 * @param {string} separator Pemisah penyambungan
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

```json title=Output yang diharapkan
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
