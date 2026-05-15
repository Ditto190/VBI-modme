---
title: Veröffentlichen
---


# Veröffentlichen

## Changeset erzeugen

Um neue Changesets zu erzeugen, führen Sie `pnpm changeset` im Stammverzeichnis des Repositorys aus. Die dabei im Verzeichnis `.changeset` erzeugten Markdown-Dateien sollten in das Repository committed werden.
```bash
pnpm changeset
```

Nach dem Erzeugen des Changesets führen Sie einen `git commit` aus:
```bash
git add .
git commit -m "chore: commit message"
```

Der obige Prozess kann mehrfach wiederholt werden. Der Inhalt jedes Changesets wird für die finale Versionsveröffentlichung gesammelt.

## Version aktualisieren

Führen Sie den folgenden Befehl aus, um die Version zu aktualisieren und das ChangeLog zu aktualisieren.
```bash
pnpm changeset version
```

Abhängigkeiten und lock file aktualisieren:
```bash
pnpm install
```

Änderungen committen:
```bash
git add .
git commit -m "chore: release message"
git push
```

Nachdem der PR in den Branch `main` gemergt wurde, wird der changesets workflow automatisch ausgelöst und führt das Packaging sowie die Veröffentlichung aus.
