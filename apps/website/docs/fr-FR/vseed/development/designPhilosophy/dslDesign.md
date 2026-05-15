# Conception du DSL

:::info Signification

VSeed est un DSL déclaratif

- La conception d'un DSL est l'art d'exprimer les problèmes du domaine et permet de simplifier efficacement des problèmes complexes.
- Un DSL permet aux personnes qui le connaissent de coder aussi naturellement que dans leur langue maternelle. Une fois VSeed maîtrisé, rendre un graphique devient aussi simple qu'écrire en langage naturel.
- `VChart` et `VTable` suivent la même logique.


:::

:::tip

Un `DSL déclaratif` se concentre sur le « quoi » (What). Il décrit le résultat attendu ou l'état final souhaité, sans se préoccuper des étapes concrètes que l'ordinateur doit suivre pour atteindre cet état.


Un `DSL impératif` se concentre sur le « comment » (How). Il fournit une série d'instructions explicites et progressives, indiquant à l'ordinateur comment atteindre l'état cible étape par étape.
:::

## Compromis de VSeed

1. Focalisation sur le domaine (Focus)

VSeed sacrifie une partie de la généralité pour se concentrer sur la résolution de problèmes propres à un domaine. Son objectif principal n'est donc pas de satisfaire en profondeur toutes les exigences d'un type de graphique unique, mais de se concentrer sur la transformation des données avant le choix du type de graphique. Les autres fonctions, comme les thèmes, interactions et animations, sont laissées au consommateur.

2. Niveau d'abstraction (Abstraction Level)

`VSeed` fournit un niveau d'abstraction élevé, permettant aux utilisateurs de se concentrer sur la résolution du problème plutôt que sur les détails d'implémentation bas niveau. Cela améliore l'efficacité du développement. Par exemple, changer de type de graphique ne nécessite que de modifier un paramètre, sans se préoccuper des détails du changement.

3. La contrainte est un avantage (Constraint is Advantage)

`VSeed` met l'accent sur les contraintes: il reçoit un `VSeed DSL` et produit une `spec` pour `VTable` ou `VChart`. Cela permet aux utilisateurs de contrôler plus finement les fonctions d'un graphique individuel. `VSeed` n'est pas une boîte noire.

Ainsi, VSeed peut être simplement considéré comme un `Spec Builder` qui ne casse pas les capacités originales de `VTable` ou `VChart`. Tout utilisateur de `VChart` ou `VTable` peut intégrer rapidement `VSeed` dans sa plateforme existante.
