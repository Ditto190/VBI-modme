# Builder

## Methods

### prepare

```ts
prepare(): Promise<void>
```

Exécute le code de filtre dynamique de manière asynchrone. À appeler avant `build()` pour exécuter le `code` dans `dynamicFilter`. Cette méthode est idempotente : plusieurs appels ne relancent pas l'exécution.

### build

```ts
build<T = S>(): T
```

Génère la configuration finale du graphique (Spec). C'est la méthode centrale la plus utilisée. Si la configuration contient du `dynamicFilter` code, il faut d'abord appeler `prepare()`.

### buildSpec

```ts
buildSpec<T = S>(advanced: AdvancedVSeed): T
```

Convertit la configuration de couche intermédiaire (AdvancedVSeed) en Spec finale. À utiliser uniquement lorsque vous devez personnaliser en profondeur la configuration intermédiaire.

### buildAdvanced

```ts
buildAdvanced(): AdvancedVSeed | null
```

Génère la configuration de couche intermédiaire (AdvancedVSeed), c'est-à-dire le modèle de graphique. Elle est plus détaillée que le VSeed d'origine et expose davantage de détails du graphique.

### getColorItems

```ts
getColorItems(): __type[]
```

Récupère les informations de champs liées aux couleurs dans les données. Souvent utilisé pour générer la légende du graphique ou une UI de filtre de couleur.

### getColorIdMap

```ts
getColorIdMap(): Record
```

Récupère la table de mapping détaillée des champs de couleur. Key est l'ID de couleur, Value correspond aux informations détaillées.

### getColorValueMap

```ts
getColorValueMap(): undefined | Record
```

Récupère le mapping de `colorId` vers la valeur de couleur finale dans une carte de couleurs discrète.

## Static Methods

### getAdvancedPipeline

```ts
static getAdvancedPipeline(chartType: ChartType): Pipe[]
```

[Méthode interne] Récupère la pipeline de construction du modèle pour le type de graphique spécifié, utilisée pour déboguer le processus de conversion de VSeed vers AdvancedVSeed.

### getSpecPipeline

```ts
static getSpecPipeline(chartType: ChartType): SpecPipe[]
```

[Méthode interne] Récupère la pipeline de construction de Spec pour le type de graphique spécifié, utilisée pour déboguer le processus de conversion de AdvancedVSeed vers Spec.

### getTheme

```ts
static getTheme(themeKey?: string): CustomThemeConfig
```

Récupère la configuration du thème spécifié. Si `themeKey` n'est pas fourni, le thème `'light'` est retourné par défaut.

### getThemeMap

```ts
static getThemeMap(): Record<string, CustomThemeConfig>
```

Récupère toutes les configurations de thème enregistrées.

### from

```ts
static from<T extends Spec = Spec>(vseed: VSeed): Builder<T>
```

Méthode factory statique permettant de créer facilement une instance Builder.

### registerAdvancedPipeline

```ts
static registerAdvancedPipeline(chartType: ChartType, pipeline: AdvancedPipeline): void
```

[Méthode d'extension] Enregistre la pipeline de construction du modèle pour un nouveau type de graphique.

### registerSpecPipeline

```ts
static registerSpecPipeline(chartType: ChartType, pipeline: SpecPipeline): void
```

[Méthode d'extension] Enregistre la pipeline de construction de Spec pour un nouveau type de graphique.

### updateAdvanced

```ts
static updateAdvanced(chartType: ChartType, pipe: AdvancedPipe): void
```

[Méthode d'extension] Modifie la logique de construction du modèle d'un graphique existant et insère une Pipe personnalisée pour influencer l'AdvancedVSeed généré.

### updateSpec

```ts
static updateSpec(chartType: ChartType, pipe: SpecPipe): void
```

[Méthode d'extension] Modifie la logique de construction de Spec d'un graphique existant et insère une Pipe personnalisée pour influencer la Spec finale générée.

### registerTheme

```ts
static registerTheme(key: string, theme: CustomThemeConfig): void
```

[Méthode d'extension] Enregistre un thème personnalisé.

## Properties

### get locale

```ts
get locale()
```

Récupère la locale utilisée par le Builder actuel.

### get vseed

```ts
get vseed()
```

Récupère les données d'entrée VSeed actuelles.

### set vseed

```ts
set vseed(value)
```

Met à jour les données d'entrée VSeed. Après la mise à jour, l'état de cache de `prepare()` est effacé.

### get isPrepared

```ts
get isPrepared()
```

Récupère l'état de `prepare()`.

### set isPrepared

```ts
set isPrepared(value: boolean)
```

Définit l'état de `prepare()`.

### get advancedVSeed

```ts
get advancedVSeed()
```

Récupère l'objet de configuration intermédiaire AdvancedVSeed actuel.

### set advancedVSeed

```ts
set advancedVSeed(value)
```

Définit l'objet de configuration intermédiaire AdvancedVSeed. Généralement utilisé pour mettre en cache ou réutiliser une configuration intermédiaire existante.

### get spec

```ts
get spec()
```

Récupère l'objet Spec final actuellement généré.

### set spec

```ts
set spec(value)
```

Définit l'objet Spec. Généralement utilisé pour la mise en cache.

### get performance

```ts
get performance()
```

Récupère les statistiques de performance du processus de construction. Inclut le temps consommé par chaque étape (unité : ms).

### set performance

```ts
set performance(value)
```

Définit les statistiques de performance.
