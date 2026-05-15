# Testablauf

VSeed folgt einem strikten testgetriebenen Entwicklungsablauf. **Alle Testbefehle müssen im Projektstammverzeichnis ausgeführt werden.**

## Testkategorien

### 1. Unit-Tests (Unit Tests)
- **Ziel**: Einzelne Hilfsfunktionen und die Logik von Pipeline-Knoten testen.
- **Ort**: `packages/vseed/tests/unit`
- **Ausführen**:
  ```bash
  pnpm --filter=@visactor/vseed run test:unit
  ```

### 2. Integrationstests (Integration Tests)
- **Ziel**: Den vollständigen Ablauf der Chart-Generierung testen (VSeed Spec -> VChart Spec).
- **Mechanismus**: Datengetrieben. Liest JSON-Dateien unter `packages/vseed/tests/integrations`, generiert automatisch Testfälle und vergleicht Snapshots.
- **Ausführen**:
  ```bash
  pnpm --filter=@visactor/vseed run test:integration
  ```

## Kernworkflow (Workflow)

### Schritt 1: Tests ausführen
Führen Sie während der Entwicklung häufig die relevanten Tests aus, um die Logik zu überprüfen.
```bash
# Alle Tests ausführen
pnpm --filter=@visactor/vseed run test
```

### Schritt 2: Snapshot-Änderungen behandeln
Wenn Codeänderungen dazu führen, dass sich die Ausgabe-Spec ändert (zum Beispiel durch eine Bugfix oder ein neues Feature):
1. Prüfen Sie den Diff in der Konsolenausgabe und bestätigen Sie, ob die Änderungen erwartet sind.
2. Wenn sie erwartet sind, führen Sie den Aktualisierungsbefehl aus:
   ```bash
   pnpm --filter=@visactor/vseed run test:update
   ```

### Schritt 3: Coverage prüfen
Vor dem Committen wird empfohlen, die Testabdeckung zu prüfen.
```bash
pnpm --filter=@visactor/vseed run test:coverage
```

## Hinweise
- **Automatisch generiert**: Die `.test.ts`-Dateien der Integrationstests werden vom Skript `g` generiert. **Bitte nicht manuell bearbeiten**.
- **Testfälle hinzufügen**: Um Integrationstests hinzuzufügen, legen Sie einfach eine neue JSON-Konfigurationsdatei im passenden Kategorieverzeichnis unter `packages/vseed/tests/integrations` an und führen danach `pnpm run g` aus.
