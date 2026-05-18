# Démarrage rapide

## Préparer l'environnement

[Node Download](https://nodejs.org/en/download)
```bash title="node"
nvm install 24
nvm use 24
```

[Pnpm Download](https://pnpm.io/installation#using-corepack)
> `package.json` configure `packageManager` avec `pnpm@10.13.1`; `corepack` installera automatiquement cette version.
```bash title="pnpm"
corepack enable pnpm
```

Vérifiez la version de pnpm. La version attendue est 10.26.1.
```bash title="pnpm version"
pnpm -v # expected 10.26.1
```

## Démarrer le projet

Démarrez le site de documentation, tout en développant et en déboguant vseed.
```bash title="Développement"
pnpm install

pnpm dev
```

Build
```bash title="Build"
pnpm build
```

Analysez les artefacts avec `rsdoctor`.
```bash title="Analyse"
pnpm build:rsdoctor
# or
pnpm dev:rsdoctor
```
