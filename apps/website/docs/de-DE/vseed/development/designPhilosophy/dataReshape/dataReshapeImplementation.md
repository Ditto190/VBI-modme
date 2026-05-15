# Datenumformung - Implementierung

:::info Einfach und zugleich raffiniert
Dies ist eines der interessantesten und zugleich zentralsten Module von VSeed. Es wirkt komplex, ist tatsächlich aber sehr einfach und raffiniert und umfasst weniger als 200 Zeilen Code.

Wenn `foldMeasures` und `unfoldDimensions` sinnvoll eingesetzt werden, lassen sich beliebige Measures und Dimensions in feste Measures und Dimensions umwandeln. Dadurch wird eine ausreichend flexible visuelle Zuordnung möglich.
:::

## foldMeasures

[Position des Quellcodes](https://github.com/VisActor/VSeed/blob/main/packages/vseed/src/dataReshape/foldMeasures.ts)

`foldMeasures` `fold`et alle Measures zu einem Measure, ergänzt eine `Measure-Name-Dimension` und eine `Measure-Id-Dimension`. Alle potenziell verlorenen Informationen werden in `foldInfo` gespeichert; außerdem können während dieses Prozesses Datenstatistiken berechnet werden.

### Eigenschaften

1. Eigenschaft 1: Nach der Ausführung von `foldMeasures` gibt es garantiert nur noch 1 Measure-Feld. Das bedeutet, dass Daten mit mehreren Measures in 1 Measure umgewandelt werden können und beliebige Mehr-Measure-Daten genau einem grafischen Element zugeordnet werden.
2. Eigenschaft 2: Dateneintrag und Daten des grafischen Elements (geometrischen Elements) stimmen strikt überein. Ein Dateneintrag entspricht einem grafischen Element.
3. Eigenschaft 3: Während dieses Prozesses werden Datenstatistiken berechnet.

:::tip Der raffinierteste Punkt!!!
- `1` Measure und `0` Dimensions ergeben nach `foldMeasures` `1` Measure und `2` Dimensions (einschließlich Measure-Name und Measure-Id).
- `4` Measures und `1` Dimension ergeben nach `2` Durchläufen von `foldMeasures` `2` Measures und `3` Dimensions (einschließlich Measure-Name und Measure-Id), wodurch Szenarien wie Dual-Axis-Charts sauber unterstützt werden.
- `N` Measures und `0` Dimensions ergeben nach `Y` (Y ≤ N) Durchläufen von `foldMeasures` `Y` Measures und `2` Dimensions (einschließlich Measure-Name und Measure-Id).

:::
### Minimal lauffähiges Beispiel

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

      // Andere Measure-Felder entfernen, um Duplikate zu vermeiden
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

```json title=Erwartete Ausgabe
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

[Position des Quellcodes](https://github.com/VisActor/VSeed/blob/main/packages/vseed/src/dataReshape/unfoldDimensions.ts)


`unfoldDimensions` `concat`eniert beliebige Dimensions verlustfrei zu einer neuen Dimension. Alle zusätzlich entstehenden Informationen werden in `unfoldInfo` gespeichert.

Ein vollständiges `unfoldDimensions` == alle Dimension-Werte in Measures umwandeln + ein `foldMeasures`-Durchlauf

Das Iterieren über das `dataset` ist jedoch teuer. Ein zusätzlicher `foldMeasures`-Durchlauf würde die Performance verschlechtern.

`foldMeasures` kann direkt sicherstellen, dass ein Dateneintrag nur ein Measure enthält. Daher lässt sich bereits auf den Quelldaten eine einfache Zusammenführung durchführen, die denselben Effekt elegant erreicht und die Performance am Ende deutlich verbessert.

Nach weiterer Überlegung könnten `unfoldDimensions` und `foldMeasures` theoretisch vollständig zusammengeführt werden, sodass die gesamte Datenverarbeitung in einem einzigen `dataset`-Durchlauf abgeschlossen wird. Aus Gründen der Lesbarkeit und Wartbarkeit werden sie ohne Performance-Engpass vorerst nicht zusammengeführt.

### Eigenschaften

Eigenschaft 1: Nach der Ausführung von `unfoldDimensions` gibt es garantiert nur noch 1 Measure-Feld. 
Eigenschaft 2: Dimensions können zusammengeführt werden, ohne die ursprünglichen Daten zu verlieren.

:::tip Der raffinierteste Punkt!!!
1. Wenn der Schritt nach `foldMeasures` erfolgt, reichen einfache `concat`-Operationen aus, um Dimensions zu entfalten und Measures zusammenzuführen. Die Performance ist dadurch sehr gut.
2. Beliebige Dimensions können zu einem komplett neuen Dimension-Feld zusammengeführt werden, wodurch beliebige Zuordnungen zu visuellen Kanälen möglich werden.
3. Da der Prozess selbst nicht komplex ist, kann er theoretisch mit `foldMeasures` zusammengeführt werden, um Durchläufe zu reduzieren und die Performance zu verbessern.

:::

### Minimal lauffähiges Beispiel

```js
const XEncoding = '__DimX__'
const ColorEncoding = '__DimColor__'
/**
 * Dimensions der visuellen Kanäle entfalten und zusammenführen. Da die Zusammenführung nach foldMeasures erfolgt, wird kein kartesisches Produkt benötigt
 * @param {Array<Object>} dataset Ursprüngliches Dataset
 * @param {Array<Object>} dimensions Dimension-Array; jedes Dimension-Objekt enthält mindestens ein id-Feld
 * @param {Object} encoding Encoding-Objekt; key ist der Kanalname, value ist ein Array von Dimension-IDs
 * @param {Object} options Konfiguration
 *  - foldMeasureId: Feldname des gefalteten Measures
 *  - separator: Trennzeichen zum Verbinden von Dimension-Werten
 *  - colorItemAsId: Ob nur das Farbelement als colorId verwendet wird, Standardwert false
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

  // Zugehörige Dimensions anhand des Encoding filtern
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
 * Encoding auf Daten anwenden und datum direkt verändern
 * @param {string} encoding Encoding-Feldname
 * @param {Array<Object>} dimensions Dimension-Array
 * @param {Object} datum Einzelner Dateneintrag
 * @param {string} separator Trennzeichen für die Verbindung
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

```json title=Erwartete Ausgabe
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
