# Flux de développement

## Démarrer le projet

```bash title="Démarrer le projet"
pnpm install && pnpm dev
```

## Comprendre les besoins et écrire le code

C'est un processus complexe, mais dans la plupart des cas, il se résume à trois choses :
1. Clarifier l'entrée : `vseed`
2. Clarifier la sortie : `vseed` devient `advancedVSeed`, ou `advancedVSeed` devient `spec`
3. Écrire le code et garantir que les nouvelles entrées produisent les sorties attendues

:::tip
Le `playground` (`apps/website/docs/fr-FR/playground/index.mdx`) peut être utilisé pour le débogage et le développement.
:::

## Créer de nouveaux cas de test

Si nécessaire, il est possible d'envisager la création de nouveaux cas de test.

:::tip
Lorsque la couverture diminue, de nouveaux cas de test doivent être créés.
:::

Dans le répertoire `packages/vseed/tests/*`, créez un nouveau fichier `testName.json` et écrivez-y la VSeed DSL.

Exécuter :

```bash title="Créer un cas de test"
pnpm build:canvasTest
```

## Exécuter les tests unitaires et mettre à jour la couverture

```bash title="Exécuter les tests unitaires et mettre à jour la couverture"
pnpm test:coverage
```

Vérifiez trois choses :
1. Tous les tests passent
2. Les changements de snapshots sont conformes aux attentes
3. La couverture n'a pas diminué

> Les changements de couverture seront automatiquement mis à jour dans README.md

## Mettre à jour la documentation des options de configuration

Si vous modifiez les définitions TypeScript des types de graphiques, veuillez mettre à jour la documentation des options de configuration.

:::tip
Toutes les définitions de types sous `packages/vseed/src/types/chartType` correspondent à la documentation des options de configuration de chaque graphique. En cas de changement, veuillez impérativement la mettre à jour.
:::

```bash title="Mettre à jour la documentation des options de configuration"
pnpm build:docs
```

## Publication et soumission

```bash title="Décrire les changements"
pnpm changeset
```

Après avoir exécuté `pnpm changeset`, suivez les indications pour effectuer les opérations suivantes :
1. Sélectionner les packages qui changent ; dans la plupart des cas, seulement `vseed`
2. Respecter le versionnement sémantique et choisir le type de changement. Dans la grande majorité des cas, appuyez deux fois sur Entrée pour ignorer `major` et `minor`, puis choisissez `patch`
3. Saisir la description du changement, par exemple : `fix: chart render error caused by only one measure`

:::tip Recommandation
Une fonctionnalité ou un Bugfix correspond à un `changeset` et à un `commit`

Un `Pull Request` correspond à une `issue`

Un `Pull Request` contenant plusieurs fonctionnalités ou plusieurs Bugfixes correspond à plusieurs `changeset`s et plusieurs `commit`s
:::

## Commit

```bash title="Commit tout le contenu"
git add .
git commit -m "fix: chart render error caused by only one measure"
git push
```
