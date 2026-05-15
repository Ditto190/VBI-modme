# Histogram

:::info{title=Mappage Encoding}
L’histogramme prend en charge les canaux visuels suivants :

`xAxis`  : canal de l’axe X, prend en charge `une dimension`, affichée sur l’axe X après calcul des intervalles selon les valeurs de dimension

:::

:::note{title=Description}
L’histogramme convient à l’affichage de distributions de données ; l’axe X est numérique (données continues), l’axe Y est numérique (données continues), et les barres sont verticales

Scenarios applicables :

\- Afficher la distribution des données, comme la distribution de fréquence ou de probabilité

\- Analyser la tendance centrale et le degré de dispersion des données

\- Identifier les valeurs aberrantes et les motifs dans les données

:::


## chartType

**Type:** `"histogram"`

:::note{title=Description}
Histogramme, adapté à l’affichage de la distribution des données

:::


## dataset

**Type:** `Record[]`

:::note{title=Description}
Jeu de donnees conforme a TidyData et deja agrege, utilise pour definir la source et la structure des donnees du graphique. Les jeux de donnees saisis par l utilisateur ne necessitent pas de pretraitement ; VSeed inclut une puissante fonction Data Reshape qui convertit automatiquement les donnees du graphique en colonnes en 2 dimensions et 1 mesure.

:::

**Exemple**
[{category:'A', value:100}, {category:'B', value:200}]




## dimensions

**Type:** `HistogramDimension[] | undefined`

:::note{title=Description}
L’histogramme ne nécessite généralement pas de dimension

:::

**Exemple**
[{id: "category", alias: "Catégorie"}]




### id

**Type:** `string`

:::note{title=Description}
ID de champ correspondant à la dimension

:::

### alias

**Type:** `string | undefined`

:::note{title=Description}
Alias de dimension

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=Description}
Configuration du format de date de la dimension

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=Description}
Granularité temporelle, détermine la précision d'affichage de la date

:::

### encoding

**Type:** `"tooltip" | "label" | "row" | "column" | undefined`

:::note{title=Description}
Canal auquel la dimension est mappée

\- color : prend en charge le mapping de plusieurs dimensions vers le canal de couleur

\- detail : prend en charge le mapping de plusieurs dimensions vers le canal de détail

\- tooltip : permet de mapper plusieurs dimensions au canal d'infobulle

\- label : permet de mapper plusieurs dimensions au canal d'étiquette

\- row : prend en charge le mapping de plusieurs dimensions vers le canal de ligne

\- column : prend en charge le mapping de plusieurs dimensions vers le canal de colonne

:::


## measures

**Type:** `HistogramMeasure[] | undefined`

:::note{title=Description}
L’histogramme ne prend en charge qu’une seule dimension, et les données sont discrètes

:::

**Exemple**
[{id: "value", alias: "Valeur"}]




### id

**Type:** `string`

:::note{title=Description}
ID de mesure, doit être unique

:::

### alias

**Type:** `string | undefined`

:::note{title=Description}
Alias de mesure, doublons autorisés ; s'il n'est pas défini, alias vaut id

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Formatage numérique automatique, activé par défaut, priorité la plus élevée

Lorsque autoFormat=true, toutes les configurations numFormat sont remplacées

Lorsqu'il est activé, les étiquettes de données et les infobulles choisissent automatiquement le format adapté selon les valeurs de mesure et la locale

Règles de formatage : nombres décimaux avec compact notation activée, minimum 0 décimale, maximum 2 décimales, arrondi automatique, via l'implémentation Intl.NumberFormat du navigateur

Par exemple :

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Formatage numérique personnalisé pour les mesures ; appliqué automatiquement aux étiquettes et infobulles

Remarque : pour utiliser un format personnalisé, définissez explicitement autoFormat=false ; sinon autoFormat remplacera cette configuration

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}
Type de format numérique, prend en charge : nombre (décimal), pourcentage (%), pour mille (‰), notation scientifique

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Ratio de format numérique, ne peut pas être 0

:::

**Exemple**
\- 100000 est converti en 10W, ratio:10000, symbol:"W"
\- 100000 est converti en 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Symbole de format numérique, par ex. %, ‰

:::

**Exemple**
\- 100000 est converti en 10W, ratio:10000, symbol:"W"
\- 100000 est converti en 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
Séparateur des milliers pour le formatage numérique

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}
Suffixe de format numérique

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
Préfixe de format numérique

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
Nombre de décimales pour le formatage numérique, utilise minimumFractionDigits et maximumFractionDigits de Intl.NumberFormat du navigateur ; priorité inférieure à significantDigits

:::

**Exemple**
\- 1234.5678 est converti en 1235 , fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.6 , fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.57 , fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1230.568 , fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.5678 , fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.56780 , fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
Chiffres significatifs pour le formatage numérique, utilise minimumSignificantDigits et maximumSignificantDigits de Intl.NumberFormat du navigateur ; priorité supérieure à fractionDigits

:::

**Exemple**
\- 1234.5678 est converti en 1000 , significantDigits:1
\- 1234.5678 est converti en 1200 , significantDigits:2
\- 1234.5678 est converti en 1230 , significantDigits:3
\- 1234.5678 est converti en 1234 , significantDigits:4
\- 1234.5678 est converti en 1234.6 , significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.57 , significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.568 , significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.5678 , significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}
Priorité d'arrondi du formatage numérique lorsque significantDigits et fractionDigits sont tous deux définis ; utilise Intl.NumberFormat du navigateur et suit les mêmes règles que roundingPriority

:::

**Exemple**
\- 1234.5678 est converti en 1230 , significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 est converti en 1234.5678 , significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Mode d'arrondi du formatage numérique, utilise Intl.NumberFormat du navigateur et suit les mêmes règles que roundingMode

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}
Type de format numérique, prend en charge : nombre (décimal), pourcentage (%), pour mille (‰), notation scientifique

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Ratio de format numérique, ne peut pas être 0

:::

**Exemple**
\- 100000 est converti en 10W, ratio:10000, symbol:"W"
\- 100000 est converti en 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Symbole de format numérique, par ex. %, ‰

:::

**Exemple**
\- 100000 est converti en 10W, ratio:10000, symbol:"W"
\- 100000 est converti en 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
Séparateur des milliers pour le formatage numérique

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}
Suffixe de format numérique

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
Préfixe de format numérique

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
Nombre de décimales pour le formatage numérique, utilise minimumFractionDigits et maximumFractionDigits de Intl.NumberFormat du navigateur ; priorité inférieure à significantDigits

:::

**Exemple**
\- 1234.5678 est converti en 1235 , fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.6 , fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.57 , fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1230.568 , fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.5678 , fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.56780 , fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
Chiffres significatifs pour le formatage numérique, utilise minimumSignificantDigits et maximumSignificantDigits de Intl.NumberFormat du navigateur ; priorité supérieure à fractionDigits

:::

**Exemple**
\- 1234.5678 est converti en 1000 , significantDigits:1
\- 1234.5678 est converti en 1200 , significantDigits:2
\- 1234.5678 est converti en 1230 , significantDigits:3
\- 1234.5678 est converti en 1234 , significantDigits:4
\- 1234.5678 est converti en 1234.6 , significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.57 , significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.568 , significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.5678 , significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}
Priorité d'arrondi du formatage numérique lorsque significantDigits et fractionDigits sont tous deux définis ; utilise Intl.NumberFormat du navigateur et suit les mêmes règles que roundingPriority

:::

**Exemple**
\- 1234.5678 est converti en 1230 , significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 est converti en 1234.5678 , significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Mode d'arrondi du formatage numérique, utilise Intl.NumberFormat du navigateur et suit les mêmes règles que roundingMode

:::

### encoding

**Type:** `"value" | "color" | "tooltip" | "label" | "x0" | "x1" | undefined`

:::note{title=Description}
Canal auquel la mesure est mappée

\- value : canal de valeur de l’histogramme

\- x0 : canal x0 de l’histogramme

\- x1 : canal x1 de l’histogramme

\- color : mesure mappée vers le canal de couleur

\- label : mesure mappée au canal d'étiquette

\- tooltip : mesure mappée au canal d'infobulle

:::

### parentId

**Type:** `string | undefined`

:::note{title=Description}
Dans une configuration de mesures plate, construit un groupe de mesures en arbre. parentId pointe vers l'id du groupe de mesures parent et sert à construire l'arbre des mesures

:::

:::tip{title=Tip}
Il existe deux façons de configurer l'arbre des mesures : l'option 1 configure directement un arbre de mesures avec children ; l'option 2 configure une liste plate de mesures avec parentId. Ces deux méthodes ne peuvent pas être utilisées simultanément

:::


## page

**Type:** `Page | undefined`

:::note{title=Description}


:::


### field

**Type:** `string`

:::note{title=Description}


:::

### currentValue

**Type:** `string`

:::note{title=Description}


:::

**Exemple**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Description}


:::


## color

**Type:** `Color | undefined`

:::note{title=Description}


:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Description}


:::

**Exemple**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Description}


:::

**Exemple**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Description}


:::

**Exemple**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Description}


:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Description}


:::


## label

**Type:** `Label | undefined`

:::note{title=Description}


:::


### enable

**Type:** `false | true`

:::note{title=Description}


:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Description}


:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Description}






:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Description}






:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Description}






:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}


:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}


:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}


:::

**Exemple**
\- 100000 est converti en 10K, ratio:1000, symbol:"K"




#### symbol

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**
\- 100000 est converti en 10K, ratio:1000, symbol:"K"




#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}


:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}


:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}


:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}


:::

**Exemple**
\- 1234.5678 est converti en 1234.6 , fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.57 , fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1230.568 , fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.5678 , fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.56780 , fractionDigits:5 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}


:::

**Exemple**
\- 1234.5678 est converti en 1200 , significantDigits:2
\- 1234.5678 est converti en 1230 , significantDigits:3
\- 1234.5678 est converti en 1234 , significantDigits:4
\- 1234.5678 est converti en 1234.6 , significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.57 , significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.568 , significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.5678 , significantDigits:8 (roundingMode:halfCeil)




#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}


:::

**Exemple**
\- 1234.5678 est converti en 1234.5678 , significantDigits:3 (roundingPriority:morePrecision)




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}


:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}


:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}


:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}


:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Description}


:::

### labelColor

**Type:** `string | undefined`

:::note{title=Description}


:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Description}


:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Description}


:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Description}


:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}


:::


#### field

**Type:** `string`

:::note{title=Description}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}






:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}








:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
































:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**
"Mettre en surbrillance les barres dont les ventes dépassent 1000"

"Mettre en surbrillance la barre avec la marge la plus élevée dans chaque région"



#### code

**Type:** `string`

:::note{title=Description}














:::

**Exemple**
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

:::note{title=Description}


:::


##### field

**Type:** `string`

:::note{title=Description}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}






:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}








:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}






:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`


## legend

**Type:** `Legend | undefined`

:::note{title=Description}


:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}


:::

**Exemple**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Description}


:::

:::warning{title=Warning}


:::

**Exemple**




### labelColor

**Type:** `string | undefined`

:::note{title=Description}


:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Description}


:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Description}


:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}


:::

**Exemple**




### labelFontColor

**Type:** `string | undefined`

:::note{title=Description}


:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}


:::

**Exemple**




### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Description}


:::

:::warning{title=Warning}


:::

**Exemple**




### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Description}


:::

**Exemple**




### maxSize

**Type:** `number | undefined`

:::note{title=Description}






:::

:::warning{title=Warning}


:::

**Exemple**





## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Description}
Indique si la sélection brush est activée

:::


### enable

**Type:** `false | true`

:::note{title=Description}


:::


## brush

**Type:** `Brush | undefined`

:::note{title=Description}








Mode de selection par brush : simple ou multiple

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}


:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Description}












:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Description}
Opacité of selected data points, range 0-1







:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Description}


:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}






:::


#### opacity

**Type:** `number | undefined`

:::note{title=Description}






:::

#### stroke

**Type:** `string | undefined`

:::note{title=Description}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}


:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Axe X, axe categoriel, configuration de l axe X ; definit l axe X du graphique, notamment sa position, son format, son style, etc.





:::


#### opacity

**Type:** `number | undefined`

:::note{title=Description}
\- 100000 est converti en 10W, ratio:10000, symbol:"W"





:::

#### stroke

**Type:** `string | undefined`

:::note{title=Description}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}

:::


## xAxis

**Type:** `XLinearAxis | undefined`

:::note{title=Description}
Axe X, axe numérique ; configuration de l’axe X utilisée pour définir la position, le format, le style, etc. de l’axe X du graphique.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Type de ligne de grille

:::

### min

**Type:** `number | undefined`

:::note{title=Description}
Ligne d’axe width

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Description}
Graduations de l axe X

:::

### log

**Type:** `boolean | undefined`

:::note{title=Description}
Indique s’il faut utiliser un axe logarithmique, uniquement valable pour les axes numériques

:::

### logBase

**Type:** `number | undefined`

:::note{title=Description}
Fonction d’assouplissement de l’animation.

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Description}
Configuration de l’axe Y (axe catégoriel) utilisée pour définir l’axe Y, notamment la position, le format, le style, etc.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Description}
Axe X animation configuration

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Description}


:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}


:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}


:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Ratio de formatage numérique, ne peut pas être 0

:::

**Exemple**
Plage d’angles pour la rotation automatique lorsqu’elle est activée (effectif uniquement pour les axes catégoriels).




#### symbol

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**

Longueur maximale pour la limitation des étiquettes. Lorsque la longueur du texte dépasse cette valeur, il est tronqué avec des points de suspension et visible au survol (effectif uniquement pour les axes catégoriels).



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}

:::

**Exemple**
Étiquette font weight


\- 1234.5678 est converti en 1230.568, fractionDigits:3 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}

:::

**Exemple**





\- 1234.5678 est converti en 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}


:::

**Exemple**

Ligne d’axe width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Mode d’arrondi du formatage numérique, utilisant Intl.NumberFormat du navigateur, avec les mêmes règles que roundingMode dans Intl.NumberFormat

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Description}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}


:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Description}


:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}


:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Description}


:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Description}


:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Description}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}


:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Description}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
\- 100000 est converti en 10W, ratio:10000, symbol:"W"

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Description}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Suffixe de format numérique

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Description}
Préfixe de format numérique

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Description}
Nombre de décimales pour le formatage numérique, utilise minimumFractionDigits et maximumFractionDigits de Intl.NumberFormat du navigateur ; priorité inférieure à significantDigits

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Description}
\- 1234.5678 est converti en 1234.5678 , fractionDigits:4 (roundingMode:halfCeil)

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Description}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
\- 1234.5678 est converti en 1234.6 , significantDigits:5 (roundingMode:halfCeil)

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Description}

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Description}
\- 1234.5678 est converti en 1234.5678 , significantDigits:3 (roundingPriority:morePrecision)

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Description}
Mode d'arrondi du formatage numérique, utilise Intl.NumberFormat du navigateur et suit les mêmes règles que roundingMode

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Étiquette de graduation de l’axe X

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Description}


:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Description}


:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Description}


:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Description}


:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Description}

:::


#### duration

**Type:** `number | undefined`

:::note{title=Description}


:::

#### easing

**Type:** `string | undefined`

:::note{title=Description}


:::


## yAxis

**Type:** `YLinearAxis | undefined`

:::note{title=Description}


:::


### visible

**Type:** `boolean | undefined`

:::note{title=Description}

:::

### min

**Type:** `number | undefined`

:::note{title=Description}


:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Description}


:::

### log

**Type:** `boolean | undefined`

:::note{title=Description}


:::

### logBase

**Type:** `number | undefined`

:::note{title=Description}


:::

### nice

**Type:** `boolean | undefined`

:::note{title=Description}


:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Description}
sortLegend: {

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Description}


:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}


:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}


:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}


:::

**Exemple**





#### symbol

**Type:** `string | undefined`

:::note{title=Description}

:::

**Exemple**





#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}


:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}


:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}


:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}

:::

**Exemple**


Fonction d easing de l animation






#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
Configuration du tri de l axe categoriel, prend en charge le tri selon les dimensions ou les mesures, ainsi que l ordre personnalise

:::

**Exemple**
sort: {
  orderBy: 'profit',
  order: 'asc',
}
sort: {
  customOrder:['2019', '2020', '2021']
}




#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}


:::

**Exemple**
Ordre de tri, les valeurs optionnelles sont 'asc' ou 'desc'




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}


:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Description}
\- orderBy:'date'

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Ordre de tri personnalise, applique directement a l axe categoriel

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Description}


:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
  orderBy: 'profit',

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Description}
or

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Description}


:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Description}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}


:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Description}

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}


:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Description}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}


:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Description}

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Description}


:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Description}


:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Description}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}


:::

#### titleText

**Type:** `string | undefined`

:::note{title=Description}
sort order, optional values 'asc' or 'desc'

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Description}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Description}


:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Description}

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Description}


:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Description}


:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Description}


:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Description}
**Exemple**

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Description}
selector = [{ profit: 100 }, { profit: 200 }]

:::


#### duration

**Type:** `number | undefined`

:::note{title=Description}
operator: 'not in',

:::

#### easing

**Type:** `string | undefined`

:::note{title=Description}
}

:::


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title=Description}
Solution de repli lorsque l execution du code echoue ou que l environnement n est pas pris en charge.





:::


### visible

**Type:** `boolean | undefined`

:::note{title=Description}
selector = {

:::

### rectColor

**Type:** `string | undefined`

:::note{title=Description}
\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est pas dans value

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Opérateur

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Description}


:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}


:::


## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title=Description}
Ecrit pendant la phase prepare(), en lecture seule a l execution

:::


## binCount

**Type:** `number | undefined`

:::note{title=Description}
Nombre d’intervalles de l’histogramme, utilisé pour définir le nombre de rectangles (barres) de l’histogramme

:::


## binStep

**Type:** `number | undefined`

:::note{title=Description}
Pas d’intervalle, utilisé pour calculer la largeur des intervalles et qui influence aussi la largeur des rectangles (barres) de l’histogramme final. Si binCount et binStep sont tous deux définis, binStep est prioritaire

:::


## binValueType

**Type:** `"count" | "percentage" | undefined`

:::note{title=Description}
Type de valeur des intervalles de l’histogramme, utilisé pour définir le type de valeur des rectangles (barres), par défaut 'count'

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Description}




const maxItems = _.map(grouped, group =>



_.map(maxItems, item => [

:::

**Exemple**
'dark'

'light'

'customThemeName'




### length

**Type:** `number`

### brand

**Type:** `brand`


## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title=Description}


Indique si le primitive barre (rectangle) est visible






:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}






:::

**Exemple**
Couleur du trace du primitive barre (rectangle)








field: 'category',
operator: 'in',
value: 'tool'
}

field: 'category',
operator: 'not in',
value: 'book'
}

**Exemple**

field: 'profit',
operator: '>=',
value: 100
}

field: 'profit',
operator: 'between'
value: [100, 300]
}




#### field

**Type:** `string`

:::note{title=Description}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}





:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}





4

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}




\- in : selectionne les elements de donnees dont la valeur du champ de dimension est dans value

\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est pas dans value






\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est PAS dans la liste de valeurs.



















:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**
"Mettre en surbrillance les barres dont les ventes dépassent 1000"

"Mettre en surbrillance la barre avec la marge la plus élevée dans chaque région"



#### code

**Type:** `string`

:::note{title=Description}














:::

**Exemple**

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

:::note{title=Description}
field: 'sales'

:::


##### field

**Type:** `string`

:::note{title=Description}
return _.flatten(

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
\- Interdit : eval, Function, operations asynchrones, API DOM, requetes reseau

const profitRate = item.profit / item.sales;

});

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}





);

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}




\- in : selectionne les elements de donnees dont la valeur du champ de dimension est dans value

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### barVisible

**Type:** `boolean | undefined`

:::note{title=Description}


:::

### barColor

**Type:** `string | undefined`

:::note{title=Description}


:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title=Description}


:::

### barBorderColor

**Type:** `string | undefined`

:::note{title=Description}


:::

### barBorderWidth

**Type:** `number | undefined`

:::note{title=Description}

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}


:::

**Exemple**







### barBorderOpacity

**Type:** `number | undefined`

:::note{title=Description}




Taille de police du texte

:::

**Exemple**
12

[0, 0, 10, 10]



### barRadius

**Type:** `number | number[] | undefined`


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Description}


:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}


:::


#### field

**Type:** `string`

:::note{title=Description}
'right' Text is on the left side of the annotation point.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Alignement vertical du texte ; generalement defini sur 'top' pour que le texte apparaisse en bas du point d annotation et reste dans la zone visible du graphique.

Il est recommande de definir 'top' pour que le texte soit entierement affiche dans la zone visible du graphique.

top : le texte est en bas du point d annotation ; le bord superieur du texte est aligne sur le point.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
'top' Text is at the bottom of the annotation point.






:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

### measureId

**Type:** `string | undefined`

:::note{title=Description}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}




Couleur du trace de l arriere-plan

true













'red'











Rayon des angles de l arriere-plan

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Marge interne de l arriere-plan

:::

**Exemple**
"Mettre en surbrillance les barres dont les ventes dépassent 1000"

"Mettre en surbrillance la barre avec la marge la plus élevée dans chaque région"



#### code

**Type:** `string`

:::note{title=Description}
Une valeur negative decale tout le composant vers le haut ; par exemple, -10 decale le texte et l arriere-plan de 10 pixels vers le haut.





**Exemple**







:::

**Exemple**

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

:::note{title=Description}


:::


##### field

**Type:** `string`

:::note{title=Description}

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}


**Exemple**



:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}








:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
"Use the highest sales value as a mark line reference"

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Calculer la moyenne pour la ligne d annotation





:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Description}

:::

**Exemple**
'Texte d’annotation'



### textColor

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Description}


:::

**Exemple**




### textFontWeight

**Type:** `number | undefined`

:::note{title=Description}


:::

**Exemple**




### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Description}






Couleur du texte

'Texte d annotation'

:::

**Exemple**
'right' texte à gauche du point d’annotation



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Il est recommande de definir 'top' pour que le texte soit entierement affiche dans la zone visible du graphique.

top : le texte est en bas de la ligne de reference ; le bord superieur est aligne sur l extremite de la ligne d annotation (verticale).

middle : le texte est centre sur la ligne de reference ; le centre est aligne sur l extremite de la ligne d annotation (verticale).

bottom : le texte est en haut de la ligne de reference ; le bord inferieur est aligne sur l extremite de la ligne d annotation (verticale).



:::

**Exemple**
'top' texte sous le point d’annotation



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}
**Exemple**

:::

**Exemple**




### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
top : le texte est sous la ligne de reference, avec son bord superieur aligne sur l extremite de la ligne d annotation (verticale).

:::

**Exemple**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
'right'

:::

**Exemple**




### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Description}


:::

**Exemple**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Description}

:::

**Exemple**




### offsetY

**Type:** `number | undefined`

:::note{title=Description}

**Exemple**



:::

**Exemple**



### offsetX

**Type:** `number | undefined`

:::note{title=Description}






:::

**Exemple**





## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Description}
Ligne de repère numérique (valeur d’intervalle), affichée verticalement, permettant de définir la position, le style, etc. de la ligne. Utilisez cette configuration si une ligne de repère correspondant à la valeur d’intervalle est nécessaire

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Description}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Description}











:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Convient aux scenarios ou la position de la ligne d annotation doit etre determinee dynamiquement selon les donnees, comme les moyennes, maximums, quantiles, lignes metier, etc.

:::

**Exemple**
"Obtenir la valeur de ventes maximale comme référence de ligne d’annotation"

"Calculer les ventes moyennes pour la ligne d’annotation"



#### code

**Type:** `string`

:::note{title=Description}






**Exemple**







:::

**Exemple**

```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```


```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```


```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

**Exemple**
```javascript
const currentYearTotal = _.sumBy(
_.filter(data, item => item.year === 2024),
'sales'
);
return currentYearTotal;
```



#### fallback

**Type:** `string | number | undefined`

:::note{title=Description}
\- Parametre d entree : data (tableau).

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Description}




const maxSales = _.maxBy(data, 'sales')?.sales;

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Description}
Ecrit pendant la phase prepare(), en lecture seule a l execution

:::

**Exemple**
'Texte d’annotation'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Description}
_.filter(data, item => item.year === 2024),

:::

**Exemple**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Description}
const index = Math.floor(sorted.length * 0.75);

:::

**Exemple**



### textFontWeight

**Type:** `number | undefined`

:::note{title=Description}


:::

**Exemple**




### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Description}


Position du texte



Position de l etiquette de la ligne d annotation (position relative de l etiquette par rapport a la ligne).



:::

**Exemple**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
**Exemple**

**Exemple**







:::

**Exemple**
'top'



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Description}


:::

**Exemple**




### lineColor

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=Description}


:::

**Exemple**




### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Il est recommande de definir 'top' pour que le texte soit entierement affiche dans la zone visible du graphique.

:::

**Exemple**
'solid'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}


:::

**Exemple**
center : texte au centre de la ligne de référence (à l’extrémité des lignes de marquage horizontales).



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Description}


:::

**Exemple**




### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
**Exemple**

:::

**Exemple**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Description}
**Exemple**

:::

**Exemple**





## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=Description}
Ligne de repère numérique (ligne moyenne, ligne maximale, ligne minimale, etc.), affichée horizontalement, permettant de définir la position, le style, etc. de la ligne. Utilisez cette configuration pour tracer une ligne correspondant à la valeur d’intervalle ; notez que la valeur d’intervalle dépend de `binValueType`

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Description}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Description}












:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**
"Obtenir la valeur de ventes maximale comme référence de ligne d’annotation"

"Calculer les ventes moyennes pour la ligne d’annotation"



#### code

**Type:** `string`

:::note{title=Description}
Opérateur



\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est pas dans value



'red'



:::

**Exemple**
\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est pas dans value
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```


```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```


```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

'solid'
```javascript
const currentYearTotal = _.sumBy(
_.filter(data, item => item.year === 2024),
'sales'
);
return currentYearTotal;
```



#### fallback

**Type:** `string | number | undefined`

:::note{title=Description}


:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Description}




Couleur du texte

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Description}
**Exemple**

:::

**Exemple**
'Texte d’annotation'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Description}
**Exemple**





:::

**Exemple**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Description}
center : le texte est centre dans la zone d annotation ; le centre du texte est aligne sur la zone.

:::

**Exemple**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Description}
Alignement vertical du texte ; generalement defini sur 'top' pour que le texte apparaisse en bas de la zone d annotation et reste dans la zone visible du graphique.

:::

**Exemple**




### textFontWeight

**Type:** `number | undefined`

:::note{title=Description}


:::

**Exemple**



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Description}








couleur d arriere-plan

:::

**Exemple**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
couleur du trace de l arriere-plan



couleur du trace de l arriere-plan

**Exemple**

**Exemple**

:::

**Exemple**
'top'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}
**Exemple**

:::

**Exemple**




### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
rayon des angles de l arriere-plan

:::

**Exemple**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Description}
marge interne de l arriere-plan

:::

**Exemple**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Couleur de la zone d annotation



Couleur de la zone d annotation

:::

**Exemple**




### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
**Exemple**

:::

**Exemple**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Description}
**Exemple**

:::

**Exemple**




### lineVisible

**Type:** `boolean | undefined`

:::note{title=Description}
**Exemple**



**Exemple**

:::

**Exemple**




### lineColor

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=Description}


:::

**Exemple**




### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Rayon des angles de bordure de la zone d annotation.

:::

**Exemple**
'solid'



### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=Description}


:::


#### positiveColor

**Type:** `string | undefined`

:::note{title=Description}


:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Description}


:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Description}
**Exemple**

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Description}
4

:::


#### field

**Type:** `string`

:::note{title=Description}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}




Couleur de la zone d annotation

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
**Exemple**






:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

### text

**Type:** `string | string[] | undefined`

:::note{title=Description}
'red'

:::

**Exemple**
'Texte d’annotation'



### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title=Description}
2

:::

**Exemple**
'top'



### textColor

**Type:** `string | undefined`

:::note{title=Description}
4

:::

**Exemple**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Description}
[2, 2]

:::

**Exemple**




### textFontWeight

**Type:** `number | undefined`

:::note{title=Description}
0

:::

**Exemple**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Description}
Configuration de la ligne de regression polynomiale, incluant l ordre du polynome, le style de la ligne de regression, etc.

Il est recommandé de définir la valeur sur 'center' afin que le texte soit au centre de la zone de repère







:::

**Exemple**
'center' texte au centre de la zone d’annotation



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}








Ordre de la regression polynomiale

:::

**Exemple**
'top' texte en bas de la zone d’annotation



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}


:::

**Exemple**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}

:::

**Exemple**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur du texte



Couleur du texte

:::

**Exemple**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
**Exemple**

:::

**Exemple**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
**Exemple**



**Exemple**

:::

**Exemple**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Description}
Marge intérieure de l’arrière-plan

:::

**Exemple**
4



### areaColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de la zone de repère

:::

**Exemple**
'red'



### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Description}


:::

**Exemple**
0.5



### areaBorderColor

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**
'red'



### areaBorderWidth

**Type:** `number | undefined`

:::note{title=Description}


:::

**Exemple**




### areaBorderRadius

**Type:** `number | undefined`

:::note{title=Description}


:::

**Exemple**



### areaLineDash

**Type:** `number[] | undefined`

:::note{title=Description}


:::

**Exemple**
[2, 2]



### outerPadding

**Type:** `number | undefined`

:::note{title=Description}
Marge de la zone de repère

:::

**Exemple**
0




## kdeRegressionLine

**Type:** `KdeRegressionLine | KdeRegressionLine[] | undefined`

:::note{title=Description}
Configuration de la ligne de régression par densité de noyau, utilisée pour afficher la tendance et la distribution des données

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Indique s’il faut activer la fonction de ligne de régression

:::

### color

**Type:** `string | undefined`

:::note{title=Description}
Couleur de la ligne de régression

Permet de définir la couleur de la ligne de régression ; si elle n’est pas définie, la couleur principale du graphique est utilisée par défaut

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Largeur de la ligne de régression

Permet de définir la largeur de la ligne de régression en pixels, valeur par défaut 1

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=Description}
Style de la ligne de régression

Permet de définir le style de la ligne de régression, par exemple ligne pleine ou pointillée ; la valeur par défaut est une ligne pleine

:::

### text

**Type:** `string | undefined`

:::note{title=Description}
Texte de l’étiquette de la ligne de régression

Permet de définir le texte de l’étiquette de la ligne de régression ; une chaîne vide signifie qu’aucune étiquette n’est affichée

:::

### textColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur du texte

:::

**Exemple**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Description}
Taille de police du texte

:::

**Exemple**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Graisse de police du texte

:::

**Exemple**
400




## ecdfRegressionLine

**Type:** `EcdfRegressionLine | EcdfRegressionLine[] | undefined`

:::note{title=Description}
Configuration de la ligne de régression de la fonction de distribution cumulative empirique, utilisée pour afficher la distribution cumulative des données

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Indique s’il faut activer

:::

### color

**Type:** `string | undefined`

:::note{title=Description}
Couleur de la ligne de régression

Permet de définir la couleur de la ligne de régression ; si elle n’est pas définie, la couleur principale du graphique est utilisée par défaut

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Largeur de la ligne de régression

Permet de définir la largeur de la ligne de régression en pixels, valeur par défaut 1

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=Description}
Style de la ligne de régression

Permet de définir le style de la ligne de régression, par exemple ligne pleine ou pointillée ; la valeur par défaut est une ligne pleine

:::

### text

**Type:** `string | undefined`

:::note{title=Description}
Texte de l’étiquette de la ligne de régression

Permet de définir le texte de l’étiquette de la ligne de régression ; une chaîne vide signifie qu’aucune étiquette n’est affichée

:::

### textColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur du texte

:::

**Exemple**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Description}
Taille de police du texte

:::

**Exemple**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Graisse de police du texte

:::

**Exemple**
400




## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=Description}
Indique s’il faut activer la liaison des dimensions lorsque le graphique active la fonction de pivot ou les combinaisons de mesures

Lors du survol d’une valeur de dimension, les données ayant la même valeur de dimension dans les autres graphiques sont mises en surbrillance de manière liée



Configuration de la liaison des dimensions du graphique pivot

:::


### enable

**Type:** `false | true`

:::note{title=Description}
Indique s’il faut activer la liaison des dimensions du graphique pivot

:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title=Description}
Indique s’il faut afficher les informations Tooltip des sous-graphiques correspondant à toutes les dimensions

:::

### showLabel

**Type:** `boolean | undefined`

:::note{title=Description}
Indique s’il faut afficher l’étiquette correspondant au crosshair

:::


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Description}
Configuration de la langue du graphique, prenant en charge 'zh\-CN' et 'en\-US'. Il est aussi possible d’appeler intl.setLocale('zh\-CN') pour définir la langue

:::
