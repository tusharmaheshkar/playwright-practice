import { Page } from '@playwright/test';
import { RegistrationData } from '../data/types';

export class RegisterPage {
  readonly page: Page;

  readonly url = '/register';
  readonly heading;
  readonly firstNameInput;
  readonly lastNameInput;
  readonly mobileInput;
  readonly emailInput;
  readonly organizationInput;
  readonly usernameInput;
  readonly passwordInput;
  readonly confirmPasswordInput;
  readonly partyRadio;
  readonly termsCheckbox;
  readonly createAccountButton;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Create your account' });
    this.firstNameInput = page.getByPlaceholder('First Name*');
    this.lastNameInput = page.getByPlaceholder('Last Name*');
    this.mobileInput = page.getByRole('textbox', { name: 'Mobile' });
    this.emailInput = page.getByRole('textbox', { name: 'Email*' });
    this.organizationInput = page.getByPlaceholder('Organization*');
    this.usernameInput = page.getByPlaceholder('Username*: Minimum 6 characters');
    this.passwordInput = page.getByPlaceholder('Password*', { exact: true });
    this.confirmPasswordInput = page.getByPlaceholder('Confirm Password*: Should be same as Password');
    this.partyRadio = page.getByRole('radio', { name: 'Party' });
    this.termsCheckbox = page.getByRole('checkbox', { name: 'I have read and agree to the' });
    this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
  }

  async fillForm(data: RegistrationData) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.mobileInput.fill(data.mobile);
    await this.emailInput.fill(data.email);
    await this.organizationInput.fill(data.organization);
    await this.usernameInput.fill(data.username);
    await this.passwordInput.fill(data.password);
    await this.confirmPasswordInput.fill(data.confirmPassword);
  }
}
