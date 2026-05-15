# Pie

:::info{title=Recommandé}
- Configuration de champs recommandée : `1` mesure, `1` dimension

\- Prend en charge Data Reshape : au moins `1` mesure, `0` dimension

:::

:::info{title=Mappage Encoding}
Le graphique en secteurs prend en charge les canaux visuels suivants :

`angle`  : canal d’angle, prend en charge `plusieurs mesures` et mappe les valeurs de mesure à l’angle des secteurs

`detail` : canal de détail, prend en charge `plusieurs dimensions`, utilisé pour afficher des données plus granulaires dans une même série de couleurs

`color`  : canal de couleur, prend en charge `plusieurs dimensions` ou `une mesure`; les couleurs de dimension distinguent les séries, les couleurs de mesure mappent linéairement les valeurs sur les couleurs graphiques

`tooltip`: canal d’infobulle, prend en charge `plusieurs dimensions` et `plusieurs mesures`, affiché au survol d’un point de données

`label`  : canal d’étiquette, prend en charge `plusieurs dimensions` et `plusieurs mesures`, affiche les étiquettes sur les points de données

:::

:::note{title=Description}
Le graphique en secteurs convient à l’affichage des proportions d’une dimension unique, la surface des secteurs représentant la part de chaque catégorie

Scenarios applicables :

\- Afficher la distribution des proportions des données catégorielles

\- Mettre en évidence la relation entre le tout et ses parties

\- Analyse des proportions avec un petit nombre de catégories (recommandé : pas plus de 6)

:::

:::warning{title=Warning}
Exigences de donnees :

\- au moins 1 champ numerique

\- Toutes les dimensions sont combinées avec les noms de mesures (s’il existe plusieurs mesures) en une seule dimension et affichées comme éléments de légende

\- Toutes les mesures sont automatiquement fusionnees en une seule mesure

Fonctionnalites activees par defaut :

\- Active par défaut la légende, les étiquettes de données, les infobulles et le calcul des proportions

:::


## chartType

**Type:** `"pie"`

:::note{title=Description}
Graphique en secteurs



Graphique en secteurs, affiche les proportions de données sur une dimension unique

:::

**Exemple**
'pie'




## dataset

**Type:** `Record[]`

:::note{title=Description}
Jeu de données préagrégé conforme à TidyData, définissant la source et la structure des données du graphique. Les utilisateurs n'ont pas besoin de traiter manuellement les données d'entrée ; la puissante capacité Data Reshape de VSeed s'en charge automatiquement. Les données du graphique Area sont finalement remodelées en 2 dimensions et 1 mesure.



Jeu de données déjà agrégé et conforme à la spécification TidyData, utilisé pour définir la source et la structure des données du graphique. Le jeu de données saisi par l’utilisateur ne nécessite aucun traitement. VSeed dispose de puissantes capacités de remodelage des données et effectue ce remodelage automatiquement. Les données du graphique en entonnoir sont finalement converties en 1 dimension et 1 mesure.

:::

**Exemple**
[{category:'A', value:30}, {category:'B', value:70}]




## dimensions

**Type:** `PieDimension[] | undefined`

:::note{title=Description}
La première dimension est mappée sur l'axe X ; les dimensions restantes sont fusionnées avec les noms de mesures (lorsqu'il y a plusieurs mesures) et affichées comme éléments de légende.



Toutes les dimensions du graphique en secteurs sont combinées avec les noms de mesures (s’il existe plusieurs mesures) en une seule dimension, mappées à l’angle et affichées comme éléments de légende

:::

**Exemple**
[{id: 'category', alias: 'Catégorie'}]




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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

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

**Type:** `PieMeasure[] | undefined`

:::note{title=Description}
Mesures



Toutes les mesures du graphique en secteurs sont automatiquement fusionnées en une seule mesure et mappées à l’axe du rayon. Lorsqu’il existe plusieurs mesures, leurs noms sont combinés avec les autres dimensions et affichés comme éléments de légende.

:::

**Exemple**
[{id: 'value', alias: 'Part de la valeur', format: 'percent'}]




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

**Type:** `"color" | "tooltip" | "label" | "angle" | undefined`

:::note{title=Description}
Canal auquel la mesure est mappée

\- angle : angle auquel la mesure est mappée

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
Couleur





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

**Type:** `PieLabel | undefined`

:::note{title=Description}
Configuration des étiquettes pour définir les étiquettes de données du graphique, y compris leur position, format et style.





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

### labelLayout

**Type:** `"arc" | "labelLine" | "edge" | undefined`

:::note{title=Description}
Mode de disposition des étiquettes, actif uniquement pour les graphiques en secteurs et en anneau lorsque `labelPosition` vaut `outside`

\- arc : dispose les étiquettes selon l’arc

\- labelLine : aligne les deux extrémités des étiquettes et relie les secteurs aux étiquettes par des lignes de guidage

\- edge : aligne les deux extrémités des étiquettes, relie les secteurs aux étiquettes par des lignes de guidage et les rapproche des bords du graphique

:::


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
**Type:** `XLinearAxis | undefined`



**Type:** `boolean | undefined`









:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Description}
Opacité of selected data points, range 0-1



**Type:** `number | boolean | undefined`

**Type:** `string | undefined`



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
**Type:** `boolean | undefined`

:::


## animation

**Type:** `PieLikeAnimation | undefined`

:::note{title=Description}
Intervalle de masquage automatique des etiquettes d axe ; si l intervalle entre deux etiquettes est inferieur a autoHideGap, l etiquette en chevauchement est masquee automatiquement. Effectif uniquement pour les axes categoriels.



Lorsque autoHide est desactive, utilisez l echantillonnage configure sur minGap

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Indique s’il faut activer l’animation des graphiques en secteurs/en anneau/en rose

:::

### params

**Type:** `PieLikeAnimationParams | undefined`

:::note{title=Description}
Paramètres d’animation des graphiques en secteurs/en anneau/en rose

:::


#### appear

**Type:** `PieLikeAppearAnimation | undefined`

:::note{title=Description}
Configuration de l’animation d’entrée des graphiques en secteurs/en anneau/en rose

:::


##### effects

**Type:** `("radial" | "scale")[] | undefined`

:::note{title=Description}
Effet d’entrée des graphiques en secteurs/en anneau/en rose, avec prise en charge des animations radiales et de zoom

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Description}


:::

##### ease

**Type:** `string | undefined`

:::note{title=Description}
**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::

##### duration

**Type:** `number | undefined`

:::note{title=Description}


:::

##### color

**Type:** `string | undefined`

:::note{title=Description}


:::

#### update

**Type:** `PieLikeUpdateAnimation | undefined`

:::note{title=Description}
Configuration de l’animation de mise à jour des graphiques en secteurs/en anneau/en rose

:::


##### effects

**Type:** `"radial"[] | undefined`

:::note{title=Description}
Effet de mise à jour des graphiques en secteurs/en anneau/en rose, avec prise en charge de l’animation radiale

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Description}


:::

##### ease

**Type:** `string | undefined`

:::note{title=Description}
**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::

##### duration

**Type:** `number | undefined`

:::note{title=Description}


:::

##### color

**Type:** `string | undefined`

:::note{title=Description}


:::

#### loop

**Type:** `PieLikeAnimationLoop | undefined`

:::note{title=Description}
Configuration de l’animation en boucle des graphiques en secteurs/en anneau/en rose

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=Description}
**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::

##### interval

**Type:** `number | undefined`

:::note{title=Description}


:::

##### loop

**Type:** `PieLikeLoopAnimation | undefined`

:::note{title=Description}
Configuration de l’animation en boucle des graphiques en secteurs/en anneau/en rose

:::


###### effects

**Type:** `PieLikeLoopEffect[] | undefined`

:::note{title=Description}
Effet de boucle des graphiques en secteurs/en anneau/en rose

:::

###### enable

**Type:** `boolean | undefined`

:::note{title=Description}


:::

###### ease

**Type:** `string | undefined`

:::note{title=Description}
**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::

###### duration

**Type:** `number | undefined`

:::note{title=Description}


:::

###### color

**Type:** `string | undefined`

:::note{title=Description}


:::

##### atmosphere

**Type:** `NoEffectAtmosphereConfig | undefined`

:::note{title=Description}
Configuration de l’animation d’ambiance des graphiques en secteurs/en anneau/en rose

:::


###### ease

**Type:** `string | undefined`

:::note{title=Description}


:::

###### color

**Type:** `string | undefined`

:::note{title=Description}


:::


## theme

**Type:** `Theme | undefined`

:::note{title=Description}




Sélecteur de données. S’il est configuré, il fournit des capacités de correspondance pour les valeurs numériques, les éléments de données partiels, les dimensions ou les mesures. S’il n’est pas défini, les styles s’appliquent globalement.



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


## locale

**Type:** `Locale | undefined`

:::note{title=Description}
Langue



Configuration de la langue du graphique, prenant en charge 'zh\-CN' et 'en\-US'. Il est aussi possible d’appeler intl.setLocale('zh\-CN') pour définir la langue

:::

