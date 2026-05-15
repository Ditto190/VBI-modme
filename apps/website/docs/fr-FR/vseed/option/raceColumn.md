# RaceColumn

:::note{title=Description}
Graphique en colonnes dynamique (Race Column Chart)

Adapté à l’affichage des classements de données qui évoluent au fil du temps, avec des colonnes verticales

Scénarios applicables :

\- Lorsque les noms des éléments de données sont longs

\- Lorsqu’il faut comparer intuitivement les valeurs de différentes catégories et afficher leur classement évolutif dans le temps

\- Afficher les tendances de données temporelles et mettre à jour dynamiquement le tri des colonnes

:::

:::note{title=Note}
Graphique en colonnes dynamique :

\- L’axe X est un axe catégoriel (données catégorielles) affichant les valeurs de dimension

\- L’axe Y est un axe numérique (données continues) affichant les valeurs de mesure

\- Prend en charge le contrôle de la dimension temporelle via le lecteur pour afficher dynamiquement les changements de données

\- Les colonnes sont triées dynamiquement selon les valeurs pendant l’animation

:::


## chartType

**Type:** `"raceColumn"`

:::note{title=Description}
Graphique en colonnes dynamique, adapté à l’affichage des classements de données qui évoluent au fil du temps

:::


## dataset

**Type:** `Record[]`

:::note{title=Description}
Jeu de données déjà agrégé et conforme à la spécification TidyData

:::

**Exemple**
[{category:'A', value:100, date: '2020'}, {category:'B', value:200, date: '2020'}]




## dimensions

**Type:** `RaceColumnDimension[] | undefined`

:::note{title=Description}
La première dimension est mappée sur l'axe X ; les dimensions restantes sont fusionnées avec les noms de mesures (lorsqu'il y a plusieurs mesures) et affichées comme éléments de légende.



La première dimension est mappée au player, la deuxième à l’axe X

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
Granularite temporelle, determine la precision d affichage de la date

:::

### encoding

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | "row" | "column" | "player" | undefined`

:::note{title=Description}
Canal auquel la dimension est mappée

\- xAxis : prend en charge le mapping de plusieurs dimensions sur l’axe x

\- color : prend en charge le mapping de plusieurs dimensions vers le canal de couleur

\- detail : prend en charge le mapping de plusieurs dimensions vers le canal de détail

\- tooltip : prend en charge le mapping de plusieurs dimensions vers le canal d’infobulle

\- label : prend en charge le mapping de plusieurs dimensions vers le canal d’étiquette

\- row : prend en charge le mapping de plusieurs dimensions vers le canal de ligne

\- column : prend en charge le mapping de plusieurs dimensions vers le canal de colonne

\- player : prend en charge le mappage de plusieurs dimensions au canal du lecteur

:::


## measures

**Type:** `ColumnMeasure[] | undefined`

:::note{title=Description}
Mesures



Toutes les mesures du graphique en colonnes dynamique sont automatiquement fusionnées en une seule mesure et mappées sur l’axe Y. Lorsqu’il existe plusieurs mesures, leurs noms sont combinés avec les autres dimensions et affichés comme éléments de légende.

:::

**Exemple**
[{id: "value", alias: "Valeur"}]




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
Type de format numerique, prend en charge : decimal, percent (%), permille (‰), notation scientifique

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Ratio de format numérique, ne peut pas être 0

:::

**Exemple**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Symbole de format numérique, par exemple %, ‰

:::

**Exemple**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
Separateur de milliers pour le formatage numerique

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
Decimales pour le formatage numerique, utilise minimumFractionDigits et maximumFractionDigits de Intl.NumberFormat du navigateur ; priorite inferieure a significantDigits.

:::

**Exemple**
\- 1234.5678 converted to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
Chiffres significatifs pour le formatage numerique, utilise minimumSignificantDigits et maximumSignificantDigits de Intl.NumberFormat du navigateur ; priorite superieure a fractionDigits.

:::

**Exemple**
\- 1234.5678 converted to 1000, significantDigits:1
\- 1234.5678 converted to 1200, significantDigits:2
\- 1234.5678 converted to 1230, significantDigits:3
\- 1234.5678 converted to 1234, significantDigits:4
\- 1234.5678 converted to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}
Priorite d arrondi lorsque significantDigits et fractionDigits sont tous deux definis ; utilise Intl.NumberFormat du navigateur et suit les memes regles que roundingPriority de Intl.NumberFormat.

:::

**Exemple**
\- 1234.5678 converted to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converted to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Mode d arrondi du formatage numerique, utilise Intl.NumberFormat du navigateur et suit les memes regles que roundingMode de Intl.NumberFormat.

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}
Type de format numerique, prend en charge : decimal, percent (%), permille (‰), notation scientifique

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Ratio de format numérique, ne peut pas être 0

:::

**Exemple**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Symbole de format numérique, par exemple %, ‰

:::

**Exemple**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
Separateur de milliers pour le formatage numerique

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
Decimales pour le formatage numerique, utilise minimumFractionDigits et maximumFractionDigits de Intl.NumberFormat du navigateur ; priorite inferieure a significantDigits.

:::

**Exemple**
\- 1234.5678 converted to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
Chiffres significatifs pour le formatage numerique, utilise minimumSignificantDigits et maximumSignificantDigits de Intl.NumberFormat du navigateur ; priorite superieure a fractionDigits.

:::

**Exemple**
\- 1234.5678 converted to 1000, significantDigits:1
\- 1234.5678 converted to 1200, significantDigits:2
\- 1234.5678 converted to 1230, significantDigits:3
\- 1234.5678 converted to 1234, significantDigits:4
\- 1234.5678 converted to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}
Priorite d arrondi lorsque significantDigits et fractionDigits sont tous deux definis ; utilise Intl.NumberFormat du navigateur et suit les memes regles que roundingPriority de Intl.NumberFormat.

:::

**Exemple**
\- 1234.5678 converted to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converted to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Mode d arrondi du formatage numerique, utilise Intl.NumberFormat du navigateur et suit les memes regles que roundingMode de Intl.NumberFormat.

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "yAxis" | undefined`

:::note{title=Description}
Canal auquel la mesure est mappée

\- yAxis : mesure mappée sur l’axe y

\- detail: Measure mapped to the detail channel

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


## player

**Type:** `Player | undefined`

:::note{title=Description}
Configuration du lecteur, utilisée pour spécifier la dimension temporelle, configuration centrale du graphique en colonnes dynamique

Contrôle la progression de lecture de la dimension temporelle via le lecteur afin de mettre à jour les données et le tri dynamiquement



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


## sort

**Type:** `Sort | undefined`

:::note{title=Description}
Configuration du tri ; le graphique en colonnes dynamique nécessite généralement un tri dynamique selon les valeurs

Contrôle la méthode de tri des colonnes sur l’axe X





:::

**Exemple**
Remarque : selector et dynamicFilter ne peuvent pas etre utilises simultanement ; dynamicFilter a une priorite plus elevee.

Configuration du filtre dynamique du graphique.





### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Description}

:::

**Exemple**
Description des besoins de filtrage de l’utilisateur (langage naturel).



### orderBy

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**





### customOrder

**Type:** `string[] | undefined`

:::note{title=Description}
\- `__row_index` represente le numero de ligne de l element de donnees original, et `field` represente le champ a mettre en evidence.

:::


## page

**Type:** `Page | undefined`

:::note{title=Description}
Configuration de la pagination, utilisée pour gérer les scénarios avec de grands volumes de données

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
Configuration de la couleur d’arrière-plan

:::


## color

**Type:** `Color | undefined`

:::note{title=Description}
Configuration des couleurs, utilisée pour distinguer différentes dimensions ou mesures

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
Configuration des étiquettes, utilisée pour afficher les étiquettes de données sur les colonnes

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
Type de format numerique, prend en charge : decimal, percent (%), permille (‰), notation scientifique.

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Ratio du format numerique, ne peut pas etre 0.

:::

**Exemple**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Symbole de format numérique, par exemple %, ‰

:::

**Exemple**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
Separateur de milliers pour le formatage numerique.

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}
Suffixe du format numerique.

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
Prefixe du format numerique.

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
Decimales pour le formatage numerique, utilise minimumFractionDigits et maximumFractionDigits de Intl.NumberFormat du navigateur ; priorite inferieure a significantDigits.

:::

**Exemple**
\- 1234.5678 converted to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
Chiffres significatifs pour le formatage numerique, utilise minimumSignificantDigits et maximumSignificantDigits de Intl.NumberFormat du navigateur ; priorite superieure a fractionDigits.

:::

**Exemple**
\- 1234.5678 converted to 1000, significantDigits:1
\- 1234.5678 converted to 1200, significantDigits:2
\- 1234.5678 converted to 1230, significantDigits:3
\- 1234.5678 converted to 1234, significantDigits:4
\- 1234.5678 converted to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}
Priorite d arrondi lorsque significantDigits et fractionDigits sont tous deux definis ; utilise Intl.NumberFormat du navigateur et suit les memes regles que roundingPriority de Intl.NumberFormat.

:::

**Exemple**
\- 1234.5678 converted to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converted to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Mode d arrondi du formatage numerique, utilise Intl.NumberFormat du navigateur et suit les memes regles que roundingMode de Intl.NumberFormat.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Étiquette font size

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}
Étiquette font weight

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
Champ de dimension ; ID d un element dans dimensions.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Opérateur

\- in : selectionne les elements de donnees dont la valeur du champ de dimension est dans la liste de valeurs.

\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est PAS dans la liste de valeurs.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Opérateur

\- in : selectionne les elements de donnees dont la valeur du champ de dimension est dans la liste de valeurs.

\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est PAS dans la liste de valeurs.

Identique à operator.

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Valeurs du champ de dimension selectionnees ; prend en charge les tableaux.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Filtre dynamique (execution de code genere par IA)



Implémente une logique complexe de filtrage de données via du code JavaScript généré par IA.



Capacites principales :

\- Prend en charge des conditions de filtrage de donnees arbitrairement complexes.

\- Utilise des fonctions utilitaires integrees pour manipuler les donnees.

\- S execute en securite dans l environnement du navigateur (sandbox Web Worker).



Exigences d environnement : prend uniquement en charge l environnement navigateur ; l environnement Node.js utilise un repli.



Remarque : selector et dynamicFilter ne peuvent pas etre utilises simultanement ; dynamicFilter a une priorite plus elevee.



Configuration du filtre dynamique du graphique.



Filtre les marqueurs du graphique (barres, points, etc.) via du code JavaScript genere par IA.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Description des besoins de filtrage de l’utilisateur (langage naturel).

:::

**Exemple**
"Mettre en surbrillance les colonnes dont les ventes depassent 1000"

"Mettre en surbrillance la colonne avec le taux de profit le plus eleve dans chaque region"



#### code

**Type:** `string`

:::note{title=Description}
Code JavaScript de filtrage généré par IA.



\- Utilisez uniquement les fonctions utilitaires integrees (acces via _ ou R).

\- Parametre d entree : data (tableau), chaque element contient le champ `__row_index` representant le numero de ligne.

\- Doit retourner un tableau de combinaisons index de ligne et champ : `Array<{ __row_index: number, field: string }>`.

\- `__row_index` represente le numero de ligne de l element de donnees original, et `field` represente le champ a mettre en evidence.

\- Interdit : eval, Function, operations asynchrones, API DOM, requetes reseau.

:::

**Exemple**
Highlight the `sales` field of data items where sales are greater than 1000:
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight the data item with the highest profit margin in each region:
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

Highlight data items based on multiple filtering conditions:
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
Strategie de repli lorsque l execution du code echoue ou que l environnement n est pas pris en charge.

:::


##### field

**Type:** `string`

:::note{title=Description}
Champ de dimension ; ID d un element dans dimensions.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Opérateur

\- in : selectionne les elements de donnees dont la valeur du champ de dimension est dans la liste de valeurs.

\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est PAS dans la liste de valeurs.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Opérateur

\- in : selectionne les elements de donnees dont la valeur du champ de dimension est dans la liste de valeurs.

\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est PAS dans la liste de valeurs.

Identique à operator.

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Valeurs du champ de dimension selectionnees ; prend en charge les tableaux.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Resultat d execution du filtre dynamique (champ d execution).



Ecrit pendant la phase prepare() ; en lecture seule a l execution.

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
Graisse de police de la légende



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




### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Description}
Type de forme de la legende.

:::

:::warning{title=Warning}
S applique uniquement aux legendes discretes.

:::

**Exemple**
Brush



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Description}
Position de la légende

:::

**Exemple**




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
Mode de brush ; définit si une ou plusieurs zones peuvent être sélectionnées.




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Description}
Configuration des infobulles, utilisée pour afficher des informations détaillées au survol

:::


### enable

**Type:** `false | true`

:::note{title=Description}


:::


## brush

**Type:** `Brush | undefined`

:::note{title=Description}
Configuration du brush, utilisée pour prendre en charge l’interaction de sélection



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
Style des donnees NON selectionnees par le brush.



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


## xAxis

**Type:** `XBandAxis | undefined`

:::note{title=Description}
Configuration de l’axe X, axe catégoriel affichant les valeurs de dimension, avec colonnes verticales

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Ligne d’axe color

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si l axe est visible.

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


Axe Y, axe numerique, configuration de l axe Y ; definit l axe Y du graphique, notamment sa position, son format, son style, etc.


:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=Description}


:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=Description}


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


:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Description}

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Description}


:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Description}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}


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


:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Description}
\- 1234.5678 est converti en 1234.5678 , fractionDigits:4 (roundingMode:halfCeil)

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

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Description}


:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Étiquette de graduation de l’axe X

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Description}


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

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Description}

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
Configuration de l’axe Y, axe numérique affichant les valeurs de mesure

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Description}

:::

### min

**Type:** `number | undefined`

:::note{title=Description}


:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Description}


:::

### log

**Type:** `boolean | undefined`

:::note{title=Description}


:::

### logBase

**Type:** `number | undefined`

:::note{title=Description}


:::

### nice

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


:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Hauteur maximale du rectangle ; peut etre une valeur en pixels ou une chaine en pourcentage.

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


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title=Description}
Configuration du crosshair, utilisée pour afficher les valeurs exactes des données



selector = {

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Description}


:::

### rectColor

**Type:** `string | undefined`

:::note{title=Description}
operator: 'between'

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Description}

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Description}

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
solid

:::


## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title=Description}
Configuration des coins arrondis empilés

:::


## barMaxWidth

**Type:** `string | number | undefined`

:::note{title=Description}
Configuration de la largeur maximale du rectangle

:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=Description}
Configuration du tri de la légende



Configuration de filtre dynamique du graphique : filtre les marques du graphique (barres, points, etc.) via du code JavaScript généré par IA.

:::

**Exemple**
);


Highlight data items based on multiple filtering conditions:




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Description}
])

:::

**Exemple**




### orderBy

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**

  __row_index: item.__row_index,



### customOrder

**Type:** `string[] | undefined`

:::note{title=Description}
  _.maxBy(group, item => item.profit / item.sales)

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Description}
Configuration du thème



Opérateur



\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est PAS dans la liste de valeurs.

:::


### length

**Type:** `number`

### brand

**Type:** `brand`


## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title=Description}
Configuration du style des colonnes, pouvant être un style unique ou un tableau

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
- not in : sélectionne les éléments de données dont la valeur du champ de dimension n’est pas dans le tableau `value`.






:::

**Exemple**
Couleur du trace du primitive barre (rectangle)




Résultat d'exécution du filtre dynamique (champ runtime)



field: 'category',
operator: 'in',
value: 'tool'
}
field: 'category',
operator: 'not in',
value: 'book'
}


field: 'profit',
operator: '>=',
value: 100
}
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






:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}






:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Selecteur des points d annotation, utilise pour selectionner des points de donnees.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
- center : texte centré sur le point.









Opérateur

\- in : selectionne les elements de donnees dont la valeur du champ de dimension est dans la liste de valeurs.

\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est PAS dans la liste de valeurs.


















:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**
"Mettre en surbrillance les colonnes dont les ventes depassent 1000"

"Mettre en surbrillance la colonne avec le taux de profit le plus eleve dans chaque region"



#### code

**Type:** `string`

:::note{title=Description}













:::

**Exemple**

```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

"Highlight the bar with the highest profit margin in each region"
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
const grouped = _.groupBy(data, 'area');

:::


##### field

**Type:** `string`

:::note{title=Description}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
_.map(filtered, item => [

{ __row_index: item.__row_index, field: 'sales' }

);

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Valeur X fixe de la ligne d’annotation verticale. Si l’axe catégoriel est dans la direction X, une valeur de dimension peut être saisie ; si un axe numérique est dans la direction X, une valeur numérique spécifique peut être utilisée.






:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Pris en charge uniquement dans les environnements navigateur (nécessite Web Worker).

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est PAS dans la liste de valeurs.



\- in : selectionne les elements de donnees dont la valeur du champ de dimension est dans value

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


:::

### barColor

**Type:** `string | undefined`

:::note{title=Description}
Ecrit pendant la phase prepare() ; en lecture seule a l execution.

:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
const avgSales = _.meanBy(data, 'sales');

:::

### barBorderColor

**Type:** `string | undefined`

:::note{title=Description}


:::

### barBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
'Texte d annotation'

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Couleur du texte.

:::

**Exemple**
'red'







### barBorderOpacity

**Type:** `number | undefined`

:::note{title=Description}
**Exemple**





:::

**Exemple**
Texte d annotation.

[0, 0, 10, 10]



### barRadius

**Type:** `number | number[] | undefined`


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Description}
Configuration des points de repère, utilisée pour ajouter des repères sur des points de données spécifiques

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
bottom : le texte est au-dessus du point d annotation, avec son bord inferieur aligne sur le point.

Il est recommande de definir 'top' pour que le texte soit entierement affiche dans la zone visible du graphique.

**Exemple**

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}






true

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Couleur d arriere-plan.

:::

### measureId

**Type:** `string | undefined`

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

**Exemple**
"Mettre en surbrillance les colonnes dont les ventes depassent 1000"

"Mettre en surbrillance la colonne avec le taux de profit le plus eleve dans chaque region"



#### code

**Type:** `string`

:::note{title=Description}








Decalage horizontal du point d annotation en pixels. Lorsque le point est a gauche (debut de l axe categoriel), une valeur positive est recommandee ; lorsqu il est a droite (fin de l axe categoriel), une valeur negative est recommandee.

Une valeur negative decale tout le composant vers la gauche (par exemple, -10).

Une valeur positive decale tout le composant vers la droite (par exemple, 10).

:::

**Exemple**
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
"Obtenir la valeur de ventes la plus elevee comme reference de ligne d annotation"

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}


Code JavaScript de filtrage généré par IA.

\- Utilisez uniquement les fonctions utilitaires integrees (acces via _ ou R).

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}




Obtenir la valeur de ventes maximale comme valeur de ligne d annotation :

const maxSales = _.maxBy(data, 'sales')?.sales;

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Description des besoins de filtrage de l’utilisateur (langage naturel).



);

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
Ecrit pendant la phase prepare() ; en lecture seule a l execution.

:::

**Exemple**
'Texte d annotation'



### textColor

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Description}


:::

**Exemple**




### textFontWeight

**Type:** `number | undefined`

:::note{title=Description}


:::

**Exemple**




### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Description}




Taille de police du texte.


**Exemple**

:::

**Exemple**
'right' le texte se trouve a gauche du point d annotation



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
**Exemple**









:::

**Exemple**
'top' le texte se trouve en bas du point d annotation



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}
**Exemple**

:::

**Exemple**




### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
top : le texte est sous la ligne de reference, avec son bord superieur aligne sur l extremite de la ligne d annotation (verticale).

:::

**Exemple**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Description}


:::

**Exemple**




### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Description}


:::

**Exemple**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Description}


:::

**Exemple**




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
Ligne de repère numérique, ligne verticale marquant une valeur spécifique de l’axe X

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Description}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Description}




Rayon des angles de bordure de l arriere-plan.

Visibilité de la ligne.





:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**
"Obtenir la valeur de ventes la plus elevee comme reference de ligne d annotation"

"Calculer les ventes moyennes pour la ligne d annotation"



#### code

**Type:** `string`

:::note{title=Description}











Filtre dynamique (execution de code genere par IA)

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

**Exemple**
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
\- Parametre d entree : data (tableau).

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Description}




const maxSales = _.maxBy(data, 'sales')?.sales;

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Description}


:::

**Exemple**
'Texte d annotation'



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
'Texte d’annotation'

:::

**Exemple**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Description}


:::

**Exemple**




### textFontWeight

**Type:** `number | undefined`

:::note{title=Description}


:::

**Exemple**




### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Description}




Couleur du texte.


**Exemple**

:::

**Exemple**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
**Exemple**









:::

**Exemple**
'top'



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Description}


:::

**Exemple**




### lineColor

**Type:** `string | undefined`

:::note{title=Description}
**Exemple**

:::

**Exemple**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
top : le texte est sous la ligne de reference, avec son bord superieur aligne sur la ligne d annotation (horizontale).

:::

**Exemple**




### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}


:::

**Exemple**
'solid'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}


:::

**Exemple**




### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Description}


:::

**Exemple**




### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Description}


:::

**Exemple**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Description}


:::

**Exemple**





## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=Description}
Ligne de repère des valeurs de dimension, ligne horizontale marquant une catégorie spécifique de l’axe Y

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Description}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Description}
**Exemple**











:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**
"Obtenir la valeur de ventes la plus elevee comme reference de ligne d annotation"

"Calculer les ventes moyennes pour la ligne d annotation"



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
\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est PAS dans la liste de valeurs.



Couleur du texte

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Description}
**Exemple**

:::

**Exemple**
'Texte d annotation'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Description}
**Exemple**





:::

**Exemple**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Description}


:::

**Exemple**



### textFontWeight

**Type:** `number | undefined`

:::note{title=Description}


:::

**Exemple**



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

bottom : le texte est en haut de la zone d annotation, avec son bord inferieur aligne sur la zone.

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



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Description}






:::

**Exemple**




### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Description}


:::

**Exemple**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Description}


:::

**Exemple**




### lineVisible

**Type:** `boolean | undefined`

:::note{title=Description}






:::

**Exemple**
0.5



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
Configuration de la zone de repère, utilisée pour mettre en évidence une plage de données spécifique

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




Indique si les infobulles sont affichees pour tous les sous-graphiques correspondant aux dimensions.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Indique si les etiquettes correspondant au crosshair sont affichees.






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
'Texte d annotation'



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
'center' le texte se trouve au centre de la zone d annotation



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}








Ordre de la regression polynomiale

:::

**Exemple**
'top' le texte se trouve en bas de la zone d annotation



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




### areaBorderRadius

**Type:** `number | undefined`

:::note{title=Description}


:::

**Exemple**



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
Configuration de la liaison des dimensions, prend en charge les interactions de liaison entre plusieurs graphiques



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
