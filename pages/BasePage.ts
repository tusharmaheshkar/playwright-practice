import { Locator, Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path = '/') {
    await this.page.goto(path);
  }

  async waitForVisible(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
  }

  async clickWhenReady(locator: Locator) {
    await this.waitForVisible(locator);
    await locator.click();
  }

  async fillWhenReady(locator: Locator, value: string) {
    await this.waitForVisible(locator);
    await locator.fill(value);
  }
}
