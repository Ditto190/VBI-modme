# Entwicklungsablauf

## Projekt starten

```bash title="Projekt starten"
pnpm install && pnpm dev
```

## Anforderungen verstehen und Code schreiben

Das ist ein komplexer Prozess, aber normalerweise geht es um drei Dinge:
1. Eingabe klären: `vseed`
2. Ausgabe klären: `vseed` wird zu `advancedVSeed`, oder `advancedVSeed` wird zu `spec`
3. Code schreiben und sicherstellen, dass neue Eingaben die erwarteten Ausgaben erzeugen

:::tip
Der `playground` (`apps/website/docs/de-DE/playground/index.mdx`) kann für Debugging und Entwicklung verwendet werden.
:::

## Neue Testfälle erstellen

Falls nötig, können neue Testfälle erstellt werden.

:::tip
Wenn die Testabdeckung sinkt, müssen neue Testfälle erstellt werden.
:::

Erstellen Sie im Verzeichnis `packages/vseed/tests/*` eine neue Datei `testName.json` und schreiben Sie die VSeed DSL hinein.

Ausführen:

```bash title="Testfall erstellen"
pnpm build:canvasTest
```

## Unit-Tests ausführen und Abdeckung aktualisieren

```bash title="Unit-Tests ausführen und Abdeckung aktualisieren"
pnpm test:coverage
```

Stellen Sie drei Dinge sicher:
1. Alle Tests bestehen
2. Snapshot-Änderungen entsprechen den Erwartungen
3. Die Abdeckung ist nicht gesunken

> Änderungen der Abdeckung werden automatisch in README.md aktualisiert

## Konfigurationsdokumentation aktualisieren

Wenn TypeScript-Definitionen für Charttypen geändert wurden, aktualisieren Sie bitte die Konfigurationsdokumentation.

:::tip
Alle Typdefinitionen unter `packages/vseed/src/types/chartType` entsprechen der Konfigurationsdokumentation jedes Charts. Bei Änderungen bitte unbedingt aktualisieren.
:::

```bash title="Konfigurationsdokumentation aktualisieren"
pnpm build:docs
```

## Veröffentlichen und einreichen

```bash title="Änderungsinhalt beschreiben"
pnpm changeset
```

Nach dem Ausführen von `pnpm changeset` folgen Sie den Prompts:
1. Wählen Sie die zu ändernden Pakete aus; normalerweise nur `vseed`
2. Folgen Sie Semantic Versioning und wählen Sie den Änderungstyp. In den meisten Fällen reicht es, zweimal Enter zu drücken, `major` und `minor` zu überspringen und `patch` zu wählen
3. Geben Sie eine Änderungsbeschreibung ein, z. B.: `fix: chart render error caused by only one measure`

:::tip Empfehlung
Eine Funktion oder ein Bugfix entspricht einem `changeset` und einem `commit`

Ein `Pull Request` entspricht einem `issue`

Ein `Pull Request` mit mehreren Funktionen oder Bugfixes entspricht mehreren `changeset`s und mehreren `commit`s
:::

## Commit

```bash title="Alles committen"
git add .
git commit -m "fix: chart render error caused by only one measure"
git push
```
