# Processus de test

VSeed suit un processus strict de développement piloté par les tests. **Toutes les commandes de test doivent être exécutées depuis la racine du projet.**

## Catégories de tests

### 1. Tests unitaires (Unit Tests)
- **Objectif** : tester les fonctions utilitaires indépendantes et la logique des nœuds Pipeline.
- **Emplacement** : `packages/vseed/tests/unit`
- **Exécution** :
  ```bash
  pnpm --filter=@visactor/vseed run test:unit
  ```

### 2. Tests d'intégration (Integration Tests)
- **Objectif** : tester le flux complet de génération de graphique (VSeed Spec -> VChart Spec).
- **Mécanisme** : piloté par les données. Lit les fichiers JSON sous `packages/vseed/tests/integrations`, génère automatiquement les cas de test et compare les snapshots.
- **Exécution** :
  ```bash
  pnpm --filter=@visactor/vseed run test:integration
  ```

## Workflow principal (Workflow)

### Étape 1 : Exécuter les tests
Pendant le développement, exécutez fréquemment les tests concernés pour vérifier la logique.
```bash
# Exécuter tous les tests
pnpm --filter=@visactor/vseed run test
```

### Étape 2 : Traiter les changements de snapshot
Si vos changements de code modifient la Spec de sortie (par exemple en corrigeant un Bug ou en ajoutant une Feature) :
1. Vérifiez le Diff dans la sortie console et confirmez que les changements sont attendus.
2. S'ils sont attendus, exécutez la commande de mise à jour :
   ```bash
   pnpm --filter=@visactor/vseed run test:update
   ```

### Étape 3 : Vérifier la couverture
Avant de valider le code, il est recommandé de vérifier la couverture des tests.
```bash
pnpm --filter=@visactor/vseed run test:coverage
```

## Notes
- **Génération automatique** : les fichiers `.test.ts` des tests d'intégration sont générés par le script `g`, **ne les modifiez pas manuellement**.
- **Ajout de cas de test** : pour ajouter des tests d'intégration, ajoutez simplement un nouveau fichier de configuration JSON dans le répertoire de catégorie approprié sous `packages/vseed/tests/integrations`, puis exécutez `pnpm run g`.
