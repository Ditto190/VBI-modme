# Radar

:::info{title=Recommandation}
\- Configuration de champs recommandée : `1` mesure, `1` dimension

\- Prend en charge le restructuration des données : au moins `1` mesure, `0` dimension

:::

:::info{title=Mappage d’encodage}
Les graphiques radar prennent en charge les canaux visuels suivants :

`angle`  : Canal d’angle, prend en charge `plusieurs dimensions`, mappées à l’axe d’angle selon la valeur de dimension

`radius` : Canal de rayon, prend en charge `plusieurs mesures`, mappées à l’axe de rayon selon la valeur de mesure

`color`  : Canal de couleur, prend en charge `plusieurs dimensions` ou `une mesure`; les couleurs des dimensions distinguent les séries de données, tandis que les couleurs de mesure mappent linéairement les valeurs de mesure aux couleurs graphiques

`tooltip`: Canal d’infobulle, prend en charge `plusieurs dimensions` et `plusieurs mesures`, affiché au survol des points de données

`label`  : Canal de libellé, prend en charge `plusieurs dimensions` et `plusieurs mesures`, affiché comme libellés de données sur les points

:::

:::note{title=Description}
Graphique radar, adapté à l’analyse comparative de données multidimensionnelles, affichant la distribution des valeurs entre les dimensions dans un système de coordonnées multi-axes

Cas d’utilisation:

\- Comparer la performance globale de données multidimensionnelles

\- Évaluer les performances de plusieurs objets sur plusieurs mesures

\- Afficher les caractéristiques multidimensionnelles des données catégorielles

:::

:::warning{title=Warning}
Exigences relatives aux données :

\- Au moins un champ numérique (mesure)

\- La première dimension devient les axes du radar ; les autres dimensions sont comparées comme des séries différentes

\- Prend en charge l’affichage de plusieurs mesures comme des séries distinctes

Fonctionnalités activées par défaut :

\- La légende, le système de coordonnées radar, les étiquettes de données, l’infobulle et la mise à l’échelle des valeurs sont activés par défaut

:::


## chartType

**Type:** `"radar"`

:::note{title=Description}
Graphique radar



Graphique radar, affichant les comparaisons multidimensionnelles dans un système de coordonnées multi-axes

:::

**Exemple**
'radar'




## dataset

**Type:** `Record[]`

:::note{title=Description}
Jeu de données



Jeu de données agrégé conforme à la spécification TidyData. Il définit la source et la structure des données du graphique. Les données saisies par l’utilisateur ne nécessitent aucun prétraitement, car VSeed les restructure automatiquement. Les données du graphique radar sont finalement converties en deux dimensions et une mesure.

:::

**Exemple**
[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]




## dimensions

**Type:** `RadarDimension[] | undefined`

:::note{title=Description}
Champs de dimension

La première dimension du graphique radar est mappée sur l’axe angulaire ; les autres dimensions sont fusionnées avec les noms de mesures lorsqu’il existe plusieurs mesures, puis affichées comme éléments de légende.
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
Granularite temporelle, determine la precision d affichage de la date

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "angle" | undefined`

:::note{title=Description}
Canal auquel la dimension est mappée

\- angle: prend en charge le mapping de plusieurs dimensions vers le canal d’angle

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



Les mesures du graphique radar sont automatiquement fusionnées en une seule mesure et mappées sur l’axe radial. Lorsque plusieurs mesures existent, les noms de mesure sont fusionnés avec les autres dimensions et affichés comme éléments de légende.

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
Alias de la mesure, les doublons sont autorises ; s il n est pas defini, l alias prend l ID par defaut

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Formatage numérique automatique, activé par défaut, priorité la plus élevée

Lorsque autoFormat=true, toutes les configurations numFormat sont remplacées.

Une fois active, les etiquettes de donnees et les infobulles du graphique choisissent automatiquement le format approprie selon les valeurs de mesure et la locale.

Regles de formatage : nombres decimaux, notation compacte activee, minimum 0 decimale, maximum 2 decimales, arrondi automatique, via l implementation Intl.NumberFormat du navigateur.

Par exemple :

\- locale=zh-CN: 749740.264 → 74.45万

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
Type de format numérique, prend en charge les nombres (décimal), les pourcentages (%), les pour mille (‰) et la notation scientifique
:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Ratio de formatage numérique, ne peut pas être 0

:::

**Exemple**

\- 100000 est converti en 10万, ratio:10000, symbol:"万"
\- 100000 est converti en 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Symbole de format numérique, par exemple %, ‰
:::

**Exemple**

\- 100000 est converti en 10万, ratio:10000, symbol:"万"
\- 100000 est converti en 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
Séparateur des milliers pour le format numérique
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
Nombre de décimales pour le format numérique, utilisant minimumFractionDigits et maximumFractionDigits de Intl.NumberFormat du navigateur. Priorité inférieure à significantDigits
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
Chiffres significatifs pour le format numérique, utilisant minimumSignificantDigits et maximumSignificantDigits de Intl.NumberFormat du navigateur. Priorité supérieure à fractionDigits
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
Priorité d’arrondi du format numérique lorsque significantDigits et fractionDigits sont tous deux définis. Utilise Intl.NumberFormat du navigateur et suit les règles roundingPriority de Intl.NumberFormat
:::

**Exemple**
\- 1234.5678 est converti en 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 est converti en 1234.5678, significantDigits:3 (roundingPriority:morePrecision)




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
Type de format numérique, prend en charge les nombres (décimal), les pourcentages (%), les pour mille (‰) et la notation scientifique
:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Ratio de formatage numérique, ne peut pas être 0

:::

**Exemple**

\- 100000 est converti en 10万, ratio:10000, symbol:"万"
\- 100000 est converti en 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Symbole de format numérique, par exemple %, ‰
:::

**Exemple**

\- 100000 est converti en 10万, ratio:10000, symbol:"万"
\- 100000 est converti en 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
Séparateur des milliers pour le format numérique
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
Nombre de décimales pour le format numérique, utilisant minimumFractionDigits et maximumFractionDigits de Intl.NumberFormat du navigateur. Priorité inférieure à significantDigits
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
Chiffres significatifs pour le format numérique, utilisant minimumSignificantDigits et maximumSignificantDigits de Intl.NumberFormat du navigateur. Priorité supérieure à fractionDigits
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
Priorité d’arrondi du format numérique lorsque significantDigits et fractionDigits sont tous deux définis. Utilise Intl.NumberFormat du navigateur et suit les règles roundingPriority de Intl.NumberFormat
:::

**Exemple**
\- 1234.5678 est converti en 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 est converti en 1234.5678, significantDigits:3 (roundingPriority:morePrecision)




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Mode d’arrondi du formatage numérique, utilisant Intl.NumberFormat du navigateur, avec les mêmes règles que roundingMode dans Intl.NumberFormat

:::

### encoding

**Type:** `"color" | "tooltip" | "label" | "radius" | undefined`

:::note{title=Description}
Canal auquel la mesure est mappée

\- radius : rayon mappé depuis la mesure

\- color : mesure mappée sur le canal couleur

\- label : mesure mappée sur le canal d’étiquette

\- tooltip : mesure mappée sur le canal d’infobulle

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

**Exemple**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Description}
Couleur d’arrière-plan du graphique

La couleur d’arrière-plan peut être une chaîne de couleur comme 'red' ou 'blue', ou une valeur hex, rgb ou rgba comme '#ff0000' ou 'rgba(255,0,0,0.5)'.
:::


## color

**Type:** `Color | undefined`

:::note{title=Description}
Couleur



Configuration des couleurs, utilisee pour definir les palettes du graphique, notamment les listes de couleurs, les correspondances de couleurs et les degrades.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Description}
Palette de couleurs discrète utilisée pour définir les couleurs des différents éléments du graphique.

:::

**Exemple**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Description}
Palette de dégradé linéaire utilisée pour définir les couleurs des différents éléments du graphique.

:::

**Exemple**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Description}
Mapping de couleur utilisé pour associer des valeurs de données à des couleurs spécifiques.

:::

**Exemple**
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



Configuration des etiquettes, utilisee pour definir la position, le format, le style et les parametres associes des etiquettes de donnees.

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

Remarque : le label dans encoding a une priorité plus élevée ; cette configuration n’affecte pas le label dans encoding.

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les etiquettes affichent les valeurs de mesure en pourcentage.

Dans les scénarios à plusieurs mesures, il n'y a pas de risque de valeurs conflictuelles, car toutes les mesures liées au tracé passent par le traitement `foldMeasures` et sont fusionnées en une seule mesure représentant un point de données.

Remarque : le label dans encoding a une priorité plus élevée ; cette configuration n’affecte pas le label dans encoding.

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les etiquettes affichent les libelles de dimension.

Affiche toutes les etiquettes de dimension.

Remarque : le label dans encoding a une priorité plus élevée ; cette configuration n’affecte pas le label dans encoding.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les valeurs des etiquettes sont formatees automatiquement ; lorsque autoFormat vaut true, la configuration numFormat est ignoree.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Configuration du format des valeurs d’étiquette ; fusionnée avec `format` dans `measure`, où le `format` de `measure` a une priorité plus élevée. La priorité de numFormat est inférieure à autoFormat.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}
Type de format numérique, prend en charge les nombres (décimal), les pourcentages (%), les pour mille (‰) et la notation scientifique
:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Ratio de formatage numérique, ne peut pas être 0

:::

**Exemple**

\- 100000 est converti en 10万, ratio:10000, symbol:"万"
\- 100000 est converti en 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Symbole de format numérique, par exemple %, ‰
:::

**Exemple**

\- 100000 est converti en 10万, ratio:10000, symbol:"万"
\- 100000 est converti en 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
Séparateur des milliers pour le format numérique
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
Nombre de décimales pour le format numérique, utilisant minimumFractionDigits et maximumFractionDigits de Intl.NumberFormat du navigateur. Priorité inférieure à significantDigits
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
Chiffres significatifs pour le format numérique, utilisant minimumSignificantDigits et maximumSignificantDigits de Intl.NumberFormat du navigateur. Priorité supérieure à fractionDigits
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
Priorité d’arrondi du format numérique lorsque significantDigits et fractionDigits sont tous deux définis. Utilise Intl.NumberFormat du navigateur et suit les règles roundingPriority de Intl.NumberFormat
:::

**Exemple**
\- 1234.5678 est converti en 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 est converti en 1234.5678, significantDigits:3 (roundingPriority:morePrecision)




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Mode d’arrondi du formatage numérique, utilisant Intl.NumberFormat du navigateur, avec les mêmes règles que roundingMode dans Intl.NumberFormat

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Taille de police du libellé
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
Sélection d’étiquette ; les conditions entre sélecteurs sont OR par défaut.

:::


#### field

**Type:** `string`

:::note{title=Description}
Champ de dimension, id d’un élément de dimensions
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




identique à operator

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


## legend

**Type:** `Legend | undefined`

:::note{title=Description}
Legende



Configuration de la legende, utilisee pour definir la position, le format, le style et les parametres associes de la legende.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la fonctionnalite de legende est activee.

:::

**Exemple**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la bordure de la legende est activee.

:::

:::warning{title=Warning}
S applique uniquement aux legendes discretes.

:::

**Exemple**
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

**Exemple**
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

**Exemple**
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Description}
Type de forme de la legende.

:::

:::warning{title=Warning}
S applique uniquement aux legendes discretes.

:::

**Exemple**
shapeType: 'circle'



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
Nombre maximal de colonnes ou de lignes lorsqu il y a beaucoup d elements de legende.

Si position est horizontale (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize controle le nombre de colonnes affichees.

Si position est verticale (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize controle le nombre de lignes affichees.

:::

:::warning{title=Warning}
S applique uniquement aux legendes discretes.

:::

**Exemple**
maxSize: 2




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Description}
Info-bulle



Configuration des infobulles, utilisee pour definir la position, le format, le style et les parametres associes des infobulles.

:::


### enable

**Type:** `false | true`

:::note{title=Description}
Indique si la fonctionnalité d’infobulle est activée
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
Mode de sélection: simple ou multiple



Définit le mode de sélection par brush

\- `single`: Mode sélection simple, une seule zone de brush peut exister à la fois

\- `multiple`: Mode sélection multiple, plusieurs zones de brush peuvent exister simultanément
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
\-  100000 devient 10万, ratio:10000, symbol:"万"



Definit le style des points de donnees hors de la selection.

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
\-  100000 devient 10万, ratio:10000, symbol:"万"





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


## animation

**Type:** `RadarAnimation | undefined`

:::note{title=Description}
Configuration de l animation



Configuration d animation du graphique ; les effets disponibles sont limites par le type de graphique

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si l animation du graphique radar est activee

:::

### params

**Type:** `RadarAnimationParams | undefined`

:::note{title=Description}
Parametres d animation du graphique radar

:::


#### appear

**Type:** `RadarAppearAnimation | undefined`

:::note{title=Description}
Configuration de l animation d apparition du graphique radar

:::


##### effects

**Type:** `("radial" | "scale")[] | undefined`

:::note{title=Description}
Effets d apparition du graphique radar, prenant en charge les animations radiale et de mise a l echelle

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si l etape d animation actuelle est activee

:::

##### ease

**Type:** `string | undefined`

:::note{title=Description}
Fonction d easing de l animation

:::

##### duration

**Type:** `number | undefined`

:::note{title=Description}
Duree de l animation, en millisecondes

:::

##### color

**Type:** `string | undefined`

:::note{title=Description}
Couleur de surbrillance ou d ambiance de l animation

:::

#### update

**Type:** `RadarUpdateAnimation | undefined`

:::note{title=Description}
Configuration de l animation de mise a jour du graphique radar

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=Description}
Effets de mise a jour du graphique radar, prenant en charge l animation de croissance

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si l etape d animation actuelle est activee

:::

##### ease

**Type:** `string | undefined`

:::note{title=Description}
Fonction d easing de l animation

:::

##### duration

**Type:** `number | undefined`

:::note{title=Description}
Duree de l animation, en millisecondes

:::

##### color

**Type:** `string | undefined`

:::note{title=Description}
Couleur de surbrillance ou d ambiance de l animation

:::

#### loop

**Type:** `RadarAnimationLoop | undefined`

:::note{title=Description}
Configuration de l animation en boucle du graphique radar

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si l animation en boucle est activee

:::

##### interval

**Type:** `number | undefined`

:::note{title=Description}
Intervalle de l animation en boucle, en millisecondes

:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=Description}
Graphique radar atmosphere animation configuration

:::


###### ease

**Type:** `string | undefined`

:::note{title=Description}
Fonction d’easing de l’animation d’atmosphère

:::

###### color

**Type:** `string | undefined`

:::note{title=Description}
Couleur de l’animation d’atmosphère

:::

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title=Description}
Effet d’animation d’atmosphère, prenant en charge les effets d’ondulation, de visibilité et de respiration

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
Configuration du style des marqueurs de point, utilisée pour définir leur couleur, leur bordure et les paramètres associés.

Prend en charge une configuration de style globale ou conditionnelle

Filtre de donnees




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
Champ de dimension, id d’un élément de dimensions
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




identique à operator

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

Implémente une logique complexe de filtrage des données via du code JavaScript généré par l’IA

Convient aux scénarios difficiles à exprimer avec des sélecteurs statiques, comme le Top N, l’analyse statistique et les conditions complexes

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




## lineStyle

**Type:** `LineStyle | LineStyle[] | undefined`

:::note{title=Description}
Line mark style configuration, used to define line mark color, opacity, curve, and related settings.

Prend en charge une configuration de style globale ou conditionnelle

Filtre de donnees




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
Champ de dimension, id d’un élément de dimensions
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




identique à operator

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

Implémente une logique complexe de filtrage des données via du code JavaScript généré par l’IA

Convient aux scénarios difficiles à exprimer avec des sélecteurs statiques, comme le Top N, l’analyse statistique et les conditions complexes

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




## areaStyle

**Type:** `AreaStyle | AreaStyle[] | undefined`

:::note{title=Description}
Area mark style configuration, used to define area mark color, opacity, border, and related settings.

Prend en charge une configuration de style globale ou conditionnelle

Filtre de donnees




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
Champ de dimension, id d’un élément de dimensions
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




identique à operator

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

Implémente une logique complexe de filtrage des données via du code JavaScript généré par l’IA

Convient aux scénarios difficiles à exprimer avec des sélecteurs statiques, comme le Top N, l’analyse statistique et les conditions complexes

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

### areaVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si l element de zone est visible



Indique si l element de zone est visible

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
