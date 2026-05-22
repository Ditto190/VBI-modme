# syntax=docker/dockerfile:1.7

FROM node:24.12.0-slim AS base

RUN apt-get update -y && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

FROM base AS build

# Copy the workspace. .dockerignore is the single source of truth for excluding
# local-only files, which keeps root and package-level config files in sync.
COPY . .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm --filter @visactor/vquery build
RUN pnpm --filter @visactor/vseed build
RUN pnpm --filter @visactor/vbi build
RUN pnpm --filter @visactor/headless-bi-be build
RUN pnpm --filter @visactor/headless-bi-be deploy --prod --legacy /out

FROM node:24.12.0-slim AS runner

RUN apt-get update -y && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV="production"
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY --from=build /out/ ./
COPY docker/vbi_be/docker-entrypoint.sh /app/docker-entrypoint.sh

EXPOSE 3030
EXPOSE 1234

RUN chmod +x /app/docker-entrypoint.sh
ENTRYPOINT ["/app/docker-entrypoint.sh"]

CMD ["node", "dist/main"]
