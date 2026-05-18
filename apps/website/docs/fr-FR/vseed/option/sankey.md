# Sankey

:::info{title=Mappage Encoding}
Le diagramme de Sankey prend en charge les canaux visuels suivants :

`source`: canal source, prend en charge `plusieurs dimensions`

`target`: canal cible, prend en charge `plusieurs dimensions`

`color`: canal couleur, prend en charge `plusieurs dimensions`

`size`: canal de taille, prend en charge `une mesure`

`label`: canal d’étiquette, prend en charge `plusieurs dimensions` et `plusieurs mesures`

`tooltip`: canal d’infobulle, prend en charge `plusieurs dimensions` et `plusieurs mesures`

:::

:::note{title=Description}
Le diagramme de Sankey sert à afficher les relations de flux de source à target, la largeur des liens représentant le volume du flux

Scenarios applicables :

\- Afficher les relations de flux dans une structure node-link ordinaire

\- Afficher les transitions de chemin après concaténation de plusieurs dimensions source et de plusieurs dimensions target

:::

:::warning{title=Warning}
Exigences de donnees :

\- Au moins 1 dimension source ou dimension par défaut pouvant être mappée comme source

\- Au moins 1 dimension target

\- Au moins 1 champ numérique (mesure) pour mapper la taille du flux

\- Le advanced pipeline doit convertir tidyData en une structure source / target / value ordinaire consommable par sankey

:::


## chartType

**Type:** `"sankey"`

:::note{title=Description}
Diagramme de Sankey



Diagramme de Sankey, affiche les relations de flux source-target ordinaires et les volumes

:::

**Exemple**
'sankey'




## dataset

**Type:** `Record[]`

:::note{title=Description}
Jeu de données



Jeu de données déjà agrégé et conforme à la spécification TidyData, utilisé pour définir la source et la structure des données du graphique

:::

**Exemple**
[{fromRegion: 'Chine du Nord', toRegion: 'Chine de l’Est', value: 30}]




## dimensions

**Type:** `SankeyDimension[] | undefined`

:::note{title=Description}
Champs de dimension



Configuration des dimensions, utilisée pour définir la structure des nœuds source / target, avec prise en charge des canaux source / target / color / detail / label / tooltip / row / column
:::

**Exemple**
[{id: 'fromRegion', alias: 'Région source'}, {id: 'toRegion', alias: 'Région cible', encoding: 'target'}]




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
Configuration du format de date de la dimension

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=Description}
Granularité temporelle, détermine la précision d’affichage de la date
:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "source" | "target" | undefined`

:::note{title=Description}
Canal auquel la dimension est mappée

\- source : permet de mapper plusieurs dimensions au canal source ; l'étape advanced les concatène en chemin de nœuds amont

\- target : permet de mapper plusieurs dimensions au canal target ; l'étape advanced les concatène en chemin de nœuds aval

\- color : permet de mapper plusieurs dimensions au canal couleur, utilisé pour générer la clé de catégorie couleur du sankey

\- detail : permet de mapper plusieurs dimensions au canal détail

\- label : permet de mapper plusieurs dimensions au canal d'étiquette

\- tooltip : permet de mapper plusieurs dimensions au canal d'infobulle

\- row : permet de mapper plusieurs dimensions au canal ligne, utilisé pour les graphiques croisés dynamiques

\- column : permet de mapper plusieurs dimensions au canal colonne, utilisé pour les graphiques croisés dynamiques

:::


## measures

**Type:** `SankeyMeasure[] | undefined`

:::note{title=Description}
Mesures



Configuration des mesures, utilisée pour définir la taille du flux, avec prise en charge des canaux size / detail / label / tooltip

:::

**Exemple**
[{id: 'sales', alias: 'Ventes'}]




### id

**Type:** `string`

:::note{title=Description}
ID de mesure. Ne peut pas être dupliqué
:::

### alias

**Type:** `string | undefined`

:::note{title=Description}
Alias de mesure. Les doublons sont autorisés. Si non renseigné, alias prend la valeur de id
:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Formatage automatique des nombres, activé par défaut et prioritaire

Lorsque autoFormat=true, il remplace toutes les configurations numFormat

Lorsqu’il est activé, les étiquettes et infobulles du graphique choisissent automatiquement le format approprié selon les valeurs de mesure et la locale

Règles de formatage : nombres décimaux avec compact notation activée, au minimum 0 décimale, au maximum 2 décimales, arrondi automatique, implémenté avec Intl.NumberFormat du navigateur

Exemple :

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K
:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Formatage numérique personnalisé des mesures, appliqué automatiquement à label et tooltip

Remarque : pour utiliser un formatage personnalisé, définissez explicitement autoFormat=false ; sinon autoFormat remplace cette configuration
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
\- 100000 devient 10万, ratio:10000, symbol:"万"
\- 100000 est converti en 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Symbole de formatage numérique, par exemple % ou ‰
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
\- 1234.5678 est converti en 1235 , fractionDigits:0 (roundingMode:halfCeil)
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
Priorité d’arrondi du formatage numérique lorsque significantDigits et fractionDigits sont tous deux définis, avec Intl.NumberFormat du navigateur selon les mêmes règles que roundingPriority
:::

**Exemple**
\- 1234.5678 est converti en 1230 , significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 est converti en 1234.5678 , significantDigits:3 (roundingPriority:morePrecision)



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
\- 100000 devient 10万, ratio:10000, symbol:"万"
\- 100000 est converti en 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Symbole de formatage numérique, par exemple % ou ‰
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
\- 1234.5678 est converti en 1235 , fractionDigits:0 (roundingMode:halfCeil)
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
Priorité d’arrondi du formatage numérique lorsque significantDigits et fractionDigits sont tous deux définis, avec Intl.NumberFormat du navigateur selon les mêmes règles que roundingPriority
:::

**Exemple**
\- 1234.5678 est converti en 1230 , significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 est converti en 1234.5678 , significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Mode d’arrondi du formatage numérique, avec Intl.NumberFormat du navigateur selon les mêmes règles que roundingMode
:::

### encoding

**Type:** `"detail" | "tooltip" | "label" | "size" | undefined`

:::note{title=Description}
Canal auquel la mesure est mappée

\- size : mesure mappée au canal largeur d'arête / taille du flux

\- detail : mesure mappée au canal détail

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




Utilisé pour spécifier le nom du champ de pagination ; doit être une dimension

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




La couleur d’arrière-plan peut être une chaîne de couleur comme 'red' ou 'blue', ou bien une valeur hex, rgb ou rgba, par exemple '#ff0000' ou 'rgba(255,0,0,0.5)'

:::


## color

**Type:** `Color | undefined`

:::note{title=Description}
Couleur



Configuration des couleurs, utilisée pour définir le schéma de couleurs du graphique, notamment la liste des couleurs, le mappage des couleurs, les dégradés, etc.

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
Configuration des étiquettes pour définir les étiquettes de données du graphique, y compris leur position, format et style.



Configuration des étiquettes, utilisée pour définir les étiquettes de données du graphique, notamment la position, le format, le style, etc.

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
\- 100000 devient 10万, ratio:10000, symbol:"万"
\- 100000 est converti en 10K, ratio:1000, symbol:"K"




#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Symbole de formatage numérique, par exemple % ou ‰
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
Mettre en surbrillance le champ sales des éléments dont sales est supérieur à 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Mettre en surbrillance l'élément avec la marge bénéficiaire la plus élevée dans chaque région
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

Mettre en surbrillance les éléments filtrés par plusieurs conditions
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

**Type:** `Legend | undefined`

:::note{title=Description}




Configuration de la légende, utilisée pour définir l’affichage, la position et le style de la légende de couleur du diagramme de Sankey

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




Configuration des infobulles, utilisée pour définir les informations du graphique, notamment le contenu, le format, le style, etc.

:::


### enable

**Type:** `false | true`

:::note{title=Description}
Indique si les infobulles sont activées
:::


## theme

**Type:** `Theme | undefined`

:::note{title=Description}
Thème du graphique



Thème



Deux thèmes intégrés sont fournis, light et dark ; de nouveaux thèmes peuvent être personnalisés via registerTheme.
:::


### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Description}
Langue



Configuration de la langue du graphique, prenant en charge 'zh\-CN' et 'en\-US'

:::
