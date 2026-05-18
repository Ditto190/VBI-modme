# Funnel

:::info{title=Recommandé}
- Configuration de champs recommandée : `1` mesure, `1` dimension

\- Prend en charge la restructuration des données : au moins `1` mesure, `0` dimension

:::

:::info{title=Mappage d’encodage}
Le graphique en entonnoir prend en charge les canaux visuels suivants :

`size`   : canal de taille, prend en charge `plusieurs mesures` et mappe les valeurs de mesure sur la largeur de l’entonnoir

`detail` : canal de détail, prend en charge `plusieurs dimensions` et s’utilise pour afficher des données plus granulaires dans la même série de couleurs

`color`  : canal de couleur, prend en charge `plusieurs dimensions` ou `une mesure`. Les couleurs de dimension distinguent les séries de données, tandis que les couleurs de mesure mappent linéairement les valeurs de mesure sur les couleurs graphiques

`tooltip`: canal d’infobulle, prend en charge `plusieurs dimensions` et `plusieurs mesures`, affiché au survol d’un point de données

`label`  : canal de libellé, prend en charge `plusieurs dimensions` et `plusieurs mesures`, affiche les libellés de données sur les points de données

:::

:::note{title=Description}
Graphique en entonnoir, utilisé pour afficher la relation de proportion des données d’une seule dimension.

Scénarios applicables :

Scénarios d’utilisation du graphique en entonnoir :

\- Adapté à l’analyse de processus comportant plusieurs étapes continues et normalisées, avec une visualisation claire des pertes de données ou des conversions à chaque étape

:::

:::warning{title=Warning}
Exigences de données :

\- Au moins 1 champ numérique (mesure)

\- Toutes les dimensions sont fusionnées avec les noms de mesures (s’il existe plusieurs mesures) en une seule dimension et affichées comme éléments de légende

\- Toutes les mesures sont automatiquement fusionnées en une seule mesure

Fonctionnalités activées par défaut :

\- La légende, les libellés de données, les infobulles et le calcul de pourcentage sont activés par défaut

:::


## chartType

**Type:** `"funnel"`

:::note{title=Description}
Graphique en entonnoir



Graphique en entonnoir affichant la relation de proportion des données d’une seule dimension.

:::

**Exemple**
'funnel'




## dataset

**Type:** `Record[]`

:::note{title=Description}
Jeu de données. Jeu de données déjà agrégé et conforme à la spécification TidyData, utilisé pour définir la source et la structure des données du graphique. Les données saisies par l’utilisateur ne nécessitent aucun prétraitement ; VSeed dispose de puissantes capacités de restructuration des données et effectue cette restructuration automatiquement. Les données du graphique en entonnoir sont finalement converties en 1 dimension et 1 mesure.

:::

**Exemple**
[{category:'A', value:30}, {category:'B', value:70}]




## dimensions

**Type:** `PieDimension[] | undefined`

:::note{title=Description}
Champs de dimension



Pour les graphiques en entonnoir, toutes les dimensions sont fusionnées avec les noms de mesures (s’il existe plusieurs mesures) en une seule dimension et affichées comme éléments de légende.
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

**Type:** `FunnelMeasure[] | undefined`

:::note{title=Description}
Mesures



Pour les graphiques en entonnoir, toutes les mesures sont automatiquement fusionnées en une seule mesure. S’il existe plusieurs mesures, leurs noms sont fusionnés avec les autres dimensions et affichés comme éléments de légende.

:::

**Exemple**
[{id: 'value', alias: 'Proportion de valeur', format: 'percent'}]




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
Type de format numérique. Prend en charge nombre (décimal), pourcentage (%), pour mille (‰) et notation scientifique
:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Ratio de formatage numérique. Ne peut pas être 0
:::

**Exemple**
\- 100000 est converti en 10万, ratio:10000, symbol:"万"
\- 100000 est converti en 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Symbole de formatage numérique, par exemple % ou ‰
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
Suffixe de formatage numérique
:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
Préfixe de formatage numérique
:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
Décimales du formatage numérique, avec minimumFractionDigits et maximumFractionDigits de Intl.NumberFormat du navigateur. Priorité inférieure à significantDigits
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
Chiffres significatifs du formatage numérique, avec minimumSignificantDigits et maximumSignificantDigits de Intl.NumberFormat du navigateur. Priorité supérieure à fractionDigits
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
Priorité d’arrondi du formatage numérique lorsque significantDigits et fractionDigits sont tous deux définis, avec Intl.NumberFormat du navigateur selon les mêmes règles que roundingPriority
:::

**Exemple**
\- 1234.5678 est converti en 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 est converti en 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Mode d’arrondi du formatage numérique, avec Intl.NumberFormat du navigateur selon les mêmes règles que roundingMode
:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}
Type de format numérique. Prend en charge nombre (décimal), pourcentage (%), pour mille (‰) et notation scientifique
:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Ratio de formatage numérique. Ne peut pas être 0
:::

**Exemple**
\- 100000 est converti en 10万, ratio:10000, symbol:"万"
\- 100000 est converti en 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Symbole de formatage numérique, par exemple % ou ‰
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
Suffixe de formatage numérique
:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
Préfixe de formatage numérique
:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
Décimales du formatage numérique, avec minimumFractionDigits et maximumFractionDigits de Intl.NumberFormat du navigateur. Priorité inférieure à significantDigits
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
Chiffres significatifs du formatage numérique, avec minimumSignificantDigits et maximumSignificantDigits de Intl.NumberFormat du navigateur. Priorité supérieure à fractionDigits
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
Priorité d’arrondi du formatage numérique lorsque significantDigits et fractionDigits sont tous deux définis, avec Intl.NumberFormat du navigateur selon les mêmes règles que roundingPriority
:::

**Exemple**
\- 1234.5678 est converti en 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 est converti en 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Mode d’arrondi du formatage numérique, avec Intl.NumberFormat du navigateur selon les mêmes règles que roundingMode
:::

### encoding

**Type:** `"color" | "tooltip" | "label" | "size" | undefined`

:::note{title=Description}
Canal auquel la mesure est mappée

\- label : mesure mappée au canal d'étiquette

\- color : mesure mappée au canal de couleur

\- label : mesure mappée au canal label

\- tooltip : mesure mappée au canal tooltip

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
Configuration de pagination

:::


### field

**Type:** `string`

:::note{title=Description}
Champ de pagination ; indique le nom du champ utilisé pour la pagination et doit être une dimension
:::

### currentValue

**Type:** `string`

:::note{title=Description}
Valeur de pagination actuelle ; indique la valeur utilisée pour déterminer la page courante
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
Configuration de couleur en dégradé linéaire, utilisée pour définir le schéma de couleurs du graphique

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Description}
Palette de couleurs discrètes utilisée pour définir les couleurs des différents éléments du graphique
:::

**Exemple**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Description}
Palette de couleurs en dégradé linéaire utilisée pour définir les couleurs des différents éléments du graphique
:::

**Exemple**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Description}
Mappage de couleurs, utilisé pour associer les valeurs de données à des couleurs précises
:::

**Exemple**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Description}
Configuration des couleurs positif/négatif ; définit la couleur des valeurs positives dans le graphique
:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Description}
Configuration des couleurs positif/négatif ; définit la couleur des valeurs négatives dans le graphique
:::


## label

**Type:** `Label | undefined`

:::note{title=Description}
Configuration des labels pour définir les labels de données du graphique, notamment leur position, leur format et leur style.

:::


### enable

**Type:** `false | true`

:::note{title=Description}
Indique si les étiquettes sont activées
:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les étiquettes passent à la ligne
:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les étiquettes affichent les valeurs de mesure

Dans les scénarios à plusieurs mesures, il n’y a pas de risque de valeurs contradictoires, car toutes les mesures liées au rendu sont traitées par `foldMeasures` et fusionnées en une seule mesure représentant un point de données.

Remarque : encoding.label a une priorité plus élevée ; cette configuration n’affecte pas encoding.label
:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les étiquettes affichent le pourcentage des valeurs de mesure

Dans les scénarios à plusieurs mesures, il n’y a pas de risque de valeurs contradictoires, car toutes les mesures liées au rendu sont traitées par `foldMeasures` et fusionnées en une seule mesure représentant un point de données.

Remarque : encoding.label a une priorité plus élevée ; cette configuration n’affecte pas encoding.label
:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les étiquettes affichent les libellés de dimension

Affiche tous les libellés de dimension

Remarque : encoding.label a une priorité plus élevée ; cette configuration n’affecte pas encoding.label
:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les valeurs d’étiquette sont formatées automatiquement. Lorsque autoFormat vaut true, la configuration numFormat est ignorée
:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Configuration du format des valeurs d’étiquette. Elle est fusionnée avec `format` dans `measure` ; `format` dans `measure` a une priorité plus élevée. numFormat a une priorité inférieure à autoFormat
:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}
Type de format numérique. Prend en charge nombre (décimal), pourcentage (%), pour mille (‰) et notation scientifique
:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Ratio de formatage numérique. Ne peut pas être 0
:::

**Exemple**
\- 100000 est converti en 10万, ratio:10000, symbol:"万"
\- 100000 est converti en 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Symbole de formatage numérique, par exemple % ou ‰
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
Suffixe de formatage numérique
:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
Préfixe de formatage numérique
:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
Décimales du formatage numérique, avec minimumFractionDigits et maximumFractionDigits de Intl.NumberFormat du navigateur. Priorité inférieure à significantDigits
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
Chiffres significatifs du formatage numérique, avec minimumSignificantDigits et maximumSignificantDigits de Intl.NumberFormat du navigateur. Priorité supérieure à fractionDigits
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
Priorité d’arrondi du formatage numérique lorsque significantDigits et fractionDigits sont tous deux définis, avec Intl.NumberFormat du navigateur selon les mêmes règles que roundingPriority
:::

**Exemple**
\- 1234.5678 est converti en 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 est converti en 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Mode d’arrondi du formatage numérique, avec Intl.NumberFormat du navigateur selon les mêmes règles que roundingMode
:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Taille de police de l’étiquette
:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}
Graisse de police de l’étiquette
:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur d’arrière-plan de l’étiquette
:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Description}
Couleur du contour de l’étiquette
:::

### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de police de l’étiquette
:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la couleur de police de l’étiquette est automatiquement inversée selon la couleur du marqueur
:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Description}
Position de l’étiquette
:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si l’évitement du chevauchement des étiquettes est activé
:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Filtre d’étiquette. Par défaut, la relation entre selectors est OR
:::


#### field

**Type:** `string`

:::note{title=Description}
Champ de dimension, id d’un élément de dimensions
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Opérateur

\- in : sélectionne les éléments de données dont la valeur du champ de dimension est dans value

\- not in : sélectionne les éléments de données dont la valeur du champ de dimension n’est pas dans value
:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Opérateur

\- in : sélectionne les éléments de données dont la valeur du champ de dimension est dans value

\- not in : sélectionne les éléments de données dont la valeur du champ de dimension n’est pas dans value

identique à operator
:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Sélectionne les valeurs du champ de dimension dans les éléments de données. Les tableaux sont pris en charge
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Filtre dynamique (exécution de code généré par IA)

Implémente une logique complexe de filtrage des données via du code JavaScript généré par IA

Capacités clés :

\- Prend en charge des conditions de filtrage de données arbitrairement complexes

\- Utilise des fonctions utilitaires intégrées pour les opérations sur les données

\- S’exécute en toute sécurité dans l’environnement navigateur (sandbox Web Worker)

Exigence d’environnement : uniquement pris en charge dans le navigateur ; les environnements Node.js utilisent fallback

Remarque : selector et dynamicFilter ne peuvent pas être utilisés simultanément. dynamicFilter a une priorité plus élevée

Configuration du filtre dynamique du graphique

Utilise du code JavaScript généré par IA pour filtrer les marques du graphique (barres, points, etc.)
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Description du besoin de filtrage utilisateur (langage naturel)
:::

**Exemple**
\- Prend en charge des conditions de filtrage de données arbitrairement complexes

\- Utilise des fonctions utilitaires intégrées pour les opérations de données



#### code

**Type:** `string`

:::note{title=Description}
Code de filtrage JavaScript généré par IA

\- Seules les fonctions utilitaires intégrées peuvent être utilisées (via _ ou R)

\- Paramètre d’entrée : data (tableau), chaque item contient le champ __row_index indiquant le numéro de ligne

\- Doit retourner un tableau de combinaisons index de ligne et champ : Array<{ __row_index: number, field: string }>

\- __row_index indique le numéro de ligne de l’élément de données original, field indique le champ à mettre en évidence

\- Interdit : eval, Function, opérations asynchrones, API DOM, requêtes réseau
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

\- in : sélectionne les éléments de données dont la valeur du champ de dimension est dans value

\- not in : sélectionne les éléments de données dont la valeur du champ de dimension n’est pas dans value
:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Opérateur

\- in : sélectionne les éléments de données dont la valeur du champ de dimension est dans value

\- not in : sélectionne les éléments de données dont la valeur du champ de dimension n’est pas dans value

identique à operator
:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Sélectionne les valeurs du champ de dimension dans les éléments de données. Les tableaux sont pris en charge
:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Résultat d’exécution du filtre dynamique (champ runtime)

Écrit pendant prepare(); en lecture seule à l’exécution
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
Configuration de la légende de couleurs, utilisée pour définir la légende du graphique, notamment sa position, son format et son style.

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
Indique si la légende est activée
:::

**Exemple**
enable: true



### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de police de la légende
:::

### labelFontColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de police de la légende
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




Indique si la sélection brush est activée

:::


### enable

**Type:** `false | true`

:::note{title=Description}
Indique si les infobulles sont activées
:::


## brush

**Type:** `Brush | undefined`

:::note{title=Description}








Mode de selection par brush : simple ou multiple

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la sélection par brush est activée
:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Description}
Type de brush

Définit la forme de la zone de sélection et la direction de sélection.

\- `rect` : sélection rectangulaire, possible simultanément dans les directions X et Y

\- `polygon` : sélection polygonale, dessine un polygone libre en cliquant plusieurs points

\- `x` : sélection dans la direction de l’axe X uniquement, sans contrainte sur Y

\- `y` : sélection dans la direction de l’axe Y uniquement, sans contrainte sur X
:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Description}
Opacité of selected data points, range 0-1







:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la zone de brush est effacée à la fin de la sélection
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

Opacité des points de données sélectionnés, valeur comprise entre 0 et 1
:::

#### stroke

**Type:** `string | undefined`

:::note{title=Description}
Couleur du trait
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Largeur du trait
:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Axe X, axe categoriel, configuration de l axe X ; definit l axe X du graphique, notamment sa position, son format, son style, etc.





:::


#### opacity

**Type:** `number | undefined`

:::note{title=Description}
\- 100000 devient 10万, ratio:10000, symbol:"万"





:::

#### stroke

**Type:** `string | undefined`

:::note{title=Description}
Couleur du trait
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Largeur du trait
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

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Description}
Langue



Configuration de la langue du graphique, prenant en charge 'zh\-CN' et 'en\-US'. Il est aussi possible d’appeler intl.setLocale('zh\-CN') pour définir la langue

:::
