# syntax=docker/dockerfile:1.7

ARG VBI_API_ORIGIN=http://vbi_be:3030
ARG VBI_COLLABORATION_ORIGIN=http://vbi_be:1234

FROM node:24.12.0-slim AS builder

WORKDIR /app

# Enable pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ARG VBI_API_ORIGIN
ARG VBI_COLLABORATION_ORIGIN
ENV VBI_API_ORIGIN=$VBI_API_ORIGIN
ENV VBI_COLLABORATION_ORIGIN=$VBI_COLLABORATION_ORIGIN
RUN corepack enable

# Copy the workspace. .dockerignore is the single source of truth for excluding
# local-only files, which keeps root and package-level config files in sync.
COPY . .

# Install dependencies and build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm exec turbo build --filter=@visactor/headless-bi-fe^...
RUN pnpm --filter @visactor/headless-bi-fe build

FROM node:24.12.0-slim AS runner

WORKDIR /app

ARG VBI_API_ORIGIN
ARG VBI_COLLABORATION_ORIGIN
ENV NODE_ENV=production
ENV PORT=3000
ENV VBI_API_ORIGIN=$VBI_API_ORIGIN
ENV VBI_COLLABORATION_ORIGIN=$VBI_COLLABORATION_ORIGIN
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@10.26.1 --activate

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/vbi_fe ./apps/vbi_fe

EXPOSE 3000

CMD ["pnpm", "--filter", "@visactor/headless-bi-fe", "preview"]
