# Table

:::info{title=Recommandé}
\- Configuration de champs recommandée : `n’importe quel` nombre de mesures, `n’importe quel` nombre de dimensions

\- Prend en charge la restructuration des données: au moins `n’importe quel` nombre de mesures, `n’importe quel` nombre de dimensions

:::

:::info{title=Mappage d’encodage}
Prend uniquement en charge la configuration de l’arbre des dimensions et de l’arbre des mesures; l’encodage par défaut se fait en colonnes.

:::

:::note{title=Description}
Tableau adapté aux scénarios d’affichage détaillé des données, avec des lignes et colonnes claires pour consulter facilement les valeurs précises.

Scénarios adaptés:

\- Afficher les enregistrements détaillés

\- Comparer précisément les éléments de données

\- Afficher les attributs de plusieurs dimensions

:::

:::warning{title=Avertissement}
Exigences de données:

\- Au moins 1 champ de dimension

\- Au moins 1 champ d’indicateur

\- Les champs de dimension sont utilisés comme en-têtes de colonnes du tableau

Fonctionnalités activées par défaut :

\- Le tri, le filtrage et la pagination sont activés par défaut

:::


## chartType

**Type:** `"table"`

:::note{title=Description}
Composant de tableau standard pour afficher des données détaillées

:::

**Exemple**
'table'




## dataset

**Type:** `Record[]`

:::note{title=Description}
Jeu de données agrégé conforme à la spécification TidyData, utilisé pour définir la source et la structure des données du graphique. Le jeu de données fourni par l’utilisateur ne nécessite aucun prétraitement; chaque champ correspond à une colonne et chaque enregistrement à une ligne.

:::

**Exemple**
[{id: 1, name: "A", value: 100}, {id: 2, name: "B", value: 200}]




## dimensions

**Type:** `DimensionTree | undefined`

:::note{title=Description}
Chaque dimension du tableau correspond à une colonne.

:::

**Exemple**
[{id: "name", alias: "Name"}]




### id

**Type:** `string`

### alias

**Type:** `string | undefined`

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

**Type:** `"row" | "column" | undefined`

:::note{title=Description}
Canal auquel la dimension est mappée

\- row: prend en charge le mapping de plusieurs dimensions vers le canal ligne

\- column: prend en charge le mapping de plusieurs dimensions vers le canal colonne

:::

### children

**Type:** `(TableDimension | DimensionGroup)[] | undefined`


#### id

**Type:** `string`

#### alias

**Type:** `string | undefined`

#### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=Description}
Configuration du format de date de la dimension

:::


##### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=Description}
Granularité temporelle, détermine la précision d'affichage de la date

:::

#### encoding

**Type:** `"row" | "column" | undefined`

:::note{title=Description}
Canal auquel la dimension est mappée

\- row: prend en charge le mapping de plusieurs dimensions vers le canal ligne

\- column: prend en charge le mapping de plusieurs dimensions vers le canal colonne

:::


## measures

**Type:** `MeasureTree | undefined`

:::note{title=Description}
Chaque mesure du tableau correspond à une ligne et prend nativement en charge les combinaisons de mesures.

:::

**Exemple**
[{id: "value", alias: "Value"}]




### id

**Type:** `string`

:::note{title=Description}
ID du groupe de mesures, doit être unique.

:::

### alias

**Type:** `string | undefined`

:::note{title=Description}
Alias du groupe de mesures, peut être dupliqué; par défaut l’ID est utilisé s’il n’est pas défini.

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
Formatage numérique personnalisé des mesures; appliqué automatiquement aux labels et tooltips

Remarque: pour utiliser un formatage personnalisé, vous devez définir explicitement autoFormat=false; sinon autoFormat remplacera cette configuration

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}
Type de format numérique. Prend en charge les nombres (décimaux), les pourcentages (%), les pourmilles (‰) et la notation scientifique

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
\- 1234.5678 se convertit en 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 se convertit en 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 se convertit en 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 se convertit en 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 se convertit en 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 se convertit en 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
Chiffres significatifs du format numérique, utilise minimumSignificantDigits et maximumSignificantDigits d'Intl.NumberFormat du navigateur; priorité supérieure à fractionDigits

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
Priorité d'arrondi du format numérique lorsque significantDigits et fractionDigits sont tous deux définis; utilise Intl.NumberFormat du navigateur et suit les mêmes règles que roundingPriority

:::

**Exemple**
\- 1234.5678 se convertit en 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 se convertit en 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



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
Type de format numérique. Prend en charge les nombres (décimaux), les pourcentages (%), les pourmilles (‰) et la notation scientifique

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
\- 1234.5678 se convertit en 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 se convertit en 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 se convertit en 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 se convertit en 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 se convertit en 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 se convertit en 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
Chiffres significatifs du format numérique, utilise minimumSignificantDigits et maximumSignificantDigits d'Intl.NumberFormat du navigateur; priorité supérieure à fractionDigits

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
Priorité d'arrondi du format numérique lorsque significantDigits et fractionDigits sont tous deux définis; utilise Intl.NumberFormat du navigateur et suit les mêmes règles que roundingPriority

:::

**Exemple**
\- 1234.5678 se convertit en 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 se convertit en 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Mode d'arrondi du format numérique, utilise Intl.NumberFormat du navigateur et suit les mêmes règles que roundingMode

:::

### encoding

**Type:** `"column" | undefined`

:::note{title=Description}
Canal auquel la mesure est mappée

\- column: colonne de mesure

:::

### parentId

**Type:** `string | undefined`

:::note{title=Description}
Dans la forme de configuration plate des mesures, construit un groupe de mesures en arbre. parentId pointe vers l'id du groupe parent, utilisé pour construire l'arbre de mesures

:::

:::tip{title=Tip}
Deux façons existent pour configurer l'arbre de mesures: l'option 1 consiste à configurer directement un arbre avec children; l'option 2 consiste à configurer une liste plate avec parentId. Ces deux méthodes ne peuvent pas être utilisées simultanément

:::

### children

**Type:** `(TableMeasure | MeasureGroup)[] | undefined`

:::note{title=Description}
Mesures enfants ou groupes de mesures dans le groupe de mesures.

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
La couleur d'arrière-plan peut être une chaîne de couleur (par ex. 'red', 'blue') ou une valeur hex, rgb ou rgba (par ex. '#ff0000', 'rgba(255,0,0,0.5)')

:::


## borderColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de bordure du tableau

:::


## bodyFontSize

**Type:** `number | undefined`

:::note{title=Description}
Taille de police du corps du tableau

:::


## bodyFontColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de police du corps du tableau

:::


## bodyBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur d’arrière-plan du corps du tableau

:::


## headerFontSize

**Type:** `number | undefined`

:::note{title=Description}
Header font size

:::


## headerFontColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de police de l’en-tête

:::


## headerBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur d’arrière-plan de l’en-tête

:::


## hoverHeaderBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Background color when the mouse hovers over a header cell, used to highlight the hovered cell.

:::


## hoverHeaderInlineBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur d’arrière-plan de toute la ligne lorsque la souris survole l’en-tête, utilisée pour mettre en évidence la ligne survolée.

:::


## selectedBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de bordure des cellules sélectionnées, utilisée pour mettre en évidence la sélection.

:::


## selectedBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur d’arrière-plan des cellules sélectionnées, utilisée pour mettre en évidence la sélection.

:::


## bodyCellStyle

**Type:** `BodyCellStyle | BodyCellStyle[] | undefined`

:::note{title=Description}
Définit une apparence spéciale pour les cellules du corps du tableau.

:::


### selector

**Type:** `Selector | Selectors | FieldSelector | undefined`

:::note{title=Description}
Sélecteur de données

Si un sélecteur est configuré, il fournit quatre types de capacités de correspondance des données : sélecteurs numériques, sélecteurs de données partielles, sélecteurs conditionnels de dimension et sélecteurs conditionnels de mesure.

Si aucun sélecteur n’est configuré, cette apparence s’applique globalement.

Remarque : selector et dynamicFilter ne peuvent pas être utilisés simultanément ; dynamicFilter a une priorité plus élevée.

:::

**Exemple**
Sélecteur numérique
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

Sélecteur de données partielles
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

Sélecteur conditionnel de dimension
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

Sélecteur conditionnel de mesure
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

Filtrage par colonne de champ
selector = {
field: 'category'
}
selector = {
field: ['category', 'profit']
}




#### field

**Type:** `string | string[]`

:::note{title=Description}
Nom du champ, peut être un champ unique ou un tableau de plusieurs champs.

:::

**Exemple**
Champ unique
field: 'sales'

Plusieurs champs
field: ['sales', 'profit', 'revenue']



#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Opérateur

\- in: Sélectionne les éléments de données dont la valeur du champ de dimension est dans le tableau value.

\- not in: Sélectionne les éléments de données dont la valeur du champ de dimension n’est pas dans le tableau value.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Opérateur

\- in: Sélectionne les éléments de données dont la valeur du champ de dimension est dans le tableau value.

\- not in: Sélectionne les éléments de données dont la valeur du champ de dimension n’est pas dans le tableau value.

identique à operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Sélectionne les valeurs du champ de dimension ; prend en charge les tableaux.

:::

### dynamicFilter

**Type:** `TableDynamicFilter | undefined`

:::note{title=Description}
Filtre dynamique (piloté par code)



Implémente une logique de filtrage de données complexe via du code JavaScript généré par IA.

Convient aux scénarios difficiles à exprimer avec des selectors statiques, comme le Top N, l’analyse statistique et les conditions complexes.



Fonctionnalités principales :

\- Prend en charge des conditions de filtrage de données arbitrairement complexes.

\- Utilise des fonctions utilitaires intégrées pour manipuler les données.

\- S’exécute de manière sûre dans l’environnement du navigateur (sandbox Web Worker).



Exigences d’environnement : seuls les environnements navigateur sont pris en charge ; les environnements Node.js utilisent le fallback.



Remarque : selector et dynamicFilter ne peuvent pas être utilisés simultanément ; dynamicFilter a une priorité plus élevée.



Configuration du filtre dynamique du tableau



Implémente un filtrage précis au niveau des cellules du tableau via du code JavaScript généré par IA.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Description des besoins de filtrage de l’utilisateur (langage naturel).

:::

**Exemple**
"Mettre en évidence les cellules dont les ventes sont supérieures à 1000"

"Mettre en évidence la cellule ayant la valeur maximale dans chaque ligne"



#### code

**Type:** `string`

:::note{title=Description}
Code JavaScript de filtrage généré par IA.



\- Peut uniquement utiliser les fonctions utilitaires intégrées (accessibles via _ ou R).

\- Paramètres d’entrée : data (array), chaque item contient un champ _index représentant le numéro de ligne.

\- Doit retourner un tableau de sélecteurs de cellule : Array<{ __row_index: number, field: string }>.

\- Lorsque field vaut "*", cela indique que toute la ligne est mise en évidence.

\- Interdit : eval, Function, opérations asynchrones, DOM API et requêtes réseau.

:::

**Exemple**
Top N filtering
dynamicFilter = {
type: 'row\-with\-field',
description: 'Mettre en évidence les 3 meilleurs produits par ventes',
code: `
const sorted = _.sortBy(data, 'sales');
const reversed = [...sorted].reverse();
const result = _.take(reversed, 3);
return _.flatten(
_.map(result, item => [
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

Filtrage multi-condition
dynamicFilter = {
type: 'row\-with\-field',
description: 'Highlight products with profit margin > 20% and sales > 5000',
code: `
const matched = _.filter(data, item => {
const profitRate = (item.profit / item.sales) * 100;
return profitRate > 20 && item.sales > 5000;
});
return _.flatten(
_.map(matched, item => [
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

Filtrage par valeur relative
dynamicFilter = {   *
type: 'row\-with\-field',
description: 'Mettre en évidence les produits dont les ventes sont supérieures à la moyenne',
code: `
const avgSales = _.meanBy(data, 'sales');
const matched = _.filter(data, item => item.sales > avgSales);
return _.flatten(
_.map(matched, item => [
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

Grouped filtering
dynamicFilter = {
type: 'row\-with\-field',
description: 'Highlight the product with the highest sales in each region',
code: `
const grouped = _.groupBy(data, 'region');
const topByRegion = _.map(_.values(grouped), group => _.maxBy(group, 'sales'));
return _.flatten(
_.map(topByRegion, item => [
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

Mettre toute la ligne en évidence
dynamicFilter = {
description: 'Highlight rows where sales are greater than profit',
code: `
const matched = _.filter(data, item => item.sales > item.profit);
return matched.map(item => ({
__row_index: item._index,
field: '*'
}));
`,
enabled: true
}



#### fallback

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Plan de fallback lorsque l’exécution du code échoue ou que l’environnement n’est pas pris en charge.

:::


##### field

**Type:** `string`

:::note{title=Description}
Champ de dimension ; ID d’un élément dans dimensions.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Opérateur

\- in: Sélectionne les éléments de données dont la valeur du champ de dimension est dans le tableau value.

\- not in: Sélectionne les éléments de données dont la valeur du champ de dimension n’est pas dans le tableau value.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Opérateur

\- in: Sélectionne les éléments de données dont la valeur du champ de dimension est dans le tableau value.

\- not in: Sélectionne les éléments de données dont la valeur du champ de dimension n’est pas dans le tableau value.

identique à operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Sélectionne les valeurs du champ de dimension ; prend en charge les tableaux.

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

### backgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur d’arrière-plan de la cellule

:::

### enableBackgroundColorScale

**Type:** `boolean | undefined`

:::note{title=Description}
Indique s’il faut activer la configuration de l’échelle de couleurs pour les arrière-plans

:::

### backgroundColorScale

**Type:** `{ minValue?: number; maxValue?: number; minColor: string; maxColor: string; } | undefined`

:::note{title=Description}
Mapping de l’échelle de couleurs d’arrière-plan des cellules; prioritaire sur backgroundColor

:::


#### minValue

**Type:** `number | undefined`

:::note{title=Description}
Valeur minimale ; utilise par défaut la valeur minimale de la colonne de données actuelle si elle n’est pas configurée

:::

#### maxValue

**Type:** `number | undefined`

:::note{title=Description}
Valeur maximale ; utilise par défaut la valeur maximale de la colonne de données actuelle si elle n’est pas configurée

:::

#### minColor

**Type:** `string`

:::note{title=Description}
Couleur correspondant à la valeur minimale

:::

#### maxColor

**Type:** `string`

:::note{title=Description}
Couleur correspondant à la valeur maximale

:::

### enableProgressBar

**Type:** `boolean | undefined`

:::note{title=Description}
Indique s’il faut activer la barre de progression (barre affichant la taille relative de la valeur de cellule); désactivée par défaut

:::

### barPositiveColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de la barre de progression lorsque la valeur de cellule est positive

:::

### barNegativeColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de la barre de progression lorsque la valeur de cellule est négative

:::

### barMin

**Type:** `number | undefined`

:::note{title=Description}
Valeur minimale de la barre de progression



Calcule automatiquement le minimum de la colonne si non configuré

:::

### barMax

**Type:** `number | undefined`

:::note{title=Description}
Valeur maximale de la barre de progression



Calcule automatiquement le maximum de la colonne si non configuré

:::

### textColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur du texte de la cellule

:::

### textFontSize

**Type:** `number | undefined`

:::note{title=Description}
Taille de police du texte de la cellule

:::

### borderColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de bordure de la cellule

:::

### borderLineWidth

**Type:** `number | undefined`

:::note{title=Description}
Largeur de ligne de bordure de la cellule

:::


## totals

**Type:** `TotalType | undefined`

:::note{title=Description}
Type de ligne de synthèse à afficher ; applicable uniquement aux colonnes de mesure

\- 'sum': Affiche la ligne de somme

\- 'avg': Affiche la ligne de moyenne

\- 'max': Affiche la ligne de maximum

\- 'min': Affiche la ligne de minimum

\- 'count': Affiche la ligne de comptage



Type de ligne de synthèse du tableau

\- 'sum': Somme

\- 'avg': Moyenne

\- 'max': Maximum

\- 'min': Minimum

\- 'count': Nombre

:::

**Exemple**
'sum'




## theme

**Type:** `Theme | undefined`

:::note{title=Description}
Thème du graphique. Le thème est une configuration fonctionnelle de priorité plus faible. Il comprend les paramètres communs à tous les types de graphiques et les paramètres propres à un seul type de graphique. Les thèmes intégrés light et dark peuvent être personnalisés via Builder.



Thème



Thèmes light et dark intégrés ; de nouveaux thèmes peuvent être personnalisés via registerTheme.

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
Configuration de la langue du graphique; prend en charge 'zh-CN' et 'en-US'. La langue peut aussi être définie avec la méthode intl.setLocale('zh-CN').

:::
