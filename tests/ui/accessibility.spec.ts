import { test, expect } from '../../fixtures';
import AxeBuilder from '@axe-core/playwright';

test.describe('@ui @a11y Accessibility', () => {
  test('home page has no critical accessibility violations', async ({ homePage, page }) => {
    await homePage.open();
    await homePage.expectLoaded();

    const results = await new AxeBuilder({ page }).analyze();

    expect(results.violations.filter((v) => v.impact === 'critical')).toEqual([]);
  });
});
