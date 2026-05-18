# Heatmap

:::info{title=Recommandation}
\- Configuration de champs recommandée : `1` mesure, `2` dimensions

\- Prend en charge la restructuration des données : au moins `1` mesure, `0` dimension

:::

:::info{title=Mappage d’encodage}
La carte thermique prend en charge les canaux visuels suivants :

`xAxis`      : canal de l’axe X, prend en charge `plusieurs dimensions` et mappe les valeurs de dimension sur l’axe X

`yAxis`      : canal de l’axe Y, prend en charge `plusieurs dimensions` et mappe les valeurs de dimension sur l’axe Y

`detail` : canal de détail, prend en charge `plusieurs dimensions` et s’utilise pour afficher des données plus granulaires dans la même série de couleurs

`color`  : canal de couleur, prend en charge `une mesure` et mappe les valeurs de mesure sur la couleur

`tooltip`: canal d’infobulle, prend en charge `plusieurs dimensions` et `plusieurs mesures`, affiché au survol d’un point de données

`label`  : canal de libellé, prend en charge `plusieurs dimensions` et `plusieurs mesures`, affiche les libellés de données sur les points de données

:::

:::note{title=Description}
Carte thermique, affichant la distribution et l’intensité des données par profondeur de couleur dans une matrice bidimensionnelle.

Scénarios d’utilisation :

\- Affichage de la densité et de l’intensité de données bidimensionnelles à grande échelle

\- Analyse de corrélation entre catégories et valeurs numériques

\- Comparaison croisée entre séries temporelles et catégories

:::

:::warning{title=Warning}
Exigences de données :

\- Au moins 2 champs de dimension pour déterminer les lignes et les colonnes de la carte thermique

\- Au moins 1 champ numérique (mesure), utilisé pour mapper la profondeur de couleur

\- Lorsque plusieurs mesures sont prises en charge, une mesure est généralement sélectionnée pour le mappage de couleur

Fonctionnalités activées par défaut :

\- La légende, les axes, les libellés de données, les infobulles et la mise à l’échelle numérique sont activés par défaut

:::


## chartType

**Type:** `"heatmap"`

:::note{title=Description}
Carte thermique



Carte thermique, affichant la distribution et l’intensité des données par profondeur de couleur dans une matrice bidimensionnelle.

:::

**Exemple**
'heatmap'




## dataset

**Type:** `Record[]`

:::note{title=Description}
Jeu de données



Jeu de données déjà agrégé et conforme à la spécification TidyData, utilisé pour définir la source et la structure des données du graphique. Le jeu de données fourni par l’utilisateur ne nécessite aucun traitement supplémentaire. VSeed dispose de puissantes capacités de restructuration des données et restructure automatiquement les données. Les données de la carte thermique sont finalement converties en 2 dimensions et 1 mesure.

:::

**Exemple**
[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]




## dimensions

**Type:** `HeatmapDimension[] | undefined`

:::note{title=Description}
Champs de dimension



Dans une carte thermique, la première dimension est mappée sur l’axe angulaire ; les autres dimensions sont fusionnées avec les noms de mesures (s’il existe plusieurs mesures) et affichées comme éléments de légende.
:::

**Exemple**
[{id: 'category', alias: 'Catégorie'}]




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

**Type:** `"xAxis" | "tooltip" | "label" | "row" | "column" | "yAxis" | undefined`

:::note{title=Description}
Canal auquel la dimension est mappée

\- xAxis : prend en charge le mappage de plusieurs dimensions sur l’axe X

\- yAxis : prend en charge le mappage de plusieurs dimensions sur l’axe Y

\- tooltip: permet de mapper plusieurs dimensions au canal d'infobulle

\- label: permet de mapper plusieurs dimensions au canal de libellé

\- row: prend en charge le mapping de plusieurs dimensions vers le canal ligne

\- column: prend en charge le mapping de plusieurs dimensions vers le canal colonne

:::


## measures

**Type:** `HeatmapMeasure[] | undefined`

:::note{title=Description}
Mesures



Les mesures de la carte thermique sont automatiquement fusionnées en une seule mesure et mappées sur l’axe radial. S’il existe plusieurs mesures, leurs noms sont fusionnés avec les autres dimensions et affichés comme éléments de légende.

:::

**Exemple**
[{id: 'value', alias: 'Valeur'}]




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
Ratio du format numérique, ne peut pas être 0

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}
Suffixe du format numérique

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
Symbole du format numérique, par ex. %, ‰

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
Decimal places for numeric formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

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
Suffixe du format numérique

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
Decimal places for numeric formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

**Exemple**
\- 1234.5678 est converti en 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 est converti en 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Suffixe du format numérique

:::

### format

**Type:** `NumFormat | undefined`


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
\- 1234.5678 est converti en 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
Suffixe du format numérique

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
\- 1234.5678 est converti en 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 est converti en 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Chiffres significatifs du format numérique, utilise minimumSignificantDigits et maximumSignificantDigits d'Intl.NumberFormat du navigateur; priorité supérieure à fractionDigits

:::

### encoding

**Type:** `"color" | "tooltip" | "label" | undefined`

:::note{title=Description}
Canal auquel la mesure est mappée

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
Configuration de pagination

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
Couleur d'arrière-plan du graphique



La couleur d'arrière-plan peut être une chaîne de couleur (par ex. 'red', 'blue') ou une valeur hex, rgb ou rgba (par ex. '#ff0000', 'rgba(255,0,0,0.5)')

:::


## color

**Type:** `Color | undefined`

:::note{title=Description}
Color



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
Configuration des libellés de la carte thermique, utilisée pour définir les libellés de données. L’inversion de couleur des libellés est automatiquement activée afin de garantir leur lisibilité.

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
Type de format numérique, prend en charge: decimal, percent (%), permille (‰), notation scientifique

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
\- 1234.5678 est converti en 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 est converti en 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Chiffres significatifs du format numérique, utilise minimumSignificantDigits et maximumSignificantDigits d'Intl.NumberFormat du navigateur; priorité supérieure à fractionDigits

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Mode d'arrondi du format numérique, utilise Intl.NumberFormat du navigateur et suit les mêmes règles que roundingMode

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}
Graisse de police du label

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
Sélectionne les valeurs du champ de dimension ; les tableaux sont pris en charge
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
Description de la demande de filtrage de l’utilisateur (langage naturel).

:::

**Exemple**
\- Supports any complex data filtering conditions

\- Uses built-in utility functions for data operations



#### code

**Type:** `string`

:::note{title=Description}
Capacités principales:



\- Prend en charge toute condition complexe de filtrage des données

\- Utilise les fonctions utilitaires intégrées pour les opérations de données

\- S'exécute de façon sûre dans l'environnement navigateur (sandbox Web Worker)

Exigences d’environnement : seuls les environnements navigateur sont pris en charge ; les environnements Node.js utilisent le fallback.

Remarque: selector et dynamicFilter ne peuvent pas être utilisés simultanément; dynamicFilter a une priorité plus élevée

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
Operator

\- in: sélectionne les éléments de données dont la valeur du champ de dimension se trouve dans la liste de valeurs.

\- not in: sélectionne les éléments de données dont la valeur du champ de dimension ne se trouve PAS dans la liste de valeurs.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: sélectionne les éléments de données dont la valeur du champ de dimension se trouve dans la liste de valeurs.

\- not in: sélectionne les éléments de données dont la valeur du champ de dimension ne se trouve PAS dans la liste de valeurs.

identique à operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Sélectionne les valeurs du champ de dimension ; les tableaux sont pris en charge
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

**Type:** `ColorLegend | undefined`

:::note{title=Description}
legend



Configuration de la légende de couleurs de la carte thermique, utilisée pour définir la légende du graphique, notamment sa position, son format et son style.

:::


### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Description}
Position de la légende

:::

**Exemple**
position: 'rightTop'



### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la fonction de légende est activée

:::

**Exemple**
enable: true



### labelColor

**Type:** `string | undefined`

:::note{title=Description}
legend font color

:::

### labelFontColor

**Type:** `string | undefined`

:::note{title=Description}
legend font color

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Taille de police de la légende

:::

**Exemple**
labelFontSize: 10



### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}
Graisse de police de la légende

:::

**Exemple**
labelFontWeight: 400



### railBackgroundColor

**Type:** `string | undefined`

### handlerBorderColor

**Type:** `string | undefined`


## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Description}
Informations Tooltip



Configuration des infobulles de la carte thermique, utilisée pour définir les infobulles du graphique, notamment leur position, leur format et leur style.

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


## theme

**Type:** `Theme | undefined`

:::note{title=Description}
Thème du graphique. Le thème est une configuration fonctionnelle de faible priorité, contenant les configurations générales communes à tous les types de graphiques et les configurations communes propres à un type de graphique.



Thèmes clair et sombre intégrés; les utilisateurs peuvent personnaliser les thèmes via Builder.



Thème



Thèmes clair et sombre intégrés; de nouveaux thèmes peuvent être personnalisés via registerTheme.

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

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Description}
language



Configuration de la langue du graphique. Prend en charge 'zh-CN' et 'en-US'. Vous pouvez également appeler intl.setLocale('zh-CN') pour définir la langue.

:::
