import { test, expect } from '../fixtures';
import { registerData } from '../data/registerData';
import { createScreenshotHelper } from '../utils/screenshot';

test('navigate to presolv360 login, go to register page and fill registration form', async ({ page, loginPage, registerPage }) => {
  const takeScreenshot = createScreenshotHelper(page);

  await loginPage.goto();
  await takeScreenshot('login-page-opened');

  await expect(page).toHaveURL(loginPage.url);
  await takeScreenshot('login-url-verified');

  await expect(loginPage.heading).toBeVisible();
  await takeScreenshot('login-heading-visible');

  await expect(loginPage.usernameInput).toBeVisible();
  await takeScreenshot('username-visible');

  await loginPage.clickCreateAccount();
  await takeScreenshot('clicked-create-account');

  await expect(page).toHaveURL(registerPage.url);
  await takeScreenshot('register-url-verified');

  await expect(registerPage.heading).toBeVisible();
  await takeScreenshot('register-heading-visible');

  await expect(registerPage.firstNameInput).toBeVisible();
  await takeScreenshot('first-name-visible');

  await expect(registerPage.lastNameInput).toBeVisible();
  await takeScreenshot('last-name-visible');

  await expect(registerPage.createAccountButton).toBeVisible();
  await takeScreenshot('create-account-button-visible');

  await registerPage.fillForm(registerData);
  await takeScreenshot('form-filled');

  await registerPage.partyRadio.check();
  await takeScreenshot('party-radio-checked');

  await registerPage.termsCheckbox.check();
  await takeScreenshot('terms-checkbox-checked');

  await expect(registerPage.firstNameInput).toHaveValue(registerData.firstName);
  await takeScreenshot('first-name-value-verified');

  await expect(registerPage.lastNameInput).toHaveValue(registerData.lastName);
  await takeScreenshot('last-name-value-verified');

  await expect(registerPage.mobileInput).toHaveValue(registerData.mobile);
  await takeScreenshot('mobile-value-verified');

  await expect(registerPage.emailInput).toHaveValue(registerData.email);
  await takeScreenshot('email-value-verified');

  await expect(registerPage.organizationInput).toHaveValue(registerData.organization);
  await takeScreenshot('organization-value-verified');

  await expect(registerPage.usernameInput).toHaveValue(registerData.username);
  await takeScreenshot('username-value-verified');

  await expect(registerPage.partyRadio).toBeChecked();
  await takeScreenshot('party-radio-verified');

  await expect(registerPage.termsCheckbox).toBeChecked();
  await takeScreenshot('terms-checkbox-verified');

  await expect(registerPage.createAccountButton).toBeEnabled();
  await takeScreenshot('create-account-button-enabled');
});
