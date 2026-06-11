import { defineConfig, devices } from '@playwright/test';
import { env } from './config/env';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: env.isCi,
  retries: env.isCi ? 2 : 0,
  workers: env.isCi ? 1 : undefined,
  reporter: [['html'], ['list']],
  timeout: 30_000,
  use: {
    trace: 'on-first-retry',
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    headless: env.headless,
  },

  projects: [
    {
      name: 'ui',
      testMatch: /tests\/ui\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: env.uiBaseUrl,
        video: 'off',
      },
    },
    {
      name: 'ui-firefox',
      testMatch: /tests\/ui\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Firefox'],
        baseURL: env.uiBaseUrl,
        video: 'off',
      },
    },
    {
      name: 'ui-webkit',
      testMatch: /tests\/ui\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Safari'],
        baseURL: env.uiBaseUrl,
        video: 'off',
      },
    },
    {
      name: 'ui-mobile',
      testMatch: /tests\/ui\/.*\.spec\.ts/,
      use: {
        ...devices['Pixel 5'],
        baseURL: env.uiBaseUrl,
        video: 'off',
      },
    },
  ],
});
