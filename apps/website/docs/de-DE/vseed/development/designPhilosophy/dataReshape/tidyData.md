# TidyData

:::info Bedeutung
TidyData reduziert durch das Kernprinzip „Variablen als Spalten, Beobachtungen als Zeilen“ die Komplexität der Datenbereinigung erheblich, sodass wir uns stärker auf Geschäftsprobleme statt auf Datenformatumwandlungen konzentrieren können.
:::

## Paper

Der Autor des Papers ist `Hadley Wickham`. Das Paper behandelt einen kleinen Teilbereich der Datenverarbeitung, die Datenaufbereitung, weil aufgeräumte Datensätze einfacher zu bearbeiten, zu modellieren und zu visualisieren sind und eine bestimmte Struktur besitzen.

Dieses Paper ist sehr empfehlenswert. Siehe: [Tidy Data](https://www.jstatsoft.org/article/view/v059i10)

## TidyData in VSeed

Die `dataset`-Konfiguration in VSeed DSL ist ein Datensatz im `TidyData`-Format.

Kernmerkmale:
1. **Jede Variable eine Spalte**: Variablenwerte werden in eigenen Spalten gespeichert, z. B. „Alter“ und „Geschlecht“.
2. **Jede Beobachtung eine Zeile**: Alle Variablenwerte eines Beobachtungsobjekts bilden eine Zeile, z. B. Alter und Geschlecht einer Person.
3. **Jede Beobachtungseinheit eine Tabelle**: Unterschiedliche Arten von Beobachtungseinheiten, etwa Person, Zeit oder Ort, sollten getrennt gespeichert werden.

Daher kann das Ergebnis einer `SQL`-Abfrage direkt an die `dataset`-Konfiguration von `VSeed` übergeben werden. Zusätzliche Datenverarbeitung ist nicht nötig, um schnell Analyse und Visualisierung durchzuführen.
