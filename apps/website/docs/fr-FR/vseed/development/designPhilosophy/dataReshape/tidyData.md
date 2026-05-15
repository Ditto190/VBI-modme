# TidyData

:::info Signification
TidyData, grâce à son principe central « variables en colonnes, observations en lignes », réduit fortement la complexité du nettoyage des données et nous permet de nous concentrer sur les problèmes métier plutôt que sur la conversion des formats de données.
:::

## Article

L'auteur de l'article est `Hadley Wickham`. L'article traite d'un petit module du traitement des données, le rangement des données, car les jeux de données propres sont plus faciles à manipuler, modéliser et visualiser, et possèdent une structure spécifique.

La lecture de cet article est vivement recommandée. Voir : [Tidy Data](https://www.jstatsoft.org/article/view/v059i10)

## TidyData dans VSeed

La configuration `dataset` dans VSeed DSL correspond à un jeu de données au format `TidyData`.

Caractéristiques principales :
1. **Chaque variable occupe une colonne** : les valeurs des variables sont stockées dans des colonnes distinctes, par exemple « âge » et « sexe ».
2. **Chaque observation occupe une ligne** : toutes les valeurs des variables d'un objet observé forment une ligne, par exemple l'âge et le sexe d'une personne.
3. **Chaque unité d'observation occupe une table** : différents types d'unités d'observation, comme les personnes, le temps ou les lieux, doivent être stockés séparément.

Ainsi, le résultat d'une requête `SQL` peut être transmis directement à la configuration `dataset` de `VSeed`, sans traitement de données supplémentaire, afin de réaliser rapidement analyse et visualisation.
