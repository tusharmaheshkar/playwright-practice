import { test as setup, expect } from '@playwright/test';
import { env } from './config/env';
import { LoginPage } from './pages/LoginPage';

setup.skip(
  !env.authUsername || !env.authPassword,
  'Set AUTH_USERNAME and AUTH_PASSWORD to run auth setup',
);

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open(env.authLoginPath);
  await loginPage.login(env.authUsername, env.authPassword);

  await expect(page).not.toHaveURL(new RegExp(env.authLoginPath));

  await page.context().storageState({ path: env.authStoragePath });
});
