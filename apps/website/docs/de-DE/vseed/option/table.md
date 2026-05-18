# Table

:::info{title=Empfehlung}
\- Empfohlene Feldkonfiguration: `beliebig viele` Kennzahlen, `beliebig viele` Dimensionen

\- Unterstützt Datenumformung: mindestens `beliebig viele` Kennzahlen, `beliebig viele` Dimensionen

:::

:::info{title=Encoding-Zuordnung}
Unterstützt nur die Konfiguration von Dimensions- und Kennzahlbäumen; standardmäßig wird auf Spalten encodiert.

:::

:::note{title=Beschreibung}
Tabelle, geeignet für detaillierte Datenanzeigen mit klaren Zeilen und Spalten, sodass konkrete Werte leicht eingesehen werden können.

Geeignete Szenarien:

\- Detaillierte Datensätze anzeigen

\- Datenpunkte präzise vergleichen

\- Attribute mehrerer Dimensionen anzeigen

:::

:::warning{title=Warnung}
Datenanforderungen:

\- Mindestens 1 Dimensionsfeld

\- Mindestens 1 Kennzahlfeld

\- Dimensionsfelder werden als Tabellenspaltenüberschriften verwendet

Standardmäßig aktivierte Funktionen:

\- Sortierung, Filterung und Paginierung sind standardmäßig aktiviert

:::


## chartType

**Type:** `"table"`

:::note{title=Beschreibung}
Standard-Tabellenkomponente zur Anzeige detaillierter Daten

:::

**Beispiel**
'table'




## dataset

**Type:** `Record[]`

:::note{title=Beschreibung}
Ein bereits aggregierter Datensatz gemäß TidyData-Spezifikation, der Datenquelle und Struktur des Diagramms definiert. Der vom Benutzer bereitgestellte Datensatz muss nicht vorverarbeitet werden; jedes Feld entspricht einer Spalte und jeder Datensatz einer Zeile.

:::

**Beispiel**
[{id: 1, name: "A", value: 100}, {id: 2, name: "B", value: 200}]




## dimensions

**Type:** `DimensionTree | undefined`

:::note{title=Beschreibung}
Jede Dimension in der Tabelle entspricht einer Spalte.

:::

**Beispiel**
[{id: "name", alias: "Name"}]




### id

**Type:** `string`

### alias

**Type:** `string | undefined`

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=Beschreibung}
Datumsformatierung der Dimension

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=Beschreibung}
Zeitgranularität, bestimmt die Anzeigegenauigkeit des Datums

:::

### encoding

**Type:** `"row" | "column" | undefined`

:::note{title=Beschreibung}
Kanal, dem die Dimension zugeordnet wird

\- row: unterstützt die Zuordnung mehrerer Dimensionen zum Zeilenkanal

\- column: unterstützt die Zuordnung mehrerer Dimensionen zum Spaltenkanal

:::

### children

**Type:** `(TableDimension | DimensionGroup)[] | undefined`


#### id

**Type:** `string`

#### alias

**Type:** `string | undefined`

#### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=Beschreibung}
Datumsformatierung der Dimension

:::


##### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=Beschreibung}
Zeitgranularität, bestimmt die Anzeigegenauigkeit des Datums

:::

#### encoding

**Type:** `"row" | "column" | undefined`

:::note{title=Beschreibung}
Kanal, dem die Dimension zugeordnet wird

\- row: unterstützt die Zuordnung mehrerer Dimensionen zum Zeilenkanal

\- column: unterstützt die Zuordnung mehrerer Dimensionen zum Spaltenkanal

:::


## measures

**Type:** `MeasureTree | undefined`

:::note{title=Beschreibung}
Jede Kennzahl in der Tabelle entspricht einer Zeile und unterstützt Kennzahlkombinationen nativ.

:::

**Beispiel**
[{id: "value", alias: "Value"}]




### id

**Type:** `string`

:::note{title=Beschreibung}
Kennzahlgruppen-ID, muss eindeutig sein.

:::

### alias

**Type:** `string | undefined`

:::note{title=Beschreibung}
Alias der Kennzahlgruppe, darf doppelt vorkommen; wenn nicht angegeben, wird standardmäßig die ID verwendet.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Automatische Zahlenformatierung, standardmäßig aktiviert und mit höchster Priorität

Wenn autoFormat=true ist, überschreibt es alle numFormat-Konfigurationen

Wenn aktiviert, wählen Datenbeschriftungen und Tooltips des Diagramms automatisch eine passende Formatierung anhand von Kennzahlwerten und Locale

Formatierungsregeln: Dezimalzahlen mit aktivierter compact notation, mindestens 0 und höchstens 2 Nachkommastellen, automatische Rundung, implementiert über Intl.NumberFormat des Browsers

Ein Beispiel:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}
Benutzerdefinierte Zahlenformatierung für Kennzahlen; wird automatisch auf label und tooltip angewendet

Hinweis: Um benutzerdefinierte Formatierung zu verwenden, muss autoFormat=false explizit gesetzt werden; andernfalls überschreibt autoFormat diese Konfiguration

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Zahlenformattyp. Unterstützt Zahl (Dezimalzahl), Prozent (%), Promille (‰) und wissenschaftliche Notation

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
Symbol der Zahlenformatierung, z. B. %, ‰

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
Nachkommastellen der Zahlenformatierung, verwendet minimumFractionDigits und maximumFractionDigits von Intl.NumberFormat des Browsers; niedrigere Priorität als significantDigits

:::

**Beispiel**
\- 1234.5678 wird umgewandelt in 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 wird umgewandelt in 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 wird umgewandelt in 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 wird umgewandelt in 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 wird umgewandelt in 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 wird umgewandelt in 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Signifikante Stellen der Zahlenformatierung, verwendet minimumSignificantDigits und maximumSignificantDigits von Intl.NumberFormat des Browsers; höhere Priorität als fractionDigits

:::

**Beispiel**
\- 1234.5678 wird umgewandelt in 1000, significantDigits:1
\- 1234.5678 wird umgewandelt in 1200, significantDigits:2
\- 1234.5678 wird umgewandelt in 1230, significantDigits:3
\- 1234.5678 wird umgewandelt in 1234, significantDigits:4
\- 1234.5678 wird umgewandelt in 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 wird umgewandelt in 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 wird umgewandelt in 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 wird umgewandelt in 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}
Rundungspriorität der Zahlenformatierung, wenn sowohl significantDigits als auch fractionDigits gesetzt sind; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie roundingPriority von Intl.NumberFormat

:::

**Beispiel**
\- 1234.5678 wird umgewandelt in 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 wird umgewandelt in 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus der Zahlenformatierung, verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie roundingMode von Intl.NumberFormat

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Zahlenformattyp. Unterstützt Zahl (Dezimalzahl), Prozent (%), Promille (‰) und wissenschaftliche Notation

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
Symbol der Zahlenformatierung, z. B. %, ‰

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
Nachkommastellen der Zahlenformatierung, verwendet minimumFractionDigits und maximumFractionDigits von Intl.NumberFormat des Browsers; niedrigere Priorität als significantDigits

:::

**Beispiel**
\- 1234.5678 wird umgewandelt in 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 wird umgewandelt in 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 wird umgewandelt in 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 wird umgewandelt in 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 wird umgewandelt in 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 wird umgewandelt in 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Signifikante Stellen der Zahlenformatierung, verwendet minimumSignificantDigits und maximumSignificantDigits von Intl.NumberFormat des Browsers; höhere Priorität als fractionDigits

:::

**Beispiel**
\- 1234.5678 wird umgewandelt in 1000, significantDigits:1
\- 1234.5678 wird umgewandelt in 1200, significantDigits:2
\- 1234.5678 wird umgewandelt in 1230, significantDigits:3
\- 1234.5678 wird umgewandelt in 1234, significantDigits:4
\- 1234.5678 wird umgewandelt in 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 wird umgewandelt in 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 wird umgewandelt in 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 wird umgewandelt in 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}
Rundungspriorität der Zahlenformatierung, wenn sowohl significantDigits als auch fractionDigits gesetzt sind; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie roundingPriority von Intl.NumberFormat

:::

**Beispiel**
\- 1234.5678 wird umgewandelt in 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 wird umgewandelt in 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus der Zahlenformatierung, verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie roundingMode von Intl.NumberFormat

:::

### encoding

**Type:** `"column" | undefined`

:::note{title=Beschreibung}
Kanal, dem die Kennzahl zugeordnet wird

\- column: Kennzahlspalte

:::

### parentId

**Type:** `string | undefined`

:::note{title=Beschreibung}
In der flachen Kennzahlenkonfiguration wird eine baumförmige Kennzahlgruppe aufgebaut. parentId verweist auf die id der übergeordneten Kennzahlgruppe und dient zum Aufbau des Kennzahlbaums

:::

:::tip{title=Tip}
Es gibt zwei Möglichkeiten, den Kennzahlbaum zu konfigurieren: Option 1 ist die direkte Konfiguration eines Kennzahlbaums mit children; Option 2 ist die Konfiguration einer flachen Kennzahlliste mit parentId. Diese beiden Methoden können nicht gleichzeitig verwendet werden

:::

### children

**Type:** `(TableMeasure | MeasureGroup)[] | undefined`

:::note{title=Beschreibung}
Untergeordnete Kennzahlen oder Kennzahlgruppen innerhalb der Kennzahlgruppe.

:::


## page

**Type:** `Page | undefined`

:::note{title=Beschreibung}
Paginierungskonfiguration, mit der der Feldname für die Paginierung angegeben wird; dieser muss eine Dimension sein.

:::


### field

**Type:** `string`

:::note{title=Beschreibung}
Paginierungsfeld; gibt den Feldnamen für die Paginierung an, muss eine Dimension sein

:::

### currentValue

**Type:** `string`

:::note{title=Beschreibung}
Aktueller Paginierungswert; gibt den Wert an, mit dem die aktuelle Seite bestimmt wird

:::

**Beispiel**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Beschreibung}
Die Hintergrundfarbe kann ein Farbstring sein (z. B. 'red', 'blue') oder ein Hex-, rgb- oder rgba-Wert (z. B. '#ff0000', 'rgba(255,0,0,0.5)')

:::


## borderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Rahmenfarbe der Tabelle

:::


## bodyFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Schriftgröße des Tabellenkörpers

:::


## bodyFontColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Schriftfarbe des Tabellenkörpers

:::


## bodyBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hintergrundfarbe des Tabellenkörpers

:::


## headerFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Header font size

:::


## headerFontColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Schriftfarbe der Kopfzeile

:::


## headerBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hintergrundfarbe der Kopfzeile

:::


## hoverHeaderBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hintergrundfarbe beim Hover über eine Kopfzelle, zum Hervorheben der Zelle.

:::


## hoverHeaderInlineBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hintergrundfarbe der gesamten Zeile beim Hover über die Kopfzeile, zum Hervorheben der Zeile.

:::


## selectedBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Rahmenfarbe ausgewählter Zellen, zum Hervorheben der Auswahl.

:::


## selectedBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hintergrundfarbe ausgewählter Zellen, zum Hervorheben der Auswahl.

:::


## bodyCellStyle

**Type:** `BodyCellStyle | BodyCellStyle[] | undefined`

:::note{title=Beschreibung}
Legt spezielle Stile für Zellen im Tabellenkörper fest.

:::


### selector

**Type:** `Selector | Selectors | FieldSelector | undefined`

:::note{title=Beschreibung}
Datenselektor

Wenn ein selector konfiguriert ist, bietet er vier Arten der Datenzuordnung: numerische Selektoren, Teil-Datenselektoren, bedingte Dimensionsselektoren und bedingte Kennzahlselektoren.

Wenn kein selector konfiguriert ist, gilt der Stil global.

Hinweis: selector und dynamicFilter können nicht gleichzeitig verwendet werden; dynamicFilter hat höhere Priorität.

:::

**Beispiel**
Numerischer Selektor
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

Teil-Datenselektor
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

Bedingter Dimensionsselektor
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

Bedingter Kennzahlselektor
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

Feldspaltenfilterung
selector = {
field: 'category'
}
selector = {
field: ['category', 'profit']
}




#### field

**Type:** `string | string[]`

:::note{title=Beschreibung}
Feldname, kann ein einzelnes Feld oder ein Array mehrerer Felder sein.

:::

**Beispiel**
Einzelfeld
field: 'sales'

Mehrere Felder
field: ['sales', 'profit', 'revenue']



#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Vertikale Textausrichtung; typischerweise auf 'top' gesetzt, damit Text unterhalb des Annotationspunkts erscheint und im sichtbaren Diagrammbereich bleibt.

\- in: Wählt Datenelemente aus, deren Dimensionsfeldwert im value-Array enthalten ist.

\- not in: Wählt Datenelemente aus, deren Dimensionsfeldwert nicht im value-Array enthalten ist.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Vertikale Textausrichtung; typischerweise auf 'top' gesetzt, damit Text unterhalb des Annotationspunkts erscheint und im sichtbaren Diagrammbereich bleibt.

\- in: Wählt Datenelemente aus, deren Dimensionsfeldwert im value-Array enthalten ist.

\- not in: Wählt Datenelemente aus, deren Dimensionsfeldwert nicht im value-Array enthalten ist.

Identisch mit operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wählt Dimensionsfeldwerte aus; Arrays werden unterstützt.

:::

### dynamicFilter

**Type:** `TableDynamicFilter | undefined`

:::note{title=Beschreibung}
Dynamischer Filter (codegesteuert)



Implementiert komplexe Datenfilterlogik über KI-generierten JavaScript-Code.

Geeignet für Szenarien, die mit statischen Selektoren schwer auszudrücken sind, z. B. Top N, statistische Analyse und komplexe Bedingungen.



Wichtige Funktionen:

\- Unterstützt beliebig komplexe Datenfilterbedingungen.

\- Verwendet integrierte Hilfsfunktionen zur Datenmanipulation.

\- Wird sicher in der Browserumgebung ausgeführt (Web-Worker-Sandbox).



Umgebungsanforderungen: Unterstützt nur Browserumgebungen; Node.js-Umgebungen verwenden den Fallback.



Hinweis: selector und dynamicFilter können nicht gleichzeitig verwendet werden; dynamicFilter hat höhere Priorität.



Konfiguration des dynamischen Tabellenfilters



Implementiert präzise Filterung auf Zellebene in Tabellen über KI-generierten JavaScript-Code.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
Beschreibung der Filteranforderung des Benutzers (natürliche Sprache).

:::

**Beispiel**
"Zellen mit Umsatz größer als 1000 hervorheben"

"Die Zelle mit dem Maximalwert in jeder Zeile hervorheben"



#### code

**Type:** `string`

:::note{title=Beschreibung}
Von KI generierter JavaScript-Filtercode.



\- Es dürfen nur integrierte Hilfsfunktionen verwendet werden (zugänglich über _ oder R).

\- Eingabeparameter: data (Array), wobei jedes Element ein _index-Feld mit der Zeilennummer enthält.

\- Muss ein Array von Zellselektoren zurückgeben: Array<{ __row_index: number, field: string }>.

\- Wenn field "*" ist, wird die gesamte Zeile hervorgehoben.

\- Verboten: eval, Function, asynchrone Operationen, DOM-APIs und Netzwerkanfragen.

:::

**Beispiel**
Top N filtering
dynamicFilter = {
type: 'row\-with\-field',
description: 'Die Top-3-Produkte nach Verkäufen hervorheben',
code: `
const sorted = _.sortBy(data, 'sales');
const reversed = [...sorted].reverse();
const result = _.take(reversed, 3);
return _.flatten(
_.map(result, item => [
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

Mehrbedingungsfilterung
dynamicFilter = {
type: 'row\-with\-field',
description: 'Highlight products with profit margin > 20% and sales > 5000',
code: `
const matched = _.filter(data, item => {
const profitRate = (item.profit / item.sales) * 100;
return profitRate > 20 && item.sales > 5000;
});
return _.flatten(
_.map(matched, item => [
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

Relative-Wert-Filterung
dynamicFilter = {   *
type: 'row\-with\-field',
description: 'Produkte mit überdurchschnittlichen Verkäufen hervorheben',
code: `
const avgSales = _.meanBy(data, 'sales');
const matched = _.filter(data, item => item.sales > avgSales);
return _.flatten(
_.map(matched, item => [
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

Grouped filtering
dynamicFilter = {
type: 'row\-with\-field',
description: 'Highlight the product with the highest sales in each region',
code: `
const grouped = _.groupBy(data, 'region');
const topByRegion = _.map(_.values(grouped), group => _.maxBy(group, 'sales'));
return _.flatten(
_.map(topByRegion, item => [
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

Gesamte Zeile hervorheben
dynamicFilter = {
description: 'Highlight rows where sales are greater than profit',
code: `
const matched = _.filter(data, item => item.sales > item.profit);
return matched.map(item => ({
__row_index: item._index,
field: '*'
}));
`,
enabled: true
}



#### fallback

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
Fallback-Plan, wenn die Codeausführung fehlschlägt oder die Umgebung nicht unterstützt wird.

:::


##### field

**Type:** `string`

:::note{title=Beschreibung}
Dimensionsfeld; ID eines Elements in dimensions.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Vertikale Textausrichtung; typischerweise auf 'top' gesetzt, damit Text unterhalb des Annotationspunkts erscheint und im sichtbaren Diagrammbereich bleibt.

\- in: Wählt Datenelemente aus, deren Dimensionsfeldwert im value-Array enthalten ist.

\- not in: Wählt Datenelemente aus, deren Dimensionsfeldwert nicht im value-Array enthalten ist.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Vertikale Textausrichtung; typischerweise auf 'top' gesetzt, damit Text unterhalb des Annotationspunkts erscheint und im sichtbaren Diagrammbereich bleibt.

\- in: Wählt Datenelemente aus, deren Dimensionsfeldwert im value-Array enthalten ist.

\- not in: Wählt Datenelemente aus, deren Dimensionsfeldwert nicht im value-Array enthalten ist.

Identisch mit operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wählt Dimensionsfeldwerte aus; Arrays werden unterstützt.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}
Ausführungsergebnis des dynamischen Filters (Laufzeitfeld)



Wird während der prepare()-Phase geschrieben; zur Laufzeit schreibgeschützt

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### backgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zellenhintergrundfarbe

:::

### enableBackgroundColorScale

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Farbskalenkonfiguration für Hintergrundfarben aktiviert wird

:::

### backgroundColorScale

**Type:** `{ minValue?: number; maxValue?: number; minColor: string; maxColor: string; } | undefined`

:::note{title=Beschreibung}
Farbskalen-Zuordnung für Zellenhintergrundfarben; hat Vorrang vor backgroundColor

:::


#### minValue

**Type:** `number | undefined`

:::note{title=Beschreibung}
Mindestwert; falls nicht konfiguriert, wird der Mindestwert der aktuellen Datenspalte verwendet

:::

#### maxValue

**Type:** `number | undefined`

:::note{title=Beschreibung}
Maximalwert; falls nicht konfiguriert, wird der Maximalwert der aktuellen Datenspalte verwendet

:::

#### minColor

**Type:** `string`

:::note{title=Beschreibung}
Farbe für den Mindestwert

:::

#### maxColor

**Type:** `string`

:::note{title=Beschreibung}
Farbe für den Maximalwert

:::

### enableProgressBar

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Fortschrittsbalkenfunktion aktiviert wird (ein Balken zeigt die relative Größe des Zellwerts); standardmäßig deaktiviert

:::

### barPositiveColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe des Fortschrittsbalkens bei positivem Zellwert

:::

### barNegativeColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe des Fortschrittsbalkens bei negativem Zellwert

:::

### barMin

**Type:** `number | undefined`

:::note{title=Beschreibung}
Mindestwert des Fortschrittsbalkens



Berechnet automatisch das Spaltenminimum, wenn nicht konfiguriert

:::

### barMax

**Type:** `number | undefined`

:::note{title=Beschreibung}
Maximalwert des Fortschrittsbalkens



Berechnet automatisch das Spaltenmaximum, wenn nicht konfiguriert

:::

### textColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zellentextfarbe

:::

### textFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Schriftgröße des Zellentexts

:::

### borderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zellenrahmenfarbe

:::

### borderLineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Linienbreite des Zellenrahmens

:::


## totals

**Type:** `TotalType | undefined`

:::note{title=Beschreibung}
Typ der anzuzeigenden Zusammenfassungszeile; gilt nur für Kennzahlspalten

\- 'sum': Zeigt die Summenzeile an

\- 'avg': Zeigt die Durchschnittszeile an

\- 'max': Zeigt die Maximumzeile an

\- 'min': Zeigt die Minimumzeile an

\- 'count': Zeigt die Anzahlzeile an



Typ der Tabellenzusammenfassungszeile

\- 'sum': Summe

\- 'avg': Durchschnitt

\- 'max': Maximum

\- 'min': Minimum

\- 'count': Anzahl

:::

**Beispiel**
'sum'




## theme

**Type:** `Theme | undefined`

:::note{title=Beschreibung}
Diagrammthema. Das Thema ist eine funktionale Konfiguration mit niedrigerer Priorität. Es umfasst gemeinsame Einstellungen für alle Diagrammtypen sowie spezifische Einstellungen für einen einzelnen Diagrammtyp. Die integrierten Themen light und dark können über Builder angepasst werden.



Thema



Integrierte Themen light und dark; neue Themen können über registerTheme angepasst werden.

:::

**Beispiel**
'dark'

'light'

'customThemeName'




### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Beschreibung}
Sprachkonfiguration des Diagramms; unterstützt 'zh-CN' und 'en-US'. Zusätzlich kann die Sprache mit intl.setLocale('zh-CN') gesetzt werden.

:::
