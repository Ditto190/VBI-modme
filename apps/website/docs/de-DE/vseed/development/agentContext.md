# Agent-Entwicklungskontext (VSeed)

Dieses Dokument richtet sich an agent-code und Beitragende. Es fasst die Kernarchitektur, den Datenfluss und die Erweiterungsmöglichkeiten des VSeed-Pakets zusammen, damit bei automatisierter Entwicklung schnell ein Gesamtverständnis entsteht.

> Dies ist ein für Agents entwickelter „Kontextindex“. Ausführlichere technische Hinweise finden Sie in `packages/vseed/AGENTS.md`.

## 1. Ziel und Einordnung

VSeed ist ein **Spec Builder**, der `VSeed DSL` in renderbare `VChart`- / `VTable`-Specs umwandelt und damit das intelligente Erzeugen und Bearbeiten von Charts unterstützt.

- Eingabe: `VSeed DSL`
- Ausgabe: `VChart` / `VTable` Spec
- Kernablauf: `AdvancedPipeline` + `SpecPipeline`

## 2. Zweistufige Pipeline

1. **AdvancedPipeline**

- Eingabe: `VSeed DSL`
- Ausgabe: `AdvancedVSeed` (serialisierbarer Zwischenzustand)
- Verantwortlich für: Datenumformung, Standardableitung, Encoding-Modellierung, Themes und Styles, Analysekonfiguration

2. **SpecPipeline**

- Eingabe: `AdvancedVSeed`
- Ausgabe: finale Spec (nicht serialisierbar, direkt gerendert)
- Verantwortlich für: Abbildung des Zwischenzustands auf konkrete VChart- / VTable-Konfigurationen

## 3. Builder-Einstieg

- `Builder.from(vseed).build()` erzeugt eine Spec
- `prepare()` führt dynamicFilter aus (falls erforderlich)

Quellcode-Einstiege:
- `packages/vseed/src/builder/builder/builder.ts`
- `packages/vseed/src/builder/builder/build.ts`
- `packages/vseed/src/builder/builder/prepare.ts`

## 4. Datenumformung (Kern)

- `foldMeasures`: Faltet mehrere Measures zu einem einzelnen Measure und erzeugt `foldInfo`
- `unfoldDimensions`: Führt Dimensionen nach visuellem Encoding-Kanal zusammen und erzeugt `unfoldInfo`
- `dataReshapeByEncoding`: Kombinierter Aufruf (fold + unfold)

Quellcode-Einstiege:
- `packages/vseed/src/dataReshape/foldMeasures.ts`
- `packages/vseed/src/dataReshape/unfoldDimensions.ts`
- `packages/vseed/src/dataReshape/dataReshapeByEncoding.ts`

## 5. Erweiterung und Registrierung

- `registerAll()`: Registriert alle Charts und Themes
- `registerXxx()`: Registriert die Pipeline eines einzelnen Charttyps
- `updateAdvanced()` / `updateSpec()`: Fügt eigene Pipes ein

Quellcode-Einstiege:
- `packages/vseed/src/builder/register/all.ts`
- `packages/vseed/src/builder/register/chartType/*`
- `packages/vseed/src/builder/register/custom.ts`

## 6. Pipeline-Designprinzipien

- Pipes sollten möglichst atomar sein und if/else reduzieren
- Bedingte Abläufe werden über Adapter kombiniert
- Der Charttyp wird durch die Zusammensetzung der Pipes bestimmt

Referenz:
- `apps/website/docs/de-DE/vseed/development/designPhilosophy/pipeline/pipelineDesign.md`

## 7. Weiterer Kontext

- `packages/vseed/AGENTS.md`
- `apps/website/docs/de-DE/vseed/development/architecture.md`
- `apps/website/docs/de-DE/vseed/development/designPhilosophy/vseed.md`
