import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

function requireEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. Copy .env.example to .env and set a value.`,
    );
  }
  return value;
}

export const env = {
  uiBaseUrl: requireEnv('BASE_URL', process.env.BASE_URL),
  apiBaseUrl: requireEnv('API_BASE_URL', process.env.API_BASE_URL),
  apiToken: process.env.API_TOKEN ?? '',
  apiKey: process.env.API_KEY ?? '',
  apiHealthPath: process.env.API_HEALTH_PATH ?? '/posts/1',
  authUsername: process.env.AUTH_USERNAME ?? '',
  authPassword: process.env.AUTH_PASSWORD ?? '',
  authLoginPath: process.env.AUTH_LOGIN_PATH ?? '/login',
  headless: process.env.HEADLESS !== 'false',
  isCi: !!process.env.CI,
  debugApi: process.env.DEBUG === 'api',
  authStoragePath: '.playwright/.auth/user.json',
};
