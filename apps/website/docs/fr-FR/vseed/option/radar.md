# Radar

:::info{title=Recommendation}
\- Recommended field configuration: `1` measure and `1` dimension

\- Supports data reshaping: at least `1` measure and `0` dimensions

:::

:::info{title=Encoding Mapping}
Radar charts support the following visual channels:

`angle`  : Angle channel, supports `multiple dimensions`, mapped to the angle axis by dimension value

`radius` : Radius channel, supports `multiple measures`, mapped to the radius axis by measure value

`color`  : Color channel, supports `multiple dimensions` or `one measure`; dimension colors distinguish data series, while measure colors linearly map measure values to graphic colors

`tooltip`: Tooltip channel, supports `multiple dimensions` and `multiple measures`, shown when hovering over data points

`label`  : Label channel, supports `multiple dimensions` and `multiple measures`, displayed as data labels on data points

:::

:::note{title=Description}
Radar chart, suitable for comparative analysis of multidimensional data, showing value distribution across dimensions through a multi-axis coordinate system

Cas d utilisation:

\- Compare overall performance across multidimensional data

\- Evaluate multiple objects across multiple measures

\- Show multidimensional features of categorical data

:::

:::warning{title=Warning}
Data requirements:

\- At least one numeric field (measure)

\- The first dimension becomes the radar axes; other dimensions are compared as different series

\- Supports displaying multiple measures as separate series

Features enabled by default:

\- Legend, radar coordinate system, data labels, tooltip, and value scaling are enabled by default

:::


## chartType

**Type:** `"radar"`

:::note{title=Description}
Radar chart



Radar chart, showing multidimensional comparison through a multi-axis coordinate system

:::

**Example**
'radar'




## dataset

**Type:** `Record[]`

:::note{title=Description}
Jeu de donnees



An aggregated dataset that conforms to the TidyData specification. It defines the chart data source and structure. User input does not need preprocessing because VSeed reshapes data automatically. Radar chart data is eventually converted to two dimensions and one measure.

:::

**Example**
[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]




## dimensions

**Type:** `RadarDimension[] | undefined`

:::note{title=Description}
La première dimension est mappée sur l'axe X ; les dimensions restantes sont fusionnées avec les noms de mesures (lorsqu'il y a plusieurs mesures) et affichées comme éléments de légende.



The first dimension of a radar chart is mapped to the angle axis; the remaining dimensions are merged with measure names when multiple measures exist and displayed as legend items.

:::

**Example**
[{id: 'category', alias: 'Category'}]




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
Granularite temporelle, determine la precision d affichage de la date

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "angle" | undefined`

:::note{title=Description}
Canal auquel la dimension est mappée

\- angle: supports mapping multiple dimensions to the angle channel

\- color : prend en charge le mapping de plusieurs dimensions vers le canal de couleur

\- detail : prend en charge le mapping de plusieurs dimensions vers le canal de détail

\- tooltip : prend en charge le mapping de plusieurs dimensions vers le canal d’infobulle

\- label : prend en charge le mapping de plusieurs dimensions vers le canal d’étiquette

\- row : prend en charge le mapping de plusieurs dimensions vers le canal de ligne

\- column : prend en charge le mapping de plusieurs dimensions vers le canal de colonne

:::


## measures

**Type:** `RadarMeasure[] | undefined`

:::note{title=Description}
Mesures



Radar chart measures are automatically merged into one measure and mapped to the radius axis. When multiple measures exist, measure names are merged with other dimensions and displayed as legend items.

:::

**Example**
[{id: 'value', alias: 'Value'}]




### id

**Type:** `string`

:::note{title=Description}
ID de mesure, doit être unique

:::

### alias

**Type:** `string | undefined`

:::note{title=Description}
Alias de la mesure, les doublons sont autorises ; s il n est pas defini, l alias prend l ID par defaut

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Formatage numerique automatique, active par defaut, priorite la plus elevee

Lorsque autoFormat=true, toutes les configurations numFormat sont remplacées.

Une fois active, les etiquettes de donnees et les infobulles du graphique choisissent automatiquement le format approprie selon les valeurs de mesure et la locale.

Regles de formatage : nombres decimaux, notation compacte activee, minimum 0 decimale, maximum 2 decimales, arrondi automatique, via l implementation Intl.NumberFormat du navigateur.

Par exemple :

\- locale=zh-CN: 749740.264 → 74.45~74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Formatage numerique personnalise pour les mesures ; applique automatiquement aux etiquettes et aux infobulles.

Remarque : pour utiliser un format personnalise, autoFormat doit etre explicitement defini sur false ; sinon autoFormat remplacera cette configuration.

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

**Example**

Longueur maximale pour la limitation des étiquettes. Lorsque la longueur du texte dépasse cette valeur, il est tronqué avec des points de suspension et visible au survol (effectif uniquement pour les axes catégoriels).



#### symbol

**Type:** `string | undefined`

:::note{title=Description}


:::

**Example**

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

**Example**
Étiquette font weight


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}

:::

**Example**





\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}


:::

**Example**

Ligne d’axe width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Mode d’arrondi du formatage numérique, utilisant Intl.NumberFormat du navigateur, avec les mêmes règles que roundingMode dans Intl.NumberFormat

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
Ratio de formatage numérique, ne peut pas être 0

:::

**Example**

Longueur maximale pour la limitation des étiquettes. Lorsque la longueur du texte dépasse cette valeur, il est tronqué avec des points de suspension et visible au survol (effectif uniquement pour les axes catégoriels).



#### symbol

**Type:** `string | undefined`

:::note{title=Description}


:::

**Example**

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

**Example**
Étiquette font weight


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}

:::

**Example**





\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}


:::

**Example**

Ligne d’axe width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Mode d’arrondi du formatage numérique, utilisant Intl.NumberFormat du navigateur, avec les mêmes règles que roundingMode dans Intl.NumberFormat

:::

### encoding

**Type:** `"color" | "tooltip" | "label" | "radius" | undefined`

:::note{title=Description}
Canal auquel la mesure est mappée

\- radius: radius mapped from the measure

\- color: Measure mapped to the color channel

\- label: Measure mapped to the label channel

\- tooltip: Measure mapped to the tooltip channel

:::

### parentId

**Type:** `string | undefined`

:::note{title=Description}
Construit un groupe de mesures arborescent sous forme de configuration de mesures plate. parentId pointe vers l ID du groupe parent et sert a construire l arbre des mesures.

:::

:::tip{title=Tip}
Il existe deux facons de configurer l arbre des mesures : option 1, configurer directement un arbre avec children ; option 2, configurer une liste plate avec parentId. Ces deux methodes ne peuvent pas etre utilisees simultanement.

:::


## page

**Type:** `Page | undefined`

:::note{title=Description}
Paging configuration, used to specify the paging field name; it must be a dimension

:::


### field

**Type:** `string`

:::note{title=Description}
Champ de pagination ; spécifie le nom du champ pour la pagination, doit être une dimension.

:::

### currentValue

**Type:** `string`

:::note{title=Description}
Valeur de pagination actuelle ; spécifie la valeur utilisée pour déterminer la page courante.

:::

**Example**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Description}
Chart background color



The background color can be a color string such as 'red' or 'blue', or hex, rgb, or rgba values such as '#ff0000' and 'rgba(255,0,0,0.5)'

:::


## color

**Type:** `Color | undefined`

:::note{title=Description}
Couleur



Color configuration, used to define chart color schemes including color lists, color mappings, and gradients.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Description}
Palette de couleurs discrète utilisée pour définir les couleurs des différents éléments du graphique.

:::

**Example**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Description}
Palette de dégradé linéaire utilisée pour définir les couleurs des différents éléments du graphique.

:::

**Example**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Description}
Mapping de couleur utilisé pour associer des valeurs de données à des couleurs spécifiques.

:::

**Example**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Description}
Configuration de couleur positive/négative ; définit la couleur des valeurs positives dans le graphique.

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Description}
Configuration de couleur positive/négative ; définit la couleur des valeurs négatives dans le graphique.

:::


## label

**Type:** `Label | undefined`

:::note{title=Description}
Etiquette



Label configuration, used to define data label position, format, style, and related settings.

:::


### enable

**Type:** `false | true`

:::note{title=Description}
Indique si la fonctionnalité d'étiquette est activée.

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les étiquettes passent à la ligne suivante.

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les étiquettes affichent les valeurs de mesure.

Dans les scénarios à plusieurs mesures, il n'y a pas de risque de valeurs conflictuelles, car toutes les mesures liées au tracé passent par le traitement `foldMeasures` et sont fusionnées en une seule mesure représentant un point de données.

Remarque : le label dans encoding a une priorite plus elevee ; cette configuration n affecte pas le label dans encoding.

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les etiquettes affichent les valeurs de mesure en pourcentage.

Dans les scénarios à plusieurs mesures, il n'y a pas de risque de valeurs conflictuelles, car toutes les mesures liées au tracé passent par le traitement `foldMeasures` et sont fusionnées en une seule mesure représentant un point de données.

Remarque : le label dans encoding a une priorite plus elevee ; cette configuration n affecte pas le label dans encoding.

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les etiquettes affichent les libelles de dimension.

Affiche toutes les etiquettes de dimension.

Remarque : le label dans encoding a une priorite plus elevee ; cette configuration n affecte pas le label dans encoding.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les valeurs des etiquettes sont formatees automatiquement ; lorsque autoFormat vaut true, la configuration numFormat est ignoree.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Configuration du format des valeurs d etiquette ; fusionnee avec `format` dans `measure`, ou le `format` de `measure` a une priorite plus elevee. La priorite de numFormat est inferieure a autoFormat.

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

**Example**

Longueur maximale pour la limitation des étiquettes. Lorsque la longueur du texte dépasse cette valeur, il est tronqué avec des points de suspension et visible au survol (effectif uniquement pour les axes catégoriels).



#### symbol

**Type:** `string | undefined`

:::note{title=Description}


:::

**Example**

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

**Example**
Étiquette font weight


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}

:::

**Example**





\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}


:::

**Example**

Ligne d’axe width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Mode d’arrondi du formatage numérique, utilisant Intl.NumberFormat du navigateur, avec les mêmes règles que roundingMode dans Intl.NumberFormat

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}


:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}
Hauteur maximale du rectangle ; peut etre une valeur en pixels ou une chaine en pourcentage.

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur d'arrière-plan de l'étiquette

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Description}
Couleur de contour de l'étiquette

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de police de l etiquette

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la couleur de police de l etiquette s inverse automatiquement selon la couleur de l element.

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Description}
Position de l etiquette

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la gestion du chevauchement des etiquettes est activee.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Selection d etiquette ; les conditions entre selecteurs sont OR par defaut.

:::


#### field

**Type:** `string`

:::note{title=Description}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Indique si les etiquettes correspondant au crosshair sont affichees.




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Indique si les etiquettes correspondant au crosshair sont affichees.




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
**Exemple**







Largeur de bordure de l arriere-plan.

Visibilité de la ligne.

**Exemple**









Rayon des angles de bordure de l arriere-plan.



**Exemple**





:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}


:::

**Example**
"Mettre en surbrillance les barres dont les ventes dépassent 1000"

"Mettre en surbrillance la barre avec le taux de profit le plus élevé dans chaque région"



#### code

**Type:** `string`

:::note{title=Description}
Opérateur



\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est pas dans value



Decalage horizontal du point d annotation en pixels. Lorsque le point est a gauche (debut de l axe categoriel), une valeur positive est recommandee ; lorsqu il est a droite (fin de l axe categoriel), une valeur negative est recommandee.

Une valeur negative decale tout le composant vers la gauche (par exemple, -10).


:::

**Example**
offsetX: 5 (tout le composant se decale de 5 pixels vers la droite)
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
Indique si les etiquettes correspondant au crosshair sont affichees.




:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Indique si les etiquettes correspondant au crosshair sont affichees.




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est PAS dans la liste de valeurs.



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
Legende



Legend configuration, used to define legend position, format, style, and related settings.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la fonctionnalite de legende est activee.

:::

**Example**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la bordure de la legende est activee.

:::

:::warning{title=Warning}
S applique uniquement aux legendes discretes.

:::

**Example**
border: true



### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de police de la légende.

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de l icone de pagination.

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de l icone de pagination desactivee/grisee.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Taille de police de la légende.

:::

**Example**
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de police de la légende.

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}
Graisse de police de la légende.

:::

**Example**
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Description}
Type de forme de la legende.

:::

:::warning{title=Warning}
S applique uniquement aux legendes discretes.

:::

**Example**
shapeType: 'circle'



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Description}
Position de la légende

:::

**Example**
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=Description}
Nombre maximal de colonnes ou de lignes lorsqu il y a beaucoup d elements de legende.

Si position est horizontale (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize controle le nombre de colonnes affichees.

Si position est verticale (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize controle le nombre de lignes affichees.

:::

:::warning{title=Warning}
S applique uniquement aux legendes discretes.

:::

**Example**
maxSize: 2




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Description}
Info-bulle



Tooltip configuration, used to define tooltip position, format, style, and related settings.

:::


### enable

**Type:** `false | true`

:::note{title=Description}


:::


## brush

**Type:** `Brush | undefined`

:::note{title=Description}
Selection par brosse



Brush selection configuration, used to enable or disable brush selection.



\- `y` : brush d axe Y ; selectionne uniquement dans la direction Y, sans restriction sur l axe X.

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



Definit le style des points de donnees hors de la selection.

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


## animation

**Type:** `RadarAnimation | undefined`

:::note{title=Description}
Configuration de l animation



Chart animation configuration; available effects are constrained by chart type

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether radar chart animation is enabled

:::

### params

**Type:** `RadarAnimationParams | undefined`

:::note{title=Description}
Radar chart animation parameters

:::


#### appear

**Type:** `RadarAppearAnimation | undefined`

:::note{title=Description}
Radar chart appear animation configuration

:::


##### effects

**Type:** `("radial" | "scale")[] | undefined`

:::note{title=Description}
Radar chart appear effects, supporting radial and scale animations

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the current animation stage is enabled

:::

##### ease

**Type:** `string | undefined`

:::note{title=Description}
Animation easing function

:::

##### duration

**Type:** `number | undefined`

:::note{title=Description}
Animation duration, in milliseconds

:::

##### color

**Type:** `string | undefined`

:::note{title=Description}
Animation highlight or atmosphere color

:::

#### update

**Type:** `RadarUpdateAnimation | undefined`

:::note{title=Description}
Radar chart update animation configuration

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=Description}
Radar chart update effects, supporting grow animation

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the current animation stage is enabled

:::

##### ease

**Type:** `string | undefined`

:::note{title=Description}
Animation easing function

:::

##### duration

**Type:** `number | undefined`

:::note{title=Description}
Animation duration, in milliseconds

:::

##### color

**Type:** `string | undefined`

:::note{title=Description}
Animation highlight or atmosphere color

:::

#### loop

**Type:** `RadarAnimationLoop | undefined`

:::note{title=Description}
Radar chart loop animation configuration

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether loop animation is enabled

:::

##### interval

**Type:** `number | undefined`

:::note{title=Description}
Loop animation interval, in milliseconds

:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=Description}
Radar chart atmosphere animation configuration

:::


###### ease

**Type:** `string | undefined`

:::note{title=Description}
Atmosphere animation easing function

:::

###### color

**Type:** `string | undefined`

:::note{title=Description}
Atmosphere animation color

:::

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title=Description}
Atmosphere animation effect, supporting ripple, visibility, and breathing effects

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Description}
Chart theme. Theme is a lower-priority functional configuration that includes common settings shared by all chart types and by a single chart type.



Two built-in themes are provided: light and dark. Users can customize themes through Builder.



Opérateur



\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est PAS dans la liste de valeurs.

:::

**Example**
'dark'

'light'

'customThemeName'




### length

**Type:** `number`

### brand

**Type:** `brand`


## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title=Description}
Point mark style configuration, used to define point mark color, border, and related settings.

Supports global style or conditional style configuration

Filtre de donnees




:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
- not in : sélectionne les éléments de données dont la valeur du champ de dimension n’est pas dans le tableau `value`.






:::

**Example**
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
Indique si les etiquettes correspondant au crosshair sont affichees.




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Indique si les etiquettes correspondant au crosshair sont affichees.




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
**Exemple**









Largeur de bordure de l arriere-plan.

Visibilité de la ligne.

**Exemple**









Rayon des angles de bordure de l arriere-plan.



**Exemple**





:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}


:::

**Example**
"Mettre en surbrillance les barres dont les ventes dépassent 1000"

"Mettre en surbrillance la barre avec le taux de profit le plus élevé dans chaque région"



#### code

**Type:** `string`

:::note{title=Description}
Opérateur



\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est pas dans value



Decalage horizontal du point d annotation en pixels. Lorsque le point est a gauche (debut de l axe categoriel), une valeur positive est recommandee ; lorsqu il est a droite (fin de l axe categoriel), une valeur negative est recommandee.

Une valeur negative decale tout le composant vers la gauche (par exemple, -10).


:::

**Example**
offsetX: 5 (tout le composant se decale de 5 pixels vers la droite)
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
Indique si les etiquettes correspondant au crosshair sont affichees.




:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Indique si les etiquettes correspondant au crosshair sont affichees.




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est PAS dans la liste de valeurs.



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
Opacite de la couleur du marqueur de point



Opacite de la couleur du marqueur de point

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

**Example**
solid

dashed

dotted




## lineStyle

**Type:** `LineStyle | LineStyle[] | undefined`

:::note{title=Description}
Line mark style configuration, used to define line mark color, opacity, curve, and related settings.

Supports global style or conditional style configuration

Filtre de donnees




:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
- not in : sélectionne les éléments de données dont la valeur du champ de dimension n’est pas dans le tableau `value`.






:::

**Example**
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
Indique si les etiquettes correspondant au crosshair sont affichees.




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Indique si les etiquettes correspondant au crosshair sont affichees.




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
**Exemple**









Largeur de bordure de l arriere-plan.

Visibilité de la ligne.

**Exemple**









Rayon des angles de bordure de l arriere-plan.



**Exemple**





:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}


:::

**Example**
"Mettre en surbrillance les barres dont les ventes dépassent 1000"

"Mettre en surbrillance la barre avec le taux de profit le plus élevé dans chaque région"



#### code

**Type:** `string`

:::note{title=Description}
Opérateur



\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est pas dans value



Decalage horizontal du point d annotation en pixels. Lorsque le point est a gauche (debut de l axe categoriel), une valeur positive est recommandee ; lorsqu il est a droite (fin de l axe categoriel), une valeur negative est recommandee.

Une valeur negative decale tout le composant vers la gauche (par exemple, -10).


:::

**Example**
offsetX: 5 (tout le composant se decale de 5 pixels vers la droite)
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
Indique si les etiquettes correspondant au crosshair sont affichees.




:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Indique si les etiquettes correspondant au crosshair sont affichees.




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est PAS dans la liste de valeurs.



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
Opacite de la couleur du segment de ligne

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

**Example**
`lineStyle: 'solid'`




## areaStyle

**Type:** `AreaStyle | AreaStyle[] | undefined`

:::note{title=Description}
Area mark style configuration, used to define area mark color, opacity, border, and related settings.

Supports global style or conditional style configuration

Filtre de donnees




:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
- not in : sélectionne les éléments de données dont la valeur du champ de dimension n’est pas dans le tableau `value`.






:::

**Example**
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
Indique si les etiquettes correspondant au crosshair sont affichees.




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Indique si les etiquettes correspondant au crosshair sont affichees.




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
**Exemple**









Largeur de bordure de l arriere-plan.

Visibilité de la ligne.

**Exemple**









Rayon des angles de bordure de l arriere-plan.



**Exemple**





:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}


:::

**Example**
"Mettre en surbrillance les barres dont les ventes dépassent 1000"

"Mettre en surbrillance la barre avec le taux de profit le plus élevé dans chaque région"



#### code

**Type:** `string`

:::note{title=Description}
Opérateur



\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est pas dans value



Decalage horizontal du point d annotation en pixels. Lorsque le point est a gauche (debut de l axe categoriel), une valeur positive est recommandee ; lorsqu il est a droite (fin de l axe categoriel), une valeur negative est recommandee.

Une valeur negative decale tout le composant vers la gauche (par exemple, -10).


:::

**Example**
offsetX: 5 (tout le composant se decale de 5 pixels vers la droite)
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
Indique si les etiquettes correspondant au crosshair sont affichees.




:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Indique si les etiquettes correspondant au crosshair sont affichees.




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est PAS dans la liste de valeurs.



Couleur du texte

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### areaVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the area mark is visible



Whether the area mark is visible

:::

### areaColor

**Type:** `string | undefined`

:::note{title=Description}
Area mark color



Area mark color

:::

### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Area mark color opacity



Area mark color opacity

:::


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Description}
Langue



Chart language configuration. Supports 'zh\-CN' and 'en\-US'. You can also call intl.setLocale('zh\-CN') to set the language.

:::
