# RacePie

:::note{title=Description}
Graphique en secteurs dynamique (Race Pie Chart)

Convient pour afficher les proportions de données au fil du temps ; la surface des secteurs représente la part de chaque catégorie

Scénarios applicables :

\- Afficher l’évolution de la distribution des proportions de données catégorielles dans le temps

\- Mettre en avant l’évolution de la relation entre le tout et les parties sur la dimension temporelle

\- Observer les fluctuations de part des différentes catégories dans le total

:::

:::note{title=Note}
Graphique en secteurs dynamique :

\- Les angles représentent les valeurs de mesure, les couleurs représentent les valeurs de dimension

\- Permet de contrôler la dimension temporelle via le lecteur pour afficher dynamiquement les variations de proportion

\- La surface des secteurs s’ajuste dynamiquement selon les données

:::


## chartType

**Type:** `"racePie"`

:::note{title=Description}
Graphique en secteurs dynamique, adapté à l’affichage des proportions de données au fil du temps

:::


## dataset

**Type:** `Record[]`

:::note{title=Description}
Source de données

:::

## dimensions

**Type:** `RacePieDimension[] | undefined`

:::note{title=Description}
Dimensions

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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "player" | undefined`

:::note{title=Description}
Canal auquel la dimension est mappée

\- color : prend en charge le mapping de plusieurs dimensions vers le canal de couleur

\- detail : prend en charge le mapping de plusieurs dimensions vers le canal de détail

\- tooltip : permet de mapper plusieurs dimensions au canal d'infobulle

\- label : permet de mapper plusieurs dimensions au canal d'étiquette

\- row : prend en charge le mapping de plusieurs dimensions vers le canal de ligne

\- column : prend en charge le mapping de plusieurs dimensions vers le canal de colonne

\- player : prend en charge le mappage de plusieurs dimensions au canal du lecteur

:::


## measures

**Type:** `PieMeasure[] | undefined`

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
Type de format numérique, prend en charge : nombre (décimal), pourcentage (%), pour mille (‰), notation scientifique

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
Configuration de pagination, utilisée pour spécifier le nom du champ de pagination, qui doit être une dimension.
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




## player

**Type:** `Player | undefined`

:::note{title=Description}
Configuration du lecteur pour definir la dimension temporelle; configuration centrale du graphique en secteurs anime



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
Couleur d'arrière-plan du graphique



La couleur d'arrière-plan peut être une chaîne de couleur (par ex. 'red', 'blue') ou une valeur hex, rgb ou rgba (par ex. '#ff0000', 'rgba(255,0,0,0.5)')
:::


## color

**Type:** `Color | undefined`

:::note{title=Description}
Couleur





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

**Type:** `PieLabel | undefined`

:::note{title=Description}
Configuration des étiquettes pour définir les étiquettes de données du graphique, y compris leur position, format et style.





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
\- 100000 est converti en 10K, ratio:1000, symbol:"K"




#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Symbole de formatage numérique, par exemple % ou ‰
:::

**Exemple**
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
\- 1234.5678 est converti en 1234.6 , fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.57 , fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1230.568 , fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.5678 , fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.56780 , fractionDigits:5 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
Chiffres significatifs du formatage numérique, avec minimumSignificantDigits et maximumSignificantDigits de Intl.NumberFormat du navigateur. Priorité supérieure à fractionDigits
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
Priorité d’arrondi du formatage numérique lorsque significantDigits et fractionDigits sont tous deux définis, avec Intl.NumberFormat du navigateur selon les mêmes règles que roundingPriority
:::

**Exemple**
\- 1234.5678 est converti en 1234.5678 , significantDigits:3 (roundingPriority:morePrecision)




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
"Mettre en surbrillance les barres dont les ventes dépassent 1000"

"Mettre en surbrillance la barre avec la marge la plus élevée dans chaque région"



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
Légende

Configuration de la légende du graphique, incluant sa position, son format et son style.
:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la légende est activée
:::

**Exemple**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la bordure de légende est activée
:::

:::warning{title=Warning}
Efficace uniquement pour les légendes discrètes
:::

**Exemple**




### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de police de la légende
:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de l’icône du pager
:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de l’icône du pager désactivée
:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Taille de police de la légende
:::

**Exemple**




### labelFontColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de police de la légende
:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}
Graisse de police de la légende
:::

**Exemple**




### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Description}
Forme de la légende
:::

:::warning{title=Warning}
Efficace uniquement pour les légendes discrètes
:::

**Exemple**




### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Description}
Position de la légende
:::

**Exemple**




### maxSize

**Type:** `number | undefined`

:::note{title=Description}
Nombre maximal de colonnes ou de lignes lorsqu’il y a beaucoup d’éléments de légende

Si position est horizontale (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize contrôle le nombre de colonnes affichées

Si position est verticale (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize contrôle le nombre de lignes affichées
:::

:::warning{title=Warning}
Efficace uniquement pour les légendes discrètes
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
Configuration du thème

Thème

Deux thèmes intégrés sont disponibles, light et dark; de nouveaux thèmes personnalisés peuvent être définis via registerTheme.

:::

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
