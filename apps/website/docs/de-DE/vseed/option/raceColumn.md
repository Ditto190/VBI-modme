# RaceColumn

:::note{title=Beschreibung}
Dynamisches Säulendiagramm (Race Column Chart)

Geeignet zur Darstellung von Rangänderungen von Daten im Zeitverlauf, wobei die Säulen vertikal angeordnet sind

Geeignete Szenarien:

- Wenn Datenobjektnamen lang sind

- Wenn Werte verschiedener Kategorien intuitiv verglichen und ihre Rangänderungen im Zeitverlauf angezeigt werden sollen

- Zur Darstellung von Trends in Zeitreihendaten und zur dynamischen Aktualisierung der Säulensortierung

:::

:::note{title=Note}
Dynamisches Säulendiagramm:

- Die X-Achse ist eine Kategorieachse (kategoriale Daten) und zeigt Dimensionswerte an

- Die Y-Achse ist eine numerische Achse (kontinuierliche Daten) und zeigt Kennzahlwerte an

- Unterstützt die Steuerung der Zeitdimension über den Player, um Datenänderungen dynamisch darzustellen

- Säulen werden während der Animation dynamisch nach Wert sortiert

:::


## chartType

**Type:** `"raceColumn"`

:::note{title=Beschreibung}
Dynamisches Säulendiagramm, geeignet zur Darstellung von Rangänderungen von Daten im Zeitverlauf

:::


## dataset

**Type:** `Record[]`

:::note{title=Beschreibung}
Datenquelle: Ein TidyData-konformer und bereits aggregierter Datensatz zur Definition von Datenquelle und Struktur des Diagramms. Eingabedaten müssen nicht vorverarbeitet werden; VSeed führt mit seiner leistungsfähigen Data Reshape-Funktion die Umformung automatisch aus. Balkendiagrammdaten werden schließlich in 2 Dimensionen und 1 Kennzahl konvertiert.

:::

**Beispiel**
[{category:'A', value:100, date: '2020'}, {category:'B', value:200, date: '2020'}]

## dimensions

**Type:** `RaceColumnDimension[] | undefined`

:::note{title=Beschreibung}
Dimensionen



Die erste Dimension wird dem player zugeordnet, die zweite Dimension der X-Achse

:::


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

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | "row" | "column" | "player" | undefined`

:::note{title=Beschreibung}
Kanal, dem die Dimension zugeordnet wird

\- xAxis: unterstützt die Zuordnung mehrerer Dimensionen zur X-Achse

\- color: unterstützt die Zuordnung mehrerer Dimensionen zum Farbkanal

\- detail: unterstützt die Zuordnung mehrerer Dimensionen zum Detailkanal

\- tooltip: unterstützt die Zuordnung mehrerer Dimensionen zum Tooltip-Kanal

\- label: unterstützt die Zuordnung mehrerer Dimensionen zum Beschriftungskanal

\- row: unterstützt die Zuordnung mehrerer Dimensionen zum Zeilenkanal

\- column: unterstützt die Zuordnung mehrerer Dimensionen zum Spaltenkanal

\- player: unterstützt das Zuordnen mehrerer Dimensionen zum Player-Kanal

:::


## measures

**Type:** `ColumnMeasure[] | undefined`

:::note{title=Beschreibung}
Alle Kennzahlen des Säulendiagramms werden automatisch zu einer Kennzahl zusammengeführt und der Y-Achse zugeordnet. Bei mehreren Kennzahlen werden Kennzahlnamen mit anderen Dimensionen zusammengeführt und als Legendeneinträge angezeigt.

:::

**Beispiel**
[{id: "value", alias: "Value"}]




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

\- yAxis: Kennzahl, die der Y-Achse zugeordnet wird

\- detail: Kennzahl, die dem Detailkanal zugeordnet wird

\- color: Kennzahl, die dem Farbkanal zugeordnet wird

\- label: dem label-Kanal zugeordnete Kennzahl

\- tooltip: dem tooltip-Kanal zugeordnete Kennzahl

:::

### parentId

**Type:** `string | undefined`

:::note{title=Beschreibung}
Erstellt in flacher Kennzahlkonfiguration eine baumförmige Kennzahlgruppe. parentId verweist auf die id der übergeordneten Kennzahlgruppe und dient zum Aufbau des Kennzahlbaums

:::

:::tip{title=Tip}
Es gibt zwei Möglichkeiten, den Kennzahlbaum zu konfigurieren: erstens direkt als Kennzahlbaum mit children; zweitens als flache Kennzahlliste mit parentId. Beide Methoden können nicht gleichzeitig verwendet werden

:::


## player

**Type:** `Player | undefined`

:::note{title=Beschreibung}
Player-Konfiguration zur Angabe der Zeitdimension; Kernkonfiguration des dynamischen Balkendiagramms



Player-Konfiguration zur Angabe des abzuspielenden Feldnamens; muss eine Dimension sein

:::

:::warning{title=Warning}
Diese Funktion unterstützt keine Diagrammtypen wie table, pivotTable, dualAxis, histogram, boxPlot usw. und kann nicht bei aktivierter Kennzahlenkombination oder Zeilen-/Spalten-Pivot verwendet werden

:::


### maxCount

**Type:** `number | false | undefined`

:::note{title=Beschreibung}
Maximale Wiedergabeanzahl; Daten oberhalb dieser Anzahl werden abgeschnitten. false bedeutet keine Begrenzung

:::

### interval

**Type:** `number | undefined`

:::note{title=Beschreibung}
Wiedergabeintervall, Einheit ms

:::

### autoPlay

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob automatisch abgespielt wird

:::

### loop

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Wiedergabe in Schleife erfolgt

:::

### position

**Type:** `"left" | "top" | "right" | "bottom" | undefined`

:::note{title=Beschreibung}
Player-Position

:::

### railColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Spurfarbe der Player-Fortschrittsleiste

:::

### fontFamily

**Type:** `string | undefined`

:::note{title=Beschreibung}
Player-Textschriftart

:::

### fontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Player-Textschriftgröße

:::

### trackColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Fortschrittsfarbe der Player-Fortschrittsleiste

:::

### sliderHandleColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Sliderfarbe der Player-Fortschrittsleiste

:::

### sliderHandleBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Rahmenfarbe des Sliders der Player-Fortschrittsleiste

:::

### startButtonColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe der Starttaste des Players

:::

### pauseButtonColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe der Pausentaste des Players

:::

### backwardButtonColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe der Zurück-Taste des Players

:::

### forwardButtonColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe der Vorwärts-Taste des Players

:::


## sort

**Type:** `Sort | undefined`

:::note{title=Beschreibung}
Y-Achsen-Sortierkonfiguration; unterstützt Sortierung nach Dimensionen oder Kennzahlen sowie benutzerdefinierte Sortierreihenfolgen



Kategorieachsen-Sortierkonfiguration; unterstützt Sortierung nach Dimensionen oder Kennzahlen sowie benutzerdefinierte Sortierreihenfolgen
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
Dynamische Filterkonfiguration des Diagramms.
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
Diagramm-Hintergrundfarbe. Standardmäßig transparenter Hintergrund. Die Hintergrundfarbe kann eine Farbzeichenfolge sein (z. B. 'red', 'blue') oder ein hex-, rgb- oder rgba-Wert (z. B. '#ff0000', 'rgba(255,0,0,0.5)').

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
Beschriftungskonfiguration zur Definition der Datenlabels des Diagramms, einschließlich Position, Format und Stil.

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
"Highlight bars whose sales are greater than 1000"

"Highlight the bar with the highest profit rate in each region"



#### code

**Type:** `string`

:::note{title=Beschreibung}
KI-generierter JavaScript-Filtercode



\- Es dürfen nur integrierte Hilfsfunktionen verwendet werden (zugänglich über _ oder R)

\- Eingabeparameter: data (Array), jedes item enthält ein __row_index-Feld als Zeilennummer

\- Muss ein Array aus Zeilenindex- und Feldkombinationen zurückgeben: Array<{ __row_index: number, field: string }>

\- __row_index bezeichnet die Zeilennummer des ursprünglichen Datenelements, field das hervorzuhebende Feld

\- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen

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
Legendenkonfiguration zur Definition der Diagrammlegende, einschliesslich Position, Format und Stil.

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
Applies only to discrete legends.

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
Applies only to discrete legends.

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
Applies only to discrete legends.

:::

**Beispiel**
maxSize: 2




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Beschreibung}
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


## xAxis

**Type:** `XBandAxis | undefined`

:::note{title=Beschreibung}
X-Achsen-Kategorieachsenkonfiguration zur Definition der X-Achse des Diagramms einschließlich Position, Format, Stil und zugehöriger Einstellungen.

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
Axis label auto-hide. If two labels overlap, with spacing smaller than autoHideGap, the overlapping label is hidden automatically. Only applies to category axes.

:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=Beschreibung}
Axis label auto-hide gap. If the gap between two labels is smaller than autoHideGap, the overlapping label is hidden automatically. Only applies to category axes.

Y-axis, numeric axis, Y-axis configuration; defines the Y-axis of the chart, including its position, format, style, etc.

When autoHide is disabled, use sampling and configure it through minGap.

:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Axis label auto-rotation. When label width exceeds axis length, labels are rotated automatically. Only applies to category axes.

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=Beschreibung}
Axis label auto-rotation angle range. Used when auto-rotation is enabled. Only applies to category axes.

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Axis label auto-limit. When label width exceeds axis length, overflow is shown with ellipsis and the full label is visible on hover. Only applies to category axes.

:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=Beschreibung}
Maximum length for axis label auto-limit. When label text exceeds this length, overflow is shown with ellipsis and the full label is visible on hover. Only applies to category axes.

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


## yAxis

**Type:** `YLinearAxis | undefined`

:::note{title=Beschreibung}
Y-Achsen-Konfiguration für numerische Achsen zur Definition der Y-Achse des Diagramms einschließlich Position, Format, Stil und zugehöriger Einstellungen.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Achse sichtbar ist
:::

### min

**Type:** `number | undefined`

:::note{title=Beschreibung}
Axis line width

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Beschreibung}
X-axis ticks

:::

### log

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob eine logarithmische Achse verwendet wird; gilt nur für numerische Achsen

:::

### logBase

**Type:** `number | undefined`

:::note{title=Beschreibung}
Base of the logarithmic axis; only applies to numeric axes

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Achsen-Tick-Intervalle automatisch für besser lesbare Tick-Labels angepasst werden. Diese Option ist deaktiviert, wenn min und max konfiguriert sind, und gilt nur für numerische Achsen.

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
Zahlenformattyp, unterstützt: decimal, percent (%), permille (‰), wissenschaftliche Notation

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
Zahlenformatverhältnis, darf nicht 0 sein

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Beschreibung}
Suffix des Zahlenformats

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatsymbol, z. B. %, ‰

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Decimal places for numeric formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

**Beispiel**
\- 1234.5678 wird zu 1235, fractionDigits:0 (roundingMode:halfCeil) konvertiert
\- 1234.5678 wird zu 1234.6, fractionDigits:1 (roundingMode:halfCeil) konvertiert
\- 1234.5678 wird zu 1234.57, fractionDigits:2 (roundingMode:halfCeil) konvertiert
\- 1234.5678 wird zu 1230.568, fractionDigits:3 (roundingMode:halfCeil) konvertiert
\- 1234.5678 wird zu 1234.5678, fractionDigits:4 (roundingMode:halfCeil) konvertiert
\- 1234.5678 wird zu 1234.56780, fractionDigits:5 (roundingMode:halfCeil) konvertiert



#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Significant digits for numeric formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits.

:::

**Beispiel**
\- 1234.5678 wird zu 1000, significantDigits:1 konvertiert
\- 1234.5678 wird zu 1200, significantDigits:2 konvertiert
\- 1234.5678 wird zu 1230, significantDigits:3 konvertiert
\- 1234.5678 wird zu 1234, significantDigits:4 konvertiert
\- 1234.5678 wird zu 1234.6, significantDigits:5 (roundingMode:halfCeil) konvertiert
\- 1234.5678 wird zu 1234.57, significantDigits:6 (roundingMode:halfCeil) konvertiert
\- 1234.5678 wird zu 1234.568, significantDigits:7 (roundingMode:halfCeil) konvertiert
\- 1234.5678 wird zu 1234.5678, significantDigits:8 (roundingMode:halfCeil) konvertiert



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}
Nachkommastellen der Zahlenformatierung, verwendet minimumFractionDigits und maximumFractionDigits von Intl.NumberFormat des Browsers; niedrigere Priorität als significantDigits

:::

**Beispiel**
\- 1234.5678 wird zu 1230, significantDigits:3 (roundingPriority:lessPrecision) konvertiert
\- 1234.5678 wird zu 1234.5678, significantDigits:3 (roundingPriority:morePrecision) konvertiert



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Signifikante Stellen der Zahlenformatierung, verwendet minimumSignificantDigits und maximumSignificantDigits von Intl.NumberFormat des Browsers; höhere Priorität als fractionDigits

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


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title=Beschreibung}
selector = { profit: 100 }



selector = {

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Operator

:::

### rectColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
operator: 'between'

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Operator

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob das Rechteckbereich-Label des Crosshairs angezeigt wird

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
\- Supports arbitrarily complex data filtering conditions

:::


## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title=Beschreibung}
Bar chart stacked corner radius

:::


## barMaxWidth

**Type:** `string | number | undefined`

:::note{title=Beschreibung}
Implementiert die Filterung von Diagrammmarkierungen (Balken, Punkte usw.) über AI-generierten JavaScript-Code.

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
Dynamische Filterkonfiguration des Diagramms.
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
Diagrammthema. Das Thema ist eine Funktionskonfiguration mit niedrigerer Prioritaet und enthaelt gemeinsame Konfigurationen fuer alle Diagrammtypen sowie Diagrammkonfigurationen innerhalb einer einzelnen Diagrammkategorie. Die integrierten Themen light und dark sind verfuegbar; Benutzer koennen Themen ueber Builder anpassen.

Thema

Die integrierten Themen light und dark sind verfuegbar; neue Themen koennen ueber registerTheme angepasst werden.
:::

### length

**Type:** `number`

### brand

**Type:** `brand`


## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title=Beschreibung}
Rechteck-Mark-Stil. Balkendiagramm-Stilkonfiguration zum Definieren von Balkenfarbe, Rahmen, Eckenradius und verwandten Einstellungen.

Unterstuetzt globale Stile oder bedingte Stilkonfigurationen.

Datenfilter

Wenn selector konfiguriert ist, stehen vier Datenabgleichsarten zur Verfuegung: numerischer selector, lokaler Daten-selector, bedingter Dimensions-selector und bedingter Kennzahl-selector.

Wenn selector nicht konfiguriert ist, gilt der Stil global.
:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
Datenselektor



Wenn selector konfiguriert ist, stehen vier Arten des Datenabgleichs zur Verfügung: numerischer selector, Teildaten-selector, bedingter Dimensionen-selector und bedingter Kennzahl-selector

Wenn selector nicht konfiguriert ist, wirkt der Stil global.

:::

**Beispiel**
Numerischer Selektor
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

Teildaten-Selektor
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

Bedingter Dimensionen-Selektor
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

Bedingter Kennzahl-Selektor
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
Dimensionsfeld, id eines Eintrags in dimensions
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

- in: Waehlt Datenobjekte aus, deren Dimensionsfeldwert in value enthalten ist

- not in: Waehlt Datenobjekte aus, deren Dimensionsfeldwert nicht in value enthalten ist
:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

- in: Waehlt Datenobjekte aus, deren Dimensionsfeldwert in value enthalten ist

- not in: Waehlt Datenobjekte aus, deren Dimensionsfeldwert nicht in value enthalten ist

Identisch mit operator
:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Waehlt Dimensionsfeldwerte in Datenobjekten aus; unterstuetzt Arrays
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}
return _.flatten(



Implementiert komplexe Datenfilterlogik über AI-generierten JavaScript-Code.

\- in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds in value enthalten ist



\- not in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds nicht in value enthalten ist

\- Supports arbitrarily complex data filtering conditions.

\- in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds in value enthalten ist

\- not in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds nicht in value enthalten ist



Environment Requirements: Supports browser environment only; Node.js environment will use fallback.



Wert des Dimensionsfelds, unterstützt Arrays



Animierter Filter (Ausführung von KI-generiertem Code)



Implementiert komplexe Datenfilterlogik über KI-generierten JavaScript-Code

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
Geeignet für Szenarien, die mit statischen Selektoren schwer auszudrücken sind, z. B. Top N, statistische Analyse und komplexe Bedingungen.

:::

**Beispiel**
"Highlight bars whose sales are greater than 1000"

\- Unterstützt beliebig komplexe Datenfilterbedingungen



#### code

**Type:** `string`

:::note{title=Beschreibung}
\- Verwendet integrierte Hilfsfunktionen für Datenoperationen



\- Führt sicher in der Browserumgebung aus (Web-Worker-Sandbox)

Umgebungsanforderungen: Unterstützt nur die Browserumgebung; in Node.js wird ein Fallback verwendet

Hinweis: selector und dynamicFilter können nicht gleichzeitig verwendet werden; dynamicFilter hat höhere Priorität

\- `__row_index` steht für die Zeilennummer des ursprünglichen Datenobjekts, und `field` steht für das hervorzuhebende Feld.

Implementiert das Filtern von Diagramm-Markern (Balken, Punkte usw.) über KI-generierten JavaScript-Code

:::

**Beispiel**
Beschreibung der Filteranforderung des Benutzers (natürliche Sprache)
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight the data item with the highest profit margin in each region:
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

Highlight data items based on multiple filtering conditions:
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
Fallback strategy when code execution fails or the environment is not supported.

:::


##### field

**Type:** `string`

:::note{title=Beschreibung}
\- Es dürfen nur integrierte Hilfsfunktionen verwendet werden (Zugriff über _ oder R)

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
\- Eingabeparameter: data (Array), jedes Element enthält ein __row_index-Feld für die Zeilennummer

\- Muss ein Array aus Zeilenindex- und Feldkombinationen zurückgeben: Array<{ __row_index: number, field: string }>

\- __row_index steht für die Zeilennummer des ursprünglichen Datenelements, field für das hervorzuhebende Feld

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
\- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen

Hervorheben des sales-Felds für Datenelemente mit sales größer als 1000

Hervorheben des Datenelements mit der höchsten Gewinnmarge in jedem Bereich

const profitRate = item.profit / item.sales;

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Fallback-Lösung, wenn die Codeausführung fehlschlägt oder die Umgebung nicht unterstützt wird

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}
Ausführungsergebnis des dynamischen Filters (Laufzeitfeld)

Wird in der prepare()-Phase geschrieben und ist zur Laufzeit schreibgeschützt
:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### barVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
\- in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds in value enthalten ist

:::

### barColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
\- not in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds nicht in value enthalten ist

:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Farbdeckkraft des Balkenelements (Rechteckelement)

:::
### barBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Border color of the bar mark (rectangle mark)

:::

### barBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
\- in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds in value enthalten ist

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Beschreibung}
\- not in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds nicht in value enthalten ist

:::

**Beispiel**
solid

Wert des Dimensionsfelds, unterstützt Arrays

Ausführungsergebnis des animierten Filters (Laufzeitfeld)



### barBorderOpacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Eckenradius des Balkenelements (Rechteckelement)



Strichdeckkraft des Balkenelements (Rechteckelement)

:::

**Beispiel**
4

[0, 0, 10, 10]
### barRadius

**Type:** `number | number[] | undefined`


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
Implementiert komplexe Datenfilterlogik über KI-generierten JavaScript-Code

Geeignet für Szenarien, die mit statischen Selektoren schwer auszudrücken sind, z. B. Top N, statistische Analyse und komplexe Bedingungen.



#### code

**Type:** `string`

:::note{title=Beschreibung}
KI-generierter JavaScript-Filtercode



\- Es dürfen nur integrierte Hilfsfunktionen verwendet werden (zugänglich über _ oder R)

\- Eingabeparameter: data (Array), jedes item enthält ein __row_index-Feld als Zeilennummer

\- Muss ein Array aus Zeilenindex- und Feldkombinationen zurückgeben: Array<{ __row_index: number, field: string }>

\- __row_index bezeichnet die Zeilennummer des ursprünglichen Datenelements, field das hervorzuhebende Feld

\- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen

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
'annotationtext'



### textColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
4

:::

**Beispiel**
\- not in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds nicht in value enthalten ist



### textFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
[2, 2]

:::

**Beispiel**
\- in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds in value enthalten ist



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
offsetY: 5, moves the whole annotation point down by 5 pixels



### offsetX

**Type:** `number | undefined`

:::note{title=Beschreibung}
Pixelversatz des gesamten Annotationspunkts in X-Richtung. Liegt der Punkt links im Diagramm (Start der Kategorieachse), wird ein positiver Wert empfohlen; liegt er rechts (Ende der Kategorieachse), ein negativer Wert.

Negative Werte verschieben die gesamte Komponente nach links, z. B. verschiebt \-10 Text und Hintergrund zusammen um 10 Pixel nach links

Positive Werte verschieben die gesamte Komponente nach rechts, z. B. verschiebt 10 Text und Hintergrund zusammen um 10 Pixel nach rechts

:::

**Beispiel**
offsetX: 5, der gesamte Annotationspunkt wird um 5 Pixel nach rechts verschoben
## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Beschreibung}
'red'

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
"Höchsten Umsatzwert als Referenz für die Markierungslinie ermitteln"

"Durchschnittlichen Umsatz für die Markierungslinie berechnen"



#### code

**Type:** `string`

:::note{title=Beschreibung}
KI-generierter JavaScript-Filtercode



\- Es dürfen nur integrierte Hilfsfunktionen verwendet werden (zugänglich über _ oder R)

\- Eingabeparameter: data (Array)

\- Muss einen einzelnen numerischen Wert oder String zurückgeben: number | string

\- Geeignete Szenarien: dynamische Werte für Annotationslinien (horizontal oder vertikal)

\- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen

:::

**Beispiel**
Höchsten sales-Wert als Wert der Annotationslinie abrufen
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Durchschnittswert für die Annotationslinie berechnen
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Quantilwert als Annotationslinie abrufen
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Zielwert anhand von Bedingungen berechnen
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
'annotationtext'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Beschreibung}
Ausgewahlte Dimensionenfeldwerte; unterstutzt Arrays.

:::

**Beispiel**
Beschreibung der Filteranforderung des Benutzers (natürliche Sprache)



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
\- Es dürfen nur integrierte Hilfsfunktionen verwendet werden (Zugriff über _ oder R)



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
Anmerkungslinie für Dimensionswerte, die horizontal angezeigt wird. Position, Stil und zugehörige Einstellungen der Anmerkungslinie können konfiguriert werden.

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
"Höchsten Umsatzwert als Referenz für die Markierungslinie ermitteln"

"Durchschnittlichen Umsatz für die Markierungslinie berechnen"



#### code

**Type:** `string`

:::note{title=Beschreibung}
KI-generierter JavaScript-Filtercode



\- Es dürfen nur integrierte Hilfsfunktionen verwendet werden (zugänglich über _ oder R)

\- Eingabeparameter: data (Array)

\- Muss einen einzelnen numerischen Wert oder String zurückgeben: number | string

\- Geeignete Szenarien: dynamische Werte für Annotationslinien (horizontal oder vertikal)

\- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen

:::

**Beispiel**
Höchsten sales-Wert als Wert der Annotationslinie abrufen
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Durchschnittswert für die Annotationslinie berechnen
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Quantilwert als Annotationslinie abrufen
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Zielwert anhand von Bedingungen berechnen
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
'annotationtext'



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
Annotationsbereich-Konfiguration. Definiert anhand der ausgewählten Daten die Annotationsbereiche im Diagramm, einschließlich Position, Stil usw.
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
'annotationtext'



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
'center': text is in the middle of the annotation area



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}








Ordnung der polynomialen Regression

:::

**Beispiel**
'top': text is at the bottom of the annotation area



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
Sprachkonfiguration des Diagramms. Unterstützt 'zh-CN' und 'en-US'. Die Sprache kann auch über intl.setLocale('zh-CN') gesetzt werden
:::
