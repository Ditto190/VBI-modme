# TreeMap

:::info{title=Mappage d'encodage}
Le graphique treemap prend en charge les canaux visuels suivants :

`color` : canal de couleur, prend en charge `plusieurs dimensions` ou `une mesure`

`label` : canal d'étiquette, prend en charge `plusieurs dimensions` et `plusieurs mesures`

`tooltip` : canal d'infobulle, prend en charge `plusieurs dimensions` et `plusieurs mesures`

:::

:::note{title=Description}
Le graphique treemap sert à afficher des données hiérarchiques, la taille de chaque zone rectangulaire représentant sa valeur numérique.

Scénarios adaptés :

\- Afficher la répartition en pourcentage de données hiérarchiques

\- Mettre en évidence la relation entre le tout et ses parties

:::

:::warning{title=Warning}
Exigences de données :

\- Au moins 1 champ numérique pour mapper la taille de la surface

\- Au moins 1 champ de dimension pour le découpage hiérarchique

:::


## chartType

**Type:** `"treeMap"`

:::note{title=Description}
Graphique treemap



Graphique treemap affichant les relations proportionnelles des données hiérarchiques.

:::

**Exemple**
'treeMap'




## dataset

**Type:** `Record[]`

:::note{title=Description}
Jeu de données



Jeu de données agrégé conforme aux spécifications TidyData, utilisé pour définir la source et la structure des données du graphique.

:::

**Exemple**
[{category:'A', value:30}, {category:'B', value:70}]




## dimensions

**Type:** `HierarchyDimension[] | undefined`

:::note{title=Description}
Champs de dimension



Configuration des dimensions utilisée pour définir la structure hiérarchique des données.
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

**Type:** `"tooltip" | "label" | "hierarchy" | undefined`

:::note{title=Description}
Canal auquel la dimension est mappée

\- hierarchy : permet de mapper plusieurs dimensions au canal hiérarchique

\- label : permet de mapper plusieurs dimensions au canal d'étiquette

\- tooltip : permet de mapper plusieurs dimensions au canal d'infobulle

:::

:::tip{title=Astuce}
La première dimension est directement mappée au canal de couleur.

:::


## measures

**Type:** `HierarchyMeasure[] | undefined`

:::note{title=Description}
Mesures



Configuration des mesures utilisée pour définir la taille (surface) des secteurs.

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

**Type:** `"tooltip" | "label" | "size" | undefined`

:::note{title=Description}
Canal auquel la mesure est mappée

\- size : mesure mappée au canal de taille, utilisée pour afficher la surface ou la taille dans les graphiques comme Treemap et Sunburst.

\- label : mesure mappée au canal d'étiquette

\- tooltip : mesure mappée au canal d'infobulle

:::

### parentId

**Type:** `string | undefined`

:::note{title=Description}
Dans une configuration de mesures plate, construit un groupe de mesures en arbre. parentId pointe vers l'id du groupe de mesures parent et sert à construire l'arbre des mesures

:::

:::tip{title=Astuce}
Il existe deux façons de configurer l'arbre des mesures : l'option 1 configure directement un arbre de mesures avec children ; l'option 2 configure une liste plate de mesures avec parentId. Ces deux méthodes ne peuvent pas être utilisées simultanément

:::


## page

**Type:** `Page | undefined`

:::note{title=Description}
Configuration de pagination



Utilisé pour spécifier le nom du champ de pagination ; doit être une dimension

:::


### field

**Type:** `string`

:::note{title=Description}
Champ de pagination ; spécifie le nom du champ pour la pagination, doit être une dimension

:::

### currentValue

**Type:** `string`

:::note{title=Description}
Valeur de pagination actuelle ; spécifie la valeur utilisée pour déterminer la page courante

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
Couleur



Configuration des couleurs pour définir la palette du graphique, y compris les listes, mappages et dégradés de couleurs.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Description}
Palette de couleurs discrète utilisée pour définir les couleurs des différents éléments du graphique

:::

**Exemple**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Description}
Palette de dégradé linéaire utilisée pour définir les couleurs des différents éléments du graphique

:::

**Exemple**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Description}
Mappage de couleurs utilisé pour associer des valeurs de données à des couleurs spécifiques

:::

**Exemple**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Description}
Configuration des couleurs positives/négatives ; définit la couleur des valeurs positives dans le graphique

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Description}
Configuration des couleurs positives/négatives ; définit la couleur des valeurs négatives dans le graphique

:::


## label

**Type:** `Label | undefined`

:::note{title=Description}
Étiquette



Configuration des étiquettes pour définir les étiquettes de données du graphique, y compris leur position, format et style.

:::


### enable

**Type:** `false | true`

:::note{title=Description}
Indique si la fonction d'étiquette est activée

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

Dans les scénarios à plusieurs mesures, il n'y a pas de conflit de valeurs, car toutes les mesures liées au tracé passent par `foldMeasures` et sont fusionnées en une seule mesure représentant un point de données

Remarque : le label d'encoding a une priorité plus élevée ; cette configuration n'affecte pas le label d'encoding

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les étiquettes affichent le pourcentage des valeurs de mesure

Dans les scénarios à plusieurs mesures, il n'y a pas de conflit de valeurs, car toutes les mesures liées au tracé passent par `foldMeasures` et sont fusionnées en une seule mesure représentant un point de données

Remarque : le label d'encoding a une priorité plus élevée ; cette configuration n'affecte pas le label d'encoding

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les étiquettes affichent les libellés de dimension

Afficher tous les libellés de dimension

Remarque : le label d'encoding a une priorité plus élevée ; cette configuration n'affecte pas le label d'encoding

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les valeurs d'étiquette sont formatées automatiquement ; lorsque autoFormat vaut true, la configuration numFormat est ignorée

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Configuration du format des valeurs d’étiquette ; fusionnée avec `format` dans `measure`, où le `format` de `measure` a une priorité plus élevée. La priorité de numFormat est inférieure à autoFormat

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
ÉtiquettefontCouleur

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la couleur de police de l'étiquette s'inverse automatiquement selon la couleur de l'élément graphique

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Description}
Position de l'étiquette

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la fonction anti-chevauchement des étiquettes est activée

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Étiquette filtering; the default relationship between selectors is OR

:::


#### field

**Type:** `string`

:::note{title=Description}
Champ de dimension ; ID d'un élément de dimension spécifique

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Opérateur

\- in : sélectionne les éléments de données dont la valeur du champ de dimension est incluse dans la valeur spécifiée

\- not in : sélectionne les éléments de données dont la valeur du champ de dimension n'est pas incluse dans la valeur spécifiée

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Opérateur

\- in : sélectionne les éléments de données dont la valeur du champ de dimension est incluse dans la valeur spécifiée

\- not in : sélectionne les éléments de données dont la valeur du champ de dimension n'est pas incluse dans la valeur spécifiée

identique à operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Sélectionne les valeurs de champ de dimension ; prend en charge les tableaux

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Filtre dynamique (exécution de code généré par IA)

Implémente une logique complexe de filtrage de données via du code JavaScript généré par IA

Fonctionnalités principales :

\- Prend en charge des conditions de filtrage de données arbitrairement complexes

\- Utilise les fonctions utilitaires intégrées pour manipuler les données

\- Exécution sécurisée dans l'environnement navigateur (bac à sable Web Worker)

Exigences d'environnement : prend uniquement en charge les environnements navigateur ; les environnements Node.js utilisent fallback

Remarque : selector et dynamicFilter ne peuvent pas être utilisés simultanément ; dynamicFilter a une priorité plus élevée

Configuration du filtre dynamique du graphique

Implémente le filtrage des marques du graphique (barres, points, etc.) via du code JavaScript généré par IA

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Description des besoins de filtrage de l'utilisateur (langage naturel)

:::

**Exemple**
"Mettre en évidence les colonnes dont les ventes dépassent 1000"

"Mettre en évidence la colonne avec la marge bénéficiaire la plus élevée dans chaque zone"



#### code

**Type:** `string`

:::note{title=Description}
Code JavaScript de filtrage généré par IA

\- Seules les fonctions utilitaires intégrées peuvent être utilisées (accessibles via _ ou R)

\- Paramètres d'entrée : data (tableau), chaque élément incluant un champ __row_index représentant le numéro de ligne

\- Doit retourner un tableau de combinaisons d'index de ligne et de champ : Array<{ __row_index: number, field: string }>

\- __row_index représente le numéro de ligne de l'élément de données d'origine ; field représente le champ à mettre en évidence

\- Interdit : eval, Function, opérations asynchrones, API DOM, requêtes réseau

:::

**Exemple**
Mettre en évidence le champ sales des éléments de données dont les ventes dépassent 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Mettre en évidence les éléments de données avec la marge bénéficiaire la plus élevée dans chaque zone
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

Mettre en évidence les éléments de données filtrés par plusieurs conditions
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
Plan de fallback lorsque l'exécution du code échoue ou que l'environnement n'est pas pris en charge

:::


##### field

**Type:** `string`

:::note{title=Description}
Champ de dimension ; ID d'un élément de dimension spécifique

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Opérateur

\- in : sélectionne les éléments de données dont la valeur du champ de dimension est incluse dans la valeur spécifiée

\- not in : sélectionne les éléments de données dont la valeur du champ de dimension n'est pas incluse dans la valeur spécifiée

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Opérateur

\- in : sélectionne les éléments de données dont la valeur du champ de dimension est incluse dans la valeur spécifiée

\- not in : sélectionne les éléments de données dont la valeur du champ de dimension n'est pas incluse dans la valeur spécifiée

identique à operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Sélectionne les valeurs de champ de dimension ; prend en charge les tableaux

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Résultat d'exécution du filtre dynamique (champ runtime)

Écrit pendant la phase prepare() ; lecture seule à l'exécution

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`


## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Description}
Infobulles



Configuration des infobulles, utilisée pour définir les infobulles du graphique, y compris leur position, format, style, etc.

:::


### enable

**Type:** `false | true`

:::note{title=Description}
Indique si les infobulles sont activées

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Description}
Thème du graphique ; les thèmes ont une priorité plus faible et incluent les configurations communes à tous les types de graphiques ainsi que les configurations propres à chaque catégorie

Thèmes clair et sombre intégrés ; les utilisateurs peuvent définir des thèmes personnalisés via le Builder

Thème

Thèmes clair et sombre intégrés ; de nouveaux thèmes peuvent être personnalisés via registerTheme.

:::

**Exemple**
'dark'

'light'




### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Description}
Langue

Configuration de langue du graphique ; prend en charge 'zh-CN' et 'en-US'. La méthode intl.setLocale('zh-CN') peut aussi être appelée pour définir la langue.

:::
