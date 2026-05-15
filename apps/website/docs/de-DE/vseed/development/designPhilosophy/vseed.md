# VSeed

:::info Kurz zusammengefasst
Nimmt flexible Geschäftsanforderungen von oben auf, begrenzt Datenzugriffsformen nach unten und orchestriert Daten einheitlich, um Komplexität zu vereinfachen.
:::

## Was ist VSeed?

`VSeed` ist ein Visualisierungstool für Datenanalyse. Es konzentriert sich darauf, zwischen unterschiedlichen Charttypen hochkonsistente Datentransformationen bereitzustellen, und bietet zugleich einige sofort nutzbare Funktionen für leichte Datenanalyseanforderungen.

## Welche Vorteile hat VSeed?

> Erstens ist es wirklich einfach zu verwenden, zweitens ist es tatsächlich flexibel, und drittens enthält VSeed viele Kapselungen. Man muss verstehen, wie VSeed Daten umformt, um es perfekt einzusetzen.

1. Die intuitivste Art, Charttypen zu wechseln [Demo](/vseed/guide/intro/chartTypeSwitch)
2. Die am einfachsten nutzbaren Pivot-Charts [Demo](/vseed/guide/intro/pivotAndCombine)
3. Leistungsstarke Datenumformung: keine manuelle Datenverarbeitung erforderlich, beliebig viele Dimensionen und Measures, jeder Charttyp kann ausgegeben werden [Demo](/vseed/guide/intro/dataReshape)
4. `VSeed` ist vollständig serialisierbar und unterstützt daher die plattformübergreifende Übertragung von `VSeed DSL` [Demo](/vseed/guide/intro/crossPlatformRender)
5. Sofort nutzbar: Zahlenformatierung, Internationalisierung, helle und dunkle Themes, gängige Styles und mehr [Demo](/vseed/guide/intro/internationalization)
6. Hervorragende Datenverarbeitungsleistung, unterstützt Datenverarbeitung auf `Node`-Seite und Visualisierung im `Web` [Demo](/vseed/guide/intro/separateBuild)

## Welche Nachteile hat VSeed?

1. `VSeed` ist nicht dafür zuständig, jedes Detail eines einzelnen Charts auszuarbeiten. Solche Anforderungen werden von `VChart` und `VTable` abgedeckt. `VSeed` bietet nur die Fähigkeit, `spec` flexibel zu ändern; Nutzer können jedes Chartdetail nach ihren Anforderungen anpassen.
2. Nur Datensätze, die der `tidyData`-Spezifikation entsprechen, können von `VSeed` visualisiert werden. Nicht standardisierte Datensätze werden von `VSeed` nicht akzeptiert.
3. Es ist auf dem `VisActor`-Ökosystem aufgebaut, daher müssen Nutzer die Grundkonzepte von `VChart` und `VTable` kennen.

## Welche Prinzipien hat VSeed?

1. `VSeed` muss Serialisierung unterstützen.
2. `VSeed` muss nicht zu viele Style-Einstellungsmöglichkeiten bieten, sondern sollte sich auf die Beziehung zwischen Charts und Daten konzentrieren.
3. `VSeed` sollte häufig genutzte allgemeine Funktionen im Analysebereich kapseln, etwa Zahlenformatierung, Internationalisierung, Themes, gängige Styles und gängige Funktionen, sodass sie sofort nutzbar sind.
4. Flexiblere Anpassungen sollten durch Nutzer selbst erfolgen. Daher stellt VSeed nach außen nur einen Spec Builder bereit, um Specs für VChart und VTable zu erstellen.
   - Nutzer können VChart Instance und VTable Instance flexibel steuern.
   - Nutzer können die Specs von VChart und VTable nach ihren Anforderungen flexibel ändern.

## Warum wurde VSeed entworfen?

1. `VChart` kann niemals nahtlos zu `VTable` wechseln und umgekehrt. Für solche Anforderungen wird zwangsläufig eine übergeordnete Abstraktionskapselung entstehen.
2. Nutzer von `VChart` und `VTable` müssen Daten selbst verarbeiten. Diese Arbeit wird unbewusst hunderte oder tausende Male wiederholt. `VSeed` möchte die Datenverarbeitungskomplexität in gängigen Szenarien senken und Wiederholungen reduzieren.
3. Es kann die Einstiegshürde für `VChart` und `VTable` bis zu einem gewissen Grad senken, zum Beispiel beim Rendern von `PivotChart` mit `VTable`.
4. `VSeed` könnte sich letztlich zu einem Submodul von `HeadlessBI` entwickeln, um allgemeine Datenanalysewerkzeuge zu erstellen.
