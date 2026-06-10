import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly heading = this.page.getByRole('heading', { level: 1 });

  async open() {
    await this.goto('/');
  }

  async expectLoaded() {
    await this.waitForVisible(this.heading);
  }
}
