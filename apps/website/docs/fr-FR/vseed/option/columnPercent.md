# ColumnPercent

:::info{title=Recommandé}
\- Configuration de champs recommandee : `1` mesure, `2` dimensions

\- Prend en charge Data Reshape : au moins `1` mesure, `0` dimension

:::

:::info{title=Mappage des encodages}
Le graphique en colonnes en pourcentage prend en charge les canaux visuels suivants :

`xAxis`  : canal de l’axe x, prend en charge `plusieurs dimensions`, mappé sur l’axe x selon la valeur de dimension

`yAxis`  : canal de l’axe y, prend en charge `plusieurs mesures`, mappé sur l’axe y selon la valeur de mesure

`detail` : canal de détail, prend en charge `plusieurs dimensions`, utilisé pour afficher des données plus granulaires dans une même série de couleurs

`color`  : canal de couleur, prend en charge `plusieurs dimensions` ou `une mesure`; les couleurs de dimension distinguent les séries, les couleurs de mesure mappent linéairement les valeurs sur les couleurs graphiques

`tooltip`: canal d’infobulle, prend en charge `plusieurs dimensions` et `plusieurs mesures`, affiché au survol d’un point de données

`label`  : canal d’étiquette, prend en charge `plusieurs dimensions` et `plusieurs mesures`, affiche les étiquettes sur les points de données

:::

:::note{title=Description}
Le graphique en colonnes en pourcentage convient aux scénarios qui montrent les proportions de chaque catégorie ; l’axe Y affiche les parts de données sous forme de pourcentage

Scenarios applicables :

\- Comparaison des proportions de données entre différentes catégories

\- Analyse de la composition des données multidimensionnelles

\- Tendance d’évolution des proportions dans une série temporelle

:::

:::warning{title=Warning}
Exigences de donnees :

\- Au moins 1 champ de mesure

\- La première dimension sera placée sur l’axe X ; les dimensions restantes seront fusionnées avec les noms de mesures (lorsqu’il y a plusieurs mesures) et affichées comme éléments de légende.

\- Toutes les mesures sont automatiquement fusionnees en une seule mesure

Fonctionnalites activees par defaut :

\- Active par défaut la légende, les axes, les étiquettes en pourcentage, les infobulles et le calcul des proportions

:::


## chartType

**Type:** `"columnPercent"`

:::note{title=Description}
Graphique en colonnes en pourcentage



Graphique en colonnes en pourcentage, qui affiche les proportions des données de chaque catégorie sous forme de pourcentage

:::

**Exemple**
'columnPercent'




## dataset

**Type:** `Record[]`

:::note{title=Description}
Jeu de données préagrégé conforme à TidyData, définissant la source et la structure des données du graphique. Les utilisateurs n'ont pas besoin de traiter manuellement les données d'entrée ; la puissante capacité Data Reshape de VSeed s'en charge automatiquement. Les données du graphique Area sont finalement remodelées en 2 dimensions et 1 mesure.



Jeu de données déjà agrégé et conforme à la spécification TidyData, utilisé pour définir la source et la structure des données du graphique. Le jeu de données saisi par l’utilisateur ne nécessite aucun traitement. VSeed dispose de puissantes capacités de remodelage des données et effectue ce remodelage automatiquement. Les données du graphique en colonnes en pourcentage sont finalement converties en 2 dimensions et 1 mesure.

:::

**Exemple**
[{category:'A', value:30}, {category:'B', value:70}]




## dimensions

**Type:** `ColumnDimension[] | undefined`

:::note{title=Description}
La première dimension est mappée sur l'axe X ; les dimensions restantes sont fusionnées avec les noms de mesures (lorsqu'il y a plusieurs mesures) et affichées comme éléments de légende.



**Exemple**

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

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=Description}
Canal auquel la dimension est mappée

\- xAxis : prend en charge le mapping de plusieurs dimensions sur l’axe x

\- color : prend en charge le mapping de plusieurs dimensions vers le canal de couleur

\- detail : prend en charge le mapping de plusieurs dimensions vers le canal de détail

\- tooltip : permet de mapper plusieurs dimensions au canal d'infobulle

\- label : permet de mapper plusieurs dimensions au canal d'étiquette

\- row : prend en charge le mapping de plusieurs dimensions vers le canal de ligne

\- column : prend en charge le mapping de plusieurs dimensions vers le canal de colonne

:::


## measures

**Type:** `ColumnMeasure[] | undefined`

:::note{title=Description}
Mesures



Les mesures du graphique en colonnes en pourcentage sont automatiquement fusionnées en une seule mesure et mappées sur l’axe Y. Lorsqu’il existe plusieurs mesures, leurs noms sont combinés avec les autres dimensions et affichés comme éléments de légende.

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

**Type:** `"color" | "detail" | "tooltip" | "label" | "yAxis" | undefined`

:::note{title=Description}
Canal auquel la mesure est mappée

\- yAxis : mesure mappée sur l’axe y

\- detail : mesure mappée vers le canal de détail

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
Couleur d arriere-plan du graphique. Par defaut, l arriere-plan est transparent. La couleur peut etre une chaine de couleur (par exemple 'red', 'blue') ou une valeur hex, rgb ou rgba (par exemple '#ff0000', 'rgba(255,0,0,0.5)').

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





## regionPadding

**Type:** `RegionPadding | undefined`

:::note{title=Description}




**Type:** `false | true`

:::


### top

**Type:** `number | undefined`

### right

**Type:** `number | undefined`

### bottom

**Type:** `number | undefined`

### left

**Type:** `number | undefined`


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

**Type:** `BarLikeAnimation | undefined`

:::note{title=Description}
Intervalle de masquage automatique des etiquettes d axe ; si l intervalle entre deux etiquettes est inferieur a autoHideGap, l etiquette en chevauchement est masquee automatiquement. Effectif uniquement pour les axes categoriels.



Lorsque autoHide est desactive, utilisez l echantillonnage configure sur minGap

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}


:::

### params

**Type:** `BarLikeAnimationParams | undefined`

:::note{title=Description}


:::


#### appear

**Type:** `BarLikeAppearAnimation | undefined`

:::note{title=Description}


:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=Description}


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

**Type:** `BarLikeUpdateAnimation | undefined`

:::note{title=Description}


:::


##### effects

**Type:** `("growth" | "moveIn")[] | undefined`

:::note{title=Description}


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

**Type:** `BarLikeAnimationLoop | undefined`

:::note{title=Description}


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

**Type:** `BarLikeLoopAnimation | undefined`

:::note{title=Description}


:::


###### effects

**Type:** `BarLikeLoopEffect[] | undefined`

:::note{title=Description}


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

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=Description}


:::


###### ease

**Type:** `string | undefined`

:::note{title=Description}


:::

###### color

**Type:** `string | undefined`

:::note{title=Description}


:::

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title=Description}


:::


## xAxis

**Type:** `XBandAxis | undefined`

:::note{title=Description}
**Type:** `boolean | undefined`

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Type de ligne de grille

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

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=Description}


:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=Description}


Axe Y, axe numerique, configuration de l axe Y ; definit l axe Y du graphique, notamment sa position, son format, son style, etc.

**Type:** `string | undefined`

:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=Description}


:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=Description}


:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=Description}


:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=Description}


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
**Type:** `"morePrecision" | "lessPrecision" | undefined`

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
**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

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
**Type:** `string | undefined`

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
**Type:** `{ duration?: number; easing?: string; } | undefined`

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
**Type:** `string[] | undefined`

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
**Type:** `brand`

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
**Type:** `string | number | undefined`

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
Coins arrondis empilés du graphique en colonnes groupées

:::


## barMaxWidth

**Type:** `string | number | undefined`

:::note{title=Description}


:::


## sort

**Type:** `Sort | undefined`

:::note{title=Description}
Implémente une logique de filtrage de données complexe avec du code JavaScript généré par IA





:::

**Exemple**


**Type:** `"in" | "not in" | undefined`
}

Opérateur
}


\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est pas dans value

Remarque : selector et dynamicFilter ne peuvent pas être utilisés simultanément ; dynamicFilter a une priorité plus élevée




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Description}


:::

**Exemple**
**Type:** `"row-with-field"`



### orderBy

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**





### customOrder

**Type:** `string[] | undefined`

:::note{title=Description}


:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=Description}






:::

**Exemple**

Configuration du filtre anime du graphique

}

Implemente le filtrage des marqueurs du graphique (barres, points, etc.) via du code JavaScript genere par IA
}



_.maxBy(group, item => item.profit / item.sales)





### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Description}
])

:::

**Exemple**
"Highlight the bar with the highest profit rate in each region"



### orderBy

**Type:** `string | undefined`

:::note{title=Description}
Code JavaScript de filtrage généré par IA

:::

**Exemple**

\- Parametre d entree : data (tableau), chaque element contient un champ __row_index representant le numero de ligne



### customOrder

**Type:** `string[] | undefined`

:::note{title=Description}


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
Style des marques rectangulaires, utilisé pour définir leur couleur, bordure, rayon d’angle, etc. dans le graphique.

Indique si le primitive barre (rectangle) est visible





**Type:** `string | undefined`

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}




**Type:** `string | undefined`

**Type:** `boolean | undefined`

:::

**Exemple**
Couleur du trace du primitive barre (rectangle)

**Type:** `number | undefined`

**Type:** `string | undefined`

**Type:** `number | undefined`





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


**Type:** `number | number[] | undefined`



:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}




**Type:** `Selector | Selectors | undefined`

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





**Type:** `"in" | "not in" | undefined`

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




**Type:** `Selector | Selectors | undefined`

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
**Type:** `string | string[] | undefined`

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}


:::

**Exemple**
**Type:** `string | undefined`







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





**Type:** `boolean | undefined`

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
**Type:** `"value"`

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
**Type:** `string | number | undefined`

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
**Type:** `boolean | undefined`

:::

**Exemple**




### offsetY

**Type:** `number | undefined`

:::note{title=Description}
**Type:** `string | undefined`

**Exemple**



:::

**Exemple**
**Type:** `number | undefined`



### offsetX

**Type:** `number | undefined`

:::note{title=Description}






:::

**Exemple**





## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Description}
**Type:** `number | undefined`

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Description}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Description}






**Type:** `string | number | (string | number)[] | undefined`





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
**Type:** `false | true`



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
4

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

**Type:** `"in" | "not in" | undefined`

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

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
**Type:** `boolean | undefined`



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

**Type:** `number | undefined`





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
**Type:** `string | undefined`

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
**Type:** `boolean | undefined`



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

**Type:** `Locale | undefined`

:::note{title=Description}
Configuration de la langue du graphique, prenant en charge 'zh\-CN' et 'en\-US'. Il est aussi possible d’appeler intl.setLocale('zh\-CN') pour définir la langue

:::

