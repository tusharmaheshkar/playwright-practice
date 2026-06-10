import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly usernameInput = this.page.getByLabel(/username|email/i);
  readonly passwordInput = this.page.getByLabel(/password/i);
  readonly submitButton = this.page.getByRole('button', { name: /login|sign in/i });

  async open(path: string) {
    await this.goto(path);
  }

  async login(username: string, password: string) {
    await this.fillWhenReady(this.usernameInput, username);
    await this.fillWhenReady(this.passwordInput, password);
    await this.clickWhenReady(this.submitButton);
  }
}
