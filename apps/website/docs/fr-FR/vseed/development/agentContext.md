# Contexte de développement Agent (VSeed)

Ce document s'adresse à agent-code et aux contributeurs. Il résume l'architecture principale, le flux de données et les modes d'extension du sous-paquet VSeed afin de construire rapidement une compréhension globale pendant le développement automatisé.

> Il s'agit d'un « index de contexte » conçu pour l'usage des Agents. Pour des notes d'ingénierie plus détaillées, consultez `packages/vseed/AGENTS.md`.

## 1. Objectif et positionnement

VSeed est un **Spec Builder** qui convertit `VSeed DSL` en Specs rendables `VChart` / `VTable`, afin de prendre en charge la génération et l'édition intelligentes de graphiques.

- Entrée : `VSeed DSL`
- Sortie : Spec `VChart` / `VTable`
- Flux principal : `AdvancedPipeline` + `SpecPipeline`

## 2. Pipeline en deux étapes

1. **AdvancedPipeline**

- Entrée : `VSeed DSL`
- Sortie : `AdvancedVSeed` (état intermédiaire sérialisable)
- Responsabilités : remodelage des données, inférence des valeurs par défaut, modélisation de l'encodage, thèmes et styles, configuration d'analyse

2. **SpecPipeline**

- Entrée : `AdvancedVSeed`
- Sortie : Spec finale (non sérialisable, rendue directement)
- Responsabilités : mapper l'état intermédiaire vers une configuration VChart / VTable concrète

## 3. Point d'entrée Builder

- Utilisez `Builder.from(vseed).build()` pour générer une Spec
- `prepare()` exécute dynamicFilter si nécessaire

Points d'entrée source :
- `packages/vseed/src/builder/builder/builder.ts`
- `packages/vseed/src/builder/builder/build.ts`
- `packages/vseed/src/builder/builder/prepare.ts`

## 4. Remodelage des données (cœur)

- `foldMeasures` : replie plusieurs mesures en une seule mesure et génère `foldInfo`
- `unfoldDimensions` : fusionne les dimensions par canal d'encodage visuel et génère `unfoldInfo`
- `dataReshapeByEncoding` : appel combiné (fold + unfold)

Points d'entrée source :
- `packages/vseed/src/dataReshape/foldMeasures.ts`
- `packages/vseed/src/dataReshape/unfoldDimensions.ts`
- `packages/vseed/src/dataReshape/dataReshapeByEncoding.ts`

## 5. Extension et enregistrement

- `registerAll()` : enregistre tous les graphiques et thèmes
- `registerXxx()` : enregistre la pipeline d'un type de graphique individuel
- `updateAdvanced()` / `updateSpec()` : insère des Pipes personnalisés

Points d'entrée source :
- `packages/vseed/src/builder/register/all.ts`
- `packages/vseed/src/builder/register/chartType/*`
- `packages/vseed/src/builder/register/custom.ts`

## 6. Principes de conception de Pipeline

- Les Pipes doivent être aussi atomiques que possible, en réduisant les if/else
- Les flux conditionnels sont combinés via des Adapters
- Le type de graphique est déterminé par la composition des Pipes

Référence :
- `apps/website/docs/fr-FR/vseed/development/designPhilosophy/pipeline/pipelineDesign.md`

## 7. Contexte plus complet

- `packages/vseed/AGENTS.md`
- `apps/website/docs/fr-FR/vseed/development/architecture.md`
- `apps/website/docs/fr-FR/vseed/development/designPhilosophy/vseed.md`
