# Dokumentation

:::info
Das Schreiben von `TypeScript`-Typen bedeutet indirekt, die Dokumentation der Konfigurationsoptionen zu schreiben.
:::

Die Dokumentation für alle VSeed-Charttypen befindet sich im Verzeichnis [`packages/vseed/src/types/chartType`](https://github.com/VisActor/VSeed/tree/main/packages/vseed/src/types/chartType).

## Dokumentation automatisch erstellen

```bash title="source: scripts/build-docs.js"
pnpm run build:docs
```


:::warning
Bitte ändern Sie den Dokumentationsinhalt nicht direkt, da er jederzeit überschrieben werden kann.

`build:docs` ist in wenigen Sekunden abgeschlossen, daher gibt es keine inkrementellen Aktualisierungen. Jeder Dokumentationsbuild löscht die gesamte alte Dokumentation und generiert neue Dokumentation.

:::
