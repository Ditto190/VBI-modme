# RaceScatter

:::note{title=Description}
Nuage de points anime (Race Scatter Chart)

Convient pour afficher la distribution des donnees au fil du temps; la position des points represente deux valeurs de mesure

Cas d utilisation:

\- Analyser les caracteristiques de distribution dans un espace bidimensionnel et afficher leur evolution dynamique dans le temps

\- Afficher l evolution de la correlation entre plusieurs variables au fil du temps

\- Observer la trajectoire des points de donnees dans un espace bidimensionnel

:::

:::note{title=Note}
Nuage de points anime:

\- Les axes X et Y sont tous deux des axes numeriques (donnees continues) et prennent en charge plusieurs mappages de mesures

\- Permet de controler la dimension temporelle via le lecteur pour afficher dynamiquement les changements de donnees

\- Afficher intuitivement les changements de donnees par le deplacement des points

:::


## chartType

**Type:** `"raceScatter"`

:::note{title=Description}
Nuage de points anime, adapte a l affichage de la distribution des donnees au fil du temps

:::


## dataset

**Type:** `Record[]`

:::note{title=Description}
Source de donnees, jeu de donnees conforme a la specification TidyData

:::


## dimensions

**Type:** `RaceScatterDimension[] | undefined`

:::note{title=Description}
Dimensions, utilisees pour distinguer les series de donnees et afficher la legende

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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "player" | undefined`

:::note{title=Description}
Canaux de mappage de dimension dans les graphiques race scatter

\- color : prend en charge le mapping de plusieurs dimensions vers le canal de couleur

\- detail : prend en charge le mapping de plusieurs dimensions vers le canal de détail

\- tooltip : prend en charge le mapping de plusieurs dimensions vers le canal d’infobulle

\- label : prend en charge le mapping de plusieurs dimensions vers le canal d’étiquette

\- row : prend en charge le mapping de plusieurs dimensions vers le canal de ligne

\- column : prend en charge le mapping de plusieurs dimensions vers le canal de colonne

\- player : prend en charge le mappage de plusieurs dimensions au canal du lecteur

:::


## measures

**Type:** `ScatterMeasure[] | undefined`

:::note{title=Description}
Mesures, au moins 2 mesures sont requises pour etre mappees respectivement aux axes X et Y

:::


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


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Ratio de formatage numérique, ne peut pas être 0

:::

**Exemple**

Longueur maximale pour la limitation des étiquettes. Lorsque la longueur du texte dépasse cette valeur, il est tronqué avec des points de suspension et visible au survol (effectif uniquement pour les axes catégoriels).



#### symbol

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**

Longueur maximale pour la limitation des étiquettes. Lorsque la longueur du texte dépasse cette valeur, il est tronqué avec des points de suspension et visible au survol (effectif uniquement pour les axes catégoriels).



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
Étiquette font weight


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}

:::

**Exemple**





\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}


:::

**Exemple**

Ligne d’axe width



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


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Ratio de formatage numérique, ne peut pas être 0

:::

**Exemple**

Longueur maximale pour la limitation des étiquettes. Lorsque la longueur du texte dépasse cette valeur, il est tronqué avec des points de suspension et visible au survol (effectif uniquement pour les axes catégoriels).



#### symbol

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**

Longueur maximale pour la limitation des étiquettes. Lorsque la longueur du texte dépasse cette valeur, il est tronqué avec des points de suspension et visible au survol (effectif uniquement pour les axes catégoriels).



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
Étiquette font weight


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}

:::

**Exemple**





\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}


:::

**Exemple**

Ligne d’axe width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Mode d’arrondi du formatage numérique, utilisant Intl.NumberFormat du navigateur, avec les mêmes règles que roundingMode dans Intl.NumberFormat

:::

### encoding

**Type:** `"xAxis" | "color" | "tooltip" | "label" | "yAxis" | "size" | undefined`

:::note{title=Description}
Canal auquel la mesure est mappée

\- xAxis: Measure mapped to the X-axis

\- yAxis : mesure mappée sur l’axe y

\- size: size mapped from the measure

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
Configuration du lecteur pour definir la dimension temporelle; configuration centrale du nuage de points anime

Controle la progression de lecture de la dimension temporelle via le lecteur afin de mettre a jour les donnees dynamiquement



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
Configuration du tri pour controler l ordre des valeurs de dimension





:::

**Exemple**
\- order:'asc'
\- orderBy:'date'

\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Description}
])

:::

**Exemple**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**
\- orderBy:'date'
\- orderBy:'profit'



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


## size

**Type:** `number | number[] | undefined`

:::note{title=Description}
Scatter chart measure size, used to define the size or size range of data points

\- If the size range is a number such as 10, the data point size is fixed at 10

\- If the size range is a two-item array such as [10, 40], the data point size ranges from 10 to 40

\- Mutually exclusive with sizeRange; lower priority than size

:::


## sizeRange

**Type:** `number | number[] | undefined`

:::note{title=Description}
Scatter chart measure size range, used to define the size range of data points,

\- If the size range is a two-item array such as [10, 40], the data point size ranges from 10 to 40

\- If the size range is a number such as 10, the data point size is fixed at 10

\- Mutually exclusive with sizeRange; higher priority than size

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
Configuration des etiquettes pour afficher les etiquettes de donnees sur les points

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


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Ratio de formatage numérique, ne peut pas être 0

:::

**Exemple**

Longueur maximale pour la limitation des étiquettes. Lorsque la longueur du texte dépasse cette valeur, il est tronqué avec des points de suspension et visible au survol (effectif uniquement pour les axes catégoriels).



#### symbol

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**

Longueur maximale pour la limitation des étiquettes. Lorsque la longueur du texte dépasse cette valeur, il est tronqué avec des points de suspension et visible au survol (effectif uniquement pour les axes catégoriels).



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
Étiquette font weight


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}

:::

**Exemple**





\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}


:::

**Exemple**

Ligne d’axe width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Mode d’arrondi du formatage numérique, utilisant Intl.NumberFormat du navigateur, avec les mêmes règles que roundingMode dans Intl.NumberFormat

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}


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
Selection d etiquette ; les conditions entre selecteurs sont OR par defaut.

:::


#### field

**Type:** `string`

:::note{title=Description}


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




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

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
"Mettre en surbrillance les barres dont les ventes dépassent 1000"

"Mettre en surbrillance la barre avec le taux de profit le plus élevé dans chaque région"



#### code

**Type:** `string`

:::note{title=Description}
Opérateur



\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est pas dans value



Decalage horizontal du point d annotation en pixels. Lorsque le point est a gauche (debut de l axe categoriel), une valeur positive est recommandee ; lorsqu il est a droite (fin de l axe categoriel), une valeur negative est recommandee.

Une valeur negative decale tout le composant vers la gauche (par exemple, -10).


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


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Indique si les etiquettes correspondant au crosshair sont affichees.




:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Indique si les etiquettes correspondant au crosshair sont affichees.




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est PAS dans la liste de valeurs.



Couleur du texte

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
\- 100000 est converti en 10W, ratio:10000, symbol:"W"



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

**Type:** `XLinearAxis | undefined`

:::note{title=Description}
Configuration de l axe X, axe numerique affichant la premiere valeur de mesure

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Description}

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
Ratio de formatage numérique, ne peut pas être 0

:::

**Exemple**

Longueur maximale pour la limitation des étiquettes. Lorsque la longueur du texte dépasse cette valeur, il est tronqué avec des points de suspension et visible au survol (effectif uniquement pour les axes catégoriels).



#### symbol

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**

Longueur maximale pour la limitation des étiquettes. Lorsque la longueur du texte dépasse cette valeur, il est tronqué avec des points de suspension et visible au survol (effectif uniquement pour les axes catégoriels).



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
Étiquette font weight


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}

:::

**Exemple**





\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}


:::

**Exemple**

Ligne d’axe width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Mode d’arrondi du formatage numérique, utilisant Intl.NumberFormat du navigateur, avec les mêmes règles que roundingMode dans Intl.NumberFormat

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


## yAxis

**Type:** `YLinearAxis | undefined`

:::note{title=Description}
Configuration de l axe Y, axe numerique affichant la deuxieme valeur de mesure

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Description}

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
Ratio de formatage numérique, ne peut pas être 0

:::

**Exemple**

Longueur maximale pour la limitation des étiquettes. Lorsque la longueur du texte dépasse cette valeur, il est tronqué avec des points de suspension et visible au survol (effectif uniquement pour les axes catégoriels).



#### symbol

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**

Longueur maximale pour la limitation des étiquettes. Lorsque la longueur du texte dépasse cette valeur, il est tronqué avec des points de suspension et visible au survol (effectif uniquement pour les axes catégoriels).



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
Étiquette font weight


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}

:::

**Exemple**





\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}


:::

**Exemple**

Ligne d’axe width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Mode d’arrondi du formatage numérique, utilisant Intl.NumberFormat du navigateur, avec les mêmes règles que roundingMode dans Intl.NumberFormat

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


## crosshairLine

**Type:** `CrosshairLine | undefined`

:::note{title=Description}
Configuration du viseur pour afficher la position precise des donnees



Configuration de la ligne de visee, un type de configuration permettant d afficher une ligne de visee (ligne de repere) dans le graphique

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


## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title=Description}
Configuration du style des points de donnees, sous forme d un style unique ou d un tableau, avec styles globaux ou conditionnels

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




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

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
"Mettre en surbrillance les barres dont les ventes dépassent 1000"

"Mettre en surbrillance la barre avec le taux de profit le plus élevé dans chaque région"



#### code

**Type:** `string`

:::note{title=Description}
Opérateur



\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est pas dans value



Decalage horizontal du point d annotation en pixels. Lorsque le point est a gauche (debut de l axe categoriel), une valeur positive est recommandee ; lorsqu il est a droite (fin de l axe categoriel), une valeur negative est recommandee.

Une valeur negative decale tout le composant vers la gauche (par exemple, -10).


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


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Indique si les etiquettes correspondant au crosshair sont affichees.




:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Indique si les etiquettes correspondant au crosshair sont affichees.




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est PAS dans la liste de valeurs.



Couleur du texte

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
Opacité de la couleur du marqueur de point



Opacité de la couleur du marqueur de point

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
Indique si les etiquettes correspondant au crosshair sont affichees.




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Indique si les etiquettes correspondant au crosshair sont affichees.




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


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
"Mettre en surbrillance les barres dont les ventes dépassent 1000"

"Mettre en surbrillance la barre avec le taux de profit le plus élevé dans chaque région"



#### code

**Type:** `string`

:::note{title=Description}
Opérateur



\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est pas dans value



Decalage horizontal du point d annotation en pixels. Lorsque le point est a gauche (debut de l axe categoriel), une valeur positive est recommandee ; lorsqu il est a droite (fin de l axe categoriel), une valeur negative est recommandee.

Une valeur negative decale tout le composant vers la gauche (par exemple, -10).


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


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Indique si les etiquettes correspondant au crosshair sont affichees.




:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Indique si les etiquettes correspondant au crosshair sont affichees.




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
\- not in : selectionne les elements de donnees dont la valeur du champ de dimension n est PAS dans la liste de valeurs.



Couleur du texte

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




Taille de police du texte.


**Exemple**

:::

**Exemple**
'right' le texte se trouve à gauche du point de repère



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
**Exemple**









:::

**Exemple**
'top' le texte se trouve en bas du point de repère



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
**Exemple**











:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Description}


:::

**Exemple**
"Obtenir la valeur de ventes la plus élevée comme référence de ligne de repère"

"Calculer les ventes moyennes pour la ligne de repère"



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
'outsideEnd'



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
left : le texte est a droite de la zone d annotation, avec son bord gauche aligne sur la zone.

center : le texte est centre dans la zone d annotation.

Couleur du texte.


**Exemple**

:::

**Exemple**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
middle : le texte est centre verticalement dans la zone d annotation.









:::

**Exemple**
'top'



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Description}


:::

**Exemple**
true



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
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Rayon des angles de bordure de la zone d annotation.

:::

**Exemple**
'solid'



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
Ligne d annotation numerique, ligne horizontale marquant une valeur specifique de l axe Y

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
"Obtenir la valeur de ventes la plus élevée comme référence de ligne de repère"

"Calculer les ventes moyennes pour la ligne de repère"



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

:::

**Exemple**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
**Exemple**



**Exemple**

:::

**Exemple**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
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



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Description}






:::

**Exemple**
true



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
2



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
Indique si les etiquettes correspondant au crosshair sont affichees.




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Indique si les etiquettes correspondant au crosshair sont affichees.




same as operator

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
'Texte du repère'



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
2



### areaBorderRadius

**Type:** `number | undefined`

:::note{title=Description}


:::

**Exemple**
4



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




## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Description}
Configuration de la langue

:::
