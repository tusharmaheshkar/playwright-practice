import { apiFixtures } from './apiFixtures';
import { HomePage } from '../pages/HomePage';

export type UiFixtures = {
  homePage: HomePage;
};

export const test = apiFixtures.extend<UiFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});
