# VSeed

:::info Résumé en une phrase
Répond aux besoins métier flexibles par le haut, contraint les formes d'accès aux données par le bas, et orchestre les données de manière unifiée pour simplifier la complexité.
:::

## Qu'est-ce que VSeed ?

`VSeed` est un outil de visualisation orienté analyse de données. Il se concentre sur la fourniture de capacités de transformation de données très cohérentes entre différents types de graphiques, tout en proposant certaines fonctionnalités prêtes à l'emploi pour répondre aux besoins d'analyse légère.

## Quels sont les avantages de VSeed ?

> D'abord, il est réellement facile à utiliser ; ensuite, il est effectivement très flexible ; enfin, VSeed contient de nombreuses abstractions, et il faut comprendre comment VSeed remodèle les données pour l'utiliser parfaitement.

1. La manière la plus intuitive de changer de type de graphique [Demo](/vseed/guide/intro/chartTypeSwitch)
2. Les graphiques croisés les plus faciles à utiliser [Demo](/vseed/guide/intro/pivotAndCombine)
3. Une puissante capacité de remodelage des données, sans aucun traitement manuel ; n'importe quel nombre de dimensions et de mesures, et n'importe quel type de graphique, peuvent produire une visualisation [Demo](/vseed/guide/intro/dataReshape)
4. `VSeed` est entièrement sérialisable, ce qui permet le transfert multiplateforme de `VSeed DSL` [Demo](/vseed/guide/intro/crossPlatformRender)
5. Prêt à l'emploi : formatage numérique, internationalisation, thèmes clair/sombre, styles courants, etc. [Demo](/vseed/guide/intro/internationalization)
6. Excellentes performances de traitement des données, avec prise en charge du traitement côté `Node` et de la visualisation côté `Web` [Demo](/vseed/guide/intro/separateBuild)

## Quelles sont les limites de VSeed ?

1. `VSeed` n'est pas responsable du réglage fin de chaque détail d'un graphique individuel. Ce type de besoin est couvert par `VChart` et `VTable`. `VSeed` fournit uniquement la capacité de modifier `spec` de manière flexible ; les utilisateurs peuvent ajuster chaque détail du graphique selon leurs besoins.
2. Seuls les jeux de données conformes à la norme `tidyData` peuvent être visualisés par `VSeed`. Les jeux de données non standard ne sont pas acceptés par `VSeed`.
3. Construit sur l'écosystème `VisActor`, il suppose que les utilisateurs comprennent les concepts de base de `VChart` et `VTable`.

## Quels sont les principes de VSeed ?

1. `VSeed` doit prendre en charge la sérialisation.
2. `VSeed` n'a pas besoin de fournir trop de capacités de configuration de style ; il doit se concentrer sur la relation entre les graphiques et les données.
3. `VSeed` doit encapsuler les fonctionnalités générales courantes du domaine analytique, comme le formatage numérique, l'internationalisation, les thèmes, les styles courants et les fonctions courantes, afin de les rendre prêtes à l'emploi.
4. Les besoins de personnalisation plus flexibles doivent être pris en charge par les utilisateurs eux-mêmes. VSeed expose donc seulement un Spec Builder pour construire les specs de VChart et VTable.
   - Les utilisateurs peuvent contrôler librement les instances VChart et VTable.
   - Les utilisateurs peuvent modifier les specs VChart et VTable selon leurs besoins.

## Pourquoi concevoir VSeed ?

1. `VChart` ne pourra jamais basculer de manière transparente vers `VTable`, et inversement. Face à ce besoin, une abstraction de niveau supérieur est inévitable.
2. Les utilisateurs de `VChart` et `VTable` doivent traiter eux-mêmes les données. Ce travail est répété involontairement des centaines ou des milliers de fois. `VSeed` veut réduire la complexité du traitement des données dans les scénarios courants et limiter le travail répétitif.
3. Il peut réduire dans une certaine mesure le seuil d'utilisation de `VChart` et `VTable`, par exemple pour rendre un `PivotChart` avec `VTable`.
4. `VSeed` pourrait à terme devenir un sous-module de `HeadlessBI`, destiné à construire des outils génériques d'analyse de données.
