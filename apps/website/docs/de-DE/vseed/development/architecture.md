# Architekturdesign

VSeed ist ein auf semantischer Konfiguration basierender Chart-Generator, der Benutzerabsichten mit den zugrunde liegenden Rendering-Engines (VChart/VTable) verbindet.

> [Deep Wiki](https://deepwiki.com/VisActor/VSeed)

## Kernkonzepte

### 1. Pipeline-Architektur (Pipeline Architecture)
VSeed nutzt ein Pipeline-Muster, um die Chart-Spec schrittweise aufzubauen. Der gesamte Prozess besteht aus zwei Hauptphasen:

- **AdvancedPipeline**:
  - Eingabe: anfängliches `VSeed`-Objekt.
  - Zuständig für: Datenumformung (Data Reshape), Anwenden von Themes, Ableiten von Standardkonfigurationen.
  - Ausgabe: `AdvancedVSeed` (Zwischenzustandsvorlage).

- **SpecPipeline**:
  - Eingabe: `AdvancedVSeed`.
  - Zuständig für: Umwandlung der Zwischenzustandsvorlage in konkrete VChart/VTable-Konfigurationseinträge.
  - Ausgabe: finale renderbare Spec.

### 2. Builder-Muster
Die Klasse `VSeedBuilder` ist der zentrale Koordinator und verwaltet Context, registriert Plugins und führt die Pipeline aus.

### 3. Pluginbasierte Erweiterbarkeit (Extensibility)
Die Kernfunktionen von VSeed, etwa unterstützte Charttypen, werden vollständig über einen Plugin-Registrierungsmechanismus umgesetzt.
- **Chart Type Registration**: Jeder Charttyp (z. B. `bar`, `line`) ist ein registriertes Plugin.
- **Theme Registration**: Benutzerdefinierte Themes können registriert werden.
