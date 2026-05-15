# Scripts courants

Pour maintenir la cohérence du monorepo, **tous les scripts doivent être exécutés depuis la racine du projet**.

## Script principal (g)

`g` (Generator) est le script d'assistance le plus important dans le développement de VSeed.

```bash
pnpm run g
```

**Description** :
Cette commande combine `build:test`, `build:docs` et `build:api`, et sert à maintenir les ressources de l'environnement de développement synchronisées :
1. **Générer les cas de test** : analyse les JSON Specs sous `tests/integrations` et génère les fichiers `.test.ts` correspondants.
2. **Générer la documentation** : analyse les définitions de types TypeScript et met à jour la documentation API dans `apps/website`.

**Quand l'utiliser** :
- Après avoir modifié la logique des graphiques ou ajouté un nouveau type de graphique.
- Après avoir modifié les définitions de types TypeScript.
- Avant de valider le code.

## Développement et build

### Lancer l'environnement de développement
Lance simultanément le mode watch de VSeed et le site de documentation.
```bash
pnpm run dev
```

### Builder le projet
Construit la bibliothèque cœur de VSeed.
```bash
pnpm --filter=@visactor/vseed run build
```

## Tests

### Exécuter tous les tests
```bash
pnpm --filter=@visactor/vseed run test
```

### Exécuter les tests unitaires
```bash
pnpm --filter=@visactor/vseed run test:unit
```

### Exécuter les tests d'intégration
```bash
pnpm --filter=@visactor/vseed run test:integration
```

### Mettre à jour les snapshots de test
Exécutez ceci lorsque vos modifications de code provoquent des différences de snapshot attendues :
```bash
pnpm --filter=@visactor/vseed run test:update
```

## Qualité du code

### Vérification Lint
```bash
pnpm run lint
```

### Vérification des types
```bash
pnpm run typecheck
```
