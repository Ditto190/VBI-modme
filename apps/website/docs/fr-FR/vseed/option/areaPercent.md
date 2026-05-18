# AreaPercent

:::info{title=Recommandation}
\- Configuration de champs recommandée : `1` mesure, `2` dimensions

\- Prend en charge remodelage des données : au moins `1` mesure, `0` dimension

:::

:::info{title=Correspondance encodage}
Le graphique en aires à pourcentage prend en charge les canaux visuels suivants:

`xAxis`  : canal de l’axe X, prend en charge `plusieurs dimensions`, mappées sur l’axe X selon la valeur de dimension

`yAxis`  : canal de l’axe Y, prend en charge `plusieurs mesures`, mappées sur l’axe Y selon la valeur de mesure

`color`  : canal de couleur, prend en charge `plusieurs dimensions` ou `une mesure`; les couleurs de dimension distinguent les séries de données, les couleurs de mesure mappent linéairement les valeurs de mesure vers les couleurs graphiques

`tooltip`: canal infobulle, prend en charge `plusieurs dimensions` et `plusieurs mesures`, affiché au survol d’un point de données

`label`  : canal étiquette, prend en charge `plusieurs dimensions` et `plusieurs mesures`, affiche les étiquettes de données sur les points de données

:::

:::note{title=Description}
Le graphique en aires à pourcentage convient pour montrer l’évolution des proportions de plusieurs catégories dans le temps; l’axe Y affiche les relations de proportion au format pourcentage.

Scénarios adaptés:

\- Analyse des changements de composition des séries temporelles

\- Comparaison des tendances de proportion entre plusieurs catégories

\- Affichage simultané des proportions cumulées et de la proportion d’une catégorie

:::

:::warning{title=Warning}
Exigences de données:

\- Au moins 1 champ de mesure

\- La première dimension est placée sur l’axe Y; les dimensions restantes sont fusionnées avec les noms de mesures (lorsqu’il existe plusieurs mesures) et affichées comme éléments de légende.

\- Toutes les mesures sont automatiquement fusionnées en une seule mesure

Fonctionnalités activées par défaut :

\- La légende, les axes, les étiquettes de pourcentage, les infobulles et le calcul de proportion sont activés par défaut.
:::


## chartType

**Type:** `"areaPercent"`

:::note{title=Description}
Graphique en aires à pourcentage



Graphique en aires à pourcentage, affichant au format pourcentage l’évolution des proportions de plusieurs catégories selon une dimension donnée.

:::

**Exemple**
'areaPercent'




## dataset

**Type:** `Record[]`

:::note{title=Description}
Jeu de données



Jeu de données agrégé conforme à la spécification TidyData. Il définit la source et la structure des données du graphique. Les données saisies par l’utilisateur ne nécessitent aucun traitement manuel, car VSeed effectue automatiquement le remodelage des données. Les données du graphique en aires à pourcentage sont finalement converties en 2 dimensions et 1 mesure.

:::

**Exemple**
[{month:'Jan', category:'A', value:30}, {month:'Jan', category:'B', value:70}]




## dimensions

**Type:** `ColumnDimension[] | undefined`

:::note{title=Description}
Champs de dimension

La première dimension est mappée sur l’axe X ; les autres dimensions sont fusionnées avec le nom de la mesure (lorsqu’il existe plusieurs mesures) et affichées comme éléments de légende.
:::

**Exemple**
[{ id: 'month', alias: 'Month' }, { id: 'year', alias: 'Year' }]




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
Granularité temporelle, détermine la précision d’affichage de la date

:::

### encoding

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=Description}
Canal sur lequel la dimension est mappée

\- xAxis : prend en charge le mapping de plusieurs dimensions sur l’axe x

\- color : prend en charge le mapping de plusieurs dimensions sur le canal couleur

\- detail : prend en charge le mapping de plusieurs dimensions sur le canal détail

\- infobulle : prend en charge le mapping de plusieurs dimensions sur le canal d’infobulle

\- étiquette : prend en charge le mapping de plusieurs dimensions sur le canal d’étiquette

\- row : prend en charge le mapping de plusieurs dimensions sur le canal ligne

\- column : prend en charge le mapping de plusieurs dimensions sur le canal colonne

:::


## measures

**Type:** `ColumnMeasure[] | undefined`

:::note{title=Description}
Mesures



Les mesures du graphique en aires à pourcentage sont automatiquement fusionnées en une seule mesure et mappées sur l’axe Y. Les noms de mesures sont fusionnés avec les dimensions restantes et affichés comme éléments de légende.
:::

**Exemple**
[{id: 'value', alias: 'Numerical Ratio', format: 'percent'}]




### id

**Type:** `string`

:::note{title=Description}
ID de mesure, doit être unique

:::

### alias

**Type:** `string | undefined`

:::note{title=Description}
Alias de mesure, les doublons sont autorisés; s’il n’est pas défini, l’alias vaut l’id par défaut

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Formatage automatique des nombres, activé par défaut, priorité la plus élevée

Lorsque autoFormat=true, toutes les configurations numFormat sont remplacées

Lorsque cette option est activée, les étiquettes et infobulles du graphique choisissent automatiquement le format approprié selon les valeurs de mesure et la locale

Règles de formatage: nombres décimaux avec notation compacte activée, au moins 0 décimale, au plus 2 décimales, arrondi automatique, avec l’implémentation Intl.NumberFormat du navigateur

Par exemple:

\- locale='zh-CN': 749740.264 → 74.45万

\- locale='en-US': 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Formatage numérique personnalisé des mesures; appliqué automatiquement aux étiquettes et aux infobulles

Remarque: pour utiliser un format personnalisé, vous devez définir explicitement autoFormat=false; sinon autoFormat remplacera cette configuration

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}
Type de format numérique, prend en charge: number (décimal), percent (%), permille (‰), notation scientifique

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
Décimales pour le formatage numérique, avec minimumFractionDigits et maximumFractionDigits d’Intl.NumberFormat du navigateur; priorité plus faible que significantDigits

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
Chiffres significatifs pour le formatage numérique, avec minimumSignificantDigits et maximumSignificantDigits d’Intl.NumberFormat du navigateur; priorité plus élevée que fractionDigits

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
Priorité d’arrondi pour le formatage numérique lorsque significantDigits et fractionDigits sont tous deux définis; utilise Intl.NumberFormat du navigateur et suit les mêmes règles que roundingPriority d’Intl.NumberFormat

:::

**Exemple**
\- 1234.5678 est converti en 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 est converti en 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Mode d’arrondi pour le formatage numérique, avec Intl.NumberFormat du navigateur et les mêmes règles que roundingMode d’Intl.NumberFormat

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
Décimales pour le formatage numérique, avec minimumFractionDigits et maximumFractionDigits d’Intl.NumberFormat du navigateur; priorité plus faible que significantDigits

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
Chiffres significatifs pour le formatage numérique, avec minimumSignificantDigits et maximumSignificantDigits d’Intl.NumberFormat du navigateur; priorité plus élevée que fractionDigits

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
Priorité d’arrondi pour le formatage numérique lorsque significantDigits et fractionDigits sont tous deux définis; utilise Intl.NumberFormat du navigateur et suit les mêmes règles que roundingPriority d’Intl.NumberFormat

:::

**Exemple**
\- 1234.5678 est converti en 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 est converti en 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Mode d’arrondi pour le formatage numérique, avec Intl.NumberFormat du navigateur et les mêmes règles que roundingMode d’Intl.NumberFormat

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "yAxis" | undefined`

:::note{title=Description}
Canal sur lequel la mesure est mappée

\- yAxis : mesure mappée sur l’axe y

\- detail : mesure mappée sur le canal détail

\- color: mesure est mappé au canal de couleur

\- étiquette: mesure est mappé au canal étiquette

\- infobulle: mesure est mappé au canal infobulle

:::

### parentId

**Type:** `string | undefined`

:::note{title=Description}
Dans une configuration de mesures plate, construit un groupe de mesures en arbre. parentId pointe vers l’id du groupe de mesures parent et sert à construire l’arbre des mesures

:::

:::tip{title=Tip}
Deux façons existent pour configurer l'arbre de mesures: l'option 1 consiste à configurer directement un arbre avec children; l'option 2 consiste à configurer une liste plate avec parentId. Ces deux méthodes ne peuvent pas être utilisées simultanément

:::


## page

**Type:** `Page | undefined`

:::note{title=Description}
Pagination



Configuration de pagination du graphique

:::


### field

**Type:** `string`

:::note{title=Description}
Champ de pagination; définit le nom du champ utilisé pour la pagination et doit être une dimension

:::

### currentValue

**Type:** `string`

:::note{title=Description}
Valeur de pagination actuelle; définit la valeur utilisée pour déterminer la page actuelle

:::

**Exemple**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Description}
Couleur d’arrière-plan du graphique



La couleur d’arrière-plan peut être une chaîne de couleur (par ex. 'red', 'blue') ou une valeur hex, rgb ou rgba (par ex. '#ff0000', 'rgba(255,0,0,0.5)')

:::


## color

**Type:** `Color | undefined`

:::note{title=Description}
Couleur



Configuration de couleur pour définir le schéma de couleurs du graphique, y compris les listes de couleurs, les mappings de couleur et les dégradés.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Description}
Schéma de couleurs discret pour définir les couleurs des différents éléments du graphique

:::

**Exemple**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Description}
Schéma de dégradé linéaire pour définir les couleurs des différents éléments du graphique

:::

**Exemple**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Description}
Mapping de couleur utilisé pour associer les valeurs de données à des couleurs spécifiques

:::

**Exemple**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Description}
Configuration de couleur positive/négative; définit la couleur des valeurs positives dans le graphique

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Description}
Configuration de couleur positive/négative; définit la couleur des valeurs négatives dans le graphique

:::


## label

**Type:** `Label | undefined`

:::note{title=Description}
Étiquette



Configuration des étiquettes pour définir les étiquettes de données du graphique, y compris leur position, leur format et leur style.

:::


### enable

**Type:** `false | true`

:::note{title=Description}
Indique si la fonction de étiquette est activée

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les étiquettes passent à la ligne suivante

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les étiquettes affichent les valeurs des mesures

Dans les scénarios multi-mesures, il n’y a pas de risque de conflit de valeurs, car toutes les mesures liées au tracé passent par le traitement `foldMeasures` et sont fusionnées en une mesure représentant un seul point de données

Remarque : le étiquette de encoding a une priorite plus elevee ; cette configuration n affecte pas le étiquette de encoding

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les étiquettes affichent le pourcentage des valeurs des mesures

Dans les scénarios multi-mesures, il n’y a pas de risque de conflit de valeurs, car toutes les mesures liées au tracé passent par le traitement `foldMeasures` et sont fusionnées en une mesure représentant un seul point de données

Remarque : le étiquette de encoding a une priorite plus elevee ; cette configuration n affecte pas le étiquette de encoding

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les étiquettes affichent les étiquettes de dimension

Afficher toutes les etiquettes de dimension

Remarque : le étiquette de encoding a une priorite plus elevee ; cette configuration n affecte pas le étiquette de encoding

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les valeurs des étiquettes sont formatées automatiquement; lorsque autoFormat vaut true, la configuration numFormat est ignorée

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Configuration du format des valeurs d’étiquette; fusionnée avec `format` dans `measure`, où le `format` de `measure` a une priorité plus élevée. numFormat a une priorité plus faible qu’autoFormat

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}
Type de format numérique, prend en charge: number (décimal), percent (%), permille (‰), notation scientifique

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
Décimales pour le formatage numérique, avec minimumFractionDigits et maximumFractionDigits d’Intl.NumberFormat du navigateur; priorité plus faible que significantDigits

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
Chiffres significatifs pour le formatage numérique, avec minimumSignificantDigits et maximumSignificantDigits d’Intl.NumberFormat du navigateur; priorité plus élevée que fractionDigits

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
Priorité d’arrondi pour le formatage numérique lorsque significantDigits et fractionDigits sont tous deux définis; utilise Intl.NumberFormat du navigateur et suit les mêmes règles que roundingPriority d’Intl.NumberFormat

:::

**Exemple**
\- 1234.5678 est converti en 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 est converti en 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Mode d’arrondi pour le formatage numérique, avec Intl.NumberFormat du navigateur et les mêmes règles que roundingMode d’Intl.NumberFormat

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Taille de police du étiquette

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}
Graisse de police du étiquette

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur d’arrière-plan du étiquette

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Description}
Couleur du contour du étiquette

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de police du étiquette

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la couleur de police du étiquette est inversée automatiquement selon la couleur de l’élément graphique

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Description}
Position du étiquette

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si l’évitement du chevauchement des étiquettes est activé

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Filtrage des étiquettes; la relation par défaut entre les sélecteurs est OR

:::


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
\- Utilise les fonctions utilitaires intégrées pour les opérations de données




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


## legend

**Type:** `Legend | undefined`

:::note{title=Description}
Légende

Configuration de la légende du graphique, incluant sa position, son format et son style.
:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la fonction de légende est activée
:::

**Exemple**
\- Interdit: eval, Function, opérations asynchrones, API DOM, requêtes réseau



### border

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la bordure de la legende est activee.
:::

:::warning{title=Warning}
Efficace uniquement pour les légendes discrètes
:::

**Exemple**
Mettre en évidence le champ sales pour les éléments dont sales est supérieur à 1000



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
Couleur des icônes du pager désactivées

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Taille de police de la légende
:::

**Exemple**
Champ de dimension, ID d'un élément de dimension



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
\- in: sélectionne les éléments dont la valeur du champ de dimension est dans value



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Description}
Forme de légende
:::

:::warning{title=Warning}
Efficace uniquement pour les légendes discrètes
:::

**Exemple**
\- not in: sélectionne les éléments dont la valeur du champ de dimension n'est pas dans value



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Description}
Position de la légende
:::

**Exemple**
Opérateur



### maxSize

**Type:** `number | undefined`

:::note{title=Description}
Nombre maximal de colonnes ou de lignes lorsque les éléments de légende sont nombreux





:::

:::warning{title=Warning}
Efficace uniquement pour les légendes discrètes
:::

**Exemple**
\- not in: sélectionne les éléments dont la valeur du champ de dimension n'est pas dans value




## regionPadding

**Type:** `RegionPadding | undefined`

:::note{title=Description}
Marge interne de la zone de tracé



Mappé à VChart region[0].padding, réserve de l’espace pour les éléments qui dépassent de la zone de tracé, comme les annotations et les étiquettes.

:::


### top

**Type:** `number | undefined`

### right

**Type:** `number | undefined`

### bottom

**Type:** `number | undefined`

### left

**Type:** `number | undefined`


## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Description}
Infobulles

Configuration des infobulles du graphique, y compris position, format, style, etc.
:::


### enable

**Type:** `false | true`

:::note{title=Description}
Indique si la fonction d'infobulle est activée
:::


## brush

**Type:** `Brush | undefined`

:::note{title=Description}
Configuration de sélection brush du graphique









:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la sélection brush est activée

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Description}
Type de brush

Définit la forme et la direction de sélection du brush

\- `rect` : sélection brush rectangulaire, possible simultanément dans les directions des axes X et Y

\- `polygon` : sélection brush polygonale, trace un polygone libre en cliquant plusieurs points pour sélectionner

\- `x` : sélection brush selon l’axe X uniquement, sans restriction selon l’axe Y

\- `y` : sélection brush selon l’axe Y uniquement, sans restriction selon l’axe X
:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Description}
\- `multiple`: mode multiple, où plusieurs sélections brush peuvent coexister simultanément



Définit le mode de sélection brush


\- `multiple`: mode de sélection multiple; plusieurs zones brush peuvent exister en même temps

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la zone brush est supprimée à la fin de la sélection

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
Opacité



Opacité des points de données sélectionnés, plage 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Description}
Couleur du trait

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
Opacité



Opacité des points de données non sélectionnés, plage 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Description}
Couleur du trait

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Largeur du contour
:::


## animation

**Type:** `LineAreaAnimation | undefined`

:::note{title=Description}
Configuration de l’animation



Configuration d’animation du graphique; les effets disponibles dépendent du type de graphique

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si l’animation du graphique en lignes/aires est activée

:::

### params

**Type:** `LineAreaAnimationParams | undefined`

:::note{title=Description}
Paramètres d’animation pour les graphiques en lignes/aires

:::


#### appear

**Type:** `LineAreaAppearAnimation | undefined`

:::note{title=Description}
Animation d’apparition pour les graphiques en lignes/aires

:::


##### effects

**Type:** `("load" | "growth")[] | undefined`

:::note{title=Description}
Effets d’apparition pour les graphiques en lignes/aires; prend en charge les animations de chargement et de croissance

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la phase d’animation actuelle est activée

:::

##### ease

**Type:** `string | undefined`

:::note{title=Description}
Fonction d’easing de l’animation

:::

##### duration

**Type:** `number | undefined`

:::note{title=Description}
Durée de l’animation en millisecondes

:::

##### color

**Type:** `string | undefined`

:::note{title=Description}
Couleur de surbrillance ou d’atmosphère de l’animation

:::

#### update

**Type:** `LineAreaUpdateAnimation | undefined`

:::note{title=Description}
Animation de mise à jour pour les graphiques en lignes/aires

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=Description}
Effets de mise à jour pour les graphiques en lignes/aires; prend en charge l’animation de croissance

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la phase d’animation actuelle est activée

:::

##### ease

**Type:** `string | undefined`

:::note{title=Description}
Fonction d’easing de l’animation

:::

##### duration

**Type:** `number | undefined`

:::note{title=Description}
Durée de l’animation en millisecondes

:::

##### color

**Type:** `string | undefined`

:::note{title=Description}
Couleur de surbrillance ou d’atmosphère de l’animation

:::

#### loop

**Type:** `LineAreaAnimationLoop | undefined`

:::note{title=Description}
Animation en boucle pour les graphiques en lignes/aires

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si l’animation en boucle est activée

:::

##### interval

**Type:** `number | undefined`

:::note{title=Description}
Intervalle de l’animation en boucle en millisecondes

:::

##### loop

**Type:** `LineAreaLoopAnimation | undefined`

:::note{title=Description}
Animation en boucle pour les graphiques en lignes/aires

:::


###### effects

**Type:** `LineAreaLoopEffect[] | undefined`

:::note{title=Description}
Effet de boucle pour les graphiques en lignes/aires

:::

###### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la phase d’animation actuelle est activée

:::

###### ease

**Type:** `string | undefined`

:::note{title=Description}
Fonction d’easing de l’animation

:::

###### duration

**Type:** `number | undefined`

:::note{title=Description}
Durée de l’animation en millisecondes

:::

###### color

**Type:** `string | undefined`

:::note{title=Description}
Couleur de surbrillance ou d’atmosphère de l’animation

:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=Description}
Animation d’atmosphère pour les graphiques en lignes/aires

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
Effet d’animation d’atmosphère; prend en charge les effets d’ondulation, de visibilité et de respiration

:::


## xAxis

**Type:** `XBandAxis | undefined`

:::note{title=Description}
Axe X



Axe de catégorie. Configuration de l’axe X pour définir la position, le format, le style et les paramètres associés.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si l’axe est visible
:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si l’axe est affiche en sens inverse; effectif uniquement pour les axes numeriques
:::

### zero

**Type:** `boolean | undefined`

:::note{title=Description}
Indique s’il faut forcer l’affichage de la valeur 0 sur l’axe. Si min et max sont configures, cette option est inactive. Effectif uniquement pour les axes numeriques.
:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=Description}
Masquage automatique des etiquettes d’axe: si deux etiquettes se chevauchent, l’etiquette en chevauchement est masquee automatiquement. Effectif uniquement pour les axes categoriels.
:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=Description}
Intervalle de masquage automatique des etiquettes d’axe: si l’intervalle entre deux etiquettes est inferieur a autoHideGap, l’etiquette en chevauchement est masquee automatiquement. Effectif uniquement pour les axes categoriels.

Lorsque autoHide est active, autoHide est utilise et configure via autoHideSeparation.

Lorsque autoHide est desactive, l’echantillonnage est utilise et configure via minGap.
:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=Description}
Rotation automatique des etiquettes d’axe: lorsque la largeur de l’etiquette depasse la longueur de l’axe, l’etiquette pivote automatiquement. Effectif uniquement pour les axes categoriels.
:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=Description}
Plage d’angles de rotation automatique des etiquettes d’axe. Effectif uniquement pour les axes categoriels.
:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=Description}
Limitation automatique des etiquettes d’axe: lorsque la largeur de l’etiquette depasse la longueur de l’axe, le depassement est affiche avec des points de suspension et l’etiquette complete est visible au survol. Effectif uniquement pour les axes categoriels.
:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=Description}
Longueur maximale pour la limitation automatique des etiquettes d’axe: lorsque le texte depasse cette longueur, le depassement est affiche avec des points de suspension et l’etiquette complete est visible au survol. Effectif uniquement pour les axes categoriels.
:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Description}
Etiquettes de graduation de l’axe X
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les etiquettes sont visibles
:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur des etiquettes
:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Taille de police des etiquettes
:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Graisse de police des etiquettes
:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Description}
Angle de rotation des etiquettes
:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Ligne de l’axe X
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la ligne d’axe est visible
:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de la ligne d’axe
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Largeur de la ligne d’axe
:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Description}
Graduations de l’axe X
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les graduations sont visibles
:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les graduations pointent vers l’interieur
:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur des graduations
:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Description}
Taille des graduations
:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Description}
Titre de l’axe X
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si le titre est visible
:::

#### titleText

**Type:** `string | undefined`

:::note{title=Description}
Texte du titre; suit par defaut la configuration du champ
:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur du titre
:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Description}
Taille de police du titre
:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Graisse de police du titre
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
selector = [{ profit: 100 }, { profit: 200 }]
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
Configuration d’animation de l’axe X
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
Axe Y



Axe numérique. Configuration de l’axe Y pour définir la position, le format, le style et les paramètres associés.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si l’axe est visible
:::

### min

**Type:** `number | undefined`

:::note{title=Description}
Ligne d’axe width

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Description}
Graduations de l axe X

:::

### log

**Type:** `boolean | undefined`

:::note{title=Description}
Indique s’il faut utiliser un axe logarithmique, uniquement valable pour les axes numériques

:::

### logBase

**Type:** `number | undefined`

:::note{title=Description}
Fonction d’assouplissement de l’animation.

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Description}
Configuration de l’axe Y (axe catégoriel) utilisée pour définir l’axe Y, notamment la position, le format, le style, etc.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si l’axe est affiche en sens inverse; effectif uniquement pour les axes numeriques
:::

### zero

**Type:** `boolean | undefined`

:::note{title=Description}
Indique s’il faut forcer l’affichage de la valeur 0 sur l’axe. Si min et max sont configures, cette option est inactive. Effectif uniquement pour les axes numeriques.
:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les étiquettes de ticks de l’axe numérique sont formatés automatiquement. Ne s’applique qu’aux axes numériques. Lorsque autoFormat vaut true, numFormat est ignoré.
:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Formatage numérique des axes numériques. S’applique uniquement aux axes numeriques et a une priorité inférieure à autoFormat.
:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}
Type de format numérique, prend en charge: number (décimal), percent (%), permille (‰), notation scientifique

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
Décimales pour le formatage numérique, avec minimumFractionDigits et maximumFractionDigits d’Intl.NumberFormat du navigateur; priorité plus faible que significantDigits

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
Chiffres significatifs pour le formatage numérique, avec minimumSignificantDigits et maximumSignificantDigits d’Intl.NumberFormat du navigateur; priorité plus élevée que fractionDigits

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
Priorité d’arrondi pour le formatage numérique lorsque significantDigits et fractionDigits sont tous deux définis; utilise Intl.NumberFormat du navigateur et suit les mêmes règles que roundingPriority d’Intl.NumberFormat

:::

**Exemple**
\- 1234.5678 est converti en 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 est converti en 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Mode d’arrondi pour le formatage numérique, avec Intl.NumberFormat du navigateur et les mêmes règles que roundingMode d’Intl.NumberFormat

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Description}
Etiquettes de graduation de l’axe X
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les etiquettes sont visibles
:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur des etiquettes
:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Taille de police du étiquette

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Graisse de police du étiquette

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
\- 100000 est converti en 10万, ratio:10000, symbol:"万"
:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Description}
order: 'asc',
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Suffixe du format numérique
:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les graduations pointent vers l’interieur
:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Description}
Configuration du tri de la legende ; prend en charge le tri selon les dimensions ou les mesures, ainsi que les ordres personnalises ; le tableau sort suit l ordre de gauche a droite ou de haut en bas.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Description}
Taille des graduations
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
Texte du titre; suit par defaut la configuration du champ
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
selector = [{ profit: 100 }, { profit: 200 }]
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


## crosshairLine

**Type:** `CrosshairLine | undefined`

:::note{title=Description}
Ligne guide verticale

Ligne guide verticale affichee lorsque la souris se deplace sur le graphique.

Configuration de crosshair, utilisee pour afficher des lignes de visee (lignes guide) dans le graphique.
:::


### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la ligne de visee est affichee

:::

### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de la ligne de visee

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de l etiquette de la ligne de visee

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si le libellé de la ligne de visée est affiché

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur d arriere-plan de l etiquette de la ligne de visee

:::


## sort

**Type:** `Sort | undefined`

:::note{title=Description}
Configuration du tri de l’axe X, prend en charge le tri par dimension ou mesure ainsi qu’un ordre personnalise

Configuration du tri de l’axe categoriel, prend en charge le tri par dimension ou mesure ainsi qu’un ordre personnalise
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

\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Description}
Ordre de tri, valeurs possibles: 'asc' ou 'desc'
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
Ordre personnalise applique directement a l’axe categoriel
:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=Description}
Configuration du tri de la legende, prend en charge le tri par dimension ou mesure ainsi qu’un ordre personnalise

Configuration du tri de la legende; le tableau de tri suit l’ordre de gauche a droite ou de haut en bas
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

\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Description}
Ordre de tri, valeurs possibles: 'asc' ou 'desc'
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
Ordre personnalise applique directement a la legende; ordre croissant de gauche a droite ou de haut en bas, ordre decroissant de droite a gauche ou de bas en haut
:::


## theme

**Type:** `Theme | undefined`

:::note{title=Description}
Theme du graphique. Le theme est une configuration fonctionnelle de priorite plus faible; il contient les reglages communs a tous les types de graphiques et les reglages communs a une categorie de graphique.

Deux themes integres sont disponibles: light et dark. Les utilisateurs peuvent personnaliser les themes via Builder.

Theme

Les themes integres light et dark sont disponibles; un nouveau theme peut etre personnalise via registerTheme.
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
Style du marqueur de point



Configuration du style du marqueur de point, utilisée pour définir le style des marqueurs de point du graphique, notamment la couleur, la bordure, etc.

Prend en charge la configuration de style globale ou conditionnelle

Filtre de données

Si selector est configuré, quatre capacités de correspondance des données sont disponibles : selector numérique, selector de données locales, selector de dimension conditionnelle et selector de mesure conditionnelle

Si selector n’est pas configuré, le style s’applique globalement.
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
Chiffres significatifs du format numérique, utilise minimumSignificantDigits et maximumSignificantDigits d'Intl.NumberFormat du navigateur; priorité supérieure à fractionDigits




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




## lineStyle

**Type:** `LineStyle | LineStyle[] | undefined`

:::note{title=Description}
Style du marqueur de ligne



Configuration du style du marqueur de ligne, utilisée pour définir le style des marqueurs de ligne du graphique, notamment la couleur, l’opacité, la courbe, etc.

Prend en charge la configuration de style globale ou conditionnelle

Filtre de données

Si selector est configuré, quatre capacités de correspondance des données sont disponibles : selector numérique, selector de données locales, selector de dimension conditionnelle et selector de mesure conditionnelle

Si selector n’est pas configuré, le style s’applique globalement.
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
Sélecteur de données




## areaStyle

**Type:** `AreaStyle | AreaStyle[] | undefined`

:::note{title=Description}
Style du marqueur de zone



Configuration du style du marqueur de zone, utilisée pour définir le style des marqueurs de zone du graphique, notamment la couleur, l’opacité, la bordure, etc.

Prend en charge la configuration de style globale ou conditionnelle

Filtre de données

Si selector est configuré, quatre capacités de correspondance des données sont disponibles : selector numérique, selector de données locales, selector de dimension conditionnelle et selector de mesure conditionnelle

Si selector n’est pas configuré, le style s’applique globalement.
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
\- S'exécute de façon sûre dans l'environnement navigateur (sandbox Web Worker)




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
\- in: sélectionne les éléments dont la valeur du champ de dimension est dans value



\- not in: sélectionne les éléments dont la valeur du champ de dimension n'est pas dans value

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Selecteur des points d’annotation, utilise pour selectionner les points de donnees.
:::


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

### measureId

**Type:** `string | undefined`

:::note{title=Description}
Spécifie l’id de mesure auquel appartient le point d’annotation. Dans les scénarios à plusieurs mesures, il peut être combiné avec selector pour localiser précisément le point d’annotation de la mesure cible.
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

### text

**Type:** `string | string[] | undefined`

:::note{title=Description}
'red'

:::

**Exemple**
'Texte du repère'



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
Alignement du texte. En général, définissez right pour afficher le texte à gauche du point d’annotation et le garder dans la zone visible du graphique

Il est recommandé d’utiliser 'right' afin que le texte soit à gauche du point d’annotation

right: le texte est à gauche du point d’annotation, son bord droit est aligné sur le point

left: le texte est à droite du point d’annotation, son bord gauche est aligné sur le point

center: le texte est centré sur le point d’annotation

:::

**Exemple**
'right' le texte est à gauche du point d’annotation
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
'top' le texte est sous le point d’annotation
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
Couleur du texte

:::

**Exemple**
\- in: sélectionne les éléments dont la valeur du champ de dimension est dans value



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
Rayon des coins de la bordure d’arrière-plan

:::

**Exemple**
4
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Description}
Marge intérieure de l’arrière-plan

:::

**Exemple**
Filtre animé (exécution de code généré par IA)



### offsetY

**Type:** `number | undefined`

:::note{title=Description}




Indique si l arriere-plan est visible.

:::

**Exemple**
Convient aux scénarios difficiles à exprimer avec des selectors statiques, comme le Top N, l’analyse statistique et les conditions complexes.



### offsetX

**Type:** `number | undefined`

:::note{title=Description}
Décalage en pixels de l’ensemble du point d’annotation dans la direction X. Lorsque le point est à gauche du graphique (début de l’axe catégoriel), une valeur positive est recommandée; lorsqu’il est à droite (fin de l’axe catégoriel), une valeur négative est recommandée.

Une valeur négative décale l’ensemble vers la gauche; par exemple -10 décale le point, le texte et l’arrière-plan de 10 pixels vers la gauche

Une valeur positive décale l’ensemble vers la droite; par exemple 10 décale le point, le texte et l’arrière-plan de 10 pixels vers la droite

:::

**Exemple**
offsetX: 5, le point d’annotation entier est décalé de 5 pixels vers la droite
## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Description}
Ligne d’annotation de valeur de dimension, affichée verticalement, avec position et style configurables

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Description}
);
:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Description}
Filtre dynamique (exécution de code généré par l’IA)

Calcule dynamiquement la valeur de la ligne d’annotation via du code JavaScript généré par l’IA.

Convient lorsque la position de la ligne d’annotation doit être déterminée dynamiquement à partir des données, comme moyenne, maximum, quantile ou ligne métier.

Prend uniquement en charge les environnements de navigateur (Web Worker requis).
:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Description des besoins de filtrage de l’utilisateur (langage naturel).
:::

**Exemple**
Exigences d’environnement : seuls les environnements navigateur sont pris en charge ; les environnements Node.js utilisent le fallback.

Remarque: selector et dynamicFilter ne peuvent pas être utilisés simultanément; dynamicFilter a une priorité plus élevée



#### code

**Type:** `string`

:::note{title=Description}
\- Paramètres d’entrée: data (tableau), où chaque élément inclut un champ __row_index représentant le numéro de ligne



\- __row_index représente le numéro de ligne de l’élément de données d’origine; field représente le champ à mettre en surbrillance






\- Interdit: eval, Function, opérations asynchrones, DOM API, requêtes réseau

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
Solution de repli lorsque l'exécution du code échoue ou que l'environnement n'est pas pris en charge
:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Description}
Résultat d'exécution du filtre animé (champ runtime)



Écrit pendant la phase prepare(), en lecture seule à l'exécution
:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Description}
'red'

:::

**Exemple**
'Texte du repère'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Description}
Valeurs du champ de dimension selectionnees ; prend en charge les tableaux.

:::

**Exemple**
\- Peut uniquement utiliser les fonctions utilitaires intégrées (accessibles via _ ou R)



### textColor

**Type:** `string | undefined`

:::note{title=Description}
4

:::

**Exemple**
\- Doit retourner un tableau de combinaisons index de ligne et champ: Array<{ __row_index: number, field: string }>



### textFontSize

**Type:** `number | undefined`

:::note{title=Description}
[2, 2]

:::

**Exemple**
\- Interdit: eval, Function, opérations asynchrones, API DOM, requêtes réseau



### textFontWeight

**Type:** `number | undefined`

:::note{title=Description}
0

:::

**Exemple**
Mettre en évidence l'élément ayant la marge bénéficiaire la plus élevée dans chaque zone



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
middle : le texte est centre verticalement dans la zone d annotation.









:::

**Exemple**
\- not in: sélectionne les éléments dont la valeur du champ de dimension n'est pas dans value



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Opacité de la couleur de la zone d’annotation
:::

**Exemple**
Opérateur



### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de bordure de la zone d annotation.

:::

**Exemple**
\- not in: sélectionne les éléments dont la valeur du champ de dimension n'est pas dans value



### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Largeur de bordure de la zone d annotation.

:::

**Exemple**
Sélectionne les éléments par valeur de champ de dimension; prend en charge les tableaux



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Rayon des angles de bordure de la zone d annotation.

:::

**Exemple**
Écrit pendant la phase prepare(), en lecture seule à l'exécution



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
Couleur du texte

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
Rayon des coins de la bordure d’arrière-plan

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




## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=Description}
Ligne d’annotation numérique, comprenant les lignes de moyenne, de maximum et de minimum. Elle est affichée horizontalement et peut être configurée par position et par style. Utilisez cette configuration pour tracer des lignes d’annotation de valeurs numériques, comme des lignes de moyenne.

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Description}
Valeur Y fixe utilisée pour annoter une ligne horizontale. Si l’axe catégoriel est dans la direction Y, vous pouvez saisir une valeur de dimension; si l’axe numérique est dans la direction Y, vous pouvez saisir une valeur numérique précise.

:::
### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Description}
Filtre dynamique (exécution de code généré par l’IA)

Calcule dynamiquement la valeur de la ligne d’annotation via du code JavaScript généré par l’IA.

Convient lorsque la position de la ligne d’annotation doit être déterminée dynamiquement à partir des données, comme moyenne, maximum, quantile ou ligne métier.

Prend uniquement en charge les environnements de navigateur (Web Worker requis).
:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Description des besoins de filtrage de l’utilisateur (langage naturel).
:::

**Exemple**
"Obtenir la valeur de ventes la plus élevée comme référence de ligne de repère"

"Calculer les ventes moyennes pour la ligne de repère"



#### code

**Type:** `string`

:::note{title=Description}
\- Paramètres d’entrée: data (tableau), où chaque élément inclut un champ __row_index représentant le numéro de ligne



\- __row_index représente le numéro de ligne de l’élément de données d’origine; field représente le champ à mettre en surbrillance






\- Interdit: eval, Function, opérations asynchrones, DOM API, requêtes réseau

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
Solution de repli lorsque l'exécution du code échoue ou que l'environnement n'est pas pris en charge
:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Description}
Résultat d'exécution du filtre animé (champ runtime)



Écrit pendant la phase prepare(), en lecture seule à l'exécution
:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Description}
'red'

:::

**Exemple**
'Texte du repère'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Description}
2





:::

**Exemple**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Description}
4

:::

**Exemple**
Champ de dimension, ID d'un élément de dimension



### textFontSize

**Type:** `number | undefined`

:::note{title=Description}
[2, 2]

:::

**Exemple**
\- in: sélectionne les éléments dont la valeur du champ de dimension est dans value



### textFontWeight

**Type:** `number | undefined`

:::note{title=Description}
0

:::

**Exemple**
Opérateur



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Description}
Alignement du texte. En général, aucun réglage n’est nécessaire

Il est recommandé d’utiliser 'right' afin que le texte soit à gauche de la ligne d’annotation

right: le texte est à gauche de la ligne de référence, son bord droit est aligné sur l’extrémité de la ligne d’annotation horizontale

left: le texte est à droite de la ligne de référence, son bord gauche est aligné sur l’extrémité de la ligne d’annotation horizontale

center: le texte est centré sur la ligne de référence

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
Capacités principales:



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur du texte

:::

**Exemple**
\- Utilise les fonctions utilitaires intégrées pour les opérations de données



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Largeur de bordure de l’arrière-plan



Largeur de bordure de l’arrière-plan

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
Marge intérieure de l’arrière-plan

:::

**Exemple**
Configuration du filtre animé du graphique



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Opacité de la couleur de la zone d’annotation



Opacité de la couleur de la zone d’annotation
:::

**Exemple**
Implémente le filtrage des marqueurs du graphique (barres, points, etc.) via du code JavaScript généré par IA



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
Code JavaScript de filtrage généré par IA



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Rayon des angles de bordure de la zone d annotation.

:::

**Exemple**
\- Paramètre d'entrée: data (tableau), chaque élément contient un champ __row_index représentant le numéro de ligne



### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=Description}
Style de tirets de la bordure de la zone d annotation.

:::


#### positiveColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur principale de la partie supérieure à la valeur d’annotation
:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Description}
0

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Description}
Zone d’annotation

Configuration de zone d’annotation; definit, a partir des donnees selectionnees, la position et le style de la zone d’annotation.
:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Description}
Indique si la fonction de liaison de dimension est activee lorsque la perspective est activee sur le graphique ou lorsque les mesures sont combinees.

:::


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

### text

**Type:** `string | string[] | undefined`

:::note{title=Description}
'red'

:::

**Exemple**
Opérateur



### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title=Description}
2

:::

**Exemple**
\- not in: sélectionne les éléments dont la valeur du champ de dimension n'est pas dans value



### textColor

**Type:** `string | undefined`

:::note{title=Description}
4

:::

**Exemple**
Sélectionne les éléments par valeur de champ de dimension; prend en charge les tableaux



### textFontSize

**Type:** `number | undefined`

:::note{title=Description}
[2, 2]

:::

**Exemple**
Écrit pendant la phase prepare(), en lecture seule à l'exécution



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
'center' le texte se trouve au centre de la zone de repère



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}








Ordre de la regression polynomiale

:::

**Exemple**
'top' le texte se trouve en bas de la zone de repère



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
Couleur du texte



Couleur du texte

:::

**Exemple**
\- in: sélectionne les éléments dont la valeur du champ de dimension est dans value



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
Rayon des coins de la bordure d’arrière-plan



Rayon des coins de la bordure d’arrière-plan

:::

**Exemple**
4
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Description}
Marge intérieure de l’arrière-plan

:::

**Exemple**
\- not in: sélectionne les éléments dont la valeur du champ de dimension n'est pas dans value



### areaColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de la zone de repère

:::

**Exemple**
Sélectionne les éléments par valeur de champ de dimension; prend en charge les tableaux



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
Filtre animé (exécution de code généré par IA)



### areaBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Largeur de bordure de la zone d’annotation
:::

**Exemple**
Implémente une logique complexe de filtrage des données via du code JavaScript généré par IA



### areaBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
Rayon de bordure de la zone d’annotation
:::

**Exemple**
Convient aux scénarios difficiles à exprimer avec des selectors statiques, comme le Top N, l’analyse statistique et les conditions complexes.



### areaLineDash

**Type:** `number[] | undefined`

:::note{title=Description}
Style de ligne de bordure de la zone d’annotation
:::

**Exemple**
Capacités principales:



### outerPadding

**Type:** `number | undefined`

:::note{title=Description}
Marge de la zone de repère

:::

**Exemple**
\- Utilise les fonctions utilitaires intégrées pour les opérations de données




## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=Description}
Indique s’il faut activer la liaison des dimensions lorsque le pivot ou le regroupement des mesures est activé sur le graphique

Au survol d’une valeur de dimension, met en évidence les données ayant la même valeur de dimension dans les autres graphiques



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
Language



Configuration de la langue du graphique. Prend en charge 'zh\-CN' et 'en\-US'; il est aussi possible d’appeler intl.setLocale('zh\-CN') pour définir la langue

:::
