# Conception de l'architecture

VSeed est un générateur de graphiques fondé sur une configuration sémantique, conçu pour relier l'intention utilisateur aux moteurs de rendu sous-jacents (VChart/VTable).

> [Deep Wiki](https://deepwiki.com/VisActor/VSeed)

## Concepts clés

### 1. Architecture de pipeline (Pipeline Architecture)
VSeed adopte un modèle de pipeline pour construire progressivement la Spec du graphique. L'ensemble du processus se divise en deux grandes étapes :

- **AdvancedPipeline**:
  - Entrée : objet `VSeed` initial.
  - Responsabilités : remodelage des données (Data Reshape), application des thèmes, inférence des configurations par défaut.
  - Sortie : `AdvancedVSeed` (modèle d'état intermédiaire).

- **SpecPipeline**:
  - Entrée : `AdvancedVSeed`.
  - Responsabilités : convertir le modèle d'état intermédiaire en éléments de configuration VChart/VTable concrets.
  - Sortie : Spec finale rendable.

### 2. Pattern Builder
La classe `VSeedBuilder` est le coordinateur central, responsable de la gestion du Context, de l'enregistrement des plugins et de l'exécution du pipeline.

### 3. Extensibilité par plugins (Extensibility)
Les capacités principales de VSeed, comme les types de graphiques pris en charge, sont entièrement implémentées par un mécanisme d'enregistrement de plugins.
- **Chart Type Registration**: Chaque type de graphique (par exemple `bar`, `line`) est un plugin enregistré.
- **Theme Registration**: L'enregistrement de thèmes personnalisés est pris en charge.
