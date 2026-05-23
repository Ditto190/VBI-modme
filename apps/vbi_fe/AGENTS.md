# AGENTS.md

You are an expert in JavaScript, Next.js, and web application development. You write maintainable, performant, and accessible code.

## Commands

- Run frontend runtime commands through the repository Docker workflow.
- `pnpm run vbi:dev` - Start the full VBI dev stack from the repository root
- `pnpm run vbi:dev:build` - Rebuild and start the full VBI dev stack
- `docker compose -f ./docker/docker-compose.dev.yml exec vbi_fe pnpm --filter @visactor/headless-bi-fe typecheck` - Type-check in the frontend container
- `docker compose -f ./docker/docker-compose.dev.yml exec vbi_fe pnpm --filter @visactor/headless-bi-fe build` - Build in the frontend container

## Docs

- Next.js: https://nextjs.org/docs
- Rstest: https://rstest.rs/llms.txt

## Tools

### ESLint

- Run `pnpm run lint` inside the frontend container to lint your code

### Prettier

- Run `pnpm run format` inside the frontend container to format your code

### Rstest

- Run `pnpm run test` inside the frontend container to run tests
- Run `pnpm run test:watch` inside the frontend container to run tests in watch mode
