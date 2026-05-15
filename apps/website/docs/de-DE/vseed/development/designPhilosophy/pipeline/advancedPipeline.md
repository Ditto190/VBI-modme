# advanced Pipeline

## advanced pipeline

`advanced pipeline` empfängt eine VSeed DSL und gibt eine advancedVSeed DSL aus.

`advancedVSeed` ist eine Datenstruktur, die auf Grundlage der Grammar of Graphics entworfen wurde. Sie dient dazu, Charts und Tabellen einheitlich zu beschreiben, und bildet die Brücke zwischen Geschäftsanforderungen und Chartbibliothek.


`advancedVSeed` selbst ist ebenfalls vollständig serialisierbar. Daher kann es in einer Node.js-Umgebung aufgebaut, per HTTP an die spec pipeline übertragen und anschließend im Frontend als Chart gerendert werden.
