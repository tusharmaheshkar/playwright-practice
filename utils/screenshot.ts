import { Page } from '@playwright/test';

export function createScreenshotHelper(page: Page) {
  let count = 1;
  return async (name: string) => {
    await page.screenshot({
      path: `screenshots/${String(count++).padStart(2, '0')}-${name}.png`,
      fullPage: true,
    });
  };
}
