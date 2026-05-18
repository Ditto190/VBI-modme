# Rose

:::info{title=Recommandation}
\- Configuration de champs recommandée : `1` mesure, `1` dimension

\- Prend en charge le restructuration des données : au moins `1` mesure, `0` dimension

:::

:::info{title=Mappage des encodages}
Le graphique en rose empilé prend en charge les canaux visuels suivants:

`angle`  : canal d’angle, prend en charge `plusieurs dimensions` et mappe les valeurs de dimension sur l’axe angulaire

`radius` : canal de rayon, prend en charge `plusieurs mesures` et mappe les valeurs de mesure sur l’axe radial

`detail` : canal de détail, prend en charge `plusieurs dimensions`, utilisé pour afficher des données plus granulaires dans une même série de couleur

`color`  : canal de couleur, prend en charge `plusieurs dimensions` ou `une mesure`; les couleurs de dimension servent à distinguer les séries, et les couleurs de mesure mappent linéairement les valeurs de mesure vers les couleurs graphiques

`tooltip`: canal d’infobulle, prend en charge `plusieurs dimensions` et `plusieurs mesures`, affiché au survol d’un point de données

`label`  : canal de label, prend en charge `plusieurs dimensions` et `plusieurs mesures`, affiche les étiquettes de données sur les points

:::

:::note{title=Description}
Le graphique en rose empilé convient aux scénarios de comparaison de données multidimensionnelles et affiche la taille des données par la longueur d’arc et le rayon des secteurs dans un système de coordonnées polaires

Scénarios adaptés:

\- Comparaison de distribution de données multidimensionnelles

\- Comparaison d’intensité dans des données périodiques

\- Affichage simultané des valeurs numériques et des proportions de données catégorielles

:::

:::warning{title=Warning}
Exigences de données:

\- Au moins 1 champ numérique (mesure)

\- La première dimension est placée sur l’axe angulaire; les autres dimensions sont fusionnées avec les noms de mesures (lorsqu’il y a plusieurs mesures) et affichées comme éléments de légende

\- Toutes les mesures sont automatiquement fusionnées en une seule mesure

Fonctionnalités activées par défaut :

\- La légende, le système de coordonnées polaires, les étiquettes de données, les infobulles et la mise à l’échelle des valeurs sont activés par défaut

:::


## chartType

**Type:** `"rose"`

:::note{title=Description}
Graphique en rose empilé



Graphique en rose empilé, affichant les relations de comparaison de données multidimensionnelles dans un système de coordonnées polaires

:::

**Exemple**
'rose'




## dataset

**Type:** `Record[]`

:::note{title=Description}
Jeu de données



Jeu de données agrégé conforme à la spécification TidyData, utilisé pour définir la source et la structure des données du graphique. Les jeux de données saisis par l’utilisateur ne nécessitent aucun traitement manuel; VSeed dispose d’une puissante capacité de restructuration des données et les restructure automatiquement. Les données du graphique en rose sont finalement converties en 2 dimensions et 1 mesure.

:::

**Exemple**
[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]




## dimensions

**Type:** `RadarDimension[] | undefined`

:::note{title=Description}
Champs de dimension



La première dimension du graphique en rose est mappée sur l’axe angulaire; les autres dimensions sont fusionnées avec les noms de mesures (lorsqu’il y a plusieurs mesures) et affichées comme éléments de légende.

:::

**Exemple**
[{id: 'category', alias: 'Category'}]




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
Configuration du format temporel de la dimension

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=Description}
Granularité temporelle, détermine la précision d'affichage de la date

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "angle" | undefined`

:::note{title=Description}
Canal auquel la dimension est mappée

\- angle: prend en charge le mapping de plusieurs dimensions vers le canal d’angle

\- color: prend en charge le mapping de plusieurs dimensions vers le canal de couleur

\- detail: prend en charge le mapping de plusieurs dimensions vers le canal detail

\- tooltip: permet de mapper plusieurs dimensions au canal d'infobulle

\- label: permet de mapper plusieurs dimensions au canal de libellé

\- row: prend en charge le mapping de plusieurs dimensions vers le canal ligne

\- column: prend en charge le mapping de plusieurs dimensions vers le canal colonne

:::


## measures

**Type:** `RadarMeasure[] | undefined`

:::note{title=Description}
Mesures



Les mesures du graphique en rose sont automatiquement fusionnées en une seule mesure et mappées sur l’axe radial. Lorsqu’il y a plusieurs mesures, leurs noms sont fusionnés avec les autres dimensions et affichés comme éléments de légende.
:::

**Exemple**
[{id: 'value', alias: 'Value'}]




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

Par exemple :

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Formatage numérique personnalisé des mesures; appliqué automatiquement aux labels et infobulles

Remarque: pour utiliser un formatage personnalisé, vous devez définir explicitement autoFormat=false; sinon autoFormat remplacera cette configuration

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}
Type de format numérique, prend en charge les nombres (décimal), les pourcentages (%), les pour mille (‰) et la notation scientifique

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Ratio de format numérique, ne peut pas être 0

:::

**Exemple**
\- 100000 devient 10万, ratio:10000, symbol:"万"
\- 100000 est converti en 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Symbole de format numérique, par ex. %, ‰

:::

**Exemple**
\- 100000 devient 10万, ratio:10000, symbol:"万"
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
Type de format numérique, prend en charge les nombres (décimal), les pourcentages (%), les pour mille (‰) et la notation scientifique

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Ratio de format numérique, ne peut pas être 0

:::

**Exemple**
\- 100000 devient 10万, ratio:10000, symbol:"万"
\- 100000 est converti en 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Symbole de format numérique, par ex. %, ‰

:::

**Exemple**
\- 100000 devient 10万, ratio:10000, symbol:"万"
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

**Type:** `"color" | "tooltip" | "label" | "radius" | undefined`

:::note{title=Description}
Canal auquel la mesure est mappée

\- radius: mesure mappée sur le canal de rayon

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

**Type:** `PieLabel | undefined`

:::note{title=Description}
Libellé



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
Type de format numérique, prend en charge les nombres (décimal), les pourcentages (%), les pour mille (‰) et la notation scientifique

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Ratio de format numérique, ne peut pas être 0

:::

**Exemple**
\- 100000 devient 10万, ratio:10000, symbol:"万"
\- 100000 est converti en 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Symbole de format numérique, par ex. %, ‰

:::

**Exemple**
\- 100000 devient 10万, ratio:10000, symbol:"万"
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
Champ de dimension, id d’un élément de dimensions
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Champ de dimension, ID d'un élément de dimension

Opérateur


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
\- in: sélectionne les éléments dont la valeur du champ de dimension est dans value

\- not in: sélectionne les éléments dont la valeur du champ de dimension n'est pas dans value


Opérateur

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Sélectionne les valeurs du champ de dimension dans les éléments de données. Les tableaux sont pris en charge
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Filtre dynamique (exécution de code généré par l’IA)

Implémente une logique complexe de filtrage des données via du code JavaScript généré par l’IA

Capacités principales:

- Prend en charge des conditions de filtrage de données arbitrairement complexes

- Utilise les fonctions utilitaires intégrées pour les opérations sur les données

- Exécution sécurisée dans le navigateur (sandbox Web Worker)

Exigence d’environnement: seul le navigateur est pris en charge; l’environnement Node.js utilisera fallback

Remarque: selector et dynamicFilter ne peuvent pas être utilisés simultanément; dynamicFilter a une priorité plus élevée

Configuration du filtre dynamique du graphique

Implémente le filtrage des marques du graphique (barres, points, etc.) via du code JavaScript généré par l’IA

:::

#### type

**Type:** `"row-with-field"`
#### description

**Type:** `string | undefined`

:::note{title=Description}
Description du besoin de filtrage utilisateur (langage naturel)

:::

**Exemple**
"Mettre en évidence les barres dont les ventes dépassent 1000"

"Mettre en évidence la barre avec le taux de profit le plus élevé dans chaque région"


#### code

**Type:** `string`

:::note{title=Description}
Code JavaScript de filtrage généré par l’IA

- Seules les fonctions utilitaires intégrées peuvent être utilisées (via _ ou R)

- Paramètre d’entrée: data (tableau), chaque item contient le champ __row_index qui indique le numéro de ligne

- Doit retourner un tableau de combinaisons index de ligne et champ: Array<{ __row_index: number, field: string }>

- __row_index indique la ligne de l’élément de données d’origine, field indique le champ à mettre en évidence

- Interdit: eval, Function, opérations asynchrones, DOM API, requêtes réseau

:::

**Exemple**
Mettre en évidence le champ sales des éléments dont sales dépasse 1000
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

Mettre en évidence les éléments qui satisfont plusieurs conditions
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
Fallback lorsque l’exécution du code échoue ou que l’environnement n’est pas pris en charge

:::

##### field

**Type:** `string`

:::note{title=Description}
Champ de dimension, id d’un élément de dimensions

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

identique à operator

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

Écrit pendant prepare(); lecture seule à l’exécution

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
\- Interdit: eval, Function, opérations asynchrones, API DOM, requêtes réseau







:::


## legend

**Type:** `Legend | undefined`

:::note{title=Description}
Légende

Configuration de la légende du graphique, incluant sa position, son format et son style.
:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la légende est activée
:::

**Exemple**
Mettre en évidence le champ sales pour les éléments dont sales est supérieur à 1000



### border

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la bordure de légende est activée
:::

:::warning{title=Warning}
Efficace uniquement pour les légendes discrètes
:::

**Exemple**
Mettre en évidence l'élément ayant la marge bénéficiaire la plus élevée dans chaque zone



### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Mettre en évidence les éléments avec un filtrage multi-conditions

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Description}
Solution de repli lorsque l'exécution du code échoue ou que l'environnement n'est pas pris en charge

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Description}
Champ de dimension, ID d'un élément de dimension

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Taille de police de la légende
:::

**Exemple**
Opérateur



### labelFontColor

**Type:** `string | undefined`

:::note{title=Description}
\- in: sélectionne les éléments dont la valeur du champ de dimension est dans value

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}
Graisse de police de la légende
:::

**Exemple**
\- not in: sélectionne les éléments dont la valeur du champ de dimension n'est pas dans value



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Description}
Forme de la légende
:::

:::warning{title=Warning}
Efficace uniquement pour les légendes discrètes
:::

**Exemple**
Opérateur



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Description}
Position de la légende
:::

**Exemple**
\- in: sélectionne les éléments dont la valeur du champ de dimension est dans value



### maxSize

**Type:** `number | undefined`

:::note{title=Description}
\- not in: sélectionne les éléments dont la valeur du champ de dimension n'est pas dans value





:::

:::warning{title=Warning}
Efficace uniquement pour les légendes discrètes
:::

**Exemple**
maxSize: 2




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Description}
Infobulle

Configuration des infobulles du graphique, incluant leur position, leur format et leur style.
:::


### enable

**Type:** `false | true`

:::note{title=Description}
Indique si les infobulles sont activées
:::


## brush

**Type:** `Brush | undefined`

:::note{title=Description}
Sélectionne les éléments par valeur de champ de dimension; prend en charge les tableaux









:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Résultat d'exécution du filtre animé (champ runtime)

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Description}
Écrit pendant la phase prepare(), en lecture seule à l'exécution



\- `y`: sélection sur l’axe Y, limitant la sélection à la direction de l’axe Y tandis que l’axe X reste libre

\- `rect`: sélection rectangulaire, disponible dans les directions des axes X et Y

\- `polygon`: sélection polygonale, dessine un polygone arbitraire en cliquant plusieurs points


\- `y`: sélection au pinceau sur l’axe Y, contrainte uniquement dans la direction de l’axe Y

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Description}
Mode de sélection brush, sélection simple ou multiple



Définit le mode de sélection brush


Indique si la fonction de légende est activée

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la zone de brush est effacée après la fin de la sélection

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Style des données dans la zone de brush

Définit le style des points de données sélectionnés
:::


#### opacity

**Type:** `number | undefined`

:::note{title=Description}
Opacité



Opacité des points de données sélectionnés, plage 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Description}
Stroke color

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Largeur du trait
:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Style des données hors de la zone de brush

Définit le style des points de données non sélectionnés
:::


#### opacity

**Type:** `number | undefined`

:::note{title=Description}
legend font color



Opacité des points de données non sélectionnés, plage 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Description}
Stroke color

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Largeur du trait
:::


## animation

**Type:** `PieLikeAnimation | undefined`

:::note{title=Description}
Taille de police de la légende



Configuration d’animation du graphique; les effets disponibles dépendent du type de graphique

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}
legend font color

:::

### params

**Type:** `PieLikeAnimationParams | undefined`

:::note{title=Description}
Graisse de police de la légende

:::


#### appear

**Type:** `PieLikeAppearAnimation | undefined`

:::note{title=Description}
Configuration de l’animation d’apparition des graphiques pie/donut/rose

:::


##### effects

**Type:** `("radial" | "scale")[] | undefined`

:::note{title=Description}
Effets d’apparition des graphiques pie/donut/rose, avec animations radiale et d’échelle

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si l’étape d’animation actuelle est activée

:::

##### ease

**Type:** `string | undefined`

:::note{title=Description}
Fonction d’easing de l’animation

:::

##### duration

**Type:** `number | undefined`

:::note{title=Description}
Position de la légende

:::

##### color

**Type:** `string | undefined`

:::note{title=Description}
Couleur de surbrillance ou d’ambiance de l’animation

:::

#### update

**Type:** `PieLikeUpdateAnimation | undefined`

:::note{title=Description}
Configuration de l’animation de mise à jour des graphiques pie/donut/rose

:::


##### effects

**Type:** `"radial"[] | undefined`

:::note{title=Description}
Effets de mise à jour des graphiques pie/donut/rose, avec animation radiale

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si l’étape d’animation actuelle est activée

:::

##### ease

**Type:** `string | undefined`

:::note{title=Description}
Fonction d’easing de l’animation

:::

##### duration

**Type:** `number | undefined`

:::note{title=Description}
Durée de l’animation, en millisecondes

:::

##### color

**Type:** `string | undefined`

:::note{title=Description}
Couleur de surbrillance ou d’ambiance de l’animation

:::

#### loop

**Type:** `PieLikeAnimationLoop | undefined`

:::note{title=Description}
Indique si la sélection brush est activée

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la fonction d'infobulle est activée

:::

##### interval

**Type:** `number | undefined`

:::note{title=Description}
Définit la forme et l’orientation de la zone de sélection brush

:::

##### loop

**Type:** `PieLikeLoopAnimation | undefined`

:::note{title=Description}
\- `polygon` : sélection polygonale, permettant de tracer un polygone libre en cliquant sur plusieurs points

:::


###### effects

**Type:** `PieLikeLoopEffect[] | undefined`

:::note{title=Description}
Mode de sélection brush: unique ou multiple

:::

###### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Définit le style des points de données sélectionnés.

:::

###### ease

**Type:** `string | undefined`

:::note{title=Description}
brushtype

:::

###### duration

**Type:** `number | undefined`

:::note{title=Description}
Opacité

:::

###### color

**Type:** `string | undefined`

:::note{title=Description}
Opacité des points de données sélectionnés, de 0 à 1

:::

##### atmosphere

**Type:** `NoEffectAtmosphereConfig | undefined`

:::note{title=Description}
\- `polygon` : sélection brush polygonale ; cliquez sur plusieurs points pour tracer un polygone de sélection

:::


###### ease

**Type:** `string | undefined`

:::note{title=Description}
\- `x`: sélection brush uniquement dans la direction de l'axe X; la direction de l'axe Y n'est pas limitée

:::

###### color

**Type:** `string | undefined`

:::note{title=Description}
\- `y` : sélection brush dans la direction de l’axe Y uniquement ; la direction de l’axe X n’est pas limitée

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Description}
Thème du graphique. Le thème est une configuration fonctionnelle de priorité plus faible, contenant les paramètres communs à tous les types de graphiques et les paramètres propres à un type de graphique.



Deux thèmes intégrés sont fournis : light et dark. Les utilisateurs peuvent personnaliser les thèmes via Builder.



Thème



Deux thèmes intégrés sont fournis, light et dark ; de nouveaux thèmes peuvent être personnalisés via registerTheme.
:::

**Exemple**
Indique si la zone brush est effacée à la fin de la sélection

Opacité des points de données non sélectionnés, de 0 à 1

Définit le style des points de données sélectionnés par brush




### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Description}
Style des éléments de données non sélectionnés



Définit le style des points de données hors de la sélection brush

:::
