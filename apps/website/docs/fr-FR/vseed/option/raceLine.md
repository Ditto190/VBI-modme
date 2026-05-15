# RaceLine

:::note{title=Description}
Graphique en courbes anime (Race Line Chart)

Convient pour afficher les tendances des donnees au fil du temps; les points de donnees sont relies par des segments pour former une courbe de tendance

Cas d utilisation:

\- Afficher les tendances de plusieurs series de donnees au fil du temps

\- Comparer les schemas de croissance ou de baisse entre differentes categories

\- Observer les fluctuations des donnees sur la dimension temporelle

:::

:::note{title=Note}
Graphique en courbes anime:

\- L axe X est generalement un axe temporel ou categoriel et affiche les valeurs de dimension

\- L axe Y est un axe numerique et affiche les valeurs de mesure

\- Permet de controler la dimension temporelle via le lecteur pour afficher dynamiquement la progression de la courbe

:::


## chartType

**Type:** `"raceLine"`

:::note{title=Description}
Graphique en courbes anime, adapte a l affichage des tendances de donnees au fil du temps

:::


## dataset

**Type:** `Record[]`

:::note{title=Description}
Source de données

:::


## dimensions

**Type:** `ColumnDimension[] | undefined`

:::note{title=Description}
La première dimension est mappée sur l'axe X ; les dimensions restantes sont fusionnées avec les noms de mesures (lorsqu'il y a plusieurs mesures) et affichées comme éléments de légende.

:::


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

:::


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

### format

**Type:** `NumFormat | undefined`


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

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "yAxis" | undefined`

:::note{title=Description}
Canal auquel la mesure est mappée

\- yAxis : mesure mappée sur l’axe y

\- detail: Measure mapped to the detail channel

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




## player

**Type:** `Player | undefined`

:::note{title=Description}
Configuration du lecteur pour definir la dimension temporelle; configuration centrale du graphique en courbes anime



Configuration du lecteur, utilisée pour spécifier le nom du champ à lire, qui doit être une dimension

:::

:::warning{title=Warning}
Cette fonction ne prend pas en charge les types de graphiques table, pivotTable, dualAxis, histogram, boxPlot, etc., ni l’utilisation avec combinaison de mesures ou pivot lignes/colonnes activé

:::


### maxCount

**Type:** `number | false | undefined`

:::note{title=Description}
Nombre maximal de lectures ; les données au-delà de ce nombre sont tronquées, false signifie aucune limite

:::

### interval

**Type:** `number | undefined`

:::note{title=Description}
Intervalle de lecture, unité ms

:::

### autoPlay

**Type:** `boolean | undefined`

:::note{title=Description}
Indique s’il faut lire automatiquement

:::

### loop

**Type:** `boolean | undefined`

:::note{title=Description}
Indique s’il faut lire en boucle

:::

### position

**Type:** `"left" | "top" | "right" | "bottom" | undefined`

:::note{title=Description}
Position du lecteur

:::

### railColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de la piste de la barre de progression du lecteur

:::

### fontFamily

**Type:** `string | undefined`

:::note{title=Description}
Police du texte du lecteur

:::

### fontSize

**Type:** `number | undefined`

:::note{title=Description}
Taille de police du texte du lecteur

:::

### trackColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de progression de la barre de progression du lecteur

:::

### sliderHandleColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur du curseur de la barre de progression du lecteur

:::

### sliderHandleBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de bordure du curseur de la barre de progression du lecteur

:::

### startButtonColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur du bouton de démarrage du lecteur

:::

### pauseButtonColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur du bouton pause du lecteur

:::

### backwardButtonColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur du bouton retour du lecteur

:::

### forwardButtonColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur du bouton avance du lecteur

:::


## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Description}

:::


## color

**Type:** `Color | undefined`

:::note{title=Description}
Configuration des couleurs

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
Configuration des étiquettes

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

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
  orderBy: 'profit',

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}
or

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
**Exemple**




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
**Exemple**




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}




Couleur du trace de l arriere-plan













'red'











Rayon des angles de l arriere-plan

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**
"Mettre en surbrillance les elements de donnees dont les ventes depassent 1000"

"Mettre en surbrillance l element de donnees avec le taux de profit le plus eleve dans chaque region"



#### code

**Type:** `string`

:::note{title=Description}
Opérateur



\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est pas dans value

**Exemple**






:::

**Exemple**
Mettre en surbrillance le champ sales des elements de donnees dont les ventes depassent 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Mettre en surbrillance l element de donnees avec le taux de profit le plus eleve dans chaque region
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

Mettre en surbrillance les elements de donnees filtres par plusieurs conditions
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
**Exemple**




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}




Couleur du texte

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
Configuration de la légende

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
border: true



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
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=Description}


:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}


:::

**Exemple**
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Description}


:::

:::warning{title=Warning}


:::

**Exemple**
shapeType: 'circle'



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Description}


:::

**Exemple**
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=Description}






:::

:::warning{title=Warning}


:::

**Exemple**
maxSize: 2




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Description}
Configuration des infobulles

:::


### enable

**Type:** `false | true`

:::note{title=Description}


:::


## brush

**Type:** `Brush | undefined`

:::note{title=Description}
Configuration du brush



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

**Type:** `XBandAxis | undefined`

:::note{title=Description}
Configuration de l axe X, axe categoriel affichant les valeurs de dimension

:::


### visible

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

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=Description}


:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=Description}






:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=Description}

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=Description}
'dark'

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
value: 'tool'

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
**Exemple**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
\- orderBy:'date'

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
Configuration du tri de la legende ; prend en charge le tri selon les dimensions ou les mesures, ainsi que les ordres personnalises ; le tableau sort suit l ordre de gauche a droite ou de haut en bas.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Description}
sortLegend: {

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

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Description}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Description}
Ordre de tri personnalise ; cet ordre est applique directement a la legende. L ordre croissant suit gauche-droite ou haut-bas ; l ordre decroissant suit droite-gauche ou bas-haut.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Description}
  ])

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Description}
Inclut les themes integres `light` et `dark`. Les themes personnalises peuvent etre ajoutes via `registerTheme`.

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
- not in : sélectionne les éléments de données dont la valeur du champ de dimension n’est pas dans le tableau `value`.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Description}
Prend en charge les styles globaux ou les configurations de style conditionnelles.

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
Configuration de l axe Y, axe numerique affichant les valeurs de mesure

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Description}

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


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}


:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Description}
value: 'tool'

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
**Exemple**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
\- orderBy:'date'

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
Configuration du tri de la legende ; prend en charge le tri selon les dimensions ou les mesures, ainsi que les ordres personnalises ; le tableau sort suit l ordre de gauche a droite ou de haut en bas.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Description}
sortLegend: {

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

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Description}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Description}
Ordre de tri personnalise ; cet ordre est applique directement a la legende. L ordre croissant suit gauche-droite ou haut-bas ; l ordre decroissant suit droite-gauche ou bas-haut.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Description}
  ])

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Description}
Inclut les themes integres `light` et `dark`. Les themes personnalises peuvent etre ajoutes via `registerTheme`.

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
- not in : sélectionne les éléments de données dont la valeur du champ de dimension n’est pas dans le tableau `value`.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Description}
Prend en charge les styles globaux ou les configurations de style conditionnelles.

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


## crosshairLine

**Type:** `CrosshairLine | undefined`

:::note{title=Description}
Configuration de la ligne de repere verticale



Configuration de la ligne de visee, un type de configuration permettant d afficher une ligne de visee (ligne de repere) dans le graphique

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la ligne de visee est affichee

:::

### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de la ligne de visee

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de l etiquette de la ligne de visee

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si le libellé de la ligne de visée est affiché

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur d arriere-plan de l etiquette de la ligne de visee

:::


## sort

**Type:** `Sort | undefined`

:::note{title=Description}
Configuration du tri de l axe X





:::

**Exemple**
\- order:'asc'
\- orderBy:'date'

\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Description}
])

:::

**Exemple**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=Description}
\- `__row_index` represente le numero de ligne de l element de donnees original, et `field` represente le champ a mettre en evidence.

:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=Description}
Configuration du tri de la légende



Configuration de filtre dynamique du graphique : filtre les marques du graphique (barres, points, etc.) via du code JavaScript généré par IA.

:::

**Exemple**
\- order:'asc'
\- orderBy:'date'

\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Description}
])

:::

**Exemple**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=Description}
  _.maxBy(group, item => item.profit / item.sales)

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Description}
Configuration du thème



const maxItems = _.map(grouped, group =>



_.map(maxItems, item => [

:::


### length

**Type:** `number`

### brand

**Type:** `brand`


## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title=Description}
Configuration du style des marqueurs de point

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
- not in : sélectionne les éléments de données dont la valeur du champ de dimension n’est pas dans le tableau `value`.






:::

**Exemple**
Couleur du trace du primitive barre (rectangle)
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

:::note{title=Description}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
**Exemple**




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
**Exemple**




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}




Couleur du trace de l arriere-plan















'red'











Rayon des angles de l arriere-plan

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**
"Mettre en surbrillance les elements de donnees dont les ventes depassent 1000"

"Mettre en surbrillance l element de donnees avec le taux de profit le plus eleve dans chaque region"



#### code

**Type:** `string`

:::note{title=Description}
Opérateur



\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est pas dans value

**Exemple**






:::

**Exemple**
Mettre en surbrillance le champ sales des elements de donnees dont les ventes depassent 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Mettre en surbrillance l element de donnees avec le taux de profit le plus eleve dans chaque region
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

Mettre en surbrillance les elements de donnees filtres par plusieurs conditions
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
**Exemple**




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}




Couleur du texte

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### pointVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les points sont visibles

:::

### pointSize

**Type:** `number | undefined`

:::note{title=Description}
Taille du point



Taille du point

:::

### pointColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur du marqueur de point



Couleur du marqueur de point

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Opacité de la couleur du marqueur de point



Opacité de la couleur du marqueur de point

:::

### pointBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de bordure du marqueur de point



Couleur de bordure du marqueur de point

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Largeur de bordure du marqueur de point



Largeur de bordure du marqueur de point

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Style de bordure du marqueur de point



Style de bordure du marqueur de point

:::

**Exemple**
solid

dashed

dotted




## lineStyle

**Type:** `LineStyle | LineStyle[] | undefined`

:::note{title=Description}
Configuration du style des marqueurs de ligne

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
- not in : sélectionne les éléments de données dont la valeur du champ de dimension n’est pas dans le tableau `value`.






:::

**Exemple**
Couleur du trace du primitive barre (rectangle)
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

:::note{title=Description}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
**Exemple**




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
**Exemple**




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}




Couleur du trace de l arriere-plan















'red'











Rayon des angles de l arriere-plan

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**
"Mettre en surbrillance les elements de donnees dont les ventes depassent 1000"

"Mettre en surbrillance l element de donnees avec le taux de profit le plus eleve dans chaque region"



#### code

**Type:** `string`

:::note{title=Description}
Opérateur



\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est pas dans value

**Exemple**






:::

**Exemple**
Mettre en surbrillance le champ sales des elements de donnees dont les ventes depassent 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Mettre en surbrillance l element de donnees avec le taux de profit le plus eleve dans chaque region
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

Mettre en surbrillance les elements de donnees filtres par plusieurs conditions
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
**Exemple**




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}




Couleur du texte

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### lineVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les segments de ligne sont visibles

:::

### lineSmooth

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les segments de ligne sont lisses

:::

### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur du segment de ligne

:::

### lineColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Opacité de la couleur du segment de ligne

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Largeur du segment de ligne

:::

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Style du segment de ligne

:::

**Exemple**
`lineStyle: 'solid'`




## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Description}
Configuration des points de repère

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
**Exemple**




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
**Exemple**




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

### measureId

**Type:** `string | undefined`

:::note{title=Description}
Specifie l id de la mesure a laquelle appartient le point d annotation. Dans les scenarios multi-measure, il peut etre combine avec selector pour identifier de maniere unique le point d annotation correspondant a la mesure cible.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}




Couleur du trace de l arriere-plan















'red'











Rayon des angles de l arriere-plan

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**
"Mettre en surbrillance les elements de donnees dont les ventes depassent 1000"

"Mettre en surbrillance l element de donnees avec le taux de profit le plus eleve dans chaque region"



#### code

**Type:** `string`

:::note{title=Description}
Opérateur



\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est pas dans value

**Exemple**






:::

**Exemple**
Mettre en surbrillance le champ sales des elements de donnees dont les ventes depassent 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Mettre en surbrillance l element de donnees avec le taux de profit le plus eleve dans chaque region
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

Mettre en surbrillance les elements de donnees filtres par plusieurs conditions
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
**Exemple**




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}




Couleur du texte

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
'red'

:::

**Exemple**
'Texte du repère'



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
12



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




Taille de police du texte.


**Exemple**

:::

**Exemple**
'right' le texte se trouve à gauche du point de repère



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
**Exemple**









:::

**Exemple**
'top' le texte se trouve en bas du point de repère



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



### offsetY

**Type:** `number | undefined`

:::note{title=Description}




Indique si l arriere-plan est visible.

:::

**Exemple**
true



### offsetX

**Type:** `number | undefined`

:::note{title=Description}
Couleur d arriere-plan.


**Exemple**

:::

**Exemple**
2




## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Description}
Configuration de la ligne d annotation de valeur de dimension

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


:::

**Exemple**
"Obtenir la valeur de ventes la plus élevée comme référence de ligne de repère"

"Calculer les ventes moyennes pour la ligne de repère"



#### code

**Type:** `string`

:::note{title=Description}
Opérateur



\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est pas dans value







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
'red'

:::

**Exemple**
'Texte du repère'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Description}
Valeurs du champ de dimension selectionnees ; prend en charge les tableaux.

:::

**Exemple**
'outsideEnd'



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
12



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
left : le texte est a droite de la zone d annotation, avec son bord gauche aligne sur la zone.

center : le texte est centre dans la zone d annotation.

Couleur du texte.


**Exemple**

:::

**Exemple**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
middle : le texte est centre verticalement dans la zone d annotation.









:::

**Exemple**
'top'



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Description}


:::

**Exemple**
true



### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de bordure de la zone d annotation.

:::

**Exemple**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Largeur de bordure de la zone d annotation.

:::

**Exemple**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Rayon des angles de bordure de la zone d annotation.

:::

**Exemple**
'solid'



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




## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=Description}
Configuration de la ligne d annotation numerique

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
"Obtenir la valeur de ventes la plus élevée comme référence de ligne de repère"

"Calculer les ventes moyennes pour la ligne de repère"



#### code

**Type:** `string`

:::note{title=Description}
Opérateur



\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est pas dans value







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
'red'

:::

**Exemple**
'Texte du repère'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Description}
2





:::

**Exemple**
'outsideEnd'



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
12



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
left : le texte est a droite de la zone d annotation, avec son bord gauche aligne sur la zone.

center : le texte est centre dans la zone d annotation.



**Exemple**



:::

**Exemple**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
middle : le texte est centre verticalement dans la zone d annotation.



couleur du trace de l arriere-plan

**Exemple**



:::

**Exemple**
'top'



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

:::

**Exemple**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
**Exemple**



**Exemple**

:::

**Exemple**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
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



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Description}






:::

**Exemple**
true



### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de bordure de la zone d annotation.

:::

**Exemple**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Largeur de bordure de la zone d annotation.

:::

**Exemple**
2



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
Style de tirets de la bordure de la zone d annotation.

:::


#### positiveColor

**Type:** `string | undefined`

:::note{title=Description}


:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Description}
0

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Description}
Configuration de la zone de repère

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Description}
Indique si la fonction de liaison de dimension est activee lorsque la perspective est activee sur le graphique ou lorsque les mesures sont combinees.

:::


#### field

**Type:** `string`

:::note{title=Description}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
**Exemple**




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
**Exemple**




same as operator

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
'Texte du repère'



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
12



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
'center' le texte se trouve au centre de la zone de repère



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}








Ordre de la regression polynomiale

:::

**Exemple**
'top' le texte se trouve en bas de la zone de repère



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
2



### areaBorderRadius

**Type:** `number | undefined`

:::note{title=Description}


:::

**Exemple**
4



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
Configuration de la liaison des dimensions



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
Configuration de la langue

:::
