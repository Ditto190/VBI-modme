# Heatmap

:::info{title=Recommandé}
- Configuration de champs recommandée : `1` mesure, `2` dimensions

- Prend en charge Data Reshape : au moins `1` mesure, `0` dimension

:::

:::info{title=Mappage d'encodage}
Le graphique Heatmap prend en charge les canaux visuels suivants :

`xAxis`      : canal de l'axe x, prend en charge `plusieurs dimensions`, mappées sur l'axe x selon la valeur de dimension

`yAxis`      : canal de l'axe y, prend en charge `plusieurs dimensions`, mappées sur l'axe y selon la valeur de dimension

`detail`     : canal de détail, prend en charge `plusieurs dimensions`, utilisé pour afficher des données plus granulaires dans la même série de couleurs

`color`      : canal de couleur, prend en charge `une mesure`, mappe les valeurs de mesure à l'intensité de couleur

`tooltip`    : canal d'infobulle, prend en charge `plusieurs dimensions` et `plusieurs mesures`, affiché au survol d'un point de données

`label`      : canal d'étiquette, prend en charge `plusieurs dimensions` et `plusieurs mesures`, affiche les étiquettes de données sur les points de données

:::

:::note{title=Description}
Graphique Heatmap, affichant la distribution et les relations d'intensité des données par profondeur de couleur dans une matrice bidimensionnelle.

Scénarios applicables :

- Affichage de la densité et de l'intensité de données bidimensionnelles à grande échelle

- Analyse de corrélation entre catégories et valeurs numériques

- Comparaison croisée entre séries temporelles et catégories

:::

:::warning{title=Warning}
Exigences de données :

- Au moins 2 champs de dimension, utilisés pour déterminer les lignes et colonnes du graphique Heatmap

- Au moins 1 champ numérique, utilisé pour mapper la profondeur de couleur

- Lorsque plusieurs mesures sont prises en charge, une mesure est généralement sélectionnée pour le mapping de couleur

Fonctionnalités activées par défaut :

- La légende, les axes, les étiquettes de données, les infobulles et la mise à l'échelle numérique sont activés par défaut.

:::


## chartType

**Type:** `"heatmap"`

:::note{title=Description}
Graphique Heatmap, affichant la distribution et les relations d'intensité des données par profondeur de couleur dans une matrice bidimensionnelle.

:::

**Exemple**
'heatmap'




## dataset

**Type:** `Record[]`

:::note{title=Description}
Dataset. Jeu de données déjà agrégé et conforme à la spécification TidyData, définissant la source et la structure des données du graphique. L'entrée utilisateur ne nécessite aucun prétraitement ; VSeed dispose de puissantes capacités Data Reshape qui gèrent automatiquement le formatage. Les données du graphique Heatmap sont finalement converties en 2 dimensions et 1 mesure.

:::

**Exemple**
[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]




## dimensions

**Type:** `HeatmapDimension[] | undefined`

:::note{title=Description}
Dimensions. Pour les graphiques Heatmap, la première dimension est généralement mappée sur l'axe X, tandis que les autres dimensions sont fusionnées avec les noms de mesures (s'il y en a plusieurs) pour servir d'éléments de légende.

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

**Type:** `"xAxis" | "tooltip" | "label" | "row" | "column" | "yAxis" | undefined`

:::note{title=Description}
Canal auquel la dimension est mappée :

- xAxis : prend en charge le mapping de plusieurs dimensions sur l'axe x

- yAxis : prend en charge le mapping de plusieurs dimensions sur l'axe y

- tooltip : prend en charge le mapping de plusieurs dimensions vers le canal d'infobulle

- label : prend en charge le mapping de plusieurs dimensions vers le canal d'étiquette

- row : prend en charge le mapping de plusieurs dimensions vers le canal de ligne

- column : prend en charge le mapping de plusieurs dimensions vers le canal de colonne

:::


## measures

**Type:** `HeatmapMeasure[] | undefined`

:::note{title=Description}
Mesures. Les mesures du graphique Heatmap sont automatiquement fusionnées en une seule mesure et mappées sur l'échelle de couleur. Si plusieurs mesures existent, leurs noms sont fusionnés avec d'autres dimensions pour servir d'éléments de légende.

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
Formatage numérique automatique, activé par défaut, priorité la plus élevée.

Lorsque autoFormat=true, toutes les configurations numFormat sont remplacées.

Lorsqu’il est activé, les étiquettes de données et les infobulles choisissent automatiquement le format adapté selon les valeurs de mesure et la locale.

Règles de formatage : nombres décimaux avec compact notation activée, minimum 0 décimale, maximum 2 décimales, arrondi automatique, via l’implémentation Intl.NumberFormat du navigateur.

Par exemple :

- locale=zh-CN: 749740.264 → 74.45~74.45万

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
- 100000 est converti en 10W , ratio:10000, symbol:"W"
- 100000 est converti en 10K , ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Symbole de format numérique, par exemple %, ‰

:::

**Exemple**
- 100000 est converti en 10W , ratio:10000, symbol:"W"
- 100000 est converti en 10K , ratio:1000, symbol:"K"



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
- 100000 est converti en 10W , ratio:10000, symbol:"W"
- 100000 est converti en 10K , ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Symbole de format numérique, par exemple %, ‰

:::

**Exemple**
- 100000 est converti en 10W , ratio:10000, symbol:"W"
- 100000 est converti en 10K , ratio:1000, symbol:"K"



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

**Type:** `"color" | "tooltip" | "label" | undefined`

:::note{title=Description}
Canal auquel la mesure est mappée :

- color : mesure mappée vers le canal de couleur

- label : mesure mappée vers le canal d'étiquette

- tooltip : mesure mappée vers le canal d'infobulle

:::

### parentId

**Type:** `string | undefined`

:::note{title=Description}
Dans une configuration de mesures plate, construit une structure de mesures en arbre. parentId pointe vers l’ID du groupe de mesures parent et sert à construire la hiérarchie.

:::

:::tip{title=Astuce}
Il existe deux façons de configurer l’arbre des mesures : l’option 1 configure directement un arbre de mesures avec children ; l’option 2 fournit une liste plate de mesures avec parentId. Ces deux méthodes ne peuvent pas être utilisées simultanément.

:::


## page

**Type:** `Page | undefined`

:::note{title=Description}
Configuration de pagination.

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

**Type:** `BackgroundCouleur`

:::note{title=Description}
Couleur d'arrière-plan du graphique.

Background color can be a color string (e.g., 'red', 'blue'), or a hex, rgb, or rgba value (e.g., '#ff0000', 'rgba(255,0,0,0.5)').

:::


## color

**Type:** `Couleur | undefined`

:::note{title=Description}
Configuration des couleurs pour définir la palette du graphique, y compris les listes, mappages et dégradés de couleurs.

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

**Type:** `Étiquette | undefined`

:::note{title=Description}
Configuration des étiquettes du graphique Heatmap. Utilisée pour définir les étiquettes de données ; active automatiquement l'inversion des étiquettes afin d'assurer leur lisibilité sur les couleurs d'arrière-plan.

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

Remarque : les étiquettes d'encodage ont une priorité plus élevée ; cette configuration n'affecte pas les étiquettes d'encodage.

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les étiquettes affichent les pourcentages des valeurs de mesure.

Dans les scénarios à plusieurs mesures, il n'y a pas de risque de valeurs conflictuelles, car toutes les mesures liées au tracé passent par le traitement `foldMeasures` et sont fusionnées en une seule mesure représentant un point de données.

Remarque : les étiquettes d'encodage ont une priorité plus élevée ; cette configuration n'affecte pas les étiquettes d'encodage.

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les étiquettes affichent les noms de dimension.

Displays all dimension labels.

Remarque : les étiquettes d'encodage ont une priorité plus élevée ; cette configuration n'affecte pas les étiquettes d'encodage.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si les valeurs d'étiquette sont formatées automatiquement. Lorsque autoFormat vaut true, la configuration numFormat est ignorée.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Configuration du format des valeurs d'étiquette ; fusionnée avec le `format` dans `measure`, où le `format` de `measure` a une priorité plus élevée. La priorité de numFormat est inférieure à autoFormat.

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
- 100000 est converti en 10W , ratio:10000, symbol:"W"
- 100000 est converti en 10K , ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Symbole de format numérique, par exemple %, ‰

:::

**Exemple**
- 100000 est converti en 10W , ratio:10000, symbol:"W"
- 100000 est converti en 10K , ratio:1000, symbol:"K"



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

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Taille de police de l'étiquette.

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}
Graisse de police de l'étiquette.

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur d'arrière-plan de l'étiquette.

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Description}
Couleur du contour de l'étiquette.

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de police de l'étiquette.

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically invert the label font color based on the graphic element color.

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Description}
Position de l'étiquette.

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the label overlap avoidance function is enabled.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Filtrage des étiquettes ; la relation de condition par défaut entre les sélecteurs est OR.

:::


#### field

**Type:** `string`

:::note{title=Description}
ID du champ de dimension.

:::

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

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Filtre dynamique (exécution de code généré par IA).

Implémente une logique complexe de filtrage de données via du code JavaScript généré par IA.

Fonctionnalités principales :

- Prend en charge toute condition complexe de filtrage des données.

- Utilise les fonctions utilitaires intégrées pour les opérations sur les données.

- Exécution sécurisée dans l’environnement navigateur (bac à sable Web Worker).

Exigences : prend uniquement en charge les environnements navigateur ; les environnements Node.js utilisent fallback.

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.

Configuration du filtre dynamique du graphique.

Filtre les marques du graphique (colonnes, points, etc.) via du code JavaScript généré par IA.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Description des besoins de filtrage de l’utilisateur (langage naturel).

:::

**Exemple**
"Mettre en évidence les colonnes de ventes supérieures à 1000."

"Mettre en évidence la colonne avec la marge bénéficiaire la plus élevée dans chaque région."



#### code

**Type:** `string`

:::note{title=Description}
Code JavaScript de filtrage généré par IA.

- Seules les fonctions utilitaires intégrées peuvent être utilisées (accessibles via _ ou R).

- Paramètre d'entrée : data (tableau) ; chaque élément inclut un champ __row_index représentant le numéro de ligne.

- Doit retourner un tableau de combinaisons d'index de ligne et de champ : Array<{ __row_index: number, field: string }>.

- __row_index represents the row number of the original data item, and field represents the field to be highlighted.

- Interdit : eval, Function, opérations asynchrones, API DOM, requêtes réseau.

:::

**Exemple**
Mettre en évidence le champ 'sales' pour les éléments de données où sales > 1000 :
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Mettre en évidence les éléments de données avec la marge bénéficiaire la plus élevée dans chaque région :
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

Mettre en évidence les éléments de données répondant à plusieurs conditions de filtrage :
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
Plan de fallback lorsque l’exécution du code échoue ou que l’environnement n’est pas pris en charge.

:::


##### field

**Type:** `string`

##### operator

**Type:** `"in" | "not in" | undefined`

##### op

**Type:** `"in" | "not in" | undefined`

##### value

**Type:** `string | number | (string | number)[]`

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Résultat d'exécution du filtre dynamique (champ runtime). Écrit pendant la phase prepare() ; en lecture seule à l'exécution.

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
Légende. Configuration de la légende de couleur pour les graphiques Heatmap, utilisée pour définir la légende du graphique, notamment la position, le format et le style.

:::


### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Description}
Position de la légende.

:::

**Exemple**
position: 'rightTop'



### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether legend functionality is enabled.

:::

**Exemple**
enable: true



### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de police de la légende.

:::

### labelFontColor

**Type:** `string | undefined`

:::note{title=Description}
Couleur de police de la légende.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Taille de police de la légende.

:::

**Exemple**
labelFontSize: 10



### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}
Graisse de police de la légende.

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
Configuration des infobulles, utilisée pour définir les infobulles du graphique, notamment la position, le format et le style.

:::


### enable

**Type:** `false | true`

:::note{title=Description}
Indique si la fonctionnalité d'infobulle est activée.

:::


## brush

**Type:** `Brush | undefined`

:::note{title=Description}
Configuration de brush, utilisée pour activer ou désactiver les capacités de sélection de région.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Indique si la sélection de région est activée.

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Description}
Type de brush. Définit la forme et la direction de la zone de sélection :

- `rect` : sélection rectangulaire, permet de sélectionner dans les directions X et Y.

- `polygon` : sélection polygonale, permet de dessiner des formes arbitraires en cliquant sur plusieurs points.

- `x` : sélection horizontale, limite la sélection à la direction de l'axe X.

- `y` : sélection verticale, limite la sélection à la direction de l'axe Y.

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Description}
Mode de sélection, simple ou multiple. Définit la logique de sélection :

- `single` : mode de sélection simple, une seule zone de sélection peut exister à la fois.

- `multiple` : mode de sélection multiple, plusieurs zones de sélection peuvent exister simultanément.

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Description}
Indique s'il faut effacer les zones de sélection après la fin de la sélection de région.

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Style des données dans la région sélectionnée.

:::


#### opacity

**Type:** `number | undefined`

:::note{title=Description}
Opacité des points de données sélectionnés, plage 0-1.

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Description}
Couleur de contour.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Largeur de contour.

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Style des données hors de la région sélectionnée.

:::


#### opacity

**Type:** `number | undefined`

:::note{title=Description}
Opacité des points de données hors sélection, plage 0-1.

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Description}
Couleur de contour.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Largeur de contour.

:::


## theme

**Type:** `Thème | undefined`

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

**Type:** `Locale | undefined`

:::note{title=Description}
Locale. Configuration de la langue du graphique ; prend en charge 'zh-CN' et 'en-US'. Vous pouvez aussi appeler intl.setLocale('zh-CN') pour définir la langue.

:::
