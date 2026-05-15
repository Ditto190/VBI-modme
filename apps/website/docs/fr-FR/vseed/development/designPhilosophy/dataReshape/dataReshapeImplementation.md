# Remodelage des données - Implémentation

:::info Simple et ingénieux
C'est l'un des modules les plus intéressants et les plus centraux de VSeed. Il paraît complexe, mais il est en réalité très simple et ingénieux, avec moins de 200 lignes de code.

En utilisant correctement `foldMeasures` et `unfoldDimensions`, il est possible de convertir n'importe quels indicateurs et dimensions en indicateurs et dimensions fixes, ce qui permet des mappings visuels très flexibles.
:::

## foldMeasures

[Emplacement du code source](https://github.com/VisActor/VSeed/blob/main/packages/vseed/src/dataReshape/foldMeasures.ts)

`foldMeasures` effectue un `fold` de tous les indicateurs en un seul indicateur, puis ajoute une `dimension de nom d'indicateur` et une `dimension d'Id d'indicateur`. Toutes les informations qui pourraient être perdues sont stockées dans `foldInfo`, et des statistiques de données peuvent être calculées pendant ce processus.

### Caractéristiques

1. Caractéristique 1 : après l'exécution de `foldMeasures`, il n'y a forcément qu'un seul champ d'indicateur. Les données décrites par plusieurs indicateurs peuvent donc toutes être converties en un seul indicateur, et n'importe quelles données multi-indicateurs peuvent correspondre à un seul élément graphique.
2. Caractéristique 2 : l'entrée de données et les données de l'élément graphique (élément géométrique) sont strictement cohérentes. Une donnée correspond à un élément graphique.
3. Caractéristique 3 : ce processus effectue des statistiques sur les données.

:::tip Le point le plus ingénieux !!!
- `1` indicateur et `0` dimension permettent, après `foldMeasures`, d'obtenir `1` indicateur et `2` dimensions (incluant le nom d'indicateur et l'Id d'indicateur).
- `4` indicateurs et `1` dimension permettent, après `2` exécutions de `foldMeasures`, d'obtenir `2` indicateurs et `3` dimensions (incluant le nom d'indicateur et l'Id d'indicateur), ce qui prend parfaitement en charge des scénarios comme les graphiques à double axe.
- `N` indicateurs et `0` dimension permettent, après `Y` (Y ≤ N) exécutions de `foldMeasures`, d'obtenir `Y` indicateurs et `2` dimensions (incluant le nom d'indicateur et l'Id d'indicateur).

:::
### Exemple minimal exécutable

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

      // Supprimer les autres champs d'indicateur pour éviter les doublons
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

```json title=Sortie attendue
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

[Emplacement du code source](https://github.com/VisActor/VSeed/blob/main/packages/vseed/src/dataReshape/unfoldDimensions.ts)


`unfoldDimensions` effectue un `concat` de dimensions arbitraires vers une nouvelle dimension sans perte d'information. Toutes les informations ajoutées sont stockées dans `unfoldInfo`.

Un `unfoldDimensions` complet == conversion de toutes les valeurs de dimension en indicateurs + une exécution de `foldMeasures`

Mais le coût d'itération sur le `dataset` est très important. Une exécution supplémentaire de `foldMeasures` entraînerait une baisse de performance.

`foldMeasures` garantit directement qu'une donnée ne contient qu'un seul indicateur. Il est donc possible d'effectuer une simple fusion directement sur les données source, pour obtenir astucieusement un effet équivalent et améliorer fortement les performances au final.

Après réflexion, `unfoldDimensions` pourrait théoriquement être entièrement fusionné avec `foldMeasures`, afin de terminer tout le traitement des données en une seule itération du `dataset`. Toutefois, pour des raisons de lisibilité et de maintenabilité, tant qu'il n'y a pas de goulot de performance, ils ne sont provisoirement pas fusionnés.

### Caractéristiques

Caractéristique 1 : après l'exécution de `unfoldDimensions`, il n'y a forcément qu'un seul champ d'indicateur. 
Caractéristique 2 : les dimensions peuvent être fusionnées sans perdre les données d'origine.

:::tip Le point le plus ingénieux !!!
1. Tant que l'opération est effectuée après `foldMeasures`, une simple opération `concat` suffit pour déplier les dimensions et fusionner les indicateurs, avec d'excellentes performances.
2. N'importe quelles dimensions peuvent être fusionnées en un tout nouveau champ de dimension, ce qui permet des mappings arbitraires de canaux visuels.
3. Comme le processus lui-même n'est pas complexe, il peut théoriquement être fusionné avec `foldMeasures` afin de réduire le nombre d'itérations et d'améliorer les performances.

:::

### Exemple minimal exécutable

```js
const XEncoding = '__DimX__'
const ColorEncoding = '__DimColor__'
/**
 * Déplier et fusionner les dimensions des canaux visuels. Comme les dimensions sont fusionnées après foldMeasures, aucun produit cartésien n'est nécessaire
 * @param {Array<Object>} dataset Jeu de données d'origine
 * @param {Array<Object>} dimensions Tableau de dimensions ; chaque objet de dimension contient au moins un champ id
 * @param {Object} encoding Objet d'encodage, où key est le nom du canal et value le tableau d'id de dimensions
 * @param {Object} options Options de configuration
 *  - foldMeasureId: nom du champ de l'indicateur plié
 *  - separator: séparateur pour concaténer les valeurs de dimension
 *  - colorItemAsId: indique s'il faut utiliser uniquement l'élément de couleur comme colorId, false par défaut
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

  // Filtrer les dimensions correspondantes selon l'encoding
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
 * Appliquer l'encoding aux données et modifier datum sur place
 * @param {string} encoding Nom du champ d'encoding
 * @param {Array<Object>} dimensions Tableau de dimensions
 * @param {Object} datum Une donnée
 * @param {string} separator Séparateur de concaténation
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

```json title=Sortie attendue
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
