# DualAxis

:::info{title=Recommandation}
\- Configuration de champs recommandée : `2` mesures, `2` dimensions

\- Prend en charge la restructuration des données : au moins `1` mesure, `0` dimension

:::

:::info{title=Mappage d’encodage}
Le graphique à double axe prend en charge les canaux visuels suivants :

`xAxis`          : canal de l’axe x, prend en charge `plusieurs dimensions` et mappe les valeurs de dimension sur l’axe x

`primaryYAxis`   : canal de l’axe y principal, prend en charge `plusieurs mesures` et mappe les mesures sur l’axe principal

`secondaryYAxis` : canal de l’axe y secondaire, prend en charge `plusieurs mesures` et mappe les mesures sur l’axe secondaire

`detail`         : canal de détail, prend en charge `plusieurs dimensions` et sert à afficher des données plus granulaires dans la même série de couleurs

`color`          : canal de couleur, prend en charge `plusieurs dimensions` ou `une mesure`; les couleurs de dimension distinguent les séries de données, les couleurs de mesure mappent linéairement les valeurs de mesure sur les couleurs graphiques

`tooltip`        : canal d’infobulle, prend en charge `plusieurs dimensions` et `plusieurs mesures`, affiché lors du survol d’un point de données

`label`          : canal de libellé, prend en charge `plusieurs dimensions` et `plusieurs mesures`, affiche les libellés de données sur les points de données

:::

:::note{title=Description}
Graphique à double axe, adapté à l’affichage de relations de comparaison entre deux mesures d’ordres de grandeur ou d’unités différents, avec un axe principal et un axe secondaire

Scénarios d’utilisation :

\- Analyse comparative de mesures avec des ordres de grandeur différents

\- Comparaison de tendances de mesures corrélées

\- Affichage simultané de valeurs, de taux de croissance ou d’autres mesures composées

\- Prend en charge les combinaisons de différents types de graphiques (par exemple ligne + barre / ligne + aire / aire + barre)
:::

:::warning{title=Avertissement}
Exigences de données:

- Au moins 1 champ de mesure

- Prend en charge les groupes de mesures; le premier groupe est placé sur l’axe principal (gauche), le second sur l’axe secondaire (droite)

- La première dimension est placée sur l’axe X; les autres dimensions sont fusionnées avec les noms de mesure en présence de plusieurs mesures pour former les éléments de légende.

- Deux groupes de mesures peuvent être mappés respectivement sur les axes y gauche et droit; toutes les mesures d’un même groupe sont automatiquement fusionnées.

Fonctionnalités activées par défaut :

- Les axes, la légende, les libellés de données et les infobulles sont activés par défaut.

:::


## chartType

**Type:** `"dualAxis"`

:::note{title=Description}
Graphique à double axe, graphique combiné affichant la relation comparative entre deux mesures d’échelles différentes

:::

**Exemple**
'dualAxis'




## dataset

**Type:** `Record[]`

:::note{title=Description}
Jeu de données agrégé conforme à la spécification TidyData, utilisé pour définir la source et la structure des données du graphique. Le jeu de données fourni par l'utilisateur n'a pas besoin de prétraitement. VSeed dispose de puissantes capacités de restructuration des données et effectue lui-même cette transformation; les données du graphique en colonnes sont finalement converties en 2 dimensions et 1 mesure.

:::

**Exemple**
[{category:'A', value:100}, {category:'B', value:200}]




## dimensions

**Type:** `ColumnDimension[] | undefined`

:::note{title=Description}
La première dimension du graphique en colonnes est mappée sur l'axe X. Les autres dimensions sont fusionnées avec le nom de la mesure lorsqu'il existe plusieurs mesures, puis affichées comme éléments de légende.

:::

**Exemple**
[{id: "category", alias: "category"}]




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

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=Description}
Canal auquel la dimension est mappée

\- xAxis : prend en charge le mappage de plusieurs dimensions sur l’axe X

\- color: prend en charge le mapping de plusieurs dimensions vers le canal de couleur

\- detail: prend en charge le mapping de plusieurs dimensions vers le canal detail

\- tooltip: permet de mapper plusieurs dimensions au canal d'infobulle

\- label: permet de mapper plusieurs dimensions au canal de libellé

\- row: prend en charge le mapping de plusieurs dimensions vers le canal ligne

\- column: prend en charge le mapping de plusieurs dimensions vers le canal colonne

:::


## measures

**Type:** `DualAxisMeasure[] | undefined`

:::note{title=Description}
Mesures du graphique à double axe.

Pour les mesures mappées vers `primaryYAxis` et `secondaryYAxis` dans `encoding`, vous pouvez définir la propriété `parentId` afin de regrouper les mesures. Les mesures de groupes différents s’affichent dans des sous-graphiques distincts. Vous pouvez aussi définir la propriété `chartType` pour préciser le type de graphique de chaque groupe de mesures.
:::

**Exemple**
[{ id: 'value', encoding: 'primaryYAxis' }, { id: 'growth', encoding: 'secondaryYAxis' }]




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

**Type:** `"color" | "tooltip" | "label" | "primaryYAxis" | "secondaryYAxis" | undefined`

:::note{title=Description}
Canal sur lequel la mesure est mappée

\- primaryYAxis: mesure mappée sur l’axe y principal

\- secondaryYAxis: mesure mappée sur l’axe y secondaire

\- color: mesure mappée sur le canal de couleur

\- label: mesure mappée sur le canal de libellé

\- tooltip: mesure mappée sur le canal d’infobulle

:::

### parentId

**Type:** `string | undefined`

:::note{title=Description}
Dans la forme de configuration plate des mesures, construit un groupe de mesures en arbre. parentId pointe vers l'id du groupe parent, utilisé pour construire l'arbre de mesures

:::

:::tip{title=Tip}
Deux façons existent pour configurer l'arbre de mesures: l'option 1 consiste à configurer directement un arbre avec children; l'option 2 consiste à configurer une liste plate avec parentId. Ces deux méthodes ne peuvent pas être utilisées simultanément

:::


### chartType

**Type:** `"area" | "column" | "areaPercent" | "columnParallel" | "columnPercent" | "line" | "scatter" | undefined`

:::note{title=Description}
- column: graphique en barres/colonnes

- columnParallel: graphique en colonnes parallèles

\- color : mesure mappée au canal de couleur

\- label: mesure mappée au canal label

\- tooltip: mesure mappée au canal tooltip

Dans la forme de configuration plate des mesures, construit un groupe de mesures en arbre. parentId pointe vers l'id du groupe parent, utilisé pour construire l'arbre de mesures

Deux façons existent pour configurer l'arbre de mesures: l'option 1 consiste à configurer directement un arbre avec children; l'option 2 consiste à configurer une liste plate avec parentId. Ces deux méthodes ne peuvent pas être utilisées simultanément

\- scatter: nuage de points

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




## alignTicks

**Type:** `boolean | boolean[] | undefined`

:::note{title=Description}
Symbole du format numérique, par ex. %, ‰

:::

**Exemple**
{"chartType":"dualAxis","dataset":[{"date":"2019","profit":10,"sales":100},{"date":"2020","profit":30,"sales":200},{"date":"2021","profit":30,"sales":300},{"date":"2022","profit":50,"sales":500}],"alignTicks":[false,true],"dualMeasures":[{"primaryMeasures":[{"id":"profit"}],"secondaryMeasures":[{"id":"sales"}]},{"primaryMeasures":[{"id":"profit"}],"secondaryMeasures":[{"id":"sales"}]}]}




## primaryYAxis

**Type:** `YLinearAxis | YLinearAxis[] | undefined`

:::note{title=Description}
Configuration de l’axe Y principal du graphique à double axe, notamment la position, le style et les paramètres associés. Lorsque les mesures comportent plusieurs groupes, primaryYAxis peut être configuré sous forme de tableau, chaque élément correspondant à un axe Y principal.

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
- 100000 est converti en 10K, ratio:1000, symbol:"K"
Suffixe du format numérique



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Description de la demande de filtrage de l’utilisateur (langage naturel).

:::

**Exemple**
- 100000 est converti en 10K, ratio:1000, symbol:"K"
Suffixe du format numérique



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
Custom sorting order; this order will be directly applied to the legend. Ascending follows left-to-right or top-to-bottom; descending follows right-to-left or bottom-to-top.

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}
Suffixe du format numérique

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
Includes built-in `light` and `dark` themes. Custom themes can be added via `registerTheme`.

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
value: [100, 300]

:::

**Exemple**
\- 1234.5678 devient 1230, significantDigits:3 (roundingPriority:lessPrecision)
Taille de police de l’étiquette.



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Chiffres significatifs du format numérique, utilise minimumSignificantDigits et maximumSignificantDigits d'Intl.NumberFormat du navigateur; priorité supérieure à fractionDigits

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Description}
Symbole du format numérique, par ex. %, ‰

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Thème

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Formatage numérique des axes numériques. Valable uniquement pour les axes numériques. Priorité inférieure à `autoFormat`.

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Operator

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Configuration du format des valeurs de libellé; fusionnée avec `format` dans `measure`, où `format` de `measure` a une priorité plus élevée. numFormat a une priorité inférieure à autoFormat

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Description}
Description de la demande de filtrage de l’utilisateur (langage naturel).

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Description de la demande de filtrage de l’utilisateur (langage naturel).

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Symbole du format numérique, par ex. %, ‰

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Texte du titre. Par défaut, il suit la configuration du champ.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Maximum column width. It can be a pixel value or a percentage string.

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Description}
Decimal places for numeric formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

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
Configuration du tri de la légende; prend en charge le tri selon les dimensions ou les mesures ainsi que les ordres personnalisés. Le tableau de tri suit l’ordre de gauche à droite ou de haut en bas.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Description}
Configuration de l'animation de l'axe X

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Description}
Description de la demande de filtrage de l’utilisateur (langage naturel).

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
\- 1234.5678 est converti en 1234.6, significantDigits:5 (roundingMode:halfCeil)

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Description}
Formatage numérique des axes numériques. Valable uniquement pour les axes numériques. Priorité inférieure à `autoFormat`.

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Description}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Description}
Couleur du contour du libellé

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Rectangle graphic element style

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Description}
Indique si la couleur de police est inversée automatiquement selon la couleur de l'élément

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
Suffixe du format numérique

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
Texte du titre. Par défaut, il suit la configuration du champ.

:::


## secondaryYAxis

**Type:** `YLinearAxis | YLinearAxis[] | undefined`

:::note{title=Description}
Configuration de l’axe Y secondaire du graphique à double axe, notamment la position, le style et les paramètres associés. Lorsque les mesures comportent plusieurs groupes, secondaryYAxis peut être configuré sous forme de tableau, chaque élément correspondant à un axe Y secondaire.

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
- 100000 est converti en 10K, ratio:1000, symbol:"K"
Suffixe du format numérique



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
\- orderBy:'date'

:::

**Exemple**
- 100000 est converti en 10K, ratio:1000, symbol:"K"
Suffixe du format numérique



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
Nombre de décimales du format numérique, utilise minimumFractionDigits et maximumFractionDigits d'Intl.NumberFormat du navigateur; priorité inférieure à significantDigits

:::

**Exemple**
\- 1234.5678 devient 1230, significantDigits:3 (roundingPriority:lessPrecision)
Taille de police de l’étiquette.



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
Indique si la zone brush est effacée à la fin de la sélection

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Description}
Description de la demande de filtrage de l’utilisateur (langage naturel).

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Description de la demande de filtrage de l’utilisateur (langage naturel).

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Texte du titre. Par défaut, il suit la configuration du champ.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Taille de police du libellé

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Description}
Graisse de police du libellé

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
Configuration du tri de la légende; prend en charge le tri selon les dimensions ou les mesures ainsi que les ordres personnalisés. Le tableau de tri suit l’ordre de gauche à droite ou de haut en bas.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Description}
sortLegend: {

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Description}
4

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
\- 1234.5678 est converti en 1234.6, significantDigits:5 (roundingMode:halfCeil)

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Description}
}

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Description}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Description}
Ratio de format numérique, ne peut pas être 0

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Rectangle graphic element style

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Description}
Symbole de format numérique, par ex. %, ‰

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
Suffixe du format numérique

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Description}
selector = [{ profit: 100 }, { profit: 200 }]

:::


#### duration

**Type:** `number | undefined`

:::note{title=Description}
Nombre de décimales du format numérique, utilise minimumFractionDigits et maximumFractionDigits d'Intl.NumberFormat du navigateur; priorité inférieure à significantDigits

:::

#### easing

**Type:** `string | undefined`

:::note{title=Description}
}

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
Angle de rotation des libellés

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
 'sales': 'blue',
}
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
"Highlight bars whose sales are greater than 1000"

"Highlight the bar with the highest profit rate in each region"



#### code

**Type:** `string`

:::note{title=Description}
Code JavaScript de filtrage généré par IA



\- Peut uniquement utiliser les fonctions utilitaires intégrées (accessibles via _ ou R)

\- Paramètre d'entrée: data (tableau), chaque élément contient un champ __row_index représentant le numéro de ligne

\- Doit retourner un tableau de combinaisons index de ligne et champ: Array<{ __row_index: number, field: string }>

\- __row_index représente le numéro de ligne de l'élément d'origine, field représente le champ à mettre en évidence

\- Interdit: eval, Function, opérations asynchrones, API DOM, requêtes réseau

:::

**Exemple**
Mettre en évidence le champ sales pour les éléments dont sales est supérieur à 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Mettre en évidence l'élément ayant la marge bénéficiaire la plus élevée dans chaque zone
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

Mettre en évidence les éléments avec un filtrage multi-conditions
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
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la bordure de la légende est activée..

:::

:::warning{title=Warning}
Applies only to discrete legends.

:::

**Exemple**
Graisse de police de la légende



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
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Description}
Forme de la légende
:::

:::warning{title=Warning}
Applies only to discrete legends.

:::

**Exemple**
Brush



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Description}
Position de la légende

:::

**Exemple**
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=Description}
Maximum number of columns or rows when there are many legend items.

If position is horizontal (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize controls the number of columns shown.

If position is vertical (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize controls the number of rows shown.

:::

:::warning{title=Warning}
Applies only to discrete legends.

:::

**Exemple**
Mode brush; définit si une ou plusieurs zones peuvent être sélectionnées.




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


## sort

**Type:** `Sort | undefined`

:::note{title=Description}
Configuration du tri de l’axe X ; prend en charge le tri par dimensions ou mesures, ainsi que l’ordre de tri personnalisé



Configuration du tri de l’axe catégoriel ; prend en charge le tri par dimensions ou mesures, ainsi que l’ordre de tri personnalisé
:::

**Exemple**
ID du champ de dimension (le `id` d un élément dans `dimensions`).
Configuration du filtre dynamique du graphique.
field: 'sales'
}
ID du champ de dimension (le `id` d un élément dans `dimensions`).
Operator
}

const grouped = _.groupBy(data, 'area');
\- not in: sélectionne les éléments dont la valeur du champ de dimension n'est pas dans value
Configuration du filtre dynamique du graphique.
Remarque : selector et dynamicFilter ne peuvent pas être utilisés simultanément; dynamicFilter a une priorité plus élevée.




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
Mettre en surbrillance l’élément de données avec le taux de profit le plus élevé dans chaque région

:::

**Exemple**
\- not in: sélectionne les éléments dont la valeur du champ de dimension n'est pas dans value
\- Input parameters: data (array), each item contains a __row_index field representing the row number



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
return _.map(filtered, item => ({
Configuration du filtre dynamique du graphique.
field: 'sales'
}
return _.map(filtered, item => ({
Operator
}

const grouped = _.groupBy(data, 'area');
\- not in: sélectionne les éléments dont la valeur du champ de dimension n'est pas dans value
Configuration du filtre dynamique du graphique.
Remarque : selector et dynamicFilter ne peuvent pas être utilisés simultanément; dynamicFilter a une priorité plus élevée.




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
Mettre en surbrillance l’élément de données avec le taux de profit le plus élevé dans chaque région

:::

**Exemple**
\- not in: sélectionne les éléments dont la valeur du champ de dimension n'est pas dans value
\- Input parameters: data (array), each item contains a __row_index field representing the row number



### customOrder

**Type:** `string[] | undefined`

:::note{title=Description}
Custom sort order. The order is applied directly to the legend. Ascending order goes left-to-right or top-to-bottom; descending order goes right-to-left or bottom-to-top.

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Description}
Thème du graphique. Le thème est une configuration fonctionnelle de priorité inférieure qui contient les paramètres communs à tous les types de graphiques ainsi que ceux partagés au sein d'une catégorie de graphique. Les thèmes intégrés incluent light et dark, et les utilisateurs peuvent les personnaliser via Builder.



Operator



\- not in: sélectionne les éléments de données dont la valeur du champ de dimension ne se trouve PAS dans la liste de valeurs.

:::

**Exemple**
Operator

Highlight items meeting multiple filtering conditions

const filtered = _.filter(data, item => {




### length

**Type:** `number`

### brand

**Type:** `brand`


## barMaxWidth

**Type:** `string | number | undefined`

:::note{title=Description}
Maximum column width. It can be a pixel value or a percentage string.

:::


## barGapInGroup

**Type:** `string | number | undefined`

:::note{title=Description}
Distance between columns in the same category. It can be a pixel value or a percentage string.

:::


## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title=Description}
Style des marques rectangulaires du graphique en colonnes, incluant couleur, bordure et arrondis.

Prend en charge les styles globaux ou conditionnels

Filtre de données

Si selector est configuré, quatre modes de correspondance sont disponibles: numérique, données locales, dimension conditionnelle et mesure conditionnelle

Sans selector, le style s’applique globalement.

:::
### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Sélecteur de données

Si selector est configuré, quatre modes de correspondance sont disponibles: numérique, données locales, dimension conditionnelle et mesure conditionnelle

Sans selector, le style s’applique globalement.

:::

**Exemple**
Sélecteur numérique
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

Sélecteur de données locales
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

Sélecteur de dimension conditionnelle
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

Sélecteur de mesure conditionnelle
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
Champ de dimension; ID d’un élément dans dimensions

:::
#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Opérateur

- in: sélectionne les éléments dont la valeur du champ de dimension est dans value

- not in: sélectionne les éléments dont la valeur du champ de dimension n’est pas dans value

:::
#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Opérateur

- in: sélectionne les éléments dont la valeur du champ de dimension est dans value

- not in: sélectionne les éléments dont la valeur du champ de dimension n’est pas dans value

Identique à operator

:::
#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Sélectionne la valeur du champ de dimension dans l’élément de données; les tableaux sont pris en charge

:::
### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Filtre dynamique (exécution de code généré par l’IA)

Implémente une logique de filtrage complexe avec du code JavaScript généré par l’IA.

Adapté aux Top N, analyses statistiques, conditions complexes et autres cas difficiles à exprimer avec des sélecteurs statiques.

Fonctionnalités clés:

- Prend en charge des conditions de filtrage arbitrairement complexes

- Utilise des fonctions utilitaires intégrées pour les opérations de données

- Exécution sécurisée dans le navigateur (sandbox Web Worker)

Environnement: seuls les navigateurs sont pris en charge; Node.js utilise fallback.

Remarque: selector et dynamicFilter ne peuvent pas être utilisés en même temps; dynamicFilter est prioritaire.

Configuration du filtre dynamique du graphique

Filtre les marques du graphique (barres, points, etc.) avec du code JavaScript généré par l’IA

:::
#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Description du besoin de filtrage utilisateur (langage naturel)

:::

**Exemple**
"Mettre en évidence les barres avec sales > 1000"

"Mettre en évidence la barre au taux de profit le plus élevé dans chaque région"
#### code

**Type:** `string`

:::note{title=Description}
Code de filtrage JavaScript généré par l’IA

- Seules les fonctions utilitaires intégrées peuvent être utilisées (via _ ou R)

- Paramètre d’entrée: data (tableau), chaque item contient le champ __row_index comme numéro de ligne

- Doit retourner un tableau de combinaisons index de ligne et champ: Array<{ __row_index: number, field: string }>

- __row_index est le numéro de ligne de l’élément d’origine, field est le champ à mettre en évidence

- Interdit: eval, Function, opérations asynchrones, API DOM, requêtes réseau

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

Mettre en évidence l’élément au taux de profit le plus élevé dans chaque région
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
Solution fallback si l’exécution du code échoue ou si l’environnement n’est pas pris en charge

:::
##### field

**Type:** `string`

:::note{title=Description}
Champ de dimension; ID d’un élément dans dimensions

:::
##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Opérateur

- in: sélectionne les éléments dont la valeur du champ de dimension est dans value

- not in: sélectionne les éléments dont la valeur du champ de dimension n’est pas dans value

:::
##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Opérateur

- in: sélectionne les éléments dont la valeur du champ de dimension est dans value

- not in: sélectionne les éléments dont la valeur du champ de dimension n’est pas dans value

Identique à operator

:::
##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Sélectionne la valeur du champ de dimension dans l’élément de données; les tableaux sont pris en charge

:::
#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Résultat d’exécution du filtre dynamique (champ runtime)

Écrit pendant la phase prepare(); en lecture seule à l’exécution

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
Indique si l’élément barre (rectangle) est visible

:::
### barColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de l’élément barre (rectangle)

:::
### barColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Opacité de couleur de l’élément barre (rectangle)

:::
### barBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de bordure de l’élément barre (rectangle)

:::
### barBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Largeur de bordure de l’élément barre (rectangle)

:::
### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Style de bordure de l’élément barre (rectangle)

:::

**Exemple**
solid

dashed

dotted
### barBorderOpacity

**Type:** `number | undefined`

:::note{title=Description}
Rayon d’angle de l’élément barre (rectangle)

Opacité du contour de l’élément barre (rectangle)

:::

**Exemple**
4

[0, 0, 10, 10]
### barRadius

**Type:** `number | number[] | undefined`


## lineStyle

**Type:** `LineStyle | LineStyle[] | undefined`

:::note{title=Description}
Configuration du style du marqueur de ligne, utilisée pour définir la couleur, l’opacité, la courbe et les paramètres associés du marqueur de ligne.

Prend en charge la configuration d’un style global ou d’un style conditionnel

Filtre de données




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
Champ de dimension, ID d'un élément de dimension
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
identique à operator

\- in: sélectionne les éléments de données dont la valeur du champ de dimension appartient à la valeur spécifiée


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
identique à operator

\- in: sélectionne les éléments de données dont la valeur du champ de dimension appartient à la valeur spécifiée


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
Filtre dynamique (exécution de code généré par l’IA)

Implémente une logique complexe de filtrage des données via du code JavaScript généré par l’IA.

Convient aux scénarios Top N, analyses statistiques, conditions complexes et autres cas difficiles à exprimer avec un selector statique.

Capacités principales :

- Prend en charge des conditions de filtrage de données arbitrairement complexes

- Utilise les fonctions utilitaires intégrées pour les opérations de données

- S’exécute de manière sûre dans l’environnement du navigateur (sandbox Web Worker)

Exigences d’environnement : seuls les environnements de navigateur sont pris en charge ; les environnements Node.js utiliseront fallback

Remarque : selector et dynamicFilter ne peuvent pas être utilisés simultanément ; dynamicFilter a une priorité plus élevée

Configuration du filtre dynamique du graphique

Filtre les marques du graphique (aires, points, etc.) via du code JavaScript généré par l’IA
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Description des besoins de filtrage de l’utilisateur (langage naturel).
:::

**Exemple**
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=Description}
Code de filtrage JavaScript généré par IA



- Seules les fonctions utilitaires intégrées sont autorisées (accessibles via _ ou R)

- Paramètre d’entrée : data (tableau), chaque item contient un champ __row_index indiquant le numéro de ligne

- Doit retourner un tableau de combinaisons index de ligne et champ : Array<{ __row_index: number, field: string }>

- __row_index indique le numéro de ligne de l’élément d’origine, field indique le champ à mettre en évidence

- Interdit : eval, Function, opérations asynchrones, DOM API, requêtes réseau

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
identique à operator

\- in: sélectionne les éléments de données dont la valeur du champ de dimension appartient à la valeur spécifiée


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
identique à operator

\- in: sélectionne les éléments de données dont la valeur du champ de dimension appartient à la valeur spécifiée


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
Résultat d'exécution du filtre animé (champ runtime)



Écrit pendant la phase prepare(), en lecture seule à l'exécution
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

**Exemple**
`lineStyle: 'solid'`




## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title=Description}
Configuration du style du marqueur de point, utilisée pour définir la couleur, la bordure et les paramètres associés du marqueur de point.

Prend en charge la configuration d’un style global ou d’un style conditionnel

Filtre de données




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
Champ de dimension, ID d'un élément de dimension
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
identique à operator

\- in: sélectionne les éléments de données dont la valeur du champ de dimension appartient à la valeur spécifiée


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
identique à operator

\- in: sélectionne les éléments de données dont la valeur du champ de dimension appartient à la valeur spécifiée


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
Filtre dynamique (exécution de code généré par l’IA)

Implémente une logique complexe de filtrage des données via du code JavaScript généré par l’IA.

Convient aux scénarios Top N, analyses statistiques, conditions complexes et autres cas difficiles à exprimer avec un selector statique.

Capacités principales :

- Prend en charge des conditions de filtrage de données arbitrairement complexes

- Utilise les fonctions utilitaires intégrées pour les opérations de données

- S’exécute de manière sûre dans l’environnement du navigateur (sandbox Web Worker)

Exigences d’environnement : seuls les environnements de navigateur sont pris en charge ; les environnements Node.js utiliseront fallback

Remarque : selector et dynamicFilter ne peuvent pas être utilisés simultanément ; dynamicFilter a une priorité plus élevée

Configuration du filtre dynamique du graphique

Filtre les marques du graphique (aires, points, etc.) via du code JavaScript généré par l’IA
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Description des besoins de filtrage de l’utilisateur (langage naturel).
:::

**Exemple**
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=Description}
Code de filtrage JavaScript généré par IA



- Seules les fonctions utilitaires intégrées sont autorisées (accessibles via _ ou R)

- Paramètre d’entrée : data (tableau), chaque item contient un champ __row_index indiquant le numéro de ligne

- Doit retourner un tableau de combinaisons index de ligne et champ : Array<{ __row_index: number, field: string }>

- __row_index indique le numéro de ligne de l’élément d’origine, field indique le champ à mettre en évidence

- Interdit : eval, Function, opérations asynchrones, DOM API, requêtes réseau

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
identique à operator

\- in: sélectionne les éléments de données dont la valeur du champ de dimension appartient à la valeur spécifiée


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
identique à operator

\- in: sélectionne les éléments de données dont la valeur du champ de dimension appartient à la valeur spécifiée


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
Résultat d'exécution du filtre animé (champ runtime)



Écrit pendant la phase prepare(), en lecture seule à l'exécution
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

**Exemple**
solid

dashed

dotted




## areaStyle

**Type:** `AreaStyle | AreaStyle[] | undefined`

:::note{title=Description}
Configuration du style du marqueur de zone, utilisée pour définir la couleur, l’opacité, la bordure et les paramètres associés du marqueur de zone.

Prend en charge la configuration d’un style global ou d’un style conditionnel

Filtre de données




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
Champ de dimension, ID d'un élément de dimension
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
identique à operator

\- in: sélectionne les éléments de données dont la valeur du champ de dimension appartient à la valeur spécifiée


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
identique à operator

\- in: sélectionne les éléments de données dont la valeur du champ de dimension appartient à la valeur spécifiée


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
Filtre dynamique (exécution de code généré par l’IA)

Implémente une logique complexe de filtrage des données via du code JavaScript généré par l’IA.

Convient aux scénarios Top N, analyses statistiques, conditions complexes et autres cas difficiles à exprimer avec un selector statique.

Capacités principales :

- Prend en charge des conditions de filtrage de données arbitrairement complexes

- Utilise les fonctions utilitaires intégrées pour les opérations de données

- S’exécute de manière sûre dans l’environnement du navigateur (sandbox Web Worker)

Exigences d’environnement : seuls les environnements de navigateur sont pris en charge ; les environnements Node.js utiliseront fallback

Remarque : selector et dynamicFilter ne peuvent pas être utilisés simultanément ; dynamicFilter a une priorité plus élevée

Configuration du filtre dynamique du graphique

Filtre les marques du graphique (aires, points, etc.) via du code JavaScript généré par l’IA
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Description des besoins de filtrage de l’utilisateur (langage naturel).
:::

**Exemple**
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=Description}
Code de filtrage JavaScript généré par IA



- Seules les fonctions utilitaires intégrées sont autorisées (accessibles via _ ou R)

- Paramètre d’entrée : data (tableau), chaque item contient un champ __row_index indiquant le numéro de ligne

- Doit retourner un tableau de combinaisons index de ligne et champ : Array<{ __row_index: number, field: string }>

- __row_index indique le numéro de ligne de l’élément d’origine, field indique le champ à mettre en évidence

- Interdit : eval, Function, opérations asynchrones, DOM API, requêtes réseau

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
identique à operator

\- in: sélectionne les éléments de données dont la valeur du champ de dimension appartient à la valeur spécifiée


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
identique à operator

\- in: sélectionne les éléments de données dont la valeur du champ de dimension appartient à la valeur spécifiée


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
Résultat d'exécution du filtre animé (champ runtime)



Écrit pendant la phase prepare(), en lecture seule à l'exécution
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
Indique si le marqueur de zone est visible



Indique si le marqueur de zone est visible

:::

### areaColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de l’element d’aire

Couleur de l’element d’aire
:::

### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Opacite de la couleur de l’element d’aire

Opacite de la couleur de l’element d’aire
:::


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Description}
Configuration des points d’annotation; définit position, format et style selon les données sélectionnées.

:::
### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Sélecteur du point d’annotation, utilisé pour choisir des points de données.

:::
#### field

**Type:** `string`

:::note{title=Description}
Champ de dimension; ID d’un élément dans dimensions

:::
#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Opérateur

- in: sélectionne les éléments dont la valeur du champ de dimension est dans value

- not in: sélectionne les éléments dont la valeur du champ de dimension n’est pas dans value

:::
#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Opérateur

- in: sélectionne les éléments dont la valeur du champ de dimension est dans value

- not in: sélectionne les éléments dont la valeur du champ de dimension n’est pas dans value

Identique à operator

:::
#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Sélectionne la valeur du champ de dimension dans l’élément de données; les tableaux sont pris en charge

:::
### measureId

**Type:** `string | undefined`

:::note{title=Description}
Spécifie l’id de mesure auquel appartient le point d’annotation. En contexte multi-measure, il peut être combiné à selector pour localiser précisément le point cible.

:::
### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Filtre dynamique (exécution de code généré par l’IA)

Implémente une logique de filtrage complexe avec du code JavaScript généré par l’IA.

Adapté aux Top N, analyses statistiques, conditions complexes et autres cas difficiles à exprimer avec des sélecteurs statiques.

Fonctionnalités clés:

- Prend en charge des conditions de filtrage arbitrairement complexes

- Utilise des fonctions utilitaires intégrées pour les opérations de données

- Exécution sécurisée dans le navigateur (sandbox Web Worker)

Environnement: seuls les navigateurs sont pris en charge; Node.js utilise fallback.

Remarque: selector et dynamicFilter ne peuvent pas être utilisés en même temps; dynamicFilter est prioritaire.

Configuration du filtre dynamique du graphique

Filtre les marques du graphique (barres, points, etc.) avec du code JavaScript généré par l’IA

:::
#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Description du besoin de filtrage utilisateur (langage naturel)

:::

**Exemple**
"Mettre en évidence les barres avec sales > 1000"

"Mettre en évidence la barre au taux de profit le plus élevé dans chaque région"
#### code

**Type:** `string`

:::note{title=Description}
Code de filtrage JavaScript généré par l’IA

- Seules les fonctions utilitaires intégrées peuvent être utilisées (via _ ou R)

- Paramètre d’entrée: data (tableau), chaque item contient le champ __row_index comme numéro de ligne

- Doit retourner un tableau de combinaisons index de ligne et champ: Array<{ __row_index: number, field: string }>

- __row_index est le numéro de ligne de l’élément d’origine, field est le champ à mettre en évidence

- Interdit: eval, Function, opérations asynchrones, API DOM, requêtes réseau

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

Mettre en évidence l’élément au taux de profit le plus élevé dans chaque région
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
Solution fallback si l’exécution du code échoue ou si l’environnement n’est pas pris en charge

:::
##### field

**Type:** `string`

:::note{title=Description}
Champ de dimension; ID d’un élément dans dimensions

:::
##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Opérateur

- in: sélectionne les éléments dont la valeur du champ de dimension est dans value

- not in: sélectionne les éléments dont la valeur du champ de dimension n’est pas dans value

:::
##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Opérateur

- in: sélectionne les éléments dont la valeur du champ de dimension est dans value

- not in: sélectionne les éléments dont la valeur du champ de dimension n’est pas dans value

Identique à operator

:::
##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Sélectionne la valeur du champ de dimension dans l’élément de données; les tableaux sont pris en charge

:::
#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Résultat d’exécution du filtre dynamique (champ runtime)

Écrit pendant la phase prepare(); en lecture seule à l’exécution

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
Contenu du texte

:::

**Exemple**
'Annotation text'
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
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Description}
Alignement du texte, généralement inutile

Il est recommandé d’utiliser right pour placer le texte à gauche de la ligne d’annotation

right: le texte est à gauche de la ligne de référence, son bord droit aligné sur la ligne d’annotation verticale

left: le texte est à droite de la ligne de référence, son bord gauche aligné sur la ligne d’annotation verticale

center: le texte est au centre de la ligne de référence

:::

**Exemple**
'right'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Alignement vertical du texte. Utilisez généralement top pour afficher le texte sous le point d’annotation dans la zone visible

top est recommandé pour afficher le texte complet

top: le texte est sous le point d’annotation

middle: le texte est aligné sur le centre du point d’annotation

bottom: le texte est au-dessus du point d’annotation

:::

**Exemple**
'top'
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Visibilité de l’arrière-plan

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
Couleur de bordure de l’arrière-plan

:::

**Exemple**
'red'
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Largeur de bordure de l’arrière-plan

:::

**Exemple**
2
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
Rayon de bordure de l’arrière-plan

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
Décalage Y en pixels de tout le point d’annotation. Valeur positive recommandée au-dessus du graphique, négative en dessous.

Une valeur négative déplace tout le composant vers le haut, par exemple -10 de 10 px

Une valeur positive le déplace vers le bas, par exemple 10 de 10 px

:::

**Exemple**
offsetY: 5
### offsetX

**Type:** `number | undefined`

:::note{title=Description}
Décalage X en pixels de tout le point d’annotation. Valeur positive à gauche du graphique, négative à droite.

Une valeur négative déplace tout le composant vers la gauche, par exemple -10 de 10 px

Une valeur positive le déplace vers la droite, par exemple 10 de 10 px

:::

**Exemple**
offsetX: 5
## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Description}
Configuration des lignes d’annotation verticales.

:::
### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Description}
Valeur X fixe pour la ligne verticale; utilisez une valeur de dimension pour un axe catégoriel, une valeur numérique concrète pour un axe numérique

:::
### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Description}
Filtre dynamique (exécution de code généré par l’IA)

Code de filtrage JavaScript généré par l’IA

- Seules les fonctions utilitaires intégrées peuvent être utilisées (via _ ou R)

- Paramètre d’entrée: data (tableau)

- Doit retourner une seule valeur number ou string: number | string

- Cas d’usage: valeurs dynamiques nécessaires aux lignes d’annotation (horizontales/verticales)

- Interdit: eval, Function, opérations asynchrones, API DOM, requêtes réseau

:::
#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Description du besoin de valeur dynamique (langage naturel)

:::

**Exemple**
"Obtenir la valeur maximale de sales comme référence de ligne d’annotation"

"Calculer la moyenne de sales pour la ligne d’annotation"
#### code

**Type:** `string`

:::note{title=Description}
Filtre dynamique (exécution de code généré par l’IA)

Code de filtrage JavaScript généré par l’IA

- Seules les fonctions utilitaires intégrées peuvent être utilisées (via _ ou R)

- Paramètre d’entrée: data (tableau)

- Doit retourner une seule valeur number ou string: number | string

- Cas d’usage: valeurs dynamiques nécessaires aux lignes d’annotation (horizontales/verticales)

- Interdit: eval, Function, opérations asynchrones, API DOM, requêtes réseau

:::

**Exemple**
Obtenir la valeur maximale de sales comme valeur de ligne d’annotation
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculer la moyenne pour la ligne d’annotation
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
Valeur fallback si l’exécution du code échoue ou si l’environnement n’est pas pris en charge

:::
#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Description}
Résultat d’exécution du filtre dynamique (champ runtime)

Écrit pendant la phase prepare(); en lecture seule à l’exécution

:::
##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Description}
Contenu du texte

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
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Description}
Alignement du texte, généralement inutile

Il est recommandé d’utiliser right pour placer le texte à gauche de la ligne d’annotation

right: le texte est à gauche de la ligne de référence, son bord droit aligné sur la ligne d’annotation verticale

left: le texte est à droite de la ligne de référence, son bord gauche aligné sur la ligne d’annotation verticale

center: le texte est au centre de la ligne de référence

:::

**Exemple**
'right'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Alignement vertical du texte, généralement inutile

top est recommandé pour garder le texte complet dans la zone visible du graphique

top: le texte est sous la ligne de référence et aligné sur l’extrémité de la ligne d’annotation verticale

middle: le texte est au centre de la ligne de référence

bottom: le texte est au-dessus de la ligne de référence

:::

**Exemple**
'top'
### lineVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Visibilité de la ligne

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
Style de ligne

:::

**Exemple**
'solid'
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Visibilité de l’arrière-plan

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
Couleur de bordure de l’arrière-plan

:::

**Exemple**
'red'
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Largeur de bordure de l’arrière-plan

:::

**Exemple**
2
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
Rayon de bordure de l’arrière-plan

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
Configuration des lignes d’annotation horizontales.

:::
### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Description}
Valeur Y fixe pour la ligne horizontale; utilisez une valeur de dimension pour un axe catégoriel, une valeur numérique concrète pour un axe numérique

:::
### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Description}
Filtre dynamique (exécution de code généré par l’IA)

Code de filtrage JavaScript généré par l’IA

- Seules les fonctions utilitaires intégrées peuvent être utilisées (via _ ou R)

- Paramètre d’entrée: data (tableau)

- Doit retourner une seule valeur number ou string: number | string

- Cas d’usage: valeurs dynamiques nécessaires aux lignes d’annotation (horizontales/verticales)

- Interdit: eval, Function, opérations asynchrones, API DOM, requêtes réseau

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

"Calculer les ventes moyennes pour la ligne d’annotation"



#### code

**Type:** `string`

:::note{title=Description}
Filtre dynamique (exécution de code généré par l’IA)

Code de filtrage JavaScript généré par l’IA

- Seules les fonctions utilitaires intégrées peuvent être utilisées (via _ ou R)

- Paramètre d’entrée: data (tableau)

- Doit retourner une seule valeur number ou string: number | string

- Cas d’usage: valeurs dynamiques nécessaires aux lignes d’annotation (horizontales/verticales)

- Interdit: eval, Function, opérations asynchrones, API DOM, requêtes réseau

:::

**Exemple**
Obtenir la valeur maximale de sales comme valeur de ligne d’annotation
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculer la moyenne pour la ligne d’annotation
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
Valeur fallback si l’exécution du code échoue ou si l’environnement n’est pas pris en charge

:::
#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Description}
Résultat d’exécution du filtre dynamique (champ runtime)

Écrit pendant la phase prepare(); en lecture seule à l’exécution

:::
##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Description}
Contenu du texte

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
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Description}
Alignement du texte, généralement inutile

Il est recommandé d’utiliser right pour placer le texte à gauche de la ligne d’annotation

right: le texte est à gauche de la ligne de référence, son bord droit aligné sur la ligne d’annotation verticale

left: le texte est à droite de la ligne de référence, son bord gauche aligné sur la ligne d’annotation verticale

center: le texte est au centre de la ligne de référence

:::

**Exemple**
'right'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Alignement vertical du texte, généralement inutile

top est recommandé pour garder le texte complet dans la zone visible du graphique

top: le texte est sous la ligne de référence et aligné sur la ligne d’annotation horizontale

middle: le texte est au centre de la ligne de référence

bottom: le texte est au-dessus de la ligne de référence

:::

**Exemple**
'top'
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Visibilité de l’arrière-plan

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
Couleur de bordure de l’arrière-plan

:::

**Exemple**
'red'
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Largeur de bordure de l’arrière-plan

:::

**Exemple**
2
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
Rayon de bordure de l’arrière-plan

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
Visibilité de la ligne

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
Style de ligne

:::

**Exemple**
'solid'
### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=Description}
Configuration de ligne de séparation; les parties au-dessus et au-dessous de la valeur d’annotation peuvent utiliser des couleurs différentes.

:::
#### positiveColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur principale de la partie supérieure à la valeur d’annotation

:::
#### negativeColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur principale de la partie inférieure à la valeur d’annotation

:::
## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Description}
Configuration des zones d’annotation; définit position et style selon les données sélectionnées.

:::
### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Description}
Sélecteur de la zone d’annotation.

:::
#### field

**Type:** `string`

:::note{title=Description}
Champ de dimension; ID d’un élément dans dimensions

:::
#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Opérateur

- in: sélectionne les éléments dont la valeur du champ de dimension est dans value

- not in: sélectionne les éléments dont la valeur du champ de dimension n’est pas dans value

:::
#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Opérateur

- in: sélectionne les éléments dont la valeur du champ de dimension est dans value

- not in: sélectionne les éléments dont la valeur du champ de dimension n’est pas dans value

Identique à operator

:::
#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Sélectionne la valeur du champ de dimension dans l’élément de données; les tableaux sont pris en charge

:::
### text

**Type:** `string | string[] | undefined`

:::note{title=Description}
Contenu du texte

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
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Description}
Alignement du texte, généralement inutile

center: le texte est centré dans la zone d’annotation

left: le texte est à gauche dans la zone d’annotation

right: le texte est à droite dans la zone d’annotation

:::

**Exemple**
'center'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Alignement vertical du texte, généralement inutile

top: le texte est en haut de la zone d’annotation

middle: le texte est au centre de la zone d’annotation

bottom: le texte est en bas de la zone d’annotation

:::

**Exemple**
'middle'
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Visibilité de l’arrière-plan

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
Couleur de bordure de l’arrière-plan

:::

**Exemple**
'red'
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Largeur de bordure de l’arrière-plan

:::

**Exemple**
2
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
Rayon de bordure de l’arrière-plan

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
Couleur de la zone d’annotation

:::

**Exemple**
'rgba(255,0,0,0.1)'
### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Opacité de la zone d’annotation

:::

**Exemple**
0.2
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
Pointillés de la bordure de zone

:::

**Exemple**
[4, 4]
### outerPadding

**Type:** `number | undefined`

:::note{title=Description}
Marge externe

:::

**Exemple**
8
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
