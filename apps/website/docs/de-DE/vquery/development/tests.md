# Testablauf

VQuery verwendet das Framework `rstest` für Tests. **Alle Befehle müssen im Stammverzeichnis ausgeführt werden.**

## Testmechanismus
Die VQuery-Tests decken ab:
- **Unit**: Hilfsfunktionen und Compilerlogik.
- **Examples**: Vollständige SQL-Erzeugung und Datenabfragen.

## Häufige Befehle

### Alle Tests ausführen
```bash
pnpm --filter=@visactor/vquery run test
```

### Snapshots aktualisieren
Wenn Änderungen an der SQL-Erzeugung erwartet sind, aktualisiere die Snapshots:
```bash
pnpm --filter=@visactor/vquery run test:update
```

### Coverage-Bericht
Testabdeckung erzeugen und prüfen:
```bash
pnpm --filter=@visactor/vquery run test:coverage
```
