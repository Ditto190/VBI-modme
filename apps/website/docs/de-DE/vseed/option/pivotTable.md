# PivotTable

:::info{title=Empfohlen}
- Empfohlene Feldkonfiguration: `1` Kennzahl, `1` Dimension
- Unterstützt Datenumformung: mindestens `1` Kennzahl, `0` Dimensionen
:::

:::info{title=Encoding-Zuordnung}
Die Pivot-Tabelle unterstützt die folgenden visuellen Kanäle:

`row`    : Zeilendimension, unterstützt `mehrere Dimensionen`, gruppiert Daten nach Dimensionswerten in Zeilen

`column` : Spaltendimension, unterstützt `mehrere Dimensionen`, gruppiert Daten nach Dimensionswerten in Spalten

`detail` : Detailkanal, unterstützt `mehrere Kennzahlen`, zeigt Kennzahlwerte in Zellen an

:::

:::note{title=Beschreibung}
Pivot-Tabelle, geeignet für mehrdimensionale Kreuzanalysen; Zeilen- und Spaltendimensionen sowie Kennzahlberechnungen lassen sich flexibel konfigurieren.

Geeignete Szenarien:

- Komplexe mehrdimensionale statistische Analyse
- Daten-Drilldown und aggregierte Anzeige
- Erstellung von Geschäftsberichten und Datenexploration

:::

:::warning{title=Warning}
Datenanforderungen:

- Mindestens 1 Zeilendimension oder 1 Spaltendimension oder 1 Kennzahl
- Daten müssen bereits aggregiert sein
- Daten müssen gruppierbar sein

Standardmäßig aktivierte Funktionen:

- Zeilen-/Spaltensortierung, Datenfilterung, Aggregationsberechnung, Zwischensummen und Gesamtsummen sind standardmäßig aktiviert

:::


## chartType

**Type:** `"pivotTable"`

:::note{title=Beschreibung}
Pivot-Tabelle, geeignet für mehrdimensionale Kreuzanalysen

:::

**Beispiel**
'pivotTable'




## dataset

**Type:** `Record[]`

:::note{title=Beschreibung}
Ein bereits aggregierter Datensatz gemäß TidyData-Spezifikation, der Datenquelle und Struktur des Diagramms definiert. Benutzereingaben müssen nicht verarbeitet werden; VSeed verfügt über leistungsfähige Datenumformungsfunktionen und formt die Daten automatisch um. Pivot-Tabellendaten werden letztlich in die entsprechende Baumstruktur umgewandelt, sodass keine manuelle Datenverarbeitung erforderlich ist.

:::

**Beispiel**
[{region:'East China', product:'A', sales:1000}, {region:'East China', product:'B', sales:1500}]




## dimensions

**Type:** `TableDimension[] | undefined`

:::note{title=Beschreibung}
Zeilen- und Spaltendimensionen der Pivot-Tabelle. Daten werden automatisch zu einer Baumstruktur verarbeitet und auf Zeilen- und Spaltenachsen abgebildet.

:::

**Beispiel**
[{id: 'region', alias: 'Region', isRow: true}, {id: 'product', alias: 'Product', isColumn: true}]




### id

**Type:** `string`

:::note{title=Beschreibung}
Feld-ID, die der Dimension entspricht

:::

### alias

**Type:** `string | undefined`

:::note{title=Beschreibung}
Dimensionsalias

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=Beschreibung}
Datumsformatkonfiguration der Dimension

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=Beschreibung}
Zeitgranularität; bestimmt die Genauigkeit der Datumsanzeige

:::

### encoding

**Type:** `"row" | "column" | undefined`

:::note{title=Beschreibung}
Kanal, dem die Dimension zugeordnet wird:

- row: unterstützt das Zuordnen mehrerer Dimensionen zum Zeilenkanal

- column: unterstützt das Zuordnen mehrerer Dimensionen zum Spaltenkanal

:::


## measures

**Type:** `TableMeasure[] | undefined`

:::note{title=Beschreibung}
Die Pivot-Tabelle unterstützt mehrere Kennzahlen.

:::

**Beispiel**
[{id: 'sales', alias: 'Sales', aggregation: 'sum'}]




### id

**Type:** `string`

:::note{title=Beschreibung}
Kennzahl-ID, muss eindeutig sein

:::

### alias

**Type:** `string | undefined`

:::note{title=Beschreibung}
Kennzahlalias, Duplikate sind erlaubt; wenn nicht gesetzt, entspricht alias der id

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Automatische Zahlenformatierung, standardmäßig aktiviert, höchste Priorität.

Wenn autoFormat=true ist, werden alle numFormat-Konfigurationen überschrieben.

Wenn aktiviert, wählen Diagramm-Datenbeschriftungen und Tooltips automatisch die passende Formatierung anhand von Kennzahlwerten und Gebietsschema aus.

Formatierungsregeln: Dezimalzahlen mit aktivierter compact notation, mindestens 0 und höchstens 2 Dezimalstellen, automatische Rundung, umgesetzt mit Intl.NumberFormat des Browsers.

Zum Beispiel:

- locale=zh-CN: 749740.264 → 74.45万

- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}
Benutzerdefinierte Zahlenformatierung für Kennzahlen; wird automatisch auf Beschriftungen und Tooltips angewendet.

Hinweis: Für benutzerdefinierte Formatierung muss autoFormat=false explizit gesetzt werden; andernfalls überschreibt autoFormat diese Konfiguration.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Zahlenformattyp, unterstützt: Zahl (Dezimal), Prozent (%), Promille (‰), wissenschaftliche Notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Verhältnis der Zahlenformatierung, darf nicht 0 sein

:::

**Beispiel**
- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Symbol der Zahlenformatierung, z. B. %, ‰

:::

**Beispiel**
- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Tausendertrennzeichen für die Zahlenformatierung

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
Dezimalstellen für die Zahlenformatierung; verwendet minimumFractionDigits und maximumFractionDigits von Intl.NumberFormat im Browser; niedrigere Priorität als significantDigits.

:::

**Beispiel**
- 1234.5678 wird zu 1235 konvertiert, fractionDigits:0 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.6 konvertiert, fractionDigits:1 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.57 konvertiert, fractionDigits:2 (roundingMode:halfCeil)
- 1234.5678 wird zu 1230.568 konvertiert, fractionDigits:3 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.5678 konvertiert, fractionDigits:4 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.56780 konvertiert, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Signifikante Stellen für die Zahlenformatierung; verwendet minimumSignificantDigits und maximumSignificantDigits von Intl.NumberFormat im Browser; höhere Priorität als fractionDigits.

:::

**Beispiel**
- 1234.5678 wird zu 1000 konvertiert, significantDigits:1
- 1234.5678 wird zu 1200 konvertiert, significantDigits:2
- 1234.5678 wird zu 1230 konvertiert, significantDigits:3
- 1234.5678 wird zu 1234 konvertiert, significantDigits:4
- 1234.5678 wird zu 1234.6 konvertiert, significantDigits:5 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.57 konvertiert, significantDigits:6 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.568 konvertiert, significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}
Rundungspriorität der Zahlenformatierung, wenn sowohl significantDigits als auch fractionDigits gesetzt sind; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie dessen roundingPriority.

:::

**Beispiel**
- 1234.5678 wird zu 1230 konvertiert, significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus der Zahlenformatierung; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie dessen roundingMode.

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Zahlenformattyp, unterstützt: Zahl (Dezimal), Prozent (%), Promille (‰), wissenschaftliche Notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Verhältnis der Zahlenformatierung, darf nicht 0 sein

:::

**Beispiel**
- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Symbol der Zahlenformatierung, z. B. %, ‰

:::

**Beispiel**
- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Tausendertrennzeichen für die Zahlenformatierung

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
Dezimalstellen für die Zahlenformatierung; verwendet minimumFractionDigits und maximumFractionDigits von Intl.NumberFormat im Browser; niedrigere Priorität als significantDigits.

:::

**Beispiel**
- 1234.5678 wird zu 1235 konvertiert, fractionDigits:0 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.6 konvertiert, fractionDigits:1 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.57 konvertiert, fractionDigits:2 (roundingMode:halfCeil)
- 1234.5678 wird zu 1230.568 konvertiert, fractionDigits:3 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.5678 konvertiert, fractionDigits:4 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.56780 konvertiert, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Signifikante Stellen für die Zahlenformatierung; verwendet minimumSignificantDigits und maximumSignificantDigits von Intl.NumberFormat im Browser; höhere Priorität als fractionDigits.

:::

**Beispiel**
- 1234.5678 wird zu 1000 konvertiert, significantDigits:1
- 1234.5678 wird zu 1200 konvertiert, significantDigits:2
- 1234.5678 wird zu 1230 konvertiert, significantDigits:3
- 1234.5678 wird zu 1234 konvertiert, significantDigits:4
- 1234.5678 wird zu 1234.6 konvertiert, significantDigits:5 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.57 konvertiert, significantDigits:6 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.568 konvertiert, significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}
Rundungspriorität der Zahlenformatierung, wenn sowohl significantDigits als auch fractionDigits gesetzt sind; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie dessen roundingPriority.

:::

**Beispiel**
- 1234.5678 wird zu 1230 konvertiert, significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus der Zahlenformatierung; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie dessen roundingMode.

:::

### encoding

**Type:** `"column" | undefined`

:::note{title=Beschreibung}
Kanal, dem die Kennzahl zugeordnet wird:

- column: Kennzahlspalte

:::

### parentId

**Type:** `string | undefined`

:::note{title=Beschreibung}
In einer flachen Kennzahlkonfiguration wird eine baumartige Kennzahlstruktur aufgebaut. parentId verweist auf die ID der übergeordneten Kennzahlgruppe und dient zum Aufbau der Hierarchie.

:::

:::tip{title=Tip}
Es gibt zwei Möglichkeiten, den Kennzahlbaum zu konfigurieren: Option 1 konfiguriert den Kennzahlbaum direkt mit children; Option 2 stellt eine flache Kennzahlliste mit parentId bereit. Beide Methoden können nicht gleichzeitig verwendet werden.

:::


## page

**Type:** `Page | undefined`

:::note{title=Beschreibung}
Paginierungskonfiguration. Legt den Feldnamen für die Paginierung fest, der eine Dimension sein muss.

:::


### field

**Type:** `string`

:::note{title=Beschreibung}
Paginierungsfeld; legt den Feldnamen für die Paginierung fest und muss eine Dimension sein.

:::

### currentValue

**Type:** `string`

:::note{title=Beschreibung}
Aktueller Paginierungswert; legt den Wert fest, mit dem die aktuelle Seite bestimmt wird.

:::

**Beispiel**
'2023-01-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Beschreibung}
Diagramm-Hintergrundfarbe. Standard ist transparent. Kann ein Farbstring sein (z. B. 'red', 'blue') oder ein hex-, rgb- oder rgba-Wert (z. B. '#ff0000', 'rgba(255,0,0,0.5)').

:::


## borderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Rahmenfarbe der Tabelle.

:::


## bodyFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Schriftgröße des Tabellenkörpers.

:::


## bodyFontColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Schriftfarbe des Tabellenkörpers.

:::


## bodyBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hintergrundfarbe des Tabellenkörpers.

:::


## headerFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Schriftgröße der Zeilen- und Spaltenköpfe.

:::


## headerFontColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Schriftfarbe der Zeilen- und Spaltenköpfe.

:::


## headerBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hintergrundfarbe der Zeilen- und Spaltenköpfe.

:::


## hoverHeaderBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hintergrundfarbe beim Hover über eine Zeilen- oder Spaltenkopf-Zelle; hebt die Zelle am Schnittpunkt der betreffenden Zeile und Spalte hervor.

:::


## hoverHeaderInlineBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hintergrundfarbe beim Hover über eine Zeilen- oder Spaltenkopf-Zelle; hebt alle Zellen der betreffenden Zeile und Spalte hervor.

:::


## selectedBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Rahmenfarbe der ausgewählten Zelle, zur Hervorhebung.

:::


## selectedBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hintergrundfarbe der ausgewählten Zelle, zur Hervorhebung.

:::


## bodyCellStyle

**Type:** `BodyCellStyle | BodyCellStyle[] | undefined`

:::note{title=Beschreibung}
Legt spezielle Stile für Zellen im Tabellenkörper fest.

:::


### selector

**Type:** `Selector | Selectors | FieldSelector | undefined`

:::note{title=Beschreibung}
Datenselektor.

Wenn `selector` konfiguriert ist, stellt er vier Arten der Datenabstimmung bereit: numerischer Selektor, lokaler Datenselektor, bedingter Dimensionsselektor und bedingter Kennzahlselektor.

Wenn `selector` nicht konfiguriert ist, gilt der Stil global.

Hinweis: `selector` und `dynamicFilter` können nicht gleichzeitig verwendet werden; `dynamicFilter` hat höhere Priorität.

:::

**Beispiel**
Numerischer Selektor:
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

Lokaler Datenselektor:
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

Bedingter Dimensionsselektor:
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

Bedingter Kennzahlselektor:
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

Feldspaltenfilter:
selector = {
field: 'category'
}
selector = {
field: ['category', 'profit']
}




#### field

**Type:** `string | string[]`

:::note{title=Beschreibung}
Feldname; kann ein einzelnes Feld oder ein Array von Feldern sein.

:::

**Beispiel**
Einzelnes Feld:
field: 'sales'

Mehrere Felder:
field: ['sales', 'profit', 'revenue']



#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator:

- in: Wählt Datenelemente aus, deren Dimensionsfeldwert in der 'value'-Liste enthalten ist.

- not in: Wählt Datenelemente aus, deren Dimensionsfeldwert nicht in der 'value'-Liste enthalten ist.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator:

- in: Wählt Datenelemente aus, deren Dimensionsfeldwert in der 'value'-Liste enthalten ist.

- not in: Wählt Datenelemente aus, deren Dimensionsfeldwert nicht in der 'value'-Liste enthalten ist.

Gleich wie operator.

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Auszuwählende Dimensionswerte; unterstützt Arrays.

:::

### dynamicFilter

**Type:** `TableDynamicFilter | undefined`

:::note{title=Beschreibung}
Dynamischer Filter (codegesteuert).

Implementiert komplexe Datenfilterlogik über KI-generierten JavaScript-Code.
Geeignet für Top N, statistische Analysen, komplexe Bedingungen und andere Szenarien, in denen statische Selektoren nicht ausreichen.

Kernfunktionen:

- Unterstützt beliebig komplexe Datenfilterbedingungen.

- Nutzt integrierte Hilfsfunktionen für Datenoperationen.

- Sichere Ausführung in der Browserumgebung (Web-Worker-Sandbox).

Anforderungen: Unterstützt nur Browserumgebungen; Node.js-Umgebungen verwenden fallback.

Hinweis: `selector` und `dynamicFilter` können nicht gleichzeitig verwendet werden; `dynamicFilter` hat höhere Priorität.

Konfiguration für den dynamischen Tabellenfilter.

Implementiert präzises Filtern auf Zellebene über KI-generierten JavaScript-Code.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
Beschreibung der Filteranforderung des Benutzers (natürliche Sprache).

:::

**Beispiel**
"Zellen hervorheben, deren Verkäufe größer als 1000 sind."

"Die Zelle mit dem Maximalwert in jeder Zeile hervorheben."



#### code

**Type:** `string`

:::note{title=Beschreibung}
KI-generierter JavaScript-Filtercode.

- Es dürfen nur integrierte Hilfsfunktionen verwendet werden (Zugriff über _ oder R).

- Eingabeparameter: data (Array); jedes Element enthält ein `_index`-Feld, das die Zeilennummer repräsentiert.

- Muss ein Array von Zellselektoren zurückgeben: Array<{ __row_index: number, field: string }>.

- Wenn `field` "*" ist, wird die gesamte Zeile hervorgehoben.

- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen.

:::

**Beispiel**
Top-N-Filter:
dynamicFilter = {
type: 'row-with-field',
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

Mehrbedingungen-Filter:
dynamicFilter = {
type: 'row-with-field',
description: 'Produkte mit Gewinnmarge > 20 % und Verkäufen > 5000 hervorheben',
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

Relativwertfilter:
dynamicFilter = {
type: 'row-with-field',
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

Gruppierter Filter:
dynamicFilter = {
type: 'row-with-field',
description: 'Das meistverkaufte Produkt in jeder Region hervorheben',
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

Gesamte Zeile hervorheben:
dynamicFilter = {
description: 'Zeilen hervorheben, in denen Verkäufe den Gewinn übersteigen',
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
Dimensionsfeld-ID.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator:

- in: Wählt Datenelemente aus, deren Dimensionsfeldwert in der 'value'-Liste enthalten ist.

- not in: Wählt Datenelemente aus, deren Dimensionsfeldwert nicht in der 'value'-Liste enthalten ist.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator:

- in: Wählt Datenelemente aus, deren Dimensionsfeldwert in der 'value'-Liste enthalten ist.

- not in: Wählt Datenelemente aus, deren Dimensionsfeldwert nicht in der 'value'-Liste enthalten ist.

Gleich wie operator.

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Auszuwählende Dimensionswerte; unterstützt Arrays.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}
Ausführungsergebnis des dynamischen Filters (Laufzeitfeld). Wird während der `prepare()`-Phase geschrieben; zur Laufzeit schreibgeschützt.

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
Zellhintergrundfarbe.

:::

### enableBackgroundColorScale

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Farbskala für Zellhintergründe aktiviert wird.

:::

### backgroundColorScale

**Type:** `{ minValue?: number; maxValue?: number; minColor: string; maxColor: string; } | undefined`

:::note{title=Beschreibung}
Zuordnung für die Zellhintergrund-Farbskala; hat höhere Priorität als `backgroundColor`.

:::


#### minValue

**Type:** `number | undefined`

:::note{title=Beschreibung}
Minimalwert; wenn nicht konfiguriert, standardmäßig der Minimalwert der aktuellen Datenspalte.

:::

#### maxValue

**Type:** `number | undefined`

:::note{title=Beschreibung}
Maximalwert; wenn nicht konfiguriert, standardmäßig der Maximalwert der aktuellen Datenspalte.

:::

#### minColor

**Type:** `string`

:::note{title=Beschreibung}
Farbe, die dem Minimalwert entspricht.

:::

#### maxColor

**Type:** `string`

:::note{title=Beschreibung}
Farbe, die dem Maximalwert entspricht.

:::

### enableProgressBar

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Hintergrund-Fortschrittsbalken aktiviert werden (Balken, der die Größe des Zellwerts widerspiegelt). Standardmäßig deaktiviert.

:::

### barPositiveColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe des Hintergrundbalkens, wenn der Zellwert positiv ist.

:::

### barNegativeColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe des Hintergrundbalkens, wenn der Zellwert negativ ist.

:::

### barMin

**Type:** `number | undefined`

:::note{title=Beschreibung}
Minimalwert für den Fortschrittsbalken.
Wird automatisch aus dem Spaltenminimum berechnet, wenn nicht konfiguriert.

:::

### barMax

**Type:** `number | undefined`

:::note{title=Beschreibung}
Maximalwert für den Fortschrittsbalken.
Wird automatisch aus dem Spaltenmaximum berechnet, wenn nicht konfiguriert.

:::

### textColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe des Zelltexts.

:::

### textFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Größe des Zelltexts.

:::

### borderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Rahmenfarbe der Zelle.

:::

### borderLineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Linienbreite des Zellrahmens.

:::


## indicatorsAsCol

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Kennzahlen als Spalten angezeigt werden. Bei `true` werden Kennzahlen horizontal (Spalten) erweitert; bei `false` vertikal (Zeilen).

:::

**Beispiel**
true




## totals

**Type:** `PivotTableTotals | undefined`

:::note{title=Beschreibung}
Gesamt- und Zwischensummenkonfiguration für die Pivot-Tabelle.

:::

**Beispiel**
{ row: { showGrandTotals: true, showSubTotals: true, subTotalsDimensions: ['category'] } }




### row

**Type:** `RowOrColumnTotalConfig | undefined`

:::note{title=Beschreibung}
Gesamt- und Zwischensummenkonfiguration für Zeilen.

:::


#### showGrandTotals

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Gesamtsummen (Gesamtzeile/-spalte) angezeigt werden.

:::

#### showSubTotals

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Zwischensummen angezeigt werden.

:::

#### subTotalsDimensions

**Type:** `string[] | undefined`

:::note{title=Beschreibung}
Dimensionen für Zwischensummen; gruppiert Zwischensummen nach diesen Dimensionen.

:::

**Beispiel**
['category', 'region']



### column

**Type:** `RowOrColumnTotalConfig | undefined`

:::note{title=Beschreibung}
Gesamt- und Zwischensummenkonfiguration für Spalten.

:::


#### showGrandTotals

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Gesamtsummen (Gesamtzeile/-spalte) angezeigt werden.

:::

#### showSubTotals

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Zwischensummen angezeigt werden.

:::

#### subTotalsDimensions

**Type:** `string[] | undefined`

:::note{title=Beschreibung}
Dimensionen für Zwischensummen; gruppiert Zwischensummen nach diesen Dimensionen.

:::

**Beispiel**
['category', 'region']




## theme

**Type:** `Theme | undefined`

:::note{title=Beschreibung}
Diagramm-Theme. Themes sind Konfigurationen mit niedrigerer Priorität und enthalten allgemeine Einstellungen für alle Diagrammtypen sowie spezifische Einstellungen innerhalb einer Diagrammkategorie.

Helle und dunkle Themes sind integriert; Benutzer können über den Builder eigene Themes definieren.

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
Locale. Sprachkonfiguration des Diagramms; unterstützt 'zh-CN' und 'en-US'. Alternativ kann `intl.setLocale('zh-CN')` aufgerufen werden, um die Sprache festzulegen.

:::
