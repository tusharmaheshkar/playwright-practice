# Playwright Practice Framework

A Playwright test framework supporting **API**, **UI**, and **hybrid E2E** testing with page objects, service clients, fixtures, and CI integration.

## Quick start

```bash
npm install
npx playwright install chromium
cp .env.example .env
npm test
```

## Environment variables

Copy [`.env.example`](.env.example) to `.env` and configure:

| Variable | Required | Description |
|----------|----------|-------------|
| `BASE_URL` | Yes | UI application URL |
| `API_BASE_URL` | Yes | API base URL |
| `API_TOKEN` | No | Bearer token for API auth |
| `API_KEY` | No | API key header value |
| `API_HEALTH_PATH` | No | Health check path (default: `/posts/1`) |
| `AUTH_USERNAME` | No | Enables auth setup when set with password |
| `AUTH_PASSWORD` | No | Login password for storage state reuse |
| `HEADLESS` | No | Set `false` to run browsers headed |

## Project structure

```
api/
  BaseApiClient.ts      # HTTP helpers, auth headers, assertions
  services/             # Resource-specific API clients
  types/                # Zod schemas and TypeScript types
config/env.ts           # Typed env loading with validation
data/factories/         # Test data builders (faker)
fixtures/
  apiFixtures.ts        # API client injection
  uiFixtures.ts         # Page object injection
pages/                  # Page Object Model classes
tests/
  api/                  # API-only specs
  ui/                   # UI-only specs
  e2e/                  # Hybrid API + UI flows
auth.setup.ts           # Optional login → storageState
```

## Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run api + ui + e2e (default projects) |
| `npm run test:api` | API tests only |
| `npm run test:ui` | UI tests (Chromium) |
| `npm run test:e2e` | Hybrid E2E tests |
| `npm run test:smoke` | Tests tagged `@smoke` |
| `npm run test:regression` | Tests tagged `@regression` |
| `npm run test:a11y` | Accessibility tests |
| `npm run test:all-browsers` | UI across Chromium, Firefox, WebKit, mobile |
| `npm run test:headed` | Run with visible browser |
| `npm run test:debug` | Playwright debug mode |
| `npm run codegen` | Record locators against `BASE_URL` |

## Adding tests

### API test

1. Add a service in `api/services/`
2. Register it in `fixtures/apiFixtures.ts`
3. Create a spec in `tests/api/`

```ts
import { test, expect } from '../../fixtures';

test('@api @smoke my endpoint', async ({ postsApi }) => {
  const response = await postsApi.getById(1);
  await postsApi.expectOk(response);
});
```

### UI test

1. Add a page class extending `BasePage` in `pages/`
2. Register it in `fixtures/uiFixtures.ts`
3. Create a spec in `tests/ui/`

```ts
import { test, expect } from '../../fixtures';

test('@ui @smoke my page', async ({ homePage }) => {
  await homePage.open();
  await homePage.expectLoaded();
});
```

## CI

GitHub Actions runs three jobs: **api-tests** → **ui-tests** → **e2e-tests**.

Set repository secrets/variables for custom URLs:

- `BASE_URL`
- `API_BASE_URL`
- `API_TOKEN`

## Tags

- `@smoke` — fast sanity checks
- `@regression` — broader coverage
- `@api` / `@ui` / `@e2e` / `@a11y` — filter by layer

```bash
npx playwright test --grep @smoke
```
