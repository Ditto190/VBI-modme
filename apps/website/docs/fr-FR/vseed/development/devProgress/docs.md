# Documentation

:::info
Écrire des types `TypeScript` revient indirectement à écrire la documentation des options de configuration.
:::

La documentation de tous les types de graphiques VSeed se trouve dans le répertoire [`packages/vseed/src/types/chartType`](https://github.com/VisActor/VSeed/tree/main/packages/vseed/src/types/chartType).

## Générer automatiquement la documentation

```bash title="source: scripts/build-docs.js"
pnpm run build:docs
```


:::warning
Ne modifiez pas directement le contenu de la documentation, car il peut être écrasé à tout moment.

`build:docs` se termine en quelques secondes, les mises à jour incrémentales ne sont donc pas implémentées. Chaque génération de documentation supprime toute l'ancienne documentation et génère une nouvelle documentation.

:::
