# PivotTable

:::info{title=Recommandé}
- Configuration de champs recommandée : `1` mesure, `1` dimension
- Prend en charge la restructuration des données : au moins `1` mesure, `0` dimension
:::

:::info{title=Mappage d'encodage}
Le tableau croisé dynamique prend en charge les canaux visuels suivants :

`row`    : dimension de ligne, prend en charge `plusieurs dimensions`, groupe les données par valeurs de dimension sur les lignes

`column` : dimension de colonne, prend en charge `plusieurs dimensions`, groupe les données par valeurs de dimension sur les colonnes

`detail` : canal de détail, prend en charge `plusieurs mesures`, affiche les valeurs de mesure dans les cellules

:::

:::note{title=Description}
Tableau croisé dynamique, adapté aux scénarios d’analyse croisée de données multidimensionnelles, avec configuration flexible des dimensions ligne/colonne et des méthodes de calcul des mesures.

Scénarios adaptés :

- Analyse statistique multidimensionnelle complexe
- Exploration détaillée des données et affichage agrégé
- Génération de rapports métier et exploration de données

:::

:::warning{title=Warning}
Exigences de données :

- Au moins 1 dimension de ligne ou 1 dimension de colonne ou 1 mesure
- Les données doivent déjà être agrégées
- Les données peuvent être groupées

Fonctionnalités activées par défaut :

- Le tri des lignes et colonnes, le filtrage des données, le calcul d’agrégats, les sous-totaux et les totaux généraux sont activés par défaut

:::


## chartType

**Type:** `"pivotTable"`

:::note{title=Description}
Tableau croisé dynamique, adapté aux scénarios d’analyse croisée multidimensionnelle

:::

**Exemple**
'pivotTable'




## dataset

**Type:** `Record[]`

:::note{title=Description}
Jeu de données déjà agrégé et conforme à la spécification TidyData, utilisé pour définir la source et la structure des données du graphique. Les données saisies par l’utilisateur ne nécessitent aucun traitement ; VSeed dispose de puissantes capacités de restructuration des données et effectue cette restructuration automatiquement. Les données du tableau croisé dynamique sont finalement converties en structure arborescente correspondante, sans traitement manuel par l’utilisateur.

:::

**Exemple**
[{region:'East China', product:'A', sales:1000}, {region:'East China', product:'B', sales:1500}]




## dimensions

**Type:** `TableDimension[] | undefined`

:::note{title=Description}
Dimensions de ligne et de colonne du tableau croisé dynamique. Les données sont automatiquement traitées en structure arborescente et mappées aux axes ligne et colonne.

:::

**Exemple**
[{id: 'region', alias: 'Region', isRow: true}, {id: 'product', alias: 'Product', isColumn: true}]




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

**Type:** `"row" | "column" | undefined`

:::note{title=Description}
Canal auquel la dimension est mappée :

- row : permet de mapper plusieurs dimensions au canal de ligne

- column : permet de mapper plusieurs dimensions au canal de colonne

:::


## measures

**Type:** `TableMeasure[] | undefined`

:::note{title=Description}
Le tableau croisé dynamique prend en charge plusieurs mesures.

:::

**Exemple**
[{id: 'sales', alias: 'Sales', aggregation: 'sum'}]




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
Formatage numérique automatique, activé par défaut, priorité la plus élevée.

Lorsque autoFormat=true, toutes les configurations numFormat sont remplacées.

Lorsqu’il est activé, les étiquettes de données et les infobulles choisissent automatiquement le format adapté selon les valeurs de mesure et la locale.

Règles de formatage : nombres décimaux avec compact notation activée, minimum 0 décimale, maximum 2 décimales, arrondi automatique, via l’implémentation Intl.NumberFormat du navigateur.

Par exemple :

- locale=zh-CN: 749740.264 → 74.45万

- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Formatage numérique personnalisé pour les mesures ; appliqué automatiquement aux étiquettes et infobulles.

Remarque : pour utiliser un format personnalisé, définissez explicitement autoFormat=false ; sinon autoFormat remplacera cette configuration.

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
- 100000 est converti en 10万, ratio:10000, symbol:"万"
- 100000 est converti en 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Symbole de format numérique, par ex. %, ‰

:::

**Exemple**
- 100000 est converti en 10万, ratio:10000, symbol:"万"
- 100000 est converti en 10K, ratio:1000, symbol:"K"



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
Nombre de décimales pour le formatage numérique, utilise minimumFractionDigits et maximumFractionDigits de Intl.NumberFormat du navigateur ; priorité inférieure à significantDigits.

:::

**Exemple**
- 1234.5678 est converti en 1235 , fractionDigits:0 (roundingMode:halfCeil)
- 1234.5678 est converti en 1234.6 , fractionDigits:1 (roundingMode:halfCeil)
- 1234.5678 est converti en 1234.57 , fractionDigits:2 (roundingMode:halfCeil)
- 1234.5678 est converti en 1230.568 , fractionDigits:3 (roundingMode:halfCeil)
- 1234.5678 est converti en 1234.5678 , fractionDigits:4 (roundingMode:halfCeil)
- 1234.5678 est converti en 1234.56780 , fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
Chiffres significatifs pour le formatage numérique, utilise minimumSignificantDigits et maximumSignificantDigits de Intl.NumberFormat du navigateur ; priorité supérieure à fractionDigits.

:::

**Exemple**
- 1234.5678 est converti en 1000 , significantDigits:1
- 1234.5678 est converti en 1200 , significantDigits:2
- 1234.5678 est converti en 1230 , significantDigits:3
- 1234.5678 est converti en 1234 , significantDigits:4
- 1234.5678 est converti en 1234.6 , significantDigits:5 (roundingMode:halfCeil)
- 1234.5678 est converti en 1234.57 , significantDigits:6 (roundingMode:halfCeil)
- 1234.5678 est converti en 1234.568 , significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 est converti en 1234.5678 , significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}
Priorité d’arrondi du formatage numérique lorsque significantDigits et fractionDigits sont tous deux définis ; utilise Intl.NumberFormat du navigateur et suit les mêmes règles que roundingPriority.

:::

**Exemple**
- 1234.5678 est converti en 1230 , significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 est converti en 1234.5678 , significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Mode d’arrondi du formatage numérique, utilise Intl.NumberFormat du navigateur et suit les mêmes règles que roundingMode.

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
- 100000 est converti en 10万, ratio:10000, symbol:"万"
- 100000 est converti en 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Symbole de format numérique, par ex. %, ‰

:::

**Exemple**
- 100000 est converti en 10万, ratio:10000, symbol:"万"
- 100000 est converti en 10K, ratio:1000, symbol:"K"



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
Nombre de décimales pour le formatage numérique, utilise minimumFractionDigits et maximumFractionDigits de Intl.NumberFormat du navigateur ; priorité inférieure à significantDigits.

:::

**Exemple**
- 1234.5678 est converti en 1235 , fractionDigits:0 (roundingMode:halfCeil)
- 1234.5678 est converti en 1234.6 , fractionDigits:1 (roundingMode:halfCeil)
- 1234.5678 est converti en 1234.57 , fractionDigits:2 (roundingMode:halfCeil)
- 1234.5678 est converti en 1230.568 , fractionDigits:3 (roundingMode:halfCeil)
- 1234.5678 est converti en 1234.5678 , fractionDigits:4 (roundingMode:halfCeil)
- 1234.5678 est converti en 1234.56780 , fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
Chiffres significatifs pour le formatage numérique, utilise minimumSignificantDigits et maximumSignificantDigits de Intl.NumberFormat du navigateur ; priorité supérieure à fractionDigits.

:::

**Exemple**
- 1234.5678 est converti en 1000 , significantDigits:1
- 1234.5678 est converti en 1200 , significantDigits:2
- 1234.5678 est converti en 1230 , significantDigits:3
- 1234.5678 est converti en 1234 , significantDigits:4
- 1234.5678 est converti en 1234.6 , significantDigits:5 (roundingMode:halfCeil)
- 1234.5678 est converti en 1234.57 , significantDigits:6 (roundingMode:halfCeil)
- 1234.5678 est converti en 1234.568 , significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 est converti en 1234.5678 , significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}
Priorité d’arrondi du formatage numérique lorsque significantDigits et fractionDigits sont tous deux définis ; utilise Intl.NumberFormat du navigateur et suit les mêmes règles que roundingPriority.

:::

**Exemple**
- 1234.5678 est converti en 1230 , significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 est converti en 1234.5678 , significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Mode d’arrondi du formatage numérique, utilise Intl.NumberFormat du navigateur et suit les mêmes règles que roundingMode.

:::

### encoding

**Type:** `"column" | undefined`

:::note{title=Description}
Canal auquel la mesure est mappée :

- column : colonne de mesure

:::

### parentId

**Type:** `string | undefined`

:::note{title=Description}
Dans une configuration de mesures plate, construit une structure de mesures en arbre. parentId pointe vers l’ID du groupe de mesures parent et sert à construire la hiérarchie.

:::

:::tip{title=Tip}
Il existe deux façons de configurer l’arbre des mesures : l’option 1 configure directement un arbre de mesures avec children ; l’option 2 fournit une liste plate de mesures avec parentId. Ces deux méthodes ne peuvent pas être utilisées simultanément.

:::


## page

**Type:** `Page | undefined`

:::note{title=Description}
Configuration de pagination. Spécifie le nom du champ pour la pagination, qui doit être une dimension.

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
'2023-01-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Description}
Couleur d’arrière-plan du graphique. La valeur par défaut est transparente. Peut être une chaîne de couleur (par ex. 'red', 'blue') ou une valeur hex, rgb ou rgba (par ex. '#ff0000', 'rgba(255,0,0,0.5)').

:::


## borderColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de bordure du tableau.

:::


## bodyFontSize

**Type:** `number | undefined`

:::note{title=Description}
Taille de police du corps du tableau.

:::


## bodyFontColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de police du corps du tableau.

:::


## bodyBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur d’arrière-plan du corps du tableau.

:::


## headerFontSize

**Type:** `number | undefined`

:::note{title=Description}
Taille de police des en-têtes de ligne et de colonne.

:::


## headerFontColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de police des en-têtes de ligne et de colonne.

:::


## headerBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur d’arrière-plan des en-têtes de ligne et de colonne.

:::


## hoverHeaderBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur d’arrière-plan au survol d’une cellule d’en-tête de ligne ou de colonne, utilisée pour mettre en évidence la cellule à l’intersection de la ligne et de la colonne survolées.

:::


## hoverHeaderInlineBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur d’arrière-plan au survol d’une cellule d’en-tête de ligne ou de colonne, utilisée pour mettre en évidence toutes les cellules de la ligne et de la colonne survolées.

:::


## selectedBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de bordure de la cellule sélectionnée, utilisée pour la mise en évidence.

:::


## selectedBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur d’arrière-plan de la cellule sélectionnée, utilisée pour la mise en évidence.

:::


## bodyCellStyle

**Type:** `BodyCellStyle | BodyCellStyle[] | undefined`

:::note{title=Description}
Définit des styles spéciaux pour les cellules du corps du tableau.

:::


### selector

**Type:** `Selector | Selectors | FieldSelector | undefined`

:::note{title=Description}
Sélecteur de données.

Si `selector` est configuré, il fournit quatre types de correspondance de données : sélecteur numérique, sélecteur de données locales, sélecteur de dimension conditionnel et sélecteur de mesure conditionnel.

Si `selector` n’est pas configuré, le style s’applique globalement.

Remarque : `selector` et `dynamicFilter` ne peuvent pas être utilisés simultanément ; `dynamicFilter` a une priorité plus élevée.

:::

**Exemple**
Sélecteur numérique :
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

Sélecteur de données locales :
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

Sélecteur de dimension conditionnel :
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

Sélecteur de mesure conditionnel :
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

Filtre de colonne de champ :
selector = {
field: 'category'
}
selector = {
field: ['category', 'profit']
}




#### field

**Type:** `string | string[]`

:::note{title=Description}
Nom de champ ; peut être un seul champ ou un tableau de champs.

:::

**Exemple**
Champ unique :
field: 'sales'

Champs multiples :
field: ['sales', 'profit', 'revenue']



#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Opérateur :

- in : sélectionne les éléments de données dont la valeur du champ de dimension est dans la liste 'value'.

- not in : sélectionne les éléments de données dont la valeur du champ de dimension n’est pas dans la liste 'value'.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Opérateur :

- in : sélectionne les éléments de données dont la valeur du champ de dimension est dans la liste 'value'.

- not in : sélectionne les éléments de données dont la valeur du champ de dimension n’est pas dans la liste 'value'.

Identique à operator.

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Valeurs de dimension à sélectionner ; prend en charge les tableaux.

:::

### dynamicFilter

**Type:** `TableDynamicFilter | undefined`

:::note{title=Description}
Filtre dynamique (piloté par code).

Implémente une logique complexe de filtrage de données via du code JavaScript généré par IA.
Adapté aux Top N, analyses statistiques, conditions complexes et autres scénarios où les sélecteurs statiques sont insuffisants.

Fonctionnalités principales :

- Prend en charge toute condition complexe de filtrage des données.

- Utilise les fonctions utilitaires intégrées pour les opérations sur les données.

- Exécution sécurisée dans l’environnement navigateur (bac à sable Web Worker).

Exigences : prend uniquement en charge les environnements navigateur ; les environnements Node.js utilisent fallback.

Remarque : `selector` et `dynamicFilter` ne peuvent pas être utilisés simultanément ; `dynamicFilter` a une priorité plus élevée.

Configuration du filtre dynamique du tableau.

Implémente un filtrage précis au niveau des cellules via du code JavaScript généré par IA.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Description des besoins de filtrage de l’utilisateur (langage naturel).

:::

**Exemple**
"Mettre en évidence les cellules dont les ventes dépassent 1000."

"Mettre en évidence la cellule avec la valeur maximale dans chaque ligne."



#### code

**Type:** `string`

:::note{title=Description}
Code JavaScript de filtrage généré par IA.

- Seules les fonctions utilitaires intégrées peuvent être utilisées (accessibles via _ ou R).

- Paramètre d’entrée : data (tableau) ; chaque élément inclut un champ `_index` représentant le numéro de ligne.

- Doit retourner un tableau de sélecteurs de cellules : Array<{ __row_index: number, field: string }>.

- Lorsque `field` vaut "*", toute la ligne est mise en évidence.

- Interdit : eval, Function, opérations asynchrones, API DOM, requêtes réseau.

:::

**Exemple**
Filtre Top N :
dynamicFilter = {
type: 'row-with-field',
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

Filtre multicondition :
dynamicFilter = {
type: 'row-with-field',
description: 'Mettre en évidence les produits avec une marge bénéficiaire > 20 % et des ventes > 5000',
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

Filtre de valeur relative :
dynamicFilter = {
type: 'row-with-field',
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

Filtre groupé :
dynamicFilter = {
type: 'row-with-field',
description: 'Mettre en évidence le produit le plus vendu dans chaque région',
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

Mettre en évidence toute la ligne :
dynamicFilter = {
description: 'Mettre en évidence les lignes où les ventes dépassent le profit',
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
ID du champ de dimension.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Opérateur :

- in : sélectionne les éléments de données dont la valeur du champ de dimension est dans la liste 'value'.

- not in : sélectionne les éléments de données dont la valeur du champ de dimension n’est pas dans la liste 'value'.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Opérateur :

- in : sélectionne les éléments de données dont la valeur du champ de dimension est dans la liste 'value'.

- not in : sélectionne les éléments de données dont la valeur du champ de dimension n’est pas dans la liste 'value'.

Identique à operator.

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Valeurs de dimension à sélectionner ; prend en charge les tableaux.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Résultat d’exécution du filtre dynamique (champ runtime). Écrit pendant la phase `prepare()` ; lecture seule à l’exécution.

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
Couleur d’arrière-plan de la cellule.

:::

### enableBackgroundColorScale

**Type:** `boolean | undefined`

:::note{title=Description}
Indique s’il faut activer l’échelle de couleurs pour les arrière-plans des cellules.

:::

### backgroundColorScale

**Type:** `{ minValue?: number; maxValue?: number; minColor: string; maxColor: string; } | undefined`

:::note{title=Description}
Mappage de l’échelle de couleurs d’arrière-plan de cellule ; priorité supérieure à `backgroundColor`.

:::


#### minValue

**Type:** `number | undefined`

:::note{title=Description}
Valeur minimale ; si non configurée, utilise par défaut la valeur minimale de la colonne de données courante.

:::

#### maxValue

**Type:** `number | undefined`

:::note{title=Description}
Valeur maximale ; si non configurée, utilise par défaut la valeur maximale de la colonne de données courante.

:::

#### minColor

**Type:** `string`

:::note{title=Description}
Couleur correspondant à la valeur minimale.

:::

#### maxColor

**Type:** `string`

:::note{title=Description}
Couleur correspondant à la valeur maximale.

:::

### enableProgressBar

**Type:** `boolean | undefined`

:::note{title=Description}
Indique s’il faut activer les barres de progression d’arrière-plan (barre reflétant l’ampleur de la cellule). Désactivé par défaut.

:::

### barPositiveColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de la barre d’arrière-plan lorsque la valeur de la cellule est positive.

:::

### barNegativeColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de la barre d’arrière-plan lorsque la valeur de la cellule est négative.

:::

### barMin

**Type:** `number | undefined`

:::note{title=Description}
Valeur minimale de la barre de progression.
Calculé automatiquement à partir du minimum de la colonne si non configuré.

:::

### barMax

**Type:** `number | undefined`

:::note{title=Description}
Valeur maximale de la barre de progression.
Calculé automatiquement à partir du maximum de la colonne si non configuré.

:::

### textColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur du texte de la cellule.

:::

### textFontSize

**Type:** `number | undefined`

:::note{title=Description}
Taille du texte de la cellule.

:::

### borderColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de bordure de la cellule.

:::

### borderLineWidth

**Type:** `number | undefined`

:::note{title=Description}
Largeur de ligne de la bordure de cellule.

:::


## indicatorsAsCol

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les mesures sont affichées en colonnes. Lorsque `true`, les mesures s’étendent horizontalement (colonnes) ; lorsque `false`, elles s’étendent verticalement (lignes).

:::

**Exemple**
true




## totals

**Type:** `PivotTableTotals | undefined`

:::note{title=Description}
Configuration des totaux généraux et sous-totaux du tableau croisé dynamique.

:::

**Exemple**
{ row: { showGrandTotals: true, showSubTotals: true, subTotalsDimensions: ['category'] } }




### row

**Type:** `RowOrColumnTotalConfig | undefined`

:::note{title=Description}
Configuration des totaux généraux et sous-totaux pour les lignes.

:::


#### showGrandTotals

**Type:** `boolean | undefined`

:::note{title=Description}
Indique s’il faut afficher les totaux généraux (ligne/colonne de total).

:::

#### showSubTotals

**Type:** `boolean | undefined`

:::note{title=Description}
Indique s’il faut afficher les sous-totaux.

:::

#### subTotalsDimensions

**Type:** `string[] | undefined`

:::note{title=Description}
Dimensions pour les sous-totaux ; groupe les sous-totaux selon ces dimensions.

:::

**Exemple**
['category', 'region']



### column

**Type:** `RowOrColumnTotalConfig | undefined`

:::note{title=Description}
Configuration des totaux généraux et sous-totaux pour les colonnes.

:::


#### showGrandTotals

**Type:** `boolean | undefined`

:::note{title=Description}
Indique s’il faut afficher les totaux généraux (ligne/colonne de total).

:::

#### showSubTotals

**Type:** `boolean | undefined`

:::note{title=Description}
Indique s’il faut afficher les sous-totaux.

:::

#### subTotalsDimensions

**Type:** `string[] | undefined`

:::note{title=Description}
Dimensions pour les sous-totaux ; groupe les sous-totaux selon ces dimensions.

:::

**Exemple**
['category', 'region']




## theme

**Type:** `Theme | undefined`

:::note{title=Description}
Thème du graphique. Les thèmes sont des configurations de priorité plus faible contenant les paramètres généraux partagés par tous les types de graphiques et les paramètres spécifiques partagés dans une catégorie.

Les thèmes clair et sombre sont intégrés ; les utilisateurs peuvent définir des thèmes personnalisés via le Builder.

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
Locale. Configuration de langue du graphique ; prend en charge 'zh-CN' et 'en-US'. Vous pouvez aussi appeler `intl.setLocale('zh-CN')` pour définir la langue.

:::
