import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  readonly url = '/login';
  readonly heading;
  readonly usernameInput;
  readonly createAccountLink;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Login to your account' });
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.createAccountLink = page.getByRole('link', { name: 'Create account' });
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async clickCreateAccount() {
    await this.createAccountLink.click();
  }
}
