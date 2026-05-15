# advanced Pipeline

## advanced pipeline

`advanced pipeline` reçoit une VSeed DSL et produit une advancedVSeed DSL.

`advancedVSeed` est une structure de données conçue à partir de la grammaire graphique. Elle sert à décrire de manière unifiée les graphiques et les tableaux, et fait le lien entre le métier et la bibliothèque de graphiques.


`advancedVSeed` est elle-même entièrement sérialisable. Elle peut donc être construite dans un environnement Node.js, transmise par HTTP à la spec pipeline, puis rendue sous forme de graphique côté frontend.
