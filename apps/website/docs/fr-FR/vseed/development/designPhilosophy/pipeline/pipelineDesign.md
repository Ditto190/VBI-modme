# Conception de pipeline

:::info Pourquoi Pipeline ?
1. C'est un choix des seniors de l'équipe.
2. L'avantage de Pipeline est de permettre à `VSeed` de contrôler indépendamment le flux d'exécution de chaque type de graphique. Avec une bonne conception, l'implémentation de chaque type de graphique peut être découplée tout en restant réutilisable localement, et chaque type de graphique peut contrôler parfaitement chaque détail. C'est ce qu'apporte Pipeline, et c'est précisément ce dont `VSeed` a le plus besoin.
3. En comparaison, les défauts du modèle Pipeline peuvent être évités dès la conception. Il suffit de réduire la taille de chaque `Pipe` et de limiter les dépendances entre `Pipe`s pour éviter largement les défauts de ce modèle.
4. Après quatre générations de conception et d'optimisation de Pipeline, VSeed en est déjà à la cinquième version. Les pièges à rencontrer ont déjà été rencontrés.

:::

## Qu'est-ce que Pipeline ?

Pipeline est une abstraction puissante et une pratique d'ingénierie. Elle décompose une tâche complexe en une série de petites étapes connectées et exécutées dans l'ordre. Sa philosophie de conception et son implémentation sont profondément influencées par les idées centrales de la programmation fonctionnelle (FP).

### Avantages de Pipeline :
- Modularité : implémentation atomique, puis composition des atomes en modules.
- Automatisation : une fois l'entrée définie, la sortie est obtenue automatiquement sans se préoccuper de l'implémentation interne.
- Fonction pure : une entrée donnée produit toujours la sortie attendue, ce qui est une caractéristique des fonctions pures.
- Parallélisme : prend naturellement en charge la concurrence.
- Réutilisabilité : chaque module peut être réutilisé.
- Testabilité : en théorie, chaque module est indépendant et peut être testé séparément pour garantir la qualité.
- Traçabilité : les entrées et sorties de chaque étape sont claires, ce qui facilite la localisation des problèmes et la surveillance de l'état du processus.
- Mise en cache : en théorie, la sortie d'un seul `Pipe` peut être mise en cache séparément, évitant les calculs répétés et améliorant l'efficacité.

### Inconvénients de Pipeline :
- Dépendance séquentielle : lorsque des `Pipe`s ont des dépendances d'ordre, le coût de compréhension augmente, car il faut comprendre les étapes précédentes avant les suivantes. Une compréhension approfondie du flux global est nécessaire pour localiser rapidement les problèmes.
- Coût de débogage : comme Pipeline s'exécute dans l'ordre, l'échec d'une étape fait échouer toute la Pipeline. Le débogage devient plus difficile, car il faut localiser puis corriger l'étape fautive.
- Problèmes de performance : comme Pipeline s'exécute dans l'ordre, chaque étape doit attendre la sortie de l'étape précédente. Cela peut entraîner des problèmes de performance, notamment lorsqu'une étape prend beaucoup de temps.
- Programmation fonctionnelle : de nouveaux concepts doivent être compris, ce qui introduit un coût d'apprentissage. Les principes de conception et les détails d'implémentation doivent donc être documentés dans le guide de contribution pour aider les autres développeurs.

## Comment écrire Pipeline dans VSeed ?

### Modèle de composition de Pipe

Plusieurs `Pipe`s fonctionnels peuvent être composés en un `Pipe` fonctionnel plus grand, ou en une Pipeline plus complexe.

Dans VSeed, une Pipeline complète correspond à l'implémentation d'un type de graphique. En décrivant les relations de composition entre les `Pipe`s, on peut créer différents types de graphiques. Lors de la composition de Pipeline, il n'est pas nécessaire de se préoccuper de l'implémentation concrète de chaque `pipe`.


#### Différences de composition

Par exemple :

Les graphiques en ligne et les graphiques en aires peuvent réutiliser de nombreuses fonctions, comme les labels, les légendes et les axes. Cependant, le graphique en ligne n'a pas de style de marque d'aire ; la pipeline résout donc cette différence en composant des `Pipe`s fonctionnels, sans aucune instruction `if`.

```ts
const lineChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,
]

const areaChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,

  // Seuls les graphiques en aires ont un style de marque d'aire
  areaStyle,
]
```


### Modèle d'adaptateur de Pipe

En plus du modèle de composition, la construction d'un `Pipe` comporte souvent certaines conditions. Pour satisfaire différentes compositions de `Pipe` selon les conditions, VSeed utilise largement des adaptateurs de `Pipe`.

#### Conditions de composition

Par exemple :

Les graphiques en ligne ont une capacité de pivot. Sans pivot, ils sont rendus par VChart et produisent une spec VChart. Avec pivot, ils sont rendus par VTable et produisent une spec VTable.

Les graphiques en ligne pivot doivent réutiliser la plupart des fonctions de base des graphiques en ligne, comme les labels, les légendes et les axes. Le modèle d'adaptateur est donc nécessaire pour adapter les `Pipe`s d'un graphique en ligne en `Pipe`s de graphique en ligne pivot.

```ts
const pivotLineChartPipeline = [
  initPivotChart,
  pivotIndicators([
    label,
    xAxis,
    yAxis,
    lineStyle,
    pointStyle,
  ]),
  pivotChartLegend,
]

const commonLineChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,
]

const lineChartPipeline = [
  pivotAdapter(commonLineChartPipeline, pivotLineChartPipeline)
]
```

En résumé, chaque adapter est un `if else`. Les conditions cachées dans un `pipe` peuvent être abstraites en adapter ; le `if else` est donc déplacé au niveau le plus haut. On obtient ainsi une Pipeline aux dépendances plus claires et au coût de maintenance réduit.

### Unité fondamentale de Pipeline : Pipe fonctionnel

VSeed attend de tous les types de graphiques qu'ils utilisent la fonctionnalité comme unité fondamentale, afin de fournir suffisamment de réutilisation et d'extensibilité. La pipeline d'un type de graphique est construite de bas en haut. Chaque `Pipe` fonctionnel doit être un module indépendant, testable et réutilisable.

Le point le plus important est d'abstraire les différences fonctionnelles en différents `Pipe`s, c'est-à-dire d'écrire moins de `if else`, plutôt que d'écrire un grand `Pipe` exhaustif.

#### Pipe fonctionnel aplati

Par exemple :

Les graphiques en barres, en colonnes, en lignes, en aires et les nuages de points ont tous des axes X et Y. Ils sont similaires mais légèrement différents. Si l'on écrit un grand `axes` pipe exhaustif, cela pourrait ressembler à ceci :

```ts
const lineChartPipeline = [
  axes
]
const barChartPipeline = [
  axes
]
const areaChartPipeline = [
  axes
]
const scatterChartPipeline = [
  axes
]
const axes = (spec, context) => {
  if (isLine || isArea || isColumn){
    // Les graphiques en lignes, en aires et en colonnes ont un axe discret et un axe continu
    return xy(spec, context)
  }
  if (isScatter){
    // Les nuages de points ont deux axes continus
    return yy(spec, context)
  }
  if (isBar){
    // Les graphiques en barres ont un axe discret et un axe continu, mais leur direction d'axe diffère de celle des graphiques en lignes, en aires et en colonnes
    return yx(spec, context)
  }
}

const xy = (spec, context) => {
  linearAxis(spec, context, {orient: 'left'})
  bandAxis(spec, context, {orient: 'bottom'})
}

const yx = (spec, context) => {
  linearAxis(spec, context, {orient: 'bottom'})
  bandAxis(spec, context, {orient: 'left'})
}

const yy = (spec, context) => {
  linearAxis(spec, context, {orient: 'bottom'})
  linearAxis(spec, context, {orient: 'left'})
}
```

La logique ci-dessus sélectionne différents sous-`pipe`s fonctionnels selon le type de graphique à l'intérieur d'un seul `Pipe` fonctionnel. Cela provoque deux problèmes :
1. Comment réutiliser les fonctions répétées dans `xy`, `yx` et `yy` ? De nombreuses sous-fonctions similaires mais différentes doivent être appelées à répétition dans différents sous-`pipe`s fonctionnels. Les dépendances deviennent facilement complexes, ce qui augmente les coûts de maintenance.
2. Lorsqu'on modifie les fonctions des graphiques en ligne ou en aires, il est facile d'oublier les graphiques en barres, car la logique a divergé. Il faut donc tenir compte des différences lors de l'implémentation de nouvelles fonctions.

Lorsque toute la spec pipeline grandit jusqu'à plusieurs centaines de `pipe`s, cette logique d'écriture entraîne un coût de maintenance très élevé. Nous avons donc besoin d'une manière plus simple de sélectionner différents sous-`pipe`s fonctionnels selon le type de graphique.

En poursuivant l'exemple, on abstrait les différences en différents `Pipe`s, on encapsule ces différences à une granularité fonctionnelle plus fine, puis on les compose directement dans la pipeline. Cela évite les problèmes ci-dessus.

```ts
const lineChartPipeline = [
  xBandAxis,
  yLinearAxis,
]
const barChartPipeline = [
  yBandAxis,
  xLinearAxis,
]
const areaChartPipeline = [
  xBandAxis,
  yLinearAxis,
]
const scatterChartPipeline = [
  xLinearAxis,
  yLinearAxis,
]

const xBandAxis = (spec, context) => {
}
const yBandAxis = (spec, context) => {
}
const xLinearAxis = (spec, context) => {
}
const yLinearAxis = (spec, context) => {
}
```

Dans l'exemple ci-dessus, aucun `axes` pipe n'est implémenté. `xBandAxis`, `yBandAxis`, `xLinearAxis` et `yLinearAxis` sont composés directement. Cela évite de sélectionner différents sous-`pipe`s fonctionnels dans un `axes` pipe selon le type de graphique, évite les branches basées sur le type de graphique et réduit l'usage de `if else`.

Toutes les branches liées aux différences de type de graphique doivent se situer au-dessus de Pipeline. Sauf nécessité absolue, Pipeline n'a pas besoin de sélectionner différents sous-`pipe`s fonctionnels selon le type de graphique.

Cette méthode de composition correspond à la philosophie de conception de VSeed : utiliser une composition plus plate de `Pipe`s fonctionnels, plutôt que de construire un grand `Pipe` fonctionnel exhaustif avec des conditions `if else`.
