# Remodelage des données - Principes

:::info Remodelage des données
VSeed propose une méthode universelle de remodelage des dimensions afin d'abaisser davantage le seuil d'accès à la visualisation des données.
:::

Le remodelage des données consiste à convertir les données d'une forme structurée vers une autre. L'essentiel est de modifier l'organisation des données, comme les lignes, colonnes, index et hiérarchies, afin de répondre à différents besoins d'analyse ou de traitement tout en conservant l'intégrité des données.

## Remodelage des dimensions

Python et R disposent déjà d'outils prenant en charge le remodelage des dimensions :
1. Python Pandas fournit `pivot` et `melt` pour le remodelage des données
2. R tidyverse fournit `pivot_longer` et `pivot_wider` pour le remodelage des données

## Augmentation et réduction des dimensions

L'augmentation et la réduction des dimensions rejoignent, dans l'esprit, la théorie des catégories (objets, morphismes et isomorphismes), mais leur implémentation ne suit pas strictement cette théorie.

Points importants :
1. Lors de l'augmentation de dimension, les informations « nom de mesure » et « valeur de mesure » inexistantes sont créées « à partir de rien »
2. Lors de la réduction de dimension, les informations « nom de mesure » et « valeur de mesure » présentes dans les données sont « supprimées »

L'augmentation de dimension peut transformer complètement les données, mais les noms de colonnes de dimension peuvent contenir des valeurs nulles ; le remplissage d'informations supplémentaires est donc pris en charge.
La réduction de dimension perd du contenu informationnel. Il faut donc conserver des informations de transformation supplémentaires pour atteindre une véritable transformation isomorphe ; sinon, des informations seront forcément perdues.

![commonDataReshape](/images/commonDataReshape.png)

## Augmentation et réduction des dimensions groupées

Comme pour l'augmentation et la réduction ordinaires, il existe des scénarios similaires d'ajout ou de perte d'information. De plus, l'introduction du groupement génère davantage de données vides.

Rôle :
1. **Groupement des mesures** : permet de traiter facilement les données de détail via l'augmentation de dimension groupée
2. **Requêtes multi-groupes** : plusieurs SQL peuvent facilement obtenir plusieurs jeux de données de détail, puis les fusionner en un seul jeu via la réduction de dimension groupée

![groupedDataReshape](/images/groupedDataReshape.png)

## Dérivation des règles

### Augmentation de dimension

![rule](/images/ruleDataReshape.png)

![commonDataReshape2](/images/commonDataReshape2.png)

:::tip
1. Pour plusieurs mesures, l'augmentation de dimension ramène le nombre de mesures à 1. Une mesure reste aussi 1 après augmentation.
2. Pour plusieurs dimensions, l'augmentation de dimension ajoute une dimension. Même 0 dimension devient 1.
3. Avec 0 dimension et 1 mesure, on peut appliquer l'augmentation de dimension à répétition pour obtenir n'importe quel nombre de dimensions et 1 mesure, ce qui permet aussi de tracer un histogramme avec une seule mesure.
:::

### Réduction de dimension

![rule](/images/ruleDataReshape2.png)

![groupedDataReshape2](/images/groupedDataReshape2.png)

:::tip
1. Pour plusieurs mesures, la réduction de dimension fait former un produit cartésien entre les valeurs de dimension et les mesures, créant de nouvelles mesures
2. Pour plusieurs dimensions, la réduction de dimension fait former un produit cartésien entre plusieurs valeurs de dimension, créant de nouvelles dimensions
:::

## Exemples

#### 0 dimension, 1 mesure
![0d1m](/images/0d1m.png)
#### 0 dimension, 3 mesures
![0d3m](/images/0d3m.png)
#### 1 dimension, 1 mesure
![1d1m](/images/1d1m.png)
#### 1 dimension, 2 mesures
![1d2m](/images/1d2m.png)
#### 2 dimensions, 1 mesure
![2d1m](/images/2d1m.png)
#### 2 dimensions, 2 mesures
![2d2m](/images/2d2m.png)
