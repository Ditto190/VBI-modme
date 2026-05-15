---
title: Publication
---


# Publication

## Générer un changeset

Pour générer de nouveaux changesets, exécutez `pnpm changeset` à la racine du dépôt. Les fichiers markdown générés dans le répertoire `.changeset` doivent être commités dans le dépôt.
```bash
pnpm changeset
```

Après avoir généré le changeset, effectuez un `git commit` :
```bash
git add .
git commit -m "chore: commit message"
```

Le processus ci-dessus peut être répété plusieurs fois. Le contenu de chaque changeset sera cumulé dans la publication finale de la version.

## Mettre à jour la version

Exécutez la commande suivante pour mettre à jour la version et le ChangeLog.
```bash
pnpm changeset version
```

Mettez à jour les dépendances et le lock file :
```bash
pnpm install
```

Commitez les changements :
```bash
git add .
git commit -m "chore: release message"
git push
```

Une fois la PR mergée dans la branche `main`, le changesets workflow sera déclenché automatiquement pour exécuter les tâches de packaging et de publication.
