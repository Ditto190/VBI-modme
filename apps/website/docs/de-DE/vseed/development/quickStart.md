# Schnellstart

## Umgebung vorbereiten

[Node Download](https://nodejs.org/en/download)
```bash title="node"
nvm install 24
nvm use 24
```

[Pnpm Download](https://pnpm.io/installation#using-corepack)
> In `package.json` ist `packageManager` als `pnpm@10.13.1` konfiguriert; `corepack` installiert diese Version automatisch.
```bash title="pnpm"
corepack enable pnpm
```

Prüfen Sie die pnpm-Version. Erwartet wird 10.26.1.
```bash title="pnpm version"
pnpm -v # expected 10.26.1
```

## Projekt starten

Startet die Dokumentationsseite. VSeed kann dabei gleichzeitig entwickelt und debuggt werden.
```bash title="Entwicklung"
pnpm install

pnpm dev
```

Build
```bash title="Build"
pnpm build
```

Analysieren Sie die Build-Artefakte mit `rsdoctor`.
```bash title="Analyse"
pnpm build:rsdoctor
# or
pnpm dev:rsdoctor
```
