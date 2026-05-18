# Line

:::info{title=Empfehlung}
\- Empfohlene Feldkonfiguration: `1` Kennzahl, `2` Dimensionen

\- Unterstützt Datenumformung: mindestens `1` Kennzahl, `0` Dimensionen

:::

:::info{title=Encoding-Zuordnung}
Das Liniendiagramm unterstützt die folgenden visuellen Kanäle:

`x`      : X-Achsenkanal, unterstützt `mehrere Dimensionen` und ordnet Dimensionswerte der X-Achse zu

`y`      : Y-Achsenkanal, unterstützt `mehrere Kennzahlen` und ordnet Kennzahlenwerte der Y-Achse zu

`color`  : Farbkanal, unterstützt `mehrere Dimensionen` oder `eine Kennzahl`. Dimensionsfarben unterscheiden Datenserien, Kennzahlenfarben ordnen Kennzahlenwerte linear grafischen Farben zu

`tooltip`: Tooltip-Kanal, unterstützt `mehrere Dimensionen` und `mehrere Kennzahlen` und wird angezeigt, wenn der Mauszeiger über einem Datenpunkt liegt

`label`  : Label-Kanal, unterstützt `mehrere Dimensionen` und `mehrere Kennzahlen` und zeigt Datenlabels auf Datenpunkten an

:::

:::note{title=Beschreibung}
Liniendiagramm, geeignet zur Darstellung von Trends über Zeit oder geordnete Kategorien, indem Datenpunkte mit Liniensegmenten verbunden werden.

Anwendungsszenarien:

\- Darstellung von Trends in Zeitreihendaten

\- Vergleich von Trends über mehrere Datenserien hinweg

\- Analyse von Wachstums- oder Rückgangsmustern in Daten

:::

:::warning{title=Warning}
Datenanforderungen:

\- Mindestens 1 numerisches Feld (Kennzahl)

\- Die erste Dimension wird auf der X-Achse platziert; die übrigen Dimensionen werden mit Kennzahlennamen zusammengeführt, wenn mehrere Kennzahlen vorhanden sind, und als Legendeneinträge angezeigt

\- Alle Kennzahlen werden automatisch zu einer Kennzahl zusammengeführt

Standardmäßig aktivierte Funktionen:

\- Legende, Achsen, Datenpunktmarkierungen, Tooltips und Trendlinien sind standardmäßig aktiviert

:::

## chartType

**Type:** `"line"`

:::note{title=Beschreibung}
Liniendiagramm, geeignet zur Darstellung von Trends über Zeit oder geordnete Kategorien

:::

**Beispiel**
'line'




## dataset

**Type:** `Record[]`

:::note{title=Beschreibung}
Datensatz



Ein aggregierter Datensatz gemäß TidyData-Spezifikation. Er definiert Datenquelle und Struktur des Diagramms. Benutzereingaben müssen nicht vorverarbeitet werden, da VSeed die Daten automatisch umformt. Daten für Flächendiagramme werden schließlich in zwei Dimensionen und eine Kennzahl umgewandelt.

:::

**Beispiel**
[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]




## dimensions

**Type:** `ColumnDimension[] | undefined`

:::note{title=Beschreibung}
Dimensionen



Die erste Dimension wird der X-Achse zugeordnet; weitere Dimensionen werden bei mehreren Kennzahlen mit den Kennzahlnamen zusammengeführt und als Legendeneinträge angezeigt.

:::

**Beispiel**
[{ id: 'month', alias: 'Month' }, { id: 'year', alias: 'Year' }]




### id

**Type:** `string`

:::note{title=Beschreibung}
Feld-ID der Dimension

:::

### alias

**Type:** `string | undefined`

:::note{title=Beschreibung}
Dimensionsalias

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=Beschreibung}
Datumsformat-Konfiguration der Dimension

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=Beschreibung}
Zeitgranularität, bestimmt die Genauigkeit der Datumsanzeige

:::

### encoding

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=Beschreibung}
Kanal, dem die Dimension zugeordnet wird

\- xAxis: unterstützt die Zuordnung mehrerer Dimensionen zur X-Achse

\- color: unterstützt die Zuordnung mehrerer Dimensionen zum Farbkanal

\- detail: unterstützt die Zuordnung mehrerer Dimensionen zum Detailkanal

\- tooltip: unterstützt die Zuordnung mehrerer Dimensionen zum Tooltip-Kanal

\- label: unterstützt die Zuordnung mehrerer Dimensionen zum Label-Kanal

\- row: unterstützt die Zuordnung mehrerer Dimensionen zum Zeilenkanal

\- column: unterstützt die Zuordnung mehrerer Dimensionen zum Spaltenkanal

:::


## measures

**Type:** `ColumnMeasure[] | undefined`

:::note{title=Beschreibung}
Kennzahlen



Kennzahlen im Flächendiagramm werden automatisch zu einer Kennzahl zusammengeführt und der Y-Achse zugeordnet. Kennzahlnamen werden mit anderen Dimensionen zusammengeführt und als Legendeneinträge angezeigt.

:::

**Beispiel**
[{id: 'value', alias: 'Value'}]




### id

**Type:** `string`

:::note{title=Beschreibung}
Kennzahl-ID, muss eindeutig sein

:::

### alias

**Type:** `string | undefined`

:::note{title=Beschreibung}
Kennzahlalias, Duplikate sind erlaubt; wenn nicht gesetzt, entspricht der Alias standardmäßig der id

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Automatische Zahlenformatierung, standardmäßig aktiviert, höchste Priorität

Wenn autoFormat=true ist, überschreibt dies alle numFormat-Konfigurationen

Wenn aktiviert, wählen Diagramm-Datenlabels und Tooltips anhand von Kennzahlwerten und Locale automatisch die passende Formatierung aus

Formatierungsregeln: Dezimalzahlen mit aktivierter kompakter Schreibweise, mindestens 0 Dezimalstellen, höchstens 2 Dezimalstellen, automatische Rundung und Nutzung der Intl.NumberFormat-Implementierung des Browsers

Beispiel:

\- locale='zh-CN': 749740.264 → 74.45万

\- locale='en-US': 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}
Benutzerdefinierte Zahlenformatierung für Kennzahlen; wird automatisch auf Labels und Tooltips angewendet

Hinweis: Für benutzerdefinierte Formatierung muss autoFormat=false explizit gesetzt werden; andernfalls überschreibt autoFormat diese Konfiguration

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Zahlenformattyp, unterstützt: number (Dezimalzahl), percent (%), permille (‰), wissenschaftliche Notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Zahlenformatverhältnis, darf nicht 0 sein

:::

**Beispiel**
\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatsymbol, z. B. %, ‰

:::

**Beispiel**
\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Tausendertrennzeichen für Zahlenformatierung

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Beschreibung}
Suffix der Zahlenformatierung

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Beschreibung}
Präfix der Zahlenformatierung

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Dezimalstellen für die Zahlenformatierung; verwendet Intl.NumberFormat minimumFractionDigits und maximumFractionDigits des Browsers; niedrigere Priorität als significantDigits

:::

**Beispiel**
\- 1234.5678 wird zu 1235 konvertiert, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.6 konvertiert, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.57 konvertiert, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1230.568 konvertiert, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.5678 konvertiert, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.56780 konvertiert, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Signifikante Stellen für die Zahlenformatierung; verwendet Intl.NumberFormat minimumSignificantDigits und maximumSignificantDigits des Browsers; höhere Priorität als fractionDigits

:::

**Beispiel**
\- 1234.5678 wird zu 1000 konvertiert, significantDigits:1
\- 1234.5678 wird zu 1200 konvertiert, significantDigits:2
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3
\- 1234.5678 wird zu 1234 konvertiert, significantDigits:4
\- 1234.5678 wird zu 1234.6 konvertiert, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.57 konvertiert, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.568 konvertiert, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}
Rundungspriorität für die Zahlenformatierung, wenn sowohl significantDigits als auch fractionDigits gesetzt sind; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie Intl.NumberFormat roundingPriority

:::

**Beispiel**
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus für die Zahlenformatierung; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie Intl.NumberFormat roundingMode

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Zahlenformattyp, unterstützt: number (Dezimalzahl), percent (%), permille (‰), wissenschaftliche Notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Zahlenformatverhältnis, darf nicht 0 sein

:::

**Beispiel**
\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatsymbol, z. B. %, ‰

:::

**Beispiel**
\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Tausendertrennzeichen für Zahlenformatierung

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Beschreibung}
Suffix der Zahlenformatierung

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Beschreibung}
Präfix der Zahlenformatierung

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Dezimalstellen für die Zahlenformatierung; verwendet Intl.NumberFormat minimumFractionDigits und maximumFractionDigits des Browsers; niedrigere Priorität als significantDigits

:::

**Beispiel**
\- 1234.5678 wird zu 1235 konvertiert, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.6 konvertiert, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.57 konvertiert, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1230.568 konvertiert, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.5678 konvertiert, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.56780 konvertiert, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Signifikante Stellen für die Zahlenformatierung; verwendet Intl.NumberFormat minimumSignificantDigits und maximumSignificantDigits des Browsers; höhere Priorität als fractionDigits

:::

**Beispiel**
\- 1234.5678 wird zu 1000 konvertiert, significantDigits:1
\- 1234.5678 wird zu 1200 konvertiert, significantDigits:2
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3
\- 1234.5678 wird zu 1234 konvertiert, significantDigits:4
\- 1234.5678 wird zu 1234.6 konvertiert, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.57 konvertiert, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.568 konvertiert, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}
Rundungspriorität für die Zahlenformatierung, wenn sowohl significantDigits als auch fractionDigits gesetzt sind; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie Intl.NumberFormat roundingPriority

:::

**Beispiel**
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus für die Zahlenformatierung; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie Intl.NumberFormat roundingMode

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "yAxis" | undefined`

:::note{title=Beschreibung}
Kanal, dem die Kennzahl zugeordnet wird

\- yAxis: Kennzahl wird der Y-Achse zugeordnet

\- detail: Kennzahl, die dem Detailkanal zugeordnet wird

\- color: measure wird dem Farbkanal zugeordnet

\- label: measure wird dem label-Kanal zugeordnet

\- tooltip: measure wird dem tooltip-Kanal zugeordnet

:::

### parentId

**Type:** `string | undefined`

:::note{title=Beschreibung}
Erstellt in flacher Kennzahlkonfiguration eine baumförmige Kennzahlgruppe. parentId verweist auf die id der übergeordneten Kennzahlgruppe und dient zum Aufbau des Kennzahlbaums

:::

:::tip{title=Tip}
Es gibt zwei Möglichkeiten, den Kennzahlbaum zu konfigurieren: erstens direkt als Kennzahlbaum mit children; zweitens als flache Kennzahlliste mit parentId. Beide Methoden können nicht gleichzeitig verwendet werden

:::


## page

**Type:** `Page | undefined`

:::note{title=Beschreibung}
Paginierung



Paginierung-Konfiguration für Diagrammseiten

:::


### field

**Type:** `string`

:::note{title=Beschreibung}
Paginierungsfeld; gibt den Feldnamen für die Paginierung an und muss eine Dimension sein

:::

### currentValue

**Type:** `string`

:::note{title=Beschreibung}
Aktueller Paginierungswert; gibt den Wert zur Bestimmung der aktuellen Seite an

:::

**Beispiel**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Beschreibung}
Diagramm-Hintergrundfarbe



Die Hintergrundfarbe kann eine Farbzeichenfolge sein (z. B. 'red', 'blue') oder ein hex-, rgb- oder rgba-Wert (z. B. '#ff0000', 'rgba(255,0,0,0.5)')

:::


## color

**Type:** `Color | undefined`

:::note{title=Beschreibung}
Farbe



Farbkonfiguration zur Definition des Farbschemas des Diagramms, einschließlich Farblisten, Farbzuordnungen und Farbverläufen.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Beschreibung}
Diskretes Farbschema zur Definition der Farben verschiedener Elemente im Diagramm

:::

**Beispiel**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Beschreibung}
Lineares Farbverlaufsschema zur Definition der Farben verschiedener Elemente im Diagramm

:::

**Beispiel**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Beschreibung}
Farbzuordnung zur Abbildung von Datenwerten auf bestimmte Farben

:::

**Beispiel**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Positiv/Negativ-Farbkonfiguration; definiert die Farbe positiver Werte im Diagramm

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Positiv/Negativ-Farbkonfiguration; definiert die Farbe negativer Werte im Diagramm

:::


## label

**Type:** `Label | undefined`

:::note{title=Beschreibung}
Label



Label-Konfiguration zur Definition von Datenlabels im Diagramm, einschließlich Position, Format und Stil.

:::


### enable

**Type:** `false | true`

:::note{title=Beschreibung}
Ob die Label-Funktion aktiviert ist

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Labels in die nächste Zeile umbrechen

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Labels Kennzahlwerte anzeigen

In Szenarien mit mehreren Kennzahlen besteht kein Konfliktrisiko, da alle darstellungsbezogenen Kennzahlen die `foldMeasures`-Verarbeitung durchlaufen und zu einer Kennzahl zusammengeführt werden, die einen einzelnen Datenpunkt repräsentiert

Hinweis: Das label von encoding hat höhere Priorität; diese Konfiguration wirkt sich nicht auf das label von encoding aus

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Labels den Prozentanteil von Kennzahlwerten anzeigen

In Szenarien mit mehreren Kennzahlen besteht kein Konfliktrisiko, da alle darstellungsbezogenen Kennzahlen die `foldMeasures`-Verarbeitung durchlaufen und zu einer Kennzahl zusammengeführt werden, die einen einzelnen Datenpunkt repräsentiert

Hinweis: Das label von encoding hat höhere Priorität; diese Konfiguration wirkt sich nicht auf das label von encoding aus

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Labels Dimensionslabels anzeigen

Alle Dimensionslabels anzeigen

Hinweis: Das label von encoding hat höhere Priorität; diese Konfiguration wirkt sich nicht auf das label von encoding aus

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Labelwerte automatisch formatiert werden; wenn autoFormat true ist, wird die numFormat-Konfiguration ignoriert

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}
Formatkonfiguration für Labelwerte; wird mit `format` in `measure` zusammengeführt, wobei `format` in `measure` höhere Priorität hat. numFormat hat niedrigere Priorität als autoFormat

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Zahlenformattyp, unterstützt: number (Dezimalzahl), percent (%), permille (‰), wissenschaftliche Notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Zahlenformatverhältnis, darf nicht 0 sein

:::

**Beispiel**
\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatsymbol, z. B. %, ‰

:::

**Beispiel**
\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Tausendertrennzeichen für Zahlenformatierung

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Beschreibung}
Suffix der Zahlenformatierung

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Beschreibung}
Präfix der Zahlenformatierung

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Dezimalstellen für die Zahlenformatierung; verwendet Intl.NumberFormat minimumFractionDigits und maximumFractionDigits des Browsers; niedrigere Priorität als significantDigits

:::

**Beispiel**
\- 1234.5678 wird zu 1235 konvertiert, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.6 konvertiert, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.57 konvertiert, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1230.568 konvertiert, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.5678 konvertiert, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.56780 konvertiert, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Signifikante Stellen für die Zahlenformatierung; verwendet Intl.NumberFormat minimumSignificantDigits und maximumSignificantDigits des Browsers; höhere Priorität als fractionDigits

:::

**Beispiel**
\- 1234.5678 wird zu 1000 konvertiert, significantDigits:1
\- 1234.5678 wird zu 1200 konvertiert, significantDigits:2
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3
\- 1234.5678 wird zu 1234 konvertiert, significantDigits:4
\- 1234.5678 wird zu 1234.6 konvertiert, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.57 konvertiert, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.568 konvertiert, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}
Rundungspriorität für die Zahlenformatierung, wenn sowohl significantDigits als auch fractionDigits gesetzt sind; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie Intl.NumberFormat roundingPriority

:::

**Beispiel**
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus für die Zahlenformatierung; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie Intl.NumberFormat roundingMode

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Label-Schriftgröße

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Beschreibung}
Label-Schriftstärke

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Label-Hintergrundfarbe

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Beschreibung}
Label-Konturfarbe

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Label-Schriftfarbe

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Label-Schriftfarbe abhängig von der Farbe des grafischen Elements automatisch invertiert wird

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Beschreibung}
Labelposition

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Label-Überlappungsvermeidung aktiviert ist

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
Label-Filterung; die Standardbeziehung zwischen Selektoren ist OR

:::


#### field

**Type:** `string`

:::note{title=Beschreibung}
return _.flatten(
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


identisch mit operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wert des Dimensionsfelds, unterstützt Arrays
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}
Dynamischer Filter (Ausführung von KI-generiertem Code)

Implementiert komplexe Datenfilterlogik über KI-generierten JavaScript-Code.

Kernfunktionen:

- Unterstützt beliebig komplexe Datenfilterbedingungen

- Verwendet integrierte Hilfsfunktionen für Datenoperationen

- Führt sicher in der Browserumgebung aus (Web-Worker-Sandbox)

Umgebungsanforderung: Nur Browserumgebungen werden unterstützt; Node.js-Umgebungen verwenden fallback

Hinweis: selector und dynamicFilter können nicht gleichzeitig verwendet werden; dynamicFilter hat höhere Priorität

Konfiguration des dynamischen Diagrammfilters

Filtert Diagrammmarkierungen (Flächen, Punkte usw.) über KI-generierten JavaScript-Code
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
Beschreibung der Filteranforderung des Benutzers (natürliche Sprache)
:::

**Beispiel**
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=Beschreibung}
KI-generierter JavaScript-Filtercode



- Es dürfen nur integrierte Hilfsfunktionen verwendet werden (zugänglich über _ oder R)

- Eingabeparameter: data (Array), jedes item enthält ein __row_index-Feld als Zeilennummer

- Muss ein Array aus Zeilenindex- und Feldkombinationen zurückgeben: Array<{ __row_index: number, field: string }>

- __row_index bezeichnet die Zeilennummer des ursprünglichen Datenelements, field das hervorzuhebende Feld

- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen

:::

**Beispiel**
Das sales-Feld von Datenelementen mit sales größer als 1000 hervorheben
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Das Datenelement mit der höchsten Gewinnmarge je Bereich hervorheben
```javascript
const grouped = _.groupBy(data, 'area');
const maxItems = _.map(grouped, group =>
_.maxBy(group, item => item.profit / item.sales)
);
return _.flatten(
_.map(maxItems, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'profit' }
])
);
```

Datenelemente hervorheben, die mehrere Bedingungen erfüllen
```javascript
const filtered = _.filter(data, item => {
const profitRate = item.profit / item.sales;
return profitRate > 0.2 && item.sales > 5000;
});
return _.flatten(
_.map(filtered, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'sales' }
])
);
```


#### fallback

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
Fallback-Lösung, wenn die Codeausführung fehlschlägt oder die Umgebung nicht unterstützt wird
:::


##### field

**Type:** `string`

:::note{title=Beschreibung}
return _.flatten(
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


identisch mit operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wert des Dimensionsfelds, unterstützt Arrays
:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}
Ausführungsergebnis des animierten Filters (Laufzeitfeld)



Wird während der prepare()-Phase geschrieben und ist zur Laufzeit schreibgeschützt
:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`


## legend

**Type:** `Legend | undefined`

:::note{title=Beschreibung}
Legende

Legendenkonfiguration zum Definieren der Diagrammlegende, einschließlich Position, Format und Stil.
:::


### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Legendenfunktion aktiviert ist.
:::

**Beispiel**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob der Legendenrahmen aktiviert ist.
:::

:::warning{title=Warning}
Nur für diskrete Legenden wirksam
:::

**Beispiel**
border: true



### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Legenden-Schriftfarbe

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Pager-Icon-Farbe

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe deaktivierter Pager-Icons

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Schriftgröße der Legende
:::

**Beispiel**
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Legenden-Schriftfarbe

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Beschreibung}
Schriftstärke der Legende
:::

**Beispiel**
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Beschreibung}
Legendenform
:::

:::warning{title=Warning}
Nur für diskrete Legenden wirksam
:::

**Beispiel**
shapeType: 'circle'



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Beschreibung}
Legendenposition
:::

**Beispiel**
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Maximale Spalten oder Zeilen bei vielen Legendeneinträgen





:::

:::warning{title=Warning}
Nur für diskrete Legenden wirksam
:::

**Beispiel**
maxSize: 2




## regionPadding

**Type:** `RegionPadding | undefined`

:::note{title=Beschreibung}
Innenabstand des Plotbereichs



Wird VChart region[0].padding zugeordnet und reserviert Platz für Elemente wie Annotationen und Labels, die über den Plotbereich hinausragen.

:::


### top

**Type:** `number | undefined`

### right

**Type:** `number | undefined`

### bottom

**Type:** `number | undefined`

### left

**Type:** `number | undefined`


## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Beschreibung}
Tooltips

Tooltip-Konfiguration zur Definition der Tooltips des Diagramms, einschließlich Position, Format, Stil usw.
:::


### enable

**Type:** `false | true`

:::note{title=Beschreibung}
Ob Tooltip aktiviert ist
:::


## brush

**Type:** `Brush | undefined`

:::note{title=Beschreibung}
Diagramm-Brush-Konfiguration









:::


### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Brush-Auswahl aktiviert ist

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Beschreibung}
Brush-Typ

Definiert Form und Auswahlrichtung des Brush

\- `rect`: rechteckige Brush-Auswahl; Auswahl gleichzeitig in X- und Y-Achsenrichtung möglich

\- `polygon`: Polygon-Brush-Auswahl; zeichnet durch Klicken auf mehrere Punkte ein beliebiges Polygon zur Auswahl

\- `x`: X-Achsen-Brush-Auswahl; wählt nur in X-Achsenrichtung aus, Y-Achse ist nicht beschränkt

\- `y`: Y-Achsen-Brush-Auswahl; wählt nur in Y-Achsenrichtung aus, X-Achse ist nicht beschränkt
:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Beschreibung}
\- `multiple`: Mehrfachmodus, in dem mehrere brush-Auswahlen gleichzeitig bestehen können



Definiert den Brush-Auswahlmodus


\- `multiple`: Mehrfachauswahlmodus; mehrere brush-Bereiche können gleichzeitig existieren

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob der Brush-Bereich nach Ende der Auswahl gelöscht wird

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}
Deckkraft nicht ausgewählter Datenpunkte, Bereich 0-1



Definiert den Stil der mit Brush ausgewählten Datenpunkte
:::


#### opacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Deckkraft



Deckkraft ausgewählter Datenpunkte, Bereich 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Beschreibung}
Konturfarbe

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Strichbreite
:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}
X-Achse, Kategorieachse, X-Achsenkonfiguration; definiert die X-Achse des Diagramms einschließlich Position, Format, Stil usw.



Definiert den Stil der Datenpunkte außerhalb der Brush-Auswahl
:::


#### opacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Deckkraft



Deckkraft nicht ausgewählter Datenpunkte, Wertebereich 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Beschreibung}
Konturfarbe

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Strichbreite
:::


## animation

**Type:** `LineAreaAnimation | undefined`

:::note{title=Beschreibung}
Animationskonfiguration



Diagramm-Animationskonfiguration; verfügbare Effekte hängen vom Diagrammtyp ab

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Linien-/Flächendiagramm-Animation aktiviert ist

:::

### params

**Type:** `LineAreaAnimationParams | undefined`

:::note{title=Beschreibung}
Animationsparameter für Linien-/Flächendiagramme

:::


#### appear

**Type:** `LineAreaAppearAnimation | undefined`

:::note{title=Beschreibung}
Erscheinungsanimation für Linien-/Flächendiagramme

:::


##### effects

**Type:** `("load" | "growth")[] | undefined`

:::note{title=Beschreibung}
Erscheinungseffekte für Linien-/Flächendiagramme, unterstützt Lade- und Wachstumsanimationen

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die aktuelle Animationsphase aktiviert ist

:::

##### ease

**Type:** `string | undefined`

:::note{title=Beschreibung}
Easing-Funktion der Animation

:::

##### duration

**Type:** `number | undefined`

:::note{title=Beschreibung}
Animationsdauer in Millisekunden

:::

##### color

**Type:** `string | undefined`

:::note{title=Beschreibung}
Animations-Highlight- oder Atmosphärenfarbe

:::

#### update

**Type:** `LineAreaUpdateAnimation | undefined`

:::note{title=Beschreibung}
Aktualisierungsanimation für Linien-/Flächendiagramme

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=Beschreibung}
Aktualisierungseffekte für Linien-/Flächendiagramme, unterstützt Wachstumsanimation

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die aktuelle Animationsphase aktiviert ist

:::

##### ease

**Type:** `string | undefined`

:::note{title=Beschreibung}
Easing-Funktion der Animation

:::

##### duration

**Type:** `number | undefined`

:::note{title=Beschreibung}
Animationsdauer in Millisekunden

:::

##### color

**Type:** `string | undefined`

:::note{title=Beschreibung}
Animations-Highlight- oder Atmosphärenfarbe

:::

#### loop

**Type:** `LineAreaAnimationLoop | undefined`

:::note{title=Beschreibung}
Loop-Animation für Linien-/Flächendiagramme

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Loop-Animation aktiviert ist

:::

##### interval

**Type:** `number | undefined`

:::note{title=Beschreibung}
Intervall der Loop-Animation in Millisekunden

:::

##### loop

**Type:** `LineAreaLoopAnimation | undefined`

:::note{title=Beschreibung}
Loop-Animation für Linien-/Flächendiagramme

:::


###### effects

**Type:** `LineAreaLoopEffect[] | undefined`

:::note{title=Beschreibung}
Loop-Effekt für Linien-/Flächendiagramme

:::

###### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die aktuelle Animationsphase aktiviert ist

:::

###### ease

**Type:** `string | undefined`

:::note{title=Beschreibung}
Easing-Funktion der Animation

:::

###### duration

**Type:** `number | undefined`

:::note{title=Beschreibung}
Animationsdauer in Millisekunden

:::

###### color

**Type:** `string | undefined`

:::note{title=Beschreibung}
Animations-Highlight- oder Atmosphärenfarbe

:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=Beschreibung}
Atmosphärenanimation für Linien-/Flächendiagramme

:::


###### ease

**Type:** `string | undefined`

:::note{title=Beschreibung}
Easing-Funktion der Atmosphärenanimation

:::

###### color

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe der Atmosphärenanimation

:::

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title=Beschreibung}
Atmosphärenanimationseffekt, unterstützt Ripple-, Sichtbarkeits- und Atemeffekte

:::


## xAxis

**Type:** `XBandAxis | undefined`

:::note{title=Beschreibung}
X-Achse



Kategorieachse. X-Achsen-Konfiguration zur Definition von Position, Format, Stil und zugehörigen Einstellungen.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Achse sichtbar ist
:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Achse umgekehrt angezeigt wird; nur fuer numerische Achsen wirksam
:::

### zero

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob der Wert 0 auf der Achse erzwungen angezeigt wird; ist min und max gesetzt, ist diese Option unwirksam. Nur fuer numerische Achsen wirksam.
:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Achsenlabel automatisch ausblenden: Ueberlappen zwei Labels, wird das ueberlappende Label automatisch ausgeblendet. Nur fuer Kategorieachsen wirksam.
:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=Beschreibung}
Intervall fuer automatisches Ausblenden von Achsenlabels: Ist der Abstand zwischen zwei Textlabels kleiner als autoHideGap, wird das ueberlappende Label automatisch ausgeblendet. Nur fuer Kategorieachsen wirksam.

Wenn autoHide aktiviert ist, wird autoHide verwendet und ueber autoHideSeparation konfiguriert.

Wenn autoHide deaktiviert ist, wird Sampling verwendet und ueber minGap konfiguriert.
:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Achsenlabel automatisch drehen: Wenn die Labelbreite die Achsenlaenge ueberschreitet, wird das Label automatisch gedreht. Nur fuer Kategorieachsen wirksam.
:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=Beschreibung}
Winkelbereich fuer die automatische Drehung von Achsenlabels. Nur fuer Kategorieachsen wirksam.
:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Achsenlabel automatisch begrenzen: Wenn die Labelbreite die Achsenlaenge ueberschreitet, wird der Ueberlauf mit Auslassungspunkten angezeigt; beim Hover ist das vollstaendige Label sichtbar. Nur fuer Kategorieachsen wirksam.
:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=Beschreibung}
Maximale Laenge fuer die automatische Begrenzung von Achsenlabels: Wenn der Labeltext diese Laenge ueberschreitet, wird der Ueberlauf mit Auslassungspunkten angezeigt und beim Hover vollstaendig sichtbar. Nur fuer Kategorieachsen wirksam.
:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Beschreibung}
Skalenlabels der X-Achse
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Labels sichtbar sind
:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Labelfarbe
:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Label-Schriftgroesse
:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
Label-Schriftstaerke
:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Beschreibung}
Label-Drehwinkel
:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}
X-Achsenlinie
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Achsenlinie sichtbar ist
:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Achsenlinienfarbe
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Achsenlinienbreite
:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Beschreibung}
X-Achsen-Ticks
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Ticks sichtbar sind
:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Ticks nach innen zeigen
:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Tick-Farbe
:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Tick-Groesse
:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Beschreibung}
X-Achsentitel
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob der Titel sichtbar ist
:::

#### titleText

**Type:** `string | undefined`

:::note{title=Beschreibung}
Titeltext; folgt standardmaessig der Feldkonfiguration
:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Titelfarbe
:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Titel-Schriftgroesse
:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
Titel-Schriftstaerke
:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Beschreibung}
Enthalt die integrierten Themes `light` und `dark`. Benutzerdefinierte Themes konnen uber `registerTheme` hinzugefugt werden.

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
selector = [{ profit: 100 }, { profit: 200 }]
:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
- not in: Wählt Datenelemente aus, bei denen der Dimensionenfeldwert nicht im `value`-Array enthalten ist.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Beschreibung}
Unterstutzt globale Stile oder bedingte Stilkonfigurationen.

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Beschreibung}
X-Achsen-Animationskonfiguration
:::


#### duration

**Type:** `number | undefined`

:::note{title=Beschreibung}
value: [100, 300]
:::

#### easing

**Type:** `string | undefined`

:::note{title=Beschreibung}
}
:::


## yAxis

**Type:** `YLinearAxis | undefined`

:::note{title=Beschreibung}
Y-Achse



Numerische Achse. Y-Achsen-Konfiguration zur Definition von Position, Format, Stil und zugehörigen Einstellungen.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Achse sichtbar ist
:::

### min

**Type:** `number | undefined`

:::note{title=Beschreibung}
Achsenlinie width

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Beschreibung}
X-Achsen-Ticks

:::

### log

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob eine logarithmische Achse verwendet wird; gilt nur für numerische Achsen

:::

### logBase

**Type:** `number | undefined`

:::note{title=Beschreibung}
Easing-Funktion der Animation.

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Y-Achsen-Einstellung (Kategorieachse) zur Definition der Y-Achse, einschließlich Position, Format, Stil usw.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Achse umgekehrt angezeigt wird; nur fuer numerische Achsen wirksam
:::

### zero

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob der Wert 0 auf der Achse erzwungen angezeigt wird; ist min und max gesetzt, ist diese Option unwirksam. Nur fuer numerische Achsen wirksam.
:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Tick-Labels der numerischen Achse automatisch formatiert werden. Gilt nur für numerische Achsen. Wenn autoFormat true ist, wird numFormat ignoriert.
:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}
Zahlenformatierung für numerische Achsen. Gilt nur für numerische Achsen und hat niedrigere Priorität als autoFormat.
:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Zahlenformattyp, unterstützt: number (Dezimalzahl), percent (%), permille (‰), wissenschaftliche Notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Zahlenformatverhältnis, darf nicht 0 sein

:::

**Beispiel**
\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatsymbol, z. B. %, ‰

:::

**Beispiel**
\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Tausendertrennzeichen für Zahlenformatierung

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Beschreibung}
Suffix der Zahlenformatierung

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Beschreibung}
Präfix der Zahlenformatierung

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Dezimalstellen für die Zahlenformatierung; verwendet Intl.NumberFormat minimumFractionDigits und maximumFractionDigits des Browsers; niedrigere Priorität als significantDigits

:::

**Beispiel**
\- 1234.5678 wird zu 1235 konvertiert, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.6 konvertiert, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.57 konvertiert, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1230.568 konvertiert, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.5678 konvertiert, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.56780 konvertiert, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Signifikante Stellen für die Zahlenformatierung; verwendet Intl.NumberFormat minimumSignificantDigits und maximumSignificantDigits des Browsers; höhere Priorität als fractionDigits

:::

**Beispiel**
\- 1234.5678 wird zu 1000 konvertiert, significantDigits:1
\- 1234.5678 wird zu 1200 konvertiert, significantDigits:2
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3
\- 1234.5678 wird zu 1234 konvertiert, significantDigits:4
\- 1234.5678 wird zu 1234.6 konvertiert, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.57 konvertiert, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.568 konvertiert, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}
Rundungspriorität für die Zahlenformatierung, wenn sowohl significantDigits als auch fractionDigits gesetzt sind; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie Intl.NumberFormat roundingPriority

:::

**Beispiel**
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus für die Zahlenformatierung; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie Intl.NumberFormat roundingMode

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Beschreibung}
Skalenlabels der X-Achse
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Labels sichtbar sind
:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Labelfarbe
:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Label-Schriftgröße

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
Label-Schriftstärke

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Beschreibung}
Rotationswinkel des Labels

:::
### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}
X-Achsenlinie

:::
#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
}
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Beschreibung}
order: 'asc',
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Suffix des Zahlenformats
:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Ticks nach innen zeigen
:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Legenden-Sortierkonfiguration; unterstutzt Sortierung nach Dimensionen oder Kennzahlen sowie benutzerdefinierte Sortierreihenfolgen; das sort-Array folgt der Reihenfolge von links nach rechts oder von oben nach unten.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Tick-Groesse
:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Beschreibung}
X-Achsentitel

:::
#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
\- 1234.5678 wird zu 1234.6 konvertiert, significantDigits:5 (roundingMode:halfCeil)
:::

#### titleText

**Type:** `string | undefined`

:::note{title=Beschreibung}
Titeltext; folgt standardmaessig der Feldkonfiguration
:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Benutzerdefinierte Sortierreihenfolge; diese Reihenfolge wird direkt auf die Legende angewendet. Aufsteigend folgt links-nach-rechts oder oben-nach-unten; absteigend folgt rechts-nach-links oder unten-nach-oben.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
  ])

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Beschreibung}
Enthalt die integrierten Themes `light` und `dark`. Benutzerdefinierte Themes konnen uber `registerTheme` hinzugefugt werden.

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
selector = [{ profit: 100 }, { profit: 200 }]
:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
- not in: Wählt Datenelemente aus, bei denen der Dimensionenfeldwert nicht im `value`-Array enthalten ist.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Beschreibung}
Unterstutzt globale Stile oder bedingte Stilkonfigurationen.

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Beschreibung}
selector = [{ profit: 100 }, { profit: 200 }]
:::


#### duration

**Type:** `number | undefined`

:::note{title=Beschreibung}
value: [100, 300]
:::

#### easing

**Type:** `string | undefined`

:::note{title=Beschreibung}
}
:::


## crosshairLine

**Type:** `CrosshairLine | undefined`

:::note{title=Beschreibung}
Vertikale Hilfslinie

Vertikale Hilfslinie, die angezeigt wird, wenn die Maus ueber das Diagramm bewegt wird.

Crosshair-Konfiguration zum Anzeigen von Crosshair-Linien (Hilfslinien) im Diagramm.
:::


### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Crosshair-Linie angezeigt wird

:::

### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe der Crosshair-Linie

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe der Crosshair-Linienbeschriftung

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob das Label der Crosshair-Linie angezeigt wird

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hintergrundfarbe der Crosshair-Linienbeschriftung

:::


## sort

**Type:** `Sort | undefined`

:::note{title=Beschreibung}
X-Achsen-Sortierkonfiguration, unterstuetzt Sortierung nach Dimension oder Kennzahl sowie benutzerdefinierte Reihenfolge

Kategorieachsen-Sortierung, unterstuetzt Sortierung nach Dimension oder Kennzahl sowie benutzerdefinierte Reihenfolge
:::

**Beispiel**
sort: {
  orderBy: 'profit',
  order: 'asc',
}
sort: {
  customOrder:['2019', '2020', '2021']
}

\- order:'asc'
\- orderBy:'date'

\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Beschreibung}
Sortierreihenfolge; moegliche Werte sind 'asc' oder 'desc'
:::

**Beispiel**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=Beschreibung}
Datenelement mit der höchsten Gewinnrate in jeder Region hervorheben
:::

**Beispiel**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=Beschreibung}
Benutzerdefinierte Reihenfolge, die direkt auf die Kategorieachse angewendet wird
:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=Beschreibung}
Legendensortierung, unterstuetzt Sortierung nach Dimension oder Kennzahl sowie benutzerdefinierte Reihenfolge

Legendensortierung; das Sortierarray folgt der Reihenfolge von links nach rechts oder von oben nach unten.
:::

**Beispiel**
sortLegend: {
  orderBy: 'profit',
  order: 'asc',
}
sortLegend: {
  customOrder:['2019', '2020', '2021']
}

\- order:'asc'
\- orderBy:'date'

\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Beschreibung}
Sortierreihenfolge; moegliche Werte sind 'asc' oder 'desc'
:::

**Beispiel**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=Beschreibung}
Datenelement mit der höchsten Gewinnrate in jeder Region hervorheben
:::

**Beispiel**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=Beschreibung}
Benutzerdefinierte Reihenfolge, die direkt auf die Legende angewendet wird; aufsteigend von links nach rechts oder von oben nach unten, absteigend von rechts nach links oder von unten nach oben
:::


## theme

**Type:** `Theme | undefined`

:::note{title=Beschreibung}
Diagrammthema. Das Thema ist eine Funktionskonfiguration mit niedrigerer Prioritaet und enthaelt gemeinsame Einstellungen fuer alle Diagrammtypen sowie gemeinsame Einstellungen fuer eine Diagrammkategorie.

Es gibt zwei integrierte Themen: light und dark. Benutzer koennen Themen ueber Builder anpassen.

Thema

Die integrierten Themen light und dark sind verfuegbar; neue Themen koennen ueber registerTheme angepasst werden.
:::

**Beispiel**
'dark'

'light'

'customThemeName'




### length

**Type:** `number`

### brand

**Type:** `brand`


## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title=Beschreibung}
Punktmarkierungs-Stilkonfiguration, mit der Farbe, Rahmen und zugehörige Einstellungen der Punktmarkierung definiert werden.

Unterstützt globale Stilkonfiguration oder bedingte Stilkonfiguration

Datenfilter




:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
- not in: Wählt Datenelemente aus, bei denen der Dimensionenfeldwert nicht im `value`-Array enthalten ist.






:::

**Beispiel**
Strichfarbe des Balken-Primitives (Rechteck)
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]


selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]


selector = {
field: 'category',
operator: 'in',
value: 'tool'
}
selector = {
field: 'category',
operator: 'not in',
value: 'book'
}


selector = {
field: 'profit',
operator: '>=',
value: 100
}
selector = {
field: 'profit',
operator: 'between'
value: [100, 300]
}




#### field

**Type:** `string`

:::note{title=Beschreibung}
return _.flatten(
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


identisch mit operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wert des Dimensionsfelds, unterstützt Arrays
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}
Dynamischer Filter (Ausführung von KI-generiertem Code)

Implementiert komplexe Datenfilterlogik über KI-generierten JavaScript-Code.

Geeignet für Top N, statistische Analysen, komplexe Bedingungen und andere Szenarien, die sich mit einem statischen selector nur schwer ausdrücken lassen.

Kernfunktionen:

- Unterstützt beliebig komplexe Datenfilterbedingungen

- Verwendet integrierte Hilfsfunktionen für Datenoperationen

- Führt sicher in der Browserumgebung aus (Web-Worker-Sandbox)

Umgebungsanforderung: Nur Browserumgebungen werden unterstützt; Node.js-Umgebungen verwenden fallback

Hinweis: selector und dynamicFilter können nicht gleichzeitig verwendet werden; dynamicFilter hat höhere Priorität

Konfiguration des dynamischen Diagrammfilters

Filtert Diagrammmarkierungen (Flächen, Punkte usw.) über KI-generierten JavaScript-Code
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
Beschreibung der Filteranforderung des Benutzers (natürliche Sprache)
:::

**Beispiel**
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=Beschreibung}
KI-generierter JavaScript-Filtercode



- Es dürfen nur integrierte Hilfsfunktionen verwendet werden (zugänglich über _ oder R)

- Eingabeparameter: data (Array), jedes item enthält ein __row_index-Feld als Zeilennummer

- Muss ein Array aus Zeilenindex- und Feldkombinationen zurückgeben: Array<{ __row_index: number, field: string }>

- __row_index bezeichnet die Zeilennummer des ursprünglichen Datenelements, field das hervorzuhebende Feld

- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen

:::

**Beispiel**
Das sales-Feld von Datenelementen mit sales größer als 1000 hervorheben
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Das Datenelement mit der höchsten Gewinnmarge je Bereich hervorheben
```javascript
const grouped = _.groupBy(data, 'area');
const maxItems = _.map(grouped, group =>
_.maxBy(group, item => item.profit / item.sales)
);
return _.flatten(
_.map(maxItems, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'profit' }
])
);
```

Datenelemente hervorheben, die mehrere Bedingungen erfüllen
```javascript
const filtered = _.filter(data, item => {
const profitRate = item.profit / item.sales;
return profitRate > 0.2 && item.sales > 5000;
});
return _.flatten(
_.map(filtered, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'sales' }
])
);
```


#### fallback

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
Fallback-Lösung, wenn die Codeausführung fehlschlägt oder die Umgebung nicht unterstützt wird
:::


##### field

**Type:** `string`

:::note{title=Beschreibung}
return _.flatten(
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


identisch mit operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wert des Dimensionsfelds, unterstützt Arrays
:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}
Ausführungsergebnis des animierten Filters (Laufzeitfeld)



Wird während der prepare()-Phase geschrieben und ist zur Laufzeit schreibgeschützt
:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### pointVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Punkte sichtbar sind

:::

### pointSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Punktgroesse



Punktgroesse

:::

### pointColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe der Punktmarke



Farbe der Punktmarke

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Deckkraft der Punktmarkenfarbe



Deckkraft der Punktmarkenfarbe

:::

### pointBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Rahmenfarbe der Punktmarke



Rahmenfarbe der Punktmarke

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Rahmenbreite der Punktmarke



Rahmenbreite der Punktmarke

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Beschreibung}
Rahmenstil der Punktmarke



Rahmenstil der Punktmarke

:::

**Beispiel**
solid

dashed

dotted




## lineStyle

**Type:** `LineStyle | LineStyle[] | undefined`

:::note{title=Beschreibung}
Linienmarkierungs-Stilkonfiguration, mit der Farbe, Transparenz, Kurve und zugehörige Einstellungen der Linienmarkierung definiert werden.

Unterstützt globale Stilkonfiguration oder bedingte Stilkonfiguration

Datenfilter




:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
- not in: Wählt Datenelemente aus, bei denen der Dimensionenfeldwert nicht im `value`-Array enthalten ist.






:::

**Beispiel**
Strichfarbe des Balken-Primitives (Rechteck)
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]


selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]


selector = {
field: 'category',
operator: 'in',
value: 'tool'
}
selector = {
field: 'category',
operator: 'not in',
value: 'book'
}


selector = {
field: 'profit',
operator: '>=',
value: 100
}
selector = {
field: 'profit',
operator: 'between'
value: [100, 300]
}




#### field

**Type:** `string`

:::note{title=Beschreibung}
return _.flatten(
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


identisch mit operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wert des Dimensionsfelds, unterstützt Arrays
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}
Dynamischer Filter (Ausführung von KI-generiertem Code)

Implementiert komplexe Datenfilterlogik über KI-generierten JavaScript-Code.

Geeignet für Top N, statistische Analysen, komplexe Bedingungen und andere Szenarien, die sich mit einem statischen selector nur schwer ausdrücken lassen.

Kernfunktionen:

- Unterstützt beliebig komplexe Datenfilterbedingungen

- Verwendet integrierte Hilfsfunktionen für Datenoperationen

- Führt sicher in der Browserumgebung aus (Web-Worker-Sandbox)

Umgebungsanforderung: Nur Browserumgebungen werden unterstützt; Node.js-Umgebungen verwenden fallback

Hinweis: selector und dynamicFilter können nicht gleichzeitig verwendet werden; dynamicFilter hat höhere Priorität

Konfiguration des dynamischen Diagrammfilters

Filtert Diagrammmarkierungen (Flächen, Punkte usw.) über KI-generierten JavaScript-Code
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
Beschreibung der Filteranforderung des Benutzers (natürliche Sprache)
:::

**Beispiel**
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=Beschreibung}
KI-generierter JavaScript-Filtercode



- Es dürfen nur integrierte Hilfsfunktionen verwendet werden (zugänglich über _ oder R)

- Eingabeparameter: data (Array), jedes item enthält ein __row_index-Feld als Zeilennummer

- Muss ein Array aus Zeilenindex- und Feldkombinationen zurückgeben: Array<{ __row_index: number, field: string }>

- __row_index bezeichnet die Zeilennummer des ursprünglichen Datenelements, field das hervorzuhebende Feld

- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen

:::

**Beispiel**
Das sales-Feld von Datenelementen mit sales größer als 1000 hervorheben
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Das Datenelement mit der höchsten Gewinnmarge je Bereich hervorheben
```javascript
const grouped = _.groupBy(data, 'area');
const maxItems = _.map(grouped, group =>
_.maxBy(group, item => item.profit / item.sales)
);
return _.flatten(
_.map(maxItems, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'profit' }
])
);
```

Datenelemente hervorheben, die mehrere Bedingungen erfüllen
```javascript
const filtered = _.filter(data, item => {
const profitRate = item.profit / item.sales;
return profitRate > 0.2 && item.sales > 5000;
});
return _.flatten(
_.map(filtered, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'sales' }
])
);
```


#### fallback

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
Fallback-Lösung, wenn die Codeausführung fehlschlägt oder die Umgebung nicht unterstützt wird
:::


##### field

**Type:** `string`

:::note{title=Beschreibung}
return _.flatten(
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


identisch mit operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wert des Dimensionsfelds, unterstützt Arrays
:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}
Ausführungsergebnis des animierten Filters (Laufzeitfeld)



Wird während der prepare()-Phase geschrieben und ist zur Laufzeit schreibgeschützt
:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### lineVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Liniensegmente sichtbar sind

:::

### lineSmooth

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Liniensegmente geglaettet werden

:::

### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe des Liniensegments

:::

### lineColorOpacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Deckkraft der Liniensegmentfarbe

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Breite des Liniensegments

:::

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Beschreibung}
Liniensegmentstil

:::

**Beispiel**
`lineStyle: 'solid'`




## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Beschreibung}
Konfiguration von Anmerkungspunkten. Definiert Diagramm-Anmerkungspunkte auf Basis ausgewählter Daten, einschließlich Position, Format, Stil und zugehöriger Einstellungen.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
Selektor fuer Annotationspunkte, zum Auswaehlen von Datenpunkten.
:::


#### field

**Type:** `string`

:::note{title=Beschreibung}
return _.flatten(
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


identisch mit operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wert des Dimensionsfelds, unterstützt Arrays
:::

### measureId

**Type:** `string | undefined`

:::note{title=Beschreibung}
Gibt die measure id an, zu der der Annotationspunkt gehört. In Szenarien mit mehreren Kennzahlen kann sie mit selector kombiniert werden, um den Annotationspunkt der Zielkennzahl eindeutig zu lokalisieren.
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}
Dynamischer Filter (Ausführung von KI-generiertem Code)

Implementiert komplexe Datenfilterlogik über KI-generierten JavaScript-Code.

Geeignet für Top N, statistische Analysen, komplexe Bedingungen und andere Szenarien, die sich mit einem statischen selector nur schwer ausdrücken lassen.

Kernfunktionen:

- Unterstützt beliebig komplexe Datenfilterbedingungen

- Verwendet integrierte Hilfsfunktionen für Datenoperationen

- Führt sicher in der Browserumgebung aus (Web-Worker-Sandbox)

Umgebungsanforderung: Nur Browserumgebungen werden unterstützt; Node.js-Umgebungen verwenden fallback

Hinweis: selector und dynamicFilter können nicht gleichzeitig verwendet werden; dynamicFilter hat höhere Priorität

Konfiguration des dynamischen Diagrammfilters

Filtert Diagrammmarkierungen (Flächen, Punkte usw.) über KI-generierten JavaScript-Code
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
Beschreibung der Filteranforderung des Benutzers (natürliche Sprache)
:::

**Beispiel**
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=Beschreibung}
KI-generierter JavaScript-Filtercode



- Es dürfen nur integrierte Hilfsfunktionen verwendet werden (zugänglich über _ oder R)

- Eingabeparameter: data (Array), jedes item enthält ein __row_index-Feld als Zeilennummer

- Muss ein Array aus Zeilenindex- und Feldkombinationen zurückgeben: Array<{ __row_index: number, field: string }>

- __row_index bezeichnet die Zeilennummer des ursprünglichen Datenelements, field das hervorzuhebende Feld

- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen

:::

**Beispiel**
Das sales-Feld von Datenelementen mit sales größer als 1000 hervorheben
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Das Datenelement mit der höchsten Gewinnmarge je Bereich hervorheben
```javascript
const grouped = _.groupBy(data, 'area');
const maxItems = _.map(grouped, group =>
_.maxBy(group, item => item.profit / item.sales)
);
return _.flatten(
_.map(maxItems, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'profit' }
])
);
```

Datenelemente hervorheben, die mehrere Bedingungen erfüllen
```javascript
const filtered = _.filter(data, item => {
const profitRate = item.profit / item.sales;
return profitRate > 0.2 && item.sales > 5000;
});
return _.flatten(
_.map(filtered, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'sales' }
])
);
```


#### fallback

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
Fallback-Lösung, wenn die Codeausführung fehlschlägt oder die Umgebung nicht unterstützt wird
:::


##### field

**Type:** `string`

:::note{title=Beschreibung}
return _.flatten(
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


identisch mit operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wert des Dimensionsfelds, unterstützt Arrays
:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}
Ausführungsergebnis des animierten Filters (Laufzeitfeld)



Wird während der prepare()-Phase geschrieben und ist zur Laufzeit schreibgeschützt
:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Beschreibung}
'red'

:::

**Beispiel**
'Markierungstext'



### textColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
4

:::

**Beispiel**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
[2, 2]

:::

**Beispiel**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
0

:::

**Beispiel**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Beschreibung}
Textausrichtung. In der Regel auf right setzen, damit der Text links vom Annotationspunkt erscheint und im sichtbaren Diagrammbereich bleibt

Empfohlen ist 'right', damit der Text links vom Annotationspunkt liegt

right: Text links vom Annotationspunkt, rechte Textkante am Annotationspunkt ausgerichtet

left: Text rechts vom Annotationspunkt, linke Textkante am Annotationspunkt ausgerichtet

center: Text zentriert auf dem Annotationspunkt

:::

**Beispiel**
'right' Text liegt links vom Annotationspunkt
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}
Vertikale Textausrichtung. In der Regel auf top setzen, damit der Text unter dem Annotationspunkt erscheint und im sichtbaren Diagrammbereich bleibt

Empfohlen ist 'top', damit der Text vollständig im sichtbaren Bereich angezeigt wird

top: Text unter dem Annotationspunkt, obere Textkante am Annotationspunkt ausgerichtet

middle: Text zentriert auf dem Annotationspunkt

bottom: Text über dem Annotationspunkt, untere Textkante am Annotationspunkt ausgerichtet

:::

**Beispiel**
'top' Text liegt unter dem Annotationspunkt
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Hintergrund sichtbar

:::

**Beispiel**
true
### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hintergrundfarbe
:::

**Beispiel**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Textfarbe

:::

**Beispiel**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Breite des Hintergrundrahmens

:::

**Beispiel**
2
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
Radius der Hintergrundrahmen-Ecken

:::

**Beispiel**
4
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Beschreibung}
Innenabstand des Hintergrunds

:::

**Beispiel**
4



### offsetY

**Type:** `number | undefined`

:::note{title=Beschreibung}




Ob der Hintergrund sichtbar ist.

:::

**Beispiel**
true



### offsetX

**Type:** `number | undefined`

:::note{title=Beschreibung}
Pixelversatz des gesamten Annotationspunkts in X-Richtung. Liegt der Punkt links im Diagramm (Start der Kategorieachse), wird ein positiver Wert empfohlen; liegt er rechts (Ende der Kategorieachse), ein negativer Wert.

Negative Werte verschieben die gesamte Komponente nach links, z. B. verschiebt -10 Text und Hintergrund zusammen um 10 Pixel nach links

Positive Werte verschieben die gesamte Komponente nach rechts, z. B. verschiebt 10 Text und Hintergrund zusammen um 10 Pixel nach rechts

:::

**Beispiel**
offsetX: 5, der gesamte Annotationspunkt wird um 5 Pixel nach rechts verschoben
## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Beschreibung}
Annotationslinie für Dimensionswerte, vertikal angezeigt, mit konfigurierbarer Position und Stil

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Beschreibung}
);
:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Beschreibung}
Dynamischer Filter (Ausführung von KI-generiertem Code)

Berechnet den Wert der Annotationslinie dynamisch über KI-generierten JavaScript-Code.

Geeignet, wenn die Position der Annotationslinie datenabhängig dynamisch bestimmt werden muss, z. B. Durchschnitt, Maximum, Quantil oder Geschäftslinie.

Nur Browserumgebungen werden unterstützt (Web Worker erforderlich).
:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
Beschreibung der Filteranforderung des Benutzers (natürliche Sprache)
:::

**Beispiel**
"Höchsten Umsatzwert als Referenz für die Markierungslinie abrufen"

"Durchschnittlichen Umsatz für die Markierungslinie berechnen"



#### code

**Type:** `string`

:::note{title=Beschreibung}
\- Eingabeparameter: data (Array), wobei jedes Element ein __row_index-Feld für die Zeilennummer enthält



\- __row_index steht für die Zeilennummer des ursprünglichen Datenobjekts; field steht für das hervorzuhebende Feld






\- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen

:::

**Beispiel**

```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```


```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```


```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```


```javascript
const currentYearTotal = _.sumBy(
_.filter(data, item => item.year === 2024),
'sales'
);
return currentYearTotal;
```



#### fallback

**Type:** `string | number | undefined`

:::note{title=Beschreibung}
Fallback-Lösung, wenn die Codeausführung fehlschlägt oder die Umgebung nicht unterstützt wird
:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Beschreibung}
Ausführungsergebnis des animierten Filters (Laufzeitfeld)



Wird während der prepare()-Phase geschrieben und ist zur Laufzeit schreibgeschützt
:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Beschreibung}
'red'

:::

**Beispiel**
'Markierungstext'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Beschreibung}
Ausgewahlte Dimensionenfeldwerte; unterstutzt Arrays.

:::

**Beispiel**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
4

:::

**Beispiel**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
[2, 2]

:::

**Beispiel**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
0

:::

**Beispiel**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Beschreibung}
Textausrichtung. In der Regel nicht erforderlich

Empfohlen ist 'right', damit der Text links von der Annotationslinie liegt

right: Text links von der Referenzlinie, rechte Textkante an der vertikalen Annotationslinie ausgerichtet

left: Text rechts von der Referenzlinie, linke Textkante an der vertikalen Annotationslinie ausgerichtet

center: Text zentriert auf der Referenzlinie

:::

**Beispiel**
'right'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}
middle: Text wird vertikal im Anmerkungsbereich zentriert.









:::

**Beispiel**
'top'



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Deckkraft der Markierungsbereichsfarbe
:::

**Beispiel**
true



### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Rahmenfarbe des Anmerkungsbereichs.

:::

**Beispiel**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Rahmenbreite des Anmerkungsbereichs.

:::

**Beispiel**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Beschreibung}
Eckenradius des Rahmens des Anmerkungsbereichs.

:::

**Beispiel**
'solid'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Hintergrund sichtbar

:::

**Beispiel**
true
### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hintergrundfarbe
:::

**Beispiel**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Textfarbe

:::

**Beispiel**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Breite des Hintergrundrahmens

:::

**Beispiel**
2
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
Radius der Hintergrundrahmen-Ecken

:::

**Beispiel**
4
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Beschreibung}
Innenabstand des Hintergrunds

:::

**Beispiel**
4




## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=Beschreibung}
Numerische Anmerkungslinie, einschließlich Durchschnitts-, Maximum- und Minimumlinien. Sie wird horizontal angezeigt und kann nach Position und Stil konfiguriert werden. Verwenden Sie diese Konfiguration, um Anmerkungslinien für numerische Werte wie Durchschnittslinien zu zeichnen.

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Beschreibung}
Fester Y-Wert zum Markieren einer horizontalen Linie. Wenn die Kategorieachse in Y-Richtung liegt, kann ein Dimensionswert eingegeben werden; bei einer numerischen Achse ein konkreter Zahlenwert.

:::
### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Beschreibung}
Dynamischer Filter (Ausführung von KI-generiertem Code)

Berechnet den Wert der Annotationslinie dynamisch über KI-generierten JavaScript-Code.

Geeignet, wenn die Position der Annotationslinie datenabhängig dynamisch bestimmt werden muss, z. B. Durchschnitt, Maximum, Quantil oder Geschäftslinie.

Nur Browserumgebungen werden unterstützt (Web Worker erforderlich).
:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
Beschreibung der Filteranforderung des Benutzers (natürliche Sprache)
:::

**Beispiel**
"Höchsten Umsatzwert als Referenz für die Markierungslinie abrufen"

"Durchschnittlichen Umsatz für die Markierungslinie berechnen"



#### code

**Type:** `string`

:::note{title=Beschreibung}
\- Eingabeparameter: data (Array), wobei jedes Element ein __row_index-Feld für die Zeilennummer enthält



\- __row_index steht für die Zeilennummer des ursprünglichen Datenobjekts; field steht für das hervorzuhebende Feld






\- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen

:::

**Beispiel**

```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```


```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```


```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```


```javascript
const currentYearTotal = _.sumBy(
_.filter(data, item => item.year === 2024),
'sales'
);
return currentYearTotal;
```



#### fallback

**Type:** `string | number | undefined`

:::note{title=Beschreibung}
Fallback-Lösung, wenn die Codeausführung fehlschlägt oder die Umgebung nicht unterstützt wird
:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Beschreibung}
Ausführungsergebnis des animierten Filters (Laufzeitfeld)



Wird während der prepare()-Phase geschrieben und ist zur Laufzeit schreibgeschützt
:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Beschreibung}
'red'

:::

**Beispiel**
'Markierungstext'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Beschreibung}
2





:::

**Beispiel**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
4

:::

**Beispiel**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
[2, 2]

:::

**Beispiel**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
0

:::

**Beispiel**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Beschreibung}
Textausrichtung. In der Regel nicht erforderlich

Empfohlen ist 'right', damit der Text links von der Annotationslinie liegt

right: Text links von der Referenzlinie, rechte Textkante am Endpunkt der horizontalen Annotationslinie ausgerichtet

left: Text rechts von der Referenzlinie, linke Textkante am Endpunkt der horizontalen Annotationslinie ausgerichtet

center: Text zentriert auf der Referenzlinie

:::

**Beispiel**
'right'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}
Vertikale Textausrichtung. In der Regel nicht erforderlich

Empfohlen ist 'top', damit der Text vollständig im sichtbaren Diagrammbereich angezeigt wird

top: Text unter der Referenzlinie, obere Textkante an der horizontalen Annotationslinie ausgerichtet

middle: Text zentriert auf der Referenzlinie

bottom: Text über der Referenzlinie, untere Textkante an der horizontalen Annotationslinie ausgerichtet

:::

**Beispiel**
'top'
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Hintergrund sichtbar

:::

**Beispiel**
true
### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hintergrundfarbe
:::

**Beispiel**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Textfarbe

:::

**Beispiel**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Breite des Hintergrundrahmens



Breite des Hintergrundrahmens

:::

**Beispiel**
2
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
Radius der Hintergrundrahmen-Ecken

:::

**Beispiel**
4
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Beschreibung}
Innenabstand des Hintergrunds

:::

**Beispiel**
4



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Deckkraft der Markierungsbereichsfarbe



Deckkraft der Markierungsbereichsfarbe
:::

**Beispiel**
true



### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Rahmenfarbe des Anmerkungsbereichs.

:::

**Beispiel**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Rahmenbreite des Anmerkungsbereichs.

:::

**Beispiel**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Beschreibung}
Eckenradius des Rahmens des Anmerkungsbereichs.

:::

**Beispiel**
'solid'



### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=Beschreibung}
Strichelstil des Rahmens des Anmerkungsbereichs.

:::


#### positiveColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Primärfarbe für den Teil größer als der Markierungswert
:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
0

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Beschreibung}
Annotationsbereich

Annotationsbereich-Konfiguration, die anhand der ausgewaehlten Daten Position und Stil des Annotationsbereichs definiert.
:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Beschreibung}
Ob die Dimensionenverknupfung aktiviert wird, wenn im Diagramm Perspektive aktiviert ist oder Kennzahlen kombiniert sind.

:::


#### field

**Type:** `string`

:::note{title=Beschreibung}
return _.flatten(
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


identisch mit operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wert des Dimensionsfelds, unterstützt Arrays
:::

### text

**Type:** `string | string[] | undefined`

:::note{title=Beschreibung}
'red'

:::

**Beispiel**
'Markierungstext'



### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title=Beschreibung}
2

:::

**Beispiel**
'top'



### textColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
4

:::

**Beispiel**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
[2, 2]

:::

**Beispiel**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
0

:::

**Beispiel**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Beschreibung}
Konfiguration der polynomialen Regressionslinie, einschliesslich Polynomordnung, Stil der Regressionslinie usw.

Es wird empfohlen, 'center' zu setzen, damit der Text in der Mitte des Markierungsbereichs liegt







:::

**Beispiel**
'center' Text befindet sich in der Mitte des Markierungsbereichs



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}








Ordnung der polynomialen Regression

:::

**Beispiel**
'top' Text befindet sich am unteren Rand des Markierungsbereichs



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Hintergrund sichtbar

:::

**Beispiel**
true
### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hintergrundfarbe
:::

**Beispiel**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Textfarbe



Textfarbe

:::

**Beispiel**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Breite des Hintergrundrahmens

:::

**Beispiel**
2
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
Radius der Hintergrundrahmen-Ecken



Radius der Hintergrundrahmen-Ecken

:::

**Beispiel**
4
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Beschreibung}
Innenabstand des Hintergrunds

:::

**Beispiel**
4



### areaColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe des Markierungsbereichs

:::

**Beispiel**
'red'



### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Deckkraft der Markierungsbereichsfüllung
:::

**Beispiel**
0.5



### areaBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Rahmenfarbe des Markierungsbereichs
:::

**Beispiel**
'red'



### areaBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Rahmenbreite des Markierungsbereichs
:::

**Beispiel**
2



### areaBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
Eckenradius des Markierungsbereichsrahmens
:::

**Beispiel**
4



### areaLineDash

**Type:** `number[] | undefined`

:::note{title=Beschreibung}
Linienstil des Markierungsbereichsrahmens
:::

**Beispiel**
[2, 2]



### outerPadding

**Type:** `number | undefined`

:::note{title=Beschreibung}
Randabstand des Markierungsbereichs

:::

**Beispiel**
0




## annotationDifferenceLine

**Type:** `AnnotationDifferenceLine | AnnotationDifferenceLine[] | undefined`

:::note{title=Beschreibung}
Differenz-Annotationslinie

Zeichnet anhand zweier ausgewaehlter Datenpunkte eine Differenz-Annotationslinie und berechnet den Differenztext automatisch.
:::


### start

**Type:** `DifferenceAnchor`

:::note{title=Beschreibung}
Startanker der Differenz-Annotationslinie.

Konfiguration des Differenzankers zum Auswaehlen der an Start- oder Endpunkt gebundenen Daten.
:::


#### selector

**Type:** `DifferenceSelector | DifferenceSelector[]`

:::note{title=Beschreibung}
Ankerselektor, der letztlich einen logischen Anker lokalisieren muss.
:::

**Beispiel**
{ year: '1930', type: 'Autocracies' }

[{ field: 'year', operator: 'in', value: ['1930'] }, { field: 'type', operator: 'in', value: ['Autocracies'] }]




##### field

**Type:** `string`

:::note{title=Beschreibung}
return _.flatten(
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


identisch mit operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wert des Dimensionsfelds, unterstützt Arrays
:::

### end

**Type:** `DifferenceAnchor`

:::note{title=Beschreibung}
Endanker der Differenz-Annotationslinie.

Konfiguration des Differenzankers zum Auswaehlen der an Start- oder Endpunkt gebundenen Daten.
:::


#### selector

**Type:** `DifferenceSelector | DifferenceSelector[]`

:::note{title=Beschreibung}
Ankerselektor, der letztlich einen logischen Anker lokalisieren muss.
:::

**Beispiel**
{ year: '1930', type: 'Autocracies' }

[{ field: 'year', operator: 'in', value: ['1930'] }, { field: 'type', operator: 'in', value: ['Autocracies'] }]




##### field

**Type:** `string`

:::note{title=Beschreibung}
return _.flatten(
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
identisch mit operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert im angegebenen Wert enthalten ist


identisch mit operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wert des Dimensionsfelds, unterstützt Arrays
:::

### differenceType

**Type:** `"percent" | "absolute" | undefined`

:::note{title=Beschreibung}
Differenzwerttyp.

- absolute: zeigt die absolute Differenz an, berechnet als end - start

- percent: zeigt die prozentuale Differenz an, berechnet als (end - start) / start
:::

### textFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Textschriftgröße.

:::

### textColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Text color.

:::

### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Texthintergrundfarbe.

:::

### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Linienfarbe.
:::

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Beschreibung}
Linienstil.
:::


## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=Beschreibung}
Ob die Dimensionsverknüpfung aktiviert wird, wenn Pivot oder Kennzahlgruppierung im Diagramm aktiviert ist

Beim Hover über einen Dimensionswert werden Daten mit demselben Dimensionswert in anderen Diagrammen hervorgehoben



Konfiguration der Dimensionenverknüpfung für Pivot-Diagramme

:::


### enable

**Type:** `false | true`

:::note{title=Beschreibung}
Ob die Dimensionenverknüpfung für Pivot-Diagramme aktiviert wird

:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Tooltip-Informationen für die Unterdiagramme aller entsprechenden Dimensionen angezeigt werden

:::

### showLabel

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob das zum crosshair gehörende Label angezeigt wird

:::


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Beschreibung}
Language



Sprachkonfiguration des Diagramms. Unterstützt 'zh\-CN' und 'en\-US'; zusätzlich kann die Sprache über intl.setLocale('zh\-CN') gesetzt werden

:::
