# Scripts courants

Pour préserver la cohérence du monorepo, **tous les scripts doivent être exécutés depuis la racine du projet**.

## Script principal (g)

```bash
pnpm run g
```
**Description** : le script `g` de VQuery gère :
1. `build:test` : compiler les ressources de test.
2. `build:docs` : générer la documentation d'API.

## Développement et build

### Build
```bash
pnpm --filter=@visactor/vquery run build
```

## Tests

### Exécuter les tests
VQuery utilise Rstest pour les tests.
```bash
pnpm --filter=@visactor/vquery run test
```

### Mettre à jour les snapshots
```bash
pnpm --filter=@visactor/vquery run test:update
```

### Couverture
```bash
pnpm --filter=@visactor/vquery run test:coverage
```
