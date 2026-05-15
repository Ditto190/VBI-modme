# RaceScatter

:::note{title=Beschreibung}
Animiertes Streudiagramm (Race Scatter Chart)

Geeignet, um Datenverteilungen im Zeitverlauf darzustellen; die Position der Datenpunkte repraesentiert zwei Kennzahlenwerte

Anwendungsszenarien:

\- Verteilungsmerkmale im zweidimensionalen Raum analysieren und ihre dynamische Veraenderung im Zeitverlauf darstellen

\- Die Entwicklung der Korrelation zwischen mehreren Variablen im Zeitverlauf darstellen

\- Bewegungsverlaeufe von Datenpunkten im zweidimensionalen Raum beobachten

:::

:::note{title=Note}
Animiertes Streudiagramm:

\- X- und Y-Achse sind beide numerische Achsen (kontinuierliche Daten) und unterstuetzen mehrere Kennzahlenzuordnungen

\- Die Zeitdimension kann ueber den Player gesteuert werden, um Datenveraenderungen dynamisch darzustellen

\- Datenveraenderungen werden durch Positionsaenderungen der Datenpunkte intuitiv dargestellt

:::


## chartType

**Type:** `"raceScatter"`

:::note{title=Beschreibung}
Animiertes Streudiagramm, geeignet zur Darstellung von Datenverteilungen im Zeitverlauf

:::


## dataset

**Type:** `Record[]`

:::note{title=Beschreibung}
Datenquelle, ein Dataset gemaess TidyData-Spezifikation

:::


## dimensions

**Type:** `RaceScatterDimension[] | undefined`

:::note{title=Beschreibung}
Dimensionen, zur Unterscheidung verschiedener Datenreihen und zur Legendenanzeige

:::


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
Zeitgranularitat, bestimmt die Genauigkeit der Datumsanzeige

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "player" | undefined`

:::note{title=Beschreibung}
Dimension-Mapping-Kanaele in Race-Scatter-Diagrammen

\- color: unterstützt die Zuordnung mehrerer Dimensionen zum Farbkanal

\- detail: unterstützt die Zuordnung mehrerer Dimensionen zum Detailkanal

\- tooltip: unterstützt die Zuordnung mehrerer Dimensionen zum Tooltip-Kanal

\- label: unterstützt die Zuordnung mehrerer Dimensionen zum Beschriftungskanal

\- row: unterstützt die Zuordnung mehrerer Dimensionen zum Zeilenkanal

\- column: unterstützt die Zuordnung mehrerer Dimensionen zum Spaltenkanal

\- player: unterstützt das Zuordnen mehrerer Dimensionen zum Player-Kanal

:::


## measures

**Type:** `ScatterMeasure[] | undefined`

:::note{title=Beschreibung}
Kennzahlen; mindestens zwei Kennzahlen sind erforderlich, die auf X- und Y-Achse abgebildet werden

:::


### id

**Type:** `string`

:::note{title=Beschreibung}
Kennzahl-ID, muss eindeutig sein

:::

### alias

**Type:** `string | undefined`

:::note{title=Beschreibung}
Alias der Kennzahl, Duplikate sind zulässig; wenn nicht gesetzt, wird die ID als Alias verwendet

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Automatische Zahlenformatierung, standardmassig aktiviert, mit hochster Prioritat

Wenn autoFormat=true ist, werden alle numFormat-Konfigurationen überschrieben.

Nach der Aktivierung wahlen Datenbeschriftungen und Tooltips des Diagramms automatisch ein passendes Format basierend auf Kennzahlwerten und Locale.

Formatierungsregeln: Dezimalzahlen, kompakte Schreibweise aktiviert, mindestens 0 und hochstens 2 Dezimalstellen, automatische Rundung, Umsetzung uber Intl.NumberFormat des Browsers.

Zum Beispiel:

\- locale=zh-CN: 749740.264 → 74.45~74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}
Benutzerdefinierte Zahlenformatierung fur Kennzahlen; wird automatisch auf Beschriftungen und Tooltips angewendet.

Hinweis: Um benutzerdefinierte Formatierung zu verwenden, muss autoFormat explizit auf false gesetzt werden; andernfalls uberschreibt autoFormat diese Konfiguration.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Zahlenformatierungsverhältnis, darf nicht 0 sein

:::

**Beispiel**

Maximale Länge für Beschriftungsbegrenzung. Wenn die Textlänge diesen Wert überschreitet, wird sie mit Auslassungspunkten gekürzt und beim Hover sichtbar (nur für Kategorieachsen wirksam).



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**

Maximale Länge für Beschriftungsbegrenzung. Wenn die Textlänge diesen Wert überschreitet, wird sie mit Auslassungspunkten gekürzt und beim Hover sichtbar (nur für Kategorieachsen wirksam).



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Beschreibung}

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Beschreibung}

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Beschreibung}

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}

:::

**Beispiel**
Beschriftung font weight


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}

:::

**Beispiel**





\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**

Achsenlinie width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus der Zahlenformatierung; wird mit Intl.NumberFormat des Browsers formatiert, Regeln entsprechen roundingMode in Intl.NumberFormat

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Zahlenformatierungsverhältnis, darf nicht 0 sein

:::

**Beispiel**

Maximale Länge für Beschriftungsbegrenzung. Wenn die Textlänge diesen Wert überschreitet, wird sie mit Auslassungspunkten gekürzt und beim Hover sichtbar (nur für Kategorieachsen wirksam).



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**

Maximale Länge für Beschriftungsbegrenzung. Wenn die Textlänge diesen Wert überschreitet, wird sie mit Auslassungspunkten gekürzt und beim Hover sichtbar (nur für Kategorieachsen wirksam).



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Beschreibung}

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Beschreibung}

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Beschreibung}

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}

:::

**Beispiel**
Beschriftung font weight


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}

:::

**Beispiel**





\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**

Achsenlinie width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus der Zahlenformatierung; wird mit Intl.NumberFormat des Browsers formatiert, Regeln entsprechen roundingMode in Intl.NumberFormat

:::

### encoding

**Type:** `"xAxis" | "color" | "tooltip" | "label" | "yAxis" | "size" | undefined`

:::note{title=Beschreibung}
Kanal, dem die Kennzahl zugeordnet wird

\- xAxis: Measure mapped to the X-axis

\- yAxis: Kennzahl wird der Y-Achse zugeordnet

\- size: size mapped from the measure

\- color: Measure mapped to the color channel

\- label: Measure mapped to the label channel

\- tooltip: Measure mapped to the tooltip channel

:::

### parentId

**Type:** `string | undefined`

:::note{title=Beschreibung}
Erstellt eine baumformige Kennzahlgruppe in flacher Kennzahlkonfiguration. parentId verweist auf die ID der ubergeordneten Kennzahlgruppe und dient zum Aufbau des Kennzahlbaums.

:::

:::tip{title=Tip}
Es gibt zwei Moglichkeiten, den Kennzahlbaum zu konfigurieren: Option 1 konfiguriert direkt einen Kennzahlbaum mit children; Option 2 konfiguriert eine flache Kennzahlliste mit parentId. Beide Methoden konnen nicht gleichzeitig verwendet werden.

:::


## player

**Type:** `Player | undefined`

:::note{title=Beschreibung}
Player-Konfiguration zur Angabe der Zeitdimension; Kernkonfiguration des animierten Streudiagramms

Steuert den Wiedergabefortschritt der Zeitdimension ueber den Player, um Daten dynamisch zu aktualisieren



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
Sortierkonfiguration zur Steuerung der Reihenfolge von Dimensionswerten





:::

**Beispiel**
\- order:'asc'
\- orderBy:'date'

\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Beschreibung}
])

:::

**Beispiel**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=Beschreibung}
\- `__row_index` steht fur die Zeilennummer des ursprunglichen Datenelements, `field` fur das hervorzuhebende Feld.

:::


## page

**Type:** `Page | undefined`

:::note{title=Beschreibung}
Paginierungskonfiguration zur Verarbeitung großer Datenmengen

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
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Beschreibung}
Hintergrundfarbkonfiguration

:::


## size

**Type:** `number | number[] | undefined`

:::note{title=Beschreibung}
Scatter chart measure size, used to define the size or size range of data points

\- If the size range is a number such as 10, the data point size is fixed at 10

\- If the size range is a two-item array such as [10, 40], the data point size ranges from 10 to 40

\- Mutually exclusive with sizeRange; lower priority than size

:::


## sizeRange

**Type:** `number | number[] | undefined`

:::note{title=Beschreibung}
Scatter chart measure size range, used to define the size range of data points,

\- If the size range is a two-item array such as [10, 40], the data point size ranges from 10 to 40

\- If the size range is a number such as 10, the data point size is fixed at 10

\- Mutually exclusive with sizeRange; higher priority than size

:::


## color

**Type:** `Color | undefined`

:::note{title=Beschreibung}
Farbkonfiguration zur Unterscheidung verschiedener Dimensionen oder Kennzahlen

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Beschreibung}
Diskretes Farbschema zur Definition der Farben verschiedener Elemente im Diagramm.

:::

**Beispiel**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Beschreibung}
Lineares Verlaufsfarbschema zur Definition der Farben verschiedener Elemente im Diagramm.

:::

**Beispiel**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Beschreibung}
Farbzuordnung, mit der Datenwerte bestimmten Farben zugeordnet werden.

:::

**Beispiel**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Positiv/Negativ-Farbkonfiguration; definiert die Farbe für positive Werte im Diagramm.

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Positiv/Negativ-Farbkonfiguration; definiert die Farbe für negative Werte im Diagramm.

:::


## label

**Type:** `Label | undefined`

:::note{title=Beschreibung}
Beschriftungskonfiguration zur Anzeige von Datenlabels auf Datenpunkten

:::


### enable

**Type:** `false | true`

:::note{title=Beschreibung}
Ob die Beschriftungsfunktion aktiviert ist.

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen in die nächste Zeile umbrechen.

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen Kennzahlwerte anzeigen.

In Szenarien mit mehreren Kennzahlen müssen keine widersprüchlichen Werte befürchtet werden, da alle darstellungsbezogenen Kennzahlen durch `foldMeasures` verarbeitet und zu einer Kennzahl zusammengeführt werden, die einen einzelnen Datenpunkt repräsentiert.

Hinweis: Das label in encoding hat eine hohere Prioritat; diese Konfiguration beeinflusst das label in encoding nicht.

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen Kennzahlwerte als Prozentwerte anzeigen.

In Szenarien mit mehreren Kennzahlen müssen keine widersprüchlichen Werte befürchtet werden, da alle darstellungsbezogenen Kennzahlen durch `foldMeasures` verarbeitet und zu einer Kennzahl zusammengeführt werden, die einen einzelnen Datenpunkt repräsentiert.

Hinweis: Das label in encoding hat eine hohere Prioritat; diese Konfiguration beeinflusst das label in encoding nicht.

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen Dimensionslabels anzeigen.

Zeigt alle Dimensionsbeschriftungen an.

Hinweis: Das label in encoding hat eine hohere Prioritat; diese Konfiguration beeinflusst das label in encoding nicht.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Beschriftungswerte automatisch formatiert werden; wenn autoFormat true ist, wird die numFormat-Konfiguration ignoriert.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}
Formatkonfiguration fur Beschriftungswerte; wird mit `format` in `measure` zusammengefuhrt, wobei `format` in `measure` hohere Prioritat hat. numFormat hat eine niedrigere Prioritat als autoFormat.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Zahlenformatierungsverhältnis, darf nicht 0 sein

:::

**Beispiel**

Maximale Länge für Beschriftungsbegrenzung. Wenn die Textlänge diesen Wert überschreitet, wird sie mit Auslassungspunkten gekürzt und beim Hover sichtbar (nur für Kategorieachsen wirksam).



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**

Maximale Länge für Beschriftungsbegrenzung. Wenn die Textlänge diesen Wert überschreitet, wird sie mit Auslassungspunkten gekürzt und beim Hover sichtbar (nur für Kategorieachsen wirksam).



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Beschreibung}

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Beschreibung}

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Beschreibung}

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}

:::

**Beispiel**
Beschriftung font weight


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}

:::

**Beispiel**





\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**

Achsenlinie width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus der Zahlenformatierung; wird mit Intl.NumberFormat des Browsers formatiert, Regeln entsprechen roundingMode in Intl.NumberFormat

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Beschreibung}
Maximale Hohe des Rechtecks; kann ein Pixelwert oder eine Prozentzeichenfolge sein.

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hintergrundfarbe der Beschriftung

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Beschreibung}
Strichfarbe der Beschriftung

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Schriftfarbe der Beschriftung

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Schriftfarbe der Beschriftung basierend auf der Elementfarbe automatisch invertiert wird.

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Beschreibung}
Beschriftungsposition

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Behandlung von Beschriftungsuberlappungen aktiviert ist.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
Beschriftungsauswahl; Bedingungen zwischen Selektoren sind standardmassig OR.

:::


#### field

**Type:** `string`

:::note{title=Beschreibung}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}
**Beispiel**







Rahmenbreite des Hintergrunds.

Sichtbarkeit der Linie.

**Beispiel**









Eckenradius des Hintergrundrahmens.



**Beispiel**





:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
"Balken mit Umsatz über 1000 hervorheben"

"Balken mit der höchsten Gewinnrate in jeder Region hervorheben"



#### code

**Type:** `string`

:::note{title=Beschreibung}
Operator



\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert nicht im Wert enthalten ist



Horizontaler Versatz des Anmerkungspunkts in Pixeln. Wenn der Punkt links liegt (Start der Kategorieachse), wird ein positiver Wert empfohlen; wenn er rechts liegt (Ende der Kategorieachse), ein negativer Wert.

Ein negativer Wert verschiebt die gesamte Komponente nach links (z. B. -10).


:::

**Beispiel**
offsetX: 5 (die gesamte Komponente verschiebt sich um 5 Pixel nach rechts)
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```


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


:::


##### field

**Type:** `string`

:::note{title=Beschreibung}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.




:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}
\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert NICHT in der Werteliste enthalten ist.



Textfarbe

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
Legendenkonfiguration

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
Gilt nur fur diskrete Legenden.

:::

**Beispiel**
border: true



### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Schriftfarbe der Legende.

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe des Paginationssymbols.

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe des deaktivierten/ausgegrauten Paginationssymbols.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Schriftgröße der Legende.

:::

**Beispiel**
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Schriftfarbe der Legende.

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Beschreibung}
Schriftstärke der Legende.

:::

**Beispiel**
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Beschreibung}
Formtyp der Legende.

:::

:::warning{title=Warning}
Gilt nur fur diskrete Legenden.

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
Maximale Anzahl von Spalten oder Zeilen bei vielen Legendeneintragen.

Wenn position horizontal ist (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), steuert maxSize die Anzahl der angezeigten Spalten.

Wenn position vertikal ist (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), steuert maxSize die Anzahl der angezeigten Zeilen.

:::

:::warning{title=Warning}
Gilt nur fur diskrete Legenden.

:::

**Beispiel**
maxSize: 2




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Beschreibung}
Tooltip-Konfiguration zur Anzeige detaillierter Informationen beim Hover

:::


### enable

**Type:** `false | true`

:::note{title=Beschreibung}


:::


## brush

**Type:** `Brush | undefined`

:::note{title=Beschreibung}
Brush-Auswahlkonfiguration zur Unterstützung von Brush-Interaktionen



\- `y`: Y-Achsen-Brush; wahlt nur in Y-Achsenrichtung, auf der X-Achse uneingeschrankt.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Beschreibung}












:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Beschreibung}








:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}






:::


#### opacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
\- 100000 wird zu 10W konvertiert, ratio:10000, symbol:"W"



Definiert den Stil der Datenpunkte ausserhalb der Auswahl.

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}
X-Achse, Kategorieachse, X-Achsenkonfiguration; definiert die X-Achse des Diagramms einschliesslich Position, Format, Stil usw.





:::


#### opacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
\- 100000 wird zu 10W konvertiert, ratio:10000, symbol:"W"





:::

#### stroke

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}

:::


## xAxis

**Type:** `XLinearAxis | undefined`

:::note{title=Beschreibung}
X-Achsen-Konfiguration; numerische Achse zur Anzeige des ersten Kennzahlenwerts

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}

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
sortLegend: {

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}


:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Zahlenformatierungsverhältnis, darf nicht 0 sein

:::

**Beispiel**

Maximale Länge für Beschriftungsbegrenzung. Wenn die Textlänge diesen Wert überschreitet, wird sie mit Auslassungspunkten gekürzt und beim Hover sichtbar (nur für Kategorieachsen wirksam).



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**

Maximale Länge für Beschriftungsbegrenzung. Wenn die Textlänge diesen Wert überschreitet, wird sie mit Auslassungspunkten gekürzt und beim Hover sichtbar (nur für Kategorieachsen wirksam).



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Beschreibung}

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Beschreibung}

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Beschreibung}

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}

:::

**Beispiel**
Beschriftung font weight


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}

:::

**Beispiel**





\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**

Achsenlinie width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus der Zahlenformatierung; wird mit Intl.NumberFormat des Browsers formatiert, Regeln entsprechen roundingMode in Intl.NumberFormat

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Beschreibung}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
value: 'tool'

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
Maximale Hohe des Rechtecks; kann ein Pixelwert oder eine Prozentzeichenfolge sein.

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}
**Beispiel**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Beschreibung}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Legenden-Sortierkonfiguration; unterstutzt Sortierung nach Dimensionen oder Kennzahlen sowie benutzerdefinierte Sortierreihenfolgen; das sort-Array folgt der Reihenfolge von links nach rechts oder von oben nach unten.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
sortLegend: {

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Beschreibung}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

#### titleText

**Type:** `string | undefined`

:::note{title=Beschreibung}

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


:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
- not in: Wählt Datenelemente aus, bei denen der Dimensionsfeldwert nicht im `value`-Array enthalten ist.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Beschreibung}
Unterstutzt globale Stile oder bedingte Stilkonfigurationen.

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Beschreibung}


:::


#### duration

**Type:** `number | undefined`

:::note{title=Beschreibung}

:::

#### easing

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::


## yAxis

**Type:** `YLinearAxis | undefined`

:::note{title=Beschreibung}
Y-Achsen-Konfiguration; numerische Achse zur Anzeige des zweiten Kennzahlenwerts

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}

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
sortLegend: {

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}


:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Zahlenformatierungsverhältnis, darf nicht 0 sein

:::

**Beispiel**

Maximale Länge für Beschriftungsbegrenzung. Wenn die Textlänge diesen Wert überschreitet, wird sie mit Auslassungspunkten gekürzt und beim Hover sichtbar (nur für Kategorieachsen wirksam).



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**

Maximale Länge für Beschriftungsbegrenzung. Wenn die Textlänge diesen Wert überschreitet, wird sie mit Auslassungspunkten gekürzt und beim Hover sichtbar (nur für Kategorieachsen wirksam).



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Beschreibung}

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Beschreibung}

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Beschreibung}

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}

:::

**Beispiel**
Beschriftung font weight


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}

:::

**Beispiel**





\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**

Achsenlinie width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus der Zahlenformatierung; wird mit Intl.NumberFormat des Browsers formatiert, Regeln entsprechen roundingMode in Intl.NumberFormat

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Beschreibung}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
value: 'tool'

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
Maximale Hohe des Rechtecks; kann ein Pixelwert oder eine Prozentzeichenfolge sein.

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}
**Beispiel**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Beschreibung}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Legenden-Sortierkonfiguration; unterstutzt Sortierung nach Dimensionen oder Kennzahlen sowie benutzerdefinierte Sortierreihenfolgen; das sort-Array folgt der Reihenfolge von links nach rechts oder von oben nach unten.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
sortLegend: {

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Beschreibung}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

#### titleText

**Type:** `string | undefined`

:::note{title=Beschreibung}

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


:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
- not in: Wählt Datenelemente aus, bei denen der Dimensionsfeldwert nicht im `value`-Array enthalten ist.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Beschreibung}
Unterstutzt globale Stile oder bedingte Stilkonfigurationen.

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Beschreibung}


:::


#### duration

**Type:** `number | undefined`

:::note{title=Beschreibung}

:::

#### easing

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::


## crosshairLine

**Type:** `CrosshairLine | undefined`

:::note{title=Beschreibung}
Crosshair-Konfiguration zur Anzeige der genauen Datenposition



Crosshair-Linienkonfiguration; ein Konfigurationstyp zum Anzeigen einer Crosshair-Linie (Hilfslinie) im Diagramm

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


## theme

**Type:** `Theme | undefined`

:::note{title=Beschreibung}
Theme-Konfiguration



Operator



\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert NICHT in der Werteliste enthalten ist.

:::


### length

**Type:** `number`

### brand

**Type:** `brand`


## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title=Beschreibung}
Datenpunkt-Stilkonfiguration, als einzelner Stil oder Array, mit Unterstuetzung fuer globale oder bedingte Stile

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
- not in: Wählt Datenelemente aus, bei denen der Dimensionsfeldwert nicht im `value`-Array enthalten ist.






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


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}
**Beispiel**









Rahmenbreite des Hintergrunds.

Sichtbarkeit der Linie.

**Beispiel**









Eckenradius des Hintergrundrahmens.



**Beispiel**





:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
"Balken mit Umsatz über 1000 hervorheben"

"Balken mit der höchsten Gewinnrate in jeder Region hervorheben"



#### code

**Type:** `string`

:::note{title=Beschreibung}
Operator



\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert nicht im Wert enthalten ist



Horizontaler Versatz des Anmerkungspunkts in Pixeln. Wenn der Punkt links liegt (Start der Kategorieachse), wird ein positiver Wert empfohlen; wenn er rechts liegt (Ende der Kategorieachse), ein negativer Wert.

Ein negativer Wert verschiebt die gesamte Komponente nach links (z. B. -10).


:::

**Beispiel**
offsetX: 5 (die gesamte Komponente verschiebt sich um 5 Pixel nach rechts)
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```


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


:::


##### field

**Type:** `string`

:::note{title=Beschreibung}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.




:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}
\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert NICHT in der Werteliste enthalten ist.



Textfarbe

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




## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Beschreibung}
Markierungspunkt-Konfiguration zum Hinzufügen von Markierungen an bestimmten Datenpunkten

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}


:::


#### field

**Type:** `string`

:::note{title=Beschreibung}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}


:::

### measureId

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}
**Beispiel**









Rahmenbreite des Hintergrunds.

Sichtbarkeit der Linie.

**Beispiel**









Eckenradius des Hintergrundrahmens.



**Beispiel**





:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
"Balken mit Umsatz über 1000 hervorheben"

"Balken mit der höchsten Gewinnrate in jeder Region hervorheben"



#### code

**Type:** `string`

:::note{title=Beschreibung}
Operator



\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert nicht im Wert enthalten ist



Horizontaler Versatz des Anmerkungspunkts in Pixeln. Wenn der Punkt links liegt (Start der Kategorieachse), wird ein positiver Wert empfohlen; wenn er rechts liegt (Ende der Kategorieachse), ein negativer Wert.

Ein negativer Wert verschiebt die gesamte Komponente nach links (z. B. -10).


:::

**Beispiel**
offsetX: 5 (die gesamte Komponente verschiebt sich um 5 Pixel nach rechts)
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```


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


:::


##### field

**Type:** `string`

:::note{title=Beschreibung}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.




:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}
\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert NICHT in der Werteliste enthalten ist.



Textfarbe

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




Schriftgrosse des Textes.


**Beispiel**

:::

**Beispiel**
'right' Text befindet sich links vom Markierungspunkt



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}
**Beispiel**









:::

**Beispiel**
'top' Text befindet sich unterhalb des Markierungspunkts



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}

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
**Beispiel**

:::

**Beispiel**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Beispiel**

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
Hintergrundfarbe.


**Beispiel**

:::

**Beispiel**
2




## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Beschreibung}
Numerische Markierungslinie, vertikale Markierungslinie zur Markierung bestimmter X-Achsenwerte

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Beschreibung}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Beschreibung}
**Beispiel**











:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
"Höchsten Umsatzwert als Referenz für die Markierungslinie abrufen"

"Durchschnittlichen Umsatz für die Markierungslinie berechnen"



#### code

**Type:** `string`

:::note{title=Beschreibung}
Operator



\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert nicht im Wert enthalten ist







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


:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Beschreibung}
\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert NICHT in der Werteliste enthalten ist.



Textfarbe

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
Ausgewahlte Dimensionsfeldwerte; unterstutzt Arrays.

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
left: Text befindet sich rechts vom Anmerkungsbereich, die linke Kante ist am Bereich ausgerichtet.

center: Text wird im Anmerkungsbereich zentriert.

Textfarbe.


**Beispiel**

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


:::

**Beispiel**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}

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
**Beispiel**

:::

**Beispiel**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Beispiel**

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
Numerische Markierungslinie, horizontale Markierungslinie zum Markieren eines bestimmten Y-Achsenwerts

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Beschreibung}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Beschreibung}
**Beispiel**











:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
"Höchsten Umsatzwert als Referenz für die Markierungslinie abrufen"

"Durchschnittlichen Umsatz für die Markierungslinie berechnen"



#### code

**Type:** `string`

:::note{title=Beschreibung}
Operator



\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert nicht im Wert enthalten ist







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


:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Beschreibung}
\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert NICHT in der Werteliste enthalten ist.



Textfarbe

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
left: Text befindet sich rechts vom Anmerkungsbereich, die linke Kante ist am Bereich ausgerichtet.

center: Text wird im Anmerkungsbereich zentriert.



**Beispiel**



:::

**Beispiel**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}
middle: Text wird vertikal im Anmerkungsbereich zentriert.



Strichfarbe des Hintergrunds

**Beispiel**



:::

**Beispiel**
'top'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}

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
**Beispiel**



**Beispiel**

:::

**Beispiel**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Beispiel**

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


:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
0

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Beschreibung}
Markierungsbereich-Konfiguration zur Hervorhebung bestimmter Datenbereiche

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Beschreibung}
Ob die Dimensionsverknupfung aktiviert wird, wenn im Diagramm Perspektive aktiviert ist oder Kennzahlen kombiniert sind.

:::


#### field

**Type:** `string`

:::note{title=Beschreibung}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}


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


:::

**Beispiel**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}

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
**Beispiel**

:::

**Beispiel**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Beispiel**



**Beispiel**

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


:::

**Beispiel**
0.5



### areaBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
'red'



### areaBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
2



### areaBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
4



### areaLineDash

**Type:** `number[] | undefined`

:::note{title=Beschreibung}


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




## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Beschreibung}
Sprachkonfiguration

:::
