# Häufige Skripte

Um die Konsistenz des Monorepos zu wahren, **müssen alle Skripte im Projektstamm ausgeführt werden**.

## Kernskript (g)

```bash
pnpm run g
```
**Beschreibung**: Das VQuery-Skript `g` übernimmt:
1. `build:test`: Testressourcen kompilieren.
2. `build:docs`: API-Dokumentation erzeugen.

## Entwicklung und Build

### Build
```bash
pnpm --filter=@visactor/vquery run build
```

## Tests

### Tests ausführen
VQuery verwendet Rstest für Tests.
```bash
pnpm --filter=@visactor/vquery run test
```

### Snapshots aktualisieren
```bash
pnpm --filter=@visactor/vquery run test:update
```

### Coverage
```bash
pnpm --filter=@visactor/vquery run test:coverage
```
