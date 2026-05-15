# Sankey

:::info{title=Mappage Encoding}
Le diagramme de Sankey prend en charge les canaux visuels suivants :

`source`: canal source, prend en charge `plusieurs dimensions`

`target`: canal cible, prend en charge `plusieurs dimensions`

`color`: canal couleur, prend en charge `plusieurs dimensions`

`size`: canal de taille, prend en charge `une mesure`

`label`: canal d’étiquette, prend en charge `plusieurs dimensions` et `plusieurs mesures`

`tooltip`: canal d’infobulle, prend en charge `plusieurs dimensions` et `plusieurs mesures`

:::

:::note{title=Description}
Le diagramme de Sankey sert à afficher les relations de flux de source à target, la largeur des liens représentant le volume du flux

Scenarios applicables :

\- Afficher les relations de flux dans une structure node-link ordinaire

\- Afficher les transitions de chemin après concaténation de plusieurs dimensions source et de plusieurs dimensions target

:::

:::warning{title=Warning}
Exigences de donnees :

\- Au moins 1 dimension source ou dimension par défaut pouvant être mappée comme source

\- Au moins 1 dimension target

\- Au moins 1 champ numérique (mesure) pour mapper la taille du flux

\- Le advanced pipeline doit convertir tidyData en une structure source / target / value ordinaire consommable par sankey

:::


## chartType

**Type:** `"sankey"`

:::note{title=Description}
Diagramme de Sankey



Diagramme de Sankey, affiche les relations de flux source-target ordinaires et les volumes

:::

**Exemple**
'sankey'




## dataset

**Type:** `Record[]`

:::note{title=Description}
Jeu de données



Jeu de données déjà agrégé et conforme à la spécification TidyData, utilisé pour définir la source et la structure des données du graphique

:::

**Exemple**
[{fromRegion: 'Chine du Nord', toRegion: 'Chine de l’Est', value: 30}]




## dimensions

**Type:** `SankeyDimension[] | undefined`

:::note{title=Description}
Dimensions



Configuration des dimensions, utilisée pour définir la structure des nœuds source / target, avec prise en charge des canaux source / target / color / detail / label / tooltip / row / column

:::

**Exemple**
[{id: 'fromRegion', alias: 'Région source'}, {id: 'toRegion', alias: 'Région cible', encoding: 'target'}]




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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "source" | "target" | undefined`

:::note{title=Description}
Canal auquel la dimension est mappée

\- source : permet de mapper plusieurs dimensions au canal source ; l'étape advanced les concatène en chemin de nœuds amont

\- target : permet de mapper plusieurs dimensions au canal target ; l'étape advanced les concatène en chemin de nœuds aval

\- color : permet de mapper plusieurs dimensions au canal couleur, utilisé pour générer la clé de catégorie couleur du sankey

\- detail : permet de mapper plusieurs dimensions au canal détail

\- label : permet de mapper plusieurs dimensions au canal d'étiquette

\- tooltip : permet de mapper plusieurs dimensions au canal d'infobulle

\- row : permet de mapper plusieurs dimensions au canal ligne, utilisé pour les pivot charts

\- column : permet de mapper plusieurs dimensions au canal colonne, utilisé pour les pivot charts

:::


## measures

**Type:** `SankeyMeasure[] | undefined`

:::note{title=Description}
Mesures



Configuration des mesures, utilisée pour définir la taille du flux, avec prise en charge des canaux size / detail / label / tooltip

:::

**Exemple**
[{id: 'sales', alias: 'Ventes'}]




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

**Type:** `"detail" | "tooltip" | "label" | "size" | undefined`

:::note{title=Description}
Canal auquel la mesure est mappée

\- size : mesure mappée au canal largeur d'arête / taille du flux

\- detail : mesure mappée au canal détail

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




Utilisé pour spécifier le nom du champ de pagination ; doit être une dimension

:::


### field

**Type:** `string`

:::note{title=Description}
Description de la demande de filtrage de l'utilisateur (langage naturel)


:::

### currentValue

**Type:** `string`

:::note{title=Description}
Code JavaScript de filtrage généré par l'IA

\- Seules les fonctions utilitaires intégrées peuvent être utilisées (accès via _ ou R)

\- Paramètre d'entrée : data (tableau), chaque item contient le champ __row_index qui indique le numéro de ligne

\- Doit retourner un tableau de combinaisons index de ligne et champ : Array<{ __row_index: number, field: string }>

\- __row_index représente le numéro de ligne de l'élément de données d'origine, field représente le champ à mettre en surbrillance

\- Interdit : eval, Function, opérations asynchrones, DOM API, requêtes réseau


:::

**Exemple**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Description}




La couleur d’arrière-plan peut être une chaîne de couleur comme 'red' ou 'blue', ou bien une valeur hex, rgb ou rgba, par exemple '#ff0000' ou 'rgba(255,0,0,0.5)'

:::


## color

**Type:** `Color | undefined`

:::note{title=Description}
Couleur



Configuration des couleurs, utilisée pour définir le schéma de couleurs du graphique, notamment la liste des couleurs, le mappage des couleurs, les dégradés, etc.

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
Configuration des étiquettes pour définir les étiquettes de données du graphique, y compris leur position, format et style.



Configuration des étiquettes, utilisée pour définir les étiquettes de données du graphique, notamment la position, le format, le style, etc.

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
Mettre en surbrillance le champ sales des éléments dont sales est supérieur à 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Mettre en surbrillance l'élément avec la marge bénéficiaire la plus élevée dans chaque région
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

Mettre en surbrillance les éléments filtrés par plusieurs conditions
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




Configuration de la légende, utilisée pour définir l’affichage, la position et le style de la légende de couleur du diagramme de Sankey

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




Configuration des infobulles, utilisée pour définir les informations du graphique, notamment le contenu, le format, le style, etc.

:::


### enable

**Type:** `false | true`

:::note{title=Description}


:::


## theme

**Type:** `Theme | undefined`

:::note{title=Description}
Thème du graphique

Thème

Deux thèmes intégrés, light et dark, sont disponibles ; de nouveaux thèmes peuvent être personnalisés avec registerTheme.

:::


### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Description}
Langue



Configuration de la langue du graphique, prenant en charge 'zh\-CN' et 'en\-US'

:::
