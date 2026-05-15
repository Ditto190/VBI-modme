# Häufig verwendete Skripte

Um die Monorepo-Konsistenz zu wahren, **müssen alle Skripte im Projektstammverzeichnis ausgeführt werden**.

## Kernskript (g)

`g` (Generator) ist das wichtigste Hilfsskript in der VSeed-Entwicklung.

```bash
pnpm run g
```

**Beschreibung**:
Dieser Befehl ist eine Kombination aus `build:test`, `build:docs` und `build:api` und wird verwendet, um die Ressourcen der Entwicklungsumgebung synchron zu halten:
1. **Testfälle generieren**: Liest JSON Specs unter `tests/integrations` und erzeugt die entsprechenden `.test.ts`-Dateien.
2. **Dokumentation generieren**: Liest TypeScript-Typdefinitionen und aktualisiert die API-Dokumentation in `apps/website`.

**Einsatzszenarien**:
- Nach Änderungen an der Chart-Logik oder beim Hinzufügen eines neuen Chart-Typs.
- Nach Änderungen an TypeScript-Typdefinitionen.
- Vor dem Committen von Code.

## Entwicklung und Build

### Entwicklungsumgebung starten
Startet den VSeed-Watch-Modus und die Dokumentationsseite gleichzeitig.
```bash
pnpm run dev
```

### Projekt bauen
Baut die VSeed-Core-Bibliothek.
```bash
pnpm --filter=@visactor/vseed run build
```

## Tests

### Alle Tests ausführen
```bash
pnpm --filter=@visactor/vseed run test
```

### Unit-Tests ausführen
```bash
pnpm --filter=@visactor/vseed run test:unit
```

### Integrationstests ausführen
```bash
pnpm --filter=@visactor/vseed run test:integration
```

### Test-Snapshots aktualisieren
Führen Sie dies aus, wenn Ihre Codeänderungen erwartete Snapshot-Diffs verursachen:
```bash
pnpm --filter=@visactor/vseed run test:update
```

## Codequalität

### Lint-Prüfung
```bash
pnpm run lint
```

### Typprüfung
```bash
pnpm run typecheck
```
