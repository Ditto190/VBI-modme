# BoxPlot

:::info{title=Recommandation}
\- Configuration de champs recommandée : `1` mesure, `1` dimension

\- Prend en charge le remodelage des données : au moins `1` mesure, `0` dimension

:::

:::info{title=Correspondance encodage}
Le diagramme en boîte prend en charge les canaux visuels suivants:

`xAxis`  : canal de l’axe X, prend en charge `plusieurs dimensions` et mappe les valeurs de dimension sur l’axe X

`yAxis`  : canal de l’axe Y, prend en charge `plusieurs mesures` et mappe les valeurs de mesure sur l’axe Y

`color`  : canal de couleur, prend en charge `plusieurs dimensions` ou `une mesure`; la couleur de dimension distingue les séries, tandis que la couleur de mesure mappe linéairement les valeurs vers les couleurs des marques

`tooltip`: canal d’infobulle, prend en charge `plusieurs dimensions` et `plusieurs mesures`, affiché au survol d’un point de données

`label`  : canal de libellé, prend en charge `plusieurs dimensions` et `plusieurs mesures`, et affiche les libellés de données sur les points

:::

:::note{title=Description}
Le diagramme en boîte convient à l’affichage de la distribution des données. L’axe X est l’axe des catégories (données catégorielles), l’axe Y est l’axe numérique (données continues), et les boîtes sont disposées verticalement.

Scénarios adaptés:

\- Lorsque les noms des éléments de données sont courts

\- Lorsqu’il faut comparer intuitivement les valeurs numériques entre différentes catégories

\- Lorsqu’il faut afficher les tendances d’évolution de données temporelles

:::

:::warning{title=Warning}
Exigences de données:

\- Au moins 1 champ numérique (mesure)

\- La première dimension est placée sur l’axe X. Les dimensions restantes sont fusionnées avec les noms de mesures (lorsqu’il existe plusieurs mesures) et affichées comme éléments de légende.

\- Toutes les mesures sont automatiquement fusionnées en une seule mesure

Fonctionnalités activées par défaut :

\- La légende, les axes, les labels de données et les infobulles sont activés par défaut.

:::


## chartType

**Type:** `"boxPlot"`

:::note{title=Description}
Le diagramme en boîte convient à l’affichage de la distribution des données. L’axe X est l’axe des catégories (données catégorielles), l’axe Y est l’axe numérique (données continues), et les boîtes sont disposées verticalement.

:::

**Exemple**
'boxPlot'




## dataset

**Type:** `Record[]`

:::note{title=Description}
Jeu de données agrégé conforme à la spécification TidyData, utilisé pour définir la source et la structure des données du graphique. Le jeu de données fourni par l'utilisateur n'a pas besoin de prétraitement. VSeed dispose de puissantes capacités de restructuration des données et effectue lui-même cette transformation; les données du diagramme en boîte sont finalement converties en 2 dimensions et 1 mesure.

:::

**Exemple**
[{category:'A', value:100}, {category:'B', value:200}]




## dimensions

**Type:** `BoxPlotDimension[] | undefined`

:::note{title=Description}
La première dimension du diagramme en boîte est mappée sur l’axe X. Les dimensions restantes sont fusionnées avec les noms de mesures (lorsqu’il existe plusieurs mesures) et affichées comme éléments de légende.

:::

**Exemple**
[{id: "category", alias: "Category"}]




### id

**Type:** `string`

:::note{title=Description}
ID du champ correspondant à la dimension

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

**Type:** `"xAxis" | "color" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=Description}
Canal auquel la dimension est mappée

\- xAxis : prend en charge le mappage de plusieurs dimensions sur l’axe X

\- color: prend en charge le mapping de plusieurs dimensions vers le canal de couleur

\- tooltip: permet de mapper plusieurs dimensions au canal d'infobulle

\- label: permet de mapper plusieurs dimensions au canal de libellé

\- row: prend en charge le mapping de plusieurs dimensions vers le canal ligne

\- column: prend en charge le mapping de plusieurs dimensions vers le canal colonne

:::


## measures

**Type:** `BoxPlotMeasure[] | undefined`

:::note{title=Description}
Toutes les mesures du diagramme en boîte sont automatiquement fusionnées en une seule mesure et mappées sur l’axe Y. Lorsqu’il existe plusieurs mesures, leurs noms sont fusionnés avec les dimensions restantes et affichés comme éléments de légende.

:::

**Exemple**
[{id: "value", alias: "Value"}]




### id

**Type:** `string`

:::note{title=Description}
ID de mesure, doit être unique

:::

### alias

**Type:** `string | undefined`

:::note{title=Description}
Alias de mesure, les doublons sont autorisés; si non défini, alias vaut id

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Formatage automatique des nombres, activé par défaut avec la priorité la plus élevée

Lorsque autoFormat=true, toutes les configurations numFormat sont remplacées

Une fois activé, les libellés de données et les infobulles choisissent automatiquement le format adapté selon les valeurs de mesure et la locale

Règles de formatage: nombres décimaux avec compact notation activée, 0 décimale minimum, 2 décimales maximum, arrondi automatique, via l'implémentation Intl.NumberFormat du navigateur

Exemple:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Formatage numérique personnalisé des mesures; appliqué automatiquement aux labels et tooltips

Remarque: pour utiliser un formatage personnalisé, vous devez définir explicitement autoFormat=false; sinon autoFormat remplacera cette configuration

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}
Type de format numérique, prend en charge: number (décimal), percent (%), permille (‰), notation scientifique

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Ratio de format numérique, ne peut pas être 0

:::

**Exemple**
\- 100000 est converti en 10万, ratio:10000, symbol:"万"
\- 100000 est converti en 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Symbole de format numérique, par ex. %, ‰

:::

**Exemple**
\- 100000 est converti en 10万, ratio:10000, symbol:"万"
\- 100000 est converti en 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
Séparateur de milliers pour le formatage numérique

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}
Suffixe du format numérique

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
Préfixe du format numérique

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
Nombre de décimales du format numérique, utilise minimumFractionDigits et maximumFractionDigits d'Intl.NumberFormat du navigateur; priorité inférieure à significantDigits

:::

**Exemple**
\- 1234.5678 est converti en 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
Chiffres significatifs du format numérique, utilise minimumSignificantDigits et maximumSignificantDigits d'Intl.NumberFormat du navigateur; priorité supérieure à fractionDigits

:::

**Exemple**
\- 1234.5678 est converti en 1000, significantDigits:1
\- 1234.5678 est converti en 1200, significantDigits:2
\- 1234.5678 est converti en 1230, significantDigits:3
\- 1234.5678 est converti en 1234, significantDigits:4
\- 1234.5678 est converti en 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}
Priorité d'arrondi du format numérique lorsque significantDigits et fractionDigits sont tous deux définis; utilise Intl.NumberFormat du navigateur et suit les mêmes règles que roundingPriority

:::

**Exemple**
\- 1234.5678 est converti en 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 est converti en 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Mode d'arrondi du format numérique, utilise Intl.NumberFormat du navigateur et suit les mêmes règles que roundingMode

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}
Type de format numérique, prend en charge: number (décimal), percent (%), permille (‰), notation scientifique

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Ratio de format numérique, ne peut pas être 0

:::

**Exemple**
\- 100000 est converti en 10万, ratio:10000, symbol:"万"
\- 100000 est converti en 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Symbole de format numérique, par ex. %, ‰

:::

**Exemple**
\- 100000 est converti en 10万, ratio:10000, symbol:"万"
\- 100000 est converti en 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
Séparateur de milliers pour le formatage numérique

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}
Suffixe du format numérique

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
Préfixe du format numérique

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
Nombre de décimales du format numérique, utilise minimumFractionDigits et maximumFractionDigits d'Intl.NumberFormat du navigateur; priorité inférieure à significantDigits

:::

**Exemple**
\- 1234.5678 est converti en 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
Chiffres significatifs du format numérique, utilise minimumSignificantDigits et maximumSignificantDigits d'Intl.NumberFormat du navigateur; priorité supérieure à fractionDigits

:::

**Exemple**
\- 1234.5678 est converti en 1000, significantDigits:1
\- 1234.5678 est converti en 1200, significantDigits:2
\- 1234.5678 est converti en 1230, significantDigits:3
\- 1234.5678 est converti en 1234, significantDigits:4
\- 1234.5678 est converti en 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}
Priorité d'arrondi du format numérique lorsque significantDigits et fractionDigits sont tous deux définis; utilise Intl.NumberFormat du navigateur et suit les mêmes règles que roundingPriority

:::

**Exemple**
\- 1234.5678 est converti en 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 est converti en 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Mode d'arrondi du format numérique, utilise Intl.NumberFormat du navigateur et suit les mêmes règles que roundingMode

:::

### encoding

**Type:** `"value" | "color" | "tooltip" | "label" | "q1" | "median" | "q3" | "min" | "max" | "outliers" | undefined`

:::note{title=Description}
Canal auquel la mesure est mappée

\- value: Mesures correspondant à des valeurs discrètes, utilisées pour calculer les valeurs statistiques affichées dans le box plot

\- q1: mapping de mesure correspondant au 25e percentile statistique

\- q3: mapping de mesure correspondant au 75e percentile statistique

\- min: mapping de mesure correspondant à la valeur minimale des moustaches

\- max: mapping de mesure correspondant à la valeur maximale des moustaches

\- meadian: mapping de mesure correspondant à la valeur médiane

\- outliers: mapping de mesure correspondant aux valeurs aberrantes

\- detail : mesure mappée sur le canal de détail

\- color : mesure mappée au canal de couleur

\- label: mesure mappée au canal label

\- tooltip: mesure mappée au canal tooltip

:::

### parentId

**Type:** `string | undefined`

:::note{title=Description}
Dans la forme de configuration plate des mesures, construit un groupe de mesures en arbre. parentId pointe vers l'id du groupe parent, utilisé pour construire l'arbre de mesures

:::

:::tip{title=Tip}
Deux façons existent pour configurer l'arbre de mesures: l'option 1 consiste à configurer directement un arbre avec children; l'option 2 consiste à configurer une liste plate avec parentId. Ces deux méthodes ne peuvent pas être utilisées simultanément

:::


## page

**Type:** `Page | undefined`

:::note{title=Description}
Configuration de pagination, utilisée pour indiquer le nom du champ de pagination, qui doit être une dimension.

:::


### field

**Type:** `string`

:::note{title=Description}
Champ de pagination; spécifie le nom du champ de pagination, qui doit être une dimension

:::

### currentValue

**Type:** `string`

:::note{title=Description}
Valeur de pagination actuelle; spécifie la valeur utilisée pour déterminer la page courante

:::

**Exemple**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Description}
Couleur d'arrière-plan du graphique. La couleur d'arrière-plan peut être une chaîne de couleur et vaut par défaut un fond transparent, par exemple 'red' ou 'blue'. Les formats hex, rgb ou rgba comme '#ff0000' et 'rgba(255,0,0,0.5)' sont également pris en charge.

:::


## color

**Type:** `Color | undefined`

:::note{title=Description}
Configuration des couleurs pour définir le schéma du graphique, y compris listes de couleurs, mappings de couleurs et dégradés.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Description}
Schéma de couleurs discret utilisé pour définir les couleurs des différents éléments du graphique

:::

**Exemple**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Description}
Schéma de couleurs en dégradé linéaire utilisé pour définir les couleurs des différents éléments du graphique

:::

**Exemple**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Description}
Mapping de couleurs utilisé pour associer des valeurs de données à des couleurs spécifiques

:::

**Exemple**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Description}
Configuration des couleurs positives/négatives; définit la couleur des valeurs positives dans le graphique

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Description}
Configuration des couleurs positives/négatives; définit la couleur des valeurs négatives dans le graphique

:::


## label

**Type:** `Label | undefined`

:::note{title=Description}
Configuration des libellés de données du graphique, y compris position, format et style.

:::


### enable

**Type:** `false | true`

:::note{title=Description}
Indique si la fonction de libellé est activée

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les libellés passent à la ligne

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les libellés affichent les valeurs de mesure

Dans les scénarios à plusieurs mesures, il n'y a pas de conflit de valeurs, car toutes les mesures liées au tracé passent par `foldMeasures` et sont fusionnées en une mesure représentant un seul point de données

Remarque: le label dans encoding a une priorité plus élevée; cette configuration n'affecte pas le label dans encoding

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les libellés affichent le pourcentage des valeurs de mesure

Dans les scénarios à plusieurs mesures, il n'y a pas de conflit de valeurs, car toutes les mesures liées au tracé passent par `foldMeasures` et sont fusionnées en une mesure représentant un seul point de données

Remarque: le label dans encoding a une priorité plus élevée; cette configuration n'affecte pas le label dans encoding

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les libellés affichent les libellés de dimension

Afficher tous les libellés de dimension

Remarque: le label dans encoding a une priorité plus élevée; cette configuration n'affecte pas le label dans encoding

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les valeurs de libellé sont formatées automatiquement; lorsque autoFormat vaut true, la configuration numFormat est ignorée

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Configuration du format des valeurs de libellé; fusionnée avec `format` dans `measure`, où `format` de `measure` a une priorité plus élevée. numFormat a une priorité inférieure à autoFormat

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}
Type de format numérique, prend en charge: number (décimal), percent (%), permille (‰), notation scientifique

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Ratio de format numérique, ne peut pas être 0

:::

**Exemple**
\- 100000 est converti en 10万, ratio:10000, symbol:"万"
\- 100000 est converti en 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Symbole de format numérique, par ex. %, ‰

:::

**Exemple**
\- 100000 est converti en 10万, ratio:10000, symbol:"万"
\- 100000 est converti en 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
Séparateur de milliers pour le formatage numérique

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}
Suffixe du format numérique

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
Préfixe du format numérique

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
Nombre de décimales du format numérique, utilise minimumFractionDigits et maximumFractionDigits d'Intl.NumberFormat du navigateur; priorité inférieure à significantDigits

:::

**Exemple**
\- 1234.5678 est converti en 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
Chiffres significatifs du format numérique, utilise minimumSignificantDigits et maximumSignificantDigits d'Intl.NumberFormat du navigateur; priorité supérieure à fractionDigits

:::

**Exemple**
\- 1234.5678 est converti en 1000, significantDigits:1
\- 1234.5678 est converti en 1200, significantDigits:2
\- 1234.5678 est converti en 1230, significantDigits:3
\- 1234.5678 est converti en 1234, significantDigits:4
\- 1234.5678 est converti en 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}
Priorité d'arrondi du format numérique lorsque significantDigits et fractionDigits sont tous deux définis; utilise Intl.NumberFormat du navigateur et suit les mêmes règles que roundingPriority

:::

**Exemple**
\- 1234.5678 est converti en 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 est converti en 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Mode d'arrondi du format numérique, utilise Intl.NumberFormat du navigateur et suit les mêmes règles que roundingMode

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Taille de police du libellé

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}
Graisse de police du libellé

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur d'arrière-plan du libellé

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Description}
Couleur du contour du libellé

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de police du libellé

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la couleur de police est inversée automatiquement selon la couleur de l'élément

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Description}
Position du libellé

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si l'anti-chevauchement des libellés est activé

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Filtrage des libellés, la relation par défaut entre les sélecteurs est Or

:::


#### field

**Type:** `string`

:::note{title=Description}
Champ de dimension, ID d'un élément de dimension

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Opérateur

\- in: sélectionne les éléments dont la valeur du champ de dimension est dans value

\- not in: sélectionne les éléments dont la valeur du champ de dimension n'est pas dans value

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Opérateur

\- in: sélectionne les éléments dont la valeur du champ de dimension est dans value

\- not in: sélectionne les éléments dont la valeur du champ de dimension n'est pas dans value

identique à operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Sélectionne les éléments par valeur de champ de dimension; prend en charge les tableaux

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Filtre animé (exécution de code généré par IA)



Implémente une logique complexe de filtrage des données via du code JavaScript généré par IA



Capacités principales:

\- Prend en charge toute condition complexe de filtrage des données

\- Utilise les fonctions utilitaires intégrées pour les opérations de données

\- S'exécute de façon sûre dans l'environnement navigateur (sandbox Web Worker)



Exigences d’environnement : seuls les environnements navigateur sont pris en charge ; les environnements Node.js utilisent le fallback.



Remarque: selector et dynamicFilter ne peuvent pas être utilisés simultanément; dynamicFilter a une priorité plus élevée



Configuration du filtre animé du graphique



Implémente le filtrage des marqueurs du graphique (barres, points, etc.) via du code JavaScript généré par IA

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Description des besoins de filtrage de l’utilisateur (langage naturel).

:::

**Exemple**
Configuration du filtre animé du graphique

Implémente le filtrage des marqueurs du graphique (barres, points, etc.) via du code JavaScript généré par IA



#### code

**Type:** `string`

:::note{title=Description}
Code de filtrage JavaScript généré par IA



\- Seules les fonctions utilitaires intégrées sont autorisées (accessibles via _ ou R)

\- Paramètre d’entrée : data (tableau), chaque item contient un champ __row_index indiquant le numéro de ligne

\- Doit retourner un tableau de combinaisons index de ligne et champ : Array<{ __row_index: number, field: string }>

\- __row_index indique le numéro de ligne de l’élément d’origine, field indique le champ à mettre en évidence

\- Interdit : eval, Function, opérations asynchrones, DOM API, requêtes réseau

:::

**Exemple**
Mettre en évidence le champ sales des éléments dont sales est supérieur à 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Mettre en évidence l’élément dont la marge bénéficiaire est la plus élevée dans chaque zone
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

Mettre en évidence les éléments filtrés par plusieurs conditions
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
Solution de repli lorsque l'exécution du code échoue ou que l'environnement n'est pas pris en charge

:::


##### field

**Type:** `string`

:::note{title=Description}
Champ de dimension, ID d'un élément de dimension

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Opérateur

\- in: sélectionne les éléments dont la valeur du champ de dimension est dans value

\- not in: sélectionne les éléments dont la valeur du champ de dimension n'est pas dans value

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Opérateur

\- in: sélectionne les éléments dont la valeur du champ de dimension est dans value

\- not in: sélectionne les éléments dont la valeur du champ de dimension n'est pas dans value

identique à operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Sélectionne les éléments par valeur de champ de dimension; prend en charge les tableaux

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Résultat d’exécution du filtre dynamique (champ d’exécution)

Écrit pendant la phase prepare() ; en lecture seule à l’exécution
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
Configuration de la légende pour définir la légende du graphique, notamment sa position, son format et son style.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la fonction de légende est activée

:::

**Exemple**
\- not in: sélectionne les éléments dont la valeur du champ de dimension n'est pas dans value



### border

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la bordure de la légende est activée..

:::

:::warning{title=Warning}
Sélectionne les éléments par valeur de champ de dimension; prend en charge les tableaux

:::

**Exemple**
Résultat d'exécution du filtre animé (champ runtime)



### labelColor

**Type:** `string | undefined`

:::note{title=Description}
legend font color

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Description}
Pagination icon color.

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Description}
Pagination icon disabled/grayed-out color.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Taille de police de la légende

:::

**Exemple**
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=Description}
legend font color

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}
Graisse de police de la légende

:::

**Exemple**
legend font color



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Description}
Forme de la légende
:::

:::warning{title=Warning}
Valable uniquement pour les légendes discrètes
:::

**Exemple**
Taille de police de la légende



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Description}
Position de la légende

:::

**Exemple**
legend font color



### maxSize

**Type:** `number | undefined`

:::note{title=Description}
Maximum number of columns or rows when there are many legend items.

If position is horizontal (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize controls the number of columns shown.

If position is vertical (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize controls the number of rows shown.

:::

:::warning{title=Warning}
Valable uniquement pour les légendes discrètes
:::

**Exemple**
maxSize: 2




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Description}
Indique si la sélection brush est activée

:::


### enable

**Type:** `false | true`

:::note{title=Description}
Indique si la fonction d'infobulle est activée

:::


## brush

**Type:** `Brush | undefined`

:::note{title=Description}
Définit la forme et l’orientation de la zone de sélection brush



\- `polygon` : sélection polygonale, permettant de tracer un polygone libre en cliquant sur plusieurs points



Mode de sélection brush: unique ou multiple

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Définit le style des points de données sélectionnés.

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Description}
brushtype



Opacité

Opacité des points de données sélectionnés, de 0 à 1

\- `polygon` : sélection brush polygonale ; cliquez sur plusieurs points pour tracer un polygone de sélection

\- `x`: sélection brush uniquement dans la direction de l'axe X; la direction de l'axe Y n'est pas limitée

\- `y` : sélection brush dans la direction de l’axe Y uniquement ; la direction de l’axe X n’est pas limitée

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Description}
Opacité des points de données sélectionnés, plage 0-1



Style des éléments de données non sélectionnés

Définit le style des points de données en dehors de la zone brush sélectionnée

\- `multiple` : mode de sélection multiple ; plusieurs zones brush peuvent exister en même temps

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la zone brush est effacée à la fin de la sélection

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Opacité des points de données non sélectionnés, de 0 à 1



Définit le style des points de données sélectionnés par brush

:::


#### opacity

**Type:** `number | undefined`

:::note{title=Description}
Style des éléments de données non sélectionnés



Définit le style des points de données hors de la sélection brush

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Description}
Configuration de l'axe de catégorie (axe X), utilisée pour définir l'axe X du graphique, y compris position, format, style, etc.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Largeur du contour

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Axe X, axe de catégorie, configuration de l'axe X; définit l'axe X du graphique, y compris position, format, style, etc.



Définit le style des points de données hors de la sélection brush

:::


#### opacity

**Type:** `number | undefined`

:::note{title=Description}
Style des éléments de données non sélectionnés



Opacité des points de données hors sélection brush, plage 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Description}
Configuration de l'axe de catégorie (axe X), utilisée pour définir l'axe X du graphique, y compris position, format, style, etc.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Largeur du contour

:::


## xAxis

**Type:** `XBandAxis | undefined`

:::note{title=Description}
Configuration de l'axe X de type catégorie, utilisée pour définir l'axe X du graphique, y compris position, format, style et paramètres associés.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Couleur de la ligne d'axe

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Description}
Configuration de l'animation de l'axe X

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Description}
Configuration de l'axe numérique (axe Y), utilisée pour définir l'axe Y du graphique, notamment la position, le format, le style, etc.

:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=Description}
Axis label auto-hide. If two labels overlap, with spacing smaller than autoHideGap, the overlapping label is hidden automatically. Only applies to category axes.

:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=Description}
Axis label auto-hide gap. If the gap between two labels is smaller than autoHideGap, the overlapping label is hidden automatically. Only applies to category axes.

Y-axis, numeric axis, Y-axis configuration; defines the Y-axis of the chart, including its position, format, style, etc.

When autoHide is disabled, use sampling and configure it through minGap.

:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=Description}
Axis label auto-rotation. When label width exceeds axis length, labels are rotated automatically. Only applies to category axes.

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=Description}
Axis label auto-rotation angle range. Used when auto-rotation is enabled. Only applies to category axes.

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=Description}
Axis label auto-limit. When label width exceeds axis length, overflow is shown with ellipsis and the full label is visible on hover. Only applies to category axes.

:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=Description}
Maximum length for axis label auto-limit. When label text exceeds this length, overflow is shown with ellipsis and the full label is visible on hover. Only applies to category axes.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Description}
\- orderBy:'date'

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Ordre de tri personnalisé, appliqué directement à l'axe des catégories

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Formatage numérique des axes numériques. Valable uniquement pour les axes numériques. Priorité inférieure à `autoFormat`.

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Taille de police du label

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Taille de police du libellé

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Description}
Angle de rotation de l’étiquette

:::
### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Ligne de l’axe X

:::
#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Graisse de police du libellé

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Description}
}

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
\- 100000 est converti en 10万, ratio:10000, symbol:"万"

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Description}
Graduations de l’axe X

:::
#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Suffixe du format numérique

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Description}
Ordre de tri; peut être 'asc' ou 'desc'

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Description}
Legend sorting configuration; supports sorting based on dimensions or measures, as well as custom sorting orders; the sort array follows the order from left to right or top to bottom.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Description}
sortLegend: {

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Description}
Titre de l’axe X

:::
#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
\- 1234.5678 est converti en 1234.6, significantDigits:5 (roundingMode:halfCeil)

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Description}
Texte du titre. Par défaut, il suit la configuration du champ.

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Description}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Description}
Custom sorting order; this order will be directly applied to the legend. Ascending follows left-to-right or top-to-bottom; descending follows right-to-left or bottom-to-top.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Rectangle graphic element style

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Description}
Includes built-in `light` and `dark` themes. Custom themes can be added via `registerTheme`.

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Description}
selector = [{ profit: 100 }, { profit: 200 }]

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Description}
selector = 100

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Description}
Type de ligne de grille

:::
### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Description}
Configuration d'animation de l'axe X

:::


#### duration

**Type:** `number | undefined`

:::note{title=Description}
value: [100, 300]

:::

#### easing

**Type:** `string | undefined`

:::note{title=Description}
}

:::


## yAxis

**Type:** `YLinearAxis | undefined`

:::note{title=Description}
Configuration de l'axe Y numérique, utilisée pour définir l'axe Y du graphique, y compris position, format, style et paramètres associés.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Couleur de la ligne d'axe

:::

### min

**Type:** `number | undefined`

:::note{title=Description}
Axis line width

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Description}
X-axis ticks

:::

### log

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si un axe logarithmique est utilisé; s’applique uniquement aux axes numériques

:::

### logBase

**Type:** `number | undefined`

:::note{title=Description}
Base of the logarithmic axis; only applies to numeric axes

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les intervalles de ticks de l’axe sont ajustés automatiquement pour rendre les labels de ticks plus lisibles. Cette option est désactivée lorsque min et max sont configurés, et ne s’applique qu’aux axes numériques.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Description}
Configuration de l'animation de l'axe X

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Description}
Configuration de l'axe numérique (axe Y), utilisée pour définir l'axe Y du graphique, notamment la position, le format, le style, etc.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les labels de ticks de l’axe numérique sont formatés automatiquement. Ne s’applique qu’aux axes numériques. Lorsque autoFormat vaut true, numFormat est ignoré.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Formatage numérique des axes numériques. S’applique uniquement aux axes numériques et a une priorité inférieure à autoFormat.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}
Type de format numérique, prend en charge: decimal, percent (%), permille (‰), notation scientifique

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Ratio du format numérique, ne peut pas être 0

:::

**Exemple**
\- 100000 est converti en 10万, ratio:10000, symbol:"万"
\- 100000 est converti en 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Symbole du format numérique, par ex. %, ‰

:::

**Exemple**
\- 100000 est converti en 10万, ratio:10000, symbol:"万"
\- 100000 est converti en 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
Ratio de format numérique, ne peut pas être 0

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}
Suffixe du format numérique

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
Symbole de format numérique, par ex. %, ‰

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
Decimal places for numeric formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

**Exemple**
\- 1234.5678 se convertit en 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 se convertit en 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 se convertit en 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 se convertit en 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 se convertit en 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 se convertit en 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
Suffixe du format numérique

:::

**Exemple**
\- 1234.5678 se convertit en 1000, significantDigits:1
\- 1234.5678 se convertit en 1200, significantDigits:2
\- 1234.5678 se convertit en 1230, significantDigits:3
\- 1234.5678 se convertit en 1234, significantDigits:4
\- 1234.5678 se convertit en 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 se convertit en 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 se convertit en 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 se convertit en 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}
Nombre de décimales du format numérique, utilise minimumFractionDigits et maximumFractionDigits d'Intl.NumberFormat du navigateur; priorité inférieure à significantDigits

:::

**Exemple**
\- 1234.5678 se convertit en 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 se convertit en 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Chiffres significatifs du format numérique, utilise minimumSignificantDigits et maximumSignificantDigits d'Intl.NumberFormat du navigateur; priorité supérieure à fractionDigits

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Description}
\- orderBy:'date'

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Priorité d'arrondi du format numérique lorsque significantDigits et fractionDigits sont tous deux définis; utilise Intl.NumberFormat du navigateur et suit les mêmes règles que roundingPriority

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Formatage numérique des axes numériques. Valable uniquement pour les axes numériques. Priorité inférieure à `autoFormat`.

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Mode d'arrondi du format numérique, utilise Intl.NumberFormat du navigateur et suit les mêmes règles que roundingMode

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Graisse de police du label

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Description}
Angle de rotation de l’étiquette

:::
### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Ligne de l’axe X

:::
#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Description}
}

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Taille de police du libellé

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Description}
Graduations de l’axe X

:::
#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Suffixe du format numérique

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Description}
Ordre de tri; peut être 'asc' ou 'desc'

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Description}
Legend sorting configuration; supports sorting based on dimensions or measures, as well as custom sorting orders; the sort array follows the order from left to right or top to bottom.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Description}
sortLegend: {

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Description}
Titre de l’axe X

:::
#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
\- 1234.5678 est converti en 1234.6, significantDigits:5 (roundingMode:halfCeil)

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Description}
Texte du titre. Par défaut, il suit la configuration du champ.

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Description}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Description}
Custom sorting order; this order will be directly applied to the legend. Ascending follows left-to-right or top-to-bottom; descending follows right-to-left or bottom-to-top.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Rectangle graphic element style

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Description}
Includes built-in `light` and `dark` themes. Custom themes can be added via `registerTheme`.

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Description}
selector = [{ profit: 100 }, { profit: 200 }]

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Description}
selector = 100

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Description}
Type de ligne de grille

:::
### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Description}
selector = [{ profit: 100 }, { profit: 200 }]

:::


#### duration

**Type:** `number | undefined`

:::note{title=Description}
value: [100, 300]

:::

#### easing

**Type:** `string | undefined`

:::note{title=Description}
}

:::


## sort

**Type:** `Sort | undefined`

:::note{title=Description}
Configuration du tri de l’axe X ; prend en charge le tri par dimensions ou mesures, ainsi que l’ordre de tri personnalisé



Configuration du tri de l’axe catégoriel ; prend en charge le tri par dimensions ou mesures, ainsi que l’ordre de tri personnalisé
:::

**Exemple**
sort: {
  orderBy: 'profit',
  order: 'asc',
}
sort: {
  customOrder:['2019', '2020', '2021']
}

\- order:'asc'
\- orderBy:'date'
or
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
Mettre en surbrillance l’élément de données avec le taux de profit le plus élevé dans chaque région

:::

**Exemple**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=Description}
\- `__row_index` représente le numéro de ligne de l’élément de données d’origine, et `field` représente le champ à mettre en surbrillance.

:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=Description}
return _.map(filtered, item => ({



Chart dynamic filter configuration

:::

**Exemple**
sortLegend: {
  orderBy: 'profit',
  order: 'asc',
}
sortLegend: {
  customOrder:['2019', '2020', '2021']
}

\- order:'asc'
\- orderBy:'date'
or
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
Mettre en surbrillance l’élément de données avec le taux de profit le plus élevé dans chaque région

:::

**Exemple**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=Description}
Ordre de tri personnalisé. L'ordre est appliqué directement à la légende. L'ordre croissant va de gauche à droite ou de haut en bas; l'ordre décroissant va de droite à gauche ou de bas en haut.

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Description}
Thème du graphique. Le thème est une configuration fonctionnelle de priorité inférieure qui contient les paramètres communs à tous les types de graphiques ainsi que ceux partagés au sein d'une catégorie de graphique. Les thèmes intégrés incluent light et dark, et les utilisateurs peuvent les personnaliser via Builder.



Operator



\- not in: sélectionne les éléments de données dont la valeur du champ de dimension ne se trouve PAS dans la liste de valeurs.

:::

**Exemple**
'dark'

'light'

'customThemeName'




### length

**Type:** `number`

### brand

**Type:** `brand`


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title=Description}
Solution de repli lorsque l'exécution du code échoue ou que l'environnement n'est pas pris en charge.



Thème du graphique. Le thème est une configuration de priorité inférieure qui contient les paramètres communs à tous les types de graphiques et les paramètres propres à chaque type. Les thèmes intégrés incluent 'light' et 'dark'; les utilisateurs peuvent personnaliser les thèmes via le Builder.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Thème

:::

### rectColor

**Type:** `string | undefined`

:::note{title=Description}
Thèmes clair et sombre intégrés; de nouveaux thèmes peuvent être personnalisés via registerTheme.

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Operator

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si le label de la zone rectangulaire du crosshair est affiché

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
\- Supports arbitrarily complex data filtering conditions

:::


## boxPlotStyle

**Type:** `BoxPlotStyle | BoxPlotStyle[] | undefined`

:::note{title=Description}
Configuration du style de boîte du box plot, applicable globalement ou au niveau du selector

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Data selector

Si un selector est configuré, il fournit quatre capacités de correspondance des données : selector numérique, selector de données locales, selector de dimension conditionnel et selector de mesure conditionnel.

If no selector is configured, the style applies globally.

:::

**Exemple**
Numeric selector
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

Local data selector
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

Conditional dimension selector
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

Selector de mesure conditionnel
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
Sélecteur de données

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in the value

\- not in: Select data items where the value of the dimension field is not in the value

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in the value

\- not in: Select data items where the value of the dimension field is not in the value

Champ de dimension, ID d'un élément de dimension

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Opérateur

:::

### boxVisible

**Type:** `boolean | undefined`

:::note{title=Description}
\- in: sélectionne les éléments dont la valeur du champ de dimension est dans value

:::

### boxColor

**Type:** `string | undefined`

:::note{title=Description}
\- not in: sélectionne les éléments dont la valeur du champ de dimension n'est pas dans value

:::

### boxColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Opérateur

:::

### boxBorderColor

**Type:** `string | undefined`

:::note{title=Description}
\- in: sélectionne les éléments dont la valeur du champ de dimension est dans value

:::

### boxBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
\- not in: sélectionne les éléments dont la valeur du champ de dimension n'est pas dans value

:::

### boxBorderOpacity

**Type:** `number | undefined`

:::note{title=Description}
Opacité de la bordure de l’élément de box plot

:::

### boxCornerRadius

**Type:** `number | undefined`

:::note{title=Description}
Sélectionne les éléments par valeur de champ de dimension; prend en charge les tableaux

:::

### medianBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Median line color

:::

### whiskerBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Whisker line color

:::


## outlierStyle

**Type:** `OutlierStyle | OutlierStyle[] | undefined`

:::note{title=Description}
Outlier style configuration, supports global or selector-level application

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Data selector

Si un selector est configuré, il fournit quatre capacités de correspondance des données : selector numérique, selector de données locales, selector de dimension conditionnel et selector de mesure conditionnel.

If no selector is configured, the style applies globally.

:::

**Exemple**
Numeric selector
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

Local data selector
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

Conditional dimension selector
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

Selector de mesure conditionnel
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
Sélecteur de données

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in the value

\- not in: Select data items where the value of the dimension field is not in the value

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in the value

\- not in: Select data items where the value of the dimension field is not in the value

Champ de dimension, ID d'un élément de dimension

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Opérateur

:::

### pointVisible

**Type:** `boolean | undefined`

:::note{title=Description}
\- in: sélectionne les éléments dont la valeur du champ de dimension est dans value

:::

### pointSize

**Type:** `number | undefined`

:::note{title=Description}
\- not in: sélectionne les éléments dont la valeur du champ de dimension n'est pas dans value

:::

### pointColor

**Type:** `string | undefined`

:::note{title=Description}
Opérateur

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
\- in: sélectionne les éléments dont la valeur du champ de dimension est dans value

:::

### pointBorderColor

**Type:** `string | undefined`

:::note{title=Description}
\- not in: sélectionne les éléments dont la valeur du champ de dimension n'est pas dans value

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Point element border width

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Sélectionne les éléments par valeur de champ de dimension; prend en charge les tableaux

:::

**Exemple**
solid

dashed

dotted




## whiskers

**Type:** `number | number[] | undefined`

:::note{title=Description}
Configuration de la longueur des moustaches du box plot, prenant en charge les valeurs scalaires et les tableaux de longueur 2.

When the value is a scalar, whiskers * IQR is used to calculate the upper and lower bounds.

When the value is an array of length 2, whiskers[0] must be between [0, 0.25), representing the percentile for the lower bound;

whiskers[1] must be between (0.75, 1], representing the percentile for the upper bound.

:::


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Description}
Configuration du point d’annotation, qui définit sa position, son format, son style, etc. à partir des données sélectionnées.

:::
### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Sélecteur des points d’annotation, utilisé pour sélectionner les points de données.

:::


#### field

**Type:** `string`

:::note{title=Description}
Champ de dimension; ID d un élément dans dimensions.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: sélectionne les éléments de données dont la valeur du champ de dimension se trouve dans la liste de valeurs.

\- not in: sélectionne les éléments de données dont la valeur du champ de dimension ne se trouve PAS dans la liste de valeurs.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: sélectionne les éléments de données dont la valeur du champ de dimension se trouve dans la liste de valeurs.

\- not in: sélectionne les éléments de données dont la valeur du champ de dimension ne se trouve PAS dans la liste de valeurs.

identique à operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Valeurs du champ de dimension sélectionnées; prend en charge les tableaux.

:::

### measureId

**Type:** `string | undefined`

:::note{title=Description}
Spécifie l’id de la mesure à laquelle appartient le point d’annotation. Dans les scénarios multi-mesures, il peut être combiné avec selector pour localiser précisément le point cible.

:::
### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Filtre dynamique (exécution du code généré par l’IA)



Champ de dimension, ID d'un élément de dimension

Opérateur



\- in: sélectionne les éléments dont la valeur du champ de dimension est dans value

\- not in: sélectionne les éléments dont la valeur du champ de dimension n'est pas dans value

Opérateur

\- in: sélectionne les éléments dont la valeur du champ de dimension est dans value



\- not in: sélectionne les éléments dont la valeur du champ de dimension n'est pas dans value



Remarque : selector et dynamicFilter ne peuvent pas être utilisés simultanément; dynamicFilter a une priorité plus élevée..



Sélectionne les éléments par valeur de champ de dimension; prend en charge les tableaux



Filtre les marqueurs du graphique (barres, points, etc.) via du code JavaScript généré par AI.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Filtre animé (exécution de code généré par IA)

:::

**Exemple**
\- in: sélectionne les éléments dont la valeur du champ de dimension est dans value

\- not in: sélectionne les éléments dont la valeur du champ de dimension n'est pas dans value



#### code

**Type:** `string`

:::note{title=Description}
Code de filtrage JavaScript généré par IA



\- Seules les fonctions utilitaires intégrées sont autorisées (accessibles via _ ou R)

\- Paramètre d’entrée : data (tableau), chaque item contient un champ __row_index indiquant le numéro de ligne

\- Doit retourner un tableau de combinaisons index de ligne et champ : Array<{ __row_index: number, field: string }>

\- __row_index indique le numéro de ligne de l’élément d’origine, field indique le champ à mettre en évidence

\- Interdit : eval, Function, opérations asynchrones, DOM API, requêtes réseau

:::

**Exemple**
Mettre en évidence le champ sales des éléments dont sales est supérieur à 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Mettre en évidence l’élément dont la marge bénéficiaire est la plus élevée dans chaque zone
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

Mettre en évidence les éléments filtrés par plusieurs conditions
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
Fallback strategy when code execution fails or the environment is not supported.

:::


##### field

**Type:** `string`

:::note{title=Description}
Champ de dimension; ID d un élément dans dimensions.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Code JavaScript de filtrage généré par IA

\- Peut uniquement utiliser les fonctions utilitaires intégrées (accessibles via _ ou R)

\- Paramètre d'entrée: data (tableau), chaque élément contient un champ __row_index représentant le numéro de ligne

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
\- Doit retourner un tableau de combinaisons index de ligne et champ: Array<{ __row_index: number, field: string }>

\- __row_index représente le numéro de ligne de l'élément d'origine, field représente le champ à mettre en évidence

\- Interdit: eval, Function, opérations asynchrones, API DOM, requêtes réseau

Mettre en évidence le champ sales pour les éléments dont sales est supérieur à 1000

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Mettre en évidence l'élément ayant la marge bénéficiaire la plus élevée dans chaque zone

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Résultat d’exécution du filtre dynamique (champ d’exécution)

Écrit pendant la phase prepare() ; en lecture seule à l’exécution
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
Champ de dimension, ID d'un élément de dimension

:::

**Exemple**
\- Peut uniquement utiliser les fonctions utilitaires intégrées (accessibles via _ ou R)



### textColor

**Type:** `string | undefined`

:::note{title=Description}
\- in: sélectionne les éléments dont la valeur du champ de dimension est dans value

:::

**Exemple**
\- Doit retourner un tableau de combinaisons index de ligne et champ: Array<{ __row_index: number, field: string }>



### textFontSize

**Type:** `number | undefined`

:::note{title=Description}
Opérateur

:::

**Exemple**
\- Interdit: eval, Function, opérations asynchrones, API DOM, requêtes réseau



### textFontWeight

**Type:** `number | undefined`

:::note{title=Description}
\- not in: sélectionne les éléments dont la valeur du champ de dimension n'est pas dans value

:::

**Exemple**
Mettre en évidence l'élément ayant la marge bénéficiaire la plus élevée dans chaque zone



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Description}
Alignement du texte. En général, le définir sur `right` afin que le texte apparaisse à gauche du point d’annotation et reste dans la zone visible du graphique

Il est recommandé de le définir sur `right`, ce qui place le texte à gauche du point d’annotation

right : le texte est à gauche du point d’annotation, avec son bord droit aligné sur le point

left : le texte est à droite du point d’annotation, avec son bord gauche aligné sur le point

center : le texte est centré sur le point d’annotation, avec son centre aligné sur le point
:::

**Exemple**
\- not in: sélectionne les éléments dont la valeur du champ de dimension n'est pas dans value



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Alignement vertical du texte. En général, définissez top pour afficher le texte sous le point d’annotation et le garder dans la zone visible du graphique

Il est recommandé d’utiliser 'top' afin que le texte reste entièrement visible

top: le texte est sous le point d’annotation, son bord supérieur est aligné sur le point

middle: le texte est centré sur le point d’annotation

bottom: le texte est au-dessus du point d’annotation, son bord inférieur est aligné sur le point

:::

**Exemple**
'top'
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Arrière-plan visible

:::

**Exemple**
true
### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur d’arrière-plan
:::

**Exemple**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Description}
2

:::

**Exemple**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
4

:::

**Exemple**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
Rayon des coins de la bordure d’arrière-plan

:::

**Exemple**
4
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Description}
Marge interne de l’arrière-plan

:::

**Exemple**
4
### offsetY

**Type:** `number | undefined`

:::note{title=Description}
Décalage en pixels de l’ensemble du point d’annotation dans la direction Y. Lorsque le point est en haut du graphique (valeur élevée), une valeur positive est recommandée; lorsqu’il est en bas (valeur faible), une valeur négative est recommandée.

Une valeur négative décale l’ensemble vers le haut; par exemple \-10 décale le point, le texte et l’arrière-plan de 10 pixels vers le haut

Une valeur positive décale l’ensemble vers le bas; par exemple 10 décale le point, le texte et l’arrière-plan de 10 pixels vers le bas

:::

**Exemple**
offsetY: 5, le point d’annotation entier est décalé de 5 pixels vers le bas
### offsetX

**Type:** `number | undefined`

:::note{title=Description}
Décalage en pixels de l’ensemble du point d’annotation dans la direction X. Lorsque le point est à gauche du graphique (début de l’axe catégoriel), une valeur positive est recommandée; lorsqu’il est à droite (fin de l’axe catégoriel), une valeur négative est recommandée.

Une valeur négative décale l’ensemble vers la gauche; par exemple \-10 décale le point, le texte et l’arrière-plan de 10 pixels vers la gauche

Une valeur positive décale l’ensemble vers la droite; par exemple 10 décale le point, le texte et l’arrière-plan de 10 pixels vers la droite

:::

**Exemple**
offsetX: 5, le point d’annotation entier est décalé de 5 pixels vers la droite
## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Description}
Ligne d’annotation de valeur de dimension, affichée verticalement. Elle permet de configurer la position, le style et les paramètres associés de la ligne d’annotation.

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Description}
);

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Description}
Filtre dynamique (exécution du code généré par l’IA)



Rayon de bordure de l’arrière-plan

Configuration de la zone d’annotation; définit les zones d’annotation du graphique à partir des données sélectionnées, avec leur position, leur style, etc.



Indique si la fonction qui divise la ligne principale en deux segments est activée.

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Description de la demande de filtrage de l’utilisateur (langage naturel).

:::

**Exemple**
"Obtenir la valeur de ventes la plus élevée comme référence de la ligne d’annotation"

"Calculate the average sales for the annotation line"



#### code

**Type:** `string`

:::note{title=Description}
Code de filtrage JavaScript généré par IA



\- Seules les fonctions utilitaires intégrées sont autorisées (accessibles via _ ou R)

\- Paramètre d’entrée : data (tableau)

\- Doit retourner une seule valeur numérique ou chaîne : number | string

\- Cas d’usage : valeurs dynamiques nécessaires aux lignes d’annotation (horizontales ou verticales)

\- Interdit : eval, Function, opérations asynchrones, DOM API, requêtes réseau

:::

**Exemple**
Obtenir la valeur sales maximale comme valeur de ligne d’annotation
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculer une moyenne pour la ligne d’annotation
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Obtenir un quantile comme ligne d’annotation
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Calculer une valeur cible selon une condition
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
Fallback strategy when code execution fails or the environment is not supported.

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Description}
Résultat d’exécution du filtre dynamique (champ d’exécution)

Écrit pendant la phase prepare() ; en lecture seule à l’exécution
:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Description}
Written during the prepare() phase; read-only at runtime.

:::

**Exemple**
'Annotation text'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Description}
Filtre animé (exécution de code généré par IA)

:::

**Exemple**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Description}
center: Text is centered in the annotation area; the center of the text aligns with the area.

:::

**Exemple**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Description}
Description des besoins de filtrage de l’utilisateur (langage naturel).

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
Alignement du texte. En général, aucun réglage n’est nécessaire

Il est recommandé d’utiliser 'right' afin que le texte soit à gauche de la ligne d’annotation

right: le texte est à gauche de la ligne de référence, son bord droit est aligné sur la ligne d’annotation verticale

left: le texte est à droite de la ligne de référence, son bord gauche est aligné sur la ligne d’annotation verticale

center: le texte est centré sur la ligne de référence

:::

**Exemple**
'right'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Alignement vertical du texte. En général, aucun réglage n’est nécessaire

Il est recommandé d’utiliser 'top' afin que le texte reste entièrement visible dans le graphique

top: le texte est sous la ligne de référence, son bord supérieur est aligné sur l’extrémité de la ligne d’annotation verticale

middle: le texte est centré sur la ligne de référence

bottom: le texte est au-dessus de la ligne de référence, son bord inférieur est aligné sur l’extrémité de la ligne d’annotation verticale

:::

**Exemple**
'top'
### lineVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Ligne visible

:::

**Exemple**
true
### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de ligne

:::

**Exemple**
'red'
### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Écrit pendant la phase prepare(), en lecture seule à l'exécution

:::

**Exemple**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Rayon de bordure de la zone d’annotation

:::

**Exemple**
'solid'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Arrière-plan visible

:::

**Exemple**
true
### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur d’arrière-plan
:::

**Exemple**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Description}
2

:::

**Exemple**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
4

:::

**Exemple**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
Rayon des coins de la bordure d’arrière-plan

:::

**Exemple**
4
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Description}
Marge interne de l’arrière-plan

:::

**Exemple**
4
## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=Description}
4

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Description}
Valeur Y fixe utilisée pour annoter une ligne horizontale. Si l’axe catégoriel est dans la direction Y, vous pouvez saisir une valeur de dimension; si l’axe numérique est dans la direction Y, vous pouvez saisir une valeur numérique précise.

:::
### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Description}
Filtre dynamique (exécution du code généré par l’IA)



Rayon de bordure de l’arrière-plan

Configuration de la zone d’annotation; définit les zones d’annotation du graphique à partir des données sélectionnées, avec leur position, leur style, etc.



Indique si la fonction qui divise la ligne principale en deux segments est activée.

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Description de la demande de filtrage de l’utilisateur (langage naturel).

:::

**Exemple**
"Obtenir la valeur de ventes la plus élevée comme référence de la ligne d’annotation"

"Calculate the average sales for the annotation line"



#### code

**Type:** `string`

:::note{title=Description}
Code de filtrage JavaScript généré par IA



\- Seules les fonctions utilitaires intégrées sont autorisées (accessibles via _ ou R)

\- Paramètre d’entrée : data (tableau)

\- Doit retourner une seule valeur numérique ou chaîne : number | string

\- Cas d’usage : valeurs dynamiques nécessaires aux lignes d’annotation (horizontales ou verticales)

\- Interdit : eval, Function, opérations asynchrones, DOM API, requêtes réseau

:::

**Exemple**
Obtenir la valeur sales maximale comme valeur de ligne d’annotation
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculer une moyenne pour la ligne d’annotation
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Obtenir un quantile comme ligne d’annotation
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Calculer une valeur cible selon une condition
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
Fallback strategy when code execution fails or the environment is not supported.

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Description}
Résultat d’exécution du filtre dynamique (champ d’exécution)

Écrit pendant la phase prepare() ; en lecture seule à l’exécution
:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Description}
Written during the prepare() phase; read-only at runtime.

:::

**Exemple**
'Annotation text'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Description}
Position du texte



Position du libellé de la ligne d’annotation par rapport à la ligne.

:::

**Exemple**
'outsideEnd'
### textColor

**Type:** `string | undefined`

:::note{title=Description}
center: Text is centered in the annotation area; the center of the text aligns with the area.

:::

**Exemple**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Description}
Vertical text alignment; typically set to 'top' so text appears at the bottom of the annotation area, ensuring it remains within the visible area of the chart.

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
Alignement du texte. En général, aucun réglage n’est nécessaire

Il est recommandé de le définir sur `right`, ce qui place le texte à gauche de la ligne d’annotation

right : le texte est à gauche de la ligne de référence, avec son bord droit aligné sur l’extrémité de la ligne d’annotation horizontale

left : le texte est à droite de la ligne de référence, avec son bord gauche aligné sur l’extrémité de la ligne d’annotation horizontale

center : le texte est centré sur la ligne de référence, avec son centre aligné sur l’extrémité de la ligne d’annotation horizontale
:::

**Exemple**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Alignement vertical du texte. En général, aucun réglage n’est nécessaire

Il est recommandé d’utiliser 'top' afin que le texte reste entièrement visible dans le graphique

top: le texte est sous la ligne de référence, son bord supérieur est aligné sur la ligne d’annotation horizontale

middle: le texte est centré sur la ligne de référence

bottom: le texte est au-dessus de la ligne de référence, son bord inférieur est aligné sur la ligne d’annotation horizontale

:::

**Exemple**
'top'
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Arrière-plan visible

:::

**Exemple**
true
### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur d’arrière-plan
:::

**Exemple**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Description des besoins de filtrage de l’utilisateur (langage naturel).

:::

**Exemple**
Solution de repli lorsque l'exécution du code échoue ou que l'environnement n'est pas pris en charge



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
4



Code JavaScript de filtrage généré par IA

:::

**Exemple**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
Rayon des coins de la bordure d’arrière-plan

:::

**Exemple**
4
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Description}
Marge interne de l’arrière-plan

:::

**Exemple**
4
### lineVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Ligne visible



Ligne visible

:::

**Exemple**
true
### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de ligne

:::

**Exemple**
'red'
### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Largeur de ligne
:::

**Exemple**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Rayon de bordure de la zone d’annotation

:::

**Exemple**
'solid'



### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=Description}
Style de ligne de bordure de la zone d’annotation

:::


#### positiveColor

**Type:** `string | undefined`

:::note{title=Description}
Solution de repli lorsque l'exécution du code échoue ou que l'environnement n'est pas pris en charge

:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur principale de la partie inférieure à la valeur d’annotation

:::
## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Description}
Configuration de la zone d’annotation, qui définit sa position, son style, etc. à partir des données sélectionnées.

:::
### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Description}
Indique si la fonction de liaison de dimension est activée lorsque le graphique a la perspective activée ou lorsque les mesures sont combinées.

:::


#### field

**Type:** `string`

:::note{title=Description}
Champ de dimension; ID d un élément dans dimensions.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: sélectionne les éléments de données dont la valeur du champ de dimension se trouve dans la liste de valeurs.

\- not in: sélectionne les éléments de données dont la valeur du champ de dimension ne se trouve PAS dans la liste de valeurs.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: sélectionne les éléments de données dont la valeur du champ de dimension se trouve dans la liste de valeurs.

\- not in: sélectionne les éléments de données dont la valeur du champ de dimension ne se trouve PAS dans la liste de valeurs.

identique à operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Valeurs du champ de dimension sélectionnées; prend en charge les tableaux.

:::

### text

**Type:** `string | string[] | undefined`

:::note{title=Description}
Written during the prepare() phase; read-only at runtime.

:::

**Exemple**
'Annotation text'



### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title=Description}
Position du texte

:::

**Exemple**
'top'
### textColor

**Type:** `string | undefined`

:::note{title=Description}
center: Text is centered in the annotation area; the center of the text aligns with the area.

:::

**Exemple**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Description}
Vertical text alignment; typically set to 'top' so text appears at the bottom of the annotation area, ensuring it remains within the visible area of the chart.

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
Alignement du texte. En général, le définir sur `right` ; le texte s’affiche au milieu de la zone d’annotation afin de rester dans la zone visible du graphique

Il est recommandé de le définir sur `center`, ce qui place le texte au milieu de la zone d’annotation

right : le texte est à gauche de la zone d’annotation, avec son bord droit aligné sur la zone d’annotation

left : le texte est à droite de la zone d’annotation, avec son bord gauche aligné sur la zone d’annotation

center : le texte est centré dans la zone d’annotation, avec son centre aligné sur la zone d’annotation
:::

**Exemple**
'center' Text is in the middle of the annotation area



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Alignement vertical du texte. Généralement défini sur top afin que le texte apparaisse en bas de la zone d’annotation et reste dans la zone visible du graphique.

bottom: Text is at the top of the annotation area, with the bottom edge aligned with the area.

top: text is at the bottom of the annotation area; the top edge of the text aligns with the annotation area

middle: text is centered in the annotation area; the center of the text aligns with the annotation area

Order of the polynomial regression

:::

**Exemple**
'top' Text is at the bottom of the annotation area



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Arrière-plan visible

:::

**Exemple**
true
### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur d’arrière-plan
:::

**Exemple**
\- not in: sélectionne les éléments dont la valeur du champ de dimension n'est pas dans value



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Description}
2



2

:::

**Exemple**
\- not in: sélectionne les éléments dont la valeur du champ de dimension n'est pas dans value



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
4

:::

**Exemple**
Sélectionne les éléments par valeur de champ de dimension; prend en charge les tableaux



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
Rayon des coins de la bordure d’arrière-plan



Rayon des coins de la bordure d’arrière-plan

:::

**Exemple**
4
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Description}
Marge interne de l’arrière-plan

:::

**Exemple**
4
### areaColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de remplissage de la zone d’annotation

:::

**Exemple**
'red'



### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Opacité du remplissage de la zone d’annotation

:::

**Exemple**
0.5



### areaBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de bordure de la zone d’annotation

:::

**Exemple**
'red'



### areaBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Largeur de bordure de la zone d’annotation

:::

**Exemple**
2



### areaBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
Rayon de bordure de la zone d’annotation

:::

**Exemple**
4



### areaLineDash

**Type:** `number[] | undefined`

:::note{title=Description}
Style de ligne de bordure de la zone d’annotation

:::

**Exemple**
[2, 2]



### outerPadding

**Type:** `number | undefined`

:::note{title=Description}
Opérateur

:::

**Exemple**
0




## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=Description}
Lorsque la fonction de pivot ou la combinaison de mesures est activée dans le graphique, indique si la liaison de dimension est activée.

Au survol d’une valeur de dimension, les données ayant la même valeur de dimension dans les autres graphiques sont mises en évidence.

Configuration de la liaison de dimension du graphique pivot
:::


### enable

**Type:** `false | true`

:::note{title=Description}
Indique si la liaison de dimension du graphique pivot est activée
:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les informations Tooltip des sous-graphiques correspondant à toutes les dimensions sont affichées
:::

### showLabel

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si l’étiquette correspondant au crosshair est affichée
:::


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Description}
Configuration de la langue du graphique. Prend en charge 'zh-CN' et 'en-US'. Il est aussi possible d’appeler intl.setLocale('zh-CN') pour définir la langue
:::


## boxMaxWidth

**Type:** `string | number | undefined`

:::note{title=Description}
Largeur maximale du box plot. Peut être définie en pixels absolus ou en pourcentage (par exemple '10%').

:::


## boxGapInGroup

**Type:** `string | number | undefined`

:::note{title=Description}
Espacement dans chaque groupe d’un box plot groupé. Peut être défini en pixels absolus ou en pourcentage (par exemple '10%').

:::
