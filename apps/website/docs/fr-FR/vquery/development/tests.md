# Processus de test

VQuery utilise le framework `rstest` pour les tests. **Toutes les commandes doivent être exécutées depuis le répertoire racine.**

## Mécanisme de test
Les tests de VQuery couvrent :
- **Unit** : fonctions utilitaires et logique du compilateur.
- **Examples** : flux complet de génération SQL et de requête de données.

## Commandes courantes

### Exécuter tous les tests
```bash
pnpm --filter=@visactor/vquery run test
```

### Mettre à jour les snapshots
Si les changements de génération SQL sont attendus, mettez à jour les snapshots :
```bash
pnpm --filter=@visactor/vquery run test:update
```

### Rapport de couverture
Générer et consulter la couverture de test :
```bash
pnpm --filter=@visactor/vquery run test:coverage
```
