import { test, expect } from '../../fixtures';

test.describe('@ui @smoke Home page', () => {
  test('page loads with a visible heading', async ({ homePage }) => {
    await homePage.open();
    await homePage.expectLoaded();

    await expect(homePage.heading).toBeVisible();
    await expect(homePage.page).toHaveTitle(/Example Domain/i);
  });

  test('home page visual snapshot', async ({ homePage }) => {
    await homePage.open();
    await homePage.expectLoaded();

    await expect(homePage.page).toHaveScreenshot('home-page.png', {
      maxDiffPixelRatio: 0.05,
    });
  });
});
